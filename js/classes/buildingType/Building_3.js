class Building_3 extends Building {
  constructor({ position = { x: 0, y: 0 } }) {
    super({
      position,
      imgSrc:
        "../../../assets/pngs/mage_guardian_free_creativekind/mage_guardian-red.png",
      imgInfo: {
        imgCount: 14,
      },
      projectileInfo: {
        speed: 10,
        damage: 50,
      },
    });
  }
}
