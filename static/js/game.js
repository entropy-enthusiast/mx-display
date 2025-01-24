// General functions

function getRandomInt(min=0, max) {
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
  constructor() {
    this.xPos = getRandomInt(0, 32);
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
  }

  static cleanSpace(oldAsteroidBelt) {
    const cleanAsteroidBelt = oldAsteroidBelt.filter(rock => !rock.outOfBounds);
    return cleanAsteroidBelt;
  }
}

// Game procedure

let gameIsOn = true;

$(document).ready(() => {

  $("#stopBtn").on("click", () => {
    gameIsOn = false;
  });

  executeGame();
});

async function executeGame() {
  await delay(500); // To allow the page to load

  let step = 0;
  let speed = 100;
  let asteroids = [];

  while (gameIsOn) {
    step++;

    await delay(speed); // game speed

    // Create asteroids
    const rock = new Asteroid();
    asteroids.push(rock);

    // Move asteroids
    asteroids.forEach(asteroid => {
      asteroid.move();
    });

    // Delete asteroids that go out of the grid
    asteroids = Asteroid.cleanSpace(asteroids);
  }
  console.log("Game Over!");
}
