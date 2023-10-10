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
		this.poisonedEffects = [];
		this.type = imgInfo.type;
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

	//This will run the drawCurrentBuilding as well as add new projectile
	updateCurrentBuilding() {
		this.drawCurrentBuilding();
		this.rivals.forEach((rival) => {
			const distance = Math.hypot(
				rival.center.x - this.buildingCenter.x,
				rival.center.y - this.buildingCenter.y
			);

			if (distance <= this.buildingRadius + rival.radius) {
				// Rival is within tower's range
				if (!rival.isSlowed && this.info.hasSlowEffect) {
					// Slow the rival and mark them as slowed
					rival.speed = 1;
					rival.isSlowed = true;
				}
			} else {
				// Rival is outside tower's range
				if (rival.isSlowed) {
					// Restore the rival's original speed and mark them as not slowed
					rival.speed = rival.actualSpeed;
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
		} else if (this.target && this.time % 50 === 0 && this.type === 2) {
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
			gun = new playSound("assets/music/tower firing.mp3", false);
		} else if (this.target && this.time % 100 === 0 && this.type === 3) {
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
			gun = new playSound("../../../assets/music/tower3Sound.mp3", false);
		}
		this.time++;
	}
}
