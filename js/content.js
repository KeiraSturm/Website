// HIER PERSONALISIEREN: Texte und Bilder gesammelt an einem Ort.
// Bilder in assets/images/ ablegen und den relativen Pfad eintragen.
// placeholder: false setzen, sobald der persönliche Inhalt fertig ist.
export const settings = {
  name: 'Mili', year: 2026, month: 12, timeZone: 'Europe/Zurich',
  heroPhoto: 'assets/images/hero-mili-und-ich.jpg',
  heroPhotoAlt: 'Mili und ich, e gemeinsame Erinnerig',
  heroCaption: 'du & ich. und alles, wo no chunnt.',
};

export const chapters = [
  { title: 'Zum Afang.', note: 'Eifach schön, bisch du do.', from: 1, to: 6 },
  { title: 'Fürs Herz.', note: 'Chlini Sache, wo guet tüend.', from: 7, to: 12 },
  { title: 'Du & ich.', note: 'Zit für Erinnerige. Und neui Plän.', from: 13, to: 18 },
  { title: 'Und alles, wo no wird cho.', note: 'S Schönschte kummt erst no.', from: 19, to: 24 },
];

export const days = [
  { day: 1, type: 'compliment', title: 'Schön, dass es dich git.', text: 'Ich bi sooo dankbar, dass ich dich döff kenne und mir scho so vieli schöni Erinnerige zämme hend döffe mache. Blib so wie du bisch.', placeholder: true },
  { day: 2, type: 'memory', title: 'Weisch no …?', text: 'Wo mir uns bim Abschied am letzte Tag vo de Primar no gseit hend, "viellicht kömme mir jo zämme in d Klass" und denn hemmer plötzlich no 3 wiiteri Johr döffe mitenander verbringe. Und sie hette nit könne schöner si.', placeholder: true },
  { day: 3, type: 'compliment', title: 'Dis eigete Tempo.', text: 'Du muesch mit niemerem mithalte. Din Wäg derf sich so afühle, wie er für dich stimmt.', placeholder: true },
  { day: 4, type: 'memory', title: 'En Momänt zum Bhalte.', text: 'Da isch Platz für e chliini Gschicht, wo das Bild für dich bsunders macht.', placeholder: true },
  { day: 5, type: 'voucher', title: 'Hüt lad ich dich ii.', text: 'Es feins Esse, ganz vill Ziit zum Plaudere und kei Blick uf d Uhr.', voucher: { label: 'GUTSCHIIN', title: 'Zäme go ässe.', detail: 'Du wählsch, wo. Ich lad dich ii.', code: 'MILI-05' }, placeholder: true },
  { day: 6, type: 'compliment', title: 'E chliini Erinnerig.', text: 'Au chliini Schritt sind Schritt vorwärts. Du derfsch stolz uf dich sii.', placeholder: true },
  { day: 7, type: 'memory', title: 'Das vergiss ich nöd.', text: 'Da isch Platz für en gemeinsame Momänt, wo dir bsunders i Erinnerig blibe isch.', placeholder: true },
  { day: 8, type: 'compliment', title: 'Meh als gnueg.', text: 'Din Wert hängt nöd devo ab, wie produktiv din Tag gsi isch. Du bisch au a ruige Täg gnueg.', placeholder: true },
  { day: 9, type: 'photo', title: 'Mir zwei, irgendwo.', text: 'Es Bild, e chliini Gschicht und es Lächle. Din persönliche Text chunnt no da ane.', image: 'assets/images/erinnerung-09.jpg', imageAlt: 'Mili mit zwei Fründinne zäme', placeholder: true },
  { day: 10, type: 'compliment', title: 'Du dörfsch träume.', text: 'Für dini Träum muesch dich nöd entschuldige. Au denn nöd, wenn sie grad no ganz gross usgsehnd.', placeholder: true },
  { day: 11, type: 'memory', title: 'Eusi chliini Gschicht.', text: 'Da chunnt en Insider oder e lustigi Gschicht ane, wo nume mir zwei so richtig verstönd.', placeholder: true },
  { day: 12, type: 'voucher', title: 'Ziit für eus.', text: 'En Abig zum Abschalte. Du suechsch de Film us, ich kümmer mich um d Snacks.', voucher: { label: 'GUTSCHIIN', title: 'En Filmabig.', detail: 'Din Lieblingsfilm. Snacks. Und mir zwei.', code: 'MILI-12' }, placeholder: true },
  { day: 13, type: 'compliment', title: 'Es bitzli Muet.', text: 'Du muesch nöd immer furchtlos sii, zum muetig sii. Mängisch längt scho, es nomal z probiere.', placeholder: true },
  { day: 14, type: 'memory', title: 'Wenn ich zruggdänke …', text: 'Da chunnt e Erinnerig ane, wo zeigt, warum dir eusi Fründschaft so vill bedütet.', placeholder: true },
  { day: 15, type: 'photo', title: 'Lieblingsmomänt.', text: 'Nöd perfekt inszeniert, eifach en schöne Momänt. Din persönliche Text chunnt no da ane.', image: 'assets/images/erinnerung-15.jpg', imageAlt: 'Mili und zwei Fründinne lueged lachend i d Kamera', placeholder: true },
  { day: 16, type: 'compliment', title: 'Hüt ganz sanft.', text: 'Red hüt mit dir so lieb, wie du mit öpperem rede würdisch, wo dir am Härze liit.', placeholder: true },
  { day: 17, type: 'memory', title: 'Es Lache zum Mitnäh.', text: 'Da chunnt e lustigi Erinnerig ane – für die Täg, a dene es Lächle bsunders guet tuet.', placeholder: true },
  { day: 18, type: 'compliment', title: '18. Und so vill vor dir.', text: 'Du muesch mit 18 no nöd wüsse, wie alles wiitergaht. Du derfsch entdecke, ändere und nöi afange.', placeholder: true },
  { day: 19, type: 'voucher', title: 'E Pause, bitte.', text: 'Mir gönd use, lönd de Alltag chli hinder eus und nähmed eus Ziit für es warmes Getränk.', voucher: { label: 'GUTSCHIIN', title: 'Kafi & es Spaziergängli.', detail: 'Zäme durezschnuufe. Ich lad dich ii.', code: 'MILI-19' }, placeholder: true },
  { day: 20, type: 'photo', title: 'Für immer es bitzli mir.', text: 'Da isch no Platz für dini Wort zu dem Föteli.', image: 'assets/images/erinnerung-20.jpg', imageAlt: 'Mili mit ere Gruppe vo Fründinne und Fründe vor ere alte Muur', placeholder: true },
  { day: 21, type: 'compliment', title: 'Du derfsch stolz sii.', text: 'Dänk hüt churz a öppis, wo du gschafft hesch. Au wenns für anderi chlii usgseht: Für dich derfs gross sii.', placeholder: true },
  { day: 22, type: 'memory', title: 'Das bhalte mer.', text: 'Da isch no Platz für e letschti persönliche Erinnerig. Öppis, wo du Mili scho lang hesch welle säge.', placeholder: true },
  { day: 23, type: 'compliment', title: 'Für morn. Und hüt.', text: 'Ich wünsch dir vill Momänt, wo du nöd andersch sii möchtisch als genau so, wie du bisch.', placeholder: true },
  { day: 24, type: 'finale', title: 'En ganz bsundere Momänt.' },
];

export const finale = {
  eyebrow: '24 · FÜR ALLES, WO NO CHUNNT',
  title: 'Die schönschte Momänt', titleAccent: 'warted no uf dich.',
  intro: 'Mili, die letschte Täg hesch du chliini Momänt gsammlet. Jetzt chunt öppis, womit du dini eigete chasch festhalte.',
  gift: 'E analogi Kamera. Für dich.',
  text: 'Für unscharfi Lieblingsbilder. Für spontani Usflüg. Für die ganz normale Täg, wo im Nachhinein die schönschte sind. Nöd jedes Bild muess perfekt sii. Es muess nume dis sii.',
  closing: 'Uf all die Erinnerige, wo no vor dir ligged. Und uf die, wo mir zäme mached.',
  signature: 'Alles Liebi zum 18. ♡', placeholder: true,
};
