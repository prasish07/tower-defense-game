class Building_1 extends Building {
  constructor({ position = { x: 0, y: 0 } }) {
    super({
      position,
      imgSrc:
        "../../../assets/pngs/mage_guardian_free_creativekind/sprites/blueTower.png",
      imgInfo: {
        imgCount: 14,
        animationHoldTime: 15,
      },
      projectileInfo: {
        speed: 5,
        damage: 10,
        shape: "ball",
        color: "blue",
        projectileSrc: "../../../assets/projectile/towers/level1.png",
        imgCount: 8,
        explosionSrc: "../../../assets/projectile/towers/level1Exposion.png",
        explosionCount: 7,
      },
      cost: 20,
    });
  }
}
