class MoneyDrop {
  constructor(position, amount, moneyImgSrc, moneyOffset) {
    this.position = position;
    this.amount = amount;
    this.moneyImg = new Image();
    this.moneyImg.src = moneyImgSrc;
    this.timeToLive = 60;
    this.animationSpeed = 2;
    this.animationDistance = 40;
    this.currentAnimationDistance = 0;
    this.moneyOffset = moneyOffset;
  }

  update() {
    this.timeToLive--;
    this.currentAnimationDistance += this.animationSpeed;
    if (this.currentAnimationDistance >= this.animationDistance) {
      this.currentAnimationDistance = this.animationDistance;
    }
  }

  shouldRemove() {
    return this.timeToLive <= 0;
  }

  draw() {
    const drawY = this.position.y + this.currentAnimationDistance;
    ctx.drawImage(this.moneyImg, this.position.x, drawY, 32, 32);

    // Set the font style for the amount text
    ctx.font = "22px Arial";
    ctx.fillStyle = "gold";

    // Calculate the position to display the amount
    const textX = this.position.x - 25 + this.moneyOffset.x;
    const textY = drawY + 25;

    // Draw the amount text
    ctx.fillText(this.amount, textX, textY);
  }
}
