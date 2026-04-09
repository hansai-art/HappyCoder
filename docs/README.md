# Happy 文件

本資料夾記錄了 Happy 的內部運作方式，重點涵蓋協定、後端架構、部署以及 CLI 工具。請從這裡開始。

## 索引
- protocol.md：Wire 協定（WebSocket）、payload 格式、排序及並發規則。
- api.md：HTTP 端點與身份驗證流程。
- encryption.md：加密邊界與線上傳輸編碼。
- backend-architecture.md：後端內部結構、資料流及關鍵子系統。
- deployment.md：如何部署後端及所需基礎設施。
- cli-architecture.md：CLI 與 daemon 架構，以及它們如何與伺服器互動。
- dev-environments.md：本地 `environments/data/` 工作流程、lab-rat 專案佈建、`env:cli` 直通行為與 daemon 使用方式。
- session-protocol.md：統一的加密聊天事件協定。
- session-protocol-claude.md：Claude 專屬的 session-protocol 流程（本地與遠端啟動器、去重／重啟）。
- plans/provider-envelope-redesign.md：現行 provider/session envelope 設計的擬議替換方案。
- permission-resolution.md：跨應用程式與 CLI 的狀態式權限模式解析（含沙箱行為）。
- happy-wire.md：共用 wire 結構描述／型別套件及遷移說明。
- voice-architecture.md：ElevenLabs 語音助理整合、session 路由、context 批次處理及 VAD 偵測。
- research/：一般研究筆記與探索性文章。
- competition/：競爭對手研究、協定分析及比較說明。
- competition/AGENTS.md：在不提交原始 checkout 的情況下儲存競爭對手研究成果的結構與規則。

## 慣例
- 路徑與欄位名稱反映 `packages/happy-server` 中的現行實作。
- 範例僅供說明；正確的標準以程式碼為準。
