// [rows, columns]
const gridSize = [64, 32];

// Pixel font definitions (5x5 for selected characters)
const fontMap = {
  0: ["00000", "00000", "00000", "00000", "00000"],
  A: ["01110", "10001", "11111", "10001", "10001"],
  B: ["11110", "10001", "11110", "10001", "11110"],
  C: ["01110", "10001", "10000", "10001", "01110"],
  D: ["11110", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "11110", "10000", "11111"],
  F: ["11111", "10000", "11110", "10000", "10000"],
  G: ["01110", "10000", "10111", "10001", "01110"],
  H: ["10001", "10001", "11111", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "11111"],
  J: ["00111", "00001", "00001", "10001", "01110"],
  K: ["10001", "10010", "11100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10001", "10001"],
  N: ["10001", "11001", "10101", "10011", "10001"],
  O: ["01110", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "11110", "10000", "10000"],
  Q: ["01110", "10001", "10001", "10011", "01111"],
  R: ["11110", "10001", "11110", "10010", "10001"],
  S: ["01111", "10000", "01110", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100"],
  U: ["10001", "10001", "10001", "10001", "01110"],
  V: ["10001", "10001", "10001", "01010", "00100"],
  W: ["10001", "10001", "10101", "11011", "10001"],
  X: ["10001", "01010", "00100", "01010", "10001"],
  Y: ["10001", "01010", "00100", "00100", "00100"],
  Z: ["11111", "00010", "00100", "01000", "11111"]
};

// From what cell typing starts
const start = 0;

// Font size
const step = 6;

let chunk = [];

for (let r=start; r<gridSize[0]-step; r+=step) {
  let row = [r, r+5];
  for (let c=start; c<gridSize[1]-step; c+=step) {
    let col = [c, c+5];
    chunk.push([row, col]);
  }
}

function handleTyping(k, letter) {
  for (let i=chunk[k][0][0]; i<chunk[k][0][1]; i++) {
    for (let j=chunk[k][1][0]; j<chunk[k][1][1]; j++) {
      if (fontMap[letter][i-chunk[k][0][0]][j-chunk[k][1][0]] === "1") {
        $(`.cell[data-row="${i}"][data-col="${j}"]`).addClass("cell--active");
      } else {
        $(`.cell[data-row="${i}"][data-col="${j}"]`).removeClass("cell--active");
      }
    }
  }
}

$(document).ready(() => {
  $(".textbox").on("input", ({target}) => {
    let input = $(target).val().toUpperCase().replace(/\s/g, '');
    let letters = [...input.split(''), ...Array(chunk.length - input.length).fill("0")];
  
    for (let i=0; i<letters.length; i++) {
      handleTyping(i, letters[i]);
    }
  });
});
