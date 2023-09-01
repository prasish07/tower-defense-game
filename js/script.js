const canvasWidth = 1504;
const canvasHeight = 672;
let moneyHtml = document.getElementById("money");
let money = 0;
money = parseInt(moneyHtml.textContent);
let canvas;
let ctx;
let bg;
bg = new Image();
// enemy array
let rivalList = [];
// building array
let possiblePlacementBuildings = [];
let buildings = [];
let setTile = undefined;
let tower;
let clicked = false;
let increase = 1;

let isCustomLevel = false;

let frame;

let isMax = false;

// different towers
let tower1;
let tower2;
let tower3;
let cancel;

// explosion
let explosions = [];

// money
let moneyDrops = [];

let isCoinNotEnough = false;

// level
let waveCount = 0;
let wave = document.querySelector(".wave__count");

let selectedTower = 0;

cancel = document.getElementById("tower__0");
tower1 = document.getElementById("tower__1");
tower2 = document.getElementById("tower__2");
tower3 = document.getElementById("tower__3");

const towerElements = [tower1, tower2, tower3, cancel];
const towerCosts = [20, 100, 500];

// function which return random number between 0 to 2
function getRandomNumber() {
  return Math.floor(Math.random() * 3);
}

// restart the game
function resetGame() {
  money = 100;
  rivalList = [];
  buildings = [];
  tower.OurTowerHealth = 100;
  waveCount = 0;
  isMax = false;
  isCoinNotEnough = false;
  moneyDrops = [];
  explosions = [];
  possiblePlacementBuildings = [];

  // Restart the game loop
  cancelAnimationFrame(frame);
  start();
}

function nextLevelMethod() {
  cancelAnimationFrame(frame);
  money = 200;
  increase = increase + 2;
  rivalList = [];
  buildings = [];
  tower.OurTowerHealth = 100;
  waveCount = 0;
  isMax = false;
  isCoinNotEnough = false;
  moneyDrops = [];
  explosions = [];
  possibleBuilding2D = [];
  possiblePlacementBuildings = [];
  bg.src = mapArray[level - 1];
  start();
}

// function to create goblin
function createGoblin(n, distance) {
  for (let i = 1; i < n; i++) {
    let randomValue = getRandomNumber();

    let xEnemyDistance = i * 100 - distance * i;

    const rivalStartingPoint = {
      x: enemyPathwayList[randomValue][0].x - xEnemyDistance,
      y: enemyPathwayList[randomValue][0].y,
    };
    rivalList.push(
      new Goblin({ rivalPosition: rivalStartingPoint, index: randomValue })
    );
  }
}

// function to create giant
function createGiant(n, distance) {
  for (let i = 1; i < n; i++) {
    let randomValue = getRandomNumber();

    let xEnemyDistance = i * 100 - distance * i;

    const rivalStartingPoint = {
      x: enemyPathwayList[randomValue][0].x - xEnemyDistance,
      y: enemyPathwayList[randomValue][0].y,
    };
    rivalList.push(
      new Giant({ rivalPosition: rivalStartingPoint, index: randomValue })
    );
  }
}

// function to create dragon
function createDragon(n, distance) {
  for (let i = 1; i < n; i++) {
    let randomValue = getRandomNumber();

    let xEnemyDistance = i * 100 - distance * i;

    const rivalStartingPoint = {
      x: enemyPathwayList[randomValue][0].x - xEnemyDistance,
      y: enemyPathwayList[randomValue][0].y,
    };
    rivalList.push(
      new Dragon({ rivalPosition: rivalStartingPoint, index: randomValue })
    );
  }
}

// function to check available tower
function updateTowerAvailability() {
  towerElements.forEach((tower, index) => {
    // if (index === selectedTower) {
    //   tower.classList.remove("grayed-out");
    // } else
    if (index !== 3 && money < towerCosts[index]) {
      tower.classList.add("grayed-out");
    } else {
      tower.classList.remove("grayed-out");
    }
  });
}

tower1.addEventListener("click", () => {
  selectedTower = 0;
});
tower2.addEventListener("click", () => {
  selectedTower = 1;
});
tower3.addEventListener("click", () => {
  selectedTower = 2;
});
cancel.addEventListener("click", () => {
  selectedTower = 3;
});

const start = () => {
  canvas = document.getElementById("canvas");

  canvas.height = canvasHeight;
  canvas.width = canvasWidth;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "lightblue";
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  createGoblin(10 * increase, 0);
  tower = new OurTower();
  sound = playSound("../assets/music/tower defense music.mp4", true);
  creatingPossibleBuilding();
  requestAnimationFrame(update);
};

function creatingPossibleBuilding() {
  possibleBuilding2D.forEach((row, y) => {
    row.forEach((number, x) => {
      if (number === 1921) {
        possiblePlacementBuildings.push(
          new BuildingPosition({
            buildingPosition: {
              x: x * 32,
              y: y * 32,
            },
          })
        );
      }
    });
  });
}

const mouse = {
  x: undefined,
  y: undefined,
};

// adding the building
window.addEventListener("click", () => {
  clicked = true;
  if (setTile && selectedTower === 3 && setTile.isOccupied) {
    const positionToRemove = setTile.buildingPosition;

    // Find the index of the building with the matching position
    const indexToRemove = buildings.findIndex((building) => {
      return (
        building.position.x === positionToRemove.x &&
        building.position.y === positionToRemove.y
      );
    });
    const currentBuilding = buildings[indexToRemove];
    if (indexToRemove !== -1) {
      money += currentBuilding.cost / 2;
      buildings.splice(indexToRemove, 1);
      setTile.isOccupied = false;
    }
  }
  if (buildings.length >= 10) {
    isMax = true;
    return;
  } else if (buildings.length < 10) {
    isMax = false;
  }
  if (setTile && !setTile.isOccupied) {
    if (selectedTower === 0 && money >= 20) {
      buildings.push(new Building_1({ position: setTile.buildingPosition }));
      money -= 20;
    } else if (selectedTower === 1 && money >= 100) {
      buildings.push(new Building_2({ position: setTile.buildingPosition }));
      money -= 100;
    } else if (selectedTower === 2 && money >= 500) {
      buildings.push(new Building_3({ position: setTile.buildingPosition }));
      money -= 500;
    } else {
      isCoinNotEnough = true;
      return;
    }
    landing = playSound("../assets/music/tower landing sound.mp3", false);
    setTile.isOccupied = true;
    buildings.sort((a, b) => {
      return a.position.y - b.position.y;
    });
  }
});

window.addEventListener("mousemove", (e) => {
  clicked = false;
  mouse.x = e.x;
  mouse.y = e.y;
  setTile = null;
  isCoinNotEnough = false;
  for (let i = 0; i < possiblePlacementBuildings.length; i++) {
    const currentTile = possiblePlacementBuildings[i];
    if (
      mouse.x > currentTile.buildingPosition.x &&
      mouse.x < currentTile.buildingPosition.x + currentTile.size * 2 &&
      mouse.y > currentTile.buildingPosition.y &&
      mouse.y < currentTile.buildingPosition.y + currentTile.size
    ) {
      setTile = currentTile;
      break;
    }
  }
});

const update = () => {
  frame = requestAnimationFrame(update);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(bg, 0, 0, canvasWidth, canvasHeight);
  if (isCustomLevel) {
    createdObject2d.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile === 101) {
          let image = new Image();
          image.src = "../../assets/cutome level editor/tile/tile1.png";
          ctx.drawImage(image, x * 32, y * 32, 32, 32);
        }
      });
    });
  }

  moneyHtml.textContent = money;
  wave.textContent = waveCount;
  levelHtml.textContent = level;
  if (isCustomLevel) {
    levelHtml.textContent = 0;
  }
  updateTowerAvailability();
  if (isMax) {
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText(
      "You have already place maximum number of building",
      canvasWidth / 3,
      150
    );
  }

  for (let i = rivalList.length - 1; i >= 0; i--) {
    let rival = rivalList[i];
    rival.updatePosition();
  }
  // add a cannot place a summons in this location on top of mouse
  if (clicked && !setTile) {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Can't place summon here", mouse.x, mouse.y - 20);
  }

  if (isCoinNotEnough && setTile) {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Not enough coin", mouse.x, mouse.y - 20);
  }

  for (let i = explosions.length - 1; i >= 0; i--) {
    const explosion = explosions[i];
    explosion.drawSprite();

    if (explosion.imgInfo.current >= explosion.imgInfo.imgCount - 1) {
      explosions.splice(i, 1);
    }
  }

  // update the building position
  for (let i = possiblePlacementBuildings.length - 1; i >= 0; i--) {
    let build = possiblePlacementBuildings[i];
    build.updateBuildingPosition(mouse);
  }

  for (let i = moneyDrops.length - 1; i >= 0; i--) {
    const moneyDrop = moneyDrops[i];
    moneyDrop.update();
    moneyDrop.draw(ctx);

    if (moneyDrop.shouldRemove()) {
      moneyDrops.splice(i, 1);
    }
  }

  // draw the path or object if custom level

  // update the building
  buildings.forEach((building) => {
    building.updateCurrentBuilding();
    building.target = null;
    const targetedRivals = rivalList.filter((rival) => {
      const distanceX = rival.center.x - building.buildingCenter.x;
      const distanceY = rival.center.y - building.buildingCenter.y;
      const distance = Math.hypot(distanceX, distanceY);
      return distance < building.buildingRadius + rival.radius;
    });
    building.target = targetedRivals[0];
    for (let i = building.buildingProjectile.length - 1; i >= 0; i--) {
      let projectile = building.buildingProjectile[i];
      projectile.updateProjectile();

      const distanceX = projectile.rival.center.x - projectile.position.x;
      const distanceY = projectile.rival.center.y - projectile.position.y;
      const distance = Math.hypot(distanceX, distanceY);
      if (distance < projectile.radius + projectile.rival.radius) {
        building.buildingProjectile.splice(i, 1);
        projectile.rival.fullHealth -= projectile.projectileInfo.damage;

        // pushing explosion sprites to the array
        explosions.push(
          new Sprite({
            position: { x: projectile.position.x, y: projectile.position.y },
            imgSrc: projectile.projectileInfo.explosionSrc,
            imgInfo: {
              imgCount: projectile.projectileInfo.explosionCount,
              animationHoldTime: 5,
            },
            fixPosition: {
              x: -50,
              y: 0,
            },
          })
        );

        if (projectile.rival.fullHealth <= 0) {
          let currentEnemyIndex = rivalList.indexOf(projectile.rival);
          if (currentEnemyIndex > -1) {
            const enemyPosition = {
              x: projectile.rival.position.x,
              y: projectile.rival.position.y,
            };
            const moneyAmount = 50; // Set the amount of money dropped here
            const moneyImgSrc = "../assets/coin/coin.svg"; // Set the image source here
            moneyDrops.push(
              new MoneyDrop(enemyPosition, moneyAmount, moneyImgSrc)
            );
            rivalList.splice(currentEnemyIndex, 1);
            money += moneyAmount;
          }
        }
      }
    }
  });

  // create waves
  if (rivalList.length <= 0) {
    waveCount++;
    createGoblin(parseInt(20 * (waveCount + 0.5) * increase), 30);
    createGiant(10 * increase * waveCount, 0);
    if (waveCount > 2) {
      createDragon(4 * increase * waveCount, 0);
    }
  }

  // our tower
  tower.updateTower();

  // Ending the game
  if (tower.OurTowerHealth <= 0) {
    // clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    stopSound(sound);
    cancelAnimationFrame(frame);
    container.style.filter = "blur(5px)";
    gameOver.style.display = "flex";
  }

  if (waveCount === 4) {
    stopSound(sound);
    cancelAnimationFrame(frame);
    container.style.filter = "blur(5px)";
    if (isCustomLevel) {
      gameCompletedContainer.style.display = "flex";
      return;
    }
    if (level > 2) {
      gameCompletedContainer.style.display = "flex";
    } else {
      nextLevel.style.display = "flex";
    }
  }
};

gameStartingBtn.addEventListener("click", () => {
  // gameStarting.style.display = "none";
  loadingOverlay.style.display = "flex";
  setTimeout(function () {
    gameStarting.classList.add("hide");
    gameStarting.style.display = "none";
    customLevelContainer.style.display = "none";
    loadingOverlay.style.display = "none";
    container.style.opacity = 1;
    container.style.display = "flex";
    container.style.visibility = "visible";

    bg.src = mapArray[level - 1];
    start();
  }, 2000);
});

restart.addEventListener("click", () => {
  gameOver.style.display = "none";
  container.style.filter = "blur(0px)";

  resetGame();
});

nextLevelBtn.addEventListener("click", () => {
  level++;
  nextLevel.style.display = "none";
  container.style.filter = "blur(0px)";
  levelData = generateLevelData(level);
  enemyPathwayList = levelData.enemyPathwayList;
  possibleBuilding2D = levelData.possibleBuilding2D;
  nextLevelMethod();
});

//  clicking the start button in custom mode
startGame.addEventListener("click", () => {
  if (tilePlaceArea.length === 0 || enemyWaypoints.length === 0) {
    alert(
      "Either the way point or tile is not place, Please complete all the step to start the game!!"
    );
    return;
  }

  const towerLeft = 1300;
  const towerTop = 300;
  const towerWidth = 200;
  const towerHeight = 200;
  const towerRight = towerLeft + towerWidth;
  const towerBottom = towerTop + towerHeight;

  const collidesWithTower = enemyWaypoints.some((point) => {
    const pointX = point.x;
    const pointY = point.y;
    return (
      pointX >= towerLeft &&
      pointX <= towerRight &&
      pointY >= towerTop &&
      pointY <= towerBottom
    );
  });

  if (!collidesWithTower) {
    alert("No waypoint collides with our castle!!!.");
    return;
  }

  // remove the ctxEditor
  cancelAnimationFrame(editorFrame);
  cancelAnimationFrame(frame);
  ctxEditor.clearRect(0, 0, canvasEditorWidth, canvasEditorHeight);
  // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  gameStarting.style.display = "none";
  customLevelContainer.style.display = "none";
  container.style.display = "flex";
  container.style.visibility = "visible";
  container.style.opacity = 1;
  container.style.filter = "blur(0px)";
  possibleBuilding2D = [];
  possiblePlacementBuildings = [];
  levelData = generateLevelData(0);
  enemyPathwayList = levelData.enemyPathwayList;
  possibleBuilding2D = levelData.possibleBuilding2D;
  // console.log(possibleBuilding2D);
  isCustomLevel = true;
  money = 200;
  rivalList = [];
  buildings = [];
  // tower.OurTowerHealth = 100;
  waveCount = 0;
  isMax = false;
  isCoinNotEnough = false;
  moneyDrops = [];
  explosions = [];
  setTimeout(() => {
    bg.src = "../assets/cutome level editor/map.png";
    start();
  }, 1000);
});

restartCurrentLevel.addEventListener("click", () => {
  gameCompletedContainer.style.display = "none";
  container.style.filter = "blur(0px)";
  resetGame();
});

restartFromStart.addEventListener("click", () => {
  gameCompletedContainer.style.display = "none";
  container.style.filter = "blur(0px)";
  level = 1;
  levelData = generateLevelData(level);
  enemyPathwayList = levelData.enemyPathwayList;
  possibleBuilding2D = levelData.possibleBuilding2D;
  cancelAnimationFrame(frame);
  money = 200;
  increase = increase + 2;
  rivalList = [];
  buildings = [];
  tower.OurTowerHealth = 100;
  waveCount = 0;
  isMax = false;
  isCoinNotEnough = false;
  moneyDrops = [];
  explosions = [];
  possiblePlacementBuildings = [];
  bg.src = mapArray[level - 1];
  start();
});
