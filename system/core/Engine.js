// ===============================
// HYPE ENGINE v0.1
// Core Boot System
// ===============================

import { StateManager } from './StateManager.js';
import { AssetLoader } from './AssetLoader.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const BASE_WIDTH = 1366;
const BASE_HEIGHT = 768;

let lastTime = 0;
let initialized = false;

// ===============================
// Loading Screen
// ===============================

function drawLoadingScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);

    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText("Initializing HYPE ENGINE...", BASE_WIDTH / 2, BASE_HEIGHT / 2);
}

// ===============================
// Main Render Screen (Temporary)
// ===============================

function drawMainScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText("friday night funkin :)", BASE_WIDTH / 2, BASE_HEIGHT / 2);
}

// ===============================
// Game Loop
// ===============================

function gameLoop(timestamp) {
    const delta = timestamp - lastTime;
    lastTime = timestamp;

    if (!initialized) {
        drawLoadingScreen();
    } else {
        StateManager.update(delta);
        drawMainScreen();
    }

    requestAnimationFrame(gameLoop);
}

// ===============================
// Boot Sequence
// ===============================

async function boot() {
    drawLoadingScreen();

    await AssetLoader.preloadCore();

    StateManager.init();

    initialized = true;
}

boot();
requestAnimationFrame(gameLoop);
