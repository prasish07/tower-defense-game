class Giant extends Rival {
  constructor({ rivalPosition = { x: 0, y: 0 }, index }) {
    super({
      rivalPosition,
      imgSrc: "../../../assets/pngs/enemy/gient.png",
      imgInfo: {
        imgCount: 7,
        animationHoldTime: 5,
      },
      speed: 0.8,
      enemyHealth: 100,
      offset: {
        x: 0,
        y: 0,
      },
      index,
      damage: 30,
    });
  }
}
