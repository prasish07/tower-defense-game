class Rival extends Sprite {
  constructor({
    rivalPosition = { x: 0, y: 0 },
    index,
    // imgSrc,
    // imgInfo,
    // speed,
    // enemyHealth,
  }) {
    super({
      position: rivalPosition,
      imgSrc: "../../../assets/pngs/enemy/goblin resize.png",
      imgInfo: {
        imgCount: 9,
        animationHoldTime: 5,
      },
    });
    console.log(rivalPosition);
    this.index = 0;
    this.rivalPosition = rivalPosition;
    this.width = 50;
    this.height = 50;
    this.radius = 30;
    this.randomValue = index;
    this.rivalVelocity = {
      x: 0,
      y: 0,
    };
    // this.enemyHealth = enemyHealth ? enemyHealth : 200;
    this.enemyHealth = 100;
    this.fullHealth = this.enemyHealth;
    this.speed = 2;

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
      this.enemyHealth,
      5
    );
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.rivalPosition.x,
      this.rivalPosition.y - 15,
      this.fullHealth,
      5
    );
  }

  updatePosition() {
    this.drawRival();
    let currentPathway = enemyPathwayList[this.randomValue];
    console.log(currentPathway);
    const rivalPathway = currentPathway[this.index];
    let distanceY = rivalPathway.y - this.center.y;
    let distanceX = rivalPathway.x - this.center.x;
    let rivalMovingAngle = Math.atan2(distanceY, distanceX);

    this.rivalVelocity.x = Math.cos(rivalMovingAngle);
    this.rivalVelocity.y = Math.sin(rivalMovingAngle);

    // Calculate the new position with speed adjustment
    this.rivalPosition.x += this.rivalVelocity.x * this.speed;
    this.rivalPosition.y += this.rivalVelocity.y * this.speed;
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
