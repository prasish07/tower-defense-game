class Building {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    this.size = 32;
    this.width = this.size * 2;
    this.buildingRadius = 300;
    this.target;
    this.time = 0;
    this.buildingCenter = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.size / 2,
    };
    this.buildingProjectile = [];
  }
  drawCurrentBuilding() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.size * 2, this.size);

    ctx.beginPath();
    console.log(this.buildingCenter.x, this.buildingCenter.y);
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
