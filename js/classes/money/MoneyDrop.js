class MoneyDrop {
  constructor(position, amount, moneyImgSrc) {
    this.position = position;
    this.amount = amount;
    this.moneyImg = new Image();
    this.moneyImg.src = moneyImgSrc;
    this.timeToLive = 60;
    this.animationSpeed = 2;
    this.animationDistance = 40;
    this.currentAnimationDistance = 0;
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
    ctx.drawImage(this.moneyImg, this.position.x, drawY, 32, 32); // Adjust the size as needed
  }
}
