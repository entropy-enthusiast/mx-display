// Create grid

const cells = []

function createGrid() {
  const totalRows = 64;
  const totalCols = 32;
  const batchSize = 8; // Number of rows to process per batch
  let currentRow = 0;

  // Function to process a batch of rows
  function processBatch() {
    for (let row = currentRow; row < currentRow + batchSize && row < totalRows; row++) {
      cells[row] = [];
      for (let col = 0; col < totalCols; col++) {
        // Dynamically append buttons to the grid
        $(".grid").append(`<button class="cell" data-row="${row}" data-col="${col}"></button>`);
        cells[row][col] = $(`.cell[data-row=${row}][data-col="${col}"]`);
      }
    }
    currentRow += batchSize;

    if (currentRow < totalRows) {
      // Schedule the next batch to run
      setTimeout(processBatch, 0);
    }
  }

  // Start the asynchronous grid creation
  $(".grid").empty(); // Clear the grid before populating
  processBatch();
}

createGrid();

// Starting variables

const spaceShipSkin = {
  A: [
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0], 
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], 
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], 
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
  ],
}

let gameIsOn = true;

// General functions

function getRandomInt(min = 0, max) {
  min = Math.ceil(min);
  max = Math.floor(max) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function delay(millisec) {
  return new Promise(resolve => {
    setTimeout(() => { resolve('') }, millisec);
  })
}

// Game classes

class Asteroid {
  constructor(xPos) {
    this.xPos = xPos;
    this.yPos = -1;
    this.outOfBounds = false;
  }

  draw() {
    cells[this.yPos][this.xPos].addClass("cell--active");
  }

  erase() {
    cells[this.yPos][this.xPos].removeClass("cell--active");
  }

  move() {
    if (this.yPos != -1) {
      this.erase();
    }

    if (this.yPos < 63) {
      this.yPos += 1;
      this.draw();
    } else {
      this.outOfBounds = true;
    }

    // add some delay more than that of regular game delay.
  }

  static createAsteroidCoords(startPos, size) {
    const xPos = [];
    for (let i = 0; i < size; i++) {
      if (getRandomInt(0, 6) != 1) {
        xPos.push(startPos + i);
      }
    }

    return xPos;
  }

  static cleanSpace(oldAsteroidBelt) {
    const cleanAsteroidBelt = oldAsteroidBelt.filter(rock => !rock.outOfBounds);
    return cleanAsteroidBelt;
  }
}

class SpaceShip {
  constructor(skin) {
    this.skin = skin;
    this.height = skin.length;
    this.width = skin[0].length;

    this.xStart = Math.floor((32 - this.width) / 2); // The center of the grid
    this.yStart = 60;
    this.coords = this.setSpawn(skin);
  }

  setSpawn() {
    let coords = structuredClone(this.skin);

    for (let h=0; h<this.height; h++) {
      for (let w=0; w<this.width; w++) {
        const x = this.xStart + w;
        const y = this.yStart - h;

        coords[h][w] = [x, y];
        
        if (this.skin[this.height - 1 - h][this.width - 1 - w]) {
          cells[y][x].addClass("cell--active");
        }
      }
    }
    
    return coords;
  }

  move(key) {

    console.log(key);

    for (let h=0; h<this.height; h++) {
      for (let w=0; w<this.width; w++) {
        const x = this.coords[h][w][0];
        const y = this.coords[h][w][1];
        
        if (this.skin[this.height - 1 - h][this.width - 1 - w]) {
          cells[y][x].removeClass("cell--active");
        }

        let newX = x + 1;
        if (newX > 31) {
          newX = 0;
        }

        this.coords[h][w] = [newX, y];
      }
    }

    for (let h=0; h<this.height; h++) {
      for (let w=0; w<this.width; w++) {
        const x = this.coords[h][w][0];
        const y = this.coords[h][w][1];

        if (this.skin[this.height - 1 - h][this.width - 1 - w]) {
          cells[y][x].addClass("cell--active");
        }
      }
    }
  }
}

// Game procedure

$(document).ready(() => {

  $("#stopBtn").on("click", () => {
    gameIsOn = false;
  });

  startAsteroidShower();
  initializeSpaceShip();
});

async function startAsteroidShower() {
  await delay(500); // Allows the grid to load

  let step = 0;
  let size = 2;
  let startPos = getRandomInt(0, 32 - size);
  let asteroids = [];

  while (gameIsOn) {
    step++;

    await delay(500);

    // Create rock coordinates
    if (step % size === 0) {
      startPos = getRandomInt(0, 32 - size);
    }

    const xCoords = Asteroid.createAsteroidCoords(startPos, size);
    xCoords.forEach(x => {
      const rock = new Asteroid(x);
      asteroids.push(rock);
    });

    // Move asteroids
    asteroids.forEach(asteroid => {
      asteroid.move();
    });

    // Delete asteroids that go out of the grid
    asteroids = Asteroid.cleanSpace(asteroids);
  }
  console.log("Game Over!");
}

async function initializeSpaceShip() {
  await delay(2000) // Allows the grid to load;
  
  const spaceShip = new SpaceShip(spaceShipSkin['A']);

  $(document).on("keydown", ({which}) => {
    spaceShip.move(which);
  });

  while (gameIsOn) {
    await delay(100);
  }
}
