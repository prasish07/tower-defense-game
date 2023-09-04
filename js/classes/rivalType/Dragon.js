class Dragon extends Rival {
  constructor({ rivalPosition = { x: 0, y: 0 }, index }) {
    super({
      rivalPosition,
      imgSrc: "assets/pngs/enemy/dragon3.png",
      imgInfo: {
        imgCount: 7,
        animationHoldTime: 10,
      },
      speed: 1.3,
      enemyHealth: 200,
      offset: {
        x: -30,
        y: 0,
      },
      index,
      damage: 60,
      money: 200,
    });
  }
}
