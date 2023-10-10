const container = document.querySelector(".container");
const gameStarting = document.querySelector(".game-starting");
const gameStartingBtn = document.querySelector(".game-starting__btn");
const loadingOverlay = document.querySelector(".game-starting__loading");
const restart = document.getElementById("restart");
const gameOver = document.querySelector(".game-over");
const nextLevelBtn = document.getElementById("next-level");
const nextLevel = document.querySelector(".next-level");
const customLevel = document.querySelector(".game-starting__create-btn");
const customLevelContainer = document.querySelector(".level-editor-container");
const wayPoint = document.getElementById("way-point");
const tile1 = document.querySelector(
  ".tile-palette__tile[data-tile-type='path']"
);
const tree1 = document.querySelector(
  ".tile-palette__tile[data-tile-type='tree1']"
);
const tree2 = document.querySelector(
  ".tile-palette__tile[data-tile-type='tree2']"
);
const tree3 = document.querySelector(
  ".tile-palette__tile[data-tile-type='tree3']"
);
const tree4 = document.querySelector(
  ".tile-palette__tile[data-tile-type='tree4']"
);
const startGame = document.getElementById("start");
const cancelBtn = document.getElementById("cancel-btn");
const customTowerPlacementArea = document.getElementById("towerPlaceableArea");
const eraseBtn = document.getElementById("erase-btn");
const gameCompletedContainer = document.querySelector(".game-completed");
const restartCurrentLevel = document.getElementById("restart-level");
const restartFromStart = document.getElementById("restart-from-start");
const gameOverCustomBtn = document.getElementById("game-over__custom-level");
const gameCompletedCustomBtn = document.getElementById(
  "game-completed__custom-level"
);
const helpBtn = document.getElementById("help");
const closePopup = document.getElementById("close-help-popup");
const deleteWaypoints = document.getElementById("erase-waypoints");
const dashboard1 = document.getElementById("dashboard");
const dashboard2 = document.getElementById("dashboard2");
const dashboard3 = document.getElementById("dashboard3");
