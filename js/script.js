// canvas size
const canvasWidth = 1504;
const canvasHeight = 672;

// Getting the money from the html
let moneyHtml = document.getElementById("money");
let money = 0;
money = parseInt(moneyHtml.textContent);

// canvas variables
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

// To increase the amount of enemy in next level
let increase = 1;

// Checking for custom level
let isCustomLevel = false;

let frame;
let isMax = false;

// different towers
let tower1;
let tower2;
let tower3;
let cancel;

// To show which tower is being selected
const towerPreview = document.getElementById("towerPreview");
const towerPreviewOffsetX = 20;
const towerPreviewOffsetY = 20;

// explosion
let explosions = [];

// money
let moneyDrops = [];
const moneyImgSrc = "assets/coin/coin.svg";

// To check if user have enough money for landing the tower
let isCoinNotEnough = false;

// Displaying the wave count
let waveCount = 0;
let wave = document.querySelector(".wave__count");

// To know which tower is being currently selected
let selectedTower = 0;

// Getting different towers and cancel button
cancel = document.getElementById("tower__0");
tower1 = document.getElementById("tower__1");
tower2 = document.getElementById("tower__2");
tower3 = document.getElementById("tower__3");

// Storing each tower in the tower array
const towerElements = [tower1, tower2, tower3, cancel];
const towerCosts = [20, 100, 500];

// A function which return random number between 0 to 2
function getRandomNumber() {
  return Math.floor(Math.random() * 3);
}

// Function that controls the restart of the game
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

  // Stopping the previous the game loop
  cancelAnimationFrame(frame);

  // Starting the new
  start();
}

// FUnction that controls the next level
function nextLevelMethod() {
  cancelAnimationFrame(frame);
  money = 200;
  increase = increase + 1;
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
  levelData = generateLevelData(level);
  enemyPathwayList = levelData.enemyPathwayList;
  possibleBuilding2D = levelData.possibleBuilding2D;
  // Getting the new image of that level
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
    if (index !== 3 && money < towerCosts[index]) {
      tower.classList.add("grayed-out");
    } else {
      tower.classList.remove("grayed-out");
    }
  });
}

// Add an event listener to update the tower preview when a tower is selected
tower1.addEventListener("click", () => {
  selectedTower = 0;
  container.classList.remove("not-allowed");
  updateTowerPreview("assets/towers/mage_guardian_blue.png");
});
tower2.addEventListener("click", () => {
  selectedTower = 1;
  container.classList.remove("not-allowed");
  updateTowerPreview("assets/towers/mage_guardian_magenta.png");
});
tower3.addEventListener("click", () => {
  selectedTower = 2;
  container.classList.remove("not-allowed");
  updateTowerPreview("assets/towers/mage_guardian_red.png");
});
cancel.addEventListener("click", () => {
  selectedTower = 3;
  container.classList.add("not-allowed");
  hideTowerPreview();
});

// Function which start the game
const start = () => {
  canvas = document.getElementById("canvas");
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "lightblue";
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  createGoblin(10 * increase, 0);
  tower = new OurTower();
  sound = playSound("assets/music/tower defense music.mp4", true);
  creatingPossibleBuilding();
  requestAnimationFrame(update);
};

// Function to update the tower preview image source
function updateTowerPreview(imageSrc) {
  towerPreview.src = imageSrc;
  towerPreview.style.display = "block";
}

// Function to hide the tower preview
function hideTowerPreview() {
  towerPreview.style.display = "none";
}

// A function which gives the x and y of tower placement areas
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

// mouse x and y
const mouse = {
  x: undefined,
  y: undefined,
};

// handling event for click event
window.addEventListener("click", () => {
  clicked = true;
  // Condition to remove the tower from the placement area
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
  // Condition to not allow the user to place tower more than 10
  if (buildings.length >= 10) {
    isMax = true;
    return;
  } else if (buildings.length < 10) {
    isMax = false;
  }
  // Placing the tower in available placeable area
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
    // Playing the tower landing sound
    landing = playSound("assets/music/tower landing sound.mp3", false);
    setTile.isOccupied = true;

    // Sorting the tower in ascending order
    buildings.sort((a, b) => {
      return a.position.y - b.position.y;
    });
  }
});

// Handling the mouse move
window.addEventListener("mousemove", (e) => {
  // To show the tower preview where mouse goes
  if (selectedTower !== 3) {
    towerPreview.style.left = e.clientX + towerPreviewOffsetX + "px";
    towerPreview.style.top = e.clientY + towerPreviewOffsetY + "px";
  }
  clicked = false;
  mouse.x = e.x;
  mouse.y = e.y;
  setTile = null;
  isCoinNotEnough = false;

  // for checking if the tower placeable area is collided with the mouse x and y
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

// Function which handle the animation
const update = () => {
  frame = requestAnimationFrame(update);
  // cleaning the canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Drawing the background
  ctx.drawImage(bg, 0, 0, canvasWidth, canvasHeight);

  // Condition to draw the custom path when it is custom level
  if (isCustomLevel) {
    createdObject2d.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile === 101) {
          let image = new Image();
          image.src = "assets/custom level editor/tile/tile1.png";
          ctx.drawImage(image, x * 32, y * 32, 32, 32);
        }
      });
    });
  }

  // Writing the update money and wave in every frame
  moneyHtml.textContent = money;
  wave.textContent = waveCount;
  levelHtml.textContent = level;

  // To place the level to 0 if it is custom level
  if (isCustomLevel) {
    levelHtml.textContent = 0;
  }

  // To check if the tower placeable area in every frame
  updateTowerAvailability();

  // To notify the user if user has place the maximum number of building
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

  // update the building
  buildings.forEach((building) => {
    building.updateCurrentBuilding();
    building.target = null;
    const targetedRivals = rivalList.filter((rival) => {
      const distanceX = rival.center.x - building.buildingCenter.x;
      const distanceY = rival.center.y - building.buildingCenter.y;
      const distance = Math.hypot(distanceX, distanceY);
      return distance <= building.buildingRadius + rival.radius;
    });
    building.target = targetedRivals[0];
    building.rivals = targetedRivals;
    for (let i = building.buildingProjectile.length - 1; i >= 0; i--) {
      let projectile = building.buildingProjectile[i];
      projectile.updateProjectile();

      const distanceX = projectile.rival.center.x - projectile.position.x;
      const distanceY = projectile.rival.center.y - projectile.position.y;
      const distance = Math.hypot(distanceX, distanceY);
      if (distance < projectile.radius + projectile.rival.radius) {
        building.buildingProjectile.splice(i, 1);
        if (!building.projectileInfo.willExplode) {
          projectile.rival.fullHealth -= projectile.projectileInfo.damage;
          if (projectile.rival.fullHealth <= 0) {
            let currentEnemyIndex = rivalList.indexOf(projectile.rival);
            if (currentEnemyIndex > -1) {
              const enemyPosition = {
                x: projectile.rival.position.x,
                y: projectile.rival.position.y,
              };
              const moneyAmount = projectile.rival.money;
              const moneyOffset = projectile.rival.moneyOffset;

              moneyDrops.push(
                new MoneyDrop(
                  enemyPosition,
                  moneyAmount,
                  moneyImgSrc,
                  moneyOffset
                )
              );
              rivalList.splice(currentEnemyIndex, 1);
              money += moneyAmount;
            }
          }
        } else {
          // Loop through rivals within the explosion radius and apply damage
          for (let j = rivalList.length - 1; j >= 0; j--) {
            const rival = rivalList[j];
            const distanceFromExplosion = Math.hypot(
              rival.center.x - projectile.position.x,
              rival.center.y - projectile.position.y
            );

            // Apply damage to rivals within the explosion radius
            if (distanceFromExplosion <= 100) {
              rival.fullHealth -= projectile.projectileInfo.damage;
              if (rival.fullHealth <= 0) {
                const moneyAmount = rival.money;
                const enemyPosition = rival.rivalPosition;
                const moneyOffset = rival.moneyOffset;
                moneyDrops.push(
                  new MoneyDrop(
                    enemyPosition,
                    moneyAmount,
                    moneyImgSrc,
                    moneyOffset
                  )
                );
                // remove the rival from the array
                rivalList.splice(j, 1);
                money += moneyAmount;
              }
            }
          }
        }

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
              x: -50 + projectile.projectileInfo.explosionOffset.x,
              y: 0 + projectile.projectileInfo.explosionOffset.y,
            },
          })
        );
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
      restartFromStart.style.display = "none";
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
  isCustomLevel = true;
  money = 200;
  rivalList = [];
  buildings = [];
  waveCount = 0;
  isMax = false;
  isCoinNotEnough = false;
  moneyDrops = [];
  explosions = [];
  setTimeout(() => {
    bg.src = "assets/custom level editor/map.png";
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
  increase = increase;
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

// For going to dashboard(main page)
dashboard1.addEventListener("click", () => {
  location.reload();
});
dashboard2.addEventListener("click", () => {
  location.reload();
});
dashboard3.addEventListener("click", () => {
  location.reload();
});
