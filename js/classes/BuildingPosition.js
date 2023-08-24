class BuildingPosition {
  constructor({ buildingPosition = { x: 0, y: 0 } }) {
    this.buildingPosition = buildingPosition;
    this.size = 32;
    this.placementColor = "rgba(0,255,0,0.15)";
    this.mouseOver = false; // Track mouse state
    this.isOccupied = false; // Track if there is already a build exist in that tile
  }

  drawBuildingPosition() {
    ctx.fillStyle = this.placementColor;
    ctx.fillRect(
      this.buildingPosition.x,
      this.buildingPosition.y,
      this.size,
      this.size
    );
  }

  updateBuildingPosition({ x, y }) {
    this.drawBuildingPosition();
    // collision algorithm
    const isMouseOver =
      x > this.buildingPosition.x &&
      x < this.buildingPosition.x + this.size &&
      y > this.buildingPosition.y &&
      y < this.buildingPosition.y + this.size;

    if (isMouseOver && !this.mouseOver) {
      this.placementColor = "rgba(0,255,0,0.45)";
      canvas.classList.add("mouse");
      this.mouseOver = true;
    } else if (!isMouseOver && this.mouseOver) {
      this.placementColor = "rgba(0,255,0,0.15)";
      canvas.classList.remove("mouse");
      this.mouseOver = false;
    }
  }
}
