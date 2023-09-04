class Building_2 extends Building {
  constructor({ position = { x: 0, y: 0 } }) {
    super({
      position,
      imgSrc:
        "assets/pngs/mage_guardian_free_creativekind/sprites/purpleTower.png",
      imgInfo: {
        imgCount: 14,
        animationHoldTime: 15,
        slowSpeed: 0.6,
        color: "rgba(0,0,255,0.05)",
        hasSlowEffect: true,
        shootContinuously: false,
        type: 2,
        radius: 150,
      },
      projectileInfo: {
        speed: 7,
        damage: 30,
        shape: "triangle",
        color: "purple",
        projectileSrc: "assets/towers/projectile/level2.png",
        imgCount: 6,
        explosionSrc: "assets/projectile/towers/level2Exposion.png",
        explosionCount: 6,
        willExplode: false,
        explosionOffset: {
          x: 20,
          y: -30,
        },
      },
      cost: 100,
    });
  }
}
