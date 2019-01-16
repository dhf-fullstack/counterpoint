function createStaff(name, top, clef) {
  let voice = document.createElement("div")
  voice.classList.add("voice")
  voice.id = name;
  voice.style.top = top
  let score = document.getElementById("score")
  score.appendChild(voice);
  for(let i = 0; i < 5; i++) {
    let staffline = document.createElement("div")
    staffline.classList.add("staffline")
    staffline.style.top = `${i*10}px`;
    voice.appendChild(staffline)
  }
  let c = document.createElement("div")
  c.classList.add("clef")
  c.innerText = clef
  if (clef === "G") {
    c.style.left = "9px"
    c.style.top = "10px"
  } else {
    c.style.left = "15px"
    c.style.top = "-3px"
  }
  voice.appendChild(c)
  return voice;
}

const voice1 = createStaff("voice1", "0px", "G")
const voice2 = createStaff("voice2", "80px", "F")
document.getElementById("controls").style.top = "225px"
document.getElementsByTagName("footer")[0].style.top = "300px"

function placeNote(voice, note, dur, left) {
  const pitchMap = { 'C': 2, 'D': 3, 'E': 4,
                     'F': 5, 'G': 6, 'A': 7, 'B': 8 }
  let octave = note[1]
  note = note[0]
  let pitch = (octave-1)*7 + pitchMap[note]
  let top = (33 - pitch) * 5
  const glyphMap = { 'W': 'O', 'Q': '@', 'E': '@' }
  let glyph = glyphMap[dur]
  let d = document.createElement("div")
  d.classList.add("note")
  d.innerText = glyph
  d.style.top = `${top}px`
  d.style.left = `${left}px`
  voice.appendChild(d)
}

/*
placeNote(voice1, "C6", "W", 40) // 37 -40
placeNote(voice1, "F5", "W", 70) // 33 0
placeNote(voice1, "C5", "W", 100) // 30 15
placeNote(voice1, "C4", "W", 130) // 23 50
placeNote(voice1, "A3", "W", 160) //21 60
*/

function placeTune(voice, tune) {
  let left = 40
  tune.forEach((note) => {
    placeNote(voice, note, "W", left)
    left += 30
  })
}

let scale = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"]
let c_f = ["D4", "F4", "E4", "D4", "G4", "F4", "A4", "G4", "F4", "E4", "D4"]
placeTune(voice1, c_f);
placeTune(voice2, scale);

document.getElementById("start_btn").addEventListener("click", event => {
  firstspecies_start();
});

document.getElementById("next_btn").addEventListener("click", event => {
  firstspecies_next();
});

/*
document.getElementById("voice1").addEventListener("click", event => {
  console.log(event.target, event);
});
*/

/* staff_position = (-n... 0 ... n) where 0 is the
   bottom-most line, 1 the space above it, 8 the top-
   most line, -1 the space below the bottom-most line
   etc. So in G clef, -2 = middle C, 8 if F5, 12 is
   high C.

   noteType is duration 'w' = whole note, (h)alf,
   (q)uarter, (e)ighth */
/*
function placeNote(staffPosition, noteType) {
  let glyph;
  switch (noteType) {
    case 'w':
    case 'h': glyph = 'O'; break;
    case 'q':
    case 'e': glyph = '@'; break;
    default:  glyph = '#'; break;
  }
  let a = document.createElement('div');
  a.classList.add('note');
  a.innerText = glyph;
  let voice1 = document.getElementById('voice1');
  voice1.appendChild(a);
  a.style.top = "200px";
  a.style.left = "200px";
}
*/
//placeNote(1, 'w');

/*

const width = 30;
const height = 30; // width and height dimensions of the board


const gol = new GameOfLife(width, height);
let timer = null;

const pattern_101 =
`....OO......OO....
...O.O......O.O...
...O..........O...
OO.O..........O.OO
OO.O.O..OO..O.O.OO
...O.O.O..O.O.O...
...O.O.O..O.O.O...
OO.O.O..OO..O.O.OO
OO.O..........O.OO
...O..........O...
...O.O......O.O...
....OO......OO....`

 // create a table and append to the DOM


// Actual table cells
const tds = [];

// <table> element
const table = document.createElement("tbody");
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);



 * Draws every cell from the gol instance into an actual, visible DOM element


const paint = () => {
  tds.forEach(function (element) {
    const input = gol.getCell(element.dataset.row, element.dataset.col);
    element.classList.toggle('alive', input);
  });
};


const step = () => {
  gol.tick();
  paint();
}

const clearBoard = () => {
  if (!timer) {
    clearInterval(timer);
  }
  gol.board = gol.makeBoard();
  paint();
};


 * Event Listeners


document.getElementById("board").addEventListener("click", event => {
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;
  gol.toggleCell(row, col);
  paint();
});

document.getElementById("pattern_btn").addEventListener("click", event => {
  clearBoard();
  const pattern = pattern_101;
  let currRow = 0;
  let currCol = 0;
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '.') {
      gol.setCell(0, currRow, currCol);
      currCol++;
    } else if (pattern[i] === 'O') {
      gol.setCell(1, currRow, currCol);
      currCol++;
    } else {
      currCol = 0;
      currRow++;
    }
  }
  paint();
});

document.getElementById("step_btn").addEventListener("click", event => {
  if (timer === null) {
    gol.tick();
    paint();
  }
});

document.getElementById("play_btn").addEventListener("click", event => {
  let state = document.getElementById('play_btn');
  if (state.innerText === 'Play') {
    state.innerText = 'Pause';
    timer = setInterval(step, 10);
  } else {
    state.innerText = 'Play';
    clearInterval(timer);
    timer = null;
  }
});

document.getElementById("random_btn").addEventListener("click", event => {
  for (let i = 0; i < gol.width; i++) {
    for (let j = 0; j < gol.height; j++) {
      let value = Math.floor(Math.random() * 2);
      gol.setCell(value, j, i);
    }
  }
  paint();
});

document.getElementById("clear_btn").addEventListener("click", event => {
  clearBoard();
});

*/