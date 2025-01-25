// General variables

const designs = [
  [
    ["0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "1", "1", "1", "0", "0", "0", "0"],
    ["0", "1", "0", "0", "1", "1", "1", "0", "0", "1", "0"], 
    ["0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0"], 
    ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
    ["0", "0", "0", "0", "1", "1", "1", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0"], 
    ["0", "0", "0", "1", "1", "1", "1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0"]
  ],
]

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
  constructor(design) {
    this.design = design;
    this.coords = design;
    this.height = design.length;
    this.width = design[0].length;
    this.xStart = Math.floor((32 - this.width) / 2); // The center of the grid
    this.yStart = 60;
  }

  draw() {
    //fix this
    console.log("");
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

  const spaceShip = new SpaceShip(designs[0]);
  spaceShip.draw();

  while (gameIsOn) {
    await delay(100);
    console.log(123);
  }
}
