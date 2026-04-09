# 部署

本文件說明如何部署 Happy 後端（`packages/happy-server`）及其所需的基礎設施。

## 執行環境概覽
- **應用程式伺服器：** Node.js 執行 `tsx ./sources/main.ts`（Fastify + Socket.IO）。
- **資料庫：** 透過 Prisma 連接的 Postgres。
- **快取：** Redis（目前用於連線能力及未來擴充）。
- **物件儲存：** 相容 S3 的儲存空間，用於使用者上傳的資產（MinIO 可用）。
- **指標：** 可選的 Prometheus `/metrics` 伺服器，執行於獨立埠號。

## 必要服務
1. **Postgres**
   - 所有持久化資料皆需使用。
   - 透過 `DATABASE_URL` 設定。

2. **Redis**
   - 啟動時必須使用（會呼叫 `redis.ping()`）。
   - 透過 `REDIS_URL` 設定。

3. **相容 S3 的儲存空間**
   - 用於頭像及其他上傳資產。
   - 透過 `S3_HOST`、`S3_PORT`、`S3_ACCESS_KEY`、`S3_SECRET_KEY`、`S3_BUCKET`、`S3_PUBLIC_URL`、`S3_USE_SSL` 設定。

## 環境變數
**必要項目**
- `DATABASE_URL`：Postgres 連線字串。
- `HANDY_MASTER_SECRET`：身份驗證 token 與伺服器端加密的主金鑰。
- `REDIS_URL`：Redis 連線字串。
- `S3_HOST`、`S3_ACCESS_KEY`、`S3_SECRET_KEY`、`S3_BUCKET`、`S3_PUBLIC_URL`：物件儲存設定。

**常用項目**
- `PORT`：API 伺服器埠號（預設 `3005`）。
- `METRICS_ENABLED`：設為 `false` 以停用指標伺服器。
- `METRICS_PORT`：指標伺服器埠號（預設 `9090`）。
- `S3_PORT`：選用的 S3 埠號。
- `S3_USE_SSL`：`true`／`false`（預設 `true`）。

**可選整合**
- GitHub OAuth／App：`GITHUB_CLIENT_ID`、`GITHUB_CLIENT_SECRET`、`GITHUB_APP_ID`、`GITHUB_PRIVATE_KEY`、`GITHUB_WEBHOOK_SECRET`，加上重新導向 URL／URI。
  - `GITHUB_REDIRECT_URL` 由 OAuth callback 處理程式使用。
  - `GITHUB_REDIRECT_URI` 由 GitHub App 初始化程式使用。
- 語音：`ELEVENLABS_API_KEY`（正式環境中 `/v1/voice/conversations` 所需）。
- 訂閱：`REVENUECAT_API_KEY`（伺服器端 RevenueCat 金鑰，語音訂閱檢查所需）。
- 除錯日誌：`DANGEROUSLY_LOG_TO_SERVER_FOR_AI_AUTO_DEBUGGING`（啟用檔案日誌與開發日誌端點）。

## Docker 映像檔
正式環境的 Dockerfile 位於 `Dockerfile.server`。

重要說明：
- 伺服器預設埠號為 `3005`（在容器環境中請明確設定 `PORT`）。
- 映像檔包含 FFmpeg 與 Python，用於媒體處理。

## Kubernetes 清單
範例清單位於 `packages/happy-server/deploy`：
- `handy.yaml`：伺服器的 Deployment + Service + ExternalSecrets。
- `happy-redis.yaml`：Redis StatefulSet + Service + ConfigMap。

部署設定期望：
- 在埠號 `9090` 上設定 Prometheus 抓取標註。
- 由 ExternalSecrets 填入名為 `handy-secrets` 的 secret。
- 一個將埠號 `3000` 對應到容器埠號 `3005` 的 service。

## 本地開發輔助工具
伺服器套件包含本地基礎設施的腳本：
- `yarn workspace happy-server db`（Docker 中的 Postgres）
- `yarn workspace happy-server redis`
- `yarn workspace happy-server s3` + `s3:init`

執行 `yarn workspace happy-server dev` 時，使用 `.env`／`.env.dev` 載入本地設定。

## 實作參考
- 入口點：`packages/happy-server/sources/main.ts`
- Dockerfile：`Dockerfile.server`
- Kubernetes 清單：`packages/happy-server/deploy`
- 環境變數使用情況：`packages/happy-server/sources`（`rg -n "process.env"`）
