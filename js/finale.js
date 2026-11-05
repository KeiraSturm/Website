import { finale } from './content.js';
import { element, icon, isReleased, mountPreview, readOpened, saveOpened, watchDate, withPreview } from './shared.js';
const reveal = document.getElementById('finale-reveal');
function render() {
  const released = isReleased(24);
  document.getElementById('finale-locked').hidden = released; reveal.hidden = !released;
  if (!released || reveal.childElementCount) return;
  reveal.append(element('p', 'eyebrow', finale.eyebrow));
  const title = element('h1', '', `${finale.title} `); title.append(element('em', '', finale.titleAccent));
  reveal.append(title, element('p', 'finale-intro', finale.intro));
  const art = element('div', 'camera-art'); art.append(element('span', 'camera-ornament heart-one', '♡'), icon('camera', 'camera-drawing'), element('span', 'camera-ornament star-two', '✦'), element('span', 'camera-art-note handwritten', 'für din Blick uf d Wält.'));
  reveal.append(art, element('h2', '', finale.gift), element('p', 'finale-text', finale.text), element('p', 'finale-text', finale.closing), element('p', 'finale-signature handwritten', finale.signature));
  if (finale.placeholder) reveal.append(element('p', 'draft-label', 'TEXTENTWURF · WIRD NO PERSÖNLICH'));
  const back = element('a', 'button button-dark', 'All dini Momänt nomal aaluege'); back.href = withPreview('./#momente'); reveal.append(back);
  const opened = readOpened(); opened.add(24); saveOpened(opened); document.title = 'Für all die Erinnerige · Für Mili';
}
mountPreview(); document.querySelectorAll('[data-home-link]').forEach(link => { link.href = withPreview(link.getAttribute('href')); });
render(); watchDate(render);
