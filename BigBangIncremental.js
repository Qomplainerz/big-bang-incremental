/**
* Big Bang Incremental - Core Logic
* AdeptusCode Standard
*/

const gameState = {
    hasStarted: false,
    atoms: 0,
    universeAge: 0, // In Planck times
    expansionSpeed: 0, // Lightyears per second
    universeRadius: 0,
    atomCost: 10,
    costMultiplier: 1.15,

    // Performance metrics

    lastUpdate: Date.now()
};

// DOM Elements

const elements = {
    age: document.getElementById('age-value'),
    atoms: document.getElementById('atom-count'),
    speed: document.getElementById('speed-value'),
    radius: document.getElementById('radius-value'),
    cost: document.getElementById('atom-cost'),
    btnBigBang: document.getElementById('big-bang-trigger'),
    btnBuyAtom: document.getElementById('buy-atom')
};

/**
* The Big Bang: Initial Trigger
*/

function initiateBigBang() {
    if (gameState.hasStarted) return;

    gameState.hasStarted = true;
    gameState.atoms = 1;
    gameState.universeAge = 1;
    gameState.expansionSpeed = 0.01; // Initial kick
    elements.btnBigBang.style.display = 'none';
    elements.btnBuyAtom.disabled = false;
    requestAnimationFrame(gameLoop);
}

/**
* Purchase Logic: Exponential Scaling
*/

function buyAtom() {
    if (gameState.atoms >= gameState.atomCost || gameState.hasStarted) {
        // In this simple version, atoms generate expansion,
        // and we use the 'Universe Age' or 'Energy' as currency.
        // For now, let's say atoms are free to add but increase cost exponentially

        gameState.atoms++;
        gameState.atomCost = Math.ceil(10 * Math.pow(gameState.costMultiplier, gameState.atoms));

        updateUI();
    }
}

/**
* Main Game Loop (Idle Calculation)
*/

function gameLoop() {
    const now = Date.now();
    const deltaTime = (now - gameState.lastUpdate) / 1000; // seconds
    gameState.lastUpdate = now;

    if (gameState.hasStarted) {
        // 1. Aging the universe

        gameState.universeAge += 1;

        // 2. Calculating Expansion Speed
        // Rule: More atoms = faster expansion

        gameState.expansionSpeed = gameState.atoms * 0.05;

        // 3. Calculating Radius Expansion

        gameState.universeRadius += gameState.expansionSpeed * deltaTime;

        updateUI();
    }

    requestAnimationFrame(gameLoop);
}

/**
* Sync logic with DOM
*/

function updateUI() {
    elements.age.textContent = Math.floor(gameState.universeAge);
    elements.atoms.textContent = gameState.atoms;
    elements.speed.textContent = gameState.expansionSpeed.toFixed(4);
    elements.radius.textContent = gameState.universeRadius.toFixed(6);
    elements.cost.textContent = gameState.atomCost;
}

// Event Listeners

elements.btnBigBang.addEventListener('click', initiateBigBang);
elements.btnBuyAtom.addEventListener('click', buyAtom);
