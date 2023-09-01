class Building extends Sprite {
  constructor({
    position = { x: 0, y: 0 },
    imgSrc,
    imgInfo,
    projectileInfo,
    cost,
    shape,
  }) {
    super({
      position,
      imgSrc: imgSrc,
      imgInfo: imgInfo,
      fixPosition: {
        x: -15,
        y: -55,
      },
    });
    this.info = imgInfo;
    this.position = position;
    this.size = 32;
    this.width = this.size * 2;
    this.buildingRadius = imgInfo.radius;
    this.target;
    this.rivals = [];
    this.projectileInfo = projectileInfo;
    this.buildingCenter = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.size / 2,
    };
    this.buildingProjectile = [];
    this.time = 0;
    this.cost = cost;
  }
  drawCurrentBuilding() {
    super.drawSprite();
    ctx.beginPath();
    ctx.arc(
      this.buildingCenter.x,
      this.buildingCenter.y,
      this.buildingRadius,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = this.info.color;
    ctx.fill();
  }

  //   this will run the drawCurrentBuilding as well as add new projectile
  updateCurrentBuilding() {
    this.drawCurrentBuilding();
    this.rivals.forEach((rival) => {
      const distance = Math.sqrt(
        (rival.position.x - this.buildingCenter.x) ** 2 +
          (rival.position.y - this.buildingCenter.y) ** 2
      );

      if (distance <= this.buildingRadius) {
        // Rival is within tower's range
        if (!rival.isSlowed && this.info.hasSlowEffect) {
          // Slow the rival and mark them as slowed
          // rival.speed *= this.info.slowSpeed;
          rival.speed = 1;
          rival.isSlowed = true;
          rivalPoised.push(
            new Sprite({
              position: {
                x: rival.rivalPosition.x,
                y: rival.rivalPosition.y,
              },
              imgSrc: "../assets/pngs/enemy/poisen.png",
              imgInfo: {
                imgCount: 15,
                animationHoldTime: 5,
              },
              fixPosition: {
                x: 0,
                y: 0,
              },
            })
          );
        }
      } else {
        // Rival is outside tower's range
        if (rival.isSlowed) {
          // Restore the rival's original speed and mark them as not slowed
          // rival.speed /= this.info.slowSpeed;
          rival.speed = 2;
          rival.isSlowed = false;
        }
      }
    });
    if (this.target && this.time % 20 === 0 && this.info.shootContinuously) {
      this.buildingProjectile.push(
        new Projectile({
          position: {
            x: this.buildingCenter.x,
            y: this.buildingCenter.y,
          },
          rival: this.target,
          projectileInfo: this.projectileInfo,
        })
      );
    } else if (this.target && this.time % 50 === 0) {
      this.buildingProjectile.push(
        new Projectile({
          position: {
            x: this.buildingCenter.x,
            y: this.buildingCenter.y,
          },
          rival: this.target,
          projectileInfo: this.projectileInfo,
        })
      );
      gun = new playSound("../../../assets/music/tower firing.mp3", false);
      // this.rivals.forEach((rival) => {
      //   rival.speed = this.info.slowSpeed;
      // });
    }
    this.time++;
  }
}
