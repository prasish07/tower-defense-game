const canvasEditorWidth = 1504;
const canvasEditorHeight = 672;
let canvasEditor;
let ctxEditor;
let customLevelBg;
let enemyWaypoints = [];
let isWayPointedSelected = false;
let editor = document.getElementById("editor-canvas");
let selectedTile = 0;
let createdObject2d = [];
let createdObjectList = [];
let editorFrame;
let isTowerPlaceableArea = false;
let isEraseSelected = false;
let towerShow = new Image();
towerShow.src = "../../assets/pngs/castle2.png";
let tilePlaceArea = [];

const saveButton = document.getElementById("saveButton");
customLevelBg = new Image();
const mouseMove = {
  x: undefined,
  y: undefined,
};

function clearCanvas() {
  createdObject2d = [];
  createdObjectList = [];
  enemyWaypoints = [];
  selectionAreaList = [];
  selectionArea2d = [];
}

function drawWayPoints() {
  enemyWaypoints.forEach((point) => {
    ctxEditor.fillStyle = "rgba(255,0,0,0.8)";
    ctxEditor.fillRect(point.x, point.y, 3, 3);
  });
}

function creatingObject() {
  createdObject2d.forEach((row, y) => {
    row.forEach((number, x) => {
      if (number === 101) {
        createdObjectList.push(
          new PlaceObject({
            position: {
              x: x * 32,
              y: y * 32,
            },
            number: number,
          })
        );
      }
    });
  });
}

const startCustomLevelMode = () => {
  canvasEditor = document.getElementById("editor-canvas");
  canvasEditor.height = canvasEditorHeight;
  canvasEditor.width = canvasEditorWidth;
  ctxEditor = canvasEditor.getContext("2d");
  ctxEditor.fillStyle = "lightblue";
  ctxEditor.clearRect(0, 0, canvasEditorWidth, canvasEditorHeight);
  // sound = playSound("../assets/music/tower defense music.mp4", true);
  customLevelBg.src = "../../assets/cutome level editor/map.png";
  creatingSelectionArea();
  requestAnimationFrame(updateEditor);
};

const drawObject = () => {
  createdObject2d.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile === 101) {
        let image = new Image();
        image.src = "../../assets/cutome level editor/tile/tile1.png";
        ctxEditor.drawImage(image, x * 32, y * 32, 32, 32);
        tilePlaceArea.push({
          x: x,
          y: y,
        });
      }
      if (tile === 1921) {
        ctxEditor.fillStyle = "rgba(0,255,0,0.8)";
        ctxEditor.fillRect(x * 32, y * 32, 32 * 2, 32);
      }
    });
  });
};

const updateEditor = () => {
  ctxEditor.clearRect(0, 0, canvasEditorWidth, canvasEditorHeight);
  ctxEditor.drawImage(customLevelBg, 0, 0);

  selectionAreaList.forEach((build) => build.updatePosition(mouseMove));
  // createdObjectList.forEach((obj) => obj.updatePosition());
  tilePlaceArea = [];
  drawObject();
  drawWayPoints();
  ctxEditor.drawImage(towerShow, 1300, 300, 200, 200);

  editorFrame = requestAnimationFrame(updateEditor);
};

window.addEventListener("mousemove", (e) => {
  mouseMove.x = e.x;
  mouseMove.y = e.y;
});

editor.addEventListener("click", (e) => {
  const clickX = e.offsetX;
  const clickY = e.offsetY;
  // if (isWayPointedSelected) {
  //   const minTileX = Math.min(...tilePlaceArea.map((tile) => tile.x));
  //   const maxTileX = Math.max(...tilePlaceArea.map((tile) => tile.x));
  //   const minTileY = Math.min(...tilePlaceArea.map((tile) => tile.y));
  //   const maxTileY = Math.max(...tilePlaceArea.map((tile) => tile.y));

  //   if (
  //     mouseMove.x < minTileX * 32 ||
  //     mouseMove.x > (maxTileX + 1) * 32 ||
  //     mouseMove.y < minTileY * 32 ||
  //     mouseMove.y > (maxTileY + 1) * 32
  //   ) {
  //     alert("Waypoint is outside the tile placement area");
  //     return;
  //   }
  //   enemyWaypoints.push({ x: clickX, y: clickY });
  // }
  if (isWayPointedSelected) {
    const isInsideTile = tilePlaceArea.some((tile) => {
      // Detect collision with tile with mouse click
      if (
        clickX > tile.x * 32 &&
        clickX < tile.x * 32 + 32 &&
        clickY > tile.y * 32 &&
        clickY < tile.y * 32 + 32
      ) {
        enemyWaypoints.push({ x: clickX, y: clickY });
        return true; // Indicates that the click is inside a tile
      }
      return false; // Indicates that the click is outside this tile
    });

    if (!isInsideTile) {
      alert("Waypoint is outside the tile placement area");
    }
  }

  if (isTowerPlaceableArea) {
    const tileX = Math.floor(clickX / tileWidth);
    const tileY = Math.floor(clickY / tileHeight);
    const dataIndex = tileY * width + tileX;
    if (data[dataIndex] === 20) {
      data[dataIndex] = 1921;
      createdObject2d = [];
      for (let i = 0; i < data.length; i += 47) {
        createdObject2d.push(data.slice(i, i + 47));
      }
      creatingObject();
    } else {
      alert("This place is occupied, Please select any other place!!!");
    }
  }

  if (isEraseSelected) {
    const tileX = Math.floor(clickX / tileWidth);
    const tileY = Math.floor(clickY / tileHeight);
    const dataIndex = tileY * width + tileX;
    if (data[dataIndex] === 1921 || data[dataIndex] === 101) {
      data[dataIndex] = 20;

      tilePlaceArea = tilePlaceArea.filter(
        (tile) => !(tile.x === tileX && tile.y === tileY)
      );

      createdObject2d = [];
      for (let i = 0; i < data.length; i += 47) {
        createdObject2d.push(data.slice(i, i + 47));
      }
      creatingObject();
    } else {
      // you cannot remove this message
    }
  }

  if (enemyWaypoints.length > 8 && isWayPointedSelected) {
    // Display a message indicating that at least 6 waypoints are selected with alert
    alert("You have selected 8 waypoints");

    isWayPointedSelected = false;
  }

  selectionAreaList = [];
  selectionArea2d = [];
  for (let i = 0; i < data.length; i += 47) {
    selectionArea2d.push(data.slice(i, i + 47));
  }
  creatingSelectionArea();
});

editor.addEventListener("mousedown", (e) => {
  let isMouseDown = true;

  const performAction = () => {
    if (isMouseDown && selectedTile === 1) {
      const clickX = mouseMove.x;
      const clickY = mouseMove.y;
      const tileX = Math.floor(clickX / tileWidth);
      const tileY = Math.floor(clickY / tileHeight);
      const dataIndex = tileY * width + tileX;
      data[dataIndex] = 101;
      createdObject2d = [];
      for (let i = 0; i < data.length; i += 47) {
        createdObject2d.push(data.slice(i, i + 47));
      }
      creatingObject();
    }
  };

  performAction();
  const actionInterval = setInterval(performAction, 100);
  const onMouseUp = () => {
    editor.removeEventListener("mouseup", onMouseUp);
    isMouseDown = false;
    clearInterval(actionInterval);
  };

  editor.addEventListener("mouseup", onMouseUp);
});

// btn click events

tile1.addEventListener("click", () => {
  selectedTile = 1;
  isTowerPlaceableArea = false;
  isWayPointedSelected = false;
  isEraseSelected = false;
  customLevelContainer.classList.add("mouse");
});

eraseBtn.addEventListener("click", () => {
  selectedTile = -1;
  isTowerPlaceableArea = false;
  isWayPointedSelected = false;
  isEraseSelected = true;
  customLevelContainer.classList.add("mouse");
});

customTowerPlacementArea.addEventListener("click", () => {
  isTowerPlaceableArea = true;
  isWayPointedSelected = false;
  selectedTile = -1;
  isEraseSelected = false;
  customLevelContainer.classList.add("mouse");
  alert("Click on the place you have to place you tower!!!");
});

cancelBtn.addEventListener("click", () => {
  selectedTile = -1;
  isTowerPlaceableArea = false;
  isWayPointedSelected = false;
  isEraseSelected = false;
  customLevelContainer.classList.remove("mouse");
});

wayPoint.addEventListener("click", () => {
  if (tilePlaceArea.length === 0) {
    alert("Please place a tile first");
    return;
  }
  alert("Make sure to point at least one point to collide with our castle!!!");

  isWayPointedSelected = true;
  isTowerPlaceableArea = false;
  selectedTile = -1;
  isEraseSelected = false;
});

customLevel.addEventListener("click", () => {
  gameStarting.style.display = "none";
  container.style.display = "none";
  customLevelContainer.style.display = "flex";
  startCustomLevelMode();
});

gameOverCustomBtn.addEventListener("click", () => {
  cancelAnimationFrame(editorFrame);
  if (isCustomLevel) {
    ctxEditor.clearRect(0, 0, canvasEditorWidth, canvasEditorHeight);
  }
  clearCanvas();
  gameStarting.style.display = "none";
  gameOver.style.display = "none";
  container.style.display = "none";
  customLevelContainer.style.display = "flex";
  selectionArea2d = [];
  selectionAreaList = [];
  for (let i = 0; i < data2.length; i += 47) {
    selectionArea2d.push(data2.slice(i, i + 47));
  }
  creatingSelectionArea();
  data = [];
  data = [...data2];
  startCustomLevelMode();
});

gameCompletedCustomBtn.addEventListener("click", () => {
  cancelAnimationFrame(editorFrame);
  ctxEditor.clearRect(0, 0, canvasEditorWidth, canvasEditorHeight);
  clearCanvas();
  gameStarting.style.display = "none";
  gameCompletedContainer.style.display = "none";
  container.style.display = "none";
  customLevelContainer.style.display = "flex";
  selectionArea2d = [];
  selectionAreaList = [];
  for (let i = 0; i < data2.length; i += 47) {
    selectionArea2d.push(data2.slice(i, i + 47));
  }
  creatingSelectionArea();
  data = [];
  data = [...data2];
  startCustomLevelMode();
});

helpBtn.addEventListener("click", () => {
  document.querySelector(".help-popup").style.display = "flex";
});

closePopup.addEventListener("click", () => {
  document.querySelector(".help-popup").style.display = "none";
});

deleteWaypoints.addEventListener("click", () => {
  enemyWaypoints = [];
  isWayPointedSelected = false;
  isTowerPlaceableArea = false;
  selectedTile = -1;
  isEraseSelected = false;
});
