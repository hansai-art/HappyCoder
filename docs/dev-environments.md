# 開發環境

本文件說明 [`environments/environments.ts`](../environments/environments.ts) 中的本地環境管理工具。

## `yarn env:*` 的功能

- `yarn env:new`：在 `environments/data/envs/<name>` 下建立一個新的隔離環境。
- `yarn env:use <name>`：切換目前使用的環境。
- `yarn env:server`：在目前環境中執行伺服器。
- `yarn env:web`：在目前環境中執行 Web 應用程式。
- `yarn env:cli`：在目前環境中執行 CLI。

每個環境都會注入自己的：

- `HAPPY_HOME_DIR`
- `HAPPY_SERVER_URL`
- `HAPPY_WEBAPP_URL`
- `HAPPY_PROJECT_DIR`
- Expo／伺服器埠號設定
- 已預設種子時的開發驗證值

每個全新環境也會從 `environments/lab-rat-todo-project/` 複製一份輕量的固定測試專案，放置於 `environments/data/envs/<name>/project`。

目前限制：lab-rat 專案僅以純文字形式複製，尚未包含 git 歷史紀錄，因此依賴真實 repo 歷史的 provider 測試仍需等待後續的固定測試升級。

## `yarn env:cli` 是一個直通指令

`yarn env:cli` 會將額外的引數直接轉發給 `happy`。

範例：

```bash
yarn env:cli --help
yarn env:cli codex
yarn env:cli daemon status
yarn env:cli daemon stop
yarn env:cli daemon start
```

這等同於載入環境並手動執行 CLI：

```bash
source environments/data/envs/<name>/env.sh
happy daemon status
```

## `env:cli` 存在的原因

它是目前環境的便利封裝。它本身不會建立或選取環境，只會：

1. 讀取 `environments/data/current.json`
2. 為該環境建立環境變數
3. 套用這些變數後啟動 CLI

若您偏好更底層、Shell 原生的工作流程，請直接使用產生的環境檔案：

```bash
source environments/data/envs/<name>/env.sh
happy
```

## 重新啟動目前環境的 Daemon

以下兩種方式均可使用：

```bash
yarn env:cli daemon stop
yarn env:cli daemon start
```

或：

```bash
source environments/data/envs/<name>/env.sh
happy daemon stop
happy daemon start
```
