#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.basename(here) === 'scripts' ? path.resolve(here, '..') : here;
const sourcePath = [path.join(root, 'src', 'PowerDiscord.plugin.js'), path.join(root, 'PowerDiscord.plugin.js')].find(fs.existsSync);
assert(sourcePath, 'Не найден PowerDiscord.plugin.js');

const require = createRequire(import.meta.url);
const Plugin = require(sourcePath);
const source = fs.readFileSync(sourcePath, 'utf8');
const features = Plugin.FEATURE_REGISTRY;
const catalogs = Plugin.CATALOGS;
const categories = Plugin.CATEGORY_LABELS;

assert.equal(typeof Plugin, 'function', 'Экспорт должен быть классом');
for (const method of ['start', 'stop', 'getSettingsPanel']) assert.equal(typeof Plugin.prototype[method], 'function', `Нет lifecycle-метода ${method}`);
assert.equal(features.length, 100, 'В PowerDiscord v2 должно быть ровно 100 функций');

const ids = new Set();
const keys = new Set();
const namesRu = new Set();
const namesEn = new Set();
const typeCounts = {};
for (const [index, feature] of features.entries()) {
  assert.equal(feature.id, index + 1, `Нарушена нумерация у ${feature.key}`);
  assert.match(feature.key, /^[a-z0-9_]+$/, `Некорректный ключ ${feature.key}`);
  assert(categories[feature.category], `Неизвестная категория ${feature.category}`);
  assert(feature.name?.ru?.trim(), `Нет русского имени у ${feature.key}`);
  assert(feature.name?.en?.trim(), `Нет английского имени у ${feature.key}`);
  assert(!ids.has(feature.id), `Повтор ID ${feature.id}`);
  assert(!keys.has(feature.key), `Повтор ключа ${feature.key}`);
  assert(!namesRu.has(feature.name.ru), `Повтор русского имени ${feature.name.ru}`);
  assert(!namesEn.has(feature.name.en), `Повтор английского имени ${feature.name.en}`);
  ids.add(feature.id); keys.add(feature.key); namesRu.add(feature.name.ru); namesEn.add(feature.name.en);
  typeCounts[feature.type] = (typeCounts[feature.type] || 0) + 1;
  if (feature.type === 'toggle') {
    assert(feature.config.selector?.trim(), `Нет селектора у ${feature.key}`);
    assert(feature.config.declaration?.trim(), `Нет CSS у ${feature.key}`);
  }
  if (feature.type === 'range') {
    const config = feature.config;
    assert.match(config.variable, /^--pd2-[a-z0-9-]+$/, `Некорректная CSS-переменная у ${feature.key}`);
    assert(Number.isFinite(config.min) && Number.isFinite(config.max) && config.min < config.max, `Некорректные границы у ${feature.key}`);
    assert(config.defaultValue >= config.min && config.defaultValue <= config.max, `Default вне границ у ${feature.key}`);
    assert(config.step > 0, `Некорректный шаг у ${feature.key}`);
  }
  if (feature.type === 'theme') assert.equal(feature.config.palette.length, 6, `Неполная палитра у ${feature.key}`);
}

const expectedCounts = {toggle: 40, range: 10, theme: 10, text: 15, action: 20, behavior: 5};
assert.deepEqual(typeCounts, expectedCounts, 'Нарушена структура реестра 100 функций');
assert.equal(catalogs.visual.length, 40);
assert.equal(catalogs.ranges.length, 10);
assert.equal(catalogs.themes.length, 10);
assert.equal(catalogs.text.length, 15);
assert.equal(catalogs.actions.length, 20);
assert.equal(catalogs.behaviors.length, 5);

const samples = {json_pretty: '{"фиолетовый":true}'};
for (const action of catalogs.text) {
  const output = Plugin.transformText(action, samples[action] || '  Привет, Мир!  \nСтрока 2  ');
  assert.equal(typeof output, 'string', `Текстовый обработчик ${action} вернул не строку`);
}
for (const action of catalogs.actions) {
  const escaped = action.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  assert(new RegExp(`case\\s+['\"]${escaped}['\"]`).test(source), `Нет реализации action:${action}`);
}

const forbidden = [
  [/\brequire\s*\(\s*['\"](?:child_process|net|tls|http|https)['\"]/, 'опасный Node-модуль'],
  [/\beval\s*\(/, 'eval'],
  [/\bnew\s+Function\s*\(/, 'new Function'],
  [/\bgetToken\s*\(/, 'доступ к токену'],
  [/\bdocument\.cookie\b/, 'cookies'],
  [/\bXMLHttpRequest\b/, 'XMLHttpRequest'],
  [/\bfetch\s*\(/, 'сетевой fetch'],
  [/\bBdApi\.(?:Net|Webpack)\b/, 'закрытый BetterDiscord API'],
  [/\bTODO\b|\bFIXME\b/, 'незавершённый участок']
];
for (const [pattern, label] of forbidden) assert(!pattern.test(source), `Обнаружено запрещённое: ${label}`);

for (const cleanupMarker of ['cleanupBehaviors', 'clearListeners', 'restoreMedia', 'BdApi.DOM.removeStyle']) {
  assert(source.includes(cleanupMarker), `Нет очистки ресурса: ${cleanupMarker}`);
}

const report = {
  plugin: 'PowerDiscord',
  version: source.match(/@version\s+([^\s]+)/)?.[1] || 'unknown',
  generatedAt: new Date().toISOString(),
  sourceBytes: Buffer.byteLength(source),
  featureCount: features.length,
  categoryCount: Object.keys(categories).length,
  typeCounts,
  uniqueIds: ids.size,
  uniqueKeys: keys.size,
  bilingualNames: namesRu.size === 100 && namesEn.size === 100,
  textTransformsExecuted: catalogs.text.length,
  forbiddenPatternChecks: forbidden.length,
  status: 'ok'
};

if (process.argv.includes('--write-docs')) {
  const docsDir = path.join(root, 'docs');
  fs.mkdirSync(docsDir, {recursive: true});
  const rows = features.map(feature => `| ${feature.id} | \`${feature.key}\` | ${categories[feature.category].ru} | ${feature.name.ru.replace(/\|/g, '\\|')} | ${feature.name.en.replace(/\|/g, '\\|')} | \`${feature.type}\` |`);
  const markdown = [
    '# PowerDiscord 2.0 — каталог 100 функций', '',
    'Полностью переработанная фиолетовая версия. Реестр содержит ровно **100** безопасных локальных функций.', '',
    '> Плагин работает только с уже доступными элементами интерфейса, не раскрывает закрытые каналы и не сохраняет содержимое чужих сообщений.', '',
    '## Сводка', '', '| Тип | Количество |', '|---|---:|',
    ...Object.entries(typeCounts).map(([type, count]) => `| \`${type}\` | ${count} |`), '',
    '## Полный реестр', '', '| № | Ключ | Категория | Русское название | English name | Тип |', '|---:|---|---|---|---|---|', ...rows, ''
  ].join('\n');
  fs.writeFileSync(path.join(docsDir, 'POWERDISCORD_FEATURES_RU.md'), markdown);
  fs.writeFileSync(path.join(docsDir, 'powerdiscord-validation.json'), JSON.stringify(report, null, 2) + '\n');
}

console.log(JSON.stringify(report, null, 2));
