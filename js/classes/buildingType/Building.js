class Building extends Sprite {
  constructor({ position = { x: 0, y: 0 }, imgSrc, imgInfo, projectileInfo }) {
    super({
      position,
      imgSrc: imgSrc,
      imgInfo: imgInfo,
      fixPosition: {
        x: 0,
        y: -30,
      },
    });
    this.position = position;
    this.size = 32;
    this.width = this.size * 2;
    this.buildingRadius = 300;
    this.target;
    this.speed = projectileInfo.speed;
    this.damage = projectileInfo.damage;
    this.buildingCenter = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.size / 2,
    };
    this.buildingProjectile = [];
    this.time = 0;
  }
  drawCurrentBuilding() {
    super.drawSprite();
    ctx.beginPath();
    ctx.arc(
      this.buildingCenter.x,
      this.buildingCenter.y,
      this.buildingRadius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "rgba(0,0,255,0.05)";
    ctx.fill();
  }

  //   this will run the drawCurrentBuilding as well as add new projectile
  updateCurrentBuilding() {
    this.drawCurrentBuilding();
    if (this.target && this.time % 50 === 0) {
      this.buildingProjectile.push(
        new Projectile({
          position: {
            x: this.buildingCenter.x,
            y: this.buildingCenter.y,
          },
          rival: this.target,
          speed: this.speed,
          damage: this.damage,
        })
      );
    }
    this.time++;
  }
}
