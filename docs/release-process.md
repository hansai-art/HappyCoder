# 發布流程

    元件          發布方式                        目的地
    --------      --------                        ------
    CLI           yarn release happy-cli           npm (happy)
    行動版        yarn release（從 happy-app）      App Store、Google Play、TestFlight
    Web 版        TeamCity（Lab_HappyWeb）          docker.korshakov.com/happy-app -> K8s
    Server        TeamCity（Lab_HappyServer）       docker.korshakov.com/handy-server -> K8s


## CLI

    套件             packages/happy-cli
    npm 名稱         happy（以 "npm i -g happy" 安裝）
    版本管理         release-it，標籤 v{version}，分支：main 或 beta
    npm dist-tag     beta

    yarn release                   互動式工作空間選擇器
    yarn release happy-cli         直接發布 CLI

流程：建置（pkgroll）-> 測試（vitest）-> 更新版本號 -> 提交 -> 標籤 -> npm publish -> GitHub release

CI：GitHub Actions `cli-smoke-test.yml` 在 push／PR 至 main 時執行（Linux + Windows，Node 20/24）。
Release notes 由 AI 透過 `.release-it.notes.js` 自動生成。


## 行動版

    套件             packages/happy-app（Expo SDK 54 / React Native 0.81.4）
    3 種變體         development (com.slopus.happy.dev)
                     preview     (com.slopus.happy.preview)
                     production  (com.ex3ndr.happy)

### 指令

    yarn release                       含下列所有選項的互動式選單
    yarn release:build:developer       開發版 + 預覽版建置（共 6 個，iOS + Android）
    yarn release:build:appstore        含自動提交的正式版建置
    yarn ota                           OTA 更新至 preview channel
    yarn ota:production                OTA 更新至 production channel（透過 EAS workflow）

### EAS Build Profiles

    Profile              Distribution   Channel
    -------              ------------   -------
    development          internal       development
    development-store    store          development
    preview              internal       preview
    preview-store        store          preview
    production           store          production

版本來源為遠端（EAS 管理建置號，自動遞增）。
執行時版本「20」——當原生程式碼變更時需更新此號碼以使 OTA 失效。

### 自動化工作流程

    preview.yaml         推送至 main -> OTA 更新至 preview channel
    ota.yaml             手動觸發 -> OTA 更新至 production channel

### App Store Connect

    Apple ID       steve@bulkovo.com
    ASC App ID     126165711
    Team ID        466DQWDR8C


## Web 版

    套件             packages/happy-app（同一個 Expo 應用程式，Web 匯出版）
    Dockerfile       Dockerfile.webapp
    映像檔           docker.korshakov.com/happy-app:{version}
    K8s              packages/happy-app/deploy/happy-app.yaml（3 個副本，nginx 監聽埠號 80）

建置：`expo export --platform web` -> nginx:alpine 靜態伺服器。
建置參數：`POSTHOG_API_KEY`、`REVENUE_CAT_STRIPE`。

CI/CD：TeamCity `Lab_HappyWeb`（設定在 UI 中，不在 repo 內）-> Docker 建置 -> 推送 -> K8s 部署。
GitHub Actions `typecheck.yml` 在 push／PR 至 main 時執行型別檢查。


## Server

    套件             packages/happy-server
    Dockerfile       Dockerfile.server（正式環境），Dockerfile（含 PGlite 的獨立版）
    映像檔           docker.korshakov.com/handy-server:{version}
    K8s              packages/happy-server/deploy/handy.yaml（1 個副本，埠號 3005）

建置：node:20 + python3 + ffmpeg，建置 happy-wire + happy-server。
Secrets 來自 Vault：handy-db、handy-master、handy-github、handy-files、handy-e2b、handy-revenuecat、handy-elevenlabs。
Redis：happy-redis StatefulSet（redis:7-alpine，1Gi 持久化磁碟區）。
指標：Prometheus 於埠號 9090 的 /metrics。

CI/CD：TeamCity `Lab_HappyServer`（設定在 UI 中，不在 repo 內）-> Docker 建置 -> 推送 -> K8s 部署。


## 文件

    網站             happy.engineering（GitHub Pages）
    Repo             github.com/slopus/slopus.github.io

獨立 repo，不屬於本 monorepo 的一部分。
