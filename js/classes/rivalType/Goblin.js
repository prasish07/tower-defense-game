class Goblin extends Rival {
  constructor({ rivalPosition = { x: 0, y: 0 }, index }) {
    super({
      rivalPosition,
      imgSrc: "assets/pngs/enemy/goblin resize.png",
      imgInfo: {
        imgCount: 9,
        animationHoldTime: 5,
      },
      speed: 2,
      enemyHealth: 50,
      offset: {
        x: 0,
        y: 0,
      },
      index,
      damage: 10,
      money: 20,
      moneyOffset: {
        x: 0,
        y: 0,
      },
    });
  }
}
