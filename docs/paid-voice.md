# 付費語音 — 速率限制與身份驗證

## 流程

```
使用者點擊麥克風
│
├─ 旁路模式？（自訂 agent ID）
│   └─ 直接連線至 ElevenLabs，跳過所有步驟
│
├─ POST /v1/voice/conversations { agentId }
│   │
│   ├─ GET /v1/convai/conversations?agent_id=X&user_id=Y&created_after=<30d>&page_size=100
│   │   └─ 加總 call_duration_secs → usedSeconds（約 108ms）
│   │
│   ├─ conversations == 100?          → { allowed: false, reason: "voice_conversation_limit_reached" }
│   ├─ usedSeconds >= 5h?             → { allowed: false, reason: "voice_hard_limit_reached" }
│   ├─ usedSeconds >= 20min + 無訂閱？ → { allowed: false, reason: "subscription_required" }
│   │
│   ├─ GET /v1/convai/conversation/token?agent_id=X&participant_name=ELEVEN_USER_ID
│   │   └─ 解碼 JWT → 從 video.room 中提取 conv_id
│   │
│   └─ 回傳 { conversationToken, conversationId, agentId, elevenUserId, usedSeconds, limitSeconds }
│
├─ allowed: false？
│   ├─ "voice_conversation_limit_reached" → 警示（在 GitHub 上提交 Issue）
│   └─ 其他 → 付費牆流程 flow="voice_must_pay"
│
└─ allowed: true
    ├─ 功能旗標 voice-upsell == "show-paywall-before-first-voice-chat"？
    │   └─ 僅第一次免費語音啟動 → 軟付費牆 flow="voice_trial_eligible"
    ├─ 功能旗標 voice-upsell == "voice-onboarding-and-upsell"？
    │   └─ 將引導與追加銷售指引注入語音提示
    └─ 否則
        └─ 控制組 → 無軟付費牆且無引導實驗
        然後 startSession({ conversationToken }) → 透過 LiveKit 建立 WebRTC
```

## 限制

| 方案層級 | 限制 | 週期 | 我方成本 | 觸發後行為 |
|------|-------|--------|------------|--------------|
| 免費 | 20 分鐘 | 30 天 | 約 $0.19 | 付費牆 |
| 已訂閱 | 5 小時 | 30 天 | — | 硬性封鎖 → 自帶 agent |
| 自帶 Agent | 無限制 | — | $0 | 使用者自有 ElevenLabs |
| 任何方案 | 100 次對話 | 30 天 | — | 硬性封鎖 → 提交 Issue |

成本：約 $0.01/分鐘（實測 171K 分鐘，共 $1600）。

## 追蹤

ElevenLabs 為事實來源，本地無資料庫。

- 在 token 鑄造時設定 `participant_name` → 在對話記錄中設定 `user_id`
- 用量：`GET /conversations?user_id=Y&created_after=<30d>&page_size=100` → 加總時長
- `user_id` = Happy 使用者 ID 的 HMAC-SHA256（確定性、單向）
- 最大 page_size 為 100 → 達到 100 次對話時封鎖（無法在不分頁的情況下追蹤更多）

**TODO：** 從 Prisma schema 中移除 `VoiceConversation` 模型（已不再使用，資料庫資料表可刪除）。

## 付費牆流程（RevenueCat）

單一付費牆樣板，規則由自訂變數 `flow` 驅動：

| 流程 | 觸發時機 | 行為 |
|------|------|----------|
| `voice_trial_eligible` | 功能旗標變體 `show-paywall-before-first-voice-chat`，第一次免費語音使用 | 軟性——可關閉，語音仍會啟動 |
| `voice_must_pay` | 伺服器回傳 `allowed: false` | 強制——必須購買 |
| `voluntary_support` | 設定頁面 | 使用者主動發起 |

### 未來：語音 Agent 自我銷售

讓 agent 自然地提及定價。將 `usedSeconds`／`limitSeconds` 注入 context，新增 `showUpgradePaywall` 客戶端工具。

## 安全性

- JWT 由 ElevenLabs 簽署，一次性使用，無法偽造
- Agent 設定為「僅授權使用者」——需要伺服器鑄造的 token
- 公開 repo 中的 Agent ID 無害
