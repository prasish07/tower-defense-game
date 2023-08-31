const container = document.querySelector(".container");
const gameStarting = document.querySelector(".game-starting");
const gameStartingBtn = document.querySelector(".game-starting__btn");
const gameLevelCreationBtn = document.querySelector(
  ".game-starting__create-btn"
);
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
const startGame = document.getElementById("start");
const cancelBtn = document.getElementById("cancel-btn");
const customTowerPlacementArea = document.getElementById("towerPlaceableArea");
