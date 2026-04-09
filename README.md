<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/.github/logotype-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="/.github/logotype-light.png">
    <img src="/.github/logotype-dark.png" width="400" alt="Happy">
  </picture>
</div>

<h1 align="center">
  Claude Code 與 Codex 的手機版、網頁版操作介面
</h1>

<h4 align="center">
不在電腦前，也能透過端對端加密安全操作 Claude Code 或 Codex。
</h4>

<div align="center">
  
[📱 **iOS App**](https://apps.apple.com/us/app/happy-claude-code-client/id6748571505) • [🤖 **Android App**](https://play.google.com/store/apps/details?id=com.ex3ndr.happy) • [🌐 **網頁版**](https://app.happy.engineering) • [🎥 **操作示範**](https://youtu.be/GCS0OG9QMSE) • [📚 **文件**](https://happy.engineering/docs/) • [💬 **Discord 社群**](https://discord.gg/fX9WBAhyfD)

</div>

<img width="5178" height="2364" alt="github" src="/.github/header.png" />


<h3 align="center">
步驟 1：下載 App
</h3>

<div align="center">
<a href="https://apps.apple.com/us/app/happy-claude-code-client/id6748571505"><img width="135" height="39" alt="appstore" src="https://github.com/user-attachments/assets/45e31a11-cf6b-40a2-a083-6dc8d1f01291" /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://play.google.com/store/apps/details?id=com.ex3ndr.happy"><img width="135" height="39" alt="googleplay" src="https://github.com/user-attachments/assets/acbba639-858f-4c74-85c7-92a4096efbf5" /></a>
</div>

<h3 align="center">
步驟 2：在電腦安裝 CLI
</h3>

```bash
npm install -g happy
```

> 這個套件已從 `happy-coder` 遷移到 `happy`。感謝 [@franciscop](https://github.com/franciscop) 捐贈 `happy` 套件名稱。

<h3 align="center">
步驟 3：之後請用 `happy` 取代 `claude` 或 `codex`
</h3>

```bash
# 原本如果你會輸入 claude，現在改成：
happy claude
# 或者
happy codex
```

## 這個專案是做什麼的？

Happy 會包裝你原本在電腦上使用的 Claude Code 或 Codex，讓你可以在手機、平板或網頁上查看進度、接收通知、批准權限請求，並在離開座位時繼續控制 AI 寫程式。所有資料在離開你的裝置前都會先加密。

簡單來說：

- 你在電腦上啟動 `happy`
- Happy 會幫你建立可遠端控制的工作階段
- 你可以用手機 App 或網頁版接手查看與操作
- 想切回電腦時，只要回到電腦按任意鍵即可

## 🔥 為什麼要用 Happy？

- 📱 **手機也能看進度**：不在座位前也能知道 AI 正在做什麼
- 🔔 **即時通知**：當 AI 需要你核准權限或遇到錯誤時，會主動提醒
- ⚡ **裝置切換很快**：手機、網頁、電腦可以快速接手
- 🔐 **端對端加密**：程式碼與訊息不會以未加密形式離開你的裝置
- 🛠️ **開放原始碼**：可以自行檢查程式內容，沒有追蹤與遙測

## 🧑‍🌾 完全新手也能照做的詳細教學

如果你完全沒有寫程式經驗，請照下面順序操作。

### 開始前，你需要準備什麼？

1. **一台電腦**
   - macOS、Windows、Linux 都可以
2. **一支手機**
   - iPhone 或 Android 都可以
3. **穩定的網路**
4. **Node.js**
   - 這是讓電腦能安裝 `happy` 指令的必要工具
   - 如果你不知道自己有沒有安裝，請先到 <https://nodejs.org/> 下載 **LTS** 版本並完成安裝
5. **你要控制的 AI CLI**
   - 如果你要用 Claude Code，請先安裝並登入 `claude`
   - 如果你要用 Codex，請先安裝並登入 `codex`

### 步驟 1：在手機下載 Happy App

1. 使用手機打開上面的 **iOS App** 或 **Android App** 連結
2. 安裝完成後先不要關閉，等等會用到

### 步驟 2：在電腦安裝 Node.js

如果你已經確定電腦有 Node.js，可以跳到下一步。

1. 打開瀏覽器，前往 <https://nodejs.org/>
2. 點選 **LTS** 版本下載
3. 下載完成後直接安裝
4. 安裝時基本上一路按「下一步」即可

### 步驟 3：打開電腦的終端機

終端機就是可以輸入指令的視窗。

- **macOS**：打開「終端機 Terminal」
- **Windows**：打開「PowerShell」或「Windows Terminal」
- **Linux**：打開「Terminal」

如果你不知道怎麼開，可以直接在系統搜尋框輸入：

- `Terminal`
- `PowerShell`
- `Windows Terminal`

### 步驟 4：確認 Node.js 是否安裝成功

在終端機輸入下面這一行，然後按 Enter：

```bash
node -v
```

如果你看到像 `v22.0.0` 這樣的版本號，表示安裝成功。

### 步驟 5：安裝 Happy

在終端機輸入：

```bash
npm install -g happy
```

看到安裝完成後，就表示電腦已經可以使用 `happy` 指令。

### 步驟 6：確認你的 AI CLI 已經準備好

請先確認你要使用哪一種工具：

- **Claude Code 使用者**
  1. 確認 `claude` 已安裝
  2. 確認你已經登入 Claude Code
- **Codex 使用者**
  1. 確認 `codex` 已安裝
  2. 確認你已經登入 Codex

如果這一步還沒完成，Happy 就算安裝好了也無法真正開始工作。

### 步驟 7：開始第一個工作階段

#### 如果你使用 Claude Code

在終端機輸入：

```bash
happy
```

或：

```bash
happy claude
```

#### 如果你使用 Codex

在終端機輸入：

```bash
happy codex
```

### 步驟 8：用手機連線

當你在電腦執行 `happy` 後，通常會出現可以讓手機連線的資訊，例如 QR Code。

1. 打開手機上的 Happy App
2. 使用 App 掃描電腦畫面上的 QR Code
3. 掃描成功後，你就能在手機看到目前的工作階段

### 步驟 9：從手機查看與操作

成功連線後，你可以在手機上做這些事：

- 查看 AI 目前在做什麼
- 接收權限請求通知
- 收到錯誤提醒
- 在需要時回覆訊息給 AI

### 步驟 10：切回電腦操作

如果你想把控制權切回電腦，只要回到原本那台電腦，並在鍵盤上按任意鍵即可。

## 🧭 最常用的指令

```bash
happy
happy claude
happy codex
happy daemon status
happy auth login
happy doctor
```

### 這些指令是做什麼的？

- `happy`：啟動 Claude Code 工作階段
- `happy claude`：明確指定使用 Claude Code
- `happy codex`：啟動 Codex 工作階段
- `happy daemon status`：查看背景服務是否正常
- `happy auth login`：登入 Happy
- `happy doctor`：做基本診斷，排查常見問題

## ❓遇到問題時，先檢查這 5 件事

1. 手機和電腦是否都有連上網路
2. 電腦上的 `happy` 指令是否真的有成功啟動
3. `claude` 或 `codex` 是否已經登入
4. 手機 App 是否已更新到最新版
5. 在終端機執行 `happy doctor` 看看有沒有錯誤訊息

## 📦 專案組成

- **[Happy App](https://github.com/slopus/happy/tree/main/packages/happy-app)**：手機版與網頁版介面（Expo）
- **[Happy CLI](https://github.com/slopus/happy/tree/main/packages/happy-cli)**：在電腦上啟動與控制 Claude Code / Codex 的命令列工具
- **[Happy Agent](https://github.com/slopus/happy/tree/main/packages/happy-agent)**：遠端控制工作階段的 CLI
- **[Happy Server](https://github.com/slopus/happy/tree/main/packages/happy-server)**：負責加密同步的後端服務

## 🏠 我們是誰？

我們是一群常在咖啡店、共享空間和住處之間移動的工程師，常常想在離開電腦時，隨時查看 AI 寫程式寫到哪裡。Happy 就是為了解決這個實際需求而誕生：讓你不必一直守在電腦前，也能安全地掌握 AI 工作進度。

## 📚 文件與貢獻方式

- **[文件網站](https://happy.engineering/docs/)**：了解更多使用方式
- **[Contributing Guide](docs/CONTRIBUTING.md)**：如何參與開發、提交 PR 與設定本機環境
- **[Edit docs at github.com/slopus/slopus.github.io](https://github.com/slopus/slopus.github.io)**：一起改善文件與教學內容

## 授權條款

MIT License，詳細內容請見 [LICENSE](LICENSE)。
