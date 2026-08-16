/**
 * @name PowerDiscord
 * @author roman161rusrosrov-cmyk
 * @version 3.0.0
 * @description Производительный фиолетовый набор из 100 безопасных локальных улучшений Discord.
 */

'use strict';

const PLUGIN_NAME = 'PowerDiscord';
const VERSION = '3.0.0';
const STYLE_ID = 'powerdiscord-v2-style';
const STORAGE_KEY = 'state-v2';
const ROOT_CLASS = 'pd2-running';

const UI_TEXT = Object.freeze({
  ru: Object.freeze({
    title: 'PowerDiscord', subtitle: '100 безопасных локальных функций', search: 'Поиск по функциям…',
    all: 'Все категории', favorites: 'Только избранное', effectsOn: 'Эффекты: включены', effectsOff: 'Эффекты: выключены',
    total: 'Всего', active: 'Активно', category: 'Категория', run: 'Запустить', apply: 'Применить', select: 'Выбрать', selected: 'Выбрано',
    input: 'Исходный текст', output: 'Результат', copy: 'Копировать', clear: 'Очистить', close: 'Закрыть',
    textLab: 'Текстовая лаборатория', localData: 'Локальные данные', notes: 'Заметки', bookmarks: 'Закладки',
    reset: 'Сбросить настройки', language: 'EN', safeTitle: 'Безопасный режим работы',
    safeBody: 'Плагин работает только с уже видимыми элементами. Он не раскрывает закрытые каналы, не хранит чужие сообщения и не обходит права Discord.',
    empty: 'Ничего не найдено.', on: 'Вкл.', off: 'Выкл.', value: 'Значение', mode: 'Режим окна',
    quickModes: 'Быстрые режимы', performance: '⚡ Лёгкий', comfort: '◆ Комфорт', privacyPreset: '◉ Приватность',
    randomTheme: '🎲 Случайная тема', restoreHidden: 'Вернуть скрытые сообщения', loadMore: 'Показать ещё', custom: 'Свой',
    viewBookmarks: 'Открыть закладки', viewNotes: 'Открыть заметки'
  }),
  en: Object.freeze({
    title: 'PowerDiscord', subtitle: '100 safe local features', search: 'Search features…',
    all: 'All categories', favorites: 'Favorites only', effectsOn: 'Effects: enabled', effectsOff: 'Effects: disabled',
    total: 'Total', active: 'Active', category: 'Category', run: 'Run', apply: 'Apply', select: 'Select', selected: 'Selected',
    input: 'Source text', output: 'Result', copy: 'Copy', clear: 'Clear', close: 'Close',
    textLab: 'Text laboratory', localData: 'Local data', notes: 'Notes', bookmarks: 'Bookmarks',
    reset: 'Reset settings', language: 'RU', safeTitle: 'Safe operating mode',
    safeBody: 'The plugin only works with elements already visible to you. It does not reveal hidden channels, retain other users’ messages, or bypass Discord permissions.',
    empty: 'Nothing found.', on: 'On', off: 'Off', value: 'Value', mode: 'Window mode',
    quickModes: 'Quick modes', performance: '⚡ Lightweight', comfort: '◆ Comfort', privacyPreset: '◉ Privacy',
    randomTheme: '🎲 Random theme', restoreHidden: 'Restore hidden messages', loadMore: 'Load more', custom: 'Custom',
    viewBookmarks: 'View bookmarks', viewNotes: 'View notes'
  })
});

const CATEGORY_LABELS = Object.freeze({
  appearance: {ru: 'Внешний вид', en: 'Appearance'},
  layout: {ru: 'Компоновка', en: 'Layout'},
  privacy: {ru: 'Приватность', en: 'Privacy'},
  accessibility: {ru: 'Доступность', en: 'Accessibility'},
  themes: {ru: 'Темы', en: 'Themes'},
  text: {ru: 'Текст', en: 'Text'},
  messages: {ru: 'Сообщения', en: 'Messages'},
  navigation: {ru: 'Навигация', en: 'Navigation'},
  media: {ru: 'Медиа', en: 'Media'},
  system: {ru: 'Система', en: 'System'},
  behavior: {ru: 'Автоматизация', en: 'Automation'}
});

const VISUAL_FEATURES = [
  ['compact_messages', 'Компактные сообщения', 'Compact messages', '[class*="messageListItem_"]', 'padding-block: 1px !important;', 'layout'],
  ['hide_message_avatars', 'Скрывать аватары сообщений', 'Hide message avatars', '[class*="message_"] [class*="avatar_"]', 'display: none !important;', 'appearance'],
  ['hide_message_timestamps', 'Скрывать время сообщений', 'Hide message timestamps', '[class*="message_"] [class*="timestamp_"]', 'display: none !important;', 'appearance'],
  ['hide_message_reactions', 'Скрывать реакции', 'Hide reactions', '[class*="message_"] [class*="reactions_"]', 'display: none !important;', 'appearance'],
  ['hide_message_embeds', 'Скрывать карточки ссылок', 'Hide link embeds', '[class*="message_"] [class*="embed_"]', 'display: none !important;', 'appearance'],
  ['hide_message_attachments', 'Скрывать вложения', 'Hide attachments', '[class*="message_"] [class*="attachment_"]', 'display: none !important;', 'appearance'],
  ['hide_server_rail', 'Скрывать панель серверов', 'Hide server rail', '[class*="guilds_"]', 'display: none !important;', 'layout'],
  ['hide_channel_sidebar', 'Скрывать панель каналов', 'Hide channel sidebar', '[class*="sidebarList_"]', 'display: none !important;', 'layout'],
  ['hide_member_list', 'Скрывать список участников', 'Hide member list', '[class*="membersWrap_"]', 'display: none !important;', 'layout'],
  ['hide_user_panel', 'Скрывать панель аккаунта', 'Hide account panel', '[class*="panels_"]', 'display: none !important;', 'layout'],
  ['privacy_avatars', 'Размывать аватары', 'Blur avatars', '[class*="avatar_"] img, img[class*="avatar_"]', 'filter: blur(var(--pd2-privacy-blur)) !important; transition: filter .16s ease !important;', 'privacy'],
  ['privacy_usernames', 'Размывать имена', 'Blur usernames', '[class*="username_"], [class*="nameTag_"]', 'filter: blur(var(--pd2-privacy-blur)) !important; transition: filter .16s ease !important;', 'privacy'],
  ['privacy_server_icons', 'Размывать значки серверов', 'Blur server icons', '[class*="guilds_"] [class*="icon_"]', 'filter: blur(var(--pd2-privacy-blur)) !important; transition: filter .16s ease !important;', 'privacy'],
  ['privacy_media', 'Размывать изображения и видео', 'Blur images and videos', '[class*="message_"] img, [class*="message_"] video', 'filter: blur(var(--pd2-privacy-blur)) !important; transition: filter .16s ease !important;', 'privacy'],
  ['privacy_profile_banners', 'Размывать баннеры профилей', 'Blur profile banners', '[class*="banner_"]', 'filter: blur(var(--pd2-privacy-blur)) !important; transition: filter .16s ease !important;', 'privacy'],
  ['grayscale_media', 'Чёрно-белые медиа', 'Grayscale media', '[class*="message_"] img, [class*="message_"] video', 'filter: grayscale(1) brightness(calc(var(--pd2-media-brightness) / 100)) saturate(calc(var(--pd2-media-saturation) / 100)) !important;', 'media'],
  ['dim_media', 'Приглушать медиа', 'Dim media', '[class*="message_"] img, [class*="message_"] video', 'opacity: .58 !important; transition: opacity .16s ease !important;', 'media'],
  ['rounded_media', 'Скруглять медиа', 'Round media corners', '[class*="message_"] img, [class*="message_"] video, [class*="embed_"]', 'border-radius: var(--pd2-radius) !important;', 'media', true],
  ['message_bubbles', 'Фиолетовые карточки сообщений', 'Violet message cards', '[class*="messageListItem_"]', 'background: color-mix(in srgb, var(--pd2-accent) 8%, transparent) !important; border-radius: var(--pd2-radius) !important; margin-inline: 6px !important;', 'appearance'],
  ['accent_mentions', 'Выделять упоминания фиолетовым', 'Violet mention highlights', '[class*="mentioned_"]', 'background: color-mix(in srgb, var(--pd2-accent) 18%, transparent) !important; border-left: 3px solid var(--pd2-accent) !important;', 'appearance', true],
  ['accent_unread', 'Фиолетовые индикаторы непрочитанного', 'Violet unread markers', '[class*="unread_"]', 'background: var(--pd2-accent) !important; box-shadow: 0 0 12px var(--pd2-glow) !important;', 'appearance', true],
  ['accent_selected_channel', 'Фиолетовый выбранный канал', 'Violet selected channel', '[class*="modeSelected_"] [class*="link_"]', 'background: color-mix(in srgb, var(--pd2-accent) 24%, transparent) !important; color: var(--pd2-text) !important;', 'navigation', true],
  ['larger_emoji', 'Увеличивать большие эмодзи', 'Larger jumbo emoji', '[class*="emojiContainer_"] [class*="jumboable"]', 'width: 3.6rem !important; height: 3.6rem !important;', 'accessibility'],
  ['larger_reactions', 'Увеличивать реакции', 'Larger reactions', '[class*="reaction_"]', 'min-height: 30px !important; padding-inline: 8px !important;', 'accessibility'],
  ['violet_code_blocks', 'Фиолетовые блоки кода', 'Violet code blocks', '[class*="message_"] pre', 'border: 1px solid color-mix(in srgb, var(--pd2-accent) 42%, transparent) !important; background: var(--pd2-surface) !important; border-radius: var(--pd2-radius) !important;', 'appearance', true],
  ['compact_channels', 'Компактный список каналов', 'Compact channel list', '[class*="containerDefault_"] [class*="link_"]', 'min-height: 28px !important; padding-block: 1px !important;', 'layout'],
  ['compact_members', 'Компактный список участников', 'Compact member list', '[class*="member_"]', 'height: 36px !important; min-height: 36px !important;', 'layout'],
  ['compact_servers', 'Компактная панель серверов', 'Compact server rail', '[class*="guilds_"] [class*="listItem_"]', 'margin-bottom: 2px !important;', 'layout'],
  ['hide_gift_button', 'Скрывать кнопку подарка', 'Hide gift button', 'button[aria-label*="Подар" i], button[aria-label*="Gift" i]', 'display: none !important;', 'appearance'],
  ['hide_sticker_button', 'Скрывать кнопку стикеров', 'Hide sticker button', 'button[aria-label*="Стикер" i], button[aria-label*="Sticker" i]', 'display: none !important;', 'appearance'],
  ['hide_gif_button', 'Скрывать кнопку GIF', 'Hide GIF button', 'button[aria-label*="GIF" i]', 'display: none !important;', 'appearance'],
  ['hide_help_button', 'Скрывать кнопку помощи', 'Hide help button', 'a[aria-label*="Помощь" i], a[aria-label*="Help" i]', 'display: none !important;', 'appearance'],
  ['hide_inbox_button', 'Скрывать кнопку входящих', 'Hide inbox button', 'button[aria-label*="Входящие" i], button[aria-label*="Inbox" i]', 'display: none !important;', 'appearance'],
  ['hide_search_bar', 'Скрывать строку поиска Discord', 'Hide Discord search bar', '[class*="toolbar_"] [class*="search_"]', 'display: none !important;', 'appearance'],
  ['hide_activity_panel', 'Скрывать панель активностей', 'Hide activity panel', '[class*="nowPlayingColumn_"]', 'display: none !important;', 'layout'],
  ['reduce_animations', 'Уменьшать анимации', 'Reduce animations', '*', 'animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .08s !important;', 'accessibility'],
  ['high_contrast', 'Повышенный контраст текста', 'High text contrast', '[class*="messageContent_"], [class*="name_"]', 'color: var(--pd2-text) !important; text-shadow: 0 1px 1px rgb(0 0 0 / .45) !important;', 'accessibility'],
  ['comfortable_spacing', 'Комфортные интервалы', 'Comfortable spacing', '[class*="messageListItem_"]', 'margin-block: 5px !important;', 'layout'],
  ['dense_spacing', 'Плотные интервалы', 'Dense spacing', '[class*="messageListItem_"]', 'margin-block: 0 !important;', 'layout'],
  ['focus_mode', 'Режим полного фокуса', 'Full focus mode', '[class*="guilds_"], [class*="sidebarList_"], [class*="membersWrap_"], [class*="nowPlayingColumn_"]', 'display: none !important;', 'layout']
];

const RANGE_FEATURES = [
  ['message_font_size', 'Размер текста сообщений', 'Message font size', '--pd2-message-font', 80, 140, 100, 1, '%', 'accessibility'],
  ['corner_radius', 'Скругление интерфейса', 'Interface corner radius', '--pd2-radius', 0, 28, 12, 1, 'px', 'appearance'],
  ['privacy_blur_strength', 'Сила приватного размытия', 'Privacy blur strength', '--pd2-privacy-blur', 2, 24, 8, 1, 'px', 'privacy'],
  ['media_brightness', 'Яркость медиа', 'Media brightness', '--pd2-media-brightness', 50, 150, 100, 1, '', 'media'],
  ['media_saturation', 'Насыщенность медиа', 'Media saturation', '--pd2-media-saturation', 0, 200, 100, 1, '', 'media'],
  ['message_gap', 'Интервал сообщений', 'Message spacing', '--pd2-message-gap', 0, 20, 4, 1, 'px', 'layout'],
  ['channel_width', 'Ширина панели каналов', 'Channel panel width', '--pd2-channel-width', 180, 420, 240, 5, 'px', 'layout'],
  ['member_width', 'Ширина списка участников', 'Member list width', '--pd2-member-width', 180, 420, 240, 5, 'px', 'layout'],
  ['server_icon_size', 'Размер значков серверов', 'Server icon size', '--pd2-server-size', 36, 72, 48, 1, 'px', 'layout'],
  ['panel_opacity', 'Прозрачность центра', 'Control center opacity', '--pd2-panel-opacity', 55, 100, 96, 1, '', 'appearance']
];

const THEME_FEATURES = [
  ['deep_violet', 'Глубокий фиолетовый', 'Deep Violet', ['#0c0714', '#130b20', '#1c102d', '#a855f7', '#eadcff', '#ad9cbc']],
  ['lavender_night', 'Лавандовая ночь', 'Lavender Night', ['#100d19', '#181326', '#231b36', '#b79aff', '#f0eaff', '#b9adc9']],
  ['amethyst', 'Аметист', 'Amethyst', ['#110914', '#1d0e24', '#2a1434', '#c15cff', '#f6e3ff', '#c6a7d0']],
  ['indigo_violet', 'Индиго', 'Indigo Violet', ['#090a18', '#10132a', '#191e3b', '#8b7cff', '#e5e7ff', '#a8afd0']],
  ['plum', 'Тёмная слива', 'Dark Plum', ['#140912', '#21101d', '#311628', '#d267b7', '#ffe5f7', '#c7a5bc']],
  ['cyber_purple', 'Кибер-фиолетовый', 'Cyber Purple', ['#080713', '#0d1022', '#151a30', '#9d6cff', '#e6e9ff', '#9ca6c7']],
  ['dark_orchid', 'Тёмная орхидея', 'Dark Orchid', ['#100910', '#1b0e1b', '#291429', '#be6ce8', '#f4e2fa', '#bba2c2']],
  ['soft_violet', 'Мягкий фиолетовый', 'Soft Violet', ['#15111c', '#1e1828', '#2a2237', '#aa8bd8', '#efe9f7', '#b8afc4']],
  ['black_violet', 'Чёрно-фиолетовый', 'Black Violet', ['#050407', '#0b0810', '#120d19', '#884dcc', '#eee6f8', '#9f96aa']],
  ['light_lilac', 'Светлая сирень', 'Light Lilac', ['#ebe5f2', '#f3eef8', '#ffffff', '#7c3aed', '#241b2d', '#655b70']]
];

const TEXT_FEATURES = [
  ['uppercase', 'ВЕРХНИЙ РЕГИСТР', 'UPPERCASE'],
  ['lowercase', 'нижний регистр', 'lowercase'],
  ['title_case', 'Каждое Слово С Заглавной', 'Title Case'],
  ['sentence_case', 'Регистр предложений', 'Sentence case'],
  ['trim', 'Убрать пробелы по краям', 'Trim edges'],
  ['collapse_spaces', 'Схлопнуть пробелы', 'Collapse spaces'],
  ['sort_lines', 'Сортировать строки', 'Sort lines'],
  ['unique_lines', 'Удалить повторные строки', 'Remove duplicate lines'],
  ['quote', 'Оформить цитатой', 'Format as quote'],
  ['spoiler', 'Обернуть в спойлер', 'Wrap as spoiler'],
  ['code_block', 'Оформить блоком кода', 'Format as code block'],
  ['json_pretty', 'Форматировать JSON', 'Format JSON'],
  ['url_encode', 'URL-кодирование', 'URL encode'],
  ['base64_encode', 'Кодировать Base64', 'Base64 encode'],
  ['transliterate_ru', 'Транслитерация RU → LAT', 'Transliterate RU → LAT']
];

const ACTION_FEATURES = [
  ['copy_message_text', 'Копировать видимое сообщение', 'Copy visible message', 'messages', 'message'],
  ['copy_clean_message', 'Копировать сообщение без лишних пробелов', 'Copy cleaned message', 'messages', 'message'],
  ['copy_message_id', 'Копировать ID видимого сообщения', 'Copy visible message ID', 'messages', 'message'],
  ['copy_message_link', 'Копировать ссылку на сообщение', 'Copy message link', 'messages', 'message'],
  ['copy_message_quote', 'Копировать сообщение как цитату', 'Copy message as quote', 'messages', 'message'],
  ['message_statistics', 'Статистика видимого сообщения', 'Visible message statistics', 'messages', 'message'],
  ['bookmark_message_location', 'Закладка на позицию сообщения', 'Bookmark message location', 'messages', 'message'],
  ['note_for_message', 'Своя заметка к позиции сообщения', 'Personal note for message location', 'messages', 'message'],
  ['highlight_message', 'Подсветить сообщение локально', 'Highlight message locally', 'messages', 'message'],
  ['hide_message_local', 'Скрыть сообщение до перезапуска', 'Hide message until restart', 'messages', 'message'],
  ['list_visible_channels', 'Список доступных каналов на экране', 'List visible channels', 'navigation', 'channel'],
  ['search_visible_channels', 'Найти канал среди видимых', 'Search visible channels', 'navigation', 'channel'],
  ['copy_current_channel_id', 'Копировать ID текущего канала', 'Copy current channel ID', 'navigation', 'channel'],
  ['copy_current_guild_id', 'Копировать ID текущего сервера', 'Copy current server ID', 'navigation', 'channel'],
  ['copy_media_url', 'Копировать URL видимого медиа', 'Copy visible media URL', 'media', 'media'],
  ['zoom_media', 'Увеличить видимое медиа', 'Zoom visible media', 'media', 'media'],
  ['reset_media', 'Сбросить локальное медиа', 'Reset local media', 'media', 'media'],
  ['export_backup', 'Экспорт настроек JSON', 'Export settings JSON', 'system', 'system'],
  ['import_backup', 'Импорт настроек JSON', 'Import settings JSON', 'system', 'system'],
  ['show_diagnostics', 'Показать диагностику', 'Show diagnostics', 'system', 'system']
];

const BEHAVIOR_FEATURES = [
  ['floating_launcher', 'Плавающая кнопка центра', 'Floating control button', true],
  ['privacy_on_blur', 'Приватность при потере фокуса', 'Privacy when window loses focus', false],
  ['code_copy_buttons', 'Кнопки копирования кода', 'Code copy buttons', true],
  ['composer_counter', 'Счётчик символов сообщения', 'Message character counter', true],
  ['responsive_engine', 'Автоадаптация под окно', 'Responsive window engine', true]
];

const FEATURE_REGISTRY = [];
let featureId = 1;

function addFeature(feature) {
  FEATURE_REGISTRY.push(Object.freeze({id: featureId++, ...feature}));
}

for (const [key, ru, en, selector, declaration, category, defaultEnabled = false] of VISUAL_FEATURES) {
  addFeature({key, name: {ru, en}, category, type: 'toggle', defaultEnabled, config: {selector, declaration}});
}
for (const [key, ru, en, variable, min, max, defaultValue, step, unit, category] of RANGE_FEATURES) {
  addFeature({key, name: {ru, en}, category, type: 'range', defaultEnabled: true, config: {variable, min, max, defaultValue, step, unit}});
}
for (const [key, ru, en, palette] of THEME_FEATURES) {
  addFeature({key: `theme_${key}`, name: {ru, en}, category: 'themes', type: 'theme', defaultEnabled: key === 'deep_violet', config: {theme: key, palette}});
}
for (const [action, ru, en] of TEXT_FEATURES) {
  addFeature({key: `text_${action}`, name: {ru, en}, category: 'text', type: 'text', defaultEnabled: false, config: {action}});
}
for (const [action, ru, en, category, scope] of ACTION_FEATURES) {
  addFeature({key: `action_${action}`, name: {ru, en}, category, type: 'action', defaultEnabled: false, config: {action, scope}});
}
for (const [behavior, ru, en, defaultEnabled] of BEHAVIOR_FEATURES) {
  addFeature({key: `behavior_${behavior}`, name: {ru, en}, category: 'behavior', type: 'behavior', defaultEnabled, config: {behavior}});
}

if (FEATURE_REGISTRY.length !== 100) throw new Error(`PowerDiscord: ожидалось 100 функций, получено ${FEATURE_REGISTRY.length}`);
Object.freeze(FEATURE_REGISTRY);

const THEME_MAP = Object.freeze(Object.fromEntries(THEME_FEATURES.map(([key, , , palette]) => [key, palette])));
const FEATURE_MAP = new Map(FEATURE_REGISTRY.map(feature => [feature.key, feature]));

function scopedSelectors(root, selectors) {
  return selectors.split(',').map(selector => `${root} ${selector.trim()}`).join(',\n');
}

function buildFeatureCss() {
  return VISUAL_FEATURES.map(([key, , , selectors, declaration]) =>
    `${scopedSelectors(`html.pd2-feature-${key}`, selectors)} {${declaration}}`
  ).join('\n');
}

function makeElement(tag, className = '', text = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function toBase64(value) {
  const bytes = new TextEncoder().encode(String(value));
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function transliterateRussian(value) {
  const map = {а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'kh',ц:'ts',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya'};
  return [...String(value)].map(character => {
    const lower = character.toLocaleLowerCase('ru-RU');
    const result = map[lower];
    if (result === undefined) return character;
    return character === lower ? result : result.charAt(0).toUpperCase() + result.slice(1);
  }).join('');
}

function transformText(action, input) {
  const value = String(input ?? '');
  const lines = () => value.split(/\r?\n/);
  switch (action) {
    case 'uppercase': return value.toLocaleUpperCase('ru-RU');
    case 'lowercase': return value.toLocaleLowerCase('ru-RU');
    case 'title_case': return value.toLocaleLowerCase('ru-RU').replace(/(^|\s)([\p{L}])/gu, (_, space, letter) => space + letter.toLocaleUpperCase('ru-RU'));
    case 'sentence_case': return value.toLocaleLowerCase('ru-RU').replace(/(^|[.!?]\s+)([\p{L}])/gu, (_, start, letter) => start + letter.toLocaleUpperCase('ru-RU'));
    case 'trim': return value.trim();
    case 'collapse_spaces': return value.replace(/[^\S\r\n]+/g, ' ').trim();
    case 'sort_lines': return lines().sort((a, b) => a.localeCompare(b, 'ru')).join('\n');
    case 'unique_lines': return [...new Set(lines())].join('\n');
    case 'quote': return lines().map(line => `> ${line}`).join('\n');
    case 'spoiler': return `||${value}||`;
    case 'code_block': return `\x60\x60\x60\n${value.replace(/\x60{3}/g, '\\`\x60\x60')}\n\x60\x60\x60`;
    case 'json_pretty': return JSON.stringify(JSON.parse(value), null, 2);
    case 'url_encode': return encodeURIComponent(value);
    case 'base64_encode': return toBase64(value);
    case 'transliterate_ru': return transliterateRussian(value);
    default: throw new Error(`Неизвестное текстовое действие: ${action}`);
  }
}

const BASE_CSS = String.raw`
:root {
  --pd2-bg: #0c0714;
  --pd2-bg-secondary: #130b20;
  --pd2-surface: #1c102d;
  --pd2-accent: #a855f7;
  --pd2-text: #eadcff;
  --pd2-muted: #ad9cbc;
  --pd2-glow: rgb(168 85 247 / .42);
  --pd2-message-font: 100%;
  --pd2-radius: 12px;
  --pd2-privacy-blur: 8px;
  --pd2-media-brightness: 100;
  --pd2-media-saturation: 100;
  --pd2-message-gap: 4px;
  --pd2-channel-width: 240px;
  --pd2-member-width: 240px;
  --pd2-server-size: 48px;
  --pd2-panel-opacity: 96;
}
html.pd2-running #app-mount {
  --background-primary: var(--pd2-bg) !important;
  --background-secondary: var(--pd2-bg-secondary) !important;
  --background-secondary-alt: var(--pd2-surface) !important;
  --background-tertiary: color-mix(in srgb, var(--pd2-bg) 84%, black) !important;
  --background-accent: var(--pd2-accent) !important;
  --text-normal: var(--pd2-text) !important;
  --text-muted: var(--pd2-muted) !important;
  --brand-experiment: var(--pd2-accent) !important;
  --brand-500: var(--pd2-accent) !important;
}
html.pd2-running [class*="messageContent_"] {font-size: var(--pd2-message-font) !important;}
html.pd2-running [class*="messageListItem_"] {margin-block: var(--pd2-message-gap);}
html.pd2-running [class*="sidebarList_"] {width: var(--pd2-channel-width) !important;}
html.pd2-running [class*="membersWrap_"], html.pd2-running [class*="members_"] {width: var(--pd2-member-width) !important; min-width: var(--pd2-member-width) !important;}
html.pd2-running [class*="guilds_"] [class*="listItem_"] {width: var(--pd2-server-size) !important; min-height: var(--pd2-server-size) !important;}
html.pd2-running [class*="message_"] img, html.pd2-running [class*="message_"] video {filter: brightness(calc(var(--pd2-media-brightness) / 100)) saturate(calc(var(--pd2-media-saturation) / 100));}
html.pd2-feature-privacy_avatars [class*="avatar_"]:hover img,
html.pd2-feature-privacy_usernames [class*="username_"]:hover,
html.pd2-feature-privacy_server_icons [class*="guilds_"] [class*="icon_"]:hover,
html.pd2-feature-privacy_media [class*="message_"] img:hover,
html.pd2-feature-privacy_media [class*="message_"] video:hover,
html.pd2-feature-privacy_profile_banners [class*="banner_"]:hover {filter: none !important;}
html.pd2-feature-dim_media [class*="message_"] img:hover, html.pd2-feature-dim_media [class*="message_"] video:hover {opacity: 1 !important;}
html.pd2-window-private #app-mount [class*="avatar_"],
html.pd2-window-private #app-mount [class*="username_"],
html.pd2-window-private #app-mount [class*="nameTag_"],
html.pd2-window-private #app-mount [class*="messageContent_"],
html.pd2-window-private #app-mount [class*="guilds_"] [class*="icon_"] {filter: blur(10px) !important;}
.pd2-message-highlight {outline: 2px solid var(--pd2-accent) !important; background: color-mix(in srgb, var(--pd2-accent) 16%, transparent) !important; border-radius: var(--pd2-radius) !important;}
.pd2-message-hidden {display: none !important;}
.pd2-channel-match {outline: 2px solid var(--pd2-accent) !important; border-radius: 8px !important; box-shadow: 0 0 14px var(--pd2-glow) !important;}
.pd2-launcher {
  position: fixed; right: 18px; bottom: 18px; z-index: 10001; width: 48px; height: 48px; border: 1px solid rgb(255 255 255 / .14);
  border-radius: 16px; color: white; background: linear-gradient(145deg, #7c3aed, #c15cff); box-shadow: 0 10px 30px rgb(84 31 140 / .5);
  font: 800 14px/1 system-ui; cursor: pointer; transition: transform .16s ease, box-shadow .16s ease;
}
.pd2-launcher:hover {transform: translateY(-2px) scale(1.04); box-shadow: 0 14px 38px var(--pd2-glow);}
.pd2-overlay {position: fixed; inset: 0; z-index: 10000; display: grid; place-items: center; padding: 24px; background: rgb(3 1 8 / .74); backdrop-filter: blur(10px);}
.pd2-panel {
  width: min(1120px, 96vw); max-height: min(880px, 92vh); overflow: auto; color: var(--pd2-text); border: 1px solid rgb(198 129 255 / .24);
  border-radius: 22px; background: color-mix(in srgb, var(--pd2-bg) calc(var(--pd2-panel-opacity) * 1%), transparent);
  box-shadow: 0 30px 90px rgb(0 0 0 / .55), 0 0 60px rgb(124 58 237 / .13); font: 14px/1.45 Inter, system-ui, sans-serif;
}
.pd2-panel * {box-sizing: border-box;}
.pd2-header {position: sticky; top: 0; z-index: 4; display: flex; align-items: center; gap: 12px; padding: 18px 20px; background: color-mix(in srgb, var(--pd2-bg) 92%, transparent); backdrop-filter: blur(14px); border-bottom: 1px solid rgb(255 255 255 / .08);}
.pd2-heading {min-width: 0; flex: 1;}
.pd2-heading h2 {margin: 0; font-size: 22px; color: white;}
.pd2-heading p {margin: 2px 0 0; color: var(--pd2-muted);}
.pd2-button, .pd2-select, .pd2-input, .pd2-textarea {
  border: 1px solid rgb(255 255 255 / .12); border-radius: 11px; color: var(--pd2-text); background: color-mix(in srgb, var(--pd2-surface) 90%, transparent); font: inherit;
}
.pd2-button {padding: 9px 12px; cursor: pointer; font-weight: 700;}
.pd2-button:hover {border-color: var(--pd2-accent); background: color-mix(in srgb, var(--pd2-accent) 20%, var(--pd2-surface));}
.pd2-button[data-active="true"] {background: var(--pd2-accent); color: white; border-color: transparent;}
.pd2-content {padding: 18px 20px 24px;}
.pd2-safety {display: grid; grid-template-columns: auto 1fr; gap: 10px; padding: 12px 14px; border: 1px solid rgb(168 85 247 / .25); border-radius: 14px; background: rgb(168 85 247 / .08); margin-bottom: 15px;}
.pd2-safety strong {color: #d7b5ff;}
.pd2-toolbar {display: grid; grid-template-columns: minmax(220px, 1fr) minmax(170px, auto) auto; gap: 10px; margin-bottom: 12px;}
.pd2-input, .pd2-select {min-height: 40px; padding: 9px 11px; outline: none;}
.pd2-input:focus, .pd2-textarea:focus, .pd2-select:focus {border-color: var(--pd2-accent); box-shadow: 0 0 0 3px rgb(168 85 247 / .13);}
.pd2-quickbar {display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 12px; padding: 10px; border: 1px solid rgb(168 85 247 / .16); border-radius: 14px; background: rgb(168 85 247 / .045);}
.pd2-quickbar > span {margin-right: auto; color: var(--pd2-muted); font-weight: 700;}
.pd2-stats {display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-bottom: 15px;}
.pd2-stat {padding: 11px 13px; border-radius: 13px; background: rgb(255 255 255 / .045); border: 1px solid rgb(255 255 255 / .07);}
.pd2-stat strong {display: block; font-size: 19px; color: white;}
.pd2-stat span {color: var(--pd2-muted); font-size: 12px;}
.pd2-lab, .pd2-data {padding: 14px; margin-bottom: 15px; border: 1px solid rgb(255 255 255 / .08); border-radius: 16px; background: rgb(255 255 255 / .025);}
.pd2-lab h3, .pd2-data h3 {margin: 0 0 10px; color: #e4c8ff;}
.pd2-lab-grid {display: grid; grid-template-columns: 1fr 1fr; gap: 10px;}
.pd2-textarea {min-height: 100px; width: 100%; resize: vertical; padding: 10px 12px; outline: none;}
.pd2-lab-actions, .pd2-data-row {display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 9px; color: var(--pd2-muted);}
.pd2-grid {display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px;}
.pd2-card {display: grid; grid-template-columns: 34px minmax(0, 1fr) auto; gap: 10px; align-items: center; min-height: 76px; padding: 12px; border: 1px solid rgb(255 255 255 / .075); border-radius: 15px; background: rgb(255 255 255 / .03);}
.pd2-card:hover {border-color: rgb(168 85 247 / .34); background: rgb(168 85 247 / .055);}
.pd2-id {display: grid; place-items: center; width: 32px; height: 32px; border-radius: 10px; color: #d7b5ff; background: rgb(168 85 247 / .14); font-weight: 800; font-size: 12px;}
.pd2-card-copy {min-width: 0;}
.pd2-card-copy strong {display: block; color: #f2e8ff; overflow-wrap: anywhere;}
.pd2-card-copy small {display: block; margin-top: 3px; color: var(--pd2-muted);}
.pd2-card-controls {display: flex; gap: 7px; align-items: center;}
.pd2-star {border: 0; padding: 5px; color: #8d7b9e; background: transparent; cursor: pointer; font-size: 18px;}
.pd2-star[data-active="true"] {color: #dca8ff; text-shadow: 0 0 12px var(--pd2-glow);}
.pd2-switch {position: relative; width: 42px; height: 24px; border: 0; border-radius: 999px; background: #44384f; cursor: pointer;}
.pd2-switch::after {content: ''; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: white; transition: transform .15s ease;}
.pd2-switch[aria-checked="true"] {background: var(--pd2-accent);}
.pd2-switch[aria-checked="true"]::after {transform: translateX(18px);}
.pd2-range {width: 130px; accent-color: var(--pd2-accent);}
.pd2-range-value {min-width: 46px; text-align: right; color: #d9b9ff; font-variant-numeric: tabular-nums;}
.pd2-empty {grid-column: 1 / -1; padding: 34px; text-align: center; color: var(--pd2-muted);}
.pd2-load-more {grid-column: 1 / -1; justify-self: center; min-width: 220px;}
.pd2-code-copy {position: absolute; top: 6px; right: 6px; z-index: 2; border: 1px solid rgb(255 255 255 / .12); border-radius: 8px; padding: 5px 8px; color: white; background: rgb(74 29 112 / .9); cursor: pointer; font: 700 11px system-ui;}
.pd2-composer-count {position: absolute; right: 12px; bottom: -19px; z-index: 2; color: var(--pd2-muted); font: 600 11px system-ui; pointer-events: none;}
.pd2-code-host, .pd2-composer-host {position: relative !important;}
html[data-pd2-mode="compact"] .pd2-grid {grid-template-columns: 1fr;}
html[data-pd2-mode="compact"] .pd2-toolbar, html[data-pd2-mode="vertical"] .pd2-toolbar {grid-template-columns: 1fr;}
html[data-pd2-mode="vertical"] .pd2-grid, html[data-pd2-mode="vertical"] .pd2-lab-grid {grid-template-columns: 1fr;}
@media (max-width: 760px) {
  .pd2-overlay {padding: 0;}
  .pd2-panel {width: 100vw; max-height: 100vh; border-radius: 0;}
  .pd2-header {padding: 13px; flex-wrap: wrap;}
  .pd2-content {padding: 12px;}
  .pd2-toolbar, .pd2-grid, .pd2-lab-grid {grid-template-columns: 1fr;}
  .pd2-stats {grid-template-columns: repeat(2, minmax(0, 1fr));}
  .pd2-card {grid-template-columns: 32px minmax(0, 1fr);}
  .pd2-card-controls {grid-column: 1 / -1; justify-content: flex-end;}
}
@media (prefers-reduced-motion: reduce) {
  .pd2-panel *, .pd2-launcher {animation-duration: .001ms !important; transition-duration: .001ms !important;}
}
`;

class PowerDiscord {
  constructor() {
    this.state = null;
    this.running = false;
    this.listeners = [];
    this.behaviorListeners = [];
    this.timers = new Set();
    this.storageTimer = null;
    this.stateDirty = false;
    this.models = new Set();
    this.overlay = null;
    this.launcher = null;
    this.observer = null;
    this.resizeObserver = null;
    this.domFrame = null;
    this.responsiveFrame = null;
    this.pendingDomRoots = new Set();
    this.responsiveMode = 'normal';
    this.domBatchCount = 0;
    this.lastMessage = null;
    this.lastMedia = null;
    this.modifiedMedia = new Map();
    this.startedAt = 0;
    this.errors = [];
  }

  getName() { return PLUGIN_NAME; }
  getVersion() { return VERSION; }
  getAuthor() { return 'roman161rusrosrov-cmyk'; }
  getDescription() { return 'Производительный фиолетовый набор из 100 безопасных локальных улучшений Discord.'; }

  start() {
    if (this.running) return;
    this.running = true;
    this.startedAt = Date.now();
    this.state = this.loadState();
    document.documentElement.classList.add(ROOT_CLASS);
    BdApi.DOM.removeStyle(STYLE_ID);
    BdApi.DOM.addStyle(STYLE_ID, BASE_CSS + '\n' + buildFeatureCss());
    this.listen(document, 'mouseover', event => this.trackContext(event), true);
    this.listen(document, 'keydown', event => this.handleHotkey(event));
    this.applyVisualState();
    this.applyBehaviors();
    this.toast(`PowerDiscord ${VERSION} запущен: 100 функций.`, 'success');
  }

  stop() {
    if (!this.running) return;
    this.toast('PowerDiscord выключен.', 'info');
    this.flushState();
    this.running = false;
    this.closeCenter();
    this.cleanupBehaviors();
    this.clearListeners(this.listeners);
    for (const timer of this.timers) clearTimeout(timer);
    this.timers.clear();
    this.restoreMedia();
    document.querySelectorAll('.pd2-message-highlight').forEach(node => node.classList.remove('pd2-message-highlight'));
    document.querySelectorAll('.pd2-message-hidden').forEach(node => node.classList.remove('pd2-message-hidden'));
    document.querySelectorAll('.pd2-channel-match').forEach(node => node.classList.remove('pd2-channel-match'));
    for (const feature of FEATURE_REGISTRY.filter(item => item.type === 'toggle')) {
      document.documentElement.classList.remove(`pd2-feature-${feature.key}`);
    }
    document.documentElement.classList.remove(ROOT_CLASS, 'pd2-window-private');
    delete document.documentElement.dataset.pd2Mode;
    for (const feature of FEATURE_REGISTRY.filter(item => item.type === 'range')) document.documentElement.style.removeProperty(feature.config.variable);
    for (const property of ['--pd2-bg', '--pd2-bg-secondary', '--pd2-surface', '--pd2-accent', '--pd2-text', '--pd2-muted', '--pd2-glow']) {
      document.documentElement.style.removeProperty(property);
    }
    BdApi.DOM.removeStyle(STYLE_ID);
    this.models.clear();
  }

  getSettingsPanel() {
    if (!this.state) this.state = this.loadState();
    return this.buildPanel(false);
  }

  defaultState() {
    const enabled = {};
    const ranges = {};
    for (const feature of FEATURE_REGISTRY) {
      if (feature.type === 'toggle' || feature.type === 'behavior') enabled[feature.key] = feature.defaultEnabled;
      if (feature.type === 'range') ranges[feature.key] = feature.config.defaultValue;
    }
    return {
      masterEnabled: true,
      locale: 'ru',
      theme: 'deep_violet',
      preset: 'comfort',
      enabled,
      ranges,
      favorites: [],
      bookmarks: [],
      notes: []
    };
  }

  loadState() {
    const defaults = this.defaultState();
    let saved = null;
    try { saved = BdApi.Data.load(PLUGIN_NAME, STORAGE_KEY); } catch (error) { this.recordError('loadState', error); }
    return this.normalizeState(saved, defaults);
  }

  normalizeState(saved, defaults = this.defaultState()) {
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return defaults;
    const state = {...defaults};
    state.masterEnabled = typeof saved.masterEnabled === 'boolean' ? saved.masterEnabled : true;
    state.locale = saved.locale === 'en' ? 'en' : 'ru';
    state.theme = Object.hasOwn(THEME_MAP, saved.theme) ? saved.theme : defaults.theme;
    state.preset = ['comfort', 'performance', 'privacy', 'custom'].includes(saved.preset) ? saved.preset : 'custom';
    if (saved.enabled && typeof saved.enabled === 'object') {
      for (const key of Object.keys(defaults.enabled)) if (typeof saved.enabled[key] === 'boolean') state.enabled[key] = saved.enabled[key];
    }
    if (saved.ranges && typeof saved.ranges === 'object') {
      for (const feature of FEATURE_REGISTRY.filter(item => item.type === 'range')) {
        const value = Number(saved.ranges[feature.key]);
        if (Number.isFinite(value)) state.ranges[feature.key] = Math.min(feature.config.max, Math.max(feature.config.min, value));
      }
    }
    state.favorites = Array.isArray(saved.favorites) ? [...new Set(saved.favorites.filter(key => FEATURE_MAP.has(key)))].slice(0, 100) : [];
    state.bookmarks = Array.isArray(saved.bookmarks) ? saved.bookmarks.filter(item => item && typeof item === 'object').slice(0, 300).map(item => ({
      id: String(item.id || crypto.randomUUID()), messageId: String(item.messageId || ''), channelId: String(item.channelId || ''),
      guildId: String(item.guildId || ''), url: String(item.url || ''), createdAt: Number(item.createdAt) || Date.now()
    })) : [];
    state.notes = Array.isArray(saved.notes) ? saved.notes.filter(item => item && typeof item === 'object' && typeof item.text === 'string').slice(0, 200).map(item => ({
      id: String(item.id || crypto.randomUUID()), messageId: String(item.messageId || ''), text: item.text.slice(0, 4000), createdAt: Number(item.createdAt) || Date.now()
    })) : [];
    return state;
  }

  saveState(immediate = false) {
    if (!this.state) return;
    this.stateDirty = true;
    if (immediate) return this.flushState();
    if (this.storageTimer !== null) {
      this.clearTimer(this.storageTimer);
      this.storageTimer = null;
    }
    this.storageTimer = this.setTimer(() => {
      this.storageTimer = null;
      this.persistState();
    }, 220);
  }

  flushState() {
    if (this.storageTimer !== null) {
      this.clearTimer(this.storageTimer);
      this.storageTimer = null;
    }
    this.persistState();
  }

  persistState() {
    if (!this.stateDirty) return;
    try {
      BdApi.Data.save(PLUGIN_NAME, STORAGE_KEY, this.state);
      this.stateDirty = false;
    } catch (error) { this.recordError('saveState', error); }
  }

  t(key) { return UI_TEXT[this.state?.locale || 'ru'][key] || key; }
  categoryLabel(key) { return CATEGORY_LABELS[key]?.[this.state?.locale || 'ru'] || key; }
  featureName(feature) { return feature.name[this.state?.locale || 'ru']; }

  listen(target, type, callback, options) {
    if (!target?.addEventListener) return;
    target.addEventListener(type, callback, options);
    this.listeners.push({target, type, callback, options});
  }

  listenBehavior(target, type, callback, options) {
    if (!target?.addEventListener) return;
    target.addEventListener(type, callback, options);
    this.behaviorListeners.push({target, type, callback, options});
  }

  clearListeners(collection) {
    for (const item of collection.splice(0)) {
      try { item.target.removeEventListener(item.type, item.callback, item.options); } catch {}
    }
  }

  setTimer(callback, delay) {
    const timer = setTimeout(() => { this.timers.delete(timer); callback(); }, delay);
    this.timers.add(timer);
    return timer;
  }

  clearTimer(timer) {
    if (timer === null || timer === undefined) return;
    clearTimeout(timer);
    this.timers.delete(timer);
  }

  recordError(source, error) {
    this.errors.unshift({source, message: String(error?.message || error), at: Date.now()});
    this.errors = this.errors.slice(0, 30);
    try { BdApi.Logger.error(PLUGIN_NAME, source, error); } catch {}
  }

  toast(message, type = 'info') {
    try { BdApi.UI.showToast(message, {type, timeout: 3500}); } catch {}
  }

  applyVisualState() {
    const root = document.documentElement;
    for (const feature of FEATURE_REGISTRY.filter(item => item.type === 'toggle')) {
      root.classList.toggle(`pd2-feature-${feature.key}`, Boolean(this.state.masterEnabled && this.state.enabled[feature.key]));
    }
    for (const feature of FEATURE_REGISTRY.filter(item => item.type === 'range')) {
      root.style.setProperty(feature.config.variable, `${this.state.ranges[feature.key]}${feature.config.unit}`);
    }
    const palette = THEME_MAP[this.state.theme] || THEME_MAP.deep_violet;
    const [bg, secondary, surface, accent, text, muted] = palette;
    root.style.setProperty('--pd2-bg', bg);
    root.style.setProperty('--pd2-bg-secondary', secondary);
    root.style.setProperty('--pd2-surface', surface);
    root.style.setProperty('--pd2-accent', accent);
    root.style.setProperty('--pd2-text', text);
    root.style.setProperty('--pd2-muted', muted);
    root.style.setProperty('--pd2-glow', this.hexToRgba(accent, .42));
  }

  hexToRgba(hex, alpha) {
    const value = String(hex).replace('#', '');
    const number = Number.parseInt(value.length === 3 ? [...value].map(char => char + char).join('') : value, 16);
    return `rgb(${(number >> 16) & 255} ${(number >> 8) & 255} ${number & 255} / ${alpha})`;
  }

  setFeature(feature, value) {
    if (feature.type === 'toggle' || feature.type === 'behavior') {
      this.state.enabled[feature.key] = Boolean(value);
      if (value && feature.key === 'comfortable_spacing') this.state.enabled.dense_spacing = false;
      if (value && feature.key === 'dense_spacing') this.state.enabled.comfortable_spacing = false;
      if (feature.type === 'behavior') this.applyBehaviors();
      else this.applyVisualState();
    } else if (feature.type === 'range') {
      const number = Math.min(feature.config.max, Math.max(feature.config.min, Number(value)));
      this.state.ranges[feature.key] = number;
      document.documentElement.style.setProperty(feature.config.variable, `${number}${feature.config.unit}`);
    } else if (feature.type === 'theme') {
      this.state.theme = feature.config.theme;
      this.applyVisualState();
    }
    this.state.preset = 'custom';
    this.saveState();
    if (feature.type !== 'range') this.refreshPanels();
  }

  applyPreset(name) {
    const defaults = this.defaultState();
    if (name === 'comfort') {
      this.state.enabled = {...defaults.enabled};
      this.state.ranges = {...defaults.ranges};
      this.state.theme = 'deep_violet';
    } else if (name === 'performance') {
      for (const key of Object.keys(this.state.enabled)) this.state.enabled[key] = false;
      this.state.enabled.accent_selected_channel = true;
      this.state.enabled.violet_code_blocks = true;
      this.state.enabled.behavior_floating_launcher = true;
      this.state.enabled.behavior_responsive_engine = true;
      this.state.theme = 'black_violet';
      this.state.ranges.message_gap = 1;
      this.state.ranges.panel_opacity = 98;
    } else if (name === 'privacy') {
      this.state.enabled = {...defaults.enabled};
      for (const key of ['privacy_avatars', 'privacy_usernames', 'privacy_server_icons', 'privacy_media', 'privacy_profile_banners']) this.state.enabled[key] = true;
      this.state.enabled.behavior_privacy_on_blur = true;
      this.state.theme = 'dark_orchid';
    } else return;
    this.state.masterEnabled = true;
    this.state.preset = name;
    this.applyVisualState();
    this.applyBehaviors();
    this.saveState(true);
    this.rebuildPanels();
    this.toast(this.state.locale === 'ru' ? 'Быстрый режим применён.' : 'Quick mode applied.', 'success');
  }

  randomTheme() {
    const themes = Object.keys(THEME_MAP);
    const current = Math.max(0, themes.indexOf(this.state.theme));
    const offset = 1 + Math.floor(Math.random() * Math.max(1, themes.length - 1));
    this.state.theme = themes[(current + offset) % themes.length];
    this.state.preset = 'custom';
    this.applyVisualState();
    this.saveState();
    this.refreshPanels();
  }

  restoreHiddenMessages() {
    const hidden = [...document.querySelectorAll('.pd2-message-hidden')];
    hidden.forEach(node => node.classList.remove('pd2-message-hidden'));
    this.toast(`${this.state.locale === 'ru' ? 'Возвращено' : 'Restored'}: ${hidden.length}`, 'success');
  }

  showBookmarks() {
    const content = this.state.bookmarks.map((item, index) => {
      const date = new Date(item.createdAt).toLocaleString(this.state.locale === 'ru' ? 'ru-RU' : 'en-GB');
      return `${index + 1}. ${date}\n${item.url || `Message ID: ${item.messageId}`}`;
    }).join('\n\n');
    this.showResult(this.t('bookmarks'), content || this.t('empty'));
  }

  showNotes() {
    const content = this.state.notes.map((item, index) => {
      const date = new Date(item.createdAt).toLocaleString(this.state.locale === 'ru' ? 'ru-RU' : 'en-GB');
      return `${index + 1}. ${date} · Message ID: ${item.messageId || '—'}\n${item.text}`;
    }).join('\n\n');
    this.showResult(this.t('notes'), content || this.t('empty'));
  }

  applyBehaviors() {
    this.cleanupBehaviors();
    if (!this.running) return;
    if (this.state.enabled.behavior_floating_launcher) this.mountLauncher();
    if (this.state.enabled.behavior_privacy_on_blur) this.startPrivacyOnBlur();
    if (this.state.enabled.behavior_code_copy_buttons || this.state.enabled.behavior_composer_counter) this.startDomEnhancements();
    if (this.state.enabled.behavior_responsive_engine) this.startResponsiveEngine();
  }

  cleanupBehaviors() {
    this.clearListeners(this.behaviorListeners);
    this.observer?.disconnect();
    this.observer = null;
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    if (this.domFrame !== null) cancelAnimationFrame(this.domFrame);
    if (this.responsiveFrame !== null) cancelAnimationFrame(this.responsiveFrame);
    this.domFrame = null;
    this.responsiveFrame = null;
    this.pendingDomRoots.clear();
    this.launcher?.remove();
    this.launcher = null;
    document.querySelectorAll('.pd2-code-copy, .pd2-composer-count').forEach(node => node.remove());
    document.querySelectorAll('.pd2-code-host').forEach(node => node.classList.remove('pd2-code-host'));
    document.querySelectorAll('.pd2-composer-host').forEach(node => node.classList.remove('pd2-composer-host'));
    document.documentElement.classList.remove('pd2-window-private');
    delete document.documentElement.dataset.pd2Mode;
  }

  mountLauncher() {
    const launcher = makeElement('button', 'pd2-launcher', 'PD');
    launcher.type = 'button';
    launcher.title = 'PowerDiscord — Ctrl + Shift + P';
    launcher.dataset.pd2Owned = 'true';
    launcher.addEventListener('click', () => this.openCenter());
    document.body.appendChild(launcher);
    this.launcher = launcher;
  }

  startPrivacyOnBlur() {
    const update = () => document.documentElement.classList.toggle('pd2-window-private', !document.hasFocus());
    this.listenBehavior(window, 'blur', update);
    this.listenBehavior(window, 'focus', update);
    update();
  }

  startDomEnhancements() {
    this.observer = new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node instanceof Element && node.dataset.pd2Owned !== 'true') this.queueDomRoot(node);
        }
      }
    });
    this.observer.observe(document.body, {childList: true, subtree: true});
    if (this.state.enabled.behavior_composer_counter) {
      this.listenBehavior(document, 'input', event => this.updateComposerCounter(event.target), true);
    }
    this.listenBehavior(document, 'visibilitychange', () => {
      if (!document.hidden) this.queueDomRoot(document.body);
    });
    this.queueDomRoot(document.body);
  }

  queueDomRoot(root) {
    if (!(root instanceof Element) || !this.running) return;
    for (const pending of [...this.pendingDomRoots]) {
      if (pending.contains?.(root)) return;
      if (root.contains?.(pending)) this.pendingDomRoots.delete(pending);
    }
    this.pendingDomRoots.add(root);
    if (document.hidden || this.domFrame !== null) return;
    this.domFrame = requestAnimationFrame(() => {
      this.domFrame = null;
      const roots = [...this.pendingDomRoots];
      this.pendingDomRoots.clear();
      this.domBatchCount++;
      for (const current of roots) {
        if (this.state.enabled.behavior_code_copy_buttons) this.addCodeCopyButtons(current);
        if (this.state.enabled.behavior_composer_counter && (current.matches?.('[class*="channelTextArea_"]') || current.querySelector?.('[class*="channelTextArea_"]'))) {
          this.updateComposerCounter(current);
        }
      }
    });
  }

  addCodeCopyButtons(root = document.body) {
    const blocks = [];
    if (root.matches?.('pre') && root.closest('[class*="message_"]')) blocks.push(root);
    blocks.push(...(root.querySelectorAll?.('[class*="message_"] pre') || []));
    for (const pre of blocks) {
      if (pre.querySelector(':scope > .pd2-code-copy')) continue;
      pre.classList.add('pd2-code-host');
      const button = makeElement('button', 'pd2-code-copy', this.state.locale === 'ru' ? 'Копировать' : 'Copy');
      button.type = 'button';
      button.dataset.pd2Owned = 'true';
      button.addEventListener('click', event => {
        event.stopPropagation();
        this.copyText(pre.querySelector('code')?.textContent || pre.textContent || '');
      });
      pre.appendChild(button);
    }
  }

  updateComposerCounter(source = null) {
    const area = source instanceof Element
      ? source.closest?.('[class*="channelTextArea_"]') || source.querySelector?.('[class*="channelTextArea_"]')
      : document.querySelector('[class*="channelTextArea_"]');
    if (!area) return;
    const editor = area.querySelector('[contenteditable="true"], textarea');
    if (!editor) return;
    let counter = area.querySelector(':scope > .pd2-composer-count');
    if (!counter) {
      counter = makeElement('span', 'pd2-composer-count');
      counter.dataset.pd2Owned = 'true';
      area.classList.add('pd2-composer-host');
      area.appendChild(counter);
    }
    const length = editor instanceof HTMLTextAreaElement ? editor.value.length : (editor.textContent || '').length;
    counter.textContent = `${length} / 2000`;
    counter.style.color = length > 2000 ? '#ff78a8' : '';
  }

  startResponsiveEngine() {
    const update = () => {
      if (this.responsiveFrame !== null) return;
      this.responsiveFrame = requestAnimationFrame(() => {
        this.responsiveFrame = null;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const ratio = width / Math.max(1, height);
        const mode = height > width * 1.08 ? 'vertical' : width < 940 ? 'compact' : ratio > 2.25 ? 'ultrawide' : width > 1700 ? 'large' : 'normal';
        if (mode === this.responsiveMode && document.documentElement.dataset.pd2Mode === mode) return;
        this.responsiveMode = mode;
        document.documentElement.dataset.pd2Mode = mode;
        this.updatePanelStats();
      });
    };
    this.listenBehavior(window, 'resize', update, {passive: true});
    const app = document.getElementById('app-mount');
    if (app && typeof ResizeObserver === 'function') {
      this.resizeObserver = new ResizeObserver(update);
      this.resizeObserver.observe(app);
    }
    update();
  }

  handleHotkey(event) {
    if (event.ctrlKey && event.shiftKey && event.code === 'KeyP') {
      event.preventDefault();
      this.overlay ? this.closeCenter() : this.openCenter();
    }
    if (event.altKey && event.shiftKey && event.code === 'KeyP') {
      event.preventDefault();
      document.documentElement.classList.toggle('pd2-window-private');
      this.toast(this.state.locale === 'ru' ? 'Паник-приватность переключена.' : 'Panic privacy toggled.', 'info');
    }
  }

  trackContext(event) {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const message = target.closest('li[id^="chat-messages-"], [class*="messageListItem_"]');
    if (message) this.lastMessage = message;
    const media = target.closest('img[src], video[src]');
    if (media) this.lastMedia = media;
  }

  messageData() {
    const message = this.lastMessage?.isConnected ? this.lastMessage : null;
    if (!message) return null;
    const path = location.pathname.match(/\/channels\/([^/]+)\/([^/]+)/);
    const idMatch = message.id.match(/chat-messages-(\d+)-(\d+)$/) || message.querySelector('[id^="message-content-"]')?.id.match(/message-content-(\d+)-(\d+)$/);
    const guildId = path?.[1] || '';
    const channelId = idMatch?.[1] || path?.[2] || '';
    const messageId = idMatch?.[2] || '';
    const text = message.querySelector('[class*="messageContent_"]')?.textContent || '';
    const url = messageId && channelId ? `https://discord.com/channels/${guildId}/${channelId}/${messageId}` : '';
    return {message, guildId, channelId, messageId, text, url};
  }

  requireMessage() {
    const data = this.messageData();
    if (!data) this.toast(this.state.locale === 'ru' ? 'Сначала наведите курсор на видимое сообщение.' : 'Hover a visible message first.', 'warning');
    return data;
  }

  requireMedia() {
    const media = this.lastMedia?.isConnected ? this.lastMedia : null;
    if (!media) this.toast(this.state.locale === 'ru' ? 'Сначала наведите курсор на видимое изображение или видео.' : 'Hover a visible image or video first.', 'warning');
    return media;
  }

  async copyText(value) {
    const text = String(value || '');
    if (!text) return this.toast(this.state.locale === 'ru' ? 'Нечего копировать.' : 'Nothing to copy.', 'warning');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = makeElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    this.toast(this.state.locale === 'ru' ? 'Скопировано.' : 'Copied.', 'success');
  }

  async runAction(action) {
    try {
      if (action.startsWith('copy_message_') || ['message_statistics', 'bookmark_message_location', 'note_for_message', 'highlight_message', 'hide_message_local', 'copy_clean_message'].includes(action)) {
        const data = this.requireMessage();
        if (!data) return;
        switch (action) {
          case 'copy_message_text': await this.copyText(data.text); return;
          case 'copy_clean_message': await this.copyText(data.text.replace(/\s+/g, ' ').trim()); return;
          case 'copy_message_id': await this.copyText(data.messageId); return;
          case 'copy_message_link': await this.copyText(data.url); return;
          case 'copy_message_quote': await this.copyText(data.text.split(/\r?\n/).map(line => `> ${line}`).join('\n')); return;
          case 'message_statistics': {
            const words = data.text.match(/[\p{L}\p{N}]+/gu) || [];
            this.showResult(this.state.locale === 'ru' ? 'Статистика сообщения' : 'Message statistics', `${this.state.locale === 'ru' ? 'Символов' : 'Characters'}: ${[...data.text].length}\n${this.state.locale === 'ru' ? 'Слов' : 'Words'}: ${words.length}\n${this.state.locale === 'ru' ? 'Строк' : 'Lines'}: ${data.text.split(/\r?\n/).length}`);
            return;
          }
          case 'bookmark_message_location': {
            if (!data.messageId) throw new Error('ID сообщения не найден');
            if (!this.state.bookmarks.some(item => item.messageId === data.messageId)) {
              this.state.bookmarks.unshift({id: crypto.randomUUID(), messageId: data.messageId, channelId: data.channelId, guildId: data.guildId, url: data.url, createdAt: Date.now()});
              this.state.bookmarks = this.state.bookmarks.slice(0, 300);
              this.saveState(true);
            }
            this.toast(this.state.locale === 'ru' ? 'Позиция сообщения сохранена без его текста.' : 'Message location saved without its text.', 'success');
            return;
          }
          case 'note_for_message': {
            const note = window.prompt(this.state.locale === 'ru' ? 'Введите свою заметку:' : 'Enter your note:', '');
            if (note?.trim()) {
              this.state.notes.unshift({id: crypto.randomUUID(), messageId: data.messageId, text: note.trim().slice(0, 4000), createdAt: Date.now()});
              this.state.notes = this.state.notes.slice(0, 200);
              this.saveState(true);
              this.refreshPanels();
            }
            return;
          }
          case 'highlight_message': data.message.classList.toggle('pd2-message-highlight'); return;
          case 'hide_message_local': data.message.classList.add('pd2-message-hidden'); return;
        }
      }

      switch (action) {
        case 'list_visible_channels': {
          const sidebar = document.querySelector('[class*="sidebarList_"]');
          const names = [...new Set([...(sidebar?.querySelectorAll('[class*="name_"]') || [])].map(node => node.textContent?.trim()).filter(Boolean))];
          this.showResult(this.state.locale === 'ru' ? 'Доступные каналы на экране' : 'Visible accessible channels', names.join('\n') || this.t('empty'));
          break;
        }
        case 'search_visible_channels': {
          const term = window.prompt(this.state.locale === 'ru' ? 'Название видимого канала:' : 'Visible channel name:', '')?.trim().toLocaleLowerCase();
          document.querySelectorAll('.pd2-channel-match').forEach(node => node.classList.remove('pd2-channel-match'));
          if (!term) return;
          let count = 0;
          for (const row of document.querySelectorAll('[class*="sidebarList_"] [class*="containerDefault_"]')) {
            if ((row.textContent || '').toLocaleLowerCase().includes(term)) { row.classList.add('pd2-channel-match'); count++; }
          }
          this.toast(`${this.state.locale === 'ru' ? 'Найдено' : 'Found'}: ${count}`, count ? 'success' : 'warning');
          break;
        }
        case 'copy_current_channel_id': await this.copyText(location.pathname.match(/\/channels\/[^/]+\/(\d+)/)?.[1] || ''); break;
        case 'copy_current_guild_id': {
          const guildId = location.pathname.match(/\/channels\/(\d+)/)?.[1] || '';
          if (!guildId) throw new Error(this.state.locale === 'ru' ? 'Сейчас открыт личный чат, а не сервер.' : 'A direct message is open, not a server.');
          await this.copyText(guildId);
          break;
        }
        case 'copy_media_url': {
          const media = this.requireMedia(); if (media) await this.copyText(media.currentSrc || media.src || ''); break;
        }
        case 'zoom_media': {
          const media = this.requireMedia(); if (!media) return;
          if (!this.modifiedMedia.has(media)) this.modifiedMedia.set(media, {transform: media.style.transform, transformOrigin: media.style.transformOrigin, zIndex: media.style.zIndex});
          media.style.transformOrigin = 'center'; media.style.transform = 'scale(1.75)'; media.style.zIndex = '20'; break;
        }
        case 'reset_media': {
          const media = this.requireMedia(); if (!media) return; this.restoreOneMedia(media); break;
        }
        case 'export_backup': this.exportBackup(); break;
        case 'import_backup': this.importBackup(); break;
        case 'show_diagnostics': this.showDiagnostics(); break;
        default: throw new Error(`Неизвестное действие: ${action}`);
      }
    } catch (error) {
      this.recordError(`runAction:${action}`, error);
      this.toast(`${this.state.locale === 'ru' ? 'Ошибка' : 'Error'}: ${error.message}`, 'error');
    }
  }

  restoreOneMedia(media) {
    const original = this.modifiedMedia.get(media);
    if (!original) return;
    media.style.transform = original.transform;
    media.style.transformOrigin = original.transformOrigin;
    media.style.zIndex = original.zIndex;
    this.modifiedMedia.delete(media);
  }

  restoreMedia() {
    for (const media of [...this.modifiedMedia.keys()]) this.restoreOneMedia(media);
  }

  exportBackup() {
    const payload = {plugin: PLUGIN_NAME, version: VERSION, exportedAt: new Date().toISOString(), state: this.state};
    const blob = new Blob([JSON.stringify(payload, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const anchor = makeElement('a');
    anchor.href = url;
    anchor.download = 'powerdiscord-v3-backup.json';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    this.setTimer(() => URL.revokeObjectURL(url), 1500);
  }

  importBackup() {
    const input = makeElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.addEventListener('change', async () => {
      try {
        const file = input.files?.[0];
        if (!file) return;
        const payload = JSON.parse(await file.text());
        if (!payload?.state) throw new Error('Схема резервной копии не распознана');
        const normalized = this.normalizeState(payload.state);
        const apply = () => {
          this.state = normalized;
          this.applyVisualState();
          this.applyBehaviors();
          this.saveState(true);
          this.rebuildPanels();
        };
        if (BdApi.UI?.showConfirmationModal) {
          BdApi.UI.showConfirmationModal(this.state.locale === 'ru' ? 'Импорт настроек' : 'Import settings', this.state.locale === 'ru' ? 'Заменить текущие локальные настройки?' : 'Replace current local settings?', {
            confirmText: this.state.locale === 'ru' ? 'Импортировать' : 'Import', cancelText: this.state.locale === 'ru' ? 'Отмена' : 'Cancel',
            onConfirm: apply
          });
        } else apply();
      } catch (error) { this.recordError('importBackup', error); this.toast(error.message, 'error'); }
    }, {once: true});
    input.click();
  }

  showDiagnostics() {
    const active = this.activeFeatureCount();
    const renderedCards = [...this.models].reduce((total, model) => total + model.root.querySelectorAll?.('.pd2-card').length, 0);
    const report = [
      `PowerDiscord ${VERSION}`,
      `Features: ${FEATURE_REGISTRY.length}`,
      `Active/available: ${active}`,
      `Theme: ${this.state.theme}`,
      `Quick preset: ${this.state.preset}`,
      `Locale: ${this.state.locale}`,
      `Responsive: ${document.documentElement.dataset.pd2Mode || 'off'}`,
      `Bookmarks: ${this.state.bookmarks.length}`,
      `Notes: ${this.state.notes.length}`,
      `Listeners: ${this.listeners.length + this.behaviorListeners.length}`,
      `Observer: ${Boolean(this.observer)}`,
      `DOM batches: ${this.domBatchCount}`,
      `Pending DOM roots: ${this.pendingDomRoots.size}`,
      `Rendered feature cards: ${renderedCards}`,
      `Managed timers: ${this.timers.size}`,
      `Pending storage write: ${this.storageTimer !== null}`,
      `Dirty settings: ${this.stateDirty}`,
      `Runtime: ${Math.floor((Date.now() - this.startedAt) / 1000)}s`,
      `Errors: ${this.errors.length}`
    ].join('\n');
    this.showResult(this.state.locale === 'ru' ? 'Диагностика PowerDiscord' : 'PowerDiscord diagnostics', report);
  }

  showResult(title, content) {
    if (BdApi.UI?.alert) {
      BdApi.UI.alert(title, String(content));
    } else window.alert(`${title}\n\n${content}`);
  }

  openCenter() {
    if (this.overlay) return;
    const overlay = makeElement('div', 'pd2-overlay');
    overlay.dataset.pd2Owned = 'true';
    overlay.addEventListener('mousedown', event => { if (event.target === overlay) this.closeCenter(); });
    overlay.appendChild(this.buildPanel(true));
    document.body.appendChild(overlay);
    this.overlay = overlay;
  }

  closeCenter() {
    if (!this.overlay) return;
    const panel = this.overlay.querySelector('.pd2-panel');
    for (const model of [...this.models]) {
      if (model.root !== panel) continue;
      this.clearTimer(model.searchTimer);
      this.models.delete(model);
    }
    this.overlay.remove();
    this.overlay = null;
  }

  buildPanel(modal, snapshot = {}) {
    const root = makeElement('section', 'pd2-panel');
    const model = {
      root, modal, search: null, category: null, favoritesOnly: Boolean(snapshot.favoritesOnly), grid: null,
      textInput: null, textOutput: null, stats: {}, limit: Number(snapshot.limit) || 32, searchTimer: null
    };
    this.models.add(model);

    const header = makeElement('header', 'pd2-header');
    const heading = makeElement('div', 'pd2-heading');
    const h2 = makeElement('h2', '', this.t('title'));
    const subtitle = makeElement('p', '', this.t('subtitle'));
    heading.append(h2, subtitle);
    const master = makeElement('button', 'pd2-button', this.state.masterEnabled ? this.t('effectsOn') : this.t('effectsOff'));
    master.type = 'button';
    master.dataset.active = String(this.state.masterEnabled);
    master.addEventListener('click', () => {
      this.state.masterEnabled = !this.state.masterEnabled;
      this.state.preset = 'custom';
      this.applyVisualState();
      this.saveState();
      this.rebuildPanels();
    });
    const language = makeElement('button', 'pd2-button', this.t('language'));
    language.type = 'button';
    language.addEventListener('click', () => { this.state.locale = this.state.locale === 'ru' ? 'en' : 'ru'; this.saveState(); this.rebuildPanels(); });
    header.append(heading, master, language);
    if (modal) {
      const close = makeElement('button', 'pd2-button', '×');
      close.type = 'button';
      close.title = this.t('close');
      close.addEventListener('click', () => this.closeCenter());
      header.appendChild(close);
    }

    const content = makeElement('div', 'pd2-content');
    const safety = makeElement('div', 'pd2-safety');
    safety.append(makeElement('span', '', '🛡️'));
    const safetyCopy = makeElement('div');
    safetyCopy.append(makeElement('strong', '', this.t('safeTitle')), makeElement('div', '', this.t('safeBody')));
    safety.appendChild(safetyCopy);

    const quickbar = makeElement('div', 'pd2-quickbar');
    quickbar.appendChild(makeElement('span', '', this.t('quickModes')));
    for (const [preset, label] of [['performance', this.t('performance')], ['comfort', this.t('comfort')], ['privacy', this.t('privacyPreset')]]) {
      const button = makeElement('button', 'pd2-button', label);
      button.type = 'button';
      button.dataset.active = String(this.state.preset === preset);
      button.addEventListener('click', () => this.applyPreset(preset));
      quickbar.appendChild(button);
    }
    const randomTheme = makeElement('button', 'pd2-button', this.t('randomTheme'));
    randomTheme.type = 'button';
    randomTheme.addEventListener('click', () => this.randomTheme());
    quickbar.appendChild(randomTheme);

    const toolbar = makeElement('div', 'pd2-toolbar');
    const search = makeElement('input', 'pd2-input');
    search.type = 'search';
    search.placeholder = this.t('search');
    search.value = String(snapshot.search || '');
    search.addEventListener('input', () => {
      this.clearTimer(model.searchTimer);
      model.searchTimer = this.setTimer(() => {
        model.searchTimer = null;
        model.limit = 32;
        this.renderFeatures(model);
      }, 80);
    });
    model.search = search;
    const category = makeElement('select', 'pd2-select');
    const all = makeElement('option', '', this.t('all'));
    all.value = '';
    category.appendChild(all);
    for (const key of Object.keys(CATEGORY_LABELS)) {
      const option = makeElement('option', '', this.categoryLabel(key));
      option.value = key;
      category.appendChild(option);
    }
    category.value = String(snapshot.category || '');
    category.addEventListener('change', () => { model.limit = 32; this.renderFeatures(model); });
    model.category = category;
    const favorites = makeElement('button', 'pd2-button', `★ ${this.t('favorites')}`);
    favorites.type = 'button';
    favorites.dataset.active = String(model.favoritesOnly);
    favorites.addEventListener('click', () => { model.favoritesOnly = !model.favoritesOnly; model.limit = 32; favorites.dataset.active = String(model.favoritesOnly); this.renderFeatures(model); });
    toolbar.append(search, category, favorites);

    const stats = makeElement('div', 'pd2-stats');
    for (const [key, label] of [['total', this.t('total')], ['active', this.t('active')], ['category', this.t('category')], ['mode', this.t('mode')]]) {
      const card = makeElement('div', 'pd2-stat');
      const value = makeElement('strong', '', '0');
      card.append(value, makeElement('span', '', label));
      stats.appendChild(card);
      model.stats[key] = value;
    }

    const lab = makeElement('section', 'pd2-lab');
    lab.appendChild(makeElement('h3', '', this.t('textLab')));
    const labGrid = makeElement('div', 'pd2-lab-grid');
    const input = makeElement('textarea', 'pd2-textarea');
    input.placeholder = this.t('input');
    input.value = String(snapshot.textInput || '');
    const output = makeElement('textarea', 'pd2-textarea');
    output.placeholder = this.t('output');
    output.readOnly = true;
    output.value = String(snapshot.textOutput || '');
    model.textInput = input;
    model.textOutput = output;
    labGrid.append(input, output);
    const labActions = makeElement('div', 'pd2-lab-actions');
    const copy = makeElement('button', 'pd2-button', this.t('copy'));
    copy.type = 'button'; copy.addEventListener('click', () => this.copyText(output.value));
    const clear = makeElement('button', 'pd2-button', this.t('clear'));
    clear.type = 'button'; clear.addEventListener('click', () => { input.value = ''; output.value = ''; });
    labActions.append(copy, clear);
    lab.append(labGrid, labActions);

    const data = makeElement('section', 'pd2-data');
    data.appendChild(makeElement('h3', '', this.t('localData')));
    const dataRow = makeElement('div', 'pd2-data-row');
    dataRow.append(
      makeElement('span', '', `${this.t('bookmarks')}: ${this.state.bookmarks.length}`),
      makeElement('span', '', `${this.t('notes')}: ${this.state.notes.length}`)
    );
    const reset = makeElement('button', 'pd2-button', this.t('reset'));
    reset.type = 'button';
    reset.addEventListener('click', () => this.confirmReset());
    const restoreHidden = makeElement('button', 'pd2-button', this.t('restoreHidden'));
    restoreHidden.type = 'button';
    restoreHidden.addEventListener('click', () => this.restoreHiddenMessages());
    const viewBookmarks = makeElement('button', 'pd2-button', this.t('viewBookmarks'));
    viewBookmarks.type = 'button';
    viewBookmarks.addEventListener('click', () => this.showBookmarks());
    const viewNotes = makeElement('button', 'pd2-button', this.t('viewNotes'));
    viewNotes.type = 'button';
    viewNotes.addEventListener('click', () => this.showNotes());
    dataRow.append(viewBookmarks, viewNotes, restoreHidden, reset);
    data.appendChild(dataRow);

    const grid = makeElement('div', 'pd2-grid');
    model.grid = grid;
    content.append(safety, quickbar, toolbar, stats, lab, data, grid);
    root.append(header, content);
    this.renderFeatures(model);
    return root;
  }

  renderFeatures(model) {
    const query = (model.search?.value || '').trim().toLocaleLowerCase();
    const category = model.category?.value || '';
    const features = FEATURE_REGISTRY.filter(feature => {
      if (category && feature.category !== category) return false;
      if (model.favoritesOnly && !this.state.favorites.includes(feature.key)) return false;
      const haystack = `${feature.id} ${feature.key} ${feature.name.ru} ${feature.name.en} ${this.categoryLabel(feature.category)}`.toLocaleLowerCase();
      return !query || haystack.includes(query);
    });
    model.grid.replaceChildren();
    for (const feature of features.slice(0, model.limit)) model.grid.appendChild(this.featureCard(feature, model));
    if (!features.length) model.grid.appendChild(makeElement('div', 'pd2-empty', this.t('empty')));
    if (features.length > model.limit) {
      const loadMore = makeElement('button', 'pd2-button pd2-load-more', `${this.t('loadMore')} (${features.length - model.limit})`);
      loadMore.type = 'button';
      loadMore.addEventListener('click', () => { model.limit += 32; this.renderFeatures(model); });
      model.grid.appendChild(loadMore);
    }
    this.updatePanelStats(model);
  }

  activeFeatureCount() {
    return FEATURE_REGISTRY.filter(feature => {
      if (feature.type === 'theme') return feature.config.theme === this.state.theme;
      if (feature.type === 'toggle' || feature.type === 'behavior') return this.state.enabled[feature.key];
      return true;
    }).length;
  }

  updatePanelStats(onlyModel = null) {
    const models = onlyModel ? [onlyModel] : [...this.models];
    const active = this.activeFeatureCount();
    for (const model of models) {
      if (!model.root.isConnected && !onlyModel) {
        this.clearTimer(model.searchTimer);
        this.models.delete(model);
        continue;
      }
      const category = model.category?.value || '';
      if (model.stats.total) model.stats.total.textContent = String(FEATURE_REGISTRY.length);
      if (model.stats.active) model.stats.active.textContent = String(active);
      if (model.stats.category) model.stats.category.textContent = category ? this.categoryLabel(category) : this.t('all');
      if (model.stats.mode) model.stats.mode.textContent = document.documentElement.dataset.pd2Mode || this.responsiveMode || 'normal';
    }
  }

  featureCard(feature, model) {
    const card = makeElement('article', 'pd2-card');
    card.dataset.feature = feature.key;
    card.appendChild(makeElement('span', 'pd2-id', String(feature.id)));
    const copy = makeElement('div', 'pd2-card-copy');
    copy.append(makeElement('strong', '', this.featureName(feature)), makeElement('small', '', `${this.categoryLabel(feature.category)} · ${feature.key}`));
    card.appendChild(copy);
    const controls = makeElement('div', 'pd2-card-controls');
    const star = makeElement('button', 'pd2-star', '★');
    star.type = 'button';
    star.dataset.active = String(this.state.favorites.includes(feature.key));
    star.addEventListener('click', () => {
      const set = new Set(this.state.favorites);
      set.has(feature.key) ? set.delete(feature.key) : set.add(feature.key);
      this.state.favorites = [...set];
      this.saveState();
      this.refreshPanels();
    });
    controls.appendChild(star);

    if (feature.type === 'toggle' || feature.type === 'behavior') {
      const button = makeElement('button', 'pd2-switch');
      button.type = 'button';
      button.setAttribute('role', 'switch');
      button.setAttribute('aria-checked', String(Boolean(this.state.enabled[feature.key])));
      button.title = this.state.enabled[feature.key] ? this.t('on') : this.t('off');
      button.addEventListener('click', () => this.setFeature(feature, !this.state.enabled[feature.key]));
      controls.appendChild(button);
    } else if (feature.type === 'range') {
      const range = makeElement('input', 'pd2-range');
      range.type = 'range'; range.min = String(feature.config.min); range.max = String(feature.config.max); range.step = String(feature.config.step); range.value = String(this.state.ranges[feature.key]);
      const value = makeElement('span', 'pd2-range-value', `${range.value}${feature.config.unit}`);
      range.addEventListener('input', () => { value.textContent = `${range.value}${feature.config.unit}`; this.setFeature(feature, range.value); });
      controls.append(range, value);
    } else {
      const button = makeElement('button', 'pd2-button');
      button.type = 'button';
      if (feature.type === 'theme') {
        const selected = this.state.theme === feature.config.theme;
        button.textContent = selected ? this.t('selected') : this.t('select');
        button.dataset.active = String(selected);
        button.addEventListener('click', () => this.setFeature(feature, true));
      } else if (feature.type === 'text') {
        button.textContent = this.t('apply');
        button.addEventListener('click', () => {
          try { model.textOutput.value = transformText(feature.config.action, model.textInput.value); }
          catch (error) { this.toast(error.message, 'error'); }
        });
      } else {
        button.textContent = this.t('run');
        button.addEventListener('click', () => this.runAction(feature.config.action));
      }
      controls.appendChild(button);
    }
    card.appendChild(controls);
    return card;
  }

  refreshPanels() {
    for (const model of [...this.models]) {
      if (!model.root.isConnected) { this.clearTimer(model.searchTimer); this.models.delete(model); continue; }
      this.renderFeatures(model);
    }
  }

  rebuildPanels() {
    for (const model of [...this.models]) {
      if (!model.root.isConnected) { this.clearTimer(model.searchTimer); this.models.delete(model); continue; }
      const snapshot = {
        search: model.search?.value || '', category: model.category?.value || '', favoritesOnly: model.favoritesOnly,
        limit: model.limit, textInput: model.textInput?.value || '', textOutput: model.textOutput?.value || ''
      };
      this.clearTimer(model.searchTimer);
      const replacement = this.buildPanel(model.modal, snapshot);
      model.root.replaceWith(replacement);
      this.models.delete(model);
    }
  }

  confirmReset() {
    const apply = () => {
      this.state = this.defaultState();
      this.saveState(true);
      this.applyVisualState();
      this.applyBehaviors();
      this.rebuildPanels();
      this.toast(this.state.locale === 'ru' ? 'Настройки сброшены.' : 'Settings reset.', 'success');
    };
    if (BdApi.UI?.showConfirmationModal) {
      BdApi.UI.showConfirmationModal(this.state.locale === 'ru' ? 'Сброс PowerDiscord' : 'Reset PowerDiscord', this.state.locale === 'ru' ? 'Удалить настройки, заметки и закладки?' : 'Delete settings, notes, and bookmarks?', {
        confirmText: this.state.locale === 'ru' ? 'Сбросить' : 'Reset', cancelText: this.state.locale === 'ru' ? 'Отмена' : 'Cancel', danger: true, onConfirm: apply
      });
    } else if (window.confirm(this.state.locale === 'ru' ? 'Сбросить PowerDiscord?' : 'Reset PowerDiscord?')) apply();
  }
}

PowerDiscord.FEATURE_REGISTRY = FEATURE_REGISTRY;
PowerDiscord.CATEGORY_LABELS = CATEGORY_LABELS;
PowerDiscord.CATALOGS = Object.freeze({
  visual: VISUAL_FEATURES.map(item => item[0]),
  ranges: RANGE_FEATURES.map(item => item[0]),
  themes: THEME_FEATURES.map(item => item[0]),
  text: TEXT_FEATURES.map(item => item[0]),
  actions: ACTION_FEATURES.map(item => item[0]),
  behaviors: BEHAVIOR_FEATURES.map(item => item[0])
});
PowerDiscord.transformText = transformText;
PowerDiscord.UI_TEXT = UI_TEXT;

module.exports = PowerDiscord;
