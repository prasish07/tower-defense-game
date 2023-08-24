class Projectile {
  constructor({ position = { x: 0, y: 0 }, rival }) {
    this.position = position;
    this.speed = 10;
    this.projectileVelocity = {
      x: 0,
      y: 0,
    };
    this.rival = rival;
    this.radius = 5;
  }
  drawProjectile() {
    // let projectileImage = new Image()
    // projectileImage.src = "../../assets/Foozle_2DS0018_Spire_TowerPack_2/Towers Weapons/Tower 04/Previews/Tower 04 - Level 03 - Projectile.gif"
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
  }

  updateProjectile() {
    this.drawProjectile();
    let projectileAngle = Math.atan2(
      this.rival.center.y - this.position.y,
      this.rival.center.x - this.position.x
    );
    this.projectileVelocity.x = Math.cos(projectileAngle) * this.speed;
    this.projectileVelocity.y = Math.sin(projectileAngle) * this.speed;
    this.position.x += this.projectileVelocity.x;
    this.position.y += this.projectileVelocity.y;
  }
}
