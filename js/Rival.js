class Rival {
  constructor({ rivalPosition = { x: 0, y: 0 } }) {
    this.index = 0;
    this.rivalPosition = rivalPosition;
    this.width = 50;
    this.height = 50;
    this.radius = 30;
    this.enemyHealth = this.width;
    // getting the center of our enemy
    this.center = {
      x: this.rivalPosition.x + this.width / 2,
      y: this.rivalPosition.y + this.height / 2,
    };
  }

  drawRival() {
    ctx.fillStyle = "red";
    // ctx.fillRect(
    //   this.rivalPosition.x,
    //   this.rivalPosition.y,
    //   this.width,
    //   this.height
    // );
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    this.drawHealthBar();
  }

  drawHealthBar() {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.rivalPosition.x,
      this.rivalPosition.y - 15,
      this.width,
      5
    );
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.rivalPosition.x,
      this.rivalPosition.y - 15,
      this.enemyHealth,
      5
    );
  }

  updatePosition() {
    this.drawRival();
    const rivalPathway = enemyPathway[this.index];
    let distanceY = rivalPathway.y - this.center.y;
    let distanceX = rivalPathway.x - this.center.x;
    let rivalMovingAngle = Math.atan2(distanceY, distanceX);
    let speed = 2; // Adjust this value as needed

    // Calculate the new position with speed adjustment
    this.rivalPosition.x += Math.cos(rivalMovingAngle);
    this.rivalPosition.y += Math.sin(rivalMovingAngle);
    this.center = {
      x: this.rivalPosition.x + this.width / 2,
      y: this.rivalPosition.y + this.height / 2,
    };
    // this.rivalPosition.x += 1;
    if (
      Math.round(this.center.x) === Math.round(rivalPathway.x) &&
      Math.round(this.center.y) === Math.round(rivalPathway.y) &&
      this.index < enemyPathway.length - 1
    ) {
      this.index++;
    }
  }
}
