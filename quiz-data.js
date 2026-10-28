/* Team-Quiz für das Teamevent am 30.10.2026
   Aufbau: Runden mit Fragen. Pro Frage:
   q    = Fragezeile
   big  = großer Begriff/Zitat in der Mitte   | img = Bild (Schlüssel aus IMG)   | emoji = Emoji-Rätsel (cap = Text darunter)
   a    = Antworten (2 bis 4); die erste(n) sind richtig, siehe c
   c    = Anzahl richtiger Antworten am Anfang von a (Standard 1) – die Reihenfolge wird beim Spielen gemischt
   right= alternativ: Text der richtigen Antwort (z. B. 'Falsch')
   fixed= Reihenfolge nicht mischen (z. B. Wahr/Falsch)
   blur = Bild startet unscharf und wird während des Countdowns scharf
   info = Auflösungstext nach der Frage (O-Ton)
   poll = Abstimmung ohne richtige Antwort und ohne Punkte
   skip = Frage wird übersprungen */
var IMG={
  'kind-jan':'quiz-team/f3c18c46e8.jpg',
  'kind-philipp':'quiz-team/1e935ff78b.jpg',
  'kind-mw':'quiz-team/08952b8c07.jpg',
  'kind-mh':'quiz-team/51bb66e69f.jpg',
  'kind-bastian':'quiz-team/136330d730.jpg',
  'kind-bianca':'quiz-team/809b40b6b3.jpg',
  'kind-ricky':'quiz-team/2a5d05fd6d.jpg',
  'kind-juergen':'quiz-team/d619c67994.jpg',
  'kind-gordon':'quiz-team/dd7b41ad3b.jpg',
  'kind-alex':'quiz-team/6b6abb7ea1.jpg',
  'kind-alex-bonus':'quiz-team/919df37ae9.jpg',
  'hobby-jan':'quiz-team/be3d9d8f29.jpg',
  'hobby-philipp':'quiz-team/2477456c86.jpg',
  'hobby-mw':'quiz-team/2fd59082d4.jpg',
  'hobby-mh':'quiz-team/7b21191d9d.jpg',
  'hobby-bastian':'quiz-team/65e10f39be.jpg',
  'hobby-bianca':'quiz-team/e4a162f006.jpg',
  'hobby-ricky':'quiz-team/30cec617b4.jpg',
  'hobby-juergen':'quiz-team/749bad9eea.jpg',
  'hobby-gordon':'quiz-team/2a707a844e.jpg',
  'hobby-alex':'quiz-team/97758b5a50.jpg',
  'ort-jan':'quiz-team/b3e8189274.jpg',
  'ort-philipp':'quiz-team/3f7399fba1.jpg',
  'ort-mw':'quiz-team/b303c57b76.jpg',
  'ort-mh':'quiz-team/93e9126f7a.jpg',
  'ort-bastian':'quiz-team/3b71c8f500.jpg',
  'ort-bianca':'quiz-team/07bd5a664d.jpg',
  'ort-juergen':'quiz-team/5a3d43c0b7.jpg',
  'ort-gordon':'quiz-team/0798c4944c.jpg'
};
var WF=['Wahr','Falsch'];
var QUIZ={
  title:'Team-Quiz',
  sub:'Wie gut kennt ihr euch wirklich?',
  rounds:[
    {ico:'👷',title:'Was willst du mal werden?',sub:'Berufswunsch als Kind',time:15,qs:[
      {q:'Wer wollte als Kind Busfahrer werden?',big:'Busfahrer 🚌',a:['Jan','Ricky','Michael H','Jürgen']},
      {q:'Wer wollte mit 14 Kampfpilot werden?',big:'Kampfpilot ✈️',a:['Bastian','Gordon','Philipp','Alex']},
      {q:'Gleich zwei wollten zur Polizei. Tippe einen der beiden!',big:'Polizei 🚓',a:['Ricky','Gordon','Michael W','Bastian'],c:2,
        info:'Ricky wollte Polizist werden, Gordon „Polizei“.'},
      {q:'Was wollte Jürgen als Kind werden?',big:'Jürgen',a:['Musiker','Radiomoderator','Feuerwehrmann','Tierarzt/in']},
      {q:'Wer wollte als Kind Millionär werden?',big:'Millionär 💰',a:['Alex','Michael W','Philipp','Bastian'],
        info:'Alex: „Millionär“. Knapp daneben: Michael W – „Irgendwas mit IT und reich werden (so wie Bill Gates)“ … „hat nicht geklappt“.'},
      {q:'Wahr oder falsch?',big:'Michael H wollte als Kind Radiomoderator werden.',a:WF,fixed:true},
      {q:'Was wollte Philipp als Kind werden?',big:'Philipp',a:['Feuerwehrmann','Busfahrer','Kampfpilot','Musiker']},
      {q:'Was wollte Bianca als Kind werden?',big:'Bianca',a:['Tierarzt/in','Radiomoderator/in','Polizist/in','Millionär/in']}
    ]},
    {ico:'🎤',title:'Karaoke-Bühne',sub:'Bester Karaoke-Song',time:20,qs:[
      {q:'Wessen Karaoke-Song ist das?',big:'„Hier kommt Alex“ – Die Toten Hosen',a:['Gordon','Alex','Ricky','Jürgen'],
        info:'Nicht Alex – Gordon singt „Hier kommt Alex“!'},
      {q:'Emoji-Song! Wessen Karaoke-Hit ist das?',emoji:'🪑 ⚓ 🌊 🎶',cap:'„(Sittin’ On) The Dock of the Bay“ – Otis Redding',a:['Bastian','Michael H','Jan','Philipp']},
      {q:'Wer hat diesen Song schon live in Tokio gesungen?',big:'„Dschinghis Khan“ – Dschinghis Khan',a:['Jürgen','Michael W','Gordon','Ricky'],
        info:'Jürgen – „in Tokyo praktiziert“.'},
      {q:'Nüchtern singt er „Tequila“ – nicht nüchtern ist er sowieso der weltbeste Sänger. Wer?',big:'„Tequila“ – The Champs',a:['Ricky','Alex','Philipp','Jan']},
      {q:'Emoji-Song! Wessen Karaoke-Hit ist das?',emoji:'🐒 🤝 🙋‍♂️',cap:'„Der Affe und ich“ – Henning Wehland',a:['Alex','Bastian','Michael W','Gordon']},
      {q:'Wessen Karaoke-Song ist das?',big:'„Mr. Brightside“ – The Killers',a:['Philipp','Bianca','Bastian','Gordon']},
      {q:'Wessen Karaoke-Song ist das?',big:'„When I’m 64“ – The Beatles',a:['Michael H','Jürgen','Jan','Michael W']},
      {q:'Und zum Schluss: Welchen Song schmettert Michael W?',big:'Michael W',a:['„Anuschka“ – Udo Jürgens','„Piano Man“ – Billy Joel','„The Fate of Ophelia“ – Taylor Swift','„When I’m 64“ – The Beatles'],
        info:'Michael W singt „Anuschka“. „Piano Man“ ist Jans Song, „The Fate of Ophelia“ Biancas, „When I’m 64“ der von Michael H.'}
    ]},
    {ico:'🎨',title:'Hobby-Galerie',sub:'KI-Bilder zu unseren Hobbys',time:20,qs:[
      {q:'Wessen Hobbys zeigt dieses Bild?',img:'hobby-mw',a:['Michael W','Ricky','Gordon','Bastian']},
      {q:'Wessen Hobbys zeigt dieses Bild?',img:'hobby-bianca',a:['Bianca','Michael H','Jan','Alex']},
      {q:'Wessen Hobbys zeigt dieses Bild?',img:'hobby-jan',a:['Jan','Philipp','Michael H','Jürgen'],info:'Jan – und Achtung: Golf spielt hier nicht nur einer …'},
      {q:'Wessen Hobbys zeigt dieses Bild?',img:'hobby-gordon',a:['Gordon','Bastian','Philipp','Michael W']},
      {q:'Wessen Hobbys zeigt dieses Bild?',img:'hobby-juergen',a:['Jürgen','Bianca','Ricky','Alex']},
      {q:'Wessen Hobbys zeigt dieses Bild?',img:'hobby-philipp',a:['Philipp','Jan','Gordon','Ricky'],info:'Philipp – der zweite Golfer im Team.'},
      {q:'Wessen Hobbys zeigt dieses Bild?',img:'hobby-mh',a:['Michael H','Jürgen','Bianca','Michael W']},
      {q:'Wessen Hobbys zeigt dieses Bild?',img:'hobby-ricky',a:['Ricky','Michael W','Bastian','Jan']},
      {q:'Wessen Hobbys zeigt dieses Bild?',img:'hobby-bastian',a:['Bastian','Alex','Gordon','Jürgen']},
      {q:'Wessen Hobbys zeigt dieses Bild?',img:'hobby-alex',a:['Alex','Bastian','Michael H','Philipp'],info:'Alex: Garten-, Wasser- und Technikprojekte.'}
    ]},
    {ico:'🧊',title:'Der Kühlschrank verrät …',sub:'Was dein Kühlschrank über dich sagt',time:25,qs:[
      {q:'Wessen Kühlschrank sagt das?',big:'„Ich weiß, wer den Kindern wieder den Joghurt weggegessen hat …“',a:['Jan','Gordon','Michael W','Philipp']},
      {q:'Wessen Kühlschrank sagt das?',big:'„Veni Vidi Vegan“',a:['Michael H','Bianca','Jürgen','Ricky']},
      {q:'Wessen Kühlschrank sagt das?',big:'„Du schon wieder?“',a:['Ricky','Philipp','Alex','Michael W']},
      {q:'Wessen Kühlschrank sagt das?',big:'„Gemüse verdirbt. Schnaps hält. Mein Kühlschrank ist auf langfristige Anlagen spezialisiert.“',a:['Alex','Michael W','Gordon','Jan']},
      {q:'Wessen Kühlschrank sagt das?',big:'„Das Bier läuft langsam ab … alles sauber eingetuppert (aber nicht von mir …)“',a:['Michael W','Ricky','Bastian','Alex']},
      {q:'Wessen Kühlschrank sagt das?',big:'„Ich kaufe ein wie eine Ernährungsberater/in und esse wie ein zwölfjähriges Kind mit Taschengeld … Motivation, Disziplin und Schokolade.“',a:['Bianca','Michael H','Philipp','Jan'],
        info:'Bianca: „… daher ist mein Kühlschrank der Beweis, dass Hoffnung und Realität Tür an Tür wohnen.“'},
      {q:'Wessen Kühlschrank sagt das?',big:'„Wenn er diesen Blick hat, bekommt er alles von mir – auch mit Licht an.“',a:['Gordon','Jürgen','Ricky','Bastian']},
      {q:'Zwei Hobbyköche im Team! Tippe einen der beiden.',big:'„Ich koche gerne.“ & „Die Küche ist mein liebster Raum im Haus.“',a:['Jürgen','Bastian','Michael W','Ricky'],c:2,
        info:'Jürgen: „Ich koche gerne.“ – Bastian: „Die Küche ist mein liebster Raum im Haus.“'},
      {q:'Wessen Kühlschrank sagt das?',big:'„Praktikabel oder all-in – zwischen Studentenbude und internationalem Küchenchef.“',a:['Philipp','Alex','Michael H','Gordon']}
    ]},
    {ico:'🛏️',title:'Seltsame Schlafplätze',sub:'Hier habe ich schon einmal übernachtet',time:20,qs:[
      {q:'Wer hat hier schon einmal übernachtet?',img:'ort-mw',a:['Michael W','Gordon','Jürgen','Philipp']},
      {q:'Wer hat hier schon einmal übernachtet?',img:'ort-bianca',a:['Bianca','Alex','Michael H','Jan']},
      {q:'Wahr oder falsch: Hier hat Michael W schon einmal übernachtet.',img:'ort-philipp',a:WF,fixed:true,right:'Falsch',info:'Falsch – das ist der Bahnhof in Lyon, und dort hat Philipp übernachtet.'},
      {q:'Wer hat hier schon einmal übernachtet?',img:'ort-gordon',a:['Gordon','Bastian','Ricky','Michael W']},
      {q:'Wer hat hier schon einmal übernachtet?',img:'ort-juergen',a:['Jürgen','Michael H','Bianca','Gordon']},
      {q:'Wer hat hier schon einmal übernachtet?',img:'ort-jan',a:['Jan','Bastian','Alex','Philipp']},
      {q:'Wer hat hier schon einmal übernachtet?',img:'ort-mh',a:['Michael H','Jan','Jürgen','Bianca']},
      {q:'Wer hat hier schon einmal übernachtet?',img:'ort-bastian',a:['Bastian','Gordon','Philipp','Michael H']},
      {q:'Wer hat hier schon einmal übernachtet?',big:'„Holzhütte im Wat Po – ohne WLAN, ohne Minibar, aber mit maximaler innerer Einkehr.“',a:['Alex','Michael W','Ricky','Jan']}
    ]},
    {ico:'👶',title:'Kindheitsbilder',sub:'Das große Finale – jetzt gibt es doppelte Punkte!',time:20,double:true,qs:[
      {q:'Wer ist das?',img:'kind-mh',a:['Michael H','Jürgen','Michael W','Bastian']},
      {q:'Wer ist das?',img:'kind-ricky',a:['Ricky','Philipp','Gordon','Alex']},
      {q:'Wer ist das?',img:'kind-bianca',a:['Bianca','Jan','Bastian','Michael H']},
      {q:'Wer ist das?',img:'kind-gordon',a:['Gordon','Ricky','Philipp','Jan']},
      {q:'Wer ist das?',img:'kind-philipp',a:['Philipp','Alex','Michael W','Gordon']},
      {q:'Wer ist das?',img:'kind-juergen',a:['Jürgen','Michael H','Bianca','Ricky']},
      {q:'Wer ist das?',img:'kind-bastian',a:['Bastian','Jürgen','Alex','Michael W']},
      {q:'Wer ist das?',img:'kind-mw',a:['Michael W','Bastian','Jan','Michael H']},
      {q:'Wer ist das?',img:'kind-jan',a:['Jan','Philipp','Gordon','Michael W']},
      {q:'Wer hat dieses Foto geschickt?',img:'kind-alex',a:['Alex','Bianca','Ricky','Jürgen'],info:'Alex – mit Schwester! Und jetzt die Bonusfrage …'},
      // Bonus als Abstimmung: Alex löst live auf. Steht die Lösung fest, poll entfernen und right:'Links' oder right:'Rechts' setzen.
      {q:'Bonusfrage: Wer von beiden ist Alex?',img:'kind-alex-bonus',a:['Links','Rechts'],fixed:true,poll:true,info:'Alex, jetzt bist du dran: Löse auf! 😉'}
    ]}
  ]
};
