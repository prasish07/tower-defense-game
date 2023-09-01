class Building_3 extends Building {
  constructor({ position = { x: 0, y: 0 } }) {
    super({
      position,
      imgSrc:
        "../../../assets/pngs/mage_guardian_free_creativekind/sprites/redTower.png ",
      imgInfo: {
        imgCount: 14,
        animationHoldTime: 15,
        slowSpeed: 1,
        color: "rgba(255,0,0,0.03)",
        hasSlowEffect: false,
        shootContinuously: false,
        type: 3,
        radius: 200,
      },
      projectileInfo: {
        speed: 5,
        damage: 30,
        shape: "rectangle",
        color: "red",
        projectileSrc: "../../../assets/projectile/towers/level3Shoot.png",
        imgCount: 6,
        explosionSrc: "../../../assets/projectile/towers/level3Exposion.png",
        explosionCount: 6,
        willExplode: true,
        explosionOffset: {
          x: 0,
          y: -80,
        },
      },
      cost: 500,
    });
  }
}
