class Building extends Sprite {
  constructor({
    position = { x: 0, y: 0 },
    imgSrc,
    imgInfo,
    projectileInfo,
    cost,
    shape,
  }) {
    super({
      position,
      imgSrc: imgSrc,
      imgInfo: imgInfo,
      fixPosition: {
        x: -15,
        y: -55,
      },
    });
    this.position = position;
    this.size = 32;
    this.width = this.size * 2;
    this.buildingRadius = 300;
    this.target;
    this.projectileInfo = projectileInfo;
    this.buildingCenter = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.size / 2,
    };
    this.buildingProjectile = [];
    this.time = 0;
    this.cost = cost;
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
    ctx.fillStyle = "rgba(0,0,255,0.03)";
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
          projectileInfo: this.projectileInfo,
        })
      );
      gun = new playSound("../../../assets/music/tower firing.mp3", false);
    }
    this.time++;
  }
}
