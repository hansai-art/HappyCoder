# 產品分析

# [auto]

## 導覽

- $screen
  - $screen_name

## 生命週期

- Application Installed
- Application Updated
  - previous_version?
  - previous_build?
- Application Opened
  - url?
- Application Became Active
- Application Backgrounded

# [explicit]

## 驗證

- account_created
- account_restored
  - 備注：此為還原流程的開始，而非還原成功

## 核心

- connect_attempt
- message_sent
  - source
  - session_agent
  - session_started_source
  - happy_cli_version
  - ota_version
  - ota_runtime_version
- session_switched
  - session_id
  - session_created_at
  - last_active_at
  - last_updated_at

## 語音

- voice_permission_response
  - allowed
- voice_session_started
  - session_id
  - elevenlabs_conversation_id
- voice_session_error
  - session_id
  - elevenlabs_conversation_id
  - error
- voice_session_stopped
  - session_id
  - elevenlabs_conversation_id
  - duration_seconds

## 付費牆

所有事件均包含 flow 屬性，用於自訂由 Revenue Cat 顯示的追加銷售畫面。

- paywall_button_clicked
- paywall_presented
- paywall_purchased
- paywall_restored
- paywall_cancelled
- paywall_error
  - error

## 評分

- review_prompt_shown
- review_prompt_response
  - likes_app
- review_store_shown
- review_retry_scheduled
  - days_until_retry

## 更新

- ota_update_available
  - ota_version
  - ota_runtime_version
- ota_update_applied
  - ota_version
  - ota_runtime_version
- whats_new_clicked

## GitHub

- github_connected

## 好友

- friends_search
- friends_profile_view
- friends_connect

# 附錄

## 共享 SDK 屬性

- 每個 capture(...) 呼叫也會包含：
  - $lib
  - $lib_version
  - $session_id
  - $screen_height
  - $screen_width
  - $process_person_profile
  - $is_identified
  - $device_type
  - $app_build?
  - $app_name?
  - $app_namespace?
  - $app_version?
  - $device_manufacturer?
  - $device_name?
  - $os_name?
  - $os_version?
  - $locale?
  - $timezone?
  - $screen_name?
  - event
  - distinct_id

## 身份識別與控制傳送

- $identify
- $set
- reset
- optIn
- optOut

## 核心偏好

- 優先使用少量帶有明確屬性的核心事件，而非不斷增長的重疊事件集合。
- `message_sent` 是標準的外發傳送事件。不要為語音等特定介面新增平行傳送事件，請改用或新增 `source`。
- 若新的分析問題可透過擴展現有事件來回答，優先新增屬性而非創建新事件。
- `session_switched` 應攜帶穩定的身份識別，而非僅有近期性。在其上保留 `session_id` 與 `session_created_at`。
- OTA 上下文為一等公民，應與重要事件一起傳遞。在 `message_sent`、`ota_update_available` 及 `ota_update_applied` 上保留 `ota_version` 與 `ota_runtime_version`。
- 在擷取位置優先使用直接、明確的屬性物件。不要將事件形狀隱藏於會靜默新增、移除或篩選欄位的通用輔助層後面。
- 若日後需要工作階段切換的進入來源，請新增明確的 `source` 屬性。不要嘗試從導覽上下文中事後重建。

## 注意事項

- session_switched 現在包含穩定身份識別（`session_id`、`session_created_at`）以及近期性。進入來源仍合併保留，直到我們新增明確的 source 屬性。
- elevenlabs_conversation_id 是由 ElevenLabs 語音工作階段層回傳的對話 ID。
- github_connected 是一個不附帶任何 GitHub 個人資料資料的純事件。

## 相關來源

- packages/happy-app/sources/track/index.ts
- packages/happy-app/sources/hooks/useNavigateToSession.ts
- packages/happy-app/sources/-session/SessionView.tsx
- packages/happy-app/sources/realtime/RealtimeSession.ts
- packages/happy-app/sources/components/SettingsView.tsx
- packages/happy-app/sources/sync/sync.ts
- packages/happy-app/sources/track/useTrackScreens.ts
- packages/happy-app/sources/track/tracking.ts
