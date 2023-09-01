class Building_1 extends Building {
  constructor({ position = { x: 0, y: 0 } }) {
    super({
      position,
      imgSrc:
        "assets/pngs/mage_guardian_free_creativekind/sprites/blueTower.png",
      imgInfo: {
        imgCount: 14,
        animationHoldTime: 15,
        slowSpeed: 1,
        color: "rgba(255,0,0,0.03)",
        hasSlowEffect: false,
        shootContinuously: true,
        type: 1,
        radius: 200,
      },
      projectileInfo: {
        speed: 5,
        damage: 4,
        shape: "ball",
        color: "blue",
        projectileSrc: "assets/projectile/towers/level1.png",
        imgCount: 8,
        explosionSrc: "assets/projectile/towers/level1Exposion.png",
        explosionCount: 7,
        willExplode: false,
        explosionOffset: {
          x: 0,
          y: 0,
        },
      },
      cost: 20,
    });
  }
}
