# 語音架構

說明 ElevenLabs 語音助理如何與 Happy 應用程式整合、如何將訊息路由至工作階段，以及如何管理上下文傳遞。

## 元件

```text
SessionView.tsx            UI — mic button, triggers voice start/stop
RealtimeSession.ts         Lifecycle — start/stop, token fetch, session routing state
RealtimeVoiceSession.tsx   Native ElevenLabs bridge (useConversation hook)
RealtimeVoiceSession.web.tsx  Web ElevenLabs bridge (same interface)
voiceHooks.ts              Context delivery — formats and routes app events to voice agent
contextFormatters.ts       Text formatters for session context, messages, permissions
realtimeClientTools.ts     Tool implementations the voice agent can invoke
voiceConfig.ts             Feature flags and constants
storage.ts                 Global state (realtimeStatus, realtimeMode)
types.ts                   Shared type definitions
```

## 工作階段路由

`RealtimeSession.ts` 中的模組層級變數 `currentSessionId` 控制語音代理的工具呼叫要路由到哪個工作階段，它是以下兩者的唯一真實來源：

- **路由**：`realtimeClientTools.ts` 中的 `messageClaudeCode` 與 `processPermissionRequest` 透過 `getCurrentRealtimeSessionId()` 讀取此值。
- **焦點去重**：`voiceHooks.onSessionFocus()` 與其比較，避免對已聚焦的工作階段重複注入上下文。

當使用者在語音啟用期間切換至不同工作階段時，`onSessionFocus` 會更新 `currentSessionId`，使後續語音命令路由至新查看的工作階段。

```text
User taps mic on Session A
  │
  v
startRealtimeSession("A")
  └──> currentSessionId = "A"

User navigates to Session B
  │
  v
sync.onSessionVisible("B")
  └──> voiceHooks.onSessionFocus("B")
         └──> setCurrentRealtimeSessionId("B")

Voice agent calls messageClaudeCode
  └──> getCurrentRealtimeSessionId() → "B"
```

## 語音啟動

當語音工作階段啟動時，`onVoiceStarted(sessionId)` 會建立包含以下內容的初始提示：

1. **工作階段目錄** — 每個活躍工作階段的單行摘要（ID + 摘要），讓代理知道所有可用目標。
2. **當前工作階段上下文** — 透過 `injectSessionContext(sessionId)` 完整傾印：工作階段元資料、路徑、摘要及訊息歷史。

```text
onVoiceStarted("A")
  │
  ├──> formatSessionDirectory()
  │      → "Available sessions:\n- abc: "Refactor auth"\n- def: "Fix dark mode""
  │
  └──> injectSessionContext("A")
         → "# Session ID: abc\n# Project path: ...\n## History\n..."
```

## 上下文傳遞

應用程式事件透過兩個語義不同的管道傳遞至語音代理：

### sendContext() — 靜默背景注入

呼叫 `voice.sendContextualUpdate()`。代理接收資訊但**不會**回應。始終立即傳送，從不排入佇列。

用途：新訊息、工作階段焦點變更、工作階段上線／離線、完整工作階段傾印。

### sendPrompt() — 觸發代理回應

呼叫 `voice.sendTextMessage()`。作為使用者回合運作——代理將會回應。**在任何人說話期間排入佇列**，當模式轉換為 `idle` 時作為單一批次一起清空。

用途：權限請求、就緒事件（代理完成工作）。

### 批次處理

當使用者或代理正在說話時，提示會排入 `pendingPrompts[]` 佇列。`realtimeMode` 上的 zustand 訂閱在模式回到 `idle` 時觸發 `flushPendingPrompts()`，將所有排入佇列的提示合併為單一 `sendTextMessage` 呼叫。

```text
realtimeMode = 'agent-speaking'
  │
  ├── onReady("abc")        → sendPrompt() → queued
  ├── onPermission("abc")   → sendPrompt() → queued
  ├── onMessages("abc")     → sendContext() → sent immediately
  │
  v
realtimeMode → 'idle'
  │
  v
flushPendingPrompts()
  └──> voice.sendTextMessage(joined prompts)
```

### 工作階段上下文注入

`injectSessionContext(sessionId)` 是注入完整工作階段上下文的共享程式碼路徑。它被 `onVoiceStarted`（用於建立初始提示字串）與 `onSessionFocus`（用於傳送上下文更新）兩者使用。它透過 `shownSessions` 追蹤哪些工作階段已顯示過，以避免重複傾印。

## 即時模式

`storage` 中的 `realtimeMode` 追蹤當前說話者：

| 模式 | 含義 | 來源 |
|------|------|------|
| `idle` | 無人說話 | 預設值／說話結束後 |
| `agent-speaking` | ElevenLabs 代理正在產生音訊 | `onModeChange({ mode: 'speaking' })` |
| `user-speaking` | 使用者麥克風 VAD 超過閾值 | `onVadScore({ vadScore })` |

優先順序：`agent-speaking` > `user-speaking` > `idle`。若兩者同時觸發，代理優先（代理輸出期間的使用者語音可能是串音）。

### VAD 偵測

ElevenLabs 提供 `onVadScore({ vadScore: number })`——使用者麥克風活動的 0-1 連續訊號。我們透過去抖動衍生二元狀態：

- `vadScore > VAD_THRESHOLD`（0.5）→ `user-speaking`，重設靜默計時器
- `vadScore <= VAD_THRESHOLD` → 啟動靜默計時器（`VAD_SILENCE_MS` = 300ms），逾時後轉換為 `idle`

代理模式變更（`onModeChange`）優先於 VAD。當 `onModeChange` 回報 `'speaking'` 時，無論 VAD 狀態如何，均設為 `agent-speaking`。當回報 `'listening'` 時，則遵從 VAD 狀態。

```text
ElevenLabs SDK
  │
  ├── onModeChange({ mode: 'speaking' })
  │     └──> realtimeMode = 'agent-speaking'
  │
  ├── onModeChange({ mode: 'listening' })
  │     └──> realtimeMode = (VAD active ? 'user-speaking' : 'idle')
  │
  └── onVadScore({ vadScore })
        └──> if agent not speaking:
               vadScore > 0.5 → 'user-speaking'
               vadScore ≤ 0.5 → debounce → 'idle'
```

## 語音代理工具

語音代理可呼叫以下客戶端工具（定義於 `realtimeClientTools.ts`）：

- **messageClaudeCode** — 透過 `sync.sendMessage(sessionId, message)` 向當前聚焦的工作階段傳送文字訊息。
- **processPermissionRequest** — 允許或拒絕當前工作階段的待處理權限請求。

兩者均從 `getCurrentRealtimeSessionId()` 讀取目標工作階段。

## 生命週期

```text
App mounts RealtimeVoiceSession component
  └──> useConversation() hook initializes
  └──> registerVoiceSession(impl) — makes the instance available globally

User taps mic
  └──> voiceHooks.onVoiceStarted(sessionId) — builds initial prompt
  └──> startRealtimeSession(sessionId, prompt)
         ├──> fetchVoiceToken() — server-side gating (see plans/elevenlabs-voice-usage-gating.md)
         ├──> currentSessionId = sessionId
         └──> voiceSession.startSession({ token, initialContext, ... })

User taps mic again (or navigates away)
  └──> stopRealtimeSession()
         ├──> voiceSession.endSession()
         ├──> currentSessionId = null
         └──> voiceHooks.onVoiceStopped() — clears state
```

## 相關

- `docs/plans/elevenlabs-voice-usage-gating.md` — 語音工作階段的使用量管控與付費牆流程。
