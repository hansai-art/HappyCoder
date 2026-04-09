# 貢獻指南 — Happy

Happy 由全天使用 AI 程式設計工具的工程師所打造，我們建立 Happy 就是為了能在任何地方使用這些工具。歡迎所有能讓 Happy 在此工作流程中更好用的貢獻。

如果您的 PR 或 Issue 沒有得到回應，請標記 **@bra1ndump**。

## 貢獻優先順序

我們依照以下順序審查貢獻：

1. **錯誤修復** — 崩潰、流程中斷、資料遺失
2. **UI 微調** — 精緻化、版面修正、視覺一致性
3. **新功能** — 服務核心使用情境的新能力
4. **重構** — 程式碼品質改善、測試覆蓋率
5. **核心重構** — 同步引擎、RPC 層、伺服器變更（請先討論）

若您的貢獻在列表中排列較後，可能需要較長時間才能獲得審查。這並不代表其價值低——只是我們的分類處理方式。

## Issues

我們目前無法逐一回覆每個 Issue，而是以 AI 輔助分類批量審查。它們很有用——請持續提交——但有明確修復方案的 PR 始終優先處理。

每個 Issue 都應以**一段摘要**開始，說明問題所在。不要把重點埋在重現步驟或日誌中。請先說明哪裡出了問題，以及您的預期是什麼。

## Pull Requests

### 規則

1. **以一段摘要開始。** 哪裡出了問題或有所缺失？這個 PR 如何解決它？快速瀏覽 20 個 PR 的人需要在 10 秒內理解您的 PR。

2. **提供有效的證明。** 包含影片、截圖或實際日誌輸出，展示修復在真實執行應用程式中的效果。「修復前」的狀態可以用文字描述，「修復後」必須以視覺方式呈現。單元測試通過還不夠——請展示端對端的運作情況。

3. **在請求人工審查前，先處理 Codex 的審查意見。** 我們在所有 PR 上使用自動化 Codex 審查。先解決那些——它們能抓出明顯的問題，讓人工審查員專注於重要的事情。

4. **保持 PR 的焦點。** 每個 PR 只修一個問題，每個 PR 只加一個功能。如果您順手修改了無關的內容，請將其拆分出去。

5. **核心變更需要先進行討論。** 若您的 PR 涉及同步引擎、RPC 協定、加密或伺服器，請在撰寫程式碼之前先開一個 Issue 或 Discord 討論串。這些區域會影響所有使用者，需要設計上的一致性。

### 優質 PR 的特徵

- **提供有效的證明。** 截圖、螢幕錄影或實際日誌輸出，展示修復在真實執行應用程式中的效果。單元測試通過還不夠——請展示端對端的運作情況。
- 連結到它所修復的 Issue（如果有的話）
- 簡短清晰的標題（`fix: voice session stuck in connecting state` 而非 `Update voice.ts`）
- 不含無關變更，不順手重構

## 開發環境設定

### 必要條件

- Node.js >= 20
- Yarn（`npm install -g yarn`）
- Git

### 開始使用

```bash
git clone https://github.com/slopus/happy.git
cd happy
yarn install
```

### Happy App（行動版 + Web 版）

```bash
yarn workspace happy-app start          # Expo 開發伺服器
yarn workspace happy-app ios:dev        # iOS 模擬器
yarn workspace happy-app android:dev    # Android 模擬器
yarn web                                # 瀏覽器（快捷方式）
yarn workspace happy-app typecheck      # 每次變更後執行
```

應用程式有三種建置變體——所有變體都可以同時安裝在同一部裝置上：

| 變體 | Bundle ID | 應用程式名稱 | 使用情境 |
|---------|-----------|----------|----------|
| Development | `com.slopus.happy.dev` | Happy (dev) | 支援熱重載的本地開發 |
| Preview | `com.slopus.happy.preview` | Happy (preview) | Beta 測試及 OTA 更新 |
| Production | `com.ex3ndr.happy` | Happy | App Store 發布版 |

將 `ios:dev` 替換為 `ios:preview` 或 `ios:production`（`android:` 同理）。

#### macOS 桌面版（Tauri）

```bash
yarn workspace happy-app tauri:dev      # 以熱重載方式執行
yarn workspace happy-app tauri:build:dev
```

### Happy CLI

```bash
yarn workspace happy build
yarn workspace happy test
yarn workspace happy dev                # 不建置直接執行（使用 tsx）
```

#### 本地 `happy-dev` 指令

若要測試本地建置而不覆蓋全域的 `happy`：

```bash
cd packages/happy-cli
yarn link:dev       # 建立全域 happy-dev 符號連結
yarn unlink:dev     # 移除它
```

現在 `happy` 執行穩定的 npm 版本，`happy-dev` 執行您的本地建置。

#### 穩定版與開發版資料隔離

CLI 將穩定版和開發版資料完全分離：

| | 穩定版 | 開發版 |
|-|--------|-------------|
| 資料 | `~/.happy/` | `~/.happy-dev/` |
| 啟動 daemon | `npm run stable:daemon:start` | `npm run dev:daemon:start` |

第一次使用？執行 `npm run setup:dev` 以建立開發版資料目錄。

### Happy Server

```bash
yarn workspace happy-server standalone:dev   # 本地伺服器（無需 Docker）
```

以嵌入式 PGlite 執行於 `localhost:3005`。若要將應用程式指向本地伺服器：

```bash
EXPO_PUBLIC_HAPPY_SERVER_URL=http://localhost:3005 yarn workspace happy-app start
```

## 專案結構

這是一個包含四個套件的 monorepo：

- **happy-app** — React Native + Expo 行動版／Web 版客戶端
- **happy-cli** — 封裝 Claude Code 和 Codex 的 Node.js CLI
- **happy-agent** — 遠端 agent 控制
- **happy-server** — 加密同步的後端

如需架構詳細資訊，請查閱 [docs/](.) 資料夾，或直接詢問 Happy 本身——它了解專案的設定方式。

## 社群

- [Discord](https://discord.gg/fX9WBAhyfD) — 提問與討論的最佳場所
- [文件](https://happy.engineering/docs/)
