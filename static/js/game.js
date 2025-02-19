// Create grid

const cells = []

// $(document).on("click", ({target}) => {
//   console.log(target);
// });

function postBinaryPattern() {
  const txt = $("#binaryOutput").html().replaceAll("<br>", "\r\n");

  // fetch('/update', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     title: 'binary',
  //     body: txt,
  //     userId: 1,
  //   }),
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8',
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));
}

function updateBinaryPatterns() {

  binaryOutput.innerHTML = "";

  // Display the first binary pattern (1 to 64), each pattern has 64 bits
  for (let row = 0; row < gridRows; row++) {
    let binaryPattern = "0b"; // Adding the prefix "0b"
    for (let col = 0; col < gridCols; col++) {
      binaryPattern += cells[row][col].hasClass('cell--active') ? "1" : "0";
    }
    binaryOutput.innerHTML += `${binaryPattern},<br>`;
  }
}

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

const numbers = {
  0: ["01110", "10001", "10001", "10001", "10001", "10001", "10001", "01110"],
  1: ["00100", "01100", "10100", "00100", "00100", "00100", "00100", "11111"],
  2: ["11111", "00001", "00001", "11111", "10000", "10000", "10000", "11111"],
  3: ["11111", "00001", "00001", "11111", "00001", "00001", "00001", "11111"],
  4: ["10000", "10000", "10100", "10100", "11111", "00100", "00100", "00100"],
  5: ["11111", "10000", "10000", "10000", "11111", "00001", "00001", "11111"],
  6: ["11111", "10000", "10000", "11111", "10001", "10001", "10001", "11111"],
  7: ["11111", "00001", "00010", "00100", "00100", "00100", "00100", "00100"],
  8: ["01111", "01001", "01001", "11111", "10001", "10001", "10001", "11111"],
  9: ["11111", "10001", "11111", "00001", "00001", "00001", "00001", "00001"],
  x: 10,
  y: 47
}

const scoreText = {
  font: [
    "01111001110001110011110011111000",
    "10000010001010001010001010000000",
    "01110010000010001011110011110000",
    "00001010001010001010010010000000",
    "11110001110001110010001011111000",
  ],
  y: 57,
  x: 2
}

const strip = { y: [43, 44] };

const health = {
  points: 19,
  heart: [
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  strip: [
    "01010101010101010101010101010101".split("").map(Number),
    "10101010101010101010101010101010".split("").map(Number)
  ]
}

let spaceShipSkin = {
  A: {
    body: [
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
    weapons: [
      [2, 11],
      [2, 19],
      [0, 15]
    ],
    front: {
      y: [4, 2, 3, 3, 1, 0, 1, 3, 3, 2, 4],
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },

  B: {
    body: [
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    ],
    weapons: [
      [7, 22],
      [7, 9],
    ],
    front: {
      y: [5, 4, 4, 4, 4, 6, 9, 9, 6, 4, 4, 4, 4, 5],
      x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    }
  }
}

let player = spaceShipSkin['A'];

let fight = false;
let boundary = 0;

let gameIsOn = true;
let asteroids = [];
let asteroidSpeed = 500;
let bullets = [];
let enemyBullets = [];
let firstLoad = true;
let score = 0;

const binaryOutput = document.getElementById('binaryOutput');
const gridRows = 64;
const gridCols = 32;

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

  erase(x=this.xPos, y=this.yPos) {
    cells[y][x].removeClass("cell--active");
  }

  move() {
    if (this.yPos != -1) {
      this.erase();
    }

    if (this.yPos < 42) {
      this.yPos += 1;
      this.draw();
    } else {
      this.outOfBounds = true;
    }
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
  constructor(skin, yStart) {
    this.skin = skin["body"];
    this.height = this.skin.length;
    this.width = this.skin[0].length;

    this.xStart = Math.floor((32 - this.width) / 2); // The center of the grid
    this.yStart = yStart;
    this.coords = this.setSpawn();

    this.weapons = skin["weapons"];
    this.health = 19;
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
    if (key === 68) {
      this.weapons.forEach((weapon, i) => {
        this.weapons[i][1] = weapon[1] + 1;
        if (weapon[1] > 31) {
          this.weapons[i][1] = 0;
        }
      });
    } else if (key === 65) {
      this.weapons.forEach((weapon, i) => {
        this.weapons[i][1] = weapon[1] - 1;
        if (weapon[1] < 0) {
          this.weapons[i][1] = 31;
        }
      });
    }

    for (let h=0; h<this.height; h++) {
      for (let w=0; w<this.width; w++) {
        const x = this.coords[h][w][0];
        const y = this.coords[h][w][1];
        
        if (this.skin[this.height - 1 - h][this.width - 1 - w]) {
          cells[y][x].removeClass("cell--active");
        }

        let newX;
        if (key === 68) {
          newX = x + 1;
          if (newX > 31) {
            newX = 0;
          }
        } else if (key === 65) {
          newX = x - 1;
          if (newX < 0) {
            newX = 31;
          }
        } else {
          return;
        }

        if (gameIsOn) {
          this.coords[h][w] = [newX, y];
        }
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

class Bullet {
  constructor(x, y, start) {
    this.xPos = x;
    this.yPos = start + y;
    this.outOfBounds = false;
  }

  draw() {
    cells[this.yPos][this.xPos].addClass("cell--active");
  }

  erase(x=this.xPos, y=this.yPos) {
    cells[y][x].removeClass("cell--active");
  }

  move(boundary, dir=1) {
    if (this.yPos != -1) {
      this.erase();
    }

    let condition;
    if (dir === -1) {
      condition = this.yPos < boundary;
    } else {
      condition = this.yPos > boundary;
    }

    if (condition) {
      this.yPos -= dir;
      this.draw();
    } else {
      this.outOfBounds = true;
    }
  }

  static cleanSpace(oldBullets) {
    const cleanBullets = oldBullets.filter(bullet => !bullet.outOfBounds);
    return cleanBullets;
  }
}

// Game procedure

$(document).ready(() => {

  $("#stopBtn").on("click", () => {
    gameIsOn = false;
  });

  $("#restartBtn").on("click", () => {
    location.reload();
  })

  $("#startBtn").on("click", () => {
    if (firstLoad) {
      handleAsteroids();
      handleSpaceShip();
    }

    firstLoad = false;
  });

  $("#fightBtn").on("click", () => {
    if (firstLoad) {
      fight = true;
      boundary = 9;
      handleSpaceShip();
    }

    firstLoad = false;
  });
});

async function handleAsteroids() {
  // await delay(500); // Allows the grid to load

  let step = 0;
  let size = 2;
  let startPos = getRandomInt(0, 32 - size);

  while (gameIsOn) {
    step++;
    await delay(asteroidSpeed);

    handleBinaryPattern();

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
}

//2, 10
//60, 10
function updateHealthBar(spaceShip, [y, x]) {
  for (let i=0; i<2; i++) {
    for (let j=0; j<spaceShip.health + 1; j++) {
      cells[y + i][x + j].removeClass("cell--active");
    }
  }

  for (let i=0; i<2; i++) {
    for (let j=0; j<spaceShip.health; j++) {
      cells[y + i][x + j].addClass("cell--active");
    }
  }
}

function updateScore(score=0) {
  let scoreInput;

  if (score > 99) {
    numbers.x = 7;
  } else {
    numbers.x = 10;
  }

  if (score < 10) {
    scoreInput = ["0", score.toString().split("")];
  } else {
    scoreInput = score.toString().split("");
  }

  for (let i=0; i<8; i++) {
    for (let j=0; j<20; j++) {
      cells[numbers.y + i][numbers.x + j].removeClass("cell--active");
    }
  }

  scoreInput.forEach((number, k) => {
    numbers[number].forEach((txt, i) => {
      for (let j=0; j<txt.length; j++) {
        if (txt[j] === "1") {
          cells[numbers.y + i][numbers.x + k*6 + j].addClass("cell--active");
        }
      }
    })
  });
}

async function handleSpaceShip() {
  // await delay(2000) // Allows the grid to load;

  if (fight) {
    health.heart.forEach((v, i) => {
      for (let j=0; j<v.length; j++) {
        if (v[j] === 1) {
          cells[1 + i][4 + j].addClass("cell--active");
          cells[59 + i][4 + j].addClass("cell--active");
        }
      }
    })

    health.strip.forEach((v, i) => {
      for (let j=0; j<v.length; j++) {
        if (v[j] === 1) {
          cells[7 + i][j].addClass("cell--active");
          cells[55 + i][j].addClass("cell--active");
        }
      }
    })

  } else {
    scoreText.font.forEach((txt, i) => {
      for (let j=0; j<txt.length; j++) {
        if (txt[j] === "1") {
          cells[scoreText.y + i][scoreText.x + j].addClass("cell--active");
        }
      }
    });
  
    updateScore();
  
    strip.y.forEach(col => {
      for (let i=0; i<32; i++) {
        cells[col][i].addClass("cell--active");
      }
    });
  }

  let spaceShip;
  if (fight) {
    spaceShip = new SpaceShip(player, 52);
    enemySpaceShip = new SpaceShip(spaceShipSkin["B"], 20);
    updateHealthBar(spaceShip, [60, 10]);
    updateHealthBar(enemySpaceShip, [2, 10]);
  } else {
    spaceShip = new SpaceShip(player, 40);
  }

  let lastShotTime = 0; // Tracks the last shooting time
  const shotCooldown = 500; // Cooldown in milliseconds
  
  $(document).on("keydown", ({ which }) => {
    const now = Date.now();
  
    if (which === 32) {
      if (fight && now - lastShotTime < shotCooldown) {
        return; // Ignore fast repeated shots
      }
  
      lastShotTime = now; // Update the last shot time
  
      player["weapons"].forEach(weapon => {
        const bullet = new Bullet(weapon[1], weapon[0], spaceShip.yStart - spaceShip.skin.length);
        bullets.push(bullet);
      });
    } else {
      spaceShip.move(which);
    }
  });
  
  while (gameIsOn) {
    if (fight) {
      await delay(70);
    } else {
      await delay(50);
    }

    handleBinaryPattern();

    // Move bullets
    bullets.forEach(bullet => {
      bullet.move(boundary);
    });

    // Delete bullets that go out of the grid
    bullets = Bullet.cleanSpace(bullets);

    if (fight) {
      // Move enemy spaceship
      const dirChange = getRandomInt(0, 100);
      if (dirChange < 20) { // 75% chance of being still
      } else if (dirChange < 60) { // 12.5% chance of moving left
        enemySpaceShip.move(65);
      } else { // 12.5% chance of moving right
        enemySpaceShip.move(68);
      }

      // Shoot enemy bullets
      if (getRandomInt(0, 100) > 30) {
        spaceShipSkin["B"]["weapons"].forEach(weapon => {
          const bullet = new Bullet(weapon[1], weapon[0], enemySpaceShip.yStart - enemySpaceShip.skin.length);
          enemyBullets.push(bullet);
        });
      }

      enemyBullets.forEach(bullet => {
        bullet.move(54, -1);
      });

      enemyBullets = Bullet.cleanSpace(enemyBullets);  

      const enemyBulletsCopy = [...enemyBullets];
      const playerBulletsCopy = [...bullets];
      
      const enemyIndexesToRemove = new Set();
      const playerIndexesToRemove = new Set();
      
      for (let i = enemyBulletsCopy.length - 1; i >= 0; i--) {
        const eX = enemyBulletsCopy[i].xPos;
        const eY = enemyBulletsCopy[i].yPos;

        for (let j = playerBulletsCopy.length - 1; j >= 0; j--) {
          const pX = playerBulletsCopy[j].xPos;
          const pY = playerBulletsCopy[j].yPos;
          
          if (eX === pX && eY === pY) {
            enemyIndexesToRemove.add(i);
            playerIndexesToRemove.add(j);
            cells[pY][pX].removeClass("cell--active");
          }
        }

        // Player spaceship collision
        for (let k=0; k < player["front"]["x"].length; k++) {
          const sX = player["front"]["x"][k];
          const sY = player["front"]["y"][k];
    
          const cX = spaceShip.coords[spaceShip.coords.length - 1 - sY][sX][0];
          const cY = spaceShip.coords[spaceShip.coords.length - 1 - sY][sX][1];
      
          if ((cX === eX) && (cY === eY)) {
            if (spaceShip.health > 1) {
              spaceShip.health -= 1;
              updateHealthBar(spaceShip, [60, 10]);

              // Mark the bullet for removal
              enemyIndexesToRemove.add(i);
            } else {
              gameIsOn = false;
              console.log("Game Over!");
              return;
            }
          }
        }
      }
      
      handleEnemyShip();

      // Remove marked bullets safely after the loop
      enemyBullets = enemyBullets.filter((_, index) => !enemyIndexesToRemove.has(index));
      bullets = bullets.filter((_, index) => !playerIndexesToRemove.has(index));

  } else {
    // Handle collisions
    const asteroidsCopy = [...asteroids];
    const bulletsCopy = [...bullets];
  
    for (let i = 0; i < asteroidsCopy.length; i++) {
      const aX = asteroidsCopy[i].xPos;
      const aY = asteroidsCopy[i].yPos;
  
      for (let j = 0; j < bulletsCopy.length; j++) {
        bX = bulletsCopy[j].xPos
        bY = bulletsCopy[j].yPos;
        if ((aX === bX) && (aY === bY)) {
          asteroids = asteroids.filter((_, index) => index != i);
          bullets = bullets.filter((_, index) => index != j);
  
          cells[bY][bX].removeClass("cell--active");
          score += 1;
          updateScore(score);
  
          if (asteroidSpeed > 0) {
            asteroidSpeed -= 1;
          }
        }
      }
  
      for (let k=0; k < player["front"]["x"].length; k++) {
        const sX = player["front"]["x"][k];
        const sY = player["front"]["y"][k];
  
        const cX = spaceShip.coords[spaceShip.coords.length - 1 - sY][sX][0];
        const cY = spaceShip.coords[spaceShip.coords.length - 1 - sY][sX][1];
    
        if ((cX === aX) && (cY === aY)) {
          gameIsOn = false;
          console.log("Game Over!");
          return;
        }
      }
    }
  }

  }
}

async function handleEnemyShip() {
  const bulletsToRemove = new Set();

  for (let j = bullets.length - 1; j >= 0; j--) {
    const pX = bullets[j].xPos;
    const pY = bullets[j].yPos;

    for (let k = 0; k < spaceShipSkin["B"]["front"]["x"].length; k++) {
      const sX = spaceShipSkin["B"]["front"]["x"][k];
      const sY = spaceShipSkin["B"]["front"]["y"][k];
    
      const cX = enemySpaceShip.coords[enemySpaceShip.coords.length - 1 - sY][sX][0];
      const cY = enemySpaceShip.coords[enemySpaceShip.coords.length - 1 - sY][sX][1];
    
      if (cX === pX && cY === pY) {
        if (enemySpaceShip.health > 0) {
          enemySpaceShip.health -= 1;
          console.log(enemySpaceShip.health);
          updateHealthBar(enemySpaceShip, [2, 10]);

          // Mark the bullet for removal
          bulletsToRemove.add(j);
        } else {
          gameIsOn = false;
          console.log("Game Over!");
          return;
        }
      }
    }
  }

  // Remove bullets after checking all collisions
  bullets = bullets.filter((_, index) => !bulletsToRemove.has(index));
}

function handleBinaryPattern() {
  updateBinaryPatterns();
  postBinaryPattern();
}
