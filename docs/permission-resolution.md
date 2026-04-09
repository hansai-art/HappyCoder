# 權限解析（基於狀態）

本文件說明工作階段訊息的權限模式如何根據應用程式與 CLI 的當前狀態進行解析。

## 範疇
- 應用程式端狀態解析（工作階段預設值、持久化值、外發訊息元資料）
- Claude CLI 解析（啟動模式、每訊息更新、沙盒政策）
- 傳送至 Claude SDK 的最終模式

## 權限模式
- 共享模式類型：`default | acceptEdits | bypassPermissions | plan | read-only | safe-yolo | yolo`
- Claude SDK 支援：`default | acceptEdits | bypassPermissions | plan`
- 映射至 Claude 的邏輯位於 `packages/happy-cli/src/claude/utils/permissionMode.ts`：
  - `yolo -> bypassPermissions`
  - `safe-yolo -> default`
  - `read-only -> default`

## 應用程式端解析

### 1) 工作階段狀態載入／合併
`packages/happy-app/sources/sync/storage.ts`

合併工作階段時，應用程式依以下順序解析 `session.permissionMode`：
1. 現有的記憶體內工作階段模式（若非 `default`）
2. 從本地儲存取得的持久化每工作階段模式（若非 `default`）
3. 來自伺服器工作階段酬載的模式（若非 `default`）
4. 沙盒後備方案：
   - 若 `session.metadata.sandbox.enabled === true`：`bypassPermissions`
   - 否則：`default`

### 2) 新工作階段草稿後備方案
`packages/happy-app/sources/sync/persistence.ts`

若草稿權限模式缺失：
- 草稿預設值：`default`

### 3) 新工作階段 UI 預設值
`packages/happy-app/sources/app/(app)/new/index.tsx`
`packages/happy-app/sources/components/NewSessionWizard.tsx`

預設選擇：
- `default`

若所選模式對當前選擇的代理無效，UI 會重設為上述代理預設值。

### 4) 外發訊息模式
`packages/happy-app/sources/sync/sync.ts`

傳送時：
- 若 `session.permissionMode` 非 `default`，則傳送該值。
- 否則：
  - 若 `session.metadata.sandbox.enabled === true`：傳送 `bypassPermissions`
  - 否則傳送 `default`

此值傳送於：
- 加密訊息的 `meta.permissionMode`
- socket 信封的 `permissionMode`

## Claude CLI 解析

### 1) 啟動解析
`packages/happy-cli/src/claude/runClaude.ts`
`packages/happy-cli/src/claude/utils/permissionMode.ts`

初始模式來源（優先順序由高至低）：
1. `--dangerously-skip-permissions`（最高優先）-> `bypassPermissions`
2. `--permission-mode VALUE` 或 `--permission-mode=VALUE`
3. 提供的 `options.permissionMode`

接著套用沙盒政策：
- 若啟用沙盒：強制設為 `bypassPermissions`
- 若停用沙盒：保持已解析的模式

### 2) 遠端流程中的每訊息更新
`packages/happy-cli/src/claude/runClaude.ts`

當使用者訊息包含 `meta.permissionMode` 時：
- 若啟用沙盒：強制設為 `bypassPermissions`
- 若停用沙盒：使用傳入的模式

### 3) 本地 Claude 程序
`packages/happy-cli/src/claude/claudeLocal.ts`

若啟用沙盒，啟動器在產生程序前附加 `--dangerously-skip-permissions`。

## 有效結果矩陣

### 啟用沙盒
- 當工作階段模式為 default 或缺失時，應用程式後備模式為 `bypassPermissions`
- Claude CLI 沙盒政策仍在遠端流程中強制設為 `bypassPermissions`

### 停用沙盒
- 若應用程式／工作階段模式非 `default`：使用該模式
- 若應用程式／工作階段模式為 `default` 或缺失：
  - 應用程式傳送 `default`
  - CLI 使用正常模式解析（不強制沙盒）

## 為何此機制現在已穩定
- 客戶端後備方案僅對沙盒工作階段強制略過權限。
- CLI 沙盒政策確保沙盒化的 Claude 工作階段無法透過訊息元資料重新啟用權限提示。
