# 跨系統的使用者身份識別

說明單一 Happy 使用者如何在每個外部服務中被識別。

## 主要 ID：Happy 帳號 CUID

- **類型：** CUID（碰撞抵抗唯一 ID，字串）
- **建立時機：** 首次透過公開金鑰簽名驗證進行身份驗證時（`Account.upsert` 依 `publicKey`）
- **儲存位置：** Prisma 中的 `Account.id`，JWT payload（`{ user: CUID }`）
- **程式碼中：** 伺服器端的 `request.userId`，行動端的 `sync.serverID`
- **應用程式中可見：** 設定 > 開發者 > 購買頁面顯示 `sync.serverID`

## 身份對應關係

```
Happy 帳號 CUID（例如 cm4x7k2...）
│
├─► ElevenLabs ── u_{base64url(HMAC-SHA256(CUID, MASTER_SECRET))}
│                 每次請求時動態衍生，從不儲存。
│                 voiceRoutes.ts:deriveElevenUserId()
│
├─► RevenueCat ── 直接使用相同 CUID，作為 appUserID 傳入
│                 在行動端設定一次：RevenueCat.configure({ appUserID: serverID })
│                 伺服器以相同 CUID 查詢 RevenueCat API
│
├─► GitHub ────── 外部 GitHub 整數 ID → 儲存於 Account.githubUserId
│                 透過 githubConnect.ts 中的 OAuth 完成連結
│                 同時將加密的 access token 儲存於 GithubUser.token
│
└─► AI 廠商 ───── ServiceAccountToken { accountId: CUID, vendor, token }
   (OpenAI,       使用者自有 API 金鑰，靜態加密。
    Anthropic,    connectRoutes.ts: POST /v1/connect/:vendor/register
    Gemini)
```

## 身份驗證流程

```
客戶端金鑰對（libsodium/NaCl）
  │
  ├─ 以私鑰對 challenge 簽名
  │
  ▼
POST /v1/auth { publicKey, challenge, signature }
  │
  ├─ 伺服器驗證簽名（tweetnacl）
  ├─ Account.upsert({ where: { publicKey } })  →  CUID
  ├─ auth.createToken(CUID)  →  JWT（以 HANDY_MASTER_SECRET 簽署）
  │
  ▼
客戶端儲存 JWT，在所有請求中以 Authorization header 發送
伺服器透過 app.authenticate 裝飾器從 JWT 中提取 CUID
```

## 關鍵設計決策

| 系統 | ID 類型 | 原因 |
|--------|---------|-----|
| ElevenLabs | HMAC 衍生 | 隱私保護——原始 Happy ID 永遠不會發送至 ElevenLabs |
| RevenueCat | 直接傳遞 | 訂閱 API 呼叫需要直接關聯 |
| GitHub | 儲存外部鍵 | 支援個人資料連結及透過 OAuth 的帳號復原 |
| AI 廠商 | 儲存加密 | 使用者自有金鑰，需要能夠取回 |

## 本地腳本

若要從 Happy CUID 本地衍生 ElevenLabs 使用者 ID：

```python
import hmac, hashlib, base64
digest = hmac.new(MASTER_SECRET.encode(), happy_cuid.encode(), hashlib.sha256).digest()
eleven_id = "u_" + base64.b64encode(digest).decode().replace("+","-").replace("/","_").rstrip("=")
```
