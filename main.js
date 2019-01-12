document.getElementById("voice1").addEventListener("click", event => {
  console.log(event.target, event);
});

/* staff_position = (-n... 0 ... n) where 0 is the
   bottom-most line, 1 the space above it, 8 the top-
   most line, -1 the space below the bottom-most line
   etc. So in G clef, -2 = middle C, 8 if F5, 12 is
   high C.

   note_type is duration 'w' = whole note, (h)alf,
   (q)uarter, (e)ighth */

function place_note(staff_position, note_type) {
  let glyph;
  switch (note_type) {
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

place_note(1, 'w');

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