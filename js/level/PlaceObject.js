class PlaceObject {
  constructor({ position = { x: 0, y: 0 }, number }) {
    this.position = position;
    this.size = 32;
    this.isOccupied = false;
    this.number = number;
  }

  drawPosition() {
    let image = new Image();
    image.src = "../../assets/cutome level editor/tile/tile1.png";
    if (this.number === 101) {
      ctxEditor.drawImage(
        image,
        this.position.x,
        this.position.y,
        this.size,
        this.size
      );
    }
  }

  updatePosition() {
    this.drawPosition();
  }
}
