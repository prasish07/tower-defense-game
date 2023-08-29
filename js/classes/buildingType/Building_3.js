class Building_3 extends Building {
  constructor({ position = { x: 0, y: 0 } }) {
    super({
      position,
      imgSrc:
        "../../../assets/pngs/mage_guardian_free_creativekind/sprites/redTower.png ",
      imgInfo: {
        imgCount: 14,
        animationHoldTime: 15,
      },
      projectileInfo: {
        speed: 10,
        damage: 50,
        shape: "rectangle",
        color: "red",
        projectileSrc: "../../../assets/towers/projectile/level3.png",
        imgCount: 6,
        explosionSrc: "../../../assets/projectile/towers/level3Exposion.png",
        explosionCount: 6,
      },
      cost: 500,
    });
  }
}
