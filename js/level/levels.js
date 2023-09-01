let mapArray = [
  "assets/bg/level1(mod).png",
  "assets/bg/level2Mod.png",
  "assets/bg/level3Mod2.png",
];

let MainTowerLocation = [
  {
    x: 1300,
    y: 300,
  },
  {
    x: 1300,
    y: 300,
  },
  {
    x: 1300,
    y: 300,
  },
];

let mapPaths = [enemyPathway1, enemyPathway2];

let possibleBuildingAreas = [
  positionBuildingTile1,
  positionBuildingTile2,
  positionBuildingTile3,
];

let amountOfEnemy = [2, 4, 6];

function generateModifiedPathway(originalPathway, yOffsetRange, xOffsetRange) {
  const modifiedPathway = originalPathway.map((point) => {
    const yVariation = Math.random() * yOffsetRange - yOffsetRange / 2;
    return {
      x: point.x + xOffsetRange,
      y: point.y + yVariation,
    };
  });
  return modifiedPathway;
}

function generateLevelData(level) {
  level = level - 1;
  let EnemyPathway1;
  let EnemyPathway2;
  let EnemyPathway3;
  if (level === 2) {
    EnemyPathway1 = generateModifiedPathway(enemyPathway3[0], -30, -20);
    EnemyPathway2 = enemyPathway3[0];
    EnemyPathway3 = enemyPathway3[1];
  } else if (level === -1) {
    EnemyPathway1 = generateModifiedPathway(enemyWaypoints, -30, -20);
    EnemyPathway2 = generateModifiedPathway(enemyWaypoints, 0, 0);
    EnemyPathway3 = generateModifiedPathway(enemyWaypoints, -10, -30);
  } else {
    EnemyPathway1 = generateModifiedPathway(mapPaths[level], -30, -20);
    EnemyPathway2 = generateModifiedPathway(mapPaths[level], 0, 0);
    EnemyPathway3 = generateModifiedPathway(mapPaths[level], -10, -30);
  }

  const enemyPathwayList = [EnemyPathway1, EnemyPathway2, EnemyPathway3];

  const possibleBuilding2D = [];

  if (level === -1) {
    console.log("this is running ");
    console.log(data);
    for (let i = 0; i < data.length; i += 47) {
      possibleBuilding2D.push(data.slice(i, i + 47));
    }
  } else {
    console.log("this is also running else part");
    for (let i = 0; i < possibleBuildingAreas[level].length; i += 47) {
      possibleBuilding2D.push(possibleBuildingAreas[level].slice(i, i + 47));
    }
  }

  // Return the generated level data
  return {
    enemyPathwayList,
    possibleBuilding2D,
  };
}

let level = 1;
let levelData = generateLevelData(level);
let enemyPathwayList = levelData.enemyPathwayList;
let possibleBuilding2D = levelData.possibleBuilding2D;

let levelHtml = document.querySelector(".level-count");
