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

const saveButton = document.getElementById("saveButton");
customLevelBg = new Image();
const mouseMove = {
  x: undefined,
  y: undefined,
};

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
      }
      if (tile === 1921) {
        console.log("tile");
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
  drawObject();

  editorFrame = requestAnimationFrame(updateEditor);
};

window.addEventListener("mousemove", (e) => {
  mouseMove.x = e.x;
  mouseMove.y = e.y;
});

tile1.addEventListener("click", () => {
  console.log("tile 1 is selected");
  selectedTile = 1;
  customLevelContainer.classList.add("mouse");
});

customLevel.addEventListener("click", () => {
  gameStarting.style.display = "none";
  container.style.display = "none";
  customLevelContainer.style.display = "flex";
  startCustomLevelMode();
});

wayPoint.addEventListener("click", () => {
  isWayPointedSelected = true;
});

editor.addEventListener("click", (e) => {
  const clickX = e.offsetX;
  const clickY = e.offsetY;
  if (isWayPointedSelected) {
    enemyWaypoints.push({ x: clickX, y: clickY });
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
      console.log("You can't place tower here");
    }
  }

  if (enemyWaypoints.length >= 6 && isWayPointedSelected) {
    // Display a message indicating that at least 6 waypoints are selected.
    console.log("At least 6 waypoints selected.");
    isWayPointedSelected = false;
  }

  // if (selectedTile === 1) {
  //   const tileX = Math.floor(clickX / tileWidth);
  //   const tileY = Math.floor(clickY / tileHeight);
  //   const dataIndex = tileY * width + tileX;
  //   data[dataIndex] = 101;
  //   createdObject2d = [];
  //   for (let i = 0; i < data.length; i += 47) {
  //     createdObject2d.push(data.slice(i, i + 47));
  //   }
  //   creatingObject();
  // }
});

editor.addEventListener("mousedown", (e) => {
  let isMouseDown = true;

  const onMouseUp = () => {
    editor.removeEventListener("mouseup", onMouseUp);
    isMouseDown = false;
  };

  editor.addEventListener("mouseup", onMouseUp);

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

  // Clear the interval and remove the mouseup listener when the mouse button is released
  // onMouseUp();
});

cancelBtn.addEventListener("click", () => {
  selectedTile = -1;
  isTowerPlaceableArea = false;
  isWayPointedSelected = false;
  customLevelContainer.classList.remove("mouse");
});

customTowerPlacementArea.addEventListener("click", () => {
  isTowerPlaceableArea = true;
  customLevelContainer.classList.add("mouse");
  console.log("Enter the place you want to put the tower");
});
