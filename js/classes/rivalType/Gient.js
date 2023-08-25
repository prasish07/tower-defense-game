class Gient extends Rival {
  constructor({ rivalPosition = { x: 0, y: 0 } }) {
    super({
      rivalPosition,
      imgSrc: "../../../assets/pngs/enemy/gient.png",
      imgInfo: {
        imgCount: 7,
        animationHoldTime: 5,
      },
      speed: 2,
      enemyHealth: 200,
      offset: {
        x: 0,
        y: 0,
      },
    });
  }
}
