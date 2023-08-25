class Gient extends Rival {
  constructor({ rivalPosition = { x: 0, y: 0 } }) {
    super({
      rivalPosition,
      imgSrc: "../../../assets/pngs/enemy/dragon2.png",
      imgInfo: {
        imgCount: 7,
        animationHoldTime: 10,
      },
      speed: 10,
      enemyHealth: 300,
      offset: {
        x: 0,
        y: 0,
      },
    });
  }
}
