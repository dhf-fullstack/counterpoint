/* eslint-disable camelcase */
//import Vex from './static/vexflow-min'

const errors=document.getElementById('errors')
const VF = Vex.Flow
const width = 700
let stave
let context

function setup() {
  // boilerplate
  const div = document.getElementById('score1')
  const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG)
  renderer.resize(2*width, 200)
  context = renderer.getContext()

  // customize
  context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')

  // Staff
  stave = new VF.Stave(10, 40, width)
  stave.addClef('treble')//.addTimeSignature('4/4')

  // render
  stave.setContext(context).draw()
}

let voice1Notes = []
let voice2Notes = []

// eslint-disable-next-line no-unused-vars
function voice1(_line) {
  voice1Notes = []
}

// eslint-disable-next-line no-unused-vars
function voice2(line) {
  voice2Notes = { notes: [], beats: 0, value: 2 }
  line.forEach(([[note], dur]) => {
    voice2Notes.notes.push(new VF.StaveNote({ clef: "treble", keys: [note], duration: dur }))
    if (dur === "h") { voice2Notes.beats += 1 }
    if (dur === "w") { voice2Notes.beats += 2 }
  })
  /*
  voice2Notes = [
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "w" }),
  ]
  */
}

function showVoices() {
  var voices = [
    //new VF.Voice({num_beats: 12, beat_value: 2}).addTickables(voice1Notes),
    new VF.Voice({num_beats: voice2Notes.beats, beat_value: voice2Notes.value}).addTickables(voice2Notes.notes)
  ];

  var formatter = new VF.Formatter().joinVoices(voices).format(voices, width);
  voices.forEach(function(v) { v.draw(context, stave) });
}

try {
  setup()
  voice1(undefined)
  voice2([
    [["d/4"], "h"],
    [["f/4"], "h"],
    [["e/4"], "h"],
    [["d/4"], "h"],
    [["g/4"], "h"],
    [["f/4"], "h"],
    [["a/4"], "h"],
    [["g/4"], "h"],
    [["f/4"], "h"],
    [["e/4"], "h"],
    [["d/4"], "w"],
    ])
  showVoices()
} catch (err) {
  console.log('ERROR: ', err)
  errors.innerText = err
}

  /* Create a voice in 4/4 and add notes
  var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
  voice.addTickables([
    new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "q" }),
    new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "q" }),
  ])
  var formatter = new VF.Formatter().joinVoices([voice]).format([voice], width);
  // Render voice
  voice.draw(context, stave);
  */
  /*
  var notes = [
    new VF.StaveNote({clef: "treble", keys: ["c/5"], duration: "q" }),
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
    new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
    new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" })
  ];

  var notes2 = [
    new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "w" })
  ];

  var voices = [
    new VF.Voice({num_beats: 4, beat_value: 4}).addTickables(notes),
    new VF.Voice({num_beats: 4, beat_value: 4}).addTickables(notes2)
  ];

  var formatter = new VF.Formatter().joinVoices(voices).format(voices, width);
  voices.forEach(function(v) { v.draw(context, stave) });
  */

  /*
  var notes = [
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["a/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["g/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["f/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["e/4"], duration: "h" }),
    new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "w" }),
  ];
  */

  /*var notes2 = [
    new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "w" })
  ];*/
/*
  var voices = [
    new VF.Voice({num_beats: 12, beat_value: 2}).addTickables(notes),
    //new VF.Voice({num_beats: 4, beat_value: 4}).addTickables(notes2)
  ];

  var formatter = new VF.Formatter().joinVoices(voices).format(voices, width);
  voices.forEach(function(v) { v.draw(context, stave) });
*/
