class Sprite {
  constructor({
    position = { x: 0, y: 0 },
    imgSrc,
    imgInfo = { imgCount: 1, animationHoldTime: 15 },
    fixPosition = {
      x: 0,
      y: 0,
    },
  }) {
    this.spriteImage = new Image();
    this.spriteImage.src = imgSrc;
    this.position = position;
    this.fixPosition = fixPosition;
    this.imgInfo = {
      imgCount: imgInfo.imgCount,
      current: 0,
      imgElapsed: 0,
      animationHoldTime: imgInfo.animationHoldTime,
    };
  }

  drawSprite() {
    let particularImgWidth = this.spriteImage.width / this.imgInfo.imgCount;
    let particularFrame = {
      position: {
        x: particularImgWidth * this.imgInfo.current,
        y: 0,
      },
      width: particularImgWidth,
      height: this.spriteImage.height,
    };
    ctx.drawImage(
      this.spriteImage,
      particularFrame.position.x,
      particularFrame.position.y,
      particularFrame.width,
      particularFrame.height,
      this.position.x + this.fixPosition.x,
      this.position.y + this.fixPosition.y,
      particularFrame.width,
      particularFrame.height
    );

    // Update image frame if animationHoldTime has passed
    if (this.imgInfo.imgElapsed % this.imgInfo.animationHoldTime === 0) {
      this.imgInfo.current = (this.imgInfo.current + 1) % this.imgInfo.imgCount;
    }

    this.imgInfo.imgElapsed++; // Increment the elapsed time
  }
}
