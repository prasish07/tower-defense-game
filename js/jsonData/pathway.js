const enemyPathway = [
  {
    x: -103.525449821996,
    y: 407.032618108342,
  },
  {
    x: 295.214086404311,
    y: 438.479745982873,
  },
  {
    x: 298.108342153372,
    y: 234.434715674011,
  },
  {
    x: 781.449052246705,
    y: 235.881843548542,
  },
  {
    x: 781.449052246705,
    y: 499.259116713172,
  },
  {
    x: 1334.25190031752,
    y: 499.259116713172,
  },
  {
    x: 1334.25190031752,
    y: -1.44712787453093,
  },
];

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

const EnemyPathway1 = generateModifiedPathway(enemyPathway, 50, 50);
const EnemyPathway2 = generateModifiedPathway(enemyPathway, 0, 0);
const EnemyPathway3 = generateModifiedPathway(enemyPathway, -50, 0);

const enemyPathwayList = [EnemyPathway1, EnemyPathway2, EnemyPathway3];
console.log(enemyPathwayList[0]);
