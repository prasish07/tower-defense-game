const canvasWidth = 1504;
const canvasHeight = 672;
let moneyHtml = document.getElementById("money");
let money = 0;
money = parseInt(moneyHtml.textContent);
let canvas;
let ctx;
let bg;
// enemy array
let rivalList = [];
// building array
let possiblePlacementBuildings = [];
let buildings = [];
let setTile = undefined;
let tower;
let clicked = false;

// different towers
let tower1;
let tower2;
let tower3;
let cancel;

// level
let waveCount = 0;
let wave = document.querySelector(".wave__count");

let selectedTower = 0;

cancel = document.getElementById("tower__0");
tower1 = document.getElementById("tower__1");
tower2 = document.getElementById("tower__2");
tower3 = document.getElementById("tower__3");

// function which return random number between 0 to 2
function getRandomNumber() {
  return Math.floor(Math.random() * 3);
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

// function to create gient
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

// function to create gient
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
  createGoblin(10, 0);
  tower = new OurTower();
  requestAnimationFrame(update);
};

possibleBuilding2D.forEach((row, y) => {
  row.forEach((number, x) => {
    if (number === 32) {
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

const mouse = {
  x: undefined,
  y: undefined,
};

// adding the building
window.addEventListener("click", () => {
  clicked = true;
  if (setTile && !setTile.isOccupied) {
    if (selectedTower === 0 && money >= 20) {
      buildings.push(new Building_1({ position: setTile.buildingPosition }));
      money -= 20;
    } else if (selectedTower === 1 && money >= 100) {
      buildings.push(new Building_2({ position: setTile.buildingPosition }));
      money -= 100;
    } else if (selectedTower === 2 && money >= 300) {
      buildings.push(new Building_3({ position: setTile.buildingPosition }));
      money -= 300;
    }
    setTile.isOccupied = true;
    buildings.sort((a, b) => {
      return a.position.y - b.position.y;
    });
  }
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
});

window.addEventListener("mousemove", (e) => {
  clicked = false;
  mouse.x = e.x;
  mouse.y = e.y;
  setTile = null;
  for (let i = 0; i < possiblePlacementBuildings.length; i++) {
    const currentTile = possiblePlacementBuildings[i];
    if (
      mouse.x > currentTile.buildingPosition.x &&
      mouse.x < currentTile.buildingPosition.x + currentTile.size &&
      mouse.y > currentTile.buildingPosition.y &&
      mouse.y < currentTile.buildingPosition.y + currentTile.size
    ) {
      setTile = currentTile;
      break;
    }
  }
});

const update = () => {
  let frame = requestAnimationFrame(update);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(bg, 0, 0, canvasWidth, canvasHeight);

  moneyHtml.textContent = money;
  wave.textContent = waveCount;

  for (let i = rivalList.length - 1; i >= 0; i--) {
    let rival = rivalList[i];
    rival.updatePosition();
  }
  // add a cannot place a summons in this location on top of mouse
  if (clicked && !setTile) {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial"; // Set the font size and family
    ctx.fillText("Can't place summon here", mouse.x, mouse.y - 20);
  }

  // update the building position
  for (let i = possiblePlacementBuildings.length - 1; i >= 0; i--) {
    let build = possiblePlacementBuildings[i];
    build.updateBuildingPosition(mouse);
  }

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
        if (projectile.rival.fullHealth <= 0) {
          let currentEnemyIndex = rivalList.indexOf(projectile.rival);
          if (currentEnemyIndex > -1) {
            rivalList.splice(currentEnemyIndex, 1);
            money += 50;
          }
        }
      }
    }
  });

  // create waves
  if (rivalList.length <= 0) {
    waveCount++;
    createGoblin(parseInt(20 * (waveCount + 0.5)), 30);
    createGiant(10 * waveCount, 0);
    if (waveCount > 2) {
      createDragon(4 * waveCount, 0);
    }
  }

  // our tower
  tower.updateTower();

  // Ending the game
  if (tower.OurTowerHealth <= 0) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "100px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    cancelAnimationFrame(frame);
  }
};

window.onload = () => {
  bg = new Image();
  bg.src = "../assets/map2.png";
  bg.onload = () => {
    start();
  };
};
