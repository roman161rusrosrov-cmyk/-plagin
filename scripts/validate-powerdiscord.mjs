#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.basename(here) === 'scripts' ? path.resolve(here, '..') : here;
const candidates = [
  path.join(root, 'src', 'PowerDiscord.plugin.js'),
  path.join(root, 'PowerDiscord.plugin.js')
];
const sourcePath = candidates.find(candidate => fs.existsSync(candidate));
assert(sourcePath, 'Не найден PowerDiscord.plugin.js');

const require = createRequire(import.meta.url);
const Plugin = require(sourcePath);
const source = fs.readFileSync(sourcePath, 'utf8');
const features = Plugin.FEATURE_REGISTRY;
const categories = Plugin.CATEGORY_LABELS;
const allowedHandlers = Plugin.HANDLER_TYPES;
const catalogs = Plugin.CATALOGS;

assert.equal(typeof Plugin, 'function', 'Плагин должен экспортировать класс');
for (const method of ['start', 'stop', 'getSettingsPanel']) {
  assert.equal(typeof Plugin.prototype[method], 'function', `Нет lifecycle-метода ${method}`);
}
assert(Array.isArray(features), 'Реестр функций должен быть массивом');
assert(features.length >= 500, 'В реестре должно быть не менее 500 функций');

const ids = new Set();
const keys = new Set();
const names = new Set();
const handlerCounts = {};
for (const [index, feature] of features.entries()) {
  assert.equal(feature.id, index + 1, `Нарушена нумерация около ${feature.key}`);
  assert(Number.isInteger(feature.id) && feature.id > 0, 'Некорректный ID функции');
  assert.match(feature.key, /^[a-z0-9_]+$/, `Некорректный ключ ${feature.key}`);
  assert(feature.name?.trim(), `Нет имени у ${feature.key}`);
  assert(feature.description?.trim(), `Нет описания у ${feature.key}`);
  assert(categories[feature.category], `Неизвестная категория ${feature.category}`);
  assert(allowedHandlers.has(feature.handler), `Неизвестный handler ${feature.handler}`);
  assert(feature.config && typeof feature.config === 'object', `Нет config у ${feature.key}`);
  assert.equal(feature.localOnly, true, `${feature.key} не отмечена как локальная`);
  assert(!ids.has(feature.id), `Повтор ID ${feature.id}`);
  assert(!keys.has(feature.key), `Повтор ключа ${feature.key}`);
  assert(!names.has(feature.name), `Повтор имени ${feature.name}`);
  ids.add(feature.id);
  keys.add(feature.key);
  names.add(feature.name);
  handlerCounts[feature.handler] = (handlerCounts[feature.handler] || 0) + 1;

  if (feature.handler === 'toggle') {
    assert(feature.config.selector?.trim(), `Нет CSS-селектора у ${feature.key}`);
    assert(feature.config.declaration?.trim(), `Нет CSS-декларации у ${feature.key}`);
  }
  if (feature.handler === 'range') {
    const config = feature.config;
    assert.match(config.variable, /^--pd-[a-z0-9-]+$/, `Некорректная CSS-переменная у ${feature.key}`);
    assert(Number.isFinite(config.min) && Number.isFinite(config.max), `Нет границ у ${feature.key}`);
    assert(config.min <= config.defaultValue && config.defaultValue <= config.max, `Default вне границ у ${feature.key}`);
    assert(config.step > 0, `Некорректный шаг у ${feature.key}`);
  }
}

const expectedCounts = Object.freeze({
  toggle: 250,
  range: 30,
  theme: 20,
  preset: 20,
  text: 60,
  'context-action': 60,
  utility: 50,
  system: 30,
  behavior: 10
});
assert.deepEqual(handlerCounts, expectedCounts, 'Нарушена заявленная структура 530 функций');

const actionCatalogs = Object.freeze([
  ['text', 'text', 'action'],
  ['presets', 'preset', 'preset'],
  ['utility', 'utility', 'action'],
  ['system', 'system', 'action'],
  ['behaviors', 'behavior', 'behavior']
]);
for (const [catalogName, handlerName, field] of actionCatalogs) {
  const list = features.filter(feature => feature.handler === handlerName).map(feature => feature.config[field]);
  assert.deepEqual(list, catalogs[catalogName], `Каталог ${catalogName} не соответствует реестру`);
}
assert.deepEqual(
  features.filter(feature => feature.handler === 'theme').map(feature => feature.key.replace(/^theme_/, '')),
  catalogs.themes,
  'Каталог themes не соответствует реестру'
);
assert.equal(catalogs.messages.length, 30, 'Должно быть 30 действий с сообщениями');
assert.equal(catalogs.media.length, 30, 'Должно быть 30 действий с медиа');
const contextFeatures = features.filter(feature => feature.handler === 'context-action');
assert.equal(contextFeatures.filter(feature => feature.config.scope === 'message').length, 30);
assert.equal(contextFeatures.filter(feature => feature.config.scope === 'media').length, 30);

for (const catalogName of ['text', 'messages', 'media', 'utility', 'system']) {
  for (const action of catalogs[catalogName]) {
    const escaped = action.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const implemented = new RegExp(`(?:case\\s+['\"]${escaped}['\"]|action\\s*===\\s*['\"]${escaped}['\"]|^\\s*${escaped}:\\s*\\[)`, 'm').test(source)
      || (catalogName === 'utility' && action.startsWith('timer_') && source.includes("action.startsWith('timer_')"));
    assert(implemented, `Нет реализации ${catalogName}:${action}`);
  }
}
for (const behavior of catalogs.behaviors) {
  assert(source.includes(`'${behavior}'`), `Нет реализации поведения ${behavior}`);
}
for (const preset of catalogs.presets) {
  const escaped = preset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  assert(new RegExp(`^\\s*${escaped}:\\s*\\{`, 'm').test(source), `Нет реализации пресета ${preset}`);
}

const dangerousPatterns = [
  [/\brequire\s*\(\s*['\"](?:child_process|net|tls|http|https)['\"]/, 'опасный Node-модуль'],
  [/\beval\s*\(/, 'eval'],
  [/\bnew\s+Function\s*\(/, 'new Function'],
  [/\bgetToken\s*\(/, 'доступ к токену'],
  [/\bXMLHttpRequest\b/, 'XMLHttpRequest'],
  [/\bfetch\s*\(/, 'fetch'],
  [/\bBdApi\.(?:Net|Webpack)\b/, 'закрытый BetterDiscord API'],
  [/DeletedMessageTracker|MessageEditHistory/i, 'журнал удалённых/изменённых сообщений'],
  [/\bTODO\b|\bFIXME\b/, 'незавершённый участок']
];
for (const [pattern, label] of dangerousPatterns) {
  assert(!pattern.test(source), `Обнаружено запрещённое: ${label}`);
}

const samples = {
  json_pretty: '{"готово":true}',
  json_minify: '{ "готово": true }',
  url_decode: '%D1%82%D0%B5%D1%81%D1%82',
  base64_decode: '0YLQtdGB0YI=',
  html_unescape: '&lt;b&gt;тест&lt;/b&gt;'
};
for (const action of catalogs.text) {
  const input = samples[action] || '  Привет, Мир!  \nСтрока 2 https://example.com #тест @друг  ';
  const output = Plugin.transformText(action, input);
  assert.equal(typeof output, 'string', `Текстовый обработчик ${action} вернул не строку`);
}

const report = {
  plugin: 'PowerDiscord',
  version: source.match(/@version\s+([^\s]+)/)?.[1] || 'unknown',
  generatedAt: new Date().toISOString(),
  source: path.relative(root, sourcePath),
  sourceBytes: Buffer.byteLength(source),
  featureCount: features.length,
  categoryCount: Object.keys(categories).length,
  handlerCounts,
  uniqueIds: ids.size,
  uniqueKeys: keys.size,
  uniqueNames: names.size,
  textTransformsExecuted: catalogs.text.length,
  forbiddenPatternChecks: dangerousPatterns.length,
  status: 'ok'
};

if (process.argv.includes('--write-docs')) {
  const docsDir = path.join(root, 'docs');
  fs.mkdirSync(docsDir, {recursive: true});
  const rows = features.map(feature =>
    `| ${feature.id} | \`${feature.key}\` | ${categories[feature.category]} | ${feature.name.replace(/\|/g, '\\|')} | \`${feature.handler}\` |`
  );
  const markdown = [
    '# Каталог функций PowerDiscord',
    '',
    `Автоматически проверено функций: **${features.length}**. Категорий: **${Object.keys(categories).length}**.`,
    '',
    '> Все функции локальны. PowerDiscord не читает токен, не отправляет данные в сеть и не сохраняет содержимое чужих сообщений.',
    '',
    '## Сводка',
    '',
    '| Обработчик | Количество |',
    '|---|---:|',
    ...Object.entries(handlerCounts).map(([handler, count]) => `| \`${handler}\` | ${count} |`),
    '',
    '## Полный реестр',
    '',
    '| № | Ключ | Категория | Название | Обработчик |',
    '|---:|---|---|---|---|',
    ...rows,
    ''
  ].join('\n');
  fs.writeFileSync(path.join(docsDir, 'POWERDISCORD_FEATURES_RU.md'), markdown);
  fs.writeFileSync(path.join(docsDir, 'powerdiscord-validation.json'), JSON.stringify(report, null, 2) + '\n');
}

console.log(JSON.stringify(report, null, 2));
