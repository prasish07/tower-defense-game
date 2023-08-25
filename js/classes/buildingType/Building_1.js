class Building_1 extends Building {
  constructor({ position = { x: 0, y: 0 } }) {
    super({
      position,
      imgSrc:
        "../../../assets/pngs/mage_guardian_free_creativekind/mage_guardian-blue.png",
      imgInfo: {
        imgCount: 14,
      },
      projectileInfo: {
        speed: 5,
        damage: 10,
        shape: "ball",
        color: "blue",
      },
      cost: 20,
    });
  }
}
