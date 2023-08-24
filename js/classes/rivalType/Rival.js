class Rival extends Sprite {
  constructor({ rivalPosition = { x: 0, y: 0 } }) {
    super({
      position: rivalPosition,
      imgSrc: "../../../assets/pngs/output-onlinepngtools.png",
      imgInfo: {
        imgCount: 8,
      },
    });
    this.index = 0;
    this.rivalPosition = rivalPosition;
    this.width = 50;
    this.height = 50;
    this.radius = 30;
    this.rivalVelocity = {
      x: 0,
      y: 0,
    };
    this.enemyHealth = this.width;

    // getting the center of our enemy
    this.center = {
      x: this.rivalPosition.x + this.width / 2,
      y: this.rivalPosition.y + this.height / 2,
    };
  }

  drawRival() {
    super.drawSprite();
    // ctx.fillStyle = "red";
    // ctx.beginPath();
    // ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    // ctx.fill();
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
    let speed = 2;
    const tolerance = 0.01;
    this.rivalVelocity.x = Math.cos(rivalMovingAngle);
    this.rivalVelocity.y = Math.sin(rivalMovingAngle);

    // Calculate the new position with speed adjustment
    this.rivalPosition.x += this.rivalVelocity.x * speed;
    this.rivalPosition.y += this.rivalVelocity.y * speed;
    this.center = {
      x: this.rivalPosition.x + this.width / 2,
      y: this.rivalPosition.y + this.height / 2,
    };
    if (
      Math.abs(Math.round(this.center.x) - Math.round(rivalPathway.x)) <
        Math.abs(this.rivalVelocity.x * 3) &&
      Math.abs(Math.round(this.center.y) - Math.round(rivalPathway.y)) <
        Math.abs(this.rivalVelocity.y * 3) &&
      this.index < enemyPathway.length - 1
    ) {
      this.index++;
    }
  }
}
