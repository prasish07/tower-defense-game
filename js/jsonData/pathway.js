// const enemyPathway = [
//   {
//     x: -103.525449821996,
//     y: 407.032618108342,
//   },
//   {
//     x: 295.214086404311,
//     y: 438.479745982873,
//   },
//   {
//     x: 298.108342153372,
//     y: 234.434715674011,
//   },
//   {
//     x: 781.449052246705,
//     y: 235.881843548542,
//   },
//   {
//     x: 781.449052246705,
//     y: 499.259116713172,
//   },
//   {
//     x: 1334.25190031752,
//     y: 499.259116713172,
//   },
//   {
//     x: 1334.25190031752,
//     y: -1.44712787453093,
//   },
// ];
const enemyPathway = [
  {
    x: -44,
    y: 469.333333333333,
  },
  {
    x: 229.333333333333,
    y: 469.333333333333,
  },
  {
    x: 228,
    y: 268,
  },
  {
    x: 688,
    y: 274.666666666667,
  },
  {
    x: 688,
    y: 528,
  },
  {
    x: 1070.66666666667,
    y: 528,
  },
  {
    x: 1066.66666666667,
    y: 298.666666666667,
  },
  {
    x: 1581.33333333333,
    y: 301.333333333333,
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

const EnemyPathway1 = generateModifiedPathway(enemyPathway, -80, -20);
const EnemyPathway2 = generateModifiedPathway(enemyPathway, 0, 0);
const EnemyPathway3 = generateModifiedPathway(enemyPathway, -50, -50);

const enemyPathwayList = [EnemyPathway1, EnemyPathway2, EnemyPathway3];
