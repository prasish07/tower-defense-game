const canvasEditorWidth = 1504;
const canvasEditorHeight = 672;
const startCustomLevelMode = () => {
  canvasEditor = document.getElementById("editor-canvas");
  canvasEditor.height = canvasEditorHeight;
  canvasEditor.width = canvasEditorWidth;
  ctxEditor = canvasEditor.getContext("2d");
  ctxEditor.fillStyle = "lightblue";
  ctxEditor.clearRect(0, 0, canvasWidth, canvasHeight);
  createGoblin(10 * increase, 0);
  tower = new OurTower();
  sound = playSound("../assets/music/tower defense music.mp4", true);
  creatingPossibleBuilding();
  requestAnimationFrame(update);
};

customLevel.addEventListener("click", () => {
  gameStarting.style.display = "none";
  container.style.display = "none";
  customLevelContainer.style.display = "flex";
});
