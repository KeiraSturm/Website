import { settings, chapters, days } from './content.js';
import { element, icon, isReleased, releaseDate, todayKey, readOpened, saveOpened, mountPreview, watchDate, withPreview } from './shared.js';
const calendar = document.getElementById('calendar');
let opened = readOpened();
let expandedDay = null;
const typeLabels = { compliment: 'E CHLINI MOTIVATION', memory: 'E ERINNERIG', photo: 'ES FÖTELI', voucher: 'ZIT ZÄME' };
function updateProgress() {
  const count = days.filter(({ day }) => opened.has(day) && isReleased(day)).length;
  document.getElementById('progress-label').textContent = `${count} vo 24 Momänt entdeckt`;
  document.getElementById('progress-track').setAttribute('aria-valuenow', count);
  document.getElementById('progress-fill').style.width = `${count / 24 * 100}%`;
}
function remember(day) { opened.add(day); saveOpened(opened); updateProgress(); }
function makeContent(entry) {
  const content = element('div', 'day-content');
  if (entry.placeholder) content.append(element('p', 'draft-label', entry.type === 'memory' || entry.type === 'photo' ? 'PLATZ FÜR DIN PERSÖNLICHE INHALT' : 'TEXTENTWURF · WIRD NO PERSÖNLICH'));
  content.append(element('p', 'content-type', typeLabels[entry.type]), element('h4', '', entry.title));
  if (entry.type === 'photo') {
    if (entry.image) {
      const figure = element('figure', 'memory-photo'); const image = element('img');
      image.src = entry.image; image.alt = entry.imageAlt || entry.title; image.loading = 'lazy'; figure.append(image); content.append(figure);
    } else {
      const placeholder = element('div', 'memory-photo-placeholder');
      placeholder.append(icon('heart'), element('span', '', 'Da chunnt es Lieblingsföteli ane.')); content.append(placeholder);
    }
  }
  if (entry.text) content.append(element('p', 'day-text', entry.text));
  if (entry.voucher) {
    const ticket = element('div', 'voucher');
    ticket.append(element('span', 'eyebrow', entry.voucher.label), element('p', 'voucher-title', entry.voucher.title), element('p', 'voucher-detail', entry.voucher.detail), element('span', 'voucher-code', `${entry.voucher.code} · MIT LIEBI`));
    content.append(ticket, element('p', 'voucher-instruction', 'Wenn du Luscht hesch: Zeig mir eifach das Kärtli, denn mached mir öppis ab.'));
  }
  return content;
}
function createCard(entry) {
  const released = isReleased(entry.day); const isToday = releaseDate(entry.day) === todayKey(); const isFinal = entry.type === 'finale';
  const article = element('article', `day-card${released ? ' is-available' : ' is-locked'}${isToday ? ' is-today' : ''}${isFinal ? ' final-card' : ''}${opened.has(entry.day) && released ? ' is-read' : ''}`);
  article.id = `tag-${entry.day}`;
  const button = element(isFinal && released ? 'a' : 'button', 'day-toggle');
  if (button.tagName === 'BUTTON') button.type = 'button';
  button.append(element('span', 'day-number', String(entry.day).padStart(2, '0')));
  const copy = element('span', 'day-card-copy');
  const state = isToday ? 'DIN HÜTIGE MOMÄNT' : released ? (opened.has(entry.day) ? 'SCHÖN, BISCH WIEDER DA' : 'BEREIT FÜR DICH') : `AB EM ${entry.day}. DEZEMBER`;
  copy.append(element('span', 'day-state', state), element('span', 'day-title', released ? entry.title : isFinal ? 'Öppis ganz Bsunders.' : ['Es bitzli Vorfreud.', 'No chlii Geduld.', 'Öpis für dich'][(entry.day - 1) % 3]));
  button.append(copy, icon(released ? (isFinal ? 'arrow' : 'plus') : 'lock', 'day-control-icon'));
  if (!released) {
    button.disabled = true; button.setAttribute('aria-label', `Momänt ${entry.day}, verfügbar ab em ${entry.day}. Dezember ${settings.year}`);
  } else if (isFinal) {
    button.href = withPreview('finale.html'); button.setAttribute('aria-label', 'Momänt 24: Dini letschti Überraschig öffne');
  } else {
    const panel = makeContent(entry); panel.id = `inhalt-${entry.day}`; panel.hidden = true; panel.setAttribute('role', 'region');
    button.id = `oeffne-${entry.day}`; panel.setAttribute('aria-labelledby', button.id);
    button.setAttribute('aria-controls', panel.id); button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      if (!isReleased(entry.day)) { render(); return; }
      const shouldOpen = button.getAttribute('aria-expanded') !== 'true';
      calendar.querySelectorAll('.day-toggle[aria-expanded="true"]').forEach(other => {
        other.setAttribute('aria-expanded', 'false'); document.getElementById(other.getAttribute('aria-controls')).hidden = true; other.closest('.day-card').classList.remove('is-expanded');
      });
      panel.hidden = !shouldOpen; button.setAttribute('aria-expanded', String(shouldOpen)); article.classList.toggle('is-expanded', shouldOpen); expandedDay = shouldOpen ? entry.day : null;
      if (shouldOpen) { remember(entry.day); article.classList.add('is-read'); if (!isToday) button.querySelector('.day-state').textContent = 'SCHÖN, BISCH WIEDER DA'; }
    });
    article.append(button, panel);
    if (expandedDay === entry.day) { panel.hidden = false; button.setAttribute('aria-expanded', 'true'); article.classList.add('is-expanded'); }
    return article;
  }
  article.append(button); return article;
}
function render() {
  const focusedDay = document.activeElement?.closest('.day-card')?.id;
  calendar.replaceChildren();
  for (const chapter of chapters) {
    const section = element('section', 'chapter'); section.setAttribute('aria-labelledby', `chapter-${chapter.from}`);
    const heading = element('div', 'chapter-heading'); heading.append(element('span', 'chapter-range', `${String(chapter.from).padStart(2, '0')} — ${String(chapter.to).padStart(2, '0')}`));
    const title = element('h3', '', chapter.title); title.id = `chapter-${chapter.from}`;
    heading.append(title, element('p', '', chapter.note)); const grid = element('div', 'chapter-grid');
    days.filter(entry => entry.day >= chapter.from && entry.day <= chapter.to).forEach(entry => grid.append(createCard(entry)));
    section.append(heading, grid); calendar.append(section);
  }
  const today = todayKey(); const status = document.getElementById('calendar-status'); const availability = document.getElementById('availability-note'); const link = document.getElementById('today-link');
  if (today < releaseDate(1)) {
    status.textContent = 'Am 1. Dezember gahts los. Bis denn: es bitzli Vorfreud. ♡'; availability.textContent = 'Dis erschte Kärtli gaht am 1. Dezember 2026 uf.'; link.href = '#momente'; link.firstChild.textContent = 'Dini Momänt entdecke ';
  } else if (today > releaseDate(24)) {
    status.textContent = 'Alli 24 Momänt sind jetzt für dich da. Zum Immer-wieder-Aaluege.'; availability.textContent = 'Dini chliini Sammlig. Zum Bhalte und Wiederentdecke.'; link.href = '#momente'; link.firstChild.textContent = 'Dini Sammlig aaluege ';
  } else {
    const day = Number(today.slice(-2)); status.textContent = `Hüt isch de ${day}. Dezember. Dis Kärtli wartet uf dich. ♡`; availability.textContent = 'Jede Tag ab Mitternacht · nach Schwiizer Ziit'; link.href = `#tag-${day}`; link.firstChild.textContent = 'Dini hütigi Überraschig ';
  }
  updateProgress();
  if (focusedDay) document.querySelector(`#${focusedDay} .day-toggle`)?.focus({ preventScroll: true });
}
function loadHeroPhoto() {
  document.querySelector('.hero-photo figcaption').textContent = settings.heroCaption;
  if (!settings.heroPhoto) return;
  const image = element('img'); image.src = settings.heroPhoto; image.alt = settings.heroPhotoAlt; image.fetchPriority = 'high';
  const surface = document.getElementById('hero-photo-surface'); image.addEventListener('load', () => surface.replaceChildren(image), { once: true });
}
mountPreview(); loadHeroPhoto(); render(); watchDate(render);
window.addEventListener('pageshow', () => { opened = readOpened(); render(); });
window.addEventListener('storage', () => { opened = readOpened(); render(); });
