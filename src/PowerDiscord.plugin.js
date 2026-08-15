/**
 * @name PowerDiscord
 * @author roman161rusrosrov-cmyk
 * @version 1.0.0
 * @description Большой безопасный русскоязычный набор локальных улучшений Discord: 500+ функций, адаптивность, темы, приватность, текстовые и медиа-инструменты, профили и диагностика.
 */

'use strict';

const PLUGIN_NAME = 'PowerDiscord';
const VERSION = '1.0.0';
const STORAGE_KEY = 'state';
const STYLE_ID = 'powerdiscord-styles';
const CUSTOM_STYLE_ID = 'powerdiscord-runtime-styles';
const ROOT_CLASS = 'pd-enabled';

const LOCALES = Object.freeze({
  ru: Object.freeze({open: 'Открыть', close: 'Закрыть', enabled: 'Включено', disabled: 'Выключено'}),
  en: Object.freeze({open: 'Open', close: 'Close', enabled: 'Enabled', disabled: 'Disabled'})
});

const HANDLER_TYPES = new Set([
  'toggle',
  'range',
  'theme',
  'preset',
  'text',
  'context-action',
  'utility',
  'system',
  'behavior'
]);

const CATEGORY_LABELS = Object.freeze({
  interface: 'Интерфейс',
  messages: 'Сообщения',
  users: 'Пользователи',
  servers: 'Серверы',
  channels: 'Каналы',
  voice: 'Голос',
  media: 'Медиа',
  notifications: 'Уведомления',
  privacy: 'Приватность',
  accessibility: 'Доступность',
  themes: 'Темы',
  productivity: 'Продуктивность',
  search: 'Поиск и навигация',
  localData: 'Локальные данные',
  performance: 'Производительность',
  diagnostics: 'Диагностика',
  text: 'Работа с текстом',
  experimental: 'Экспериментальные'
});

const FEATURE_REGISTRY = [];
let nextFeatureId = 1;

function registerFeature(feature) {
  FEATURE_REGISTRY.push(Object.freeze({
    id: nextFeatureId++,
    defaultEnabled: false,
    localOnly: true,
    ...feature
  }));
}

function scopedSelectors(rootSelector, selectorText) {
  return selectorText
    .split(',')
    .map(selector => `${rootSelector} ${selector.trim()}`)
    .join(',\n');
}

const VISUAL_TARGETS = [
  ['message_avatars', 'аватары сообщений', '[class*="message_"] [class*="avatar_"]', 'messages'],
  ['message_usernames', 'имена авторов сообщений', '[class*="message_"] [class*="username_"]', 'messages'],
  ['message_timestamps', 'время сообщений', '[class*="message_"] [class*="timestamp_"]', 'messages'],
  ['message_text', 'текст сообщений', '[class*="message_"] [class*="messageContent_"]', 'messages'],
  ['message_toolbar', 'панель действий сообщения', '[class*="message_"] [class*="buttons_"]', 'messages'],
  ['message_reactions', 'реакции сообщений', '[class*="message_"] [class*="reactions_"]', 'messages'],
  ['message_embeds', 'встраиваемые карточки', '[class*="message_"] [class*="embed_"]', 'messages'],
  ['message_attachments', 'вложения сообщений', '[class*="message_"] [class*="attachment_"]', 'messages'],
  ['reply_preview', 'предпросмотр ответа', '[class*="repliedMessage_"]', 'messages'],
  ['thread_indicators', 'индикаторы веток', '[class*="threadMessageAccessory_"], [class*="thread_"][class*="container_"]', 'messages'],
  ['server_rail', 'панель серверов', '[class*="guilds_"]', 'servers'],
  ['server_icons', 'значки серверов', '[class*="guilds_"] [class*="icon_"]', 'servers'],
  ['server_unread', 'индикаторы непрочитанных серверов', '[class*="guilds_"] [class*="unreadMentionsIndicator_"]', 'servers'],
  ['channel_sidebar', 'панель каналов', '[class*="sidebarList_"]', 'channels'],
  ['channel_icons', 'значки каналов', '[class*="sidebarList_"] [class*="icon_"]', 'channels'],
  ['channel_names', 'названия каналов', '[class*="sidebarList_"] [class*="name_"]', 'channels'],
  ['channel_categories', 'категории каналов', '[class*="sidebarList_"] [class*="containerDefault_"]', 'channels'],
  ['channel_unread', 'индикаторы непрочитанных каналов', '[class*="sidebarList_"] [class*="unread_"]', 'channels'],
  ['voice_users', 'участники голосовых каналов', '[class*="voiceUser_"]', 'voice'],
  ['voice_controls', 'голосовые элементы управления', '[class*="voiceControls_"]', 'voice'],
  ['member_list', 'список участников', '[class*="membersWrap_"]', 'users'],
  ['member_avatars', 'аватары участников', '[class*="membersWrap_"] [class*="avatar_"]', 'users'],
  ['member_names', 'имена участников', '[class*="membersWrap_"] [class*="name_"]', 'users'],
  ['member_activities', 'активности участников', '[class*="membersWrap_"] [class*="activity_"]', 'users'],
  ['role_chips', 'плашки ролей', '[class*="role_"][class*="pill_"]', 'users'],
  ['top_toolbar', 'верхняя панель чата', '[class*="toolbar_"]', 'interface'],
  ['search_bar', 'строка поиска Discord', '[class*="search_"][class*="container_"]', 'search'],
  ['inbox_button', 'кнопка входящих', 'button[aria-label*="Входящие" i], button[aria-label*="Inbox" i]', 'notifications'],
  ['help_button', 'кнопка помощи', 'a[aria-label*="Помощь" i], a[aria-label*="Help" i]', 'interface'],
  ['pins_button', 'кнопка закреплённых сообщений', 'button[aria-label*="Закреп" i], button[aria-label*="Pinned" i]', 'messages'],
  ['invite_button', 'кнопки приглашений', 'button[aria-label*="Приглас" i], button[aria-label*="Invite" i]', 'privacy'],
  ['user_panel', 'нижняя панель аккаунта', '[class*="panels_"]', 'interface'],
  ['self_avatar', 'аватар текущего аккаунта', '[class*="panels_"] [class*="avatar_"]', 'privacy'],
  ['account_name', 'имя текущего аккаунта', '[class*="panels_"] [class*="nameTag_"]', 'privacy'],
  ['mute_buttons', 'кнопки микрофона и звука', '[class*="panels_"] button', 'voice'],
  ['typing_indicator', 'индикатор набора текста', '[class*="typing_"]', 'messages'],
  ['composer_buttons', 'кнопки поля сообщения', '[class*="channelTextArea_"] button', 'interface'],
  ['gif_button', 'кнопка GIF', 'button[aria-label*="GIF" i]', 'media'],
  ['sticker_button', 'кнопка стикеров', 'button[aria-label*="Стикер" i], button[aria-label*="Sticker" i]', 'media'],
  ['gift_button', 'кнопка подарка', 'button[aria-label*="Подар" i], button[aria-label*="Gift" i]', 'interface'],
  ['emoji_button', 'кнопка эмодзи', 'button[aria-label*="Эмодзи" i], button[aria-label*="Emoji" i]', 'media'],
  ['activity_cards', 'карточки активностей', '[class*="activityCard_"]', 'interface'],
  ['now_playing', 'панель «Сейчас активно»', '[class*="nowPlayingColumn_"]', 'interface'],
  ['profile_banners', 'баннеры профилей', '[class*="banner_"]', 'privacy'],
  ['avatar_decorations', 'декорации аватаров', '[class*="avatarDecoration_"]', 'users'],
  ['status_text', 'текст пользовательских статусов', '[class*="customStatus_"]', 'privacy'],
  ['role_icons', 'значки ролей', '[class*="roleIcon_"]', 'users'],
  ['clan_tags', 'теги кланов', '[class*="clanTag_"]', 'privacy'],
  ['forum_tags', 'теги форумов', '[class*="tag_"][class*="pill_"]', 'channels'],
  ['poll_blocks', 'блоки опросов', '[class*="pollContainer_"]', 'messages']
];

const VISUAL_MODES = [
  {
    key: 'hide',
    name: 'Скрывать',
    description: 'Полностью скрывает элемент локально.',
    module: 'InterfaceTools',
    category: targetCategory => targetCategory,
    declaration: 'display: none !important;'
  },
  {
    key: 'compact',
    name: 'Уменьшать',
    description: 'Делает элемент компактнее без изменения данных.',
    module: 'ResponsiveEngine',
    category: () => 'interface',
    declaration: 'scale: .9 !important; transform-origin: center !important;'
  },
  {
    key: 'privacy',
    name: 'Размывать',
    description: 'Размывает элемент и раскрывает его при наведении.',
    module: 'PrivacyTools',
    category: () => 'privacy',
    declaration: 'filter: blur(var(--pd-privacy-blur)) !important; transition: filter 140ms ease !important;',
    hover: 'filter: none !important;'
  },
  {
    key: 'emphasize',
    name: 'Выделять',
    description: 'Добавляет аккуратный акцентный контур.',
    module: 'AccessibilityTools',
    category: () => 'accessibility',
    declaration: 'outline: var(--pd-outline-width) solid color-mix(in srgb, var(--pd-accent) 62%, transparent) !important; outline-offset: -1px !important;'
  },
  {
    key: 'soften',
    name: 'Приглушать',
    description: 'Снижает визуальную яркость элемента.',
    module: 'InterfaceTools',
    category: () => 'interface',
    declaration: 'opacity: .58 !important; filter: saturate(.72); transition: opacity 140ms ease !important;',
    hover: 'opacity: 1 !important; filter: none !important;'
  }
];

for (const [targetKey, targetName, selector, targetCategory] of VISUAL_TARGETS) {
  for (const mode of VISUAL_MODES) {
    registerFeature({
      key: `${mode.key}_${targetKey}`,
      category: mode.category(targetCategory),
      module: mode.module,
      name: `${mode.name} ${targetName}`,
      description: `${mode.description} Объект: ${targetName}.`,
      handler: 'toggle',
      config: {selector, declaration: mode.declaration, hover: mode.hover || ''}
    });
  }
}

const RANGE_FEATURES = [
  ['message_font_scale', 'messages', 'MessageTools', 'Масштаб текста сообщений', 'Размер текста в переписке.', '--pd-message-font-scale', 80, 150, 100, 1, '%'],
  ['message_line_height', 'messages', 'MessageTools', 'Межстрочный интервал', 'Высота строки текста сообщений.', '--pd-message-line-height', 110, 220, 148, 1, '%'],
  ['message_gap', 'messages', 'MessageTools', 'Отступ сообщений', 'Дополнительное расстояние между сообщениями.', '--pd-message-gap', -4, 24, 0, 1, 'px'],
  ['interface_radius', 'interface', 'InterfaceTools', 'Скругление интерфейса', 'Общий радиус локальных элементов.', '--pd-radius', 0, 30, 12, 1, 'px'],
  ['ui_scale', 'interface', 'ResponsiveEngine', 'Масштаб PowerDiscord', 'Масштаб собственных окон плагина.', '--pd-ui-scale', 70, 160, 100, 1, '%'],
  ['media_brightness', 'media', 'MediaTools', 'Яркость медиа', 'Локальная яркость изображений и видео.', '--pd-media-brightness', 20, 140, 100, 1, '%'],
  ['media_saturation', 'media', 'MediaTools', 'Насыщенность медиа', 'Локальная насыщенность изображений и видео.', '--pd-media-saturation', 0, 180, 100, 1, '%'],
  ['media_contrast', 'media', 'MediaTools', 'Контраст медиа', 'Локальный контраст изображений и видео.', '--pd-media-contrast', 50, 180, 100, 1, '%'],
  ['privacy_blur', 'privacy', 'PrivacyTools', 'Сила размытия', 'Интенсивность приватных масок.', '--pd-privacy-blur', 2, 20, 7, 1, 'px'],
  ['panel_opacity', 'themes', 'ThemeManager', 'Прозрачность панелей', 'Прозрачность собственных панелей PowerDiscord.', '--pd-panel-opacity', 55, 100, 96, 1, '%'],
  ['panel_blur', 'themes', 'ThemeManager', 'Размытие панелей', 'Сила backdrop blur собственных окон.', '--pd-panel-blur', 0, 30, 14, 1, 'px'],
  ['command_width', 'interface', 'CommandPalette', 'Ширина центра команд', 'Максимальная ширина центра PowerDiscord.', '--pd-command-width', 620, 1400, 980, 10, 'px'],
  ['avatar_scale', 'users', 'UserTools', 'Масштаб аватаров', 'Размер отображаемых аватаров.', '--pd-avatar-scale', 70, 150, 100, 1, '%'],
  ['emoji_scale', 'media', 'MediaTools', 'Масштаб эмодзи', 'Размер эмодзи внутри сообщений.', '--pd-emoji-scale', 70, 220, 100, 1, '%'],
  ['channel_width', 'channels', 'ChannelTools', 'Ширина каналов', 'Ширина панели каналов.', '--pd-channel-width', 180, 360, 240, 5, 'px'],
  ['member_width', 'users', 'UserTools', 'Ширина участников', 'Ширина списка участников.', '--pd-member-width', 180, 360, 240, 5, 'px'],
  ['guild_width', 'servers', 'ServerTools', 'Ширина серверной ленты', 'Ширина вертикальной панели серверов.', '--pd-guild-width', 56, 110, 72, 1, 'px'],
  ['composer_height', 'messages', 'MessageTools', 'Минимальная высота поля ввода', 'Увеличивает поле подготовки сообщения.', '--pd-composer-height', 44, 180, 44, 2, 'px'],
  ['code_font_size', 'messages', 'MessageTools', 'Размер кода', 'Размер шрифта в блоках кода.', '--pd-code-font-size', 10, 24, 13, 1, 'px'],
  ['animation_speed', 'accessibility', 'AccessibilityTools', 'Скорость анимаций', 'Множитель длительности локальных анимаций.', '--pd-animation-speed', 0, 200, 100, 5, '%'],
  ['status_opacity', 'interface', 'InterfaceTools', 'Прозрачность строки состояния', 'Видимость локального статус-бара.', '--pd-status-opacity', 20, 100, 92, 1, '%'],
  ['toolbar_scale', 'interface', 'InterfaceTools', 'Масштаб верхней панели', 'Размер кнопок верхней панели чата.', '--pd-toolbar-scale', 70, 140, 100, 1, '%'],
  ['image_radius', 'media', 'MediaTools', 'Скругление изображений', 'Радиус изображений и видео.', '--pd-image-radius', 0, 32, 8, 1, 'px'],
  ['embed_max_width', 'messages', 'MessageTools', 'Ширина вложенных карточек', 'Максимальная ширина embeds.', '--pd-embed-max-width', 280, 900, 520, 10, 'px'],
  ['user_panel_scale', 'interface', 'InterfaceTools', 'Масштаб панели аккаунта', 'Размер нижней панели пользователя.', '--pd-user-panel-scale', 75, 130, 100, 1, '%'],
  ['scrollbar_width', 'accessibility', 'AccessibilityTools', 'Ширина полосы прокрутки', 'Делает скроллбар заметнее или компактнее.', '--pd-scrollbar-width', 2, 18, 8, 1, 'px'],
  ['outline_width', 'accessibility', 'AccessibilityTools', 'Толщина акцентного контура', 'Используется функциями выделения.', '--pd-outline-width', 1, 5, 1, 1, 'px'],
  ['shadow_strength', 'themes', 'ThemeManager', 'Сила теней', 'Интенсивность теней собственных окон.', '--pd-shadow-strength', 0, 100, 45, 1, '%'],
  ['chat_max_width', 'messages', 'MessageTools', 'Максимальная ширина чтения', 'Ограничивает слишком широкую строку на больших мониторах.', '--pd-chat-max-width', 640, 1800, 1400, 20, 'px'],
  ['night_dim', 'accessibility', 'AccessibilityTools', 'Ночное затемнение', 'Тёплый локальный фильтр для глаз.', '--pd-night-dim', 0, 35, 0, 1, '%']
];

for (const [key, category, module, name, description, variable, min, max, defaultValue, step, unit] of RANGE_FEATURES) {
  registerFeature({
    key,
    category,
    module,
    name,
    description,
    handler: 'range',
    defaultEnabled: true,
    config: {variable, min, max, defaultValue, step, unit}
  });
}

const THEMES = [
  ['default_green', 'Спокойная зелёная', '#101411', '#151b17', '#1a211c', '#29352d', '#76a985', '#e3e9e5', '#9ca9a0'],
  ['forest', 'Глубокий лес', '#07110b', '#0d1a12', '#14261a', '#24432f', '#5fae78', '#e2f2e7', '#91ad99'],
  ['sage', 'Мягкий шалфей', '#121613', '#1a211c', '#222c25', '#34463a', '#91b49a', '#edf3ef', '#a9b7ad'],
  ['purple', 'Спокойная фиолетовая', '#121018', '#191522', '#221c2e', '#392d4e', '#9b7ac7', '#eee8f5', '#aaa0b8'],
  ['blue', 'Глубокая синяя', '#0d1218', '#121b25', '#192634', '#2b4055', '#6f9fc8', '#e8f0f6', '#98aabd'],
  ['ocean', 'Океан', '#071417', '#0c1f24', '#122b31', '#214650', '#59a7b6', '#e2f3f5', '#91adb2'],
  ['oled', 'OLED', '#000000', '#050505', '#090909', '#202020', '#72a982', '#f1f4f2', '#989e9a'],
  ['midnight', 'Полночь', '#080a12', '#0e1220', '#151b2c', '#283452', '#738bbd', '#e8ebf4', '#959eb2'],
  ['graphite', 'Графит', '#101112', '#17191b', '#202326', '#34383d', '#8da39a', '#e7e9e8', '#9fa5a2'],
  ['soft', 'Мягкая', '#151715', '#1d211e', '#272d29', '#3b463e', '#8fb19a', '#eef2ef', '#aab5ad'],
  ['glass', 'Стекло', '#0b110e', '#111a15', '#17231c', '#345040', '#78b18a', '#edf6f0', '#9fb6a6'],
  ['cyber', 'Кибер-зелёная', '#07100a', '#0c1810', '#112316', '#1d4a2a', '#58c979', '#e5f9ea', '#86b993'],
  ['amber', 'Тёплая янтарная', '#16120b', '#211a0f', '#2c2315', '#4b3a20', '#c59a55', '#f5eee2', '#b6a78f'],
  ['rose', 'Пыльная роза', '#171012', '#22171a', '#2d1f23', '#4c343b', '#c18494', '#f5e9ec', '#b49ca3'],
  ['ice', 'Холодный лёд', '#0d1416', '#131e21', '#1b292d', '#30474d', '#79adb8', '#e8f3f5', '#9fb3b8'],
  ['sand', 'Тёмный песок', '#15130f', '#201d17', '#2b271f', '#463f31', '#aa9872', '#f0ece3', '#afa796'],
  ['red', 'Приглушённая красная', '#170e0e', '#211414', '#2c1b1b', '#4b2d2d', '#bb6f6f', '#f4e6e6', '#b39a9a'],
  ['teal', 'Бирюзовая', '#081514', '#0e201e', '#142c29', '#234944', '#61b0a5', '#e4f4f1', '#94afa9'],
  ['mono', 'Монохром', '#101010', '#181818', '#222222', '#383838', '#a0a0a0', '#eeeeee', '#a4a4a4'],
  ['violet_green', 'Фиолетово-зелёная', '#101013', '#17181d', '#20222a', '#383d48', '#76a985', '#eceef2', '#9ea4ad']
];

for (const [key, name, bg, secondary, card, border, accent, textColor, muted] of THEMES) {
  registerFeature({
    key: `theme_${key}`,
    category: 'themes',
    module: 'ThemeManager',
    name: `Тема «${name}»`,
    description: 'Применяет локальную палитру PowerDiscord. Видно только вам.',
    handler: 'theme',
    config: {bg, secondary, card, border, accent, text: textColor, muted}
  });
}

const PRESETS = [
  ['calm', 'Спокойный режим', 'Мягкое медиа, минимум отвлечений и зелёная тема.'],
  ['focus', 'Фокус', 'Оставляет чат и скрывает второстепенные панели.'],
  ['stream', 'Стрим', 'Размывает персональные данные и приглашения.'],
  ['minimal', 'Минимализм', 'Убирает декоративные и рекламные элементы.'],
  ['night', 'Ночной режим', 'Снижает яркость и движение интерфейса.'],
  ['reading', 'Чтение', 'Увеличивает текст и ограничивает длину строки.'],
  ['compact', 'Компактный', 'Показывает больше информации в небольшом окне.'],
  ['large', 'Большой экран', 'Использует пространство 1440p и 4K.'],
  ['ultrawide', 'Ультраширокий', 'Ограничивает строки и расширяет полезные панели.'],
  ['vertical', 'Вертикальный монитор', 'Сжимает боковые панели и центрирует чат.'],
  ['accessibility', 'Доступность', 'Высокий контраст, крупные зоны нажатия и текст.'],
  ['performance', 'Производительность', 'Минимум фильтров, теней и анимаций.'],
  ['media', 'Медиа', 'Расширяет и подчёркивает изображения и видео.'],
  ['privacy_max', 'Максимальная приватность', 'Размывает имена, аватары, каналы и серверы.'],
  ['screenshot', 'Снимок экрана', 'Чистый интерфейс без лишних кнопок.'],
  ['work', 'Рабочий профиль', 'Фокус, заметки, таймер и важные сообщения.'],
  ['gaming', 'Игровой профиль', 'Компактный интерфейс и голосовые инструменты.'],
  ['quiet', 'Тихий режим', 'Приглушает уведомления и активности.'],
  ['reset_visual', 'Обычный вид', 'Отключает визуальные модификации.'],
  ['safe', 'Безопасный режим', 'Оставляет только лёгкие локальные функции.']
];

for (const [key, name, description] of PRESETS) {
  registerFeature({
    key: `preset_${key}`,
    category: 'interface',
    module: 'ProfileManager',
    name,
    description,
    handler: 'preset',
    config: {preset: key}
  });
}

const TEXT_ACTIONS = [
  ['uppercase', 'ВЕРХНИЙ РЕГИСТР', 'Преобразует все буквы в верхний регистр.'],
  ['lowercase', 'нижний регистр', 'Преобразует все буквы в нижний регистр.'],
  ['title_case', 'Каждое Слово С Заглавной', 'Делает первую букву каждого слова заглавной.'],
  ['sentence_case', 'Регистр предложений', 'Исправляет начало каждого предложения.'],
  ['toggle_case', 'Инвертировать регистр', 'Меняет строчные буквы на заглавные и наоборот.'],
  ['capitalize_words', 'Заглавные значимые слова', 'Капитализирует слова длиннее двух символов.'],
  ['trim', 'Убрать края', 'Удаляет пробелы в начале и конце текста.'],
  ['collapse_spaces', 'Схлопнуть пробелы', 'Заменяет серии пробелов одним.'],
  ['trim_lines', 'Очистить края строк', 'Удаляет пробелы по краям каждой строки.'],
  ['remove_blank_lines', 'Удалить пустые строки', 'Убирает полностью пустые строки.'],
  ['unique_lines', 'Оставить уникальные строки', 'Удаляет повторяющиеся строки с сохранением порядка.'],
  ['sort_lines_asc', 'Сортировать строки А–Я', 'Сортирует строки по возрастанию.'],
  ['sort_lines_desc', 'Сортировать строки Я–А', 'Сортирует строки по убыванию.'],
  ['reverse_lines', 'Обратить порядок строк', 'Переворачивает порядок строк.'],
  ['reverse_text', 'Перевернуть текст', 'Переворачивает символы с поддержкой Unicode.'],
  ['number_lines', 'Пронумеровать строки', 'Добавляет номер к каждой строке.'],
  ['bullet_list', 'Маркированный список', 'Преобразует строки в Markdown-список.'],
  ['checklist', 'Список задач', 'Добавляет Markdown-флажок к каждой строке.'],
  ['quote', 'Цитата Discord', 'Добавляет знак цитаты к каждой строке.'],
  ['spoiler', 'Скрыть под спойлер', 'Обертывает текст в синтаксис спойлера Discord.'],
  ['inline_code', 'Встроенный код', 'Обертывает текст в одинарные обратные кавычки.'],
  ['code_block', 'Блок кода', 'Обертывает текст в Markdown-блок кода.'],
  ['bold', 'Жирный текст', 'Обертывает текст в двойные звёздочки.'],
  ['italic', 'Курсив', 'Обертывает текст в одинарные звёздочки.'],
  ['underline', 'Подчёркнутый текст', 'Обертывает текст в двойные подчёркивания.'],
  ['strike', 'Зачёркнутый текст', 'Обертывает текст в двойные тильды.'],
  ['escape_markdown', 'Экранировать Markdown', 'Экранирует управляющие символы Markdown.'],
  ['strip_markdown', 'Удалить Markdown', 'Убирает распространённое форматирование Discord.'],
  ['extract_urls', 'Извлечь ссылки', 'Оставляет найденные URL по одному на строку.'],
  ['remove_urls', 'Удалить ссылки', 'Удаляет URL из текста.'],
  ['extract_mentions', 'Извлечь упоминания', 'Оставляет найденные @упоминания.'],
  ['extract_hashtags', 'Извлечь хэштеги', 'Оставляет найденные #хэштеги.'],
  ['word_count', 'Посчитать слова', 'Возвращает количество слов.'],
  ['char_count', 'Посчитать символы', 'Считает символы и символы без пробелов.'],
  ['line_count', 'Посчитать строки', 'Возвращает количество строк.'],
  ['reading_time', 'Время чтения', 'Оценивает время чтения со скоростью 180 слов в минуту.'],
  ['json_pretty', 'Красивый JSON', 'Форматирует корректный JSON с отступами.'],
  ['json_minify', 'Сжать JSON', 'Удаляет лишние пробелы из корректного JSON.'],
  ['url_encode', 'URL-кодирование', 'Кодирует текст для безопасной части URL.'],
  ['url_decode', 'URL-декодирование', 'Декодирует URL-последовательности.'],
  ['base64_encode', 'Кодировать Base64', 'Кодирует Unicode-текст в Base64 локально.'],
  ['base64_decode', 'Декодировать Base64', 'Декодирует Base64 в Unicode-текст.'],
  ['html_escape', 'Экранировать HTML', 'Заменяет HTML-символы безопасными сущностями.'],
  ['html_unescape', 'Декодировать HTML', 'Возвращает основные HTML-сущности в символы.'],
  ['transliterate_ru', 'Транслитерация RU→LAT', 'Преобразует русские буквы в латинскую запись.'],
  ['snake_case', 'snake_case', 'Преобразует слова в snake_case.'],
  ['kebab_case', 'kebab-case', 'Преобразует слова в kebab-case.'],
  ['camel_case', 'camelCase', 'Преобразует слова в camelCase.'],
  ['pascal_case', 'PascalCase', 'Преобразует слова в PascalCase.'],
  ['constant_case', 'CONSTANT_CASE', 'Преобразует слова в CONSTANT_CASE.'],
  ['dot_case', 'dot.case', 'Преобразует слова в dot.case.'],
  ['path_case', 'path/case', 'Преобразует слова в path/case.'],
  ['remove_diacritics', 'Убрать диакритику', 'Нормализует латинские символы с диакритикой.'],
  ['normalize_quotes', 'Нормализовать кавычки', 'Заменяет типографские кавычки обычными.'],
  ['normalize_dashes', 'Нормализовать тире', 'Заменяет длинные тире стандартным дефисом.'],
  ['tabs_to_spaces', 'Табуляции → пробелы', 'Заменяет табуляции четырьмя пробелами.'],
  ['spaces_to_tabs', 'Отступы → табуляции', 'Заменяет четыре начальных пробела табуляцией.'],
  ['unix_newlines', 'Переводы строк LF', 'Нормализует CRLF и CR в LF.'],
  ['add_timestamp', 'Добавить текущее время', 'Добавляет локальную дату и время перед текстом.'],
  ['wrap_parentheses', 'Обернуть в скобки', 'Помещает текст в круглые скобки.']
];

for (const [key, name, description] of TEXT_ACTIONS) {
  registerFeature({
    key: `text_${key}`,
    category: 'text',
    module: 'TextTools',
    name,
    description,
    handler: 'text',
    config: {action: key}
  });
}

function wordsForCase(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/([a-zа-яё0-9])([A-ZА-ЯЁ])/g, '$1 $2')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function unicodeToBase64(value) {
  const bytes = new TextEncoder().encode(String(value));
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToUnicode(value) {
  const binary = atob(String(value).trim());
  const bytes = Uint8Array.from(binary, character => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function transliterateRussian(value) {
  const map = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z',
    и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
    с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh',
    щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya'
  };
  return [...String(value)].map(character => {
    const lower = character.toLocaleLowerCase('ru-RU');
    const replacement = map[lower];
    if (replacement === undefined) return character;
    return character === lower ? replacement : replacement.charAt(0).toUpperCase() + replacement.slice(1);
  }).join('');
}

function transformText(action, input) {
  const value = String(input ?? '');
  const lines = () => value.split(/\r?\n/);
  const words = () => value.trim().match(/[\p{L}\p{N}]+/gu) || [];
  const caseWords = () => wordsForCase(value);
  const joinCase = separator => caseWords().map(word => word.toLocaleLowerCase('ru-RU')).join(separator);

  switch (action) {
    case 'uppercase': return value.toLocaleUpperCase('ru-RU');
    case 'lowercase': return value.toLocaleLowerCase('ru-RU');
    case 'title_case': return value.toLocaleLowerCase('ru-RU').replace(/(^|[\s—–-])([\p{L}])/gu, (_, prefix, letter) => prefix + letter.toLocaleUpperCase('ru-RU'));
    case 'sentence_case': return value.toLocaleLowerCase('ru-RU').replace(/(^|[.!?]\s+)([\p{L}])/gu, (_, prefix, letter) => prefix + letter.toLocaleUpperCase('ru-RU'));
    case 'toggle_case': return [...value].map(character => character === character.toLocaleUpperCase('ru-RU') ? character.toLocaleLowerCase('ru-RU') : character.toLocaleUpperCase('ru-RU')).join('');
    case 'capitalize_words': return value.replace(/\p{L}{3,}/gu, word => word.charAt(0).toLocaleUpperCase('ru-RU') + word.slice(1));
    case 'trim': return value.trim();
    case 'collapse_spaces': return value.replace(/[^\S\r\n]+/g, ' ');
    case 'trim_lines': return lines().map(line => line.trim()).join('\n');
    case 'remove_blank_lines': return lines().filter(line => line.trim()).join('\n');
    case 'unique_lines': return [...new Set(lines())].join('\n');
    case 'sort_lines_asc': return lines().sort((a, b) => a.localeCompare(b, 'ru')).join('\n');
    case 'sort_lines_desc': return lines().sort((a, b) => b.localeCompare(a, 'ru')).join('\n');
    case 'reverse_lines': return lines().reverse().join('\n');
    case 'reverse_text': return [...value].reverse().join('');
    case 'number_lines': return lines().map((line, index) => (index + 1) + '. ' + line).join('\n');
    case 'bullet_list': return lines().map(line => '- ' + line).join('\n');
    case 'checklist': return lines().map(line => '- [ ] ' + line).join('\n');
    case 'quote': return lines().map(line => '> ' + line).join('\n');
    case 'spoiler': return '||' + value + '||';
    case 'inline_code': return '\x60' + value.replace(/\x60/g, '\\' + '\x60') + '\x60';
    case 'code_block': return '\x60\x60\x60\n' + value.replace(/\x60{3}/g, '\\' + '\x60\x60\x60') + '\n\x60\x60\x60';
    case 'bold': return '**' + value + '**';
    case 'italic': return '*' + value + '*';
    case 'underline': return '__' + value + '__';
    case 'strike': return '~~' + value + '~~';
    case 'escape_markdown': return value.replace(/([\\\x60*_{}\[\]()#+\-.!|>~])/g, '\\$1');
    case 'strip_markdown': return value.replace(/\x60{3}[\s\S]*?\x60{3}/g, block => block.slice(3, -3)).replace(/[*_~\x60>|]/g, '');
    case 'extract_urls': return [...new Set(value.match(/https?:\/\/[^\s<>()]+/gi) || [])].join('\n');
    case 'remove_urls': return value.replace(/https?:\/\/[^\s<>()]+/gi, '').replace(/[ \t]{2,}/g, ' ');
    case 'extract_mentions': return [...new Set(value.match(/(?:^|\s)@[\p{L}\p{N}_.-]+/gu) || [])].map(item => item.trim()).join('\n');
    case 'extract_hashtags': return [...new Set(value.match(/#[\p{L}\p{N}_-]+/gu) || [])].join('\n');
    case 'word_count': return 'Слов: ' + words().length;
    case 'char_count': return 'Символов: ' + [...value].length + '; без пробелов: ' + [...value.replace(/\s/g, '')].length;
    case 'line_count': return 'Строк: ' + lines().length;
    case 'reading_time': return 'Примерное время чтения: ' + Math.max(1, Math.ceil(words().length / 180)) + ' мин.';
    case 'json_pretty': return JSON.stringify(JSON.parse(value), null, 2);
    case 'json_minify': return JSON.stringify(JSON.parse(value));
    case 'url_encode': return encodeURIComponent(value);
    case 'url_decode': return decodeURIComponent(value);
    case 'base64_encode': return unicodeToBase64(value);
    case 'base64_decode': return base64ToUnicode(value);
    case 'html_escape': return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    case 'html_unescape': return value.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&amp;/g, '&');
    case 'transliterate_ru': return transliterateRussian(value);
    case 'snake_case': return joinCase('_');
    case 'kebab_case': return joinCase('-');
    case 'camel_case': return caseWords().map((word, index) => index ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase()).join('');
    case 'pascal_case': return caseWords().map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
    case 'constant_case': return joinCase('_').toUpperCase();
    case 'dot_case': return joinCase('.');
    case 'path_case': return joinCase('/');
    case 'remove_diacritics': return value.normalize('NFD').replace(/\p{Diacritic}/gu, '');
    case 'normalize_quotes': return value.replace(/[«»„“”]/g, '"').replace(/[‘’]/g, "'");
    case 'normalize_dashes': return value.replace(/[—–−]/g, '-');
    case 'tabs_to_spaces': return value.replace(/\t/g, '    ');
    case 'spaces_to_tabs': return value.replace(/^ {4}/gm, '\t');
    case 'unix_newlines': return value.replace(/\r\n?/g, '\n');
    case 'add_timestamp': return '[' + new Date().toLocaleString('ru-RU') + '] ' + value;
    case 'wrap_parentheses': return '(' + value + ')';
    default: throw new Error('Неизвестное текстовое действие: ' + action);
  }
}

const MESSAGE_ACTIONS = [
  ['copy_text', 'Копировать текст сообщения', 'Копирует видимый текст выбранного сообщения.'],
  ['copy_clean_text', 'Копировать чистый текст', 'Копирует текст без лишних пробелов и переносов.'],
  ['copy_message_id', 'Копировать ID сообщения', 'Извлекает ID из уже отображённого DOM.'],
  ['copy_channel_id', 'Копировать ID канала', 'Извлекает ID канала из выбранного сообщения.'],
  ['copy_jump_link', 'Копировать ссылку перехода', 'Создаёт ссылку на сообщение из доступных ID.'],
  ['copy_author', 'Копировать имя автора', 'Копирует отображаемое имя автора.'],
  ['copy_timestamp', 'Копировать время сообщения', 'Копирует видимую временную метку.'],
  ['copy_snowflake_date', 'Дата создания по Snowflake', 'Вычисляет локальную дату из ID сообщения.'],
  ['copy_links', 'Копировать ссылки сообщения', 'Извлекает все видимые URL.'],
  ['copy_mentions', 'Копировать упоминания', 'Извлекает видимые @упоминания.'],
  ['copy_code', 'Копировать код сообщения', 'Объединяет содержимое видимых блоков кода.'],
  ['copy_attachment_urls', 'Копировать ссылки вложений', 'Копирует доступные ссылки на вложения.'],
  ['copy_image_urls', 'Копировать ссылки изображений', 'Копирует URL изображений выбранного сообщения.'],
  ['copy_quote', 'Копировать как цитату', 'Форматирует видимый текст как Discord-цитату.'],
  ['copy_spoiler', 'Копировать как спойлер', 'Обертывает видимый текст в спойлер.'],
  ['copy_selection', 'Копировать выделенный текст', 'Копирует текущее выделение в окне Discord.'],
  ['show_stats', 'Статистика сообщения', 'Показывает символы, слова, строки и ссылки.'],
  ['show_full_text', 'Открыть текст крупно', 'Показывает видимый текст в локальном окне.'],
  ['highlight', 'Подсветить сообщение локально', 'Добавляет временную изумрудную подсветку.'],
  ['unhighlight', 'Снять локальную подсветку', 'Удаляет подсветку выбранного сообщения.'],
  ['hide_local', 'Скрыть сообщение локально', 'Скрывает выбранный DOM-элемент до смены представления.'],
  ['unhide_all', 'Вернуть скрытые сообщения', 'Возвращает все локально скрытые элементы.'],
  ['scroll_center', 'Поместить сообщение по центру', 'Прокручивает выбранное сообщение к центру.'],
  ['bookmark_location', 'Закладка на сообщение', 'Сохраняет только ID и ссылку без текста сообщения.'],
  ['add_message_note', 'Заметка к позиции сообщения', 'Сохраняет введённую вами заметку рядом с ID.'],
  ['favorite_author_label', 'Запомнить автора как избранного', 'Сохраняет видимую подпись автора локально.'],
  ['filter_author_local', 'Приглушить автора локально', 'Приглушает уже отображённые сообщения с такой подписью.'],
  ['copy_dom_id', 'Копировать DOM ID', 'Копирует технический ID выбранного элемента.'],
  ['copy_aria_label', 'Копировать доступную подпись', 'Копирует aria-label выбранного сообщения, если он есть.'],
  ['inspect_visible_message', 'Диагностика выбранного сообщения', 'Показывает только безопасные видимые DOM-метаданные.']
];

const MEDIA_ACTIONS = [
  ['copy_url', 'Копировать URL медиа', 'Копирует адрес последнего наведённого медиа.'],
  ['open_original', 'Открыть оригинал', 'Открывает доступный URL медиа в новой вкладке.'],
  ['download', 'Скачать медиа', 'Запускает загрузку только после вашего нажатия.'],
  ['dimensions', 'Показать разрешение', 'Показывает естественную ширину и высоту.'],
  ['aspect', 'Показать соотношение сторон', 'Вычисляет соотношение ширины и высоты.'],
  ['type', 'Показать тип медиа', 'Определяет изображение или видео и расширение URL.'],
  ['zoom_in', 'Увеличить медиа', 'Повышает локальный масштаб на 20%.'],
  ['zoom_out', 'Уменьшить медиа', 'Снижает локальный масштаб на 20%.'],
  ['reset', 'Сбросить трансформации медиа', 'Возвращает исходный локальный вид.'],
  ['rotate_left', 'Повернуть влево', 'Поворачивает локально на 90 градусов.'],
  ['rotate_right', 'Повернуть вправо', 'Поворачивает локально на 90 градусов.'],
  ['flip_horizontal', 'Отразить горизонтально', 'Переворачивает локально по горизонтали.'],
  ['flip_vertical', 'Отразить вертикально', 'Переворачивает локально по вертикали.'],
  ['fit', 'Вписать в окно', 'Ограничивает медиа доступным размером окна.'],
  ['fullscreen', 'Полноэкранный режим', 'Запрашивает стандартный fullscreen для элемента.'],
  ['grayscale', 'Чёрно-белый режим', 'Переключает grayscale только для выбранного медиа.'],
  ['blur', 'Размытие медиа', 'Переключает локальное размытие.'],
  ['brightness_up', 'Яркость +10%', 'Увеличивает яркость выбранного медиа.'],
  ['brightness_down', 'Яркость −10%', 'Уменьшает яркость выбранного медиа.'],
  ['saturation_up', 'Насыщенность +10%', 'Увеличивает насыщенность выбранного медиа.'],
  ['saturation_down', 'Насыщенность −10%', 'Уменьшает насыщенность выбранного медиа.'],
  ['contrast_up', 'Контраст +10%', 'Увеличивает контраст выбранного медиа.'],
  ['contrast_down', 'Контраст −10%', 'Уменьшает контраст выбранного медиа.'],
  ['video_play', 'Пауза или воспроизведение', 'Переключает состояние выбранного видео.'],
  ['speed_half', 'Скорость видео 0.5×', 'Устанавливает скорость воспроизведения 0.5×.'],
  ['speed_normal', 'Скорость видео 1×', 'Возвращает стандартную скорость.'],
  ['speed_150', 'Скорость видео 1.5×', 'Устанавливает скорость воспроизведения 1.5×.'],
  ['speed_double', 'Скорость видео 2×', 'Устанавливает скорость воспроизведения 2×.'],
  ['loop', 'Зациклить видео', 'Переключает стандартный loop.'],
  ['pip', 'Картинка в картинке', 'Запрашивает стандартный Picture-in-Picture.']
];

for (const [action, name, description] of MESSAGE_ACTIONS) {
  registerFeature({
    key: 'message_' + action,
    category: 'messages',
    module: 'MessageTools',
    name,
    description,
    handler: 'context-action',
    config: {scope: 'message', action}
  });
}

for (const [action, name, description] of MEDIA_ACTIONS) {
  registerFeature({
    key: 'media_' + action,
    category: 'media',
    module: 'MediaTools',
    name,
    description,
    handler: 'context-action',
    config: {scope: 'media', action}
  });
}

const UTILITY_ACTIONS = [
  ['open_center', 'Открыть центр PowerDiscord', 'Открывает главное локальное окно.'],
  ['open_feature_search', 'Поиск по 500+ функциям', 'Открывает центр и ставит курсор в поиск.'],
  ['open_text_lab', 'Открыть текстовую лабораторию', 'Открывает локальные преобразования текста.'],
  ['open_notes', 'Открыть заметки', 'Показывает ваши локальные заметки.'],
  ['open_bookmarks', 'Открыть закладки', 'Показывает сохранённые ID и ссылки без текста сообщений.'],
  ['open_favorites', 'Открыть избранное', 'Показывает локальные избранные подписи и ссылки.'],
  ['open_reminders', 'Открыть напоминания', 'Показывает локальные напоминания.'],
  ['open_diagnostics', 'Открыть диагностику', 'Показывает состояние модулей и ресурсов.'],
  ['pomodoro_start', 'Запустить Pomodoro', 'Запускает 25-минутный фокус.'],
  ['pomodoro_pause', 'Пауза Pomodoro', 'Приостанавливает текущий Pomodoro.'],
  ['pomodoro_reset', 'Сбросить Pomodoro', 'Возвращает таймер к 25 минутам.'],
  ['stopwatch_start', 'Запустить секундомер', 'Запускает локальный секундомер.'],
  ['stopwatch_pause', 'Пауза секундомера', 'Приостанавливает секундомер.'],
  ['stopwatch_reset', 'Сбросить секундомер', 'Очищает время и круги.'],
  ['stopwatch_lap', 'Добавить круг секундомера', 'Сохраняет текущий результат локально.'],
  ['timer_5', 'Таймер на 5 минут', 'Запускает локальный таймер на 5 минут.'],
  ['timer_10', 'Таймер на 10 минут', 'Запускает локальный таймер на 10 минут.'],
  ['timer_15', 'Таймер на 15 минут', 'Запускает локальный таймер на 15 минут.'],
  ['timer_25', 'Таймер на 25 минут', 'Запускает локальный таймер на 25 минут.'],
  ['timer_45', 'Таймер на 45 минут', 'Запускает локальный таймер на 45 минут.'],
  ['timer_60', 'Таймер на 60 минут', 'Запускает локальный таймер на 60 минут.'],
  ['clock_moscow', 'Время: Москва', 'Показывает текущее время Москвы.'],
  ['clock_berlin', 'Время: Берлин', 'Показывает текущее время Берлина.'],
  ['clock_london', 'Время: Лондон', 'Показывает текущее время Лондона.'],
  ['clock_new_york', 'Время: Нью-Йорк', 'Показывает текущее время Нью-Йорка.'],
  ['clock_los_angeles', 'Время: Лос-Анджелес', 'Показывает текущее время Лос-Анджелеса.'],
  ['clock_tokyo', 'Время: Токио', 'Показывает текущее время Токио.'],
  ['clock_dubai', 'Время: Дубай', 'Показывает текущее время Дубая.'],
  ['clock_sydney', 'Время: Сидней', 'Показывает текущее время Сиднея.'],
  ['hex_to_rgb', 'HEX → RGB', 'Конвертирует цвет HEX в RGB.'],
  ['rgb_to_hex', 'RGB → HEX', 'Конвертирует компоненты RGB в HEX.'],
  ['bytes_format', 'Форматировать байты', 'Преобразует число байтов в понятный размер.'],
  ['snowflake_to_date', 'Snowflake → дата', 'Вычисляет дату Discord Snowflake локально.'],
  ['date_to_timestamp', 'Дата → Unix timestamp', 'Преобразует введённую дату в Unix timestamp.'],
  ['minutes_to_clock', 'Минуты → ЧЧ:ММ', 'Форматирует количество минут.'],
  ['json_validate', 'Проверить JSON', 'Локально проверяет синтаксис JSON.'],
  ['url_inspect', 'Разобрать URL', 'Показывает протокол, домен, путь и параметры.'],
  ['uuid', 'Создать UUID', 'Создаёт UUID через browser crypto.'],
  ['password', 'Создать локальный пароль', 'Генерирует случайную строку без отправки в сеть.'],
  ['screen_info', 'Информация об экране', 'Показывает окно, DPI, экран и responsive-режим.'],
  ['session_copy', 'Копировать время сессии', 'Копирует длительность работы PowerDiscord.'],
  ['session_reset', 'Сбросить время сессии', 'Начинает отсчёт локальной сессии заново.'],
  ['copy_history_open', 'История копирований PowerDiscord', 'Показывает только данные, скопированные кнопками плагина.'],
  ['copy_history_clear', 'Очистить историю копирований', 'Удаляет локальную историю копирований PowerDiscord.'],
  ['reminder_add', 'Добавить напоминание', 'Создаёт локальное напоминание по вашему тексту.'],
  ['reminder_list', 'Список напоминаний', 'Открывает локальный список напоминаний.'],
  ['reminder_clear', 'Очистить напоминания', 'Удаляет все локальные напоминания.'],
  ['quick_note_add', 'Добавить быструю заметку', 'Добавляет введённый вами текст в локальные заметки.'],
  ['quick_note_copy', 'Копировать последнюю заметку', 'Копирует последнюю локальную заметку.'],
  ['quick_note_clear', 'Очистить быстрые заметки', 'Удаляет ваши локальные заметки.']
];

const SYSTEM_ACTIONS = [
  ['export_backup', 'Экспортировать резервную копию', 'Создаёт локальный JSON настроек и пользовательских данных.'],
  ['import_backup', 'Импортировать резервную копию', 'Проверяет JSON и запрашивает подтверждение.'],
  ['reset_all', 'Сбросить весь PowerDiscord', 'Возвращает настройки к исходным значениям.'],
  ['reset_visual', 'Сбросить оформление', 'Отключает визуальные toggle-функции и стандартную тему.'],
  ['clear_notes', 'Очистить заметки', 'Удаляет только локальные заметки.'],
  ['clear_bookmarks', 'Очистить закладки', 'Удаляет локальные ID и ссылки закладок.'],
  ['clear_favorites', 'Очистить избранное', 'Удаляет локальные избранные элементы.'],
  ['clear_reminders', 'Системная очистка напоминаний', 'Удаляет локальные напоминания через управление данными.'],
  ['storage_usage', 'Размер локальных данных', 'Показывает приблизительный объём JSON-хранилища.'],
  ['run_diagnostics', 'Запустить диагностику', 'Проверяет API, DOM, модули, таймеры и реестр.'],
  ['copy_diagnostics', 'Копировать диагностику', 'Копирует отчёт без токенов и сообщений.'],
  ['safe_mode', 'Включить безопасный режим', 'Отключает тяжёлые визуальные функции.'],
  ['master_off', 'Отключить все функции', 'Временно выключает функции без удаления плагина.'],
  ['enable_defaults', 'Включить безопасные значения', 'Возвращает рекомендуемые лёгкие функции.'],
  ['clear_errors', 'Очистить журнал ошибок', 'Удаляет локальные диагностические ошибки.'],
  ['responsive_recalc', 'Пересчитать адаптивность', 'Повторно определяет размер и формат окна.'],
  ['responsive_auto', 'Responsive: автоматически', 'Возвращает автоматический режим.'],
  ['responsive_compact', 'Responsive: компактный', 'Принудительно включает компактный режим.'],
  ['responsive_normal', 'Responsive: обычный', 'Принудительно включает обычный режим.'],
  ['responsive_large', 'Responsive: большой', 'Принудительно включает большой режим.'],
  ['responsive_ultrawide', 'Responsive: ультраширокий', 'Принудительно включает режим 21:9+.'],
  ['responsive_vertical', 'Responsive: вертикальный', 'Принудительно включает вертикальную компоновку.'],
  ['save_profile_1', 'Сохранить профиль 1', 'Сохраняет текущие настройки в первый слот.'],
  ['restore_profile_1', 'Применить профиль 1', 'Восстанавливает первый локальный профиль.'],
  ['save_profile_2', 'Сохранить профиль 2', 'Сохраняет текущие настройки во второй слот.'],
  ['restore_profile_2', 'Применить профиль 2', 'Восстанавливает второй локальный профиль.'],
  ['save_profile_3', 'Сохранить профиль 3', 'Сохраняет текущие настройки в третий слот.'],
  ['restore_profile_3', 'Применить профиль 3', 'Восстанавливает третий локальный профиль.'],
  ['clear_profiles', 'Очистить профили', 'Удаляет три пользовательских профиля.'],
  ['copy_feature_report', 'Копировать отчёт функций', 'Копирует число функций, категорий и активных параметров.']
];

const BEHAVIOR_FEATURES = [
  ['floating_launcher', 'interface', 'UiManager', 'Плавающая кнопка PowerDiscord', 'Показывает кнопку открытия центра.', true],
  ['status_bar', 'interface', 'UiManager', 'Локальная строка состояния', 'Показывает время, FPS, режим и число активных функций.', true],
  ['composer_char_counter', 'messages', 'MessageTools', 'Счётчик символов поля ввода', 'Показывает количество символов без чтения истории.', true],
  ['composer_word_counter', 'messages', 'MessageTools', 'Счётчик слов поля ввода', 'Показывает количество слов в вашем текущем черновике.', false],
  ['code_copy_buttons', 'messages', 'MessageTools', 'Кнопки копирования кода', 'Добавляет кнопку к уже отображённым code blocks.', true],
  ['keyword_highlighter', 'notifications', 'NotificationTools', 'Подсветка ключевых слов', 'Подсвечивает только отображаемые сообщения без сохранения.', false],
  ['auto_privacy_on_blur', 'privacy', 'PrivacyTools', 'Приватность при потере фокуса', 'Включает временное размытие, когда окно неактивно.', false],
  ['hotkeys', 'productivity', 'HotkeyManager', 'Горячие клавиши PowerDiscord', 'Включает центр команд, поиск и паник-клавишу.', true],
  ['context_tracking', 'productivity', 'ContextTracker', 'Контекст последнего наведённого элемента', 'Запоминает только DOM-ссылку в текущей сессии.', true],
  ['toast_notifications', 'notifications', 'NotificationTools', 'Всплывающие уведомления', 'Показывает подтверждения локальных действий.', true]
];

for (const [action, name, description] of UTILITY_ACTIONS) {
  registerFeature({
    key: 'utility_' + action,
    category: 'productivity',
    module: 'UtilityTools',
    name,
    description,
    handler: 'utility',
    config: {action}
  });
}

for (const [action, name, description] of SYSTEM_ACTIONS) {
  registerFeature({
    key: 'system_' + action,
    category: action.startsWith('responsive_') ? 'interface' : 'diagnostics',
    module: action.startsWith('responsive_') ? 'ResponsiveEngine' : 'DiagnosticsManager',
    name,
    description,
    handler: 'system',
    config: {action}
  });
}

for (const [key, category, module, name, description, defaultEnabled] of BEHAVIOR_FEATURES) {
  registerFeature({
    key: 'behavior_' + key,
    category,
    module,
    name,
    description,
    handler: 'behavior',
    defaultEnabled,
    config: {behavior: key}
  });
}

Object.freeze(FEATURE_REGISTRY);

function createDefaultState() {
  const toggles = {};
  const ranges = {};

  for (const feature of FEATURE_REGISTRY) {
    if (feature.handler === 'toggle' || feature.handler === 'behavior') {
      toggles[feature.key] = Boolean(feature.defaultEnabled);
    }
    if (feature.handler === 'range') {
      ranges[feature.key] = feature.config.defaultValue;
    }
  }

  return {
    storageVersion: 1,
    masterEnabled: true,
    safeMode: false,
    theme: 'theme_default_green',
    toggles,
    ranges,
    favoriteFeatures: [],
    recentFeatures: [],
    profiles: {},
    notes: [],
    bookmarks: [],
    favoriteItems: [],
    reminders: [],
    copyHistory: [],
    errors: [],
    keywords: 'важно, срочно, внимание, дедлайн, @everyone, @here',
    responsiveOverride: 'auto',
    firstRunComplete: false
  };
}

class EventManager {
  constructor() {
    this.listeners = [];
  }

  on(target, type, handler, options) {
    if (!target?.addEventListener) return () => {};
    target.addEventListener(type, handler, options);
    const record = {target, type, handler, options};
    this.listeners.push(record);
    return () => {
      target.removeEventListener(type, handler, options);
      this.listeners = this.listeners.filter(item => item !== record);
    };
  }

  clear() {
    for (const {target, type, handler, options} of this.listeners.splice(0)) {
      try {
        target.removeEventListener(type, handler, options);
      } catch {}
    }
  }

  get count() {
    return this.listeners.length;
  }
}

class TimerManager {
  constructor() {
    this.timeouts = new Set();
    this.intervals = new Set();
    this.frames = new Set();
  }

  timeout(callback, delay) {
    const id = window.setTimeout(() => {
      this.timeouts.delete(id);
      callback();
    }, delay);
    this.timeouts.add(id);
    return id;
  }

  interval(callback, delay) {
    const id = window.setInterval(callback, delay);
    this.intervals.add(id);
    return id;
  }

  frame(callback) {
    const id = requestAnimationFrame(timestamp => {
      this.frames.delete(id);
      callback(timestamp);
    });
    this.frames.add(id);
    return id;
  }

  clearTimeout(id) {
    window.clearTimeout(id);
    this.timeouts.delete(id);
  }

  clearInterval(id) {
    window.clearInterval(id);
    this.intervals.delete(id);
  }

  cancelFrame(id) {
    cancelAnimationFrame(id);
    this.frames.delete(id);
  }

  clear() {
    for (const id of this.timeouts) window.clearTimeout(id);
    for (const id of this.intervals) window.clearInterval(id);
    for (const id of this.frames) cancelAnimationFrame(id);
    this.timeouts.clear();
    this.intervals.clear();
    this.frames.clear();
  }

  snapshot() {
    return {
      timeouts: this.timeouts.size,
      intervals: this.intervals.size,
      frames: this.frames.size
    };
  }
}

class PatchManager {
  constructor() {
    this.unpatchers = [];
  }

  add(unpatch) {
    if (typeof unpatch === 'function') this.unpatchers.push(unpatch);
  }

  clear() {
    for (const unpatch of this.unpatchers.splice(0).reverse()) {
      try {
        unpatch();
      } catch {}
    }
  }

  get count() {
    return this.unpatchers.length;
  }
}

class StorageManager {
  constructor(plugin) {
    this.plugin = plugin;
    this.state = createDefaultState();
  }

  load() {
    let stored = null;
    try {
      stored = BdApi.Data.load(PLUGIN_NAME, STORAGE_KEY);
    } catch (error) {
      this.plugin.recordError('StorageManager.load', error);
    }
    this.state = this.normalize(stored);
    return this.state;
  }

  normalize(input) {
    const defaults = createDefaultState();
    if (!input || typeof input !== 'object' || Array.isArray(input)) return defaults;

    const output = {...defaults};
    output.masterEnabled = typeof input.masterEnabled === 'boolean' ? input.masterEnabled : true;
    output.safeMode = typeof input.safeMode === 'boolean' ? input.safeMode : false;
    output.firstRunComplete = typeof input.firstRunComplete === 'boolean' ? input.firstRunComplete : false;
    output.responsiveOverride = ['auto', 'compact', 'normal', 'large', 'ultrawide', 'super_ultrawide', 'vertical'].includes(input.responsiveOverride)
      ? input.responsiveOverride
      : 'auto';

    const themeKeys = new Set(FEATURE_REGISTRY.filter(item => item.handler === 'theme').map(item => item.key));
    output.theme = themeKeys.has(input.theme) ? input.theme : defaults.theme;

    if (input.toggles && typeof input.toggles === 'object') {
      for (const key of Object.keys(defaults.toggles)) {
        if (typeof input.toggles[key] === 'boolean') output.toggles[key] = input.toggles[key];
      }
    }

    if (input.ranges && typeof input.ranges === 'object') {
      for (const feature of FEATURE_REGISTRY.filter(item => item.handler === 'range')) {
        const value = Number(input.ranges[feature.key]);
        if (Number.isFinite(value)) {
          output.ranges[feature.key] = Math.min(feature.config.max, Math.max(feature.config.min, value));
        }
      }
    }

    const stringArray = (value, maximum) => Array.isArray(value)
      ? value.filter(item => typeof item === 'string').slice(0, maximum)
      : [];
    const objectArray = (value, maximum) => Array.isArray(value)
      ? value.filter(item => item && typeof item === 'object' && !Array.isArray(item)).slice(0, maximum)
      : [];

    output.favoriteFeatures = stringArray(input.favoriteFeatures, 530);
    output.recentFeatures = stringArray(input.recentFeatures, 60);
    output.notes = objectArray(input.notes, 300);
    output.bookmarks = objectArray(input.bookmarks, 500);
    output.favoriteItems = objectArray(input.favoriteItems, 500);
    output.reminders = objectArray(input.reminders, 200);
    output.copyHistory = stringArray(input.copyHistory, 50).map(item => item.slice(0, 2000));
    output.errors = objectArray(input.errors, 50);
    output.keywords = typeof input.keywords === 'string' ? input.keywords.slice(0, 1000) : defaults.keywords;

    if (input.profiles && typeof input.profiles === 'object' && !Array.isArray(input.profiles)) {
      for (const slot of ['1', '2', '3']) {
        const profile = input.profiles[slot];
        if (profile && typeof profile === 'object') {
          output.profiles[slot] = {
            theme: themeKeys.has(profile.theme) ? profile.theme : defaults.theme,
            toggles: {...defaults.toggles, ...(profile.toggles || {})},
            ranges: {...defaults.ranges, ...(profile.ranges || {})}
          };
        }
      }
    }

    return output;
  }

  save() {
    try {
      BdApi.Data.save(PLUGIN_NAME, STORAGE_KEY, this.state);
    } catch (error) {
      this.plugin.recordError('StorageManager.save', error);
    }
  }

  reset() {
    this.state = createDefaultState();
    this.save();
    return this.state;
  }

  approximateBytes() {
    return new TextEncoder().encode(JSON.stringify(this.state)).length;
  }
}

class StyleManager {
  constructor(plugin) {
    this.plugin = plugin;
    this.injected = false;
  }

  inject() {
    try {
      BdApi.DOM.removeStyle(STYLE_ID);
      BdApi.DOM.addStyle(STYLE_ID, BASE_CSS + '\n' + buildVisualFeatureCss());
      this.injected = true;
    } catch (error) {
      this.plugin.recordError('StyleManager.inject', error);
    }
  }

  remove() {
    try {
      BdApi.DOM.removeStyle(STYLE_ID);
      BdApi.DOM.removeStyle(CUSTOM_STYLE_ID);
    } catch {}
    this.injected = false;
  }
}

class ResponsiveEngine {
  constructor(plugin) {
    this.plugin = plugin;
    this.mode = 'normal';
    this.resizeObserver = null;
    this.resizeTimer = null;
    this.boundResize = () => this.queue();
  }

  start() {
    this.plugin.events.on(window, 'resize', this.boundResize, {passive: true});
    const mount = document.getElementById('app-mount');
    if (mount && typeof ResizeObserver === 'function') {
      this.resizeObserver = new ResizeObserver(() => this.queue());
      this.resizeObserver.observe(mount);
    }
    this.recalculate();
  }

  queue() {
    if (this.resizeTimer !== null) this.plugin.timers.clearTimeout(this.resizeTimer);
    this.resizeTimer = this.plugin.timers.timeout(() => {
      this.resizeTimer = null;
      this.recalculate();
    }, 180);
  }

  detect() {
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    const ratio = width / height;
    if (height > width * 1.12) return 'vertical';
    if (width < 900) return 'compact';
    if (ratio >= 3) return 'super_ultrawide';
    if (ratio >= 2) return 'ultrawide';
    if (width >= 1800 || height >= 1200) return 'large';
    return 'normal';
  }

  recalculate() {
    const override = this.plugin.state.responsiveOverride;
    this.mode = override === 'auto' ? this.detect() : override;
    document.documentElement.dataset.pdResponsive = this.mode;
    this.plugin.ui?.refreshStatus();
    return this.mode;
  }

  setOverride(mode) {
    const allowed = ['auto', 'compact', 'normal', 'large', 'ultrawide', 'super_ultrawide', 'vertical'];
    this.plugin.state.responsiveOverride = allowed.includes(mode) ? mode : 'auto';
    this.plugin.storage.save();
    this.recalculate();
  }

  info() {
    return {
      mode: this.mode,
      override: this.plugin.state.responsiveOverride,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      screenWidth: screen.width,
      screenHeight: screen.height,
      availWidth: screen.availWidth,
      availHeight: screen.availHeight
    };
  }

  stop() {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    if (this.resizeTimer !== null) this.plugin.timers.clearTimeout(this.resizeTimer);
    this.resizeTimer = null;
    delete document.documentElement.dataset.pdResponsive;
  }
}

class DataManager {
  constructor(plugin) {
    this.plugin = plugin;
  }

  addNote(text, context = 'Общая') {
    const value = String(text || '').trim();
    if (!value) return false;
    this.plugin.state.notes.unshift({
      id: crypto.randomUUID(),
      text: value.slice(0, 5000),
      context: String(context).slice(0, 120),
      createdAt: Date.now()
    });
    this.plugin.state.notes = this.plugin.state.notes.slice(0, 300);
    this.plugin.storage.save();
    return true;
  }

  addBookmark(data) {
    if (!data?.messageId && !data?.url) return false;
    const signature = String(data.url || data.messageId);
    if (this.plugin.state.bookmarks.some(item => String(item.url || item.messageId) === signature)) return false;
    this.plugin.state.bookmarks.unshift({
      id: crypto.randomUUID(),
      messageId: String(data.messageId || ''),
      channelId: String(data.channelId || ''),
      guildId: String(data.guildId || ''),
      url: String(data.url || ''),
      label: String(data.label || 'Сообщение').slice(0, 120),
      createdAt: Date.now()
    });
    this.plugin.state.bookmarks = this.plugin.state.bookmarks.slice(0, 500);
    this.plugin.storage.save();
    return true;
  }

  addFavorite(type, value, label = '') {
    const cleanValue = String(value || '').trim();
    if (!cleanValue) return false;
    const signature = type + ':' + cleanValue;
    if (this.plugin.state.favoriteItems.some(item => item.signature === signature)) return false;
    this.plugin.state.favoriteItems.unshift({
      id: crypto.randomUUID(),
      signature,
      type: String(type),
      value: cleanValue.slice(0, 1000),
      label: String(label || cleanValue).slice(0, 160),
      createdAt: Date.now()
    });
    this.plugin.state.favoriteItems = this.plugin.state.favoriteItems.slice(0, 500);
    this.plugin.storage.save();
    return true;
  }

  addReminder(text, delayMinutes = 0) {
    const value = String(text || '').trim();
    if (!value) return false;
    this.plugin.state.reminders.unshift({
      id: crypto.randomUUID(),
      text: value.slice(0, 1000),
      createdAt: Date.now(),
      dueAt: delayMinutes > 0 ? Date.now() + delayMinutes * 60_000 : null,
      completed: false
    });
    this.plugin.state.reminders = this.plugin.state.reminders.slice(0, 200);
    this.plugin.storage.save();
    return true;
  }

  clear(collection) {
    if (!['notes', 'bookmarks', 'favoriteItems', 'reminders', 'copyHistory', 'errors'].includes(collection)) return;
    this.plugin.state[collection] = [];
    this.plugin.storage.save();
  }
}

class DiagnosticsManager {
  constructor(plugin) {
    this.plugin = plugin;
  }

  validateRegistry() {
    const ids = new Set(FEATURE_REGISTRY.map(item => item.id));
    const keys = new Set(FEATURE_REGISTRY.map(item => item.key));
    const names = new Set(FEATURE_REGISTRY.map(item => item.name));
    const unsupported = FEATURE_REGISTRY.filter(item => !HANDLER_TYPES.has(item.handler));
    return {
      count: FEATURE_REGISTRY.length,
      idsUnique: ids.size === FEATURE_REGISTRY.length,
      keysUnique: keys.size === FEATURE_REGISTRY.length,
      namesUnique: names.size === FEATURE_REGISTRY.length,
      unsupportedHandlers: unsupported.map(item => item.key)
    };
  }

  report() {
    const registry = this.validateRegistry();
    return {
      plugin: PLUGIN_NAME,
      version: VERSION,
      timestamp: new Date().toISOString(),
      masterEnabled: this.plugin.state.masterEnabled,
      safeMode: this.plugin.state.safeMode,
      responsive: this.plugin.responsive.info(),
      registry,
      resources: {
        listeners: this.plugin.events.count,
        patches: this.plugin.patches.count,
        timers: this.plugin.timers.snapshot(),
        observer: Boolean(this.plugin.behaviors?.observer),
        styleInjected: this.plugin.styles.injected,
        modifiedMedia: this.plugin.context?.modifiedMedia.size || 0
      },
      storageBytes: this.plugin.storage.approximateBytes(),
      moduleHealth: {...this.plugin.moduleHealth},
      errors: this.plugin.state.errors.slice(-20).map(item => ({
        module: item.module,
        message: item.message,
        at: item.at
      }))
    };
  }

  textReport() {
    return JSON.stringify(this.report(), null, 2);
  }
}

class ContextTracker {
  constructor(plugin) {
    this.plugin = plugin;
    this.lastMessage = null;
    this.lastMedia = null;
    this.modifiedMedia = new Set();
    this.mediaStates = new WeakMap();
    this.boundPointer = event => this.handlePointer(event);
  }

  start() {
    this.plugin.events.on(document, 'pointerover', this.boundPointer, {capture: true, passive: true});
  }

  handlePointer(event) {
    if (!this.plugin.isFeatureEnabled('behavior_context_tracking')) return;
    const target = event.target;
    if (!(target instanceof Element) || target.closest('#pd-center, #pd-launcher, .pd-settings-host')) return;

    const message = target.closest('li[id^="chat-messages-"], [class*="messageListItem_"]');
    if (message) this.lastMessage = message;

    const media = target.closest('img, video');
    if (media && !media.closest('#pd-center, #pd-launcher')) this.lastMedia = media;
  }

  messageData() {
    const message = this.lastMessage?.isConnected ? this.lastMessage : null;
    if (!message) return null;

    const idNumbers = (message.id || '').match(/\d{8,}/g) || [];
    const pathParts = location.pathname.split('/').filter(Boolean);
    const guildId = pathParts[0] === 'channels' ? (pathParts[1] || '@me') : '@me';
    const channelId = idNumbers.length >= 2 ? idNumbers[idNumbers.length - 2] : (pathParts[2] || '');
    const messageId = idNumbers[idNumbers.length - 1] || '';
    const textNode = message.querySelector('[class*="messageContent_"]');
    const authorNode = message.querySelector('[class*="username_"]');
    const timestampNode = message.querySelector('time, [class*="timestamp_"]');
    const anchors = [...message.querySelectorAll('a[href]')];
    const images = [...message.querySelectorAll('img[src]')];
    const attachments = anchors.filter(anchor => anchor.href && !anchor.href.startsWith('javascript:'));
    const jumpLink = messageId && channelId
      ? 'https://discord.com/channels/' + guildId + '/' + channelId + '/' + messageId
      : '';

    return {
      message,
      messageId,
      channelId,
      guildId,
      jumpLink,
      text: textNode?.textContent || '',
      author: authorNode?.textContent?.trim() || '',
      timestamp: timestampNode?.getAttribute('datetime') || timestampNode?.textContent?.trim() || '',
      links: anchors.map(anchor => anchor.href).filter(Boolean),
      images: images.map(image => image.currentSrc || image.src).filter(Boolean),
      attachments: attachments.map(anchor => anchor.href).filter(Boolean),
      code: [...message.querySelectorAll('pre code, code')].map(node => node.textContent || '').filter(Boolean)
    };
  }

  requireMessage() {
    const data = this.messageData();
    if (!data) this.plugin.toast('Наведите курсор на сообщение и повторите действие.', 'warning');
    return data;
  }

  requireMedia() {
    const media = this.lastMedia?.isConnected ? this.lastMedia : null;
    if (!media) this.plugin.toast('Наведите курсор на изображение или видео.', 'warning');
    return media;
  }

  snowflakeDate(value) {
    try {
      const milliseconds = Number((BigInt(value) >> 22n) + 1420070400000n);
      return new Date(milliseconds);
    } catch {
      return null;
    }
  }

  async runMessage(action) {
    if (action === 'unhide_all') {
      document.querySelectorAll('.pd-message-hidden').forEach(node => node.classList.remove('pd-message-hidden'));
      this.plugin.toast('Локально скрытые сообщения возвращены.', 'success');
      return;
    }

    const data = this.requireMessage();
    if (!data) return;
    const cleanText = data.text.replace(/\s+/g, ' ').trim();
    const copy = value => this.plugin.copyText(value);

    switch (action) {
      case 'copy_text': await copy(data.text); break;
      case 'copy_clean_text': await copy(cleanText); break;
      case 'copy_message_id': await copy(data.messageId); break;
      case 'copy_channel_id': await copy(data.channelId); break;
      case 'copy_jump_link': await copy(data.jumpLink); break;
      case 'copy_author': await copy(data.author); break;
      case 'copy_timestamp': await copy(data.timestamp); break;
      case 'copy_snowflake_date': {
        const date = this.snowflakeDate(data.messageId);
        if (!date) throw new Error('ID сообщения не найден');
        await copy(date.toLocaleString('ru-RU'));
        break;
      }
      case 'copy_links': await copy([...new Set(data.links)].join('\n')); break;
      case 'copy_mentions': await copy([...new Set(data.text.match(/@[\p{L}\p{N}_.-]+/gu) || [])].join('\n')); break;
      case 'copy_code': await copy(data.code.join('\n\n')); break;
      case 'copy_attachment_urls': await copy([...new Set(data.attachments)].join('\n')); break;
      case 'copy_image_urls': await copy([...new Set(data.images)].join('\n')); break;
      case 'copy_quote': await copy(data.text.split(/\r?\n/).map(line => '> ' + line).join('\n')); break;
      case 'copy_spoiler': await copy('||' + data.text + '||'); break;
      case 'copy_selection': await copy(window.getSelection()?.toString() || ''); break;
      case 'show_stats': {
        const words = data.text.match(/[\p{L}\p{N}]+/gu) || [];
        this.plugin.ui.showResult('Статистика сообщения', [
          'Символов: ' + [...data.text].length,
          'Слов: ' + words.length,
          'Строк: ' + data.text.split(/\r?\n/).length,
          'Ссылок: ' + data.links.length,
          'Блоков кода: ' + data.code.length
        ].join('\n'));
        break;
      }
      case 'show_full_text': this.plugin.ui.showResult('Текст сообщения', data.text || 'Текст не найден.'); break;
      case 'highlight': data.message.classList.add('pd-message-highlight'); break;
      case 'unhighlight': data.message.classList.remove('pd-message-highlight'); break;
      case 'hide_local': data.message.classList.add('pd-message-hidden'); break;
      case 'scroll_center': data.message.scrollIntoView({behavior: 'smooth', block: 'center'}); break;
      case 'bookmark_location': {
        const added = this.plugin.data.addBookmark({
          messageId: data.messageId,
          channelId: data.channelId,
          guildId: data.guildId,
          url: data.jumpLink,
          label: data.author ? 'Сообщение от ' + data.author : 'Сообщение'
        });
        this.plugin.toast(added ? 'Закладка сохранена без текста сообщения.' : 'Такая закладка уже есть.', added ? 'success' : 'info');
        break;
      }
      case 'add_message_note': {
        const note = this.plugin.ui.promptText('Заметка к позиции сообщения', '');
        if (note) this.plugin.data.addNote(note, 'Message ID: ' + (data.messageId || 'не найден'));
        break;
      }
      case 'favorite_author_label': {
        const added = this.plugin.data.addFavorite('author-label', data.author, data.author);
        this.plugin.toast(added ? 'Автор добавлен в локальное избранное.' : 'Автор уже в избранном.', added ? 'success' : 'info');
        break;
      }
      case 'filter_author_local': {
        if (!data.author) throw new Error('Имя автора не найдено');
        for (const message of document.querySelectorAll('li[id^="chat-messages-"], [class*="messageListItem_"]')) {
          const author = message.querySelector('[class*="username_"]')?.textContent?.trim();
          if (author === data.author) message.classList.toggle('pd-author-filtered');
        }
        break;
      }
      case 'copy_dom_id': await copy(data.message.id || ''); break;
      case 'copy_aria_label': await copy(data.message.getAttribute('aria-label') || ''); break;
      case 'inspect_visible_message': {
        this.plugin.ui.showResult('Безопасные DOM-метаданные', JSON.stringify({
          messageId: data.messageId,
          channelId: data.channelId,
          guildId: data.guildId,
          hasText: Boolean(data.text),
          linkCount: data.links.length,
          imageCount: data.images.length,
          codeBlockCount: data.code.length,
          domConnected: data.message.isConnected
        }, null, 2));
        break;
      }
      default: throw new Error('Неизвестное действие сообщения: ' + action);
    }
  }

  mediaState(media) {
    if (!this.mediaStates.has(media)) {
      this.mediaStates.set(media, {
        zoom: 1,
        rotate: 0,
        flipX: 1,
        flipY: 1,
        brightness: 1,
        saturation: 1,
        contrast: 1,
        gray: 0,
        blur: 0,
        fit: false
      });
    }
    return this.mediaStates.get(media);
  }

  applyMediaState(media) {
    const state = this.mediaState(media);
    media.classList.add('pd-media-active');
    media.style.setProperty('--pd-media-transform', 'scale(' + state.zoom + ') rotate(' + state.rotate + 'deg) scaleX(' + state.flipX + ') scaleY(' + state.flipY + ')');
    media.style.setProperty('--pd-media-local-brightness', String(state.brightness));
    media.style.setProperty('--pd-media-local-saturation', String(state.saturation));
    media.style.setProperty('--pd-media-local-contrast', String(state.contrast));
    media.style.setProperty('--pd-media-local-gray', String(state.gray));
    media.style.setProperty('--pd-media-local-blur', state.blur + 'px');
    media.style.setProperty('--pd-media-local-max-width', state.fit ? '92vw' : 'initial');
    media.style.setProperty('--pd-media-local-max-height', state.fit ? '88vh' : 'initial');
    this.modifiedMedia.add(media);
  }

  resetMedia(media) {
    this.mediaStates.delete(media);
    media.classList.remove('pd-media-active');
    for (const property of [
      '--pd-media-transform',
      '--pd-media-local-brightness',
      '--pd-media-local-saturation',
      '--pd-media-local-contrast',
      '--pd-media-local-gray',
      '--pd-media-local-blur',
      '--pd-media-local-max-width',
      '--pd-media-local-max-height'
    ]) media.style.removeProperty(property);
    this.modifiedMedia.delete(media);
  }

  mediaUrl(media) {
    return media.currentSrc || media.src || '';
  }

  async runMedia(action) {
    const media = this.requireMedia();
    if (!media) return;
    const state = this.mediaState(media);
    const url = this.mediaUrl(media);

    switch (action) {
      case 'copy_url': await this.plugin.copyText(url); return;
      case 'open_original': if (url) window.open(url, '_blank', 'noopener,noreferrer'); return;
      case 'download': {
        if (!url) throw new Error('URL медиа не найден');
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = '';
        anchor.rel = 'noopener';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        return;
      }
      case 'dimensions': {
        const width = media instanceof HTMLVideoElement ? media.videoWidth : media.naturalWidth;
        const height = media instanceof HTMLVideoElement ? media.videoHeight : media.naturalHeight;
        this.plugin.ui.showResult('Разрешение медиа', width + ' × ' + height + ' px');
        return;
      }
      case 'aspect': {
        const width = media instanceof HTMLVideoElement ? media.videoWidth : media.naturalWidth;
        const height = media instanceof HTMLVideoElement ? media.videoHeight : media.naturalHeight;
        const gcd = (a, b) => b ? gcd(b, a % b) : a;
        const divisor = gcd(width || 1, height || 1);
        this.plugin.ui.showResult('Соотношение сторон', (width / divisor) + ':' + (height / divisor));
        return;
      }
      case 'type': {
        const extension = new URL(url, location.href).pathname.split('.').pop()?.toLowerCase() || 'неизвестно';
        this.plugin.ui.showResult('Тип медиа', (media instanceof HTMLVideoElement ? 'Видео' : 'Изображение') + '\nРасширение: ' + extension);
        return;
      }
      case 'zoom_in': state.zoom = Math.min(5, state.zoom + 0.2); break;
      case 'zoom_out': state.zoom = Math.max(0.2, state.zoom - 0.2); break;
      case 'reset': this.resetMedia(media); return;
      case 'rotate_left': state.rotate -= 90; break;
      case 'rotate_right': state.rotate += 90; break;
      case 'flip_horizontal': state.flipX *= -1; break;
      case 'flip_vertical': state.flipY *= -1; break;
      case 'fit': state.fit = !state.fit; break;
      case 'fullscreen': await media.requestFullscreen?.(); return;
      case 'grayscale': state.gray = state.gray ? 0 : 1; break;
      case 'blur': state.blur = state.blur ? 0 : 8; break;
      case 'brightness_up': state.brightness = Math.min(2, state.brightness + 0.1); break;
      case 'brightness_down': state.brightness = Math.max(0.1, state.brightness - 0.1); break;
      case 'saturation_up': state.saturation = Math.min(3, state.saturation + 0.1); break;
      case 'saturation_down': state.saturation = Math.max(0, state.saturation - 0.1); break;
      case 'contrast_up': state.contrast = Math.min(3, state.contrast + 0.1); break;
      case 'contrast_down': state.contrast = Math.max(0.1, state.contrast - 0.1); break;
      case 'video_play': {
        if (!(media instanceof HTMLVideoElement)) throw new Error('Наведённый элемент не является видео');
        if (media.paused) await media.play();
        else media.pause();
        return;
      }
      case 'speed_half':
      case 'speed_normal':
      case 'speed_150':
      case 'speed_double': {
        if (!(media instanceof HTMLVideoElement)) throw new Error('Наведённый элемент не является видео');
        media.playbackRate = {speed_half: 0.5, speed_normal: 1, speed_150: 1.5, speed_double: 2}[action];
        return;
      }
      case 'loop': {
        if (!(media instanceof HTMLVideoElement)) throw new Error('Наведённый элемент не является видео');
        media.loop = !media.loop;
        this.plugin.toast('Повтор видео: ' + (media.loop ? 'включён' : 'выключен'), 'info');
        return;
      }
      case 'pip': {
        if (!(media instanceof HTMLVideoElement) || !media.requestPictureInPicture) throw new Error('Picture-in-Picture недоступен');
        await media.requestPictureInPicture();
        return;
      }
      default: throw new Error('Неизвестное действие медиа: ' + action);
    }

    this.applyMediaState(media);
  }

  stop() {
    for (const media of this.modifiedMedia) {
      if (media instanceof Element) this.resetMedia(media);
    }
    this.modifiedMedia.clear();
    this.lastMessage = null;
    this.lastMedia = null;
    document.querySelectorAll('.pd-message-highlight, .pd-message-hidden, .pd-author-filtered').forEach(node => {
      node.classList.remove('pd-message-highlight', 'pd-message-hidden', 'pd-author-filtered');
    });
  }
}

class BehaviorManager {
  constructor(plugin) {
    this.plugin = plugin;
    this.observer = null;
    this.pendingNodes = new Set();
    this.scanTimer = null;
    this.composer = null;
    this.counter = null;
    this.fps = 0;
    this.fpsFrames = 0;
    this.fpsStartedAt = 0;
    this.fpsFrameId = null;
    this.boundInput = () => this.updateComposerCounter();
    this.boundHotkey = event => this.handleHotkey(event);
    this.boundBlur = () => this.handleWindowBlur(true);
    this.boundFocus = () => this.handleWindowBlur(false);
  }

  start() {
    this.plugin.events.on(document, 'keydown', this.boundHotkey, true);
    this.plugin.events.on(window, 'blur', this.boundBlur);
    this.plugin.events.on(window, 'focus', this.boundFocus);
    this.plugin.timers.interval(() => this.checkReminders(), 30_000);
    this.sync();
  }

  enabled(key) {
    const recoveryBehavior = key === 'floating_launcher' || key === 'hotkeys';
    return (this.plugin.state.masterEnabled || recoveryBehavior) && this.plugin.isFeatureEnabled('behavior_' + key);
  }

  needsObserver() {
    return this.enabled('composer_char_counter') ||
      this.enabled('composer_word_counter') ||
      this.enabled('code_copy_buttons') ||
      this.enabled('keyword_highlighter');
  }

  sync() {
    if (this.needsObserver()) this.startObserver();
    else this.stopObserver();

    if (!this.enabled('composer_char_counter') && !this.enabled('composer_word_counter')) this.unbindComposer();
    if (!this.enabled('code_copy_buttons')) this.clearCodeButtons();
    if (!this.enabled('keyword_highlighter')) this.clearKeywordHighlights();

    this.plugin.ui?.syncAuxiliaryUi();
    this.syncNightOverlay();

    if (this.enabled('status_bar')) this.startFps();
    else this.stopFps();
  }

  startObserver() {
    if (this.observer) return;
    const mount = document.getElementById('app-mount') || document.body;
    this.observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'characterData') {
          this.queue(mutation.target.parentElement);
          continue;
        }
        for (const node of mutation.addedNodes) {
          if (node instanceof Element) this.queue(node);
        }
      }
    });
    this.observer.observe(mount, {subtree: true, childList: true, characterData: true});
    this.queue(mount);
  }

  stopObserver() {
    this.observer?.disconnect();
    this.observer = null;
    this.pendingNodes.clear();
    if (this.scanTimer !== null) this.plugin.timers.clearTimeout(this.scanTimer);
    this.scanTimer = null;
  }

  queue(node) {
    if (!(node instanceof Element)) return;
    this.pendingNodes.add(node);
    if (this.scanTimer !== null) return;
    this.scanTimer = this.plugin.timers.timeout(() => {
      this.scanTimer = null;
      const nodes = [...this.pendingNodes].slice(0, 80);
      this.pendingNodes.clear();
      for (const item of nodes) this.scan(item);
    }, 90);
  }

  scan(root) {
    if (!(root instanceof Element)) return;
    if (this.enabled('composer_char_counter') || this.enabled('composer_word_counter')) {
      const selector = '[role="textbox"][contenteditable="true"]';
      const composer = root.matches?.(selector) ? root : root.querySelector?.(selector);
      if (composer && composer !== this.composer) this.bindComposer(composer);
    }

    if (this.enabled('code_copy_buttons')) {
      const blocks = [];
      if (root.matches?.('pre code')) blocks.push(root);
      for (const code of root.querySelectorAll?.('pre code') || []) blocks.push(code);
      for (const code of blocks) this.enhanceCode(code);
    }

    if (this.enabled('keyword_highlighter')) this.highlightKeywords(root);
  }

  bindComposer(composer) {
    this.unbindComposer();
    this.composer = composer;
    this.composer.addEventListener('input', this.boundInput);
    const host = composer.closest('[class*="scrollableContainer_"]') || composer.parentElement;
    if (!host) return;
    host.classList.add('pd-composer-host');
    this.counter = document.createElement('span');
    this.counter.className = 'pd-composer-counter';
    this.counter.setAttribute('aria-hidden', 'true');
    host.appendChild(this.counter);
    this.updateComposerCounter();
  }

  updateComposerCounter() {
    if (!this.composer || !this.counter) return;
    const text = (this.composer.innerText || '').replace(/\n$/, '');
    const parts = [];
    if (this.enabled('composer_char_counter')) parts.push([...text].length + ' симв.');
    if (this.enabled('composer_word_counter')) {
      const words = text.trim().match(/[\p{L}\p{N}]+/gu) || [];
      parts.push(words.length + ' слов');
    }
    this.counter.textContent = parts.join(' • ');
  }

  unbindComposer() {
    if (this.composer) this.composer.removeEventListener('input', this.boundInput);
    this.composer = null;
    this.counter?.remove();
    this.counter = null;
    document.querySelectorAll('.pd-composer-host').forEach(node => node.classList.remove('pd-composer-host'));
  }

  enhanceCode(code) {
    const pre = code.closest('pre');
    if (!pre || pre.querySelector(':scope > .pd-code-copy')) return;
    pre.classList.add('pd-code-host');
    const button = document.createElement('button');
    button.className = 'pd-code-copy';
    button.type = 'button';
    button.textContent = 'Копировать';
    button.title = 'Копировать код';
    button.addEventListener('click', async event => {
      event.preventDefault();
      event.stopPropagation();
      const success = await this.plugin.copyText(code.textContent || '');
      button.textContent = success ? 'Готово' : 'Ошибка';
      this.plugin.timers.timeout(() => {
        if (button.isConnected) button.textContent = 'Копировать';
      }, 1400);
    });
    pre.appendChild(button);
  }

  clearCodeButtons() {
    document.querySelectorAll('.pd-code-copy').forEach(node => node.remove());
    document.querySelectorAll('.pd-code-host').forEach(node => node.classList.remove('pd-code-host'));
  }

  keywords() {
    return [...new Set(this.plugin.state.keywords
      .split(/[,\n;]+/)
      .map(item => item.trim().toLocaleLowerCase('ru-RU'))
      .filter(item => item.length >= 2)
      .slice(0, 50))];
  }

  highlightKeywords(root) {
    const selector = '[class*="messageContent_"]';
    const nodes = [];
    if (root.matches?.(selector)) nodes.push(root);
    for (const node of root.querySelectorAll?.(selector) || []) nodes.push(node);
    const keywords = this.keywords();

    for (const content of nodes) {
      const text = (content.textContent || '').toLocaleLowerCase('ru-RU');
      const message = content.closest('li[id^="chat-messages-"], [class*="messageListItem_"]');
      if (message) message.classList.toggle('pd-keyword-hit', keywords.some(keyword => text.includes(keyword)));
    }
  }

  clearKeywordHighlights() {
    document.querySelectorAll('.pd-keyword-hit').forEach(node => node.classList.remove('pd-keyword-hit'));
  }

  handleHotkey(event) {
    if (!this.enabled('hotkeys')) return;
    if (event.key === 'Escape' && this.plugin.ui?.isOpen()) {
      event.preventDefault();
      this.plugin.ui.close();
      return;
    }

    if (event.ctrlKey && event.shiftKey && event.code === 'KeyP') {
      event.preventDefault();
      this.plugin.ui.open('features');
      return;
    }

    if (event.ctrlKey && event.shiftKey && event.code === 'KeyK') {
      event.preventDefault();
      this.plugin.ui.open('features', true);
      return;
    }

    if (event.altKey && event.shiftKey && event.code === 'KeyP') {
      event.preventDefault();
      document.documentElement.classList.toggle('pd-window-private');
      this.plugin.toast('Паник-режим приватности переключён.', 'info');
      return;
    }

    if (event.altKey && event.shiftKey && event.code === 'KeyF') {
      event.preventDefault();
      this.plugin.features.applyPreset('focus');
    }
  }

  handleWindowBlur(isBlurred) {
    if (!this.enabled('auto_privacy_on_blur')) return;
    document.documentElement.classList.toggle('pd-window-private', isBlurred);
  }

  syncNightOverlay() {
    let overlay = document.getElementById('pd-night-overlay');
    const amount = Number(this.plugin.state.ranges.night_dim || 0);
    if (!overlay && amount > 0 && this.plugin.state.masterEnabled) {
      overlay = document.createElement('div');
      overlay.id = 'pd-night-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.appendChild(overlay);
    }
    if (overlay) overlay.style.display = amount > 0 && this.plugin.state.masterEnabled ? 'block' : 'none';
  }

  startFps() {
    if (this.fpsFrameId !== null) return;
    this.fpsFrames = 0;
    this.fpsStartedAt = performance.now();
    const tick = timestamp => {
      this.fpsFrameId = null;
      if (!this.enabled('status_bar')) return;
      this.fpsFrames += 1;
      const elapsed = timestamp - this.fpsStartedAt;
      if (elapsed >= 1000) {
        this.fps = Math.round(this.fpsFrames * 1000 / elapsed);
        this.fpsFrames = 0;
        this.fpsStartedAt = timestamp;
        this.plugin.ui?.refreshStatus();
      }
      this.fpsFrameId = this.plugin.timers.frame(tick);
    };
    this.fpsFrameId = this.plugin.timers.frame(tick);
  }

  stopFps() {
    if (this.fpsFrameId !== null) this.plugin.timers.cancelFrame(this.fpsFrameId);
    this.fpsFrameId = null;
    this.fps = 0;
  }

  checkReminders() {
    const due = this.plugin.state.reminders.filter(item => !item.completed && item.dueAt && item.dueAt <= Date.now());
    if (!due.length) return;
    for (const reminder of due) {
      reminder.completed = true;
      this.plugin.toast('Напоминание: ' + reminder.text, 'info', 7000);
    }
    this.plugin.storage.save();
    this.plugin.ui?.refreshDataView();
  }

  stop() {
    this.stopObserver();
    this.stopFps();
    this.unbindComposer();
    this.clearCodeButtons();
    this.clearKeywordHighlights();
    document.getElementById('pd-night-overlay')?.remove();
    document.documentElement.classList.remove('pd-window-private');
  }
}

class FeatureEngine {
  constructor(plugin) {
    this.plugin = plugin;
    this.byKey = new Map(FEATURE_REGISTRY.map(feature => [feature.key, feature]));
  }

  feature(key) {
    return this.byKey.get(key) || null;
  }

  isEnabled(key) {
    const feature = this.feature(key);
    if (!feature) return false;
    if (feature.handler === 'toggle' || feature.handler === 'behavior') {
      return Boolean(this.plugin.state.toggles[key]);
    }
    return true;
  }

  setEnabled(key, enabled, save = true) {
    const feature = this.feature(key);
    if (!feature || !['toggle', 'behavior'].includes(feature.handler)) return false;
    this.plugin.state.toggles[key] = Boolean(enabled);
    this.applyAll();
    if (save) this.plugin.storage.save();
    this.markRecent(key);
    this.plugin.ui?.refreshFeatureBrowser();
    return true;
  }

  setRange(key, value, save = true) {
    const feature = this.feature(key);
    if (!feature || feature.handler !== 'range') return false;
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return false;
    this.plugin.state.ranges[key] = Math.min(feature.config.max, Math.max(feature.config.min, numeric));
    this.applyRange(feature);
    if (key === 'night_dim') this.plugin.behaviors?.syncNightOverlay();
    if (save) this.plugin.storage.save();
    this.markRecent(key);
    this.plugin.ui?.refreshStatus();
    return true;
  }

  applyRange(feature) {
    const value = this.plugin.state.ranges[feature.key] ?? feature.config.defaultValue;
    document.documentElement.style.setProperty(feature.config.variable, String(value) + feature.config.unit);
  }

  applyTheme(key = this.plugin.state.theme, save = true) {
    const feature = this.feature(key);
    if (!feature || feature.handler !== 'theme') return false;
    const root = document.documentElement;
    const palette = feature.config;
    root.style.setProperty('--pd-bg', palette.bg);
    root.style.setProperty('--pd-bg-secondary', palette.secondary);
    root.style.setProperty('--pd-card', palette.card);
    root.style.setProperty('--pd-border', palette.border);
    root.style.setProperty('--pd-accent', palette.accent);
    root.style.setProperty('--pd-text', palette.text);
    root.style.setProperty('--pd-muted', palette.muted);
    this.plugin.state.theme = key;
    if (save) this.plugin.storage.save();
    this.markRecent(key);
    this.plugin.ui?.refreshFeatureBrowser();
    return true;
  }

  applyAll() {
    const root = document.documentElement;
    root.classList.add(ROOT_CLASS);
    const active = this.plugin.state.masterEnabled;

    for (const feature of FEATURE_REGISTRY) {
      if (feature.handler !== 'toggle' && feature.handler !== 'behavior') continue;
      root.classList.toggle('pd-f-' + feature.key, active && Boolean(this.plugin.state.toggles[feature.key]));
    }

    for (const feature of FEATURE_REGISTRY) {
      if (feature.handler === 'range') this.applyRange(feature);
    }

    this.applyTheme(this.plugin.state.theme, false);
    this.plugin.behaviors?.sync();
    this.plugin.ui?.syncAuxiliaryUi();
  }

  clearRootState() {
    const root = document.documentElement;
    root.classList.remove(ROOT_CLASS);
    for (const feature of FEATURE_REGISTRY) {
      root.classList.remove('pd-f-' + feature.key);
      if (feature.handler === 'range') root.style.removeProperty(feature.config.variable);
    }
    for (const variable of ['--pd-bg', '--pd-bg-secondary', '--pd-card', '--pd-border', '--pd-accent', '--pd-text', '--pd-muted']) {
      root.style.removeProperty(variable);
    }
  }

  markRecent(key) {
    this.plugin.state.recentFeatures = [key, ...this.plugin.state.recentFeatures.filter(item => item !== key)].slice(0, 60);
  }

  toggleFavorite(key) {
    const favorites = new Set(this.plugin.state.favoriteFeatures);
    if (favorites.has(key)) favorites.delete(key);
    else favorites.add(key);
    this.plugin.state.favoriteFeatures = [...favorites];
    this.plugin.storage.save();
    this.plugin.ui?.refreshFeatureBrowser();
  }

  async execute(featureOrKey) {
    const feature = typeof featureOrKey === 'string' ? this.feature(featureOrKey) : featureOrKey;
    if (!feature) return;
    this.markRecent(feature.key);

    try {
      switch (feature.handler) {
        case 'toggle':
        case 'behavior':
          this.setEnabled(feature.key, !this.isEnabled(feature.key));
          this.plugin.toast(feature.name + ': ' + (this.isEnabled(feature.key) ? 'включено' : 'выключено'), 'info');
          break;
        case 'range':
          this.plugin.ui.open('features', true, feature.key);
          break;
        case 'theme':
          this.applyTheme(feature.key);
          this.plugin.toast(feature.name + ' применена.', 'success');
          break;
        case 'preset':
          this.applyPreset(feature.config.preset);
          break;
        case 'text':
          this.plugin.ui.openTextLab(feature.config.action);
          break;
        case 'context-action':
          if (feature.config.scope === 'message') await this.plugin.context.runMessage(feature.config.action);
          else await this.plugin.context.runMedia(feature.config.action);
          break;
        case 'utility':
          await this.plugin.runUtility(feature.config.action);
          break;
        case 'system':
          await this.plugin.runSystem(feature.config.action);
          break;
        default:
          throw new Error('Обработчик функции не поддерживается: ' + feature.handler);
      }
      this.plugin.storage.save();
      this.plugin.ui?.refreshStatus();
    } catch (error) {
      this.plugin.recordError(feature.module, error);
      this.plugin.toast('Функция «' + feature.name + '»: ' + error.message, 'error', 5200);
    }
  }

  applyPreset(name) {
    const preset = PRESET_APPLICATIONS[name];
    if (!preset) throw new Error('Профиль не найден: ' + name);

    if (preset.resetVisual || preset.safeMode) {
      for (const feature of FEATURE_REGISTRY) {
        if (feature.handler === 'toggle') this.plugin.state.toggles[feature.key] = false;
      }
    }

    if (preset.safeMode) {
      this.plugin.state.safeMode = true;
      for (const feature of FEATURE_REGISTRY) {
        if (feature.handler === 'behavior') {
          this.plugin.state.toggles[feature.key] = Boolean(feature.defaultEnabled);
        }
      }
    } else {
      this.plugin.state.safeMode = false;
    }

    for (const key of preset.enable || []) {
      if (key in this.plugin.state.toggles) this.plugin.state.toggles[key] = true;
    }

    for (const [key, value] of Object.entries(preset.ranges || {})) {
      const feature = this.feature(key);
      if (feature?.handler === 'range') {
        this.plugin.state.ranges[key] = Math.min(feature.config.max, Math.max(feature.config.min, value));
      }
    }

    if (preset.theme) this.plugin.state.theme = preset.theme;
    this.plugin.state.masterEnabled = true;
    this.applyAll();
    this.plugin.storage.save();
    this.plugin.ui?.refreshFeatureBrowser();
    const label = PRESETS.find(item => item[0] === name)?.[1] || name;
    this.plugin.toast('Профиль «' + label + '» применён.', 'success');
  }
}

function createElement(tag, className = '', text = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== '') element.textContent = text;
  return element;
}

class UiManager {
  constructor(plugin) {
    this.plugin = plugin;
    this.overlay = null;
    this.launcher = null;
    this.status = null;
    this.models = new Map();
    this.mainModel = null;
  }

  start() {
    this.ensureOverlay();
    this.syncAuxiliaryUi();
  }

  ensureOverlay() {
    if (this.overlay?.isConnected) return;
    document.getElementById('pd-center')?.remove();
    const overlay = createElement('div');
    overlay.id = 'pd-center';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.addEventListener('mousedown', event => {
      if (event.target === overlay) this.close();
    });
    const model = this.buildDashboard(false);
    overlay.appendChild(model.root);
    document.body.appendChild(overlay);
    this.overlay = overlay;
    this.mainModel = model;
  }

  buildDashboard(embedded) {
    const root = createElement('section', 'pd-dashboard');
    root.setAttribute('role', embedded ? 'region' : 'dialog');
    root.setAttribute('aria-label', 'PowerDiscord');

    const head = createElement('header', 'pd-head');
    const heading = createElement('div');
    heading.append(
      createElement('h2', 'pd-title', 'PowerDiscord'),
      createElement('div', 'pd-subtitle', VERSION + ' • 530 функций • русский интерфейс • только локальные улучшения')
    );
    head.appendChild(heading);
    if (!embedded) {
      const close = createElement('button', 'pd-close', '×');
      close.type = 'button';
      close.title = 'Закрыть';
      close.addEventListener('click', () => this.close());
      head.appendChild(close);
    }

    const tabs = createElement('nav', 'pd-tabs');
    const body = createElement('div', 'pd-body');
    const model = {
      root,
      embedded,
      tabs: new Map(),
      views: new Map(),
      activeView: 'features',
      featureLimit: 100,
      favoritesOnly: false,
      search: null,
      category: null,
      featureList: null,
      stats: {},
      textInput: null,
      textOutput: null,
      textAction: null,
      dataLists: {},
      diagnostics: null
    };

    const definitions = [
      ['features', 'Все функции'],
      ['text', 'Текст'],
      ['data', 'Локальные данные'],
      ['diagnostics', 'Диагностика']
    ];
    for (const [key, label] of definitions) {
      const tab = createElement('button', 'pd-tab', label);
      tab.type = 'button';
      tab.setAttribute('aria-selected', String(key === 'features'));
      tab.addEventListener('click', () => this.switchView(model, key));
      tabs.appendChild(tab);
      model.tabs.set(key, tab);
    }

    const featureView = this.buildFeatureView(model);
    const textView = this.buildTextView(model);
    const dataView = this.buildDataView(model);
    const diagnosticView = this.buildDiagnosticView(model);
    model.views.set('features', featureView);
    model.views.set('text', textView);
    model.views.set('data', dataView);
    model.views.set('diagnostics', diagnosticView);
    body.append(featureView, textView, dataView, diagnosticView);
    root.append(head, tabs, body);
    this.models.set(root, model);
    this.refreshModel(model);
    return model;
  }

  buildFeatureView(model) {
    const view = createElement('div', 'pd-view');
    view.dataset.view = 'features';

    const stats = createElement('div', 'pd-stats');
    for (const [key, label] of [
      ['total', 'всего функций'],
      ['active', 'активно'],
      ['favorite', 'в избранном'],
      ['mode', 'режим окна']
    ]) {
      const card = createElement('div', 'pd-stat');
      const value = createElement('strong', '', '0');
      const copy = createElement('span', '', label);
      card.append(value, copy);
      stats.appendChild(card);
      model.stats[key] = value;
    }

    const filterbar = createElement('div', 'pd-filterbar');
    const search = createElement('input', 'pd-input');
    search.type = 'search';
    search.placeholder = 'Поиск по названию, описанию, модулю, ключу или ID…';
    search.setAttribute('aria-label', 'Поиск по функциям');
    search.addEventListener('input', () => {
      model.featureLimit = 100;
      this.renderFeatureList(model);
    });

    const category = createElement('select', 'pd-select');
    const all = document.createElement('option');
    all.value = '';
    all.textContent = 'Все категории';
    category.appendChild(all);
    for (const [key, label] of Object.entries(CATEGORY_LABELS)) {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = label;
      category.appendChild(option);
    }
    category.addEventListener('change', () => {
      model.featureLimit = 100;
      this.renderFeatureList(model);
    });

    const favorite = createElement('button', 'pd-button', '★ Избранное');
    favorite.type = 'button';
    favorite.addEventListener('click', () => {
      model.favoritesOnly = !model.favoritesOnly;
      favorite.setAttribute('aria-pressed', String(model.favoritesOnly));
      this.renderFeatureList(model);
    });
    filterbar.append(search, category, favorite);

    const masterCard = createElement('div', 'pd-card');
    const masterTitle = createElement('h3', '', 'Главный переключатель');
    const masterActions = createElement('div', 'pd-actions');
    const master = createElement('button', 'pd-button');
    master.type = 'button';
    master.dataset.masterButton = 'true';
    master.addEventListener('click', () => {
      this.plugin.state.masterEnabled = !this.plugin.state.masterEnabled;
      this.plugin.features.applyAll();
      this.plugin.storage.save();
      this.refreshModel(model);
    });
    const safe = createElement('button', 'pd-button', 'Безопасный режим');
    safe.type = 'button';
    safe.addEventListener('click', () => this.plugin.features.applyPreset('safe'));
    const normal = createElement('button', 'pd-button', 'Обычный вид');
    normal.type = 'button';
    normal.addEventListener('click', () => this.plugin.features.applyPreset('reset_visual'));
    masterActions.append(master, safe, normal);
    masterCard.append(masterTitle, masterActions);

    const list = createElement('div', 'pd-feature-list');
    model.search = search;
    model.category = category;
    model.featureList = list;
    view.append(stats, masterCard, filterbar, list);
    return view;
  }

  buildTextView(model) {
    const view = createElement('div', 'pd-view');
    view.dataset.view = 'text';
    view.hidden = true;

    const grid = createElement('div', 'pd-grid');
    const inputCard = createElement('section', 'pd-card');
    const outputCard = createElement('section', 'pd-card');
    inputCard.appendChild(createElement('h3', '', 'Исходный текст'));
    outputCard.appendChild(createElement('h3', '', 'Результат'));

    const select = createElement('select', 'pd-select');
    for (const [key, name] of TEXT_ACTIONS) {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = name;
      select.appendChild(option);
    }

    const input = createElement('textarea', 'pd-textarea');
    input.placeholder = 'Вставьте текст. Всё обрабатывается локально.';
    const output = createElement('textarea', 'pd-textarea');
    output.placeholder = 'Результат появится здесь…';

    const actions = createElement('div', 'pd-actions');
    const apply = createElement('button', 'pd-button', 'Преобразовать');
    apply.type = 'button';
    apply.addEventListener('click', () => {
      try {
        output.value = transformText(select.value, input.value);
      } catch (error) {
        this.plugin.toast('Ошибка преобразования: ' + error.message, 'error');
      }
    });
    const copy = createElement('button', 'pd-button', 'Скопировать результат');
    copy.type = 'button';
    copy.addEventListener('click', () => this.plugin.copyText(output.value));
    const swap = createElement('button', 'pd-button', 'Результат → исходный');
    swap.type = 'button';
    swap.addEventListener('click', () => {
      input.value = output.value;
      output.value = '';
    });
    actions.append(apply, copy, swap);
    inputCard.append(select, input, actions);
    outputCard.appendChild(output);
    grid.append(inputCard, outputCard);
    view.appendChild(grid);

    model.textInput = input;
    model.textOutput = output;
    model.textAction = select;
    return view;
  }

  buildDataView(model) {
    const view = createElement('div', 'pd-view');
    view.dataset.view = 'data';
    view.hidden = true;
    const grid = createElement('div', 'pd-grid');

    const createDataCard = (key, title, addLabel, addHandler) => {
      const card = createElement('section', 'pd-card');
      const heading = createElement('h3', '', title);
      const actions = createElement('div', 'pd-actions');
      if (addLabel) {
        const add = createElement('button', 'pd-button', addLabel);
        add.type = 'button';
        add.addEventListener('click', addHandler);
        actions.appendChild(add);
      }
      const clear = createElement('button', 'pd-button', 'Очистить');
      clear.type = 'button';
      clear.addEventListener('click', () => {
        const collection = key === 'favorites' ? 'favoriteItems' : key;
        this.plugin.confirm('Очистить локальные данные?', 'Раздел «' + title + '» будет очищен.', () => {
          this.plugin.data.clear(collection);
          this.refreshDataView();
        });
      });
      actions.appendChild(clear);
      const list = createElement('div', 'pd-note-list');
      model.dataLists[key] = list;
      card.append(heading, actions, list);
      return card;
    };

    const notes = createDataCard('notes', 'Заметки', 'Добавить заметку', () => {
      const text = this.promptText('Новая локальная заметка', '');
      if (this.plugin.data.addNote(text)) this.refreshDataView();
    });
    const bookmarks = createDataCard('bookmarks', 'Закладки без текста сообщений', '', null);
    const favorites = createDataCard('favorites', 'Избранные элементы', 'Добавить ссылку', () => {
      const value = this.promptText('Ссылка или подпись', '');
      if (this.plugin.data.addFavorite('manual', value, value)) this.refreshDataView();
    });
    const reminders = createDataCard('reminders', 'Напоминания', 'Добавить напоминание', () => {
      const text = this.promptText('Текст напоминания', '');
      if (!text) return;
      const minutes = Number(this.promptText('Через сколько минут? 0 — без времени', '0'));
      if (this.plugin.data.addReminder(text, Number.isFinite(minutes) ? Math.max(0, minutes) : 0)) this.refreshDataView();
    });

    grid.append(notes, bookmarks, favorites, reminders);
    view.appendChild(grid);
    return view;
  }

  buildDiagnosticView(model) {
    const view = createElement('div', 'pd-view');
    view.dataset.view = 'diagnostics';
    view.hidden = true;

    const actions = createElement('div', 'pd-actions');
    const refresh = createElement('button', 'pd-button', 'Запустить диагностику');
    refresh.type = 'button';
    refresh.addEventListener('click', () => this.refreshDiagnostics());
    const copy = createElement('button', 'pd-button', 'Скопировать отчёт');
    copy.type = 'button';
    copy.addEventListener('click', () => this.plugin.copyText(this.plugin.diagnostics.textReport()));
    const exportButton = createElement('button', 'pd-button', 'Экспорт резервной копии');
    exportButton.type = 'button';
    exportButton.addEventListener('click', () => this.plugin.runSystem('export_backup'));
    const importButton = createElement('button', 'pd-button', 'Импорт резервной копии');
    importButton.type = 'button';
    importButton.addEventListener('click', () => this.plugin.runSystem('import_backup'));
    actions.append(refresh, copy, exportButton, importButton);

    const report = createElement('pre', 'pd-diagnostics');
    model.diagnostics = report;
    view.append(actions, report);
    return view;
  }

  switchView(model, key) {
    if (!model.views.has(key)) return;
    model.activeView = key;
    for (const [name, view] of model.views) view.hidden = name !== key;
    for (const [name, tab] of model.tabs) tab.setAttribute('aria-selected', String(name === key));
    if (key === 'features') this.renderFeatureList(model);
    if (key === 'data') this.refreshDataView();
    if (key === 'diagnostics') this.refreshDiagnostics();
  }

  refreshModel(model) {
    if (!model?.root?.isConnected && model !== this.mainModel) return;
    const active = this.plugin.activeFeatureCount();
    model.stats.total.textContent = String(FEATURE_REGISTRY.length);
    model.stats.active.textContent = String(active);
    model.stats.favorite.textContent = String(this.plugin.state.favoriteFeatures.length);
    model.stats.mode.textContent = this.plugin.responsive?.mode || 'normal';
    const master = model.root.querySelector('[data-master-button]');
    if (master) master.textContent = this.plugin.state.masterEnabled ? 'Все функции включены' : 'Все функции выключены';
    this.renderFeatureList(model);
    this.refreshDataView();
    this.refreshDiagnostics();
  }

  featureMatches(feature, query) {
    if (!query) return true;
    const haystack = [
      feature.id,
      feature.key,
      feature.name,
      feature.description,
      feature.module,
      CATEGORY_LABELS[feature.category] || feature.category
    ].join(' ').toLocaleLowerCase('ru-RU');
    return query.split(/\s+/).every(part => haystack.includes(part));
  }

  renderFeatureList(model) {
    if (!model?.featureList) return;
    const query = (model.search?.value || '').trim().toLocaleLowerCase('ru-RU');
    const category = model.category?.value || '';
    const favoriteSet = new Set(this.plugin.state.favoriteFeatures);
    const filtered = FEATURE_REGISTRY.filter(feature => {
      if (category && feature.category !== category) return false;
      if (model.favoritesOnly && !favoriteSet.has(feature.key)) return false;
      return this.featureMatches(feature, query);
    });

    model.featureList.replaceChildren();
    for (const feature of filtered.slice(0, model.featureLimit)) {
      model.featureList.appendChild(this.buildFeatureRow(feature, favoriteSet.has(feature.key)));
    }

    if (!filtered.length) {
      model.featureList.appendChild(createElement('div', 'pd-empty', 'Функции не найдены. Измените запрос или категорию.'));
    } else if (filtered.length > model.featureLimit) {
      const more = createElement('button', 'pd-button pd-load-more', 'Показать ещё ' + Math.min(100, filtered.length - model.featureLimit));
      more.type = 'button';
      more.addEventListener('click', () => {
        model.featureLimit += 100;
        this.renderFeatureList(model);
      });
      model.featureList.appendChild(more);
    }
  }

  buildFeatureRow(feature, favorite) {
    const row = createElement('article', 'pd-feature');
    row.dataset.featureKey = feature.key;
    const star = createElement('button', 'pd-star', '★');
    star.type = 'button';
    star.title = favorite ? 'Убрать из избранного' : 'Добавить в избранное';
    star.setAttribute('aria-pressed', String(favorite));
    star.addEventListener('click', () => this.plugin.features.toggleFavorite(feature.key));

    const copy = createElement('div');
    copy.append(
      createElement('div', 'pd-feature-name', feature.name),
      createElement('div', 'pd-feature-description', feature.description),
      createElement('div', 'pd-feature-meta', '#' + feature.id + ' • ' + (CATEGORY_LABELS[feature.category] || feature.category) + ' • ' + feature.module + ' • Только локально')
    );

    let control;
    if (feature.handler === 'toggle' || feature.handler === 'behavior') {
      control = createElement('label', 'pd-switch');
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = this.plugin.features.isEnabled(feature.key);
      input.setAttribute('aria-label', feature.name);
      const track = createElement('span');
      input.addEventListener('change', () => this.plugin.features.setEnabled(feature.key, input.checked));
      control.append(input, track);
    } else if (feature.handler === 'range') {
      control = createElement('div', 'pd-range-wrap');
      const input = document.createElement('input');
      input.type = 'range';
      input.min = String(feature.config.min);
      input.max = String(feature.config.max);
      input.step = String(feature.config.step);
      input.value = String(this.plugin.state.ranges[feature.key] ?? feature.config.defaultValue);
      const value = createElement('span', 'pd-range-value', input.value + feature.config.unit);
      input.addEventListener('input', () => {
        value.textContent = input.value + feature.config.unit;
        this.plugin.features.setRange(feature.key, input.value, false);
      });
      input.addEventListener('change', () => {
        this.plugin.features.setRange(feature.key, input.value, true);
      });
      control.append(input, value);
    } else {
      const label = feature.handler === 'theme' || feature.handler === 'preset' ? 'Применить' :
        feature.handler === 'text' ? 'Открыть' : 'Запустить';
      control = createElement('button', 'pd-feature-action', label);
      control.type = 'button';
      control.addEventListener('click', () => this.plugin.features.execute(feature));
    }

    row.append(star, copy, control);
    return row;
  }

  open(view = 'features', focusSearch = false, featureKey = '') {
    this.ensureOverlay();
    this.overlay.classList.add('pd-open');
    this.overlay.setAttribute('aria-hidden', 'false');
    this.refreshModel(this.mainModel);
    this.switchView(this.mainModel, view);

    if (featureKey) {
      const feature = this.plugin.features.feature(featureKey);
      if (feature) {
        this.mainModel.search.value = feature.name;
        this.renderFeatureList(this.mainModel);
      }
    }

    queueMicrotask(() => {
      if (focusSearch) this.mainModel.search?.focus();
      else this.overlay.querySelector('.pd-close')?.focus();
    });
  }

  openTextLab(action) {
    this.open('text');
    if (action && TEXT_ACTIONS.some(item => item[0] === action)) this.mainModel.textAction.value = action;
    queueMicrotask(() => this.mainModel.textInput?.focus());
  }

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('pd-open');
    this.overlay.setAttribute('aria-hidden', 'true');
  }

  isOpen() {
    return Boolean(this.overlay?.classList.contains('pd-open'));
  }

  ensureLauncher() {
    if (this.launcher?.isConnected) return;
    document.getElementById('pd-launcher')?.remove();
    const launcher = createElement('button', '', '◆');
    launcher.id = 'pd-launcher';
    launcher.type = 'button';
    launcher.title = 'Открыть PowerDiscord (Ctrl + Shift + P)';
    launcher.setAttribute('aria-label', 'Открыть PowerDiscord');
    launcher.addEventListener('click', () => this.open());
    document.body.appendChild(launcher);
    this.launcher = launcher;
  }

  removeLauncher() {
    this.launcher?.remove();
    this.launcher = null;
    document.getElementById('pd-launcher')?.remove();
  }

  ensureStatus() {
    if (this.status?.isConnected) return;
    document.getElementById('pd-status')?.remove();
    const status = createElement('div');
    status.id = 'pd-status';
    status.setAttribute('aria-hidden', 'true');
    document.body.appendChild(status);
    this.status = status;
    this.refreshStatus();
  }

  removeStatus() {
    this.status?.remove();
    this.status = null;
    document.getElementById('pd-status')?.remove();
  }

  syncAuxiliaryUi() {
    const launcherEnabled = this.plugin.isFeatureEnabled('behavior_floating_launcher');
    const statusEnabled = this.plugin.state.masterEnabled && this.plugin.isFeatureEnabled('behavior_status_bar');
    if (launcherEnabled) this.ensureLauncher();
    else this.removeLauncher();
    if (statusEnabled) this.ensureStatus();
    else this.removeStatus();
    this.refreshStatus();
  }

  refreshStatus() {
    if (!this.status) return;
    const active = this.plugin.activeFeatureCount();
    const session = this.plugin.formatDuration(Date.now() - this.plugin.startedAt);
    const time = new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});
    this.status.textContent = [
      time,
      (this.plugin.behaviors?.fps || '—') + ' FPS',
      this.plugin.responsive?.mode || 'normal',
      active + ' активно',
      'сессия ' + session
    ].join(' • ');
  }

  refreshFeatureBrowser() {
    for (const model of this.models.values()) {
      if (model.root.isConnected) this.refreshModel(model);
    }
  }

  refreshDataView() {
    for (const model of this.models.values()) {
      if (!model.root.isConnected) continue;
      const render = (key, items, formatter) => {
        const list = model.dataLists[key];
        if (!list) return;
        list.replaceChildren();
        if (!items.length) {
          list.appendChild(createElement('div', 'pd-empty', 'Пока пусто.'));
          return;
        }
        for (const item of items.slice(0, 100)) {
          const row = createElement('div', 'pd-note-item');
          const text = createElement('span', '', formatter(item));
          const remove = createElement('button', 'pd-button', '×');
          remove.type = 'button';
          remove.title = 'Удалить';
          remove.style.float = 'right';
          remove.addEventListener('click', () => {
            const collection = key === 'favorites' ? 'favoriteItems' : key;
            this.plugin.state[collection] = this.plugin.state[collection].filter(entry => entry.id !== item.id);
            this.plugin.storage.save();
            this.refreshDataView();
          });
          row.append(remove, text);
          list.appendChild(row);
        }
      };

      render('notes', this.plugin.state.notes, item =>
        '[' + new Date(item.createdAt).toLocaleString('ru-RU') + '] ' + item.context + '\n' + item.text);
      render('bookmarks', this.plugin.state.bookmarks, item =>
        item.label + '\n' + (item.url || ('Message ID: ' + item.messageId)));
      render('favorites', this.plugin.state.favoriteItems, item =>
        item.label + '\nТип: ' + item.type);
      render('reminders', this.plugin.state.reminders, item =>
        (item.completed ? '✓ ' : '○ ') + item.text + (item.dueAt ? '\n' + new Date(item.dueAt).toLocaleString('ru-RU') : ''));
    }
  }

  refreshDiagnostics() {
    const report = this.plugin.diagnostics?.textReport() || 'Диагностика ещё не запущена.';
    for (const model of this.models.values()) {
      if (model.root.isConnected && model.diagnostics) model.diagnostics.textContent = report;
    }
  }

  showResult(title, content) {
    try {
      BdApi.UI.alert(title, String(content));
    } catch {
      window.alert(title + '\n\n' + content);
    }
  }

  promptText(title, defaultValue = '') {
    return window.prompt(title, defaultValue) ?? '';
  }

  buildSettingsPanel() {
    const host = createElement('div', 'pd-settings-host');
    const model = this.buildDashboard(true);
    host.appendChild(model.root);
    queueMicrotask(() => this.refreshModel(model));
    return host;
  }

  stop() {
    this.close();
    this.removeLauncher();
    this.removeStatus();
    this.overlay?.remove();
    this.overlay = null;
    this.mainModel = null;
    for (const [root] of this.models) {
      if (root.isConnected) root.remove();
    }
    this.models.clear();
  }
}

const PRESET_APPLICATIONS = Object.freeze({
  calm: {
    theme: 'theme_default_green',
    enable: ['soften_message_embeds', 'soften_message_attachments', 'behavior_status_bar'],
    ranges: {night_dim: 6, media_brightness: 88, media_saturation: 82}
  },
  focus: {
    enable: ['hide_server_rail', 'hide_channel_sidebar', 'hide_member_list', 'hide_activity_cards', 'hide_now_playing'],
    ranges: {chat_max_width: 1180, message_font_scale: 103}
  },
  stream: {
    enable: ['privacy_message_usernames', 'privacy_message_avatars', 'privacy_channel_names', 'privacy_server_icons', 'privacy_account_name', 'privacy_self_avatar', 'privacy_invite_button']
  },
  minimal: {
    enable: ['hide_gift_button', 'hide_activity_cards', 'hide_now_playing', 'hide_avatar_decorations', 'hide_help_button', 'hide_message_toolbar']
  },
  night: {
    theme: 'theme_midnight',
    enable: ['soften_message_embeds', 'soften_message_attachments'],
    ranges: {night_dim: 20, media_brightness: 65, media_saturation: 70, shadow_strength: 20}
  },
  reading: {
    enable: ['hide_member_list', 'hide_message_toolbar'],
    ranges: {message_font_scale: 116, message_line_height: 170, chat_max_width: 880}
  },
  compact: {
    enable: ['compact_server_rail', 'compact_channel_sidebar', 'compact_member_list', 'compact_message_avatars', 'compact_top_toolbar'],
    ranges: {message_font_scale: 94, message_gap: -2, ui_scale: 90}
  },
  large: {
    ranges: {message_font_scale: 110, channel_width: 280, member_width: 270, command_width: 1160, ui_scale: 108}
  },
  ultrawide: {
    ranges: {chat_max_width: 1080, channel_width: 300, member_width: 280, command_width: 1240}
  },
  vertical: {
    enable: ['hide_member_list', 'compact_server_rail', 'compact_channel_sidebar'],
    ranges: {channel_width: 200, message_font_scale: 96, command_width: 700}
  },
  accessibility: {
    enable: ['emphasize_message_text', 'emphasize_channel_names', 'emphasize_member_names'],
    ranges: {message_font_scale: 120, message_line_height: 178, outline_width: 2, scrollbar_width: 12}
  },
  performance: {
    ranges: {animation_speed: 0, panel_blur: 0, shadow_strength: 0, media_saturation: 100, media_contrast: 100}
  },
  media: {
    enable: ['emphasize_message_attachments', 'emphasize_message_embeds'],
    ranges: {media_brightness: 105, media_saturation: 115, image_radius: 14, embed_max_width: 720}
  },
  privacy_max: {
    enable: FEATURE_REGISTRY.filter(feature => feature.key.startsWith('privacy_')).map(feature => feature.key)
  },
  screenshot: {
    enable: ['hide_message_toolbar', 'hide_top_toolbar', 'hide_typing_indicator', 'hide_composer_buttons', 'hide_channel_unread', 'hide_server_unread']
  },
  work: {
    enable: ['hide_now_playing', 'hide_activity_cards', 'emphasize_message_text', 'behavior_keyword_highlighter', 'behavior_status_bar'],
    ranges: {message_font_scale: 105, chat_max_width: 1060}
  },
  gaming: {
    enable: ['compact_voice_users', 'emphasize_voice_controls', 'hide_now_playing'],
    ranges: {ui_scale: 92, animation_speed: 75}
  },
  quiet: {
    enable: ['soften_inbox_button', 'soften_activity_cards', 'soften_member_activities', 'hide_typing_indicator']
  },
  reset_visual: {resetVisual: true, theme: 'theme_default_green'},
  safe: {safeMode: true, theme: 'theme_default_green'}
});

function buildVisualFeatureCss() {
  const chunks = [];
  for (const feature of FEATURE_REGISTRY) {
    if (feature.handler !== 'toggle') continue;
    const root = 'html.pd-f-' + feature.key;
    chunks.push(scopedSelectors(root, feature.config.selector) + ' {' + feature.config.declaration + '}');
    if (feature.config.hover) {
      const hoverSelectors = feature.config.selector
        .split(',')
        .map(selector => root + ' ' + selector.trim() + ':hover')
        .join(',\n');
      chunks.push(hoverSelectors + ' {' + feature.config.hover + '}');
    }
  }
  return chunks.join('\n');
}

const BASE_CSS = String.raw`
:root.pd-enabled {
  --pd-bg: #101411;
  --pd-bg-secondary: #151b17;
  --pd-card: #1a211c;
  --pd-border: #29352d;
  --pd-accent: #76a985;
  --pd-text: #e3e9e5;
  --pd-muted: #9ca9a0;
  --pd-message-font-scale: 100%;
  --pd-message-line-height: 148%;
  --pd-message-gap: 0px;
  --pd-radius: 12px;
  --pd-ui-scale: 100%;
  --pd-media-brightness: 100%;
  --pd-media-saturation: 100%;
  --pd-media-contrast: 100%;
  --pd-privacy-blur: 7px;
  --pd-panel-opacity: 96%;
  --pd-panel-blur: 14px;
  --pd-command-width: 980px;
  --pd-avatar-scale: 100%;
  --pd-emoji-scale: 100%;
  --pd-channel-width: 240px;
  --pd-member-width: 240px;
  --pd-guild-width: 72px;
  --pd-composer-height: 44px;
  --pd-code-font-size: 13px;
  --pd-animation-speed: 100%;
  --pd-status-opacity: 92%;
  --pd-toolbar-scale: 100%;
  --pd-image-radius: 8px;
  --pd-embed-max-width: 520px;
  --pd-user-panel-scale: 100%;
  --pd-scrollbar-width: 8px;
  --pd-outline-width: 1px;
  --pd-shadow-strength: 45%;
  --pd-chat-max-width: 1400px;
  --pd-night-dim: 0%;
}

.pd-enabled [class*="messageContent_"] {
  font-size: var(--pd-message-font-scale) !important;
  line-height: var(--pd-message-line-height) !important;
}

.pd-enabled [class*="messageListItem_"] + [class*="messageListItem_"] {
  margin-top: var(--pd-message-gap) !important;
}

.pd-enabled [class*="message_"] [class*="avatar_"],
.pd-enabled [class*="membersWrap_"] [class*="avatar_"] {
  scale: var(--pd-avatar-scale);
}

.pd-enabled [class*="messageContent_"] img[class*="emoji_"] {
  width: calc(1.375em * var(--pd-emoji-scale) / 100%);
  height: calc(1.375em * var(--pd-emoji-scale) / 100%);
}

.pd-enabled [class*="sidebarList_"] {
  width: var(--pd-channel-width);
}

.pd-enabled [class*="membersWrap_"],
.pd-enabled [class*="members_"] {
  width: var(--pd-member-width);
}

.pd-enabled [class*="guilds_"] {
  width: var(--pd-guild-width);
}

.pd-enabled [class*="channelTextArea_"] [role="textbox"] {
  min-height: var(--pd-composer-height);
}

.pd-enabled pre code {
  font-size: var(--pd-code-font-size) !important;
}

.pd-enabled [class*="toolbar_"] {
  scale: var(--pd-toolbar-scale);
  transform-origin: right center;
}

.pd-enabled [class*="imageWrapper_"] img,
.pd-enabled [class*="imageWrapper_"] video,
.pd-enabled [class*="embedMedia_"] img,
.pd-enabled [class*="embedMedia_"] video {
  border-radius: var(--pd-image-radius) !important;
  filter:
    brightness(var(--pd-media-brightness))
    saturate(var(--pd-media-saturation))
    contrast(var(--pd-media-contrast));
}

.pd-enabled [class*="embed_"] {
  max-width: var(--pd-embed-max-width) !important;
}

.pd-enabled [class*="panels_"] {
  zoom: var(--pd-user-panel-scale);
}

.pd-enabled ::-webkit-scrollbar {
  width: var(--pd-scrollbar-width);
  height: var(--pd-scrollbar-width);
}

.pd-enabled [class*="messagesWrapper_"] [class*="scrollerContent_"] {
  max-width: var(--pd-chat-max-width);
  margin-inline: auto;
  width: 100%;
}

#pd-night-overlay {
  position: fixed;
  inset: 0;
  z-index: 2147482900;
  display: block;
  opacity: var(--pd-night-dim);
  background: #ffae68;
  mix-blend-mode: multiply;
  pointer-events: none;
}

#pd-launcher {
  position: fixed;
  left: 14px;
  bottom: 14px;
  z-index: 2147482990;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  padding: 0;
  cursor: pointer;
  border: 1px solid color-mix(in srgb, var(--pd-accent) 55%, transparent);
  border-radius: var(--pd-radius);
  color: #f1fbf4;
  background: color-mix(in srgb, var(--pd-card) var(--pd-panel-opacity), transparent);
  box-shadow: 0 12px 34px rgb(0 0 0 / var(--pd-shadow-strength));
  font: 800 19px/1 "gg sans", sans-serif;
  backdrop-filter: blur(var(--pd-panel-blur));
}

#pd-launcher:hover {
  translate: 0 -2px;
  background: color-mix(in srgb, var(--pd-accent) 26%, var(--pd-card));
}

#pd-status {
  position: fixed;
  right: 12px;
  bottom: 12px;
  z-index: 2147482989;
  padding: 6px 10px;
  border: 1px solid var(--pd-border);
  border-radius: 9px;
  color: var(--pd-muted);
  background: color-mix(in srgb, var(--pd-card) var(--pd-panel-opacity), transparent);
  box-shadow: 0 8px 24px rgba(0, 0, 0, .28);
  font: 650 10px/1.3 "gg sans", sans-serif;
  opacity: var(--pd-status-opacity);
  backdrop-filter: blur(var(--pd-panel-blur));
  pointer-events: none;
}

#pd-center {
  position: fixed;
  inset: 0;
  z-index: 2147483000;
  display: none;
  place-items: center;
  padding: 24px;
  color: var(--pd-text);
  background: rgba(2, 7, 4, .68);
  font-family: "gg sans", "Noto Sans", sans-serif;
  backdrop-filter: blur(8px);
}

#pd-center.pd-open {
  display: grid;
}

.pd-dashboard {
  width: min(var(--pd-command-width), 96vw);
  max-height: min(860px, 92vh);
  overflow: hidden;
  border: 1px solid var(--pd-border);
  border-radius: calc(var(--pd-radius) + 8px);
  color: var(--pd-text);
  background:
    radial-gradient(circle at 92% 3%, color-mix(in srgb, var(--pd-accent) 22%, transparent), transparent 30%),
    color-mix(in srgb, var(--pd-bg) var(--pd-panel-opacity), transparent);
  box-shadow: 0 30px 100px rgba(0, 0, 0, .58);
  zoom: var(--pd-ui-scale);
  backdrop-filter: blur(var(--pd-panel-blur));
}

.pd-settings-host .pd-dashboard {
  width: min(100%, 1100px);
  max-height: none;
  overflow: visible;
  box-shadow: none;
}

.pd-dashboard * {
  box-sizing: border-box;
}

.pd-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 17px 20px;
  border-bottom: 1px solid var(--pd-border);
}

.pd-title {
  margin: 0;
  color: #edf8f0;
  font-size: 22px;
  line-height: 1.15;
}

.pd-subtitle {
  margin-top: 4px;
  color: var(--pd-muted);
  font-size: 11px;
}

.pd-close,
.pd-tab,
.pd-button,
.pd-star,
.pd-feature-action {
  cursor: pointer;
  border: 1px solid var(--pd-border);
  border-radius: 9px;
  color: var(--pd-text);
  background: var(--pd-bg-secondary);
  font: 700 11px/1.3 "gg sans", sans-serif;
}

.pd-close {
  width: 34px;
  height: 34px;
  font-size: 18px;
}

.pd-tabs {
  display: flex;
  gap: 7px;
  padding: 10px 14px;
  overflow-x: auto;
  border-bottom: 1px solid var(--pd-border);
}

.pd-tab {
  flex: 0 0 auto;
  padding: 7px 11px;
}

.pd-tab[aria-selected="true"],
.pd-button:hover,
.pd-feature-action:hover {
  border-color: color-mix(in srgb, var(--pd-accent) 58%, transparent);
  background: color-mix(in srgb, var(--pd-accent) 25%, var(--pd-bg-secondary));
}

.pd-body {
  max-height: 700px;
  overflow: auto;
  padding: 14px;
}

.pd-view[hidden] {
  display: none !important;
}

.pd-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 12px;
}

.pd-stat,
.pd-card {
  border: 1px solid var(--pd-border);
  border-radius: 12px;
  background: color-mix(in srgb, var(--pd-card) 88%, transparent);
}

.pd-stat {
  padding: 10px;
  text-align: center;
}

.pd-stat strong {
  display: block;
  color: #edf7f0;
  font-size: 18px;
}

.pd-stat span {
  color: var(--pd-muted);
  font-size: 9px;
}

.pd-filterbar {
  display: grid;
  grid-template-columns: 1fr 220px auto;
  gap: 8px;
  margin-bottom: 10px;
}

.pd-input,
.pd-select,
.pd-textarea {
  width: 100%;
  border: 1px solid var(--pd-border) !important;
  border-radius: 9px !important;
  color: var(--pd-text) !important;
  background: rgba(5, 12, 7, .72) !important;
  font: 12px/1.4 "gg sans", sans-serif;
}

.pd-input,
.pd-select {
  min-height: 38px;
  padding: 8px 10px;
}

.pd-textarea {
  min-height: 160px;
  padding: 11px;
  resize: vertical;
}

.pd-feature-list {
  display: grid;
  gap: 7px;
}

.pd-feature {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  min-height: 64px;
  padding: 9px 11px;
  border: 1px solid var(--pd-border);
  border-radius: 11px;
  background: color-mix(in srgb, var(--pd-card) 82%, transparent);
}

.pd-feature:hover {
  border-color: color-mix(in srgb, var(--pd-accent) 38%, var(--pd-border));
}

.pd-star {
  width: 28px;
  height: 28px;
  padding: 0;
  color: var(--pd-muted);
}

.pd-star[aria-pressed="true"] {
  color: #e9cb70;
}

.pd-feature-name {
  color: #e4f0e7;
  font-size: 12px;
  font-weight: 750;
}

.pd-feature-description,
.pd-feature-meta {
  margin-top: 3px;
  color: var(--pd-muted);
  font-size: 9px;
  line-height: 1.35;
}

.pd-feature-action {
  min-width: 92px;
  min-height: 32px;
  padding: 6px 10px;
}

.pd-switch {
  position: relative;
  width: 42px;
  height: 24px;
}

.pd-switch input {
  position: absolute;
  opacity: 0;
}

.pd-switch span {
  position: absolute;
  inset: 0;
  cursor: pointer;
  border: 1px solid var(--pd-border);
  border-radius: 999px;
  background: #344139;
}

.pd-switch span::after {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  content: "";
  background: #dce7df;
  transition: translate 140ms ease;
}

.pd-switch input:checked + span {
  background: color-mix(in srgb, var(--pd-accent) 75%, #183020);
}

.pd-switch input:checked + span::after {
  translate: 18px 0;
}

.pd-range-wrap {
  display: grid;
  grid-template-columns: 130px 54px;
  align-items: center;
  gap: 7px;
}

.pd-range-wrap input {
  width: 100%;
  accent-color: var(--pd-accent);
}

.pd-range-value {
  color: var(--pd-muted);
  font-size: 10px;
  text-align: right;
}

.pd-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.pd-card {
  padding: 13px;
}

.pd-card h3 {
  margin: 0 0 8px;
  color: #e7f2ea;
  font-size: 13px;
}

.pd-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.pd-button {
  min-height: 34px;
  padding: 7px 11px;
}

.pd-note-list {
  display: grid;
  gap: 6px;
  margin-top: 9px;
}

.pd-note-item {
  padding: 8px 9px;
  border: 1px solid var(--pd-border);
  border-radius: 8px;
  color: #cbdacf;
  background: rgba(5, 13, 8, .55);
  font-size: 10px;
  white-space: pre-wrap;
}

.pd-diagnostics {
  margin: 0;
  padding: 12px;
  overflow: auto;
  border: 1px solid var(--pd-border);
  border-radius: 9px;
  color: #cfe0d4;
  background: #070c08;
  font: 10px/1.5 Consolas, monospace;
  white-space: pre-wrap;
}

.pd-empty {
  padding: 22px;
  color: var(--pd-muted);
  text-align: center;
  font-size: 11px;
}

.pd-load-more {
  width: 100%;
  margin-top: 9px;
}

.pd-composer-counter {
  position: absolute;
  right: 48px;
  bottom: 4px;
  z-index: 5;
  padding: 2px 5px;
  border-radius: 5px;
  color: #91a99a;
  background: rgba(8, 18, 11, .76);
  font: 650 9px/1.2 Consolas, monospace;
  pointer-events: none;
}

.pd-composer-host {
  position: relative !important;
}

.pd-code-host {
  position: relative !important;
}

.pd-code-copy {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 3;
  padding: 4px 7px;
  cursor: pointer;
  border: 1px solid var(--pd-border);
  border-radius: 7px;
  color: var(--pd-text);
  background: rgba(9, 22, 14, .92);
  font: 700 9px/1.2 "gg sans", sans-serif;
  opacity: 0;
}

.pd-code-host:hover .pd-code-copy,
.pd-code-copy:focus-visible {
  opacity: 1;
}

.pd-keyword-hit,
.pd-message-highlight {
  background: linear-gradient(90deg, color-mix(in srgb, var(--pd-accent) 20%, transparent), transparent 78%) !important;
  box-shadow: inset 4px 0 0 var(--pd-accent) !important;
}

.pd-message-hidden {
  display: none !important;
}

.pd-author-filtered {
  opacity: .24 !important;
}

.pd-window-private [class*="messageContent_"],
.pd-window-private [class*="username_"],
.pd-window-private [class*="avatar_"] {
  filter: blur(var(--pd-privacy-blur)) !important;
}

.pd-media-active {
  transform: var(--pd-media-transform, none) !important;
  filter:
    brightness(var(--pd-media-local-brightness, 1))
    saturate(var(--pd-media-local-saturation, 1))
    contrast(var(--pd-media-local-contrast, 1))
    grayscale(var(--pd-media-local-gray, 0))
    blur(var(--pd-media-local-blur, 0px)) !important;
  max-width: var(--pd-media-local-max-width, initial) !important;
  max-height: var(--pd-media-local-max-height, initial) !important;
  transform-origin: center;
}

html[data-pd-responsive="compact"] .pd-dashboard,
html[data-pd-responsive="vertical"] .pd-dashboard {
  --pd-command-width: 700px;
}

html[data-pd-responsive="compact"] .pd-grid,
html[data-pd-responsive="vertical"] .pd-grid {
  grid-template-columns: 1fr;
}

html[data-pd-responsive="ultrawide"] .pd-dashboard,
html[data-pd-responsive="super_ultrawide"] .pd-dashboard {
  --pd-command-width: 1240px;
}

.pd-enabled button:focus-visible,
.pd-enabled input:focus-visible,
.pd-enabled textarea:focus-visible,
.pd-enabled select:focus-visible {
  outline: 2px solid var(--pd-accent);
  outline-offset: 2px;
}

@media (max-width: 760px) {
  #pd-center { padding: 8px; }
  .pd-filterbar { grid-template-columns: 1fr; }
  .pd-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .pd-grid { grid-template-columns: 1fr; }
  .pd-feature { grid-template-columns: 28px minmax(0, 1fr); }
  .pd-feature > :last-child { grid-column: 2; }
}
`;

class PowerDiscord {
  constructor(meta = {}) {
    this.meta = meta;
    this.started = false;
    this.startedAt = Date.now();
    this.moduleHealth = {};
    this.events = new EventManager();
    this.timers = new TimerManager();
    this.patches = new PatchManager();
    this.storage = new StorageManager(this);
    this.state = this.storage.state;
    this.styles = new StyleManager(this);
    this.responsive = new ResponsiveEngine(this);
    this.data = new DataManager(this);
    this.diagnostics = new DiagnosticsManager(this);
    this.context = new ContextTracker(this);
    this.behaviors = new BehaviorManager(this);
    this.features = new FeatureEngine(this);
    this.ui = new UiManager(this);
    this.pomodoro = {running: false, remainingMs: 25 * 60_000, endAt: null, interval: null};
    this.stopwatch = {running: false, elapsedMs: 0, startedAt: null, laps: [], interval: null};
  }

  start() {
    if (this.started) return;
    this.started = true;
    this.startedAt = Date.now();
    this.state = this.storage.load();

    this.safeExecute('StyleManager', () => this.styles.inject());
    this.safeExecute('ContextTracker', () => this.context.start());
    this.safeExecute('ResponsiveEngine', () => this.responsive.start());
    this.safeExecute('UiManager', () => this.ui.start());
    this.safeExecute('BehaviorManager', () => this.behaviors.start());
    this.safeExecute('FeatureEngine', () => this.features.applyAll());

    if (!this.state.firstRunComplete) {
      this.showFirstRun();
      this.state.firstRunComplete = true;
      this.storage.save();
    }

    this.toast('PowerDiscord запущен: 530 функций • Ctrl + Shift + P', 'success', 4400);
  }

  stop() {
    if (!this.started) return;
    this.started = false;
    this.pausePomodoro();
    this.pauseStopwatch();
    this.safeExecute('ContextTracker.stop', () => this.context.stop());
    this.safeExecute('BehaviorManager.stop', () => this.behaviors.stop());
    this.safeExecute('ResponsiveEngine.stop', () => this.responsive.stop());
    this.safeExecute('UiManager.stop', () => this.ui.stop());
    this.patches.clear();
    this.events.clear();
    this.timers.clear();
    this.styles.remove();
    this.features.clearRootState();
    document.getElementById('pd-night-overlay')?.remove();
    this.toast('PowerDiscord полностью выгружен.', 'info', 2600, true);
  }

  getSettingsPanel() {
    if (!this.started) {
      this.state = this.storage.load();
    }
    return this.ui.buildSettingsPanel();
  }

  isFeatureEnabled(key) {
    return this.features.isEnabled(key);
  }

  activeFeatureCount() {
    const alwaysAvailable = FEATURE_REGISTRY.filter(feature => !['toggle', 'behavior'].includes(feature.handler)).length;
    const enabledToggles = Object.values(this.state.toggles).filter(Boolean).length;
    return alwaysAvailable + enabledToggles;
  }

  safeExecute(module, callback) {
    try {
      const result = callback();
      this.moduleHealth[module] = 'Работает';
      return result;
    } catch (error) {
      this.recordError(module, error);
      return null;
    }
  }

  recordError(module, error) {
    const message = error instanceof Error ? error.message : String(error);
    this.moduleHealth[module] = 'Ошибка';
    if (this.state?.errors) {
      this.state.errors.push({module, message: message.slice(0, 800), at: Date.now()});
      this.state.errors = this.state.errors.slice(-50);
      try {
        this.storage.save();
      } catch {}
    }
    console.error('[' + PLUGIN_NAME + '][' + module + ']', error);
  }

  toast(message, type = 'info', timeout = 3200, force = false) {
    if (!force && this.state && !this.isFeatureEnabled('behavior_toast_notifications')) return;
    try {
      BdApi.UI.showToast(String(message), {type, timeout});
    } catch {
      console.info('[' + PLUGIN_NAME + '] ' + message);
    }
  }

  confirm(title, content, onConfirm) {
    try {
      BdApi.UI.showConfirmationModal(title, content, {
        confirmText: 'Продолжить',
        cancelText: 'Отмена',
        danger: true,
        onConfirm
      });
    } catch {
      if (window.confirm(title + '\n\n' + content)) onConfirm();
    }
  }

  async copyText(value) {
    const text = String(value ?? '');
    if (!text) {
      this.toast('Нет данных для копирования.', 'warning');
      return false;
    }

    let success = false;
    try {
      await navigator.clipboard.writeText(text);
      success = true;
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        success = document.execCommand('copy');
      } catch {}
      textarea.remove();
    }

    if (success) {
      this.state.copyHistory.unshift(
        '[' + new Date().toLocaleTimeString('ru-RU') + '] скопировано ' + [...text].length + ' символов'
      );
      this.state.copyHistory = this.state.copyHistory.slice(0, 50);
      this.storage.save();
      this.toast('Скопировано.', 'success');
    }
    return success;
  }

  formatDuration(milliseconds) {
    const seconds = Math.max(0, Math.floor(milliseconds / 1000));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const rest = seconds % 60;
    return [hours, minutes, rest].map(value => String(value).padStart(2, '0')).join(':');
  }

  showFirstRun() {
    try {
      BdApi.UI.showChangelogModal({
        title: 'Добро пожаловать в PowerDiscord',
        subtitle: 'Версия ' + VERSION,
        changes: [
          {
            title: '530 локальных функций',
            type: 'added',
            items: ['Поиск и избранное', '20 тем и 20 профилей', 'Текстовые и медиа-инструменты']
          },
          {
            title: 'Безопасность',
            type: 'improved',
            items: ['Без токенов и self-bot', 'Без обхода Nitro', 'Без хранения удалённых сообщений']
          },
          {
            title: 'Управление',
            type: 'added',
            items: ['Ctrl + Shift + P — центр', 'Ctrl + Shift + K — поиск', 'Alt + Shift + P — паник-приватность']
          }
        ]
      });
    } catch {
      this.ui.showResult('Добро пожаловать в PowerDiscord', 'Откройте центр сочетанием Ctrl + Shift + P.');
    }
  }

  startPomodoro() {
    if (this.pomodoro.running) return;
    if (this.pomodoro.remainingMs <= 0) this.pomodoro.remainingMs = 25 * 60_000;
    this.pomodoro.running = true;
    this.pomodoro.endAt = Date.now() + this.pomodoro.remainingMs;
    this.pomodoro.interval = this.timers.interval(() => {
      this.pomodoro.remainingMs = Math.max(0, this.pomodoro.endAt - Date.now());
      if (this.pomodoro.remainingMs <= 0) {
        this.pausePomodoro();
        this.toast('Pomodoro завершён — пора сделать перерыв.', 'success', 7000);
      }
      this.ui.refreshStatus();
    }, 500);
    this.toast('Pomodoro запущен на ' + Math.ceil(this.pomodoro.remainingMs / 60_000) + ' минут.', 'info');
  }

  pausePomodoro() {
    if (this.pomodoro.running && this.pomodoro.endAt) {
      this.pomodoro.remainingMs = Math.max(0, this.pomodoro.endAt - Date.now());
    }
    if (this.pomodoro.interval !== null) this.timers.clearInterval(this.pomodoro.interval);
    this.pomodoro.interval = null;
    this.pomodoro.running = false;
    this.pomodoro.endAt = null;
  }

  resetPomodoro() {
    this.pausePomodoro();
    this.pomodoro.remainingMs = 25 * 60_000;
    this.toast('Pomodoro сброшен.', 'info');
  }

  startStopwatch() {
    if (this.stopwatch.running) return;
    this.stopwatch.running = true;
    this.stopwatch.startedAt = Date.now() - this.stopwatch.elapsedMs;
    this.stopwatch.interval = this.timers.interval(() => {
      this.stopwatch.elapsedMs = Date.now() - this.stopwatch.startedAt;
      this.ui.refreshStatus();
    }, 250);
    this.toast('Секундомер запущен.', 'info');
  }

  pauseStopwatch() {
    if (this.stopwatch.running) this.stopwatch.elapsedMs = Date.now() - this.stopwatch.startedAt;
    if (this.stopwatch.interval !== null) this.timers.clearInterval(this.stopwatch.interval);
    this.stopwatch.interval = null;
    this.stopwatch.running = false;
  }

  resetStopwatch() {
    this.pauseStopwatch();
    this.stopwatch.elapsedMs = 0;
    this.stopwatch.laps = [];
    this.toast('Секундомер сброшен.', 'info');
  }

  startQuickTimer(minutes) {
    const safeMinutes = Math.max(1, Math.min(180, Number(minutes)));
    this.timers.timeout(() => {
      this.toast('Таймер на ' + safeMinutes + ' мин. завершён.', 'success', 7000);
    }, safeMinutes * 60_000);
    this.toast('Таймер запущен на ' + safeMinutes + ' мин.', 'info');
  }

  async runUtility(action) {
    const openMap = {
      open_center: ['features', false],
      open_feature_search: ['features', true],
      open_text_lab: ['text', false],
      open_notes: ['data', false],
      open_bookmarks: ['data', false],
      open_favorites: ['data', false],
      open_reminders: ['data', false],
      open_diagnostics: ['diagnostics', false],
      reminder_list: ['data', false]
    };
    if (openMap[action]) {
      this.ui.open(openMap[action][0], openMap[action][1]);
      return;
    }

    if (action.startsWith('timer_')) {
      this.startQuickTimer(Number(action.slice(6)));
      return;
    }

    const zones = {
      clock_moscow: ['Москва', 'Europe/Moscow'],
      clock_berlin: ['Берлин', 'Europe/Berlin'],
      clock_london: ['Лондон', 'Europe/London'],
      clock_new_york: ['Нью-Йорк', 'America/New_York'],
      clock_los_angeles: ['Лос-Анджелес', 'America/Los_Angeles'],
      clock_tokyo: ['Токио', 'Asia/Tokyo'],
      clock_dubai: ['Дубай', 'Asia/Dubai'],
      clock_sydney: ['Сидней', 'Australia/Sydney']
    };
    if (zones[action]) {
      const [name, timeZone] = zones[action];
      const value = new Intl.DateTimeFormat('ru-RU', {
        timeZone,
        dateStyle: 'full',
        timeStyle: 'medium'
      }).format(new Date());
      this.ui.showResult('Время: ' + name, value);
      return;
    }

    switch (action) {
      case 'pomodoro_start': this.startPomodoro(); break;
      case 'pomodoro_pause': this.pausePomodoro(); this.toast('Pomodoro приостановлен.', 'info'); break;
      case 'pomodoro_reset': this.resetPomodoro(); break;
      case 'stopwatch_start': this.startStopwatch(); break;
      case 'stopwatch_pause': this.pauseStopwatch(); this.toast('Секундомер: ' + this.formatDuration(this.stopwatch.elapsedMs), 'info'); break;
      case 'stopwatch_reset': this.resetStopwatch(); break;
      case 'stopwatch_lap': {
        const lap = this.formatDuration(this.stopwatch.elapsedMs);
        this.stopwatch.laps.push(lap);
        this.ui.showResult('Круг секундомера', 'Круг ' + this.stopwatch.laps.length + ': ' + lap);
        break;
      }
      case 'hex_to_rgb': {
        const raw = this.ui.promptText('HEX-цвет', '#76a985').trim();
        const match = raw.match(/^#?([0-9a-f]{6})$/i);
        if (!match) throw new Error('Введите HEX из шести символов');
        const number = Number.parseInt(match[1], 16);
        this.ui.showResult('HEX → RGB', 'rgb(' + ((number >> 16) & 255) + ', ' + ((number >> 8) & 255) + ', ' + (number & 255) + ')');
        break;
      }
      case 'rgb_to_hex': {
        const raw = this.ui.promptText('RGB через запятую', '118, 169, 133');
        const parts = raw.split(/[,\s]+/).filter(Boolean).map(Number);
        if (parts.length !== 3 || parts.some(value => !Number.isFinite(value) || value < 0 || value > 255)) {
          throw new Error('Нужны три числа от 0 до 255');
        }
        const hex = '#' + parts.map(value => Math.round(value).toString(16).padStart(2, '0')).join('');
        this.ui.showResult('RGB → HEX', hex.toUpperCase());
        break;
      }
      case 'bytes_format': {
        const bytes = Number(this.ui.promptText('Количество байтов', '1048576'));
        if (!Number.isFinite(bytes) || bytes < 0) throw new Error('Введите неотрицательное число');
        const units = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'];
        const index = bytes ? Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024))) : 0;
        this.ui.showResult('Размер', (bytes / Math.pow(1024, index)).toFixed(index ? 2 : 0) + ' ' + units[index]);
        break;
      }
      case 'snowflake_to_date': {
        const id = this.ui.promptText('Discord Snowflake', '');
        const date = this.context.snowflakeDate(id);
        if (!date) throw new Error('Некорректный Snowflake');
        this.ui.showResult('Дата Snowflake', date.toLocaleString('ru-RU'));
        break;
      }
      case 'date_to_timestamp': {
        const value = this.ui.promptText('Дата, например 2026-08-15 21:30', '');
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) throw new Error('Дата не распознана');
        this.ui.showResult('Unix timestamp', String(Math.floor(date.getTime() / 1000)));
        break;
      }
      case 'minutes_to_clock': {
        const minutes = Number(this.ui.promptText('Количество минут', '90'));
        if (!Number.isFinite(minutes)) throw new Error('Введите число');
        this.ui.showResult('Формат времени', Math.floor(minutes / 60) + ':' + String(Math.floor(minutes % 60)).padStart(2, '0'));
        break;
      }
      case 'json_validate': {
        const value = this.ui.promptText('JSON для проверки', '{}');
        JSON.parse(value);
        this.ui.showResult('Проверка JSON', 'JSON корректен.');
        break;
      }
      case 'url_inspect': {
        const raw = this.ui.promptText('URL', 'https://discord.com/');
        const url = new URL(raw);
        this.ui.showResult('Разбор URL', JSON.stringify({
          protocol: url.protocol,
          hostname: url.hostname,
          port: url.port || 'по умолчанию',
          pathname: url.pathname,
          search: url.search,
          hash: url.hash
        }, null, 2));
        break;
      }
      case 'uuid': {
        const value = crypto.randomUUID();
        await this.copyText(value);
        this.ui.showResult('UUID', value);
        break;
      }
      case 'password': {
        const length = Math.max(8, Math.min(128, Number(this.ui.promptText('Длина пароля', '24')) || 24));
        const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*_-+=';
        const random = new Uint32Array(length);
        crypto.getRandomValues(random);
        const value = [...random].map(number => alphabet[number % alphabet.length]).join('');
        await this.copyText(value);
        this.ui.showResult('Локально созданный пароль', value + '\n\nНе отправляйте его посторонним.');
        break;
      }
      case 'screen_info': this.ui.showResult('Экран и окно', JSON.stringify(this.responsive.info(), null, 2)); break;
      case 'session_copy': await this.copyText(this.formatDuration(Date.now() - this.startedAt)); break;
      case 'session_reset': this.startedAt = Date.now(); this.toast('Время сессии сброшено.', 'info'); break;
      case 'copy_history_open': this.ui.showResult('История действий копирования', this.state.copyHistory.join('\n') || 'История пуста. Содержимое буфера не хранится.'); break;
      case 'copy_history_clear': this.data.clear('copyHistory'); this.toast('История действий копирования очищена.', 'success'); break;
      case 'reminder_add': {
        const text = this.ui.promptText('Текст напоминания', '');
        const minutes = Number(this.ui.promptText('Через сколько минут?', '10'));
        if (this.data.addReminder(text, Number.isFinite(minutes) ? Math.max(0, minutes) : 0)) this.toast('Напоминание добавлено.', 'success');
        break;
      }
      case 'reminder_clear': this.data.clear('reminders'); this.ui.refreshDataView(); break;
      case 'quick_note_add': {
        const text = this.ui.promptText('Быстрая заметка', '');
        if (this.data.addNote(text, 'Быстрая заметка')) this.toast('Заметка сохранена.', 'success');
        break;
      }
      case 'quick_note_copy': {
        const note = this.state.notes[0];
        if (!note) throw new Error('Заметок пока нет');
        await this.copyText(note.text);
        break;
      }
      case 'quick_note_clear': this.data.clear('notes'); this.ui.refreshDataView(); break;
      default: throw new Error('Неизвестный utility action: ' + action);
    }
  }

  downloadJson(filename, object) {
    const blob = new Blob([JSON.stringify(object, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    this.timers.timeout(() => URL.revokeObjectURL(url), 1500);
  }

  importBackupFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const parsed = JSON.parse(await file.text());
        if (!parsed || typeof parsed !== 'object' || !parsed.state) throw new Error('Схема резервной копии не распознана');
        const normalized = this.storage.normalize(parsed.state);
        this.confirm(
          'Импортировать резервную копию?',
          'Версия файла: ' + (parsed.version || 'не указана') + '. Текущие настройки будут заменены.',
          () => {
            this.storage.state = normalized;
            this.state = normalized;
            this.features.applyAll();
            this.storage.save();
            this.ui.refreshFeatureBrowser();
            this.ui.refreshDataView();
            this.toast('Резервная копия импортирована.', 'success');
          }
        );
      } catch (error) {
        this.recordError('BackupManager.import', error);
        this.toast('Импорт не выполнен: ' + error.message, 'error');
      }
    }, {once: true});
    input.click();
  }

  async runSystem(action) {
    switch (action) {
      case 'export_backup':
        this.downloadJson('powerdiscord-backup.json', {
          plugin: PLUGIN_NAME,
          version: VERSION,
          exportedAt: new Date().toISOString(),
          featureCount: FEATURE_REGISTRY.length,
          state: this.state
        });
        this.toast('Резервная копия сохранена.', 'success');
        break;
      case 'import_backup': this.importBackupFromFile(); break;
      case 'reset_all':
        this.confirm('Сбросить весь PowerDiscord?', 'Будут удалены настройки, заметки, закладки, избранное и профили.', () => {
          this.state = this.storage.reset();
          this.features.applyAll();
          this.ui.refreshFeatureBrowser();
          this.ui.refreshDataView();
          this.toast('PowerDiscord сброшен.', 'success');
        });
        break;
      case 'reset_visual': this.features.applyPreset('reset_visual'); break;
      case 'clear_notes': this.data.clear('notes'); this.ui.refreshDataView(); break;
      case 'clear_bookmarks': this.data.clear('bookmarks'); this.ui.refreshDataView(); break;
      case 'clear_favorites': this.data.clear('favoriteItems'); this.ui.refreshDataView(); break;
      case 'clear_reminders': this.data.clear('reminders'); this.ui.refreshDataView(); break;
      case 'storage_usage': this.ui.showResult('Локальные данные', this.storage.approximateBytes().toLocaleString('ru-RU') + ' байт'); break;
      case 'run_diagnostics': this.ui.open('diagnostics'); this.ui.refreshDiagnostics(); break;
      case 'copy_diagnostics': await this.copyText(this.diagnostics.textReport()); break;
      case 'safe_mode': this.features.applyPreset('safe'); break;
      case 'master_off':
        this.state.masterEnabled = false;
        this.features.applyAll();
        this.storage.save();
        this.toast('Все функции временно выключены. Кнопка запуска оставлена.', 'info');
        break;
      case 'enable_defaults': {
        const defaults = createDefaultState();
        this.state.masterEnabled = true;
        this.state.safeMode = false;
        this.state.toggles = defaults.toggles;
        this.state.ranges = defaults.ranges;
        this.state.theme = defaults.theme;
        this.features.applyAll();
        this.storage.save();
        this.ui.refreshFeatureBrowser();
        break;
      }
      case 'clear_errors': this.data.clear('errors'); this.ui.refreshDiagnostics(); break;
      case 'responsive_recalc': this.responsive.recalculate(); break;
      case 'responsive_auto': this.responsive.setOverride('auto'); break;
      case 'responsive_compact': this.responsive.setOverride('compact'); break;
      case 'responsive_normal': this.responsive.setOverride('normal'); break;
      case 'responsive_large': this.responsive.setOverride('large'); break;
      case 'responsive_ultrawide': this.responsive.setOverride('ultrawide'); break;
      case 'responsive_vertical': this.responsive.setOverride('vertical'); break;
      case 'save_profile_1':
      case 'save_profile_2':
      case 'save_profile_3': {
        const slot = action.slice(-1);
        this.state.profiles[slot] = {
          theme: this.state.theme,
          toggles: {...this.state.toggles},
          ranges: {...this.state.ranges}
        };
        this.storage.save();
        this.toast('Профиль ' + slot + ' сохранён.', 'success');
        break;
      }
      case 'restore_profile_1':
      case 'restore_profile_2':
      case 'restore_profile_3': {
        const slot = action.slice(-1);
        const profile = this.state.profiles[slot];
        if (!profile) throw new Error('Профиль ' + slot + ' ещё не сохранён');
        this.state.theme = profile.theme;
        this.state.toggles = {...createDefaultState().toggles, ...profile.toggles};
        this.state.ranges = {...createDefaultState().ranges, ...profile.ranges};
        this.features.applyAll();
        this.storage.save();
        this.ui.refreshFeatureBrowser();
        this.toast('Профиль ' + slot + ' применён.', 'success');
        break;
      }
      case 'clear_profiles': this.state.profiles = {}; this.storage.save(); this.toast('Профили очищены.', 'success'); break;
      case 'copy_feature_report': {
        const active = this.activeFeatureCount();
        await this.copyText([
          'PowerDiscord ' + VERSION,
          'Всего функций: ' + FEATURE_REGISTRY.length,
          'Активно: ' + active,
          'Отключено: ' + (FEATURE_REGISTRY.length - active),
          'Категорий: ' + Object.keys(CATEGORY_LABELS).length,
          'Responsive: ' + this.responsive.mode
        ].join('\n'));
        break;
      }
      default: throw new Error('Неизвестный system action: ' + action);
    }
  }
}

PowerDiscord.FEATURE_REGISTRY = FEATURE_REGISTRY;
PowerDiscord.CATEGORY_LABELS = CATEGORY_LABELS;
PowerDiscord.HANDLER_TYPES = HANDLER_TYPES;
PowerDiscord.transformText = transformText;
PowerDiscord.LOCALES = LOCALES;
PowerDiscord.CATALOGS = Object.freeze({
  text: TEXT_ACTIONS.map(item => item[0]),
  messages: MESSAGE_ACTIONS.map(item => item[0]),
  media: MEDIA_ACTIONS.map(item => item[0]),
  utility: UTILITY_ACTIONS.map(item => item[0]),
  system: SYSTEM_ACTIONS.map(item => item[0]),
  behaviors: BEHAVIOR_FEATURES.map(item => item[0]),
  presets: PRESETS.map(item => item[0]),
  themes: THEMES.map(item => item[0])
});

module.exports = PowerDiscord;
