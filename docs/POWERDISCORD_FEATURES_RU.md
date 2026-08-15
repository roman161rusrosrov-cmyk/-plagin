# Каталог функций PowerDiscord

Автоматически проверено функций: **530**. Категорий: **18**.

> Все функции локальны. PowerDiscord не читает токен, не отправляет данные в сеть и не сохраняет содержимое чужих сообщений.

## Сводка

| Обработчик | Количество |
|---|---:|
| `toggle` | 250 |
| `range` | 30 |
| `theme` | 20 |
| `preset` | 20 |
| `text` | 60 |
| `context-action` | 60 |
| `utility` | 50 |
| `system` | 30 |
| `behavior` | 10 |

## Полный реестр

| № | Ключ | Категория | Название | Обработчик |
|---:|---|---|---|---|
| 1 | `hide_message_avatars` | Сообщения | Скрывать аватары сообщений | `toggle` |
| 2 | `compact_message_avatars` | Интерфейс | Уменьшать аватары сообщений | `toggle` |
| 3 | `privacy_message_avatars` | Приватность | Размывать аватары сообщений | `toggle` |
| 4 | `emphasize_message_avatars` | Доступность | Выделять аватары сообщений | `toggle` |
| 5 | `soften_message_avatars` | Интерфейс | Приглушать аватары сообщений | `toggle` |
| 6 | `hide_message_usernames` | Сообщения | Скрывать имена авторов сообщений | `toggle` |
| 7 | `compact_message_usernames` | Интерфейс | Уменьшать имена авторов сообщений | `toggle` |
| 8 | `privacy_message_usernames` | Приватность | Размывать имена авторов сообщений | `toggle` |
| 9 | `emphasize_message_usernames` | Доступность | Выделять имена авторов сообщений | `toggle` |
| 10 | `soften_message_usernames` | Интерфейс | Приглушать имена авторов сообщений | `toggle` |
| 11 | `hide_message_timestamps` | Сообщения | Скрывать время сообщений | `toggle` |
| 12 | `compact_message_timestamps` | Интерфейс | Уменьшать время сообщений | `toggle` |
| 13 | `privacy_message_timestamps` | Приватность | Размывать время сообщений | `toggle` |
| 14 | `emphasize_message_timestamps` | Доступность | Выделять время сообщений | `toggle` |
| 15 | `soften_message_timestamps` | Интерфейс | Приглушать время сообщений | `toggle` |
| 16 | `hide_message_text` | Сообщения | Скрывать текст сообщений | `toggle` |
| 17 | `compact_message_text` | Интерфейс | Уменьшать текст сообщений | `toggle` |
| 18 | `privacy_message_text` | Приватность | Размывать текст сообщений | `toggle` |
| 19 | `emphasize_message_text` | Доступность | Выделять текст сообщений | `toggle` |
| 20 | `soften_message_text` | Интерфейс | Приглушать текст сообщений | `toggle` |
| 21 | `hide_message_toolbar` | Сообщения | Скрывать панель действий сообщения | `toggle` |
| 22 | `compact_message_toolbar` | Интерфейс | Уменьшать панель действий сообщения | `toggle` |
| 23 | `privacy_message_toolbar` | Приватность | Размывать панель действий сообщения | `toggle` |
| 24 | `emphasize_message_toolbar` | Доступность | Выделять панель действий сообщения | `toggle` |
| 25 | `soften_message_toolbar` | Интерфейс | Приглушать панель действий сообщения | `toggle` |
| 26 | `hide_message_reactions` | Сообщения | Скрывать реакции сообщений | `toggle` |
| 27 | `compact_message_reactions` | Интерфейс | Уменьшать реакции сообщений | `toggle` |
| 28 | `privacy_message_reactions` | Приватность | Размывать реакции сообщений | `toggle` |
| 29 | `emphasize_message_reactions` | Доступность | Выделять реакции сообщений | `toggle` |
| 30 | `soften_message_reactions` | Интерфейс | Приглушать реакции сообщений | `toggle` |
| 31 | `hide_message_embeds` | Сообщения | Скрывать встраиваемые карточки | `toggle` |
| 32 | `compact_message_embeds` | Интерфейс | Уменьшать встраиваемые карточки | `toggle` |
| 33 | `privacy_message_embeds` | Приватность | Размывать встраиваемые карточки | `toggle` |
| 34 | `emphasize_message_embeds` | Доступность | Выделять встраиваемые карточки | `toggle` |
| 35 | `soften_message_embeds` | Интерфейс | Приглушать встраиваемые карточки | `toggle` |
| 36 | `hide_message_attachments` | Сообщения | Скрывать вложения сообщений | `toggle` |
| 37 | `compact_message_attachments` | Интерфейс | Уменьшать вложения сообщений | `toggle` |
| 38 | `privacy_message_attachments` | Приватность | Размывать вложения сообщений | `toggle` |
| 39 | `emphasize_message_attachments` | Доступность | Выделять вложения сообщений | `toggle` |
| 40 | `soften_message_attachments` | Интерфейс | Приглушать вложения сообщений | `toggle` |
| 41 | `hide_reply_preview` | Сообщения | Скрывать предпросмотр ответа | `toggle` |
| 42 | `compact_reply_preview` | Интерфейс | Уменьшать предпросмотр ответа | `toggle` |
| 43 | `privacy_reply_preview` | Приватность | Размывать предпросмотр ответа | `toggle` |
| 44 | `emphasize_reply_preview` | Доступность | Выделять предпросмотр ответа | `toggle` |
| 45 | `soften_reply_preview` | Интерфейс | Приглушать предпросмотр ответа | `toggle` |
| 46 | `hide_thread_indicators` | Сообщения | Скрывать индикаторы веток | `toggle` |
| 47 | `compact_thread_indicators` | Интерфейс | Уменьшать индикаторы веток | `toggle` |
| 48 | `privacy_thread_indicators` | Приватность | Размывать индикаторы веток | `toggle` |
| 49 | `emphasize_thread_indicators` | Доступность | Выделять индикаторы веток | `toggle` |
| 50 | `soften_thread_indicators` | Интерфейс | Приглушать индикаторы веток | `toggle` |
| 51 | `hide_server_rail` | Серверы | Скрывать панель серверов | `toggle` |
| 52 | `compact_server_rail` | Интерфейс | Уменьшать панель серверов | `toggle` |
| 53 | `privacy_server_rail` | Приватность | Размывать панель серверов | `toggle` |
| 54 | `emphasize_server_rail` | Доступность | Выделять панель серверов | `toggle` |
| 55 | `soften_server_rail` | Интерфейс | Приглушать панель серверов | `toggle` |
| 56 | `hide_server_icons` | Серверы | Скрывать значки серверов | `toggle` |
| 57 | `compact_server_icons` | Интерфейс | Уменьшать значки серверов | `toggle` |
| 58 | `privacy_server_icons` | Приватность | Размывать значки серверов | `toggle` |
| 59 | `emphasize_server_icons` | Доступность | Выделять значки серверов | `toggle` |
| 60 | `soften_server_icons` | Интерфейс | Приглушать значки серверов | `toggle` |
| 61 | `hide_server_unread` | Серверы | Скрывать индикаторы непрочитанных серверов | `toggle` |
| 62 | `compact_server_unread` | Интерфейс | Уменьшать индикаторы непрочитанных серверов | `toggle` |
| 63 | `privacy_server_unread` | Приватность | Размывать индикаторы непрочитанных серверов | `toggle` |
| 64 | `emphasize_server_unread` | Доступность | Выделять индикаторы непрочитанных серверов | `toggle` |
| 65 | `soften_server_unread` | Интерфейс | Приглушать индикаторы непрочитанных серверов | `toggle` |
| 66 | `hide_channel_sidebar` | Каналы | Скрывать панель каналов | `toggle` |
| 67 | `compact_channel_sidebar` | Интерфейс | Уменьшать панель каналов | `toggle` |
| 68 | `privacy_channel_sidebar` | Приватность | Размывать панель каналов | `toggle` |
| 69 | `emphasize_channel_sidebar` | Доступность | Выделять панель каналов | `toggle` |
| 70 | `soften_channel_sidebar` | Интерфейс | Приглушать панель каналов | `toggle` |
| 71 | `hide_channel_icons` | Каналы | Скрывать значки каналов | `toggle` |
| 72 | `compact_channel_icons` | Интерфейс | Уменьшать значки каналов | `toggle` |
| 73 | `privacy_channel_icons` | Приватность | Размывать значки каналов | `toggle` |
| 74 | `emphasize_channel_icons` | Доступность | Выделять значки каналов | `toggle` |
| 75 | `soften_channel_icons` | Интерфейс | Приглушать значки каналов | `toggle` |
| 76 | `hide_channel_names` | Каналы | Скрывать названия каналов | `toggle` |
| 77 | `compact_channel_names` | Интерфейс | Уменьшать названия каналов | `toggle` |
| 78 | `privacy_channel_names` | Приватность | Размывать названия каналов | `toggle` |
| 79 | `emphasize_channel_names` | Доступность | Выделять названия каналов | `toggle` |
| 80 | `soften_channel_names` | Интерфейс | Приглушать названия каналов | `toggle` |
| 81 | `hide_channel_categories` | Каналы | Скрывать категории каналов | `toggle` |
| 82 | `compact_channel_categories` | Интерфейс | Уменьшать категории каналов | `toggle` |
| 83 | `privacy_channel_categories` | Приватность | Размывать категории каналов | `toggle` |
| 84 | `emphasize_channel_categories` | Доступность | Выделять категории каналов | `toggle` |
| 85 | `soften_channel_categories` | Интерфейс | Приглушать категории каналов | `toggle` |
| 86 | `hide_channel_unread` | Каналы | Скрывать индикаторы непрочитанных каналов | `toggle` |
| 87 | `compact_channel_unread` | Интерфейс | Уменьшать индикаторы непрочитанных каналов | `toggle` |
| 88 | `privacy_channel_unread` | Приватность | Размывать индикаторы непрочитанных каналов | `toggle` |
| 89 | `emphasize_channel_unread` | Доступность | Выделять индикаторы непрочитанных каналов | `toggle` |
| 90 | `soften_channel_unread` | Интерфейс | Приглушать индикаторы непрочитанных каналов | `toggle` |
| 91 | `hide_voice_users` | Голос | Скрывать участники голосовых каналов | `toggle` |
| 92 | `compact_voice_users` | Интерфейс | Уменьшать участники голосовых каналов | `toggle` |
| 93 | `privacy_voice_users` | Приватность | Размывать участники голосовых каналов | `toggle` |
| 94 | `emphasize_voice_users` | Доступность | Выделять участники голосовых каналов | `toggle` |
| 95 | `soften_voice_users` | Интерфейс | Приглушать участники голосовых каналов | `toggle` |
| 96 | `hide_voice_controls` | Голос | Скрывать голосовые элементы управления | `toggle` |
| 97 | `compact_voice_controls` | Интерфейс | Уменьшать голосовые элементы управления | `toggle` |
| 98 | `privacy_voice_controls` | Приватность | Размывать голосовые элементы управления | `toggle` |
| 99 | `emphasize_voice_controls` | Доступность | Выделять голосовые элементы управления | `toggle` |
| 100 | `soften_voice_controls` | Интерфейс | Приглушать голосовые элементы управления | `toggle` |
| 101 | `hide_member_list` | Пользователи | Скрывать список участников | `toggle` |
| 102 | `compact_member_list` | Интерфейс | Уменьшать список участников | `toggle` |
| 103 | `privacy_member_list` | Приватность | Размывать список участников | `toggle` |
| 104 | `emphasize_member_list` | Доступность | Выделять список участников | `toggle` |
| 105 | `soften_member_list` | Интерфейс | Приглушать список участников | `toggle` |
| 106 | `hide_member_avatars` | Пользователи | Скрывать аватары участников | `toggle` |
| 107 | `compact_member_avatars` | Интерфейс | Уменьшать аватары участников | `toggle` |
| 108 | `privacy_member_avatars` | Приватность | Размывать аватары участников | `toggle` |
| 109 | `emphasize_member_avatars` | Доступность | Выделять аватары участников | `toggle` |
| 110 | `soften_member_avatars` | Интерфейс | Приглушать аватары участников | `toggle` |
| 111 | `hide_member_names` | Пользователи | Скрывать имена участников | `toggle` |
| 112 | `compact_member_names` | Интерфейс | Уменьшать имена участников | `toggle` |
| 113 | `privacy_member_names` | Приватность | Размывать имена участников | `toggle` |
| 114 | `emphasize_member_names` | Доступность | Выделять имена участников | `toggle` |
| 115 | `soften_member_names` | Интерфейс | Приглушать имена участников | `toggle` |
| 116 | `hide_member_activities` | Пользователи | Скрывать активности участников | `toggle` |
| 117 | `compact_member_activities` | Интерфейс | Уменьшать активности участников | `toggle` |
| 118 | `privacy_member_activities` | Приватность | Размывать активности участников | `toggle` |
| 119 | `emphasize_member_activities` | Доступность | Выделять активности участников | `toggle` |
| 120 | `soften_member_activities` | Интерфейс | Приглушать активности участников | `toggle` |
| 121 | `hide_role_chips` | Пользователи | Скрывать плашки ролей | `toggle` |
| 122 | `compact_role_chips` | Интерфейс | Уменьшать плашки ролей | `toggle` |
| 123 | `privacy_role_chips` | Приватность | Размывать плашки ролей | `toggle` |
| 124 | `emphasize_role_chips` | Доступность | Выделять плашки ролей | `toggle` |
| 125 | `soften_role_chips` | Интерфейс | Приглушать плашки ролей | `toggle` |
| 126 | `hide_top_toolbar` | Интерфейс | Скрывать верхняя панель чата | `toggle` |
| 127 | `compact_top_toolbar` | Интерфейс | Уменьшать верхняя панель чата | `toggle` |
| 128 | `privacy_top_toolbar` | Приватность | Размывать верхняя панель чата | `toggle` |
| 129 | `emphasize_top_toolbar` | Доступность | Выделять верхняя панель чата | `toggle` |
| 130 | `soften_top_toolbar` | Интерфейс | Приглушать верхняя панель чата | `toggle` |
| 131 | `hide_search_bar` | Поиск и навигация | Скрывать строка поиска Discord | `toggle` |
| 132 | `compact_search_bar` | Интерфейс | Уменьшать строка поиска Discord | `toggle` |
| 133 | `privacy_search_bar` | Приватность | Размывать строка поиска Discord | `toggle` |
| 134 | `emphasize_search_bar` | Доступность | Выделять строка поиска Discord | `toggle` |
| 135 | `soften_search_bar` | Интерфейс | Приглушать строка поиска Discord | `toggle` |
| 136 | `hide_inbox_button` | Уведомления | Скрывать кнопка входящих | `toggle` |
| 137 | `compact_inbox_button` | Интерфейс | Уменьшать кнопка входящих | `toggle` |
| 138 | `privacy_inbox_button` | Приватность | Размывать кнопка входящих | `toggle` |
| 139 | `emphasize_inbox_button` | Доступность | Выделять кнопка входящих | `toggle` |
| 140 | `soften_inbox_button` | Интерфейс | Приглушать кнопка входящих | `toggle` |
| 141 | `hide_help_button` | Интерфейс | Скрывать кнопка помощи | `toggle` |
| 142 | `compact_help_button` | Интерфейс | Уменьшать кнопка помощи | `toggle` |
| 143 | `privacy_help_button` | Приватность | Размывать кнопка помощи | `toggle` |
| 144 | `emphasize_help_button` | Доступность | Выделять кнопка помощи | `toggle` |
| 145 | `soften_help_button` | Интерфейс | Приглушать кнопка помощи | `toggle` |
| 146 | `hide_pins_button` | Сообщения | Скрывать кнопка закреплённых сообщений | `toggle` |
| 147 | `compact_pins_button` | Интерфейс | Уменьшать кнопка закреплённых сообщений | `toggle` |
| 148 | `privacy_pins_button` | Приватность | Размывать кнопка закреплённых сообщений | `toggle` |
| 149 | `emphasize_pins_button` | Доступность | Выделять кнопка закреплённых сообщений | `toggle` |
| 150 | `soften_pins_button` | Интерфейс | Приглушать кнопка закреплённых сообщений | `toggle` |
| 151 | `hide_invite_button` | Приватность | Скрывать кнопки приглашений | `toggle` |
| 152 | `compact_invite_button` | Интерфейс | Уменьшать кнопки приглашений | `toggle` |
| 153 | `privacy_invite_button` | Приватность | Размывать кнопки приглашений | `toggle` |
| 154 | `emphasize_invite_button` | Доступность | Выделять кнопки приглашений | `toggle` |
| 155 | `soften_invite_button` | Интерфейс | Приглушать кнопки приглашений | `toggle` |
| 156 | `hide_user_panel` | Интерфейс | Скрывать нижняя панель аккаунта | `toggle` |
| 157 | `compact_user_panel` | Интерфейс | Уменьшать нижняя панель аккаунта | `toggle` |
| 158 | `privacy_user_panel` | Приватность | Размывать нижняя панель аккаунта | `toggle` |
| 159 | `emphasize_user_panel` | Доступность | Выделять нижняя панель аккаунта | `toggle` |
| 160 | `soften_user_panel` | Интерфейс | Приглушать нижняя панель аккаунта | `toggle` |
| 161 | `hide_self_avatar` | Приватность | Скрывать аватар текущего аккаунта | `toggle` |
| 162 | `compact_self_avatar` | Интерфейс | Уменьшать аватар текущего аккаунта | `toggle` |
| 163 | `privacy_self_avatar` | Приватность | Размывать аватар текущего аккаунта | `toggle` |
| 164 | `emphasize_self_avatar` | Доступность | Выделять аватар текущего аккаунта | `toggle` |
| 165 | `soften_self_avatar` | Интерфейс | Приглушать аватар текущего аккаунта | `toggle` |
| 166 | `hide_account_name` | Приватность | Скрывать имя текущего аккаунта | `toggle` |
| 167 | `compact_account_name` | Интерфейс | Уменьшать имя текущего аккаунта | `toggle` |
| 168 | `privacy_account_name` | Приватность | Размывать имя текущего аккаунта | `toggle` |
| 169 | `emphasize_account_name` | Доступность | Выделять имя текущего аккаунта | `toggle` |
| 170 | `soften_account_name` | Интерфейс | Приглушать имя текущего аккаунта | `toggle` |
| 171 | `hide_mute_buttons` | Голос | Скрывать кнопки микрофона и звука | `toggle` |
| 172 | `compact_mute_buttons` | Интерфейс | Уменьшать кнопки микрофона и звука | `toggle` |
| 173 | `privacy_mute_buttons` | Приватность | Размывать кнопки микрофона и звука | `toggle` |
| 174 | `emphasize_mute_buttons` | Доступность | Выделять кнопки микрофона и звука | `toggle` |
| 175 | `soften_mute_buttons` | Интерфейс | Приглушать кнопки микрофона и звука | `toggle` |
| 176 | `hide_typing_indicator` | Сообщения | Скрывать индикатор набора текста | `toggle` |
| 177 | `compact_typing_indicator` | Интерфейс | Уменьшать индикатор набора текста | `toggle` |
| 178 | `privacy_typing_indicator` | Приватность | Размывать индикатор набора текста | `toggle` |
| 179 | `emphasize_typing_indicator` | Доступность | Выделять индикатор набора текста | `toggle` |
| 180 | `soften_typing_indicator` | Интерфейс | Приглушать индикатор набора текста | `toggle` |
| 181 | `hide_composer_buttons` | Интерфейс | Скрывать кнопки поля сообщения | `toggle` |
| 182 | `compact_composer_buttons` | Интерфейс | Уменьшать кнопки поля сообщения | `toggle` |
| 183 | `privacy_composer_buttons` | Приватность | Размывать кнопки поля сообщения | `toggle` |
| 184 | `emphasize_composer_buttons` | Доступность | Выделять кнопки поля сообщения | `toggle` |
| 185 | `soften_composer_buttons` | Интерфейс | Приглушать кнопки поля сообщения | `toggle` |
| 186 | `hide_gif_button` | Медиа | Скрывать кнопка GIF | `toggle` |
| 187 | `compact_gif_button` | Интерфейс | Уменьшать кнопка GIF | `toggle` |
| 188 | `privacy_gif_button` | Приватность | Размывать кнопка GIF | `toggle` |
| 189 | `emphasize_gif_button` | Доступность | Выделять кнопка GIF | `toggle` |
| 190 | `soften_gif_button` | Интерфейс | Приглушать кнопка GIF | `toggle` |
| 191 | `hide_sticker_button` | Медиа | Скрывать кнопка стикеров | `toggle` |
| 192 | `compact_sticker_button` | Интерфейс | Уменьшать кнопка стикеров | `toggle` |
| 193 | `privacy_sticker_button` | Приватность | Размывать кнопка стикеров | `toggle` |
| 194 | `emphasize_sticker_button` | Доступность | Выделять кнопка стикеров | `toggle` |
| 195 | `soften_sticker_button` | Интерфейс | Приглушать кнопка стикеров | `toggle` |
| 196 | `hide_gift_button` | Интерфейс | Скрывать кнопка подарка | `toggle` |
| 197 | `compact_gift_button` | Интерфейс | Уменьшать кнопка подарка | `toggle` |
| 198 | `privacy_gift_button` | Приватность | Размывать кнопка подарка | `toggle` |
| 199 | `emphasize_gift_button` | Доступность | Выделять кнопка подарка | `toggle` |
| 200 | `soften_gift_button` | Интерфейс | Приглушать кнопка подарка | `toggle` |
| 201 | `hide_emoji_button` | Медиа | Скрывать кнопка эмодзи | `toggle` |
| 202 | `compact_emoji_button` | Интерфейс | Уменьшать кнопка эмодзи | `toggle` |
| 203 | `privacy_emoji_button` | Приватность | Размывать кнопка эмодзи | `toggle` |
| 204 | `emphasize_emoji_button` | Доступность | Выделять кнопка эмодзи | `toggle` |
| 205 | `soften_emoji_button` | Интерфейс | Приглушать кнопка эмодзи | `toggle` |
| 206 | `hide_activity_cards` | Интерфейс | Скрывать карточки активностей | `toggle` |
| 207 | `compact_activity_cards` | Интерфейс | Уменьшать карточки активностей | `toggle` |
| 208 | `privacy_activity_cards` | Приватность | Размывать карточки активностей | `toggle` |
| 209 | `emphasize_activity_cards` | Доступность | Выделять карточки активностей | `toggle` |
| 210 | `soften_activity_cards` | Интерфейс | Приглушать карточки активностей | `toggle` |
| 211 | `hide_now_playing` | Интерфейс | Скрывать панель «Сейчас активно» | `toggle` |
| 212 | `compact_now_playing` | Интерфейс | Уменьшать панель «Сейчас активно» | `toggle` |
| 213 | `privacy_now_playing` | Приватность | Размывать панель «Сейчас активно» | `toggle` |
| 214 | `emphasize_now_playing` | Доступность | Выделять панель «Сейчас активно» | `toggle` |
| 215 | `soften_now_playing` | Интерфейс | Приглушать панель «Сейчас активно» | `toggle` |
| 216 | `hide_profile_banners` | Приватность | Скрывать баннеры профилей | `toggle` |
| 217 | `compact_profile_banners` | Интерфейс | Уменьшать баннеры профилей | `toggle` |
| 218 | `privacy_profile_banners` | Приватность | Размывать баннеры профилей | `toggle` |
| 219 | `emphasize_profile_banners` | Доступность | Выделять баннеры профилей | `toggle` |
| 220 | `soften_profile_banners` | Интерфейс | Приглушать баннеры профилей | `toggle` |
| 221 | `hide_avatar_decorations` | Пользователи | Скрывать декорации аватаров | `toggle` |
| 222 | `compact_avatar_decorations` | Интерфейс | Уменьшать декорации аватаров | `toggle` |
| 223 | `privacy_avatar_decorations` | Приватность | Размывать декорации аватаров | `toggle` |
| 224 | `emphasize_avatar_decorations` | Доступность | Выделять декорации аватаров | `toggle` |
| 225 | `soften_avatar_decorations` | Интерфейс | Приглушать декорации аватаров | `toggle` |
| 226 | `hide_status_text` | Приватность | Скрывать текст пользовательских статусов | `toggle` |
| 227 | `compact_status_text` | Интерфейс | Уменьшать текст пользовательских статусов | `toggle` |
| 228 | `privacy_status_text` | Приватность | Размывать текст пользовательских статусов | `toggle` |
| 229 | `emphasize_status_text` | Доступность | Выделять текст пользовательских статусов | `toggle` |
| 230 | `soften_status_text` | Интерфейс | Приглушать текст пользовательских статусов | `toggle` |
| 231 | `hide_role_icons` | Пользователи | Скрывать значки ролей | `toggle` |
| 232 | `compact_role_icons` | Интерфейс | Уменьшать значки ролей | `toggle` |
| 233 | `privacy_role_icons` | Приватность | Размывать значки ролей | `toggle` |
| 234 | `emphasize_role_icons` | Доступность | Выделять значки ролей | `toggle` |
| 235 | `soften_role_icons` | Интерфейс | Приглушать значки ролей | `toggle` |
| 236 | `hide_clan_tags` | Приватность | Скрывать теги кланов | `toggle` |
| 237 | `compact_clan_tags` | Интерфейс | Уменьшать теги кланов | `toggle` |
| 238 | `privacy_clan_tags` | Приватность | Размывать теги кланов | `toggle` |
| 239 | `emphasize_clan_tags` | Доступность | Выделять теги кланов | `toggle` |
| 240 | `soften_clan_tags` | Интерфейс | Приглушать теги кланов | `toggle` |
| 241 | `hide_forum_tags` | Каналы | Скрывать теги форумов | `toggle` |
| 242 | `compact_forum_tags` | Интерфейс | Уменьшать теги форумов | `toggle` |
| 243 | `privacy_forum_tags` | Приватность | Размывать теги форумов | `toggle` |
| 244 | `emphasize_forum_tags` | Доступность | Выделять теги форумов | `toggle` |
| 245 | `soften_forum_tags` | Интерфейс | Приглушать теги форумов | `toggle` |
| 246 | `hide_poll_blocks` | Сообщения | Скрывать блоки опросов | `toggle` |
| 247 | `compact_poll_blocks` | Интерфейс | Уменьшать блоки опросов | `toggle` |
| 248 | `privacy_poll_blocks` | Приватность | Размывать блоки опросов | `toggle` |
| 249 | `emphasize_poll_blocks` | Доступность | Выделять блоки опросов | `toggle` |
| 250 | `soften_poll_blocks` | Интерфейс | Приглушать блоки опросов | `toggle` |
| 251 | `message_font_scale` | Сообщения | Масштаб текста сообщений | `range` |
| 252 | `message_line_height` | Сообщения | Межстрочный интервал | `range` |
| 253 | `message_gap` | Сообщения | Отступ сообщений | `range` |
| 254 | `interface_radius` | Интерфейс | Скругление интерфейса | `range` |
| 255 | `ui_scale` | Интерфейс | Масштаб PowerDiscord | `range` |
| 256 | `media_brightness` | Медиа | Яркость медиа | `range` |
| 257 | `media_saturation` | Медиа | Насыщенность медиа | `range` |
| 258 | `media_contrast` | Медиа | Контраст медиа | `range` |
| 259 | `privacy_blur` | Приватность | Сила размытия | `range` |
| 260 | `panel_opacity` | Темы | Прозрачность панелей | `range` |
| 261 | `panel_blur` | Темы | Размытие панелей | `range` |
| 262 | `command_width` | Интерфейс | Ширина центра команд | `range` |
| 263 | `avatar_scale` | Пользователи | Масштаб аватаров | `range` |
| 264 | `emoji_scale` | Медиа | Масштаб эмодзи | `range` |
| 265 | `channel_width` | Каналы | Ширина каналов | `range` |
| 266 | `member_width` | Пользователи | Ширина участников | `range` |
| 267 | `guild_width` | Серверы | Ширина серверной ленты | `range` |
| 268 | `composer_height` | Сообщения | Минимальная высота поля ввода | `range` |
| 269 | `code_font_size` | Сообщения | Размер кода | `range` |
| 270 | `animation_speed` | Доступность | Скорость анимаций | `range` |
| 271 | `status_opacity` | Интерфейс | Прозрачность строки состояния | `range` |
| 272 | `toolbar_scale` | Интерфейс | Масштаб верхней панели | `range` |
| 273 | `image_radius` | Медиа | Скругление изображений | `range` |
| 274 | `embed_max_width` | Сообщения | Ширина вложенных карточек | `range` |
| 275 | `user_panel_scale` | Интерфейс | Масштаб панели аккаунта | `range` |
| 276 | `scrollbar_width` | Доступность | Ширина полосы прокрутки | `range` |
| 277 | `outline_width` | Доступность | Толщина акцентного контура | `range` |
| 278 | `shadow_strength` | Темы | Сила теней | `range` |
| 279 | `chat_max_width` | Сообщения | Максимальная ширина чтения | `range` |
| 280 | `night_dim` | Доступность | Ночное затемнение | `range` |
| 281 | `theme_default_green` | Темы | Тема «Спокойная зелёная» | `theme` |
| 282 | `theme_forest` | Темы | Тема «Глубокий лес» | `theme` |
| 283 | `theme_sage` | Темы | Тема «Мягкий шалфей» | `theme` |
| 284 | `theme_purple` | Темы | Тема «Спокойная фиолетовая» | `theme` |
| 285 | `theme_blue` | Темы | Тема «Глубокая синяя» | `theme` |
| 286 | `theme_ocean` | Темы | Тема «Океан» | `theme` |
| 287 | `theme_oled` | Темы | Тема «OLED» | `theme` |
| 288 | `theme_midnight` | Темы | Тема «Полночь» | `theme` |
| 289 | `theme_graphite` | Темы | Тема «Графит» | `theme` |
| 290 | `theme_soft` | Темы | Тема «Мягкая» | `theme` |
| 291 | `theme_glass` | Темы | Тема «Стекло» | `theme` |
| 292 | `theme_cyber` | Темы | Тема «Кибер-зелёная» | `theme` |
| 293 | `theme_amber` | Темы | Тема «Тёплая янтарная» | `theme` |
| 294 | `theme_rose` | Темы | Тема «Пыльная роза» | `theme` |
| 295 | `theme_ice` | Темы | Тема «Холодный лёд» | `theme` |
| 296 | `theme_sand` | Темы | Тема «Тёмный песок» | `theme` |
| 297 | `theme_red` | Темы | Тема «Приглушённая красная» | `theme` |
| 298 | `theme_teal` | Темы | Тема «Бирюзовая» | `theme` |
| 299 | `theme_mono` | Темы | Тема «Монохром» | `theme` |
| 300 | `theme_violet_green` | Темы | Тема «Фиолетово-зелёная» | `theme` |
| 301 | `preset_calm` | Интерфейс | Спокойный режим | `preset` |
| 302 | `preset_focus` | Интерфейс | Фокус | `preset` |
| 303 | `preset_stream` | Интерфейс | Стрим | `preset` |
| 304 | `preset_minimal` | Интерфейс | Минимализм | `preset` |
| 305 | `preset_night` | Интерфейс | Ночной режим | `preset` |
| 306 | `preset_reading` | Интерфейс | Чтение | `preset` |
| 307 | `preset_compact` | Интерфейс | Компактный | `preset` |
| 308 | `preset_large` | Интерфейс | Большой экран | `preset` |
| 309 | `preset_ultrawide` | Интерфейс | Ультраширокий | `preset` |
| 310 | `preset_vertical` | Интерфейс | Вертикальный монитор | `preset` |
| 311 | `preset_accessibility` | Интерфейс | Доступность | `preset` |
| 312 | `preset_performance` | Интерфейс | Производительность | `preset` |
| 313 | `preset_media` | Интерфейс | Медиа | `preset` |
| 314 | `preset_privacy_max` | Интерфейс | Максимальная приватность | `preset` |
| 315 | `preset_screenshot` | Интерфейс | Снимок экрана | `preset` |
| 316 | `preset_work` | Интерфейс | Рабочий профиль | `preset` |
| 317 | `preset_gaming` | Интерфейс | Игровой профиль | `preset` |
| 318 | `preset_quiet` | Интерфейс | Тихий режим | `preset` |
| 319 | `preset_reset_visual` | Интерфейс | Обычный вид | `preset` |
| 320 | `preset_safe` | Интерфейс | Безопасный режим | `preset` |
| 321 | `text_uppercase` | Работа с текстом | ВЕРХНИЙ РЕГИСТР | `text` |
| 322 | `text_lowercase` | Работа с текстом | нижний регистр | `text` |
| 323 | `text_title_case` | Работа с текстом | Каждое Слово С Заглавной | `text` |
| 324 | `text_sentence_case` | Работа с текстом | Регистр предложений | `text` |
| 325 | `text_toggle_case` | Работа с текстом | Инвертировать регистр | `text` |
| 326 | `text_capitalize_words` | Работа с текстом | Заглавные значимые слова | `text` |
| 327 | `text_trim` | Работа с текстом | Убрать края | `text` |
| 328 | `text_collapse_spaces` | Работа с текстом | Схлопнуть пробелы | `text` |
| 329 | `text_trim_lines` | Работа с текстом | Очистить края строк | `text` |
| 330 | `text_remove_blank_lines` | Работа с текстом | Удалить пустые строки | `text` |
| 331 | `text_unique_lines` | Работа с текстом | Оставить уникальные строки | `text` |
| 332 | `text_sort_lines_asc` | Работа с текстом | Сортировать строки А–Я | `text` |
| 333 | `text_sort_lines_desc` | Работа с текстом | Сортировать строки Я–А | `text` |
| 334 | `text_reverse_lines` | Работа с текстом | Обратить порядок строк | `text` |
| 335 | `text_reverse_text` | Работа с текстом | Перевернуть текст | `text` |
| 336 | `text_number_lines` | Работа с текстом | Пронумеровать строки | `text` |
| 337 | `text_bullet_list` | Работа с текстом | Маркированный список | `text` |
| 338 | `text_checklist` | Работа с текстом | Список задач | `text` |
| 339 | `text_quote` | Работа с текстом | Цитата Discord | `text` |
| 340 | `text_spoiler` | Работа с текстом | Скрыть под спойлер | `text` |
| 341 | `text_inline_code` | Работа с текстом | Встроенный код | `text` |
| 342 | `text_code_block` | Работа с текстом | Блок кода | `text` |
| 343 | `text_bold` | Работа с текстом | Жирный текст | `text` |
| 344 | `text_italic` | Работа с текстом | Курсив | `text` |
| 345 | `text_underline` | Работа с текстом | Подчёркнутый текст | `text` |
| 346 | `text_strike` | Работа с текстом | Зачёркнутый текст | `text` |
| 347 | `text_escape_markdown` | Работа с текстом | Экранировать Markdown | `text` |
| 348 | `text_strip_markdown` | Работа с текстом | Удалить Markdown | `text` |
| 349 | `text_extract_urls` | Работа с текстом | Извлечь ссылки | `text` |
| 350 | `text_remove_urls` | Работа с текстом | Удалить ссылки | `text` |
| 351 | `text_extract_mentions` | Работа с текстом | Извлечь упоминания | `text` |
| 352 | `text_extract_hashtags` | Работа с текстом | Извлечь хэштеги | `text` |
| 353 | `text_word_count` | Работа с текстом | Посчитать слова | `text` |
| 354 | `text_char_count` | Работа с текстом | Посчитать символы | `text` |
| 355 | `text_line_count` | Работа с текстом | Посчитать строки | `text` |
| 356 | `text_reading_time` | Работа с текстом | Время чтения | `text` |
| 357 | `text_json_pretty` | Работа с текстом | Красивый JSON | `text` |
| 358 | `text_json_minify` | Работа с текстом | Сжать JSON | `text` |
| 359 | `text_url_encode` | Работа с текстом | URL-кодирование | `text` |
| 360 | `text_url_decode` | Работа с текстом | URL-декодирование | `text` |
| 361 | `text_base64_encode` | Работа с текстом | Кодировать Base64 | `text` |
| 362 | `text_base64_decode` | Работа с текстом | Декодировать Base64 | `text` |
| 363 | `text_html_escape` | Работа с текстом | Экранировать HTML | `text` |
| 364 | `text_html_unescape` | Работа с текстом | Декодировать HTML | `text` |
| 365 | `text_transliterate_ru` | Работа с текстом | Транслитерация RU→LAT | `text` |
| 366 | `text_snake_case` | Работа с текстом | snake_case | `text` |
| 367 | `text_kebab_case` | Работа с текстом | kebab-case | `text` |
| 368 | `text_camel_case` | Работа с текстом | camelCase | `text` |
| 369 | `text_pascal_case` | Работа с текстом | PascalCase | `text` |
| 370 | `text_constant_case` | Работа с текстом | CONSTANT_CASE | `text` |
| 371 | `text_dot_case` | Работа с текстом | dot.case | `text` |
| 372 | `text_path_case` | Работа с текстом | path/case | `text` |
| 373 | `text_remove_diacritics` | Работа с текстом | Убрать диакритику | `text` |
| 374 | `text_normalize_quotes` | Работа с текстом | Нормализовать кавычки | `text` |
| 375 | `text_normalize_dashes` | Работа с текстом | Нормализовать тире | `text` |
| 376 | `text_tabs_to_spaces` | Работа с текстом | Табуляции → пробелы | `text` |
| 377 | `text_spaces_to_tabs` | Работа с текстом | Отступы → табуляции | `text` |
| 378 | `text_unix_newlines` | Работа с текстом | Переводы строк LF | `text` |
| 379 | `text_add_timestamp` | Работа с текстом | Добавить текущее время | `text` |
| 380 | `text_wrap_parentheses` | Работа с текстом | Обернуть в скобки | `text` |
| 381 | `message_copy_text` | Сообщения | Копировать текст сообщения | `context-action` |
| 382 | `message_copy_clean_text` | Сообщения | Копировать чистый текст | `context-action` |
| 383 | `message_copy_message_id` | Сообщения | Копировать ID сообщения | `context-action` |
| 384 | `message_copy_channel_id` | Сообщения | Копировать ID канала | `context-action` |
| 385 | `message_copy_jump_link` | Сообщения | Копировать ссылку перехода | `context-action` |
| 386 | `message_copy_author` | Сообщения | Копировать имя автора | `context-action` |
| 387 | `message_copy_timestamp` | Сообщения | Копировать время сообщения | `context-action` |
| 388 | `message_copy_snowflake_date` | Сообщения | Дата создания по Snowflake | `context-action` |
| 389 | `message_copy_links` | Сообщения | Копировать ссылки сообщения | `context-action` |
| 390 | `message_copy_mentions` | Сообщения | Копировать упоминания | `context-action` |
| 391 | `message_copy_code` | Сообщения | Копировать код сообщения | `context-action` |
| 392 | `message_copy_attachment_urls` | Сообщения | Копировать ссылки вложений | `context-action` |
| 393 | `message_copy_image_urls` | Сообщения | Копировать ссылки изображений | `context-action` |
| 394 | `message_copy_quote` | Сообщения | Копировать как цитату | `context-action` |
| 395 | `message_copy_spoiler` | Сообщения | Копировать как спойлер | `context-action` |
| 396 | `message_copy_selection` | Сообщения | Копировать выделенный текст | `context-action` |
| 397 | `message_show_stats` | Сообщения | Статистика сообщения | `context-action` |
| 398 | `message_show_full_text` | Сообщения | Открыть текст крупно | `context-action` |
| 399 | `message_highlight` | Сообщения | Подсветить сообщение локально | `context-action` |
| 400 | `message_unhighlight` | Сообщения | Снять локальную подсветку | `context-action` |
| 401 | `message_hide_local` | Сообщения | Скрыть сообщение локально | `context-action` |
| 402 | `message_unhide_all` | Сообщения | Вернуть скрытые сообщения | `context-action` |
| 403 | `message_scroll_center` | Сообщения | Поместить сообщение по центру | `context-action` |
| 404 | `message_bookmark_location` | Сообщения | Закладка на сообщение | `context-action` |
| 405 | `message_add_message_note` | Сообщения | Заметка к позиции сообщения | `context-action` |
| 406 | `message_favorite_author_label` | Сообщения | Запомнить автора как избранного | `context-action` |
| 407 | `message_filter_author_local` | Сообщения | Приглушить автора локально | `context-action` |
| 408 | `message_copy_dom_id` | Сообщения | Копировать DOM ID | `context-action` |
| 409 | `message_copy_aria_label` | Сообщения | Копировать доступную подпись | `context-action` |
| 410 | `message_inspect_visible_message` | Сообщения | Диагностика выбранного сообщения | `context-action` |
| 411 | `media_copy_url` | Медиа | Копировать URL медиа | `context-action` |
| 412 | `media_open_original` | Медиа | Открыть оригинал | `context-action` |
| 413 | `media_download` | Медиа | Скачать медиа | `context-action` |
| 414 | `media_dimensions` | Медиа | Показать разрешение | `context-action` |
| 415 | `media_aspect` | Медиа | Показать соотношение сторон | `context-action` |
| 416 | `media_type` | Медиа | Показать тип медиа | `context-action` |
| 417 | `media_zoom_in` | Медиа | Увеличить медиа | `context-action` |
| 418 | `media_zoom_out` | Медиа | Уменьшить медиа | `context-action` |
| 419 | `media_reset` | Медиа | Сбросить трансформации медиа | `context-action` |
| 420 | `media_rotate_left` | Медиа | Повернуть влево | `context-action` |
| 421 | `media_rotate_right` | Медиа | Повернуть вправо | `context-action` |
| 422 | `media_flip_horizontal` | Медиа | Отразить горизонтально | `context-action` |
| 423 | `media_flip_vertical` | Медиа | Отразить вертикально | `context-action` |
| 424 | `media_fit` | Медиа | Вписать в окно | `context-action` |
| 425 | `media_fullscreen` | Медиа | Полноэкранный режим | `context-action` |
| 426 | `media_grayscale` | Медиа | Чёрно-белый режим | `context-action` |
| 427 | `media_blur` | Медиа | Размытие медиа | `context-action` |
| 428 | `media_brightness_up` | Медиа | Яркость +10% | `context-action` |
| 429 | `media_brightness_down` | Медиа | Яркость −10% | `context-action` |
| 430 | `media_saturation_up` | Медиа | Насыщенность +10% | `context-action` |
| 431 | `media_saturation_down` | Медиа | Насыщенность −10% | `context-action` |
| 432 | `media_contrast_up` | Медиа | Контраст +10% | `context-action` |
| 433 | `media_contrast_down` | Медиа | Контраст −10% | `context-action` |
| 434 | `media_video_play` | Медиа | Пауза или воспроизведение | `context-action` |
| 435 | `media_speed_half` | Медиа | Скорость видео 0.5× | `context-action` |
| 436 | `media_speed_normal` | Медиа | Скорость видео 1× | `context-action` |
| 437 | `media_speed_150` | Медиа | Скорость видео 1.5× | `context-action` |
| 438 | `media_speed_double` | Медиа | Скорость видео 2× | `context-action` |
| 439 | `media_loop` | Медиа | Зациклить видео | `context-action` |
| 440 | `media_pip` | Медиа | Картинка в картинке | `context-action` |
| 441 | `utility_open_center` | Продуктивность | Открыть центр PowerDiscord | `utility` |
| 442 | `utility_open_feature_search` | Продуктивность | Поиск по 500+ функциям | `utility` |
| 443 | `utility_open_text_lab` | Продуктивность | Открыть текстовую лабораторию | `utility` |
| 444 | `utility_open_notes` | Продуктивность | Открыть заметки | `utility` |
| 445 | `utility_open_bookmarks` | Продуктивность | Открыть закладки | `utility` |
| 446 | `utility_open_favorites` | Продуктивность | Открыть избранное | `utility` |
| 447 | `utility_open_reminders` | Продуктивность | Открыть напоминания | `utility` |
| 448 | `utility_open_diagnostics` | Продуктивность | Открыть диагностику | `utility` |
| 449 | `utility_pomodoro_start` | Продуктивность | Запустить Pomodoro | `utility` |
| 450 | `utility_pomodoro_pause` | Продуктивность | Пауза Pomodoro | `utility` |
| 451 | `utility_pomodoro_reset` | Продуктивность | Сбросить Pomodoro | `utility` |
| 452 | `utility_stopwatch_start` | Продуктивность | Запустить секундомер | `utility` |
| 453 | `utility_stopwatch_pause` | Продуктивность | Пауза секундомера | `utility` |
| 454 | `utility_stopwatch_reset` | Продуктивность | Сбросить секундомер | `utility` |
| 455 | `utility_stopwatch_lap` | Продуктивность | Добавить круг секундомера | `utility` |
| 456 | `utility_timer_5` | Продуктивность | Таймер на 5 минут | `utility` |
| 457 | `utility_timer_10` | Продуктивность | Таймер на 10 минут | `utility` |
| 458 | `utility_timer_15` | Продуктивность | Таймер на 15 минут | `utility` |
| 459 | `utility_timer_25` | Продуктивность | Таймер на 25 минут | `utility` |
| 460 | `utility_timer_45` | Продуктивность | Таймер на 45 минут | `utility` |
| 461 | `utility_timer_60` | Продуктивность | Таймер на 60 минут | `utility` |
| 462 | `utility_clock_moscow` | Продуктивность | Время: Москва | `utility` |
| 463 | `utility_clock_berlin` | Продуктивность | Время: Берлин | `utility` |
| 464 | `utility_clock_london` | Продуктивность | Время: Лондон | `utility` |
| 465 | `utility_clock_new_york` | Продуктивность | Время: Нью-Йорк | `utility` |
| 466 | `utility_clock_los_angeles` | Продуктивность | Время: Лос-Анджелес | `utility` |
| 467 | `utility_clock_tokyo` | Продуктивность | Время: Токио | `utility` |
| 468 | `utility_clock_dubai` | Продуктивность | Время: Дубай | `utility` |
| 469 | `utility_clock_sydney` | Продуктивность | Время: Сидней | `utility` |
| 470 | `utility_hex_to_rgb` | Продуктивность | HEX → RGB | `utility` |
| 471 | `utility_rgb_to_hex` | Продуктивность | RGB → HEX | `utility` |
| 472 | `utility_bytes_format` | Продуктивность | Форматировать байты | `utility` |
| 473 | `utility_snowflake_to_date` | Продуктивность | Snowflake → дата | `utility` |
| 474 | `utility_date_to_timestamp` | Продуктивность | Дата → Unix timestamp | `utility` |
| 475 | `utility_minutes_to_clock` | Продуктивность | Минуты → ЧЧ:ММ | `utility` |
| 476 | `utility_json_validate` | Продуктивность | Проверить JSON | `utility` |
| 477 | `utility_url_inspect` | Продуктивность | Разобрать URL | `utility` |
| 478 | `utility_uuid` | Продуктивность | Создать UUID | `utility` |
| 479 | `utility_password` | Продуктивность | Создать локальный пароль | `utility` |
| 480 | `utility_screen_info` | Продуктивность | Информация об экране | `utility` |
| 481 | `utility_session_copy` | Продуктивность | Копировать время сессии | `utility` |
| 482 | `utility_session_reset` | Продуктивность | Сбросить время сессии | `utility` |
| 483 | `utility_copy_history_open` | Продуктивность | История копирований PowerDiscord | `utility` |
| 484 | `utility_copy_history_clear` | Продуктивность | Очистить историю копирований | `utility` |
| 485 | `utility_reminder_add` | Продуктивность | Добавить напоминание | `utility` |
| 486 | `utility_reminder_list` | Продуктивность | Список напоминаний | `utility` |
| 487 | `utility_reminder_clear` | Продуктивность | Очистить напоминания | `utility` |
| 488 | `utility_quick_note_add` | Продуктивность | Добавить быструю заметку | `utility` |
| 489 | `utility_quick_note_copy` | Продуктивность | Копировать последнюю заметку | `utility` |
| 490 | `utility_quick_note_clear` | Продуктивность | Очистить быстрые заметки | `utility` |
| 491 | `system_export_backup` | Диагностика | Экспортировать резервную копию | `system` |
| 492 | `system_import_backup` | Диагностика | Импортировать резервную копию | `system` |
| 493 | `system_reset_all` | Диагностика | Сбросить весь PowerDiscord | `system` |
| 494 | `system_reset_visual` | Диагностика | Сбросить оформление | `system` |
| 495 | `system_clear_notes` | Диагностика | Очистить заметки | `system` |
| 496 | `system_clear_bookmarks` | Диагностика | Очистить закладки | `system` |
| 497 | `system_clear_favorites` | Диагностика | Очистить избранное | `system` |
| 498 | `system_clear_reminders` | Диагностика | Системная очистка напоминаний | `system` |
| 499 | `system_storage_usage` | Диагностика | Размер локальных данных | `system` |
| 500 | `system_run_diagnostics` | Диагностика | Запустить диагностику | `system` |
| 501 | `system_copy_diagnostics` | Диагностика | Копировать диагностику | `system` |
| 502 | `system_safe_mode` | Диагностика | Включить безопасный режим | `system` |
| 503 | `system_master_off` | Диагностика | Отключить все функции | `system` |
| 504 | `system_enable_defaults` | Диагностика | Включить безопасные значения | `system` |
| 505 | `system_clear_errors` | Диагностика | Очистить журнал ошибок | `system` |
| 506 | `system_responsive_recalc` | Интерфейс | Пересчитать адаптивность | `system` |
| 507 | `system_responsive_auto` | Интерфейс | Responsive: автоматически | `system` |
| 508 | `system_responsive_compact` | Интерфейс | Responsive: компактный | `system` |
| 509 | `system_responsive_normal` | Интерфейс | Responsive: обычный | `system` |
| 510 | `system_responsive_large` | Интерфейс | Responsive: большой | `system` |
| 511 | `system_responsive_ultrawide` | Интерфейс | Responsive: ультраширокий | `system` |
| 512 | `system_responsive_vertical` | Интерфейс | Responsive: вертикальный | `system` |
| 513 | `system_save_profile_1` | Диагностика | Сохранить профиль 1 | `system` |
| 514 | `system_restore_profile_1` | Диагностика | Применить профиль 1 | `system` |
| 515 | `system_save_profile_2` | Диагностика | Сохранить профиль 2 | `system` |
| 516 | `system_restore_profile_2` | Диагностика | Применить профиль 2 | `system` |
| 517 | `system_save_profile_3` | Диагностика | Сохранить профиль 3 | `system` |
| 518 | `system_restore_profile_3` | Диагностика | Применить профиль 3 | `system` |
| 519 | `system_clear_profiles` | Диагностика | Очистить профили | `system` |
| 520 | `system_copy_feature_report` | Диагностика | Копировать отчёт функций | `system` |
| 521 | `behavior_floating_launcher` | Интерфейс | Плавающая кнопка PowerDiscord | `behavior` |
| 522 | `behavior_status_bar` | Интерфейс | Локальная строка состояния | `behavior` |
| 523 | `behavior_composer_char_counter` | Сообщения | Счётчик символов поля ввода | `behavior` |
| 524 | `behavior_composer_word_counter` | Сообщения | Счётчик слов поля ввода | `behavior` |
| 525 | `behavior_code_copy_buttons` | Сообщения | Кнопки копирования кода | `behavior` |
| 526 | `behavior_keyword_highlighter` | Уведомления | Подсветка ключевых слов | `behavior` |
| 527 | `behavior_auto_privacy_on_blur` | Приватность | Приватность при потере фокуса | `behavior` |
| 528 | `behavior_hotkeys` | Продуктивность | Горячие клавиши PowerDiscord | `behavior` |
| 529 | `behavior_context_tracking` | Продуктивность | Контекст последнего наведённого элемента | `behavior` |
| 530 | `behavior_toast_notifications` | Уведомления | Всплывающие уведомления | `behavior` |
