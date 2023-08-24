class OurTower {
  constructor() {
    this.position = { x: 1227, y: 20 };
    this.size = 200;
    this.OurTowerHealth = 200;
    this.width = this.size; // Calculate width based on size

    this.buildingCenter = {
      x: this.position.x + this.size / 2,
      y: this.position.y + this.size / 2,
    };
  }

  drawTower() {
    let image = new Image();
    image.src = "../../assets/pngs/castle.png";
    ctx.drawImage(
      image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
    // ctx.fillStyle = "red";
    // ctx.beginPath();
    // ctx.arc(
    //   this.buildingCenter.x,
    //   this.buildingCenter.y,
    //   this.size,
    //   0,
    //   Math.PI * 2
    // );
    // ctx.fill();
    // this.drawTowerHeight();
    this.drawTowerHealth();
  }

  drawTowerHealth() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.buildingCenter.x - 80, this.position.y, this.size, 5);
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.buildingCenter.x - 80,
      this.position.y,
      this.OurTowerHealth,
      5
    );
  }

  collidesWithEnemy(enemy) {
    const distanceX = enemy.center.x - this.buildingCenter.x;
    const distanceY = enemy.center.y - this.buildingCenter.y;
    const distance = Math.hypot(distanceX, distanceY);
    if (distance < this.size - 100) {
      console.log("collided");
      return true;
    }
  }

  updateTower() {
    this.drawTower();

    for (const rival of rivalList) {
      if (this.collidesWithEnemy(rival)) {
        const currentRival = rivalList.indexOf(rival);
        this.OurTowerHealth -= 10;
        if (currentRival > -1) {
          rivalList.splice(currentRival, 1);
        }
      }
    }
  }
}
