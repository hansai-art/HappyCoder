# happy-wire

本文件說明共享的 Wire 套件：`@slopus/happy-wire`。

## 此套件的存在原因

在 `happy-wire` 出現之前，Wire 層級的訊息與工作階段協定結構描述分散重複於各套件之間（CLI、應用程式、伺服器及代理），這造成了漂移風險，也使協定演進變得更加困難。

`@slopus/happy-wire` 集中管理這些共享結構描述與類型，確保所有客戶端與服務對相同的 Wire 契約達成共識。

## 套件識別

- npm 名稱：`@slopus/happy-wire`
- 工作區路徑：`packages/happy-wire`
- 套件類型：可發布的函式庫（非私有）
- 使用者的版本化相依性：`^0.1.0`

## 共享內容

### 1. Wire 訊息結構描述

從 `@slopus/happy-wire` 共享：
- 來自 `messages.ts`：`SessionMessageContentSchema`、`SessionMessageSchema`、`MessageMetaSchema`、`SessionProtocolMessageSchema`、`MessageContentSchema`（頂層 `role` 聯合類型：`user|agent|session`）、`UpdateNewMessageBodySchema`、`UpdateSessionBodySchema`、`UpdateMachineBodySchema`、`CoreUpdateContainerSchema`
- 來自 `legacyProtocol.ts`：`UserMessageSchema`（`role: 'user'`）、`AgentMessageSchema`（`role: 'agent'`）、`LegacyMessageContentSchema`（僅供舊版使用的 `role` 判別聯合類型）

這些用於加密訊息／更新契約（`new-message`、`update-session`、`update-machine`）。

### 2. 工作階段協定結構描述

從 `@slopus/happy-wire` 共享：
- `sessionEventSchema`
- `sessionEnvelopeSchema`
- `createEnvelope(...)`
- `SessionEnvelope` 及相關類型

這是統一工作階段協定事件串流的標準結構描述。

`sessionEnvelopeSchema` 目前的角色集合：
- `'user'`（使用者發起的信封）
- `'agent'`（代理／系統輸出信封）

目前的工作階段 Wire 酬載形狀（解密後的訊息本文）：
- 外層訊息的 `role` 對工作階段協定記錄始終為 `'session'`
- `content` 直接為工作階段信封物件（不包裝於 `content.data` 下）
- 信封層級的角色保留在 `content.role` 內（`'user' | 'agent'`）
- 信封時間戳記為必填的 `content.time`（Unix 毫秒）

## 此儲存庫的遷移

### CLI（`packages/happy-cli`）

- 工作階段協定匯入現在直接參考 `@slopus/happy-wire`。
- `src/sessionProtocol/types.ts` 現在從 `@slopus/happy-wire` 重新匯出作為相容性墊片。
- `src/api/types.ts` 中的 API Wire 結構描述現在從 `@slopus/happy-wire` 取得共享訊息／更新結構描述。

### 應用程式（`packages/happy-app`）

- `sources/sync/apiTypes.ts` 中的共享 API 訊息／更新結構描述現在從 `@slopus/happy-wire` 匯入：
  - `ApiMessageSchema`
  - `ApiUpdateNewMessageSchema`
  - `ApiUpdateSessionStateSchema`
  - `ApiUpdateMachineStateSchema`

### 伺服器（`packages/happy-server`）

- Prisma JSON 訊息內容類型現在參考 `@slopus/happy-wire` 的 `SessionMessageContent`。
- 事件路由器使用共享的 `SessionMessageContent` 類型作為 `new-message` 酬載類型。

### 代理（`packages/happy-agent`）

- `RawMessage` 現在是 `@slopus/happy-wire` 的 `SessionMessage` 別名。

## 版本控制模型

所有其他工作區套件現在都宣告對 `@slopus/happy-wire` 的版本化相依性。

這有意模仿發布後的使用方式，以減少對工作區本地檔案的隱性耦合。

## 建置與發布

`@slopus/happy-wire` 的設定方式與此儲存庫中現有的可發布函式庫相同：

- 透過 `pkgroll` 輸出 ESM/CJS/types
- `build`：型別檢查 + 打包
- `test`：建置 + vitest
- `prepublishOnly`：建置 + 測試
- `release`：`release-it`
- npm 發布登錄檔透過 `publishConfig` 設定

使用與其他可發布套件相同的發布進入點：

```bash
yarn release
# choose happy-wire
```

或：

```bash
yarn workspace @slopus/happy-wire release
```

從全新簽出建置工作區時，請先建置 `@slopus/happy-wire`，以便相依套件能解析產生的 `dist` 輸出。

## 發布清單（維護者）

1. 確保所有工作區的建置／測試均通過。
2. 確認 Wire 結構描述變更向後相容或已記錄說明。
3. 增加版本並發布 `@slopus/happy-wire`。
4. 視需要更新下游套件版本。
5. 僅在新的 `happy-wire` 版本可用後才發布相依套件的更新。

## 注意事項

- `happy-wire` 應專注於 Wire 契約（類型 + Zod 結構描述 + 小型輔助程式）。
- 領域／業務邏輯應保留在使用者套件中。
- 盡可能以新增方式擴展結構描述，以將客戶端相容性問題降至最低。
