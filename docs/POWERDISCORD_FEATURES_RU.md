# PowerDiscord 3.0 Performance Edition — каталог 100 функций

Оптимизированная фиолетовая версия. Реестр содержит ровно **100** безопасных локальных функций.

DOM-обновления пакетируются, меню рисует функции порциями, настройки сохраняются с debounce, а Responsive Engine не перестраивает список карточек.

> Плагин работает только с уже доступными элементами интерфейса, не раскрывает закрытые каналы и не сохраняет содержимое чужих сообщений.

## Сводка

| Тип | Количество |
|---|---:|
| `toggle` | 40 |
| `range` | 10 |
| `theme` | 10 |
| `text` | 15 |
| `action` | 20 |
| `behavior` | 5 |

## Полный реестр

| № | Ключ | Категория | Русское название | English name | Тип |
|---:|---|---|---|---|---|
| 1 | `compact_messages` | Компоновка | Компактные сообщения | Compact messages | `toggle` |
| 2 | `hide_message_avatars` | Внешний вид | Скрывать аватары сообщений | Hide message avatars | `toggle` |
| 3 | `hide_message_timestamps` | Внешний вид | Скрывать время сообщений | Hide message timestamps | `toggle` |
| 4 | `hide_message_reactions` | Внешний вид | Скрывать реакции | Hide reactions | `toggle` |
| 5 | `hide_message_embeds` | Внешний вид | Скрывать карточки ссылок | Hide link embeds | `toggle` |
| 6 | `hide_message_attachments` | Внешний вид | Скрывать вложения | Hide attachments | `toggle` |
| 7 | `hide_server_rail` | Компоновка | Скрывать панель серверов | Hide server rail | `toggle` |
| 8 | `hide_channel_sidebar` | Компоновка | Скрывать панель каналов | Hide channel sidebar | `toggle` |
| 9 | `hide_member_list` | Компоновка | Скрывать список участников | Hide member list | `toggle` |
| 10 | `hide_user_panel` | Компоновка | Скрывать панель аккаунта | Hide account panel | `toggle` |
| 11 | `privacy_avatars` | Приватность | Размывать аватары | Blur avatars | `toggle` |
| 12 | `privacy_usernames` | Приватность | Размывать имена | Blur usernames | `toggle` |
| 13 | `privacy_server_icons` | Приватность | Размывать значки серверов | Blur server icons | `toggle` |
| 14 | `privacy_media` | Приватность | Размывать изображения и видео | Blur images and videos | `toggle` |
| 15 | `privacy_profile_banners` | Приватность | Размывать баннеры профилей | Blur profile banners | `toggle` |
| 16 | `grayscale_media` | Медиа | Чёрно-белые медиа | Grayscale media | `toggle` |
| 17 | `dim_media` | Медиа | Приглушать медиа | Dim media | `toggle` |
| 18 | `rounded_media` | Медиа | Скруглять медиа | Round media corners | `toggle` |
| 19 | `message_bubbles` | Внешний вид | Фиолетовые карточки сообщений | Violet message cards | `toggle` |
| 20 | `accent_mentions` | Внешний вид | Выделять упоминания фиолетовым | Violet mention highlights | `toggle` |
| 21 | `accent_unread` | Внешний вид | Фиолетовые индикаторы непрочитанного | Violet unread markers | `toggle` |
| 22 | `accent_selected_channel` | Навигация | Фиолетовый выбранный канал | Violet selected channel | `toggle` |
| 23 | `larger_emoji` | Доступность | Увеличивать большие эмодзи | Larger jumbo emoji | `toggle` |
| 24 | `larger_reactions` | Доступность | Увеличивать реакции | Larger reactions | `toggle` |
| 25 | `violet_code_blocks` | Внешний вид | Фиолетовые блоки кода | Violet code blocks | `toggle` |
| 26 | `compact_channels` | Компоновка | Компактный список каналов | Compact channel list | `toggle` |
| 27 | `compact_members` | Компоновка | Компактный список участников | Compact member list | `toggle` |
| 28 | `compact_servers` | Компоновка | Компактная панель серверов | Compact server rail | `toggle` |
| 29 | `hide_gift_button` | Внешний вид | Скрывать кнопку подарка | Hide gift button | `toggle` |
| 30 | `hide_sticker_button` | Внешний вид | Скрывать кнопку стикеров | Hide sticker button | `toggle` |
| 31 | `hide_gif_button` | Внешний вид | Скрывать кнопку GIF | Hide GIF button | `toggle` |
| 32 | `hide_help_button` | Внешний вид | Скрывать кнопку помощи | Hide help button | `toggle` |
| 33 | `hide_inbox_button` | Внешний вид | Скрывать кнопку входящих | Hide inbox button | `toggle` |
| 34 | `hide_search_bar` | Внешний вид | Скрывать строку поиска Discord | Hide Discord search bar | `toggle` |
| 35 | `hide_activity_panel` | Компоновка | Скрывать панель активностей | Hide activity panel | `toggle` |
| 36 | `reduce_animations` | Доступность | Уменьшать анимации | Reduce animations | `toggle` |
| 37 | `high_contrast` | Доступность | Повышенный контраст текста | High text contrast | `toggle` |
| 38 | `comfortable_spacing` | Компоновка | Комфортные интервалы | Comfortable spacing | `toggle` |
| 39 | `dense_spacing` | Компоновка | Плотные интервалы | Dense spacing | `toggle` |
| 40 | `focus_mode` | Компоновка | Режим полного фокуса | Full focus mode | `toggle` |
| 41 | `message_font_size` | Доступность | Размер текста сообщений | Message font size | `range` |
| 42 | `corner_radius` | Внешний вид | Скругление интерфейса | Interface corner radius | `range` |
| 43 | `privacy_blur_strength` | Приватность | Сила приватного размытия | Privacy blur strength | `range` |
| 44 | `media_brightness` | Медиа | Яркость медиа | Media brightness | `range` |
| 45 | `media_saturation` | Медиа | Насыщенность медиа | Media saturation | `range` |
| 46 | `message_gap` | Компоновка | Интервал сообщений | Message spacing | `range` |
| 47 | `channel_width` | Компоновка | Ширина панели каналов | Channel panel width | `range` |
| 48 | `member_width` | Компоновка | Ширина списка участников | Member list width | `range` |
| 49 | `server_icon_size` | Компоновка | Размер значков серверов | Server icon size | `range` |
| 50 | `panel_opacity` | Внешний вид | Прозрачность центра | Control center opacity | `range` |
| 51 | `theme_deep_violet` | Темы | Глубокий фиолетовый | Deep Violet | `theme` |
| 52 | `theme_lavender_night` | Темы | Лавандовая ночь | Lavender Night | `theme` |
| 53 | `theme_amethyst` | Темы | Аметист | Amethyst | `theme` |
| 54 | `theme_indigo_violet` | Темы | Индиго | Indigo Violet | `theme` |
| 55 | `theme_plum` | Темы | Тёмная слива | Dark Plum | `theme` |
| 56 | `theme_cyber_purple` | Темы | Кибер-фиолетовый | Cyber Purple | `theme` |
| 57 | `theme_dark_orchid` | Темы | Тёмная орхидея | Dark Orchid | `theme` |
| 58 | `theme_soft_violet` | Темы | Мягкий фиолетовый | Soft Violet | `theme` |
| 59 | `theme_black_violet` | Темы | Чёрно-фиолетовый | Black Violet | `theme` |
| 60 | `theme_light_lilac` | Темы | Светлая сирень | Light Lilac | `theme` |
| 61 | `text_uppercase` | Текст | ВЕРХНИЙ РЕГИСТР | UPPERCASE | `text` |
| 62 | `text_lowercase` | Текст | нижний регистр | lowercase | `text` |
| 63 | `text_title_case` | Текст | Каждое Слово С Заглавной | Title Case | `text` |
| 64 | `text_sentence_case` | Текст | Регистр предложений | Sentence case | `text` |
| 65 | `text_trim` | Текст | Убрать пробелы по краям | Trim edges | `text` |
| 66 | `text_collapse_spaces` | Текст | Схлопнуть пробелы | Collapse spaces | `text` |
| 67 | `text_sort_lines` | Текст | Сортировать строки | Sort lines | `text` |
| 68 | `text_unique_lines` | Текст | Удалить повторные строки | Remove duplicate lines | `text` |
| 69 | `text_quote` | Текст | Оформить цитатой | Format as quote | `text` |
| 70 | `text_spoiler` | Текст | Обернуть в спойлер | Wrap as spoiler | `text` |
| 71 | `text_code_block` | Текст | Оформить блоком кода | Format as code block | `text` |
| 72 | `text_json_pretty` | Текст | Форматировать JSON | Format JSON | `text` |
| 73 | `text_url_encode` | Текст | URL-кодирование | URL encode | `text` |
| 74 | `text_base64_encode` | Текст | Кодировать Base64 | Base64 encode | `text` |
| 75 | `text_transliterate_ru` | Текст | Транслитерация RU → LAT | Transliterate RU → LAT | `text` |
| 76 | `action_copy_message_text` | Сообщения | Копировать видимое сообщение | Copy visible message | `action` |
| 77 | `action_copy_clean_message` | Сообщения | Копировать сообщение без лишних пробелов | Copy cleaned message | `action` |
| 78 | `action_copy_message_id` | Сообщения | Копировать ID видимого сообщения | Copy visible message ID | `action` |
| 79 | `action_copy_message_link` | Сообщения | Копировать ссылку на сообщение | Copy message link | `action` |
| 80 | `action_copy_message_quote` | Сообщения | Копировать сообщение как цитату | Copy message as quote | `action` |
| 81 | `action_message_statistics` | Сообщения | Статистика видимого сообщения | Visible message statistics | `action` |
| 82 | `action_bookmark_message_location` | Сообщения | Закладка на позицию сообщения | Bookmark message location | `action` |
| 83 | `action_note_for_message` | Сообщения | Своя заметка к позиции сообщения | Personal note for message location | `action` |
| 84 | `action_highlight_message` | Сообщения | Подсветить сообщение локально | Highlight message locally | `action` |
| 85 | `action_hide_message_local` | Сообщения | Скрыть сообщение до перезапуска | Hide message until restart | `action` |
| 86 | `action_list_visible_channels` | Навигация | Список доступных каналов на экране | List visible channels | `action` |
| 87 | `action_search_visible_channels` | Навигация | Найти канал среди видимых | Search visible channels | `action` |
| 88 | `action_copy_current_channel_id` | Навигация | Копировать ID текущего канала | Copy current channel ID | `action` |
| 89 | `action_copy_current_guild_id` | Навигация | Копировать ID текущего сервера | Copy current server ID | `action` |
| 90 | `action_copy_media_url` | Медиа | Копировать URL видимого медиа | Copy visible media URL | `action` |
| 91 | `action_zoom_media` | Медиа | Увеличить видимое медиа | Zoom visible media | `action` |
| 92 | `action_reset_media` | Медиа | Сбросить локальное медиа | Reset local media | `action` |
| 93 | `action_export_backup` | Система | Экспорт настроек JSON | Export settings JSON | `action` |
| 94 | `action_import_backup` | Система | Импорт настроек JSON | Import settings JSON | `action` |
| 95 | `action_show_diagnostics` | Система | Показать диагностику | Show diagnostics | `action` |
| 96 | `behavior_floating_launcher` | Автоматизация | Плавающая кнопка центра | Floating control button | `behavior` |
| 97 | `behavior_privacy_on_blur` | Автоматизация | Приватность при потере фокуса | Privacy when window loses focus | `behavior` |
| 98 | `behavior_code_copy_buttons` | Автоматизация | Кнопки копирования кода | Code copy buttons | `behavior` |
| 99 | `behavior_composer_counter` | Автоматизация | Счётчик символов сообщения | Message character counter | `behavior` |
| 100 | `behavior_responsive_engine` | Автоматизация | Автоадаптация под окно | Responsive window engine | `behavior` |
