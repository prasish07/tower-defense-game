class OurTower {
  constructor() {
    this.position = { x: 1300, y: 200 };
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
    ctx.fillRect(
      this.buildingCenter.x - 100,
      this.position.y - 10,
      this.size,
      8
    );
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.buildingCenter.x - 100,
      this.position.y - 10,
      this.OurTowerHealth,
      8
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
        const currentRivalIndex = rivalList.indexOf(rival);
        const currentRival = rivalList[currentRivalIndex];
        this.OurTowerHealth -= currentRival.damage;
        if (currentRivalIndex > -1) {
          rivalList.splice(currentRivalIndex, 1);
        }
      }
    }
  }
}
