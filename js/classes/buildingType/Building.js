class Building extends Sprite {
  constructor({ position = { x: 0, y: 0 } }) {
    super({
      position,
      imgSrc:
        "../../../assets/pngs/mage_guardian_free_creativekind/mage_guardian-blue.png",
      imgInfo: {
        imgCount: 14,
      },
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
    this.buildingCenter = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.size / 2,
    };
    this.buildingProjectile = [];
    this.time = 0;
  }
  drawCurrentBuilding() {
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.position.x, this.position.y, this.size * 2, this.size);
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
        })
      );
    }
    this.time++;
  }
}
