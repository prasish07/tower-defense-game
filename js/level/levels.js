mapArray = ["", "", ""];

mapPaths = [];

possibleBuildingAreas = [];

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

const EnemyPathway1 = generateModifiedPathway(enemyPathway, -30, -20);
const EnemyPathway2 = generateModifiedPathway(enemyPathway, 0, 0);
const EnemyPathway3 = generateModifiedPathway(enemyPathway, -10, -30);

const enemyPathwayList = [EnemyPathway1, EnemyPathway2, EnemyPathway3];

const possibleBuilding2D = [];

for (let i = 0; i < positionBuildingTile.length; i += 47) {
  possibleBuilding2D.push(positionBuildingTile.slice(i, i + 47));
}
