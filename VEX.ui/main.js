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
  div.innerHTML = null
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

let voice1 = { notes: [], beats: 0, value: 2, stem_direction: 1 }
let voice2 = { notes: [], beats: 0, value: 2, stem_direction: -1 }

function voice(v, line) {
  console.log('VOICE:', line)
  if (line) {
    v.notes = []; v.beats = 0;
    line.forEach(([[note], dur]) => {
      v.notes.push(new VF.StaveNote({ clef: "treble", keys: [note], duration: dur, stem_direction: v.stem_direction }))
      if (dur === "h") { v.beats += 1 }
      if (dur === "w") { v.beats += 2 }
    })
  }
}

function showVoices() {
  var voices = []
  if (voice1.beats > 0) { voices.push(new VF.Voice({num_beats: voice1.beats, beat_value: voice1.value}).addTickables(voice1.notes)) }
  if (voice2.beats > 0) { voices.push(new VF.Voice({num_beats: voice2.beats, beat_value: voice2.value}).addTickables(voice2.notes)) }
  var formatter = new VF.Formatter().joinVoices(voices).format(voices, width);
  voices.forEach(function(v) { v.draw(context, stave) });
}

try {
  setup()
} catch (err) {
  console.log('ERROR: ', err)
  errors.innerText = err
}

function convert_music_format(line) {
  const tline = parseABCtoVexNotes(line)
  return tline
}

function updateDisplay(cp) {
  if (cp === false) {
    document.getElementById('message').innerText = 'I made a mistake in the counterpoint :('
  } else if (cp === null) {
    document.getElementById('message').innerText = 'That\'s all I could think of.'
  } else {
    setup()
    const cp2 = convert_music_format(cp)
    console.log("updateDisplay from ", cp, " to ", cp2)
    try {
      voice(voice1, cp2)
      showVoices()
    } catch (err) {
      console.log('ERROR: ', err)
      errors.innerText = err
    }
  }
}

document.getElementById("start_btn").addEventListener("click", () => {
  console.log('start')
  document.getElementById('message').innerText = ''
  let cf = ["D4", "F4", "E4", "D4", "G4", "F4", "A4", "G4", "F4", "E4", "D4"]
  voice(voice1, undefined)
  voice(voice2, [
    [["d/4"], "w"],
    [["f/4"], "w"],
    [["e/4"], "w"],
    [["d/4"], "w"],
    [["g/4"], "w"],
    [["f/4"], "w"],
    [["a/4"], "w"],
    [["g/4"], "w"],
    [["f/4"], "w"],
    [["e/4"], "w"],
    [["d/4"], "w"],
    ])
  let cp = firstspecies_start(cf)
  updateDisplay(cp)
});

document.getElementById("next_btn").addEventListener("click", () => {
  console.log('next')
  document.getElementById('message').innerText = ''
  let cp = firstspecies_next()
  updateDisplay(cp)
});


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
