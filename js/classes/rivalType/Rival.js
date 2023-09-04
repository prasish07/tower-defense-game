class Rival extends Sprite {
  constructor({
    rivalPosition = { x: 0, y: 0 },
    index,
    imgSrc,
    imgInfo,
    speed,
    enemyHealth,
    offset,
    money,
    damage,
    moneyOffset,
  }) {
    super({
      position: rivalPosition,
      imgSrc: imgSrc,
      imgInfo: imgInfo,
    });
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
    this.moneyOffset = moneyOffset;
    // this.enemyHealth = enemyHealth ? enemyHealth : 200;
    this.enemyHealth = enemyHealth;
    this.fullHealth = this.enemyHealth;
    this.actualSpeed = speed;
    this.speed = speed;
    this.offset = offset;
    this.money = money;
    this.damage = damage;
    this.isSlowed;

    // getting the center of our enemy
    this.center = {
      x: this.rivalPosition.x + this.width / 2,
      y: this.rivalPosition.y + this.height / 2,
    };
  }

  drawRival() {
    super.drawSprite();
    this.drawHealthBar();
  }

  drawHealthBar() {
    // const damageText = `${this.fullHealth - this.enemyHealth}`;

    ctx.fillStyle = "red";
    ctx.fillRect(
      this.rivalPosition.x + this.offset.x,
      this.rivalPosition.y - 15,
      this.enemyHealth,
      5
    );
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.rivalPosition.x + this.offset.x,
      this.rivalPosition.y - 15,
      this.fullHealth,
      5
    );

    // Display the damage text
    ctx.fillStyle = "red";
    ctx.font = "12px Arial";
    ctx.fillText(
      this.fullHealth,
      this.rivalPosition.x + this.offset.x + this.enemyHealth - 30,
      this.rivalPosition.y - 15 - 5
    );
  }

  updatePosition() {
    this.drawRival();
    let currentPathway = enemyPathwayList[this.randomValue];
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
      this.index < enemyPathwayList[0].length - 1
    ) {
      this.index++;
    }
  }
}
