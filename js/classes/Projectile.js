class Projectile extends Sprite {
  constructor({ position = { x: 0, y: 0 }, rival, projectileInfo }) {
    super({
      position,
      imgSrc: projectileInfo.projectileSrc,
      imgInfo: {
        imgCount: projectileInfo.imgCount,
        animationHoldTime: 5,
      },
      fixPosition: {
        x: -10,
        y: -35,
      },
    });
    this.projectileInfo = projectileInfo;
    this.projectileVelocity = {
      x: 0,
      y: 0,
    };
    this.rival = rival;
    this.radius = 5;
  }
  drawProjectile() {
    super.drawSprite();
  }

  updateProjectile() {
    this.drawProjectile();
    let projectileAngle = Math.atan2(
      this.rival.center.y - this.position.y,
      this.rival.center.x - this.position.x
    );
    this.projectileVelocity.x =
      Math.cos(projectileAngle) * this.projectileInfo.speed;
    this.projectileVelocity.y =
      Math.sin(projectileAngle) * this.projectileInfo.speed;
    this.position.x += this.projectileVelocity.x;
    this.position.y += this.projectileVelocity.y;
  }
}
