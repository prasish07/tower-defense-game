class Building_2 extends Building {
  constructor({ position = { x: 0, y: 0 } }) {
    super({
      position,
      imgSrc:
        "../../../assets/pngs/mage_guardian_free_creativekind/sprites/purpleTower.png",
      imgInfo: {
        imgCount: 14,
        animationHoldTime: 15,
      },
      projectileInfo: {
        speed: 7,
        damage: 30,
        shape: "triangle",
        color: "purple",
        projectileSrc: "../../../assets/towers/projectile/level2.png",
        imgCount: 6,
        explosionSrc: "../../../assets/projectile/towers/level2Exposion.png",
        explosionCount: 6,
      },
      cost: 100,
    });
  }
}
