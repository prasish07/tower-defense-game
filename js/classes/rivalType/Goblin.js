class Goblin extends Rival {
  constructor({ rivalPosition = { x: 0, y: 0 } }) {
    super({
      rivalPosition,
      imgSrc: "../../../assets/pngs/enemy/goblin resize.png",
      imgInfo: {
        imgCount: 9,
        animationHoldTime: 5,
      },
      speed: 2,
      enemyHealth: 100,
      offset: {
        x: 0,
        y: 0,
      },
    });
  }
}
