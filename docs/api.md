# API

本文件涵蓋 HTTP API 介面與身份驗證流程。WebSocket 更新與事件 payload 請參閱 `protocol.md`；加密邊界與編碼細節請參閱 `encryption.md`。

## 方法慣例
- **GET** 用於讀取操作。
- **POST** 用於修改或動作，即使操作無法完全對應到單一實體亦然。
- **DELETE** 用於意圖明確的情況（例如移除 token 或刪除 session／artifact）。

我們刻意避免使用完整的 REST 動詞集，因為許多操作跨越多個實體或具有非 CRUD 語意。

## 身份驗證
大多數端點需要 `Authorization: Bearer <token>`。

身份驗證流程：
- `POST /v1/auth`
  - Body：`{ publicKey, challenge, signature }`（base64 字串）
  - 使用提供的公開金鑰驗證簽名。
  - 依公開金鑰 upsert 帳號並回傳 `{ success, token }`。

- `POST /v1/auth/request`
  - Body：`{ publicKey, supportsV2? }`
  - 建立或回傳一個終端身份驗證請求。
  - 回應：`{ state: "requested" }` 或 `{ state: "authorized", token, response }`。

- `GET /v1/auth/request/status?publicKey=...`
  - 回應：`{ status: "not_found" | "pending" | "authorized", supportsV2 }`。

- `POST /v1/auth/response`
  - Body：`{ response, publicKey }`（需要 Bearer 身份驗證）
  - 批准終端身份驗證請求。

- `POST /v1/auth/account/request`
  - Body：`{ publicKey }`
  - 類似終端身份驗證，但用於帳號連結。

- `POST /v1/auth/account/response`
  - Body：`{ response, publicKey }`（需要 Bearer 身份驗證）

## 端點目錄
### Sessions
- `GET /v1/sessions`
- `GET /v2/sessions/active?limit=...`
- `GET /v2/sessions?cursor=cursor_v1_<id>&limit=...&changedSince=...`
- `POST /v1/sessions`（依 `tag` 建立或載入）
- `GET /v1/sessions/:sessionId/messages`
- `DELETE /v1/sessions/:sessionId`

### Machines
- `POST /v1/machines`（依 id 建立或載入）
- `GET /v1/machines`
- `GET /v1/machines/:id`

### Artifacts
- `GET /v1/artifacts`
- `GET /v1/artifacts/:id`
- `POST /v1/artifacts`
- `POST /v1/artifacts/:id`（版本化更新）
- `DELETE /v1/artifacts/:id`

### Access keys
- `GET /v1/access-keys/:sessionId/:machineId`
- `POST /v1/access-keys/:sessionId/:machineId`
- `PUT /v1/access-keys/:sessionId/:machineId`

### 鍵值儲存
- `GET /v1/kv/:key`
- `GET /v1/kv?prefix=...&limit=...`
- `POST /v1/kv/bulk`
- `POST /v1/kv`（批次修改）

### 帳號與用量
- `GET /v1/account/profile`
- `GET /v1/account/settings`
- `POST /v1/account/settings`
- `POST /v1/usage/query`

### Push tokens
- `POST /v1/push-tokens`
- `DELETE /v1/push-tokens/:token`
- `GET /v1/push-tokens`

### Connect（GitHub + 廠商 tokens）
- `GET /v1/connect/github/params`
- `GET /v1/connect/github/callback`
- `POST /v1/connect/github/webhook`
- `DELETE /v1/connect/github`
- `POST /v1/connect/:vendor/register`（`vendor` 為 `openai | anthropic | gemini`）
- `GET /v1/connect/:vendor/token`
- `DELETE /v1/connect/:vendor`
- `GET /v1/connect/tokens`

### 使用者、好友、動態
- `GET /v1/user/:id`
- `GET /v1/user/search?query=...`
- `POST /v1/friends/add`
- `POST /v1/friends/remove`
- `GET /v1/friends`
- `GET /v1/feed`

### 版本與語音
- `POST /v1/version`
- `POST /v1/voice/token`

### 僅供開發
- `POST /logs-combined-from-cli-and-mobile-for-simple-ai-debugging`（僅在啟用時）

## 實作參考
- API 路由：`packages/happy-server/sources/app/api/routes`
- 身份驗證模組：`packages/happy-server/sources/app/auth/auth.ts`
