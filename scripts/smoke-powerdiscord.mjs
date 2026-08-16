#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.basename(here) === 'scripts' ? path.resolve(here, '..') : here;
const sourcePath = [path.join(rootDir, 'src', 'PowerDiscord.plugin.js'), path.join(rootDir, 'PowerDiscord.plugin.js')].find(fs.existsSync);
assert(sourcePath, 'Не найден PowerDiscord.plugin.js');

class FakeClassList {
  constructor() { this.values = new Set(); }
  add(...values) { values.forEach(value => this.values.add(value)); }
  remove(...values) { values.forEach(value => this.values.delete(value)); }
  toggle(value, force) {
    const enabled = force === undefined ? !this.values.has(value) : Boolean(force);
    enabled ? this.values.add(value) : this.values.delete(value);
    return enabled;
  }
  contains(value) { return this.values.has(value); }
}

class FakeStyle {
  setProperty(key, value) { this[key] = value; }
  removeProperty(key) { delete this[key]; }
}

class FakeElement {
  constructor(tag = 'div') {
    this.tagName = tag.toUpperCase();
    this.children = [];
    this.classList = new FakeClassList();
    this.style = new FakeStyle();
    this.dataset = {};
    this.attributes = {};
    this.isConnected = true;
    this.textContent = '';
    this.value = '';
    this.id = '';
  }
  set className(value) { this._className = value; value.split(/\s+/).filter(Boolean).forEach(item => this.classList.add(item)); }
  get className() { return this._className || ''; }
  append(...nodes) { this.children.push(...nodes); }
  appendChild(node) { this.children.push(node); return node; }
  replaceChildren(...nodes) { this.children = [...nodes]; }
  replaceWith() { this.isConnected = false; }
  remove() { this.isConnected = false; }
  click() { this.clickCount = (this.clickCount || 0) + 1; }
  addEventListener() {}
  removeEventListener() {}
  setAttribute(key, value) { this.attributes[key] = String(value); }
  getAttribute(key) { return this.attributes[key] || null; }
  querySelector() { return null; }
  querySelectorAll() { return []; }
  closest() { return null; }
  matches() { return false; }
  contains(node) { return node === this || this.children.includes(node); }
}

class FakeTextArea extends FakeElement {
  constructor() { super('textarea'); }
}

globalThis.Element = FakeElement;
globalThis.HTMLElement = FakeElement;
globalThis.HTMLTextAreaElement = FakeTextArea;

const documentElement = new FakeElement('html');
const body = new FakeElement('body');
globalThis.document = {
  documentElement,
  body,
  hidden: false,
  createElement: tag => tag === 'textarea' ? new FakeTextArea() : new FakeElement(tag),
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  addEventListener() {},
  removeEventListener() {},
  hasFocus: () => true,
  execCommand: () => true
};
globalThis.window = {innerWidth: 1280, innerHeight: 800, addEventListener() {}, removeEventListener() {}, confirm: () => true, prompt: () => '', alert() {}};
globalThis.location = {pathname: '/channels/1/2', href: 'https://discord.com/channels/1/2'};
globalThis.getComputedStyle = () => ({position: 'relative'});

let nextFrame = 0;
const frames = new Map();
globalThis.requestAnimationFrame = callback => {
  const id = ++nextFrame;
  frames.set(id, setTimeout(() => { frames.delete(id); callback(Date.now()); }, 0));
  return id;
};
globalThis.cancelAnimationFrame = id => { clearTimeout(frames.get(id)); frames.delete(id); };
globalThis.MutationObserver = class { observe() {} disconnect() {} };
globalThis.ResizeObserver = class { observe() {} disconnect() {} };
Object.defineProperty(globalThis.navigator, 'clipboard', {value: {writeText: async () => {}}, configurable: true});

let stored = null;
let saveCount = 0;
const alerts = [];
globalThis.BdApi = {
  DOM: {addStyle() {}, removeStyle() {}},
  Data: {load: () => stored, save: (_plugin, _key, value) => { saveCount++; stored = structuredClone(value); }},
  UI: {showToast() {}, showConfirmationModal() {}, alert: (title, content) => alerts.push([title, content])},
  Logger: {error() {}}
};

const require = createRequire(import.meta.url);
const Plugin = require(sourcePath);
const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const plugin = new Plugin();

plugin.start();
await wait(8);
assert.equal(Plugin.FEATURE_REGISTRY.length, 100);
assert.equal(plugin.getVersion(), '3.1.0');
for (const key of ['action_chat_health_check', 'action_download_media', 'action_download_avatar', 'hide_inaccessible_channels', 'hide_animated_media', 'readable_font']) {
  assert(Plugin.FEATURE_REGISTRY.some(feature => feature.key === key), `Нет ${key}`);
}

const previousBatches = plugin.domBatchCount;
const branch = new FakeElement();
for (let index = 0; index < 20; index++) plugin.queueDomRoot(branch);
await wait(8);
assert.equal(plugin.domBatchCount, previousBatches + 1, 'DOM-обновления не объединены в один кадр');

const radius = Plugin.FEATURE_REGISTRY.find(feature => feature.key === 'corner_radius');
for (let value = 1; value <= 20; value++) plugin.setFeature(radius, value);
await wait(260);
assert.equal(saveCount, 1, 'Движения ползунка создали больше одной записи Data.save');

const dense = Plugin.FEATURE_REGISTRY.find(feature => feature.key === 'dense_spacing');
plugin.state.enabled.comfortable_spacing = true;
plugin.setFeature(dense, true);
assert.equal(plugin.state.enabled.comfortable_spacing, false, 'Конфликтующие интервалы включены одновременно');

const panel = plugin.buildPanel(false);
const panelModel = [...plugin.models].find(model => model.root === panel);
assert(panelModel);
assert.equal(panelModel.grid.children.length, 33, 'Ожидались 32 карточки и кнопка подгрузки');
const walk = node => [node, ...(node?.children || []).flatMap(walk)];
assert(walk(panel).some(node => node?.classList?.contains('pd2-pinned')), 'Нет закреплённой панели чата');

const pre = new FakeElement('pre');
const code = new FakeElement('code');
code.textContent = 'первая\nвторая\nтретья';
pre.matches = selector => selector === 'pre';
pre.closest = () => new FakeElement('div');
pre.querySelector = selector => {
  if (selector === 'code') return code;
  if (selector === ':scope > .pd2-code-lines') return pre.children.find(node => node.classList?.contains('pd2-code-lines')) || null;
  if (selector === ':scope > .pd2-code-copy') return pre.children.find(node => node.classList?.contains('pd2-code-copy')) || null;
  return null;
};
plugin.addCodeCopyButtons(pre);
assert.equal(pre.children.find(node => node.classList.contains('pd2-code-lines'))?.textContent, '1\n2\n3', 'Нумерация кода неверна');
assert(pre.children.some(node => node.classList.contains('pd2-code-copy')), 'Нет кнопки копирования кода');

plugin.showResult('Тест', 'Строковый результат');
assert.equal(typeof alerts[0]?.[1], 'string', 'BdApi.UI.alert получил неподдерживаемый тип контента');

const originalDocumentQuery = document.querySelector;
const originalDocumentQueryAll = document.querySelectorAll;
let voiceClicks = 0;
const voiceButton = new FakeElement('button');
voiceButton.setAttribute('aria-label', 'Mute');
voiceButton.click = () => { voiceClicks++; };
document.querySelector = selector => selector === '[class*="panels_"]' ? {querySelectorAll: () => [voiceButton]} : null;
let voicePrevented = false;
plugin.handleHotkey({repeat: false, altKey: true, shiftKey: true, ctrlKey: false, code: 'KeyM', preventDefault: () => { voicePrevented = true; }});
assert.equal(voiceClicks, 1, 'Голосовая горячая клавиша не нажала видимую кнопку');
assert.equal(voicePrevented, true);

const makeChatRow = text => ({
  isConnected: true,
  hidden: false,
  classList: new FakeClassList(),
  closest: () => null,
  querySelector: () => ({textContent: text}),
  querySelectorAll: selector => selector === 'a[href]' ? [{getAttribute: () => 'https://example.com'}] : []
});
document.querySelectorAll = selector => selector === 'li[id^="chat-messages-"]'
  ? [makeChatRow('Тест чата'), makeChatRow('Тест чата')]
  : [];
const savesBeforeChatCheck = saveCount;
const chatStats = plugin.chatHealthCheck();
assert.equal(chatStats.messages, 2);
assert.equal(chatStats.duplicates, 1);
assert.match(alerts.at(-1)?.[1] || '', /не сохраняется/i);
assert.equal(saveCount, savesBeforeChatCheck, 'Чек чата записал данные в хранилище');

const avatar = new FakeElement('img');
avatar.currentSrc = 'https://cdn.discordapp.com/avatars/example/avatar.png';
plugin.lastAvatar = avatar;
await plugin.runAction('download_avatar');
assert.equal(document.body.children.at(-1)?.download?.endsWith('.png'), true, 'Аватар не подготовлен к сохранению');
document.querySelector = originalDocumentQuery;
document.querySelectorAll = originalDocumentQueryAll;

plugin.applyPreset('performance');
assert.equal(plugin.observer, null, 'Лёгкий режим не отключил observer-зависимые функции');
assert.equal(plugin.state.enabled.behavior_composer_counter, false);
plugin.applyPreset('comfort');

const savesBeforeStop = saveCount;
plugin.stop();
assert.equal(plugin.running, false);
assert.equal(saveCount, savesBeforeStop, 'Выключение создало лишнюю запись без изменений');

console.log(JSON.stringify({
  status: 'ok',
  features: Plugin.FEATURE_REGISTRY.length,
  domBatching: true,
  debouncedStorage: true,
  lazyCards: 32,
  presets: true,
  chatCheck: true,
  mediaSave: true,
  codeLineNumbers: true,
  pinnedTools: true,
  voiceHotkeys: true,
  lifecycle: true
}, null, 2));
