import { settings } from './content.js';

export function dateKeyAt(date = new Date(), timeZone = settings.timeZone) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date);
  const get = type => parts.find(part => part.type === type).value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}
export function releaseDate(day) {
  return `${settings.year}-${String(settings.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
export const isLocal = ['localhost', '127.0.0.1', '[::1]'].includes(globalThis.location?.hostname);
const requestedPreview = isLocal ? new URLSearchParams(globalThis.location.search).get('preview') : null;
function validDateKey(key) {
  if (!key || !/^\d{4}-\d{2}-\d{2}$/.test(key)) return false;
  const parsed = new Date(`${key}T12:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === key;
}
export const previewDate = validDateKey(requestedPreview) ? requestedPreview : null;
export const todayKey = () => previewDate || dateKeyAt();
export const isReleased = (day, dateKey = todayKey()) => dateKey >= releaseDate(day);
export const storageKey = previewDate ? 'mili.preview.opened.v1' : `mili.opened.${settings.year}.v1`;
export function readOpened() {
  try {
    const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return new Set(Array.isArray(data) ? data.filter(day => Number.isInteger(day) && day >= 1 && day <= 24) : []);
  } catch { return new Set(); }
}
export function saveOpened(opened) {
  try { localStorage.setItem(storageKey, JSON.stringify([...opened])); } catch { /* Calendar works without storage. */ }
}
export function withPreview(path) {
  if (!previewDate) return path;
  const url = new URL(path, globalThis.location.href);
  url.searchParams.set('preview', previewDate);
  return `${url.pathname}${url.search}${url.hash}`;
}
export function mountPreview() {
  if (!isLocal) return;
  const bar = document.getElementById('preview-bar');
  if (!bar) return;
  bar.hidden = false;
  const label = document.createElement('label');
  label.htmlFor = 'preview-date'; label.textContent = 'Lokali Vorschau';
  const select = document.createElement('select'); select.id = 'preview-date';
  const options = [['', 'Echtzit'], [releaseDate(1), '1. Dezember'], [releaseDate(12), '12. Dezember'], [releaseDate(24), 'Alli 24 Täg']];
  if (previewDate && !options.some(([value]) => value === previewDate)) options.push([previewDate, previewDate]);
  for (const [value, text] of options) {
    const option = new Option(text, value); option.selected = value === (previewDate || ''); select.add(option);
  }
  select.addEventListener('change', () => {
    const url = new URL(location.href);
    if (select.value) url.searchParams.set('preview', select.value); else url.searchParams.delete('preview');
    location.assign(url.href);
  });
  const note = document.createElement('span'); note.textContent = 'Nur uf dim Computer sichtbar · Bispielinhalt';
  bar.append(label, select, note);
}
export function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
export const icons = {
  lock: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="6" y="10" width="12" height="10" rx="3"/><path d="M9 10V7a3 3 0 0 1 6 0v3"/><path d="M12 14v2"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 5.5c-2-2.5-6-1.5-8 1-2-2.5-6-3.5-8-1-4 5 4 11 8 14 4-3 12-9 8-14Z"/></svg>',
  camera: '<svg viewBox="0 0 300 200" fill="none" aria-hidden="true"><rect x="29" y="51" width="242" height="123" rx="18"/><path d="M29 83h242M29 145h242M55 51V37h43v14M191 51V38h49v13"/><circle cx="148" cy="113" r="49"/><circle cx="148" cy="113" r="35"/><path d="M130 90c-10 5-15 15-13 25"/><rect x="215" y="63" width="28" height="16" rx="4"/><circle cx="65" cy="111" r="7"/><path d="M69 174v9m158-9v9"/></svg>',
};
export function icon(name, className = '') {
  const span = element('span', `icon ${className}`.trim()); span.innerHTML = icons[name] || icons.heart; return span;
}
export function watchDate(onChange) {
  let previous = todayKey();
  const check = () => { const current = todayKey(); if (current !== previous) { previous = current; onChange(); } };
  setInterval(check, 30_000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
}
