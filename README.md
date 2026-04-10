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

## 📘 官方文件台灣中文版（`https://happy.engineering/docs/` 整理翻譯）

上面的 README 已經先把最常見的安裝與使用方式整理成中文；如果你想直接閱讀官方文件網站的內容，下面是依照原始頁面整理的台灣中文版本。每一節都附上原始文件連結，方便你對照。

> 說明：這裡以 **台灣繁體中文** 重寫官方新手文件內容，保留原始重點，並配合本 repo 目前使用的 `happy` 指令名稱撰寫。
> 補充：官方文件原文部分段落仍使用較早期的 `happy-coder` 名稱；本 README 前面的安裝說明也提到它已遷移到 `happy`，所以本文一律以 `happy` 為準。

### 文件快速索引

- [Welcome / 歡迎頁](https://happy.engineering/docs/)
- [Quick Start Guide / 快速開始](https://happy.engineering/docs/quick-start)
- [How It Works / 運作原理](https://happy.engineering/docs/how-it-works)
- [All Features / 功能總覽](https://happy.engineering/docs/features)
- [Real-Time Sync / 即時同步](https://happy.engineering/docs/features/real-time-sync)
- [Voice Coding / 語音開發](https://happy.engineering/docs/features/voice-coding-with-claude-code)
- [Push Notifications / 推播通知](https://happy.engineering/docs/guides/push-notifications)
- [Tips and Tricks / 使用技巧](https://happy.engineering/docs/guides/happy-coder-best-practices)
- [Self-Hosting / 自架伺服器](https://happy.engineering/docs/guides/self-hosting)
- [General FAQ / 常見問題](https://happy.engineering/docs/faq)
- [Security & Encryption / 安全與加密](https://happy.engineering/docs/security)

<details>
<summary><strong>1. Welcome / 歡迎頁</strong></summary>

Happy 讓你可以從 **手機、平板、瀏覽器** 遠端控制 AI 寫程式 agent。最大的差別是：不是把你的程式丟去別人的雲端主機執行，而是直接連到 **你自己擁有的電腦** ── 可以是桌機、筆電、家裡的小主機、伺服器，甚至 Raspberry Pi。

核心價值：

- **不打斷既有工作流**：照樣用你原本的 IDE、CLI、MCP、agent 與硬體環境
- **隨時接手**：在桌機開始，出門後改用手機繼續
- **多工作階段**：前端、後端、測試可以同時開不同 session
- **端對端加密**：程式碼與訊息在離開裝置前先加密
- **免費開源**：沒有雲端使用費，也不綁訂閱

為什麼這很重要？因為你不用改變自己的開發環境，就能把 Claude Code / Codex 的控制範圍延伸到任何地方。對個人專案、私有專案、特殊硬體環境、長時間背景任務都很適合。

官方文件在這一頁也把後續閱讀分成幾個方向：

- **Quick Start**：快速完成第一次連線
- **Managing Sessions**：管理多個工作階段
- **Voice Commands**：用語音和 AI 討論需求
- **Push Notifications**：AI 需要你回應時即時通知
- **Examples / Community**：看實際用法與 GitHub 社群

</details>

<details>
<summary><strong>2. Quick Start Guide / 快速開始</strong></summary>

這一頁的目標很單純：**讓你在最短時間內把手機和電腦連起來。**

#### 安裝步驟

1. **下載 Happy App**
   - iPhone / iPad：App Store
   - Android：Google Play
   - 也可以直接用網頁版：<https://app.happy.engineering>

2. **在電腦安裝 CLI**

   ```bash
   npm install -g happy
   ```

3. **確認 Node.js 版本足夠新**
   - 建議 Node.js 18+
   - 原因包含：`top-level await`、更完整的 `ES module` 支援、穩定版 `fetch API`，以及部分依賴本身就要求 Node 18 以上

4. **在電腦上產生連線資訊**

   ```bash
   happy --auth
   ```

   執行後會顯示 QR Code，讓手機 App 掃描完成綁定。

#### 第一次使用

手機連上電腦之後，你就可以：

1. 開一個新的對話 / 工作階段
2. 開始向 Claude Code 或 Codex 下指令
3. 在手機和電腦之間無縫接手同一個 session

這頁想傳達的重點是：**安裝 CLI、用手機掃碼、開始工作，就這麼簡單。**

</details>

<details>
<summary><strong>3. How It Works / 運作原理</strong></summary>

Happy 的整體架構可以拆成三個部分：

1. **CLI（`happy`）**：跑在你的電腦上，負責啟動 Claude Code / Codex、監看輸出、加密資料並送出
2. **手機 App / Web App**：接收加密資料、解密後顯示目前 session 狀態，讓你從遠端操作
3. **Relay Server**：只負責轉送與暫存加密資料，本身看不到明文內容

#### 為什麼需要 Relay Server？

因為手機和電腦通常在不同網路裡，直接互連很容易被防火牆、NAT、浮動 IP 卡住。Relay Server 像郵局：

- 手機和電腦都主動連出去
- Server 暫存訊息，等待另一端上線
- 不需要自己設定 port forwarding
- 就算人在行動網路、火車上、咖啡店，也能保持 session 延續

#### 為什麼你不用信任官方伺服器？

因為真正重要的資料在送出前就加密了：

- 手機與電腦透過 QR Code 分享祕密金鑰
- Server 不會拿到這把金鑰
- Server 只會看到加密後的 blob
- 就算 Server 被入侵，攻擊者拿到的也只是看不懂的密文

#### 連線與驗證怎麼做？

官方文件描述的是一種接近 **零往返（zero round-trip）** 的驗證方式：

1. 裝置自己產生 challenge
2. 用祕密金鑰簽名
3. 一次把 challenge、簽名、公開金鑰送給 Server
4. Server 只驗證簽名是否合理，不需要來回多次握手

額外的保護還包括：

- Server 只保存公開金鑰的雜湊值
- 真正公開金鑰不長期留在記憶體裡
- 減少伺服器端被窺探後可利用的資訊

#### 資料怎麼流動？

當你在電腦上執行 `happy`：

1. CLI 啟動 Claude Code / Codex
2. Agent 開始分析與修改你的專案
3. CLI 把事件、訊息、輸出加密
4. Server 暫存並轉送加密 blob
5. 手機 / Web 收到後在本地解密顯示

#### 為什麼要保留加密歷史？

兩個實際原因：

- **保留上下文與歷史紀錄**：之後還能回頭看先前做過什麼
- **容忍網路不穩**：手機離線時電腦仍可繼續工作；恢復連線後再把漏掉的更新補齊

#### 對貢獻者的設計原則

官方特別強調：**保持 Server 簡單。**

- 不要把商業邏輯堆到 Relay Server
- 盡量讓 Server 只做轉送與儲存
- 邏輯放在 App 與 CLI，比較容易維護，也比較符合零信任架構

一句話總結：**Happy 的設計重點不是把開發搬到雲端，而是安全地把你自己電腦上的開發 session 延伸到手機。**

</details>

<details>
<summary><strong>4. All Features / 功能總覽</strong></summary>

官方把 Happy 的能力分成「核心架構功能」與「手機優先的使用體驗功能」。

#### 核心架構功能

**1. 即時雙向同步**
- 手機輸入的訊息會即時出現在桌面 CLI
- 電腦上的輸出也會同步回手機
- 沒有主副裝置之分，兩端看的是同一個 session

**2. 多工作階段管理**
- 同時開多個專案、多個 agent
- 每個 session 各自保有上下文、歷史與狀態
- 可以暫停、恢復、切換，不互相污染

**3. 端對端加密與零信任架構**
- QR Code 交換金鑰
- 所有傳輸資料先加密
- Relay Server 僅處理加密內容
- 可自行審計或自架

**4. 離線友善的加密 Pub/Sub**
- CLI 持續上傳加密活動記錄
- 手機可輪詢拉回更新並本地解密
- 指令也能反向回傳
- 網路短暫中斷不等於 session 死掉

**5. 權限請求與遠端核准**
- Claude Code / Codex 需要執行敏感操作時，可在手機上看到 Allow / Deny 提示
- 適合檔案修改、外部 API、MCP 工具等需要人工同意的場景

**6. 檔案提及（File Mentions）**
- 在行動裝置上也能引用專案檔案脈絡

**7. 自訂 slash commands 與 agent library**
- 同步 `~/.claude/agents/` 內容
- 手機也能叫用你自己定義的 agent、slash commands、工具偏好

#### 行動裝置體驗功能

**8. 推播通知**
- 任務完成、出錯、需要你輸入時立刻通知
- 避免你一直手動打開 App 確認進度

**9. 語音代理整合**
- 用語音先整理想法，再轉成對 Claude Code 更清楚的指令
- 適合通勤、散步、躺著想需求時使用

這頁的核心觀點是：**Happy 不只是「手機殼包 CLI」而已，而是把多 session、加密同步、權限核准、語音與通知整合成真正可遠端工作的介面。**

</details>

<details>
<summary><strong>5. Real-Time Sync / 為什麼即時同步很重要</strong></summary>

這頁回答一個很常見的問題：**「你是真的要在手機上寫程式嗎？」**

官方的答案是：**不是。手機不是拿來取代桌面，而是拿來延伸你和桌面 session 的連線範圍。**

#### 兩種做法

很多行動 AI 工具採用的是「背景 agent / 雲端代跑」模式：

- 你從手機丟需求
- 它在雲端 sandbox 執行
- 幫你規劃、改碼、開 PR
- 你跟著它的整套商業工作流走

Happy 故意選擇另一條路：

- 仍然使用你自己的電腦
- 仍然使用你自己的 Claude Code 訂閱
- 仍然使用你自己的 IDE、工具鏈與 repo
- Happy 只負責把這個 session 延伸到手機

#### 即時同步的實際意義

- 手機打字，桌面終端立刻看到
- Claude Code 的回應，同時出現在手機與電腦
- 回到桌前時，不需要重開、不需要 handoff、不需要補背景

#### 什麼時候最有價值？

- 離開座位去拿咖啡、搭車、等看診、陪家人時
- 腦中突然想到 bug 原因或 refactor 想法時
- 不想正式坐回桌前，但想先丟一個實驗給 AI 跑時

#### 手機適合做什麼？

- 用自然語言描述變更
- 看 Claude Code / Codex 的方向對不對
- 規劃需求與架構
- 在靈感冒出來的當下快速補一句話

#### 桌面仍然適合做什麼？

- 多檔案細節 code review
- debug、測試、跑複雜 git 操作
- 任何需要多視窗與精細編輯的工作

總結：**手機不是桌面的替代品，而是讓「同一個 AI coding session」不會因為你離開桌前就中斷。**

</details>

<details>
<summary><strong>6. Voice Coding / 為什麼語音開發有意義</strong></summary>

這頁非常誠實：**語音寫程式本身並不優雅，效率也不會比坐在桌前高。** 但它仍然有價值，因為它能把原本完全浪費掉的思考時間，轉成有產出的探索時間。

#### 這個問題發生在哪裡？

很多高風險、高報酬的想法──像是大規模重構、架構替換、背景工作系統重寫──需要先做一些非正式探索。但你常常：

- 上班時間忙著交付，不適合做高不確定性的實驗
- 下班後大腦還有思考力，身體卻不想再坐回桌前
- 結果那些本來可能很有價值的想法，最後就死掉了

#### Happy 的語音代理扮演什麼角色？

不是陪聊，也不是比你更懂系統的顧問，而是 **翻譯器**：

- 你用口語碎念、倒敘、反覆修正都沒關係
- 語音代理幫你把這些自然語言整理成 Claude Code 比較能執行的請求
- 同時保留和桌面 session 的即時同步

#### 為什麼它仍然值得用？

- **50% 效率的額外三小時**，通常還是勝過完全沒有產出
- 長時間打字真的很傷手，語音能讓手休息、腦繼續工作
- 某些 risky idea 只需要先探路，不需要你立刻進入完整桌面工作模式

#### 實際使用情境

- 開車時把優先順序講給手機，讓 Claude Code 幫你整理成 Linear issue
- 躺在吊床、沙發、床上時，把重構方向先講清楚，讓 AI 先打樣
- 一旦看到結果有感，再回到電腦繼續同一個 session

#### 語音功能的設定重點

- 官方文件目前提到使用 ElevenLabs 做語音轉文字 / 文字轉語音
- 語音 agent 保有自己獨立的上下文
- 會把你的口語敘述整理成較結構化的請求
- 手機和桌面的 session 保持同步

這頁最重要的一句話可以翻成：**語音不是要取代桌面工作，而是把「懶得坐回桌前」和「值得坐回桌前」之間的空白時間接起來。**

</details>

<details>
<summary><strong>7. Push Notifications / 推播通知</strong></summary>

這一頁內容很短，主要是教你怎麼測試推播是否正常：

```bash
happy notify -p "推播內容" -t "通知標題"
```

用途：

- 測試手機目前是否能收到 Happy CLI 發出的通知
- 確認你已經完成通知權限與裝置設定
- 驗證任務完成、錯誤提醒、需要批准時能否順利通知到你

如果你依賴 Happy 在離開座位時提醒你，這個測試指令很實用。

</details>

<details>
<summary><strong>8. Tips and Tricks / 使用技巧</strong></summary>

這頁不是在教你安裝，而是在教你 **怎麼把 Happy 真正融入日常開發習慣**。

#### 1. 把所有會寫程式的裝置都接起來

不要只接主力筆電，建議一起接：

- 開發用筆電 / 桌機
- 家裡常開著的小主機
- VPS / 雲端主機
- Raspberry Pi / 邊緣裝置
- 常用瀏覽器（因為 Happy 也有 Web 版）

這樣做的好處是：你從任何地方開的 session，都能在別的地方直接接手。

#### 2. 立刻打開實驗功能

Settings 裡的 experimental features 通常是最新功能先落地的地方。官方建議新用戶一開始就先打開，早點用到新能力。

#### 3. 不要把手機誤認成替代終端機

Happy 的重點是 **讓終端機工作流可延伸**，不是取代它：

- 你還是可以照常在電腦裡輸入 `happy`
- 或直接在熟悉的 CLI / IDE / terminal 裡工作
- 手機只是提供你離開座位時的接手機制

#### 4. 同時跑多個平行 session

你可以：

- 一個 session 重構前端
- 一個 session 寫後端測試
- 一個 session 跑部署或驗證

尤其當你同時有桌機、VPS、筆電等不同算力來源時，Happy 會更有價值。

#### 5. 先把 git worktree 準備好

官方建議你預先建立多個 worktree，這樣在手機上想到新實驗時，可以快速把不同方向分開跑：

```bash
git worktree add ../project-experiment-1 -b experiment-1
git worktree add ../project-experiment-2 -b experiment-2
git worktree add ../project-experiment-3 -b experiment-3
```

#### 6. 建立「想到就試」的新習慣

Happy 最強的地方之一，就是讓「想到一個改法」和「真的丟給 AI 去做」之間的摩擦變小。官方建議你從小地方開始練：

- 修一個 typo
- 補一段你一直想加的註解
- 試一個洗澡時想到的重構點子

#### 7. 常見工作流模式

- **通勤模式**：出門前丟一個大型任務，通勤途中檢查並微調
- **靈感模式**：離開電腦時想到做法，直接拿手機開一個任務
- **平行探索模式**：同時讓 3–4 個不同做法各自跑，最後挑最好的

總結：**Happy 的價值不只是遠端看進度，而是幫你養成「想法一出現就能立即驗證」的工作節奏。**

</details>

<details>
<summary><strong>9. Self-Hosting / 自架 Happy Server</strong></summary>

如果你不想依賴官方 Relay Server，可以自己架一台。官方對自架的定位很明確：**幾分鐘就能跑起來，而且更能掌握隱私、限制與團隊內部使用方式。**

#### 為什麼要自架？

- **完整掌控隱私**：加密資料只存在你的硬體與你的主機
- **自己決定限制**：流量、儲存、保留政策都能自訂
- **團隊共用**：整個團隊共用同一套 Relay
- **降低依賴**：不怕第三方服務改政策或關站

官方也特別提到，Server 本體程式碼不大，理論上你可以自己快速審閱它真的只是在轉送加密訊息。

#### 快速啟動流程

1. 取得程式碼並建 Docker image
2. 用 PostgreSQL、Redis、SEED、PORT 等環境變數把容器跑起來
3. 在手機設定裡填入 `Relay Server URL`
4. 在電腦上設定 `HAPPY_SERVER_URL`

#### 生產環境建議

- 正式使用請上 HTTPS
- 官方示範用 Caddy 反向代理，自動處理 SSL 憑證
- 若你偏好 Docker Compose 或 Kubernetes，也有對應範例

#### 部署地點建議

- **家裡主機**：成本最低
- **小型 VPS**：每月大約 5～10 美元就夠一般個人用
- **公司內網**：適合團隊內部部署

#### 大致資源需求

- 1～10 位開發者：512MB RAM / 1 CPU / 10GB storage
- 10～100 位開發者：2GB RAM / 2 CPU / 100GB storage

#### 監控與備份

官方建議：

- 用 `docker logs -f happy-server` 看日誌
- 打 `/health`、`/stats` 看狀態
- 備份 `/data` 目錄

而且要記得：**這些備份依然是加密資料**，沒有你的裝置金鑰就無法解密。

#### 自架時的安全提醒

- 伺服器本身仍然看不到你的程式碼內容
- 認證依靠密碼學證明，不是傳統帳密
- 正式環境請使用 HTTPS
- 團隊部署可再搭配 VPN、fail2ban 等額外保護

一句話：**自架不是為了讓伺服器看更多東西，而是讓你自己掌握 Relay 的營運位置與政策。**

</details>

<details>
<summary><strong>10. General FAQ / 常見問題</strong></summary>

#### Happy 是做什麼的？

Happy 是讓你從手機遠端控制多台電腦上 AI coding agent 的工具。它不是另外一個雲端 IDE，而是把你本來就在用的 Claude Code / Codex 延伸到手機與 Web。

#### 是免費的嗎？

是，完全免費，而且開源：

- 沒有 session 數量限制
- 沒有裝置數量限制
- 採 MIT License

#### 會被綁死嗎？

不會，因為：

- 原始碼公開
- 可自行架 Relay Server
- 不要求建立帳號才能開始
- 本質上仍然是搭配原生 Claude Code / Codex 工作

#### 官方為什麼一直強調「簡單」？

因為它想解掉的是手機遠端使用 AI coding tool 的摩擦，而不是再堆一個複雜平台：

- 不用註冊 SaaS 流程
- 跨平台預設可用
- 網路中斷時可自動恢復
- 常見錯誤會給具體提示
- 保持 Unix 哲學：把一件事做好

#### 能在手機上用 Claude 嗎？

要分兩種：

- **Claude（聊天）**：直接用 claude.ai 或官方 App
- **Claude Code（開發工具）**：可透過 Happy 從手機遠端使用

#### 手機上適合做什麼？

- 規劃需求
- 腦力激盪
- 語音討論
- 建立待辦與任務
- 收推播與批准操作

#### 桌面比較適合做什麼？

- 多檔案 code review
- 精細編輯
- 測試、除錯
- 多視窗開發流程

#### Happy 有哪些功能？

FAQ 裡提到的重點包括：

- 開源
- 原生行動介面
- 和桌面無縫同步
- 端對端加密
- 語音互動
- 推播通知
- 離線友善
- 多 session
- 支援 MCP 工具
- 支援自訂 agent 與 slash commands

#### 斷線會怎樣？

- 訊息會排隊等連線恢復
- 電腦上的 Claude Code / Codex 繼續工作
- 手機回線後自動補回狀態
- 不需要重開整個 session

#### 能不能先看 AI 要改什麼再批准？

可以。官方 FAQ 提到可在手機上查看檔案變更、權限請求，並控制是否允許某些操作繼續執行。

#### Relay Server 或官方能看到我的程式碼嗎？

不能。官方文件的立場非常明確：資料在離開裝置前就加密，Server 只能看到密文 blob。

</details>

<details>
<summary><strong>11. Security & Encryption / 安全與加密</strong></summary>

這一頁是官方最技術向的說明，重點是證明：**Happy 的伺服器無法看到你的原始程式碼與內容。**

#### 短版結論

1. 你的資料在離開裝置前就先加密
2. 真正的主祕密只存在你的手機安全儲存區
3. Relay Server 看不到明文，只能搬運加密 blob
4. 原始碼公開，可自行審查與自架

#### 金鑰分層概念

官方把金鑰層次拆成幾層：

- **Master Secret**：帳號根金鑰，只在手機端安全保存，絕不送出
- **Content Key Pair**：由 Master Secret 派生；公開金鑰可分享給 CLI 用來加密資料金鑰
- **Session DEK / Machine DEK**：每個 session 或每台機器各自的資料加密金鑰
- **實際內容層**：訊息、工具呼叫、檔案內容、終端輸出、機器狀態等，都由上面的 DEK 來加密

換句話說，Server 可以保存：

- 已加密的 session 內容
- 已加密的機器資訊
- 已加密的資料金鑰

但它拿不到能解開內容的主金鑰。

#### 驗證後各裝置持有什麼？

- **手機**：有 master secret、content secret key，理論上能解開各種 DEK
- **CLI**：有公開金鑰、機器本地金鑰，以及目前 session 需要的 DEK
- **Server**：只保存加密後的內容與加密後的 DEK，無法自行解密

#### Session 同步流程的重點

官方文件把流程畫得很細，但概念可以濃縮成：

1. 新 session 建立時會產生隨機 DEK
2. DEK 會先用 content public key 再包一層
3. 真正的 session 內容再用該 DEK 加密
4. Server 保存的是「加密後內容 + 加密後 DEK」
5. 只有持有正確私密資訊的裝置能還原內容

#### 為什麼這樣設計？

- 伺服器被攻破時，攻擊者拿不到明文程式碼
- 之後若要支援分享 / 協作，可以只重新加密 DEK，而不用重加密整份內容
- 手機與電腦的權責分明，能降低單點洩漏風險

#### 自架與安全

官方也再次強調：如果你希望完全掌控 Relay 環境，可以自己架。即使不自架，由於 Server 仍看不到明文，所以官方設計的安全假設並不是「請相信我們」，而是「即使你不相信我們，資料仍然安全」。

一句話總結：**Happy 的安全模型重點不是把伺服器變得超可信，而是把伺服器設計成就算不可信，也沒有足夠資訊可以看懂你的資料。**

</details>

## 授權條款

MIT License，詳細內容請見 [LICENSE](LICENSE)。
