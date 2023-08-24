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

// different towers
let tower1;
let tower2;
let tower3;

const start = () => {
  canvas = document.getElementById("canvas");
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "lightblue";
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  createRival(10, 0);
  tower = new OurTower();
  requestAnimationFrame(update);
};

function createRival(n, distance) {
  for (let i = 1; i < n; i++) {
    let xEnemyDistance = i * 200 - distance * i;
    const rivalStartingPoint = {
      x: enemyPathway[0].x - xEnemyDistance,
      y: enemyPathway[0].y,
    };
    rivalList.push(new Rival({ rivalPosition: rivalStartingPoint }));
  }
}

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

window.addEventListener("click", () => {
  if (setTile && !setTile.isOccupied && money >= 50) {
    buildings.push(new Building({ position: setTile.buildingPosition }));
    setTile.isOccupied = true;
    money -= 50;
  }
});

window.addEventListener("mousemove", (e) => {
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

  for (let i = rivalList.length - 1; i >= 0; i--) {
    let rival = rivalList[i];
    rival.updatePosition();
  }

  for (let i = possiblePlacementBuildings.length - 1; i >= 0; i--) {
    let build = possiblePlacementBuildings[i];
    build.updateBuildingPosition(mouse);
  }

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
        projectile.rival.enemyHealth -= 10;
        if (projectile.rival.enemyHealth <= 0) {
          let currentEnemyIndex = rivalList.indexOf(projectile.rival);
          if (currentEnemyIndex > -1) {
            rivalList.splice(currentEnemyIndex, 1);
            money += 50;
          }
        }
      }
    }
  });
  if (rivalList.length <= 0) {
    createRival(20, 100);
  }

  // our tower
  tower.updateTower();
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
  bg.src = "assets/map.png"; // Make sure to provide the correct image path
  bg.onload = () => {
    start();
    // setInterval(createRival, 5000);
  };
};
