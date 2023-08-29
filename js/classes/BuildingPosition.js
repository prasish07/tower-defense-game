class BuildingPosition {
  constructor({ buildingPosition = { x: 0, y: 0 } }) {
    this.buildingPosition = buildingPosition;
    this.size = 32;
    this.placementColor = "rgba(0,255,0,0.07)";
    this.mouseOver = false; // Track mouse state
    this.isOccupied = false; // Track if there is already a build exist in that tile
  }

  drawBuildingPosition() {
    ctx.fillStyle = this.placementColor;
    ctx.fillRect(
      this.buildingPosition.x,
      this.buildingPosition.y,
      this.size * 2,
      this.size
    );
  }

  updateBuildingPosition({ x, y }) {
    this.drawBuildingPosition();
    // collision algorithm
    const isMouseOver =
      x > this.buildingPosition.x &&
      x < this.buildingPosition.x + this.size * 2 &&
      y > this.buildingPosition.y &&
      y < this.buildingPosition.y + this.size;

    if (isMouseOver && !this.mouseOver) {
      this.placementColor = "rgba(0,255,0,0.45)";
      container.classList.add("mouse");
      this.mouseOver = true;
    } else if (!isMouseOver && this.mouseOver) {
      this.placementColor = "rgba(0,255,0,0.07)";
      container.classList.remove("mouse");
      this.mouseOver = false;
    }
  }
}
