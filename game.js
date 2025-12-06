// Game Constants
const HEALTH_THRESHOLDS = {
    LOW: 0.5,      // 50%
    CRITICAL: 0.25 // 25%
};

const ANIMATION_DURATIONS = {
    DAMAGE_FLASH: 500,  // milliseconds
    DAMAGE_SHAKE: 400,
    HEAL_GLOW: 800,
    LEVEL_UP: 1000
};

// Game State
const gameState = {
    player: {
        level: 1,
        xp: 0,
        xpNeeded: 100,
        hp: 100,
        maxHp: 100,
        attack: 10,
        defense: 5,
        gold: 0,
        totalKills: 0,
        currentEraIndex: 0,
        currentDungeonFloor: 1,
        equipment: {
            weapon: null,
            armor: null,
            accessory: null
        }
    },
    enemy: null,
    autoAttack: false,
    skillTree: {},
    skillPoints: 0,
    research: {},
    prestige: {
        level: 0,
        points: 0,
        upgrades: {}
    }
};

// Era definitions
const eras = [
    {
        name: "Stone Age",
        dungeonName: "Primitive Cave",
        className: "era-stone-age",
        enemyPrefix: ["Cave", "Wild", "Savage"],
        enemySuffix: ["Rat", "Wolf", "Bear", "Boar"],
        baseEnemyStats: { hp: 50, attack: 5, defense: 2, gold: 10, xp: 20 }
    },
    {
        name: "Bronze Age",
        dungeonName: "Ancient Ruins",
        className: "era-bronze-age",
        enemyPrefix: ["Ancient", "Bronze", "Tribal"],
        enemySuffix: ["Warrior", "Shaman", "Hunter", "Chieftain"],
        baseEnemyStats: { hp: 100, attack: 10, defense: 5, gold: 30, xp: 40 }
    },
    {
        name: "Medieval",
        dungeonName: "Dark Castle",
        className: "era-medieval",
        enemyPrefix: ["Corrupted", "Dark", "Evil"],
        enemySuffix: ["Knight", "Archer", "Mage", "Dragon"],
        baseEnemyStats: { hp: 200, attack: 20, defense: 10, gold: 80, xp: 90 }
    },
    {
        name: "Renaissance",
        dungeonName: "Ancient Library",
        className: "era-renaissance",
        enemyPrefix: ["Enchanted", "Mystical", "Arcane"],
        enemySuffix: ["Golem", "Specter", "Gargoyle", "Wraith"],
        baseEnemyStats: { hp: 400, attack: 35, defense: 18, gold: 200, xp: 180 }
    },
    {
        name: "Age of Exploration",
        dungeonName: "Pirate Cove",
        className: "era-exploration",
        enemyPrefix: ["Cursed", "Ghost", "Mutant"],
        enemySuffix: ["Pirate", "Corsair", "Buccaneer", "Captain"],
        baseEnemyStats: { hp: 700, attack: 55, defense: 28, gold: 450, xp: 320 }
    },
    {
        name: "Industrial",
        dungeonName: "Steam Factory",
        className: "era-industrial",
        enemyPrefix: ["Mechanical", "Steam", "Iron"],
        enemySuffix: ["Automaton", "Sentinel", "Titan", "Colossus"],
        baseEnemyStats: { hp: 1200, attack: 75, defense: 38, gold: 900, xp: 550 }
    },
    {
        name: "World War Era",
        dungeonName: "Bunker Complex",
        className: "era-war",
        enemyPrefix: ["Elite", "Battle", "War"],
        enemySuffix: ["Soldier", "Tank", "Commando", "General"],
        baseEnemyStats: { hp: 2000, attack: 100, defense: 50, gold: 1800, xp: 900 }
    },
    {
        name: "Modern",
        dungeonName: "Corporate Tower",
        className: "era-modern",
        enemyPrefix: ["Cyber", "Digital", "Virtual"],
        enemySuffix: ["Guard", "Drone", "Agent", "Enforcer"],
        baseEnemyStats: { hp: 3500, attack: 140, defense: 70, gold: 3500, xp: 1500 }
    },
    {
        name: "Near Future",
        dungeonName: "Biotech Lab",
        className: "era-near-future",
        enemyPrefix: ["Enhanced", "Bio", "Genetic"],
        enemySuffix: ["Soldier", "Mutant", "Experiment", "Hybrid"],
        baseEnemyStats: { hp: 6000, attack: 190, defense: 95, gold: 6500, xp: 2500 }
    },
    {
        name: "Space Age",
        dungeonName: "Orbital Station",
        className: "era-space",
        enemyPrefix: ["Alien", "Cosmic", "Stellar"],
        enemySuffix: ["Being", "Invader", "Warlord", "Emperor"],
        baseEnemyStats: { hp: 10000, attack: 250, defense: 125, gold: 12000, xp: 4000 }
    },
    {
        name: "Far Future",
        dungeonName: "Quantum Nexus",
        className: "era-future",
        enemyPrefix: ["Quantum", "Dimensional", "Temporal"],
        enemySuffix: ["Entity", "Anomaly", "Construct", "Singularity"],
        baseEnemyStats: { hp: 18000, attack: 350, defense: 175, gold: 22000, xp: 7000 }
    },
    {
        name: "Post-Singularity",
        dungeonName: "Reality Breach",
        className: "era-singularity",
        enemyPrefix: ["Transcendent", "Infinite", "Void"],
        enemySuffix: ["AI", "God", "Destroyer", "Overmind"],
        baseEnemyStats: { hp: 35000, attack: 500, defense: 250, gold: 45000, xp: 12000 }
    }
];

// Gear definitions per era
const gearData = {
    0: [ // Stone Age
        { name: "Stone Axe", type: "weapon", attack: 5, defense: 0, cost: 50 },
        { name: "Wooden Club", type: "weapon", attack: 8, defense: 0, cost: 100 },
        { name: "Leather Tunic", type: "armor", attack: 0, defense: 3, cost: 75 },
        { name: "Hide Armor", type: "armor", attack: 0, defense: 6, cost: 150 },
        { name: "Bone Necklace", type: "accessory", attack: 2, defense: 2, cost: 80 }
    ],
    1: [ // Bronze Age
        { name: "Bronze Sword", type: "weapon", attack: 12, defense: 0, cost: 200 },
        { name: "Bronze Spear", type: "weapon", attack: 18, defense: 0, cost: 400 },
        { name: "Bronze Armor", type: "armor", attack: 0, defense: 8, cost: 250 },
        { name: "Reinforced Bronze", type: "armor", attack: 0, defense: 14, cost: 500 },
        { name: "Tribal Totem", type: "accessory", attack: 5, defense: 5, cost: 300 }
    ],
    2: [ // Medieval
        { name: "Iron Sword", type: "weapon", attack: 25, defense: 0, cost: 600 },
        { name: "Steel Longsword", type: "weapon", attack: 38, defense: 0, cost: 1200 },
        { name: "Chainmail", type: "armor", attack: 0, defense: 18, cost: 700 },
        { name: "Plate Armor", type: "armor", attack: 0, defense: 28, cost: 1400 },
        { name: "Knight's Ring", type: "accessory", attack: 10, defense: 10, cost: 800 }
    ],
    3: [ // Renaissance
        { name: "Rapier", type: "weapon", attack: 50, defense: 0, cost: 1500 },
        { name: "Enchanted Blade", type: "weapon", attack: 70, defense: 0, cost: 3000 },
        { name: "Wizard Robes", type: "armor", attack: 0, defense: 35, cost: 1800 },
        { name: "Arcane Armor", type: "armor", attack: 0, defense: 50, cost: 3600 },
        { name: "Magic Amulet", type: "accessory", attack: 18, defense: 18, cost: 2000 }
    ],
    4: [ // Age of Exploration
        { name: "Cutlass", type: "weapon", attack: 80, defense: 0, cost: 3500 },
        { name: "Flintlock Pistol", type: "weapon", attack: 110, defense: 0, cost: 7000 },
        { name: "Captain's Coat", type: "armor", attack: 0, defense: 60, cost: 4000 },
        { name: "Reinforced Coat", type: "armor", attack: 0, defense: 85, cost: 8000 },
        { name: "Compass of Fortune", type: "accessory", attack: 30, defense: 25, cost: 4500 }
    ],
    5: [ // Industrial
        { name: "Steam Rifle", type: "weapon", attack: 140, defense: 0, cost: 7000 },
        { name: "Automatic Blaster", type: "weapon", attack: 190, defense: 0, cost: 14000 },
        { name: "Iron Plating", type: "armor", attack: 0, defense: 100, cost: 8000 },
        { name: "Steel Exoskeleton", type: "armor", attack: 0, defense: 140, cost: 16000 },
        { name: "Gear Pendant", type: "accessory", attack: 50, defense: 40, cost: 9000 }
    ],
    6: [ // World War Era
        { name: "Combat Rifle", type: "weapon", attack: 210, defense: 0, cost: 14000 },
        { name: "Heavy Machine Gun", type: "weapon", attack: 280, defense: 0, cost: 28000 },
        { name: "Military Armor", type: "armor", attack: 0, defense: 150, cost: 16000 },
        { name: "Tank Plating", type: "armor", attack: 0, defense: 210, cost: 32000 },
        { name: "War Medal", type: "accessory", attack: 75, defense: 60, cost: 18000 }
    ],
    7: [ // Modern
        { name: "Plasma Pistol", type: "weapon", attack: 320, defense: 0, cost: 28000 },
        { name: "Rail Gun", type: "weapon", attack: 420, defense: 0, cost: 56000 },
        { name: "Kevlar Vest", type: "armor", attack: 0, defense: 240, cost: 32000 },
        { name: "Tactical Suit", type: "armor", attack: 0, defense: 330, cost: 64000 },
        { name: "Smart Watch", type: "accessory", attack: 110, defense: 90, cost: 36000 }
    ],
    8: [ // Near Future
        { name: "Laser Rifle", type: "weapon", attack: 450, defense: 0, cost: 52000 },
        { name: "Pulse Cannon", type: "weapon", attack: 580, defense: 0, cost: 104000 },
        { name: "Biotech Armor", type: "armor", attack: 0, defense: 380, cost: 60000 },
        { name: "Genetic Suit", type: "armor", attack: 0, defense: 520, cost: 120000 },
        { name: "Neural Implant", type: "accessory", attack: 160, defense: 130, cost: 65000 }
    ],
    9: [ // Space Age
        { name: "Ion Blaster", type: "weapon", attack: 650, defense: 0, cost: 96000 },
        { name: "Antimatter Gun", type: "weapon", attack: 850, defense: 0, cost: 192000 },
        { name: "Space Suit", type: "armor", attack: 0, defense: 600, cost: 110000 },
        { name: "Cosmic Armor", type: "armor", attack: 0, defense: 810, cost: 220000 },
        { name: "Stellar Core", type: "accessory", attack: 230, defense: 190, cost: 120000 }
    ],
    10: [ // Far Future
        { name: "Quantum Blade", type: "weapon", attack: 950, defense: 0, cost: 180000 },
        { name: "Singularity Cannon", type: "weapon", attack: 1250, defense: 0, cost: 360000 },
        { name: "Energy Shield", type: "armor", attack: 0, defense: 900, cost: 200000 },
        { name: "Nano Suit", type: "armor", attack: 0, defense: 1200, cost: 400000 },
        { name: "Reality Anchor", type: "accessory", attack: 330, defense: 270, cost: 220000 }
    ],
    11: [ // Post-Singularity
        { name: "Void Blade", type: "weapon", attack: 1400, defense: 0, cost: 360000 },
        { name: "Reality Breaker", type: "weapon", attack: 1800, defense: 0, cost: 720000 },
        { name: "Transcendent Shield", type: "armor", attack: 0, defense: 1400, cost: 400000 },
        { name: "Infinite Armor", type: "armor", attack: 0, defense: 1900, cost: 800000 },
        { name: "Singularity Core", type: "accessory", attack: 500, defense: 400, cost: 450000 }
    ]
};

// Skill Tree Nodes
const skillTreeNodes = [
    { id: "warrior1", name: "Warrior I", cost: 1, bonus: { attack: 5 }, desc: "+5 Attack", requires: null },
    { id: "warrior2", name: "Warrior II", cost: 1, bonus: { attack: 10 }, desc: "+10 Attack", requires: "warrior1" },
    { id: "warrior3", name: "Warrior III", cost: 2, bonus: { attack: 20 }, desc: "+20 Attack", requires: "warrior2" },
    { id: "berserker", name: "Berserker", cost: 3, bonus: { attack: 40 }, desc: "+40 Attack", requires: "warrior3" },
    
    { id: "guardian1", name: "Guardian I", cost: 1, bonus: { defense: 5 }, desc: "+5 Defense", requires: null },
    { id: "guardian2", name: "Guardian II", cost: 1, bonus: { defense: 10 }, desc: "+10 Defense", requires: "guardian1" },
    { id: "guardian3", name: "Guardian III", cost: 2, bonus: { defense: 20 }, desc: "+20 Defense", requires: "guardian2" },
    { id: "tank", name: "Tank", cost: 3, bonus: { defense: 40 }, desc: "+40 Defense", requires: "guardian3" },
    
    { id: "vitality1", name: "Vitality I", cost: 1, bonus: { maxHp: 50 }, desc: "+50 Max HP", requires: null },
    { id: "vitality2", name: "Vitality II", cost: 1, bonus: { maxHp: 100 }, desc: "+100 Max HP", requires: "vitality1" },
    { id: "vitality3", name: "Vitality III", cost: 2, bonus: { maxHp: 200 }, desc: "+200 Max HP", requires: "vitality2" },
    { id: "immortal", name: "Immortal", cost: 3, bonus: { maxHp: 500 }, desc: "+500 Max HP", requires: "vitality3" },
    
    { id: "treasure1", name: "Treasure Hunter I", cost: 1, bonus: { goldBonus: 0.1 }, desc: "+10% Gold", requires: null },
    { id: "treasure2", name: "Treasure Hunter II", cost: 2, bonus: { goldBonus: 0.2 }, desc: "+20% Gold", requires: "treasure1" },
    { id: "treasure3", name: "Treasure Hunter III", cost: 3, bonus: { goldBonus: 0.3 }, desc: "+30% Gold", requires: "treasure2" },
    
    { id: "scholar1", name: "Scholar I", cost: 1, bonus: { xpBonus: 0.1 }, desc: "+10% XP", requires: null },
    { id: "scholar2", name: "Scholar II", cost: 2, bonus: { xpBonus: 0.2 }, desc: "+20% XP", requires: "scholar1" },
    { id: "scholar3", name: "Scholar III", cost: 3, bonus: { xpBonus: 0.3 }, desc: "+30% XP", requires: "scholar2" },
    
    { id: "critical", name: "Critical Strike", cost: 2, bonus: { attack: 15, critChance: 0.1 }, desc: "+15 ATK, +10% Crit", requires: null },
    { id: "lifesteal", name: "Life Steal", cost: 2, bonus: { lifesteal: 0.1 }, desc: "Heal 10% of damage", requires: null },
    { id: "dodge", name: "Dodge", cost: 2, bonus: { dodgeChance: 0.1 }, desc: "+10% Dodge Chance", requires: null }
];

// Research Technologies
const researchData = [
    { id: "res1", era: 0, name: "Basic Crafting", cost: 500, bonus: { attack: 5, defense: 5 }, desc: "+5 ATK & DEF" },
    { id: "res2", era: 0, name: "Fire Discovery", cost: 1000, bonus: { attack: 10 }, desc: "+10 ATK" },
    { id: "res3", era: 1, name: "Bronze Forging", cost: 1500, bonus: { attack: 12, defense: 8 }, desc: "+12 ATK & +8 DEF" },
    { id: "res4", era: 1, name: "Tribal Warfare", cost: 2500, bonus: { attack: 18 }, desc: "+18 ATK" },
    { id: "res5", era: 2, name: "Metallurgy", cost: 4000, bonus: { attack: 25, defense: 15 }, desc: "+25 ATK & +15 DEF" },
    { id: "res6", era: 2, name: "Castle Building", cost: 6500, bonus: { defense: 25 }, desc: "+25 DEF" },
    { id: "res7", era: 3, name: "Alchemy", cost: 10000, bonus: { attack: 35 }, desc: "+35 ATK" },
    { id: "res8", era: 3, name: "Advanced Magic", cost: 15000, bonus: { attack: 30, defense: 25 }, desc: "+30 ATK & DEF" },
    { id: "res9", era: 4, name: "Navigation", cost: 22000, bonus: { attack: 45, defense: 30 }, desc: "+45 ATK & +30 DEF" },
    { id: "res10", era: 4, name: "Gunpowder", cost: 35000, bonus: { attack: 55 }, desc: "+55 ATK" },
    { id: "res11", era: 5, name: "Steam Power", cost: 55000, bonus: { attack: 70, defense: 45 }, desc: "+70 ATK & +45 DEF" },
    { id: "res12", era: 5, name: "Automation", cost: 80000, bonus: { attack: 85 }, desc: "+85 ATK" },
    { id: "res13", era: 6, name: "Advanced Weaponry", cost: 120000, bonus: { attack: 100, defense: 60 }, desc: "+100 ATK & +60 DEF" },
    { id: "res14", era: 6, name: "Strategic Defense", cost: 180000, bonus: { defense: 90 }, desc: "+90 DEF" },
    { id: "res15", era: 7, name: "Computer Science", cost: 250000, bonus: { attack: 130, defense: 80 }, desc: "+130 ATK & +80 DEF" },
    { id: "res16", era: 7, name: "Nanotechnology", cost: 380000, bonus: { attack: 160 }, desc: "+160 ATK" },
    { id: "res17", era: 8, name: "Genetic Engineering", cost: 550000, bonus: { attack: 200, defense: 120 }, desc: "+200 ATK & +120 DEF" },
    { id: "res18", era: 8, name: "Biotech Enhancement", cost: 800000, bonus: { attack: 240 }, desc: "+240 ATK" },
    { id: "res19", era: 9, name: "Warp Technology", cost: 1200000, bonus: { attack: 300, defense: 180 }, desc: "+300 ATK & +180 DEF" },
    { id: "res20", era: 9, name: "Alien Technology", cost: 1800000, bonus: { attack: 350 }, desc: "+350 ATK" },
    { id: "res21", era: 10, name: "Quantum Mechanics", cost: 2700000, bonus: { attack: 450, defense: 270 }, desc: "+450 ATK & +270 DEF" },
    { id: "res22", era: 10, name: "Time Manipulation", cost: 4000000, bonus: { attack: 550 }, desc: "+550 ATK" },
    { id: "res23", era: 11, name: "Reality Engineering", cost: 6000000, bonus: { attack: 700, defense: 420 }, desc: "+700 ATK & +420 DEF" },
    { id: "res24", era: 11, name: "Transcendence", cost: 9000000, bonus: { attack: 900, defense: 540 }, desc: "+900 ATK & +540 DEF" }
];

// Prestige Upgrades
const prestigeUpgrades = [
    { id: "pres1", name: "Attack Boost", maxLevel: 10, cost: 1, bonusPerLevel: { attack: 10 }, desc: "+10 ATK per level" },
    { id: "pres2", name: "Defense Boost", maxLevel: 10, cost: 1, bonusPerLevel: { defense: 5 }, desc: "+5 DEF per level" },
    { id: "pres3", name: "Health Boost", maxLevel: 10, cost: 1, bonusPerLevel: { maxHp: 50 }, desc: "+50 HP per level" },
    { id: "pres4", name: "Gold Multiplier", maxLevel: 5, cost: 2, bonusPerLevel: { goldBonus: 0.2 }, desc: "+20% Gold per level" },
    { id: "pres5", name: "XP Multiplier", maxLevel: 5, cost: 2, bonusPerLevel: { xpBonus: 0.2 }, desc: "+20% XP per level" },
    { id: "pres6", name: "Starting Level", maxLevel: 20, cost: 3, bonusPerLevel: { startLevel: 1 }, desc: "+1 Starting Level" }
];

// Initialize game
function init() {
    loadGame();
    updateUI();
    renderShop();
    renderSkillTree();
    renderResearch();
    renderPrestigeUpgrades();
    spawnEnemy();
    setupEventListeners();
    
    // Auto-attack loop
    setInterval(() => {
        if (gameState.autoAttack && gameState.enemy) {
            attack();
        }
    }, 1000);
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('attack-btn').addEventListener('click', attack);
    document.getElementById('auto-attack-btn').addEventListener('click', toggleAutoAttack);
    document.getElementById('heal-btn').addEventListener('click', heal);
    document.getElementById('save-btn').addEventListener('click', saveGame);
    document.getElementById('load-btn').addEventListener('click', () => {
        loadGame();
        updateUI();
        renderShop();
        renderSkillTree();
        renderResearch();
        renderPrestigeUpgrades();
        addLog("Game loaded!");
    });
    document.getElementById('reset-btn').addEventListener('click', () => {
        if (confirm("Are you sure you want to reset the game? This will delete all progress!")) {
            localStorage.removeItem('incrementalRPGSave');
            location.reload();
        }
    });
    document.getElementById('prestige-btn').addEventListener('click', prestige);
    
    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Spawn enemy
function spawnEnemy() {
    const era = eras[gameState.player.currentEraIndex];
    const floor = gameState.player.currentDungeonFloor;
    const floorMultiplier = 1 + (floor - 1) * 0.1;
    
    const prefix = era.enemyPrefix[Math.floor(Math.random() * era.enemyPrefix.length)];
    const suffix = era.enemySuffix[Math.floor(Math.random() * era.enemySuffix.length)];
    
    gameState.enemy = {
        name: `${prefix} ${suffix}`,
        maxHp: Math.floor(era.baseEnemyStats.hp * floorMultiplier),
        hp: Math.floor(era.baseEnemyStats.hp * floorMultiplier),
        attack: Math.floor(era.baseEnemyStats.attack * floorMultiplier),
        defense: Math.floor(era.baseEnemyStats.defense * floorMultiplier),
        gold: Math.floor(era.baseEnemyStats.gold * floorMultiplier),
        xp: Math.floor(era.baseEnemyStats.xp * floorMultiplier)
    };
    
    updateEnemyUI();
}

// Combat
function attack() {
    if (!gameState.enemy) return;
    
    const playerAttack = getPlayerStat('attack');
    const enemyDefense = gameState.enemy.defense;
    const damage = Math.max(1, playerAttack - enemyDefense);
    
    gameState.enemy.hp -= damage;
    addLog(`You deal <span class="log-damage">${damage}</span> damage to ${gameState.enemy.name}`);
    
    // Add damage animation to enemy
    animateEnemyDamage();
    
    // Update enemy HP bar
    updateEnemyUI();
    
    if (gameState.enemy.hp <= 0) {
        enemyDefeated();
        return;
    }
    
    // Enemy counter-attack
    const enemyAttack = gameState.enemy.attack;
    const playerDefense = getPlayerStat('defense');
    const enemyDamage = Math.max(1, enemyAttack - playerDefense);
    
    gameState.player.hp -= enemyDamage;
    addLog(`${gameState.enemy.name} deals <span class="log-damage">${enemyDamage}</span> damage to you`);
    
    // Add damage animation to player
    animatePlayerDamage();
    
    if (gameState.player.hp <= 0) {
        gameState.player.hp = Math.floor(getPlayerStat('maxHp') * 0.5);
        gameState.player.gold = Math.floor(gameState.player.gold * 0.9);
        addLog(`<span class="log-damage">You were defeated!</span> Lost 10% gold and respawned with 50% HP`);
    }
    
    updateUI();
}

function enemyDefeated() {
    const goldGain = Math.floor(gameState.enemy.gold * (1 + getPlayerBonus('goldBonus')));
    const xpGain = Math.floor(gameState.enemy.xp * (1 + getPlayerBonus('xpBonus')));
    
    gameState.player.gold += goldGain;
    gameState.player.xp += xpGain;
    gameState.player.totalKills++;
    
    addLog(`<span class="log-kill">${gameState.enemy.name} defeated!</span> +${goldGain} gold, +${xpGain} XP`);
    
    // Check for level up
    while (gameState.player.xp >= gameState.player.xpNeeded) {
        levelUp();
    }
    
    // Check for floor progression (every 5 kills)
    if (gameState.player.totalKills % 5 === 0) {
        gameState.player.currentDungeonFloor++;
        addLog(`<span class="log-kill">Advanced to floor ${gameState.player.currentDungeonFloor}!</span>`);
    }
    
    // Check for era progression (every 50 kills)
    if (gameState.player.totalKills % 50 === 0 && gameState.player.currentEraIndex < eras.length - 1) {
        gameState.player.currentEraIndex++;
        gameState.player.currentDungeonFloor = 1;
        addLog(`<span class="log-kill">Entered new era: ${eras[gameState.player.currentEraIndex].name}!</span>`);
        renderShop();
        renderResearch();
    }
    
    spawnEnemy();
    updateUI();
    renderSkillTree();
}

function levelUp() {
    gameState.player.level++;
    gameState.player.xp -= gameState.player.xpNeeded;
    gameState.player.xpNeeded = Math.floor(gameState.player.xpNeeded * 1.15);
    
    // Stat increases
    gameState.player.attack += 2;
    gameState.player.defense += 1;
    gameState.player.maxHp += 10;
    gameState.player.hp = getPlayerStat('maxHp');
    
    // Gain skill points on level up
    gameState.skillPoints++;
    
    addLog(`<span class="log-heal">Level Up!</span> Now level ${gameState.player.level}. +1 Skill Point!`);
    
    // Add level up animation
    animateLevelUp();
}

function toggleAutoAttack() {
    gameState.autoAttack = !gameState.autoAttack;
    const btn = document.getElementById('auto-attack-btn');
    btn.textContent = gameState.autoAttack ? 'Auto Attack: ON' : 'Auto Attack: OFF';
    btn.classList.toggle('active', gameState.autoAttack);
}

function heal() {
    const cost = 50;
    if (gameState.player.gold < cost) {
        addLog("Not enough gold to heal!");
        return;
    }
    
    gameState.player.gold -= cost;
    gameState.player.hp = getPlayerStat('maxHp');
    addLog(`<span class="log-heal">Healed to full HP!</span> (-${cost} gold)`);
    
    // Add heal animation
    animatePlayerHeal();
    
    updateUI();
}

// Animation functions
function animateEnemyDamage() {
    const enemyInfo = document.querySelector('.enemy-info');
    if (enemyInfo) {
        enemyInfo.classList.add('taking-damage');
        setTimeout(() => {
            enemyInfo.classList.remove('taking-damage');
        }, ANIMATION_DURATIONS.DAMAGE_FLASH);
    }
}

// Helper function to animate player panel with a CSS class
function animatePlayerPanel(className, duration) {
    const playerPanel = document.querySelector('.player-panel');
    if (playerPanel) {
        playerPanel.classList.add(className);
        setTimeout(() => {
            playerPanel.classList.remove(className);
        }, duration);
    }
}

function animatePlayerDamage() {
    animatePlayerPanel('taking-damage', ANIMATION_DURATIONS.DAMAGE_SHAKE);
}

function animatePlayerHeal() {
    animatePlayerPanel('healing', ANIMATION_DURATIONS.HEAL_GLOW);
}

function animateLevelUp() {
    animatePlayerPanel('level-up-glow', ANIMATION_DURATIONS.LEVEL_UP);
}

// Helper function to update health bar state based on percentage
function updateHealthBarState(healthBar, healthPercentage) {
    if (!healthBar) return;
    
    healthBar.classList.remove('low-health', 'critical-health');
    if (healthPercentage <= HEALTH_THRESHOLDS.CRITICAL) {
        healthBar.classList.add('critical-health');
    } else if (healthPercentage <= HEALTH_THRESHOLDS.LOW) {
        healthBar.classList.add('low-health');
    }
}

// Get player stat with bonuses
function getPlayerStat(stat) {
    let value = gameState.player[stat];
    
    // Equipment bonuses
    for (let slot in gameState.player.equipment) {
        if (gameState.player.equipment[slot]) {
            value += gameState.player.equipment[slot][stat] || 0;
        }
    }
    
    // Skill tree bonuses
    for (let nodeId in gameState.skillTree) {
        if (gameState.skillTree[nodeId]) {
            const node = skillTreeNodes.find(n => n.id === nodeId);
            if (node && node.bonus[stat]) {
                value += node.bonus[stat];
            }
        }
    }
    
    // Research bonuses
    for (let resId in gameState.research) {
        if (gameState.research[resId]) {
            const res = researchData.find(r => r.id === resId);
            if (res && res.bonus[stat]) {
                value += res.bonus[stat];
            }
        }
    }
    
    // Prestige bonuses
    for (let upgId in gameState.prestige.upgrades) {
        const level = gameState.prestige.upgrades[upgId];
        const upgrade = prestigeUpgrades.find(u => u.id === upgId);
        if (upgrade && upgrade.bonusPerLevel[stat]) {
            value += upgrade.bonusPerLevel[stat] * level;
        }
    }
    
    return value;
}

function getPlayerBonus(bonusType) {
    let bonus = 0;
    
    // Skill tree bonuses
    for (let nodeId in gameState.skillTree) {
        if (gameState.skillTree[nodeId]) {
            const node = skillTreeNodes.find(n => n.id === nodeId);
            if (node && node.bonus[bonusType]) {
                bonus += node.bonus[bonusType];
            }
        }
    }
    
    // Prestige bonuses
    for (let upgId in gameState.prestige.upgrades) {
        const level = gameState.prestige.upgrades[upgId];
        const upgrade = prestigeUpgrades.find(u => u.id === upgId);
        if (upgrade && upgrade.bonusPerLevel[bonusType]) {
            bonus += upgrade.bonusPerLevel[bonusType] * level;
        }
    }
    
    return bonus;
}

// Shop
function renderShop() {
    const container = document.getElementById('shop-container');
    container.innerHTML = '';
    
    const currentEraGear = gearData[gameState.player.currentEraIndex];
    
    currentEraGear.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'shop-item';
        div.innerHTML = `
            <h4>${item.name}</h4>
            <div class="shop-item-stats">
                Type: ${item.type}<br>
                ${item.attack > 0 ? `Attack: +${item.attack}<br>` : ''}
                ${item.defense > 0 ? `Defense: +${item.defense}<br>` : ''}
            </div>
            <div class="shop-item-price">Cost: ${item.cost} gold</div>
            <button class="btn btn-primary buy-item-btn" data-item-index="${index}">Buy</button>
        `;
        container.appendChild(div);
    });
    
    // Event delegation for buy buttons
    container.querySelectorAll('.buy-item-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemIndex = parseInt(this.dataset.itemIndex);
            const item = currentEraGear[itemIndex];
            buyItem(item);
        });
    });
}

function buyItem(item) {
    if (gameState.player.gold < item.cost) {
        addLog("Not enough gold!");
        return;
    }
    
    gameState.player.gold -= item.cost;
    gameState.player.equipment[item.type] = item;
    addLog(`Purchased ${item.name}!`);
    updateUI();
    updateEquipmentDisplay();
}

function updateEquipmentDisplay() {
    ['weapon', 'armor', 'accessory'].forEach(type => {
        const slot = document.getElementById(`${type}-slot`);
        const item = gameState.player.equipment[type];
        
        if (item) {
            slot.innerHTML = `
                <div class="item">
                    <div class="item-name">${item.name}</div>
                    <div class="item-stats">
                        ${item.attack > 0 ? `ATK: +${item.attack}<br>` : ''}
                        ${item.defense > 0 ? `DEF: +${item.defense}` : ''}
                    </div>
                </div>
            `;
        } else {
            slot.innerHTML = '<span class="empty-slot">Empty</span>';
        }
    });
}

// Skill Tree
function renderSkillTree() {
    const container = document.getElementById('skill-tree-container');
    container.innerHTML = '';
    
    // Display available skill points
    const skillPointsDiv = document.createElement('div');
    skillPointsDiv.className = 'skill-points-display';
    skillPointsDiv.innerHTML = `<h3>Available Skill Points: <span style="color: #4CAF50;">${gameState.skillPoints}</span></h3>`;
    container.appendChild(skillPointsDiv);
    
    skillTreeNodes.forEach(node => {
        const unlocked = gameState.skillTree[node.id] || false;
        const requirementMet = !node.requires || gameState.skillTree[node.requires];
        const canUnlock = gameState.skillPoints >= node.cost && requirementMet;
        
        const div = document.createElement('div');
        div.className = `skill-node ${unlocked ? 'unlocked' : 'locked'}`;
        div.innerHTML = `
            <h4>${node.name}</h4>
            <div class="skill-node-cost">Cost: ${node.cost} SP</div>
            ${node.requires ? `<div class="skill-node-req">Requires: ${skillTreeNodes.find(n => n.id === node.requires)?.name}</div>` : ''}
            <div class="skill-node-bonus">${node.desc}</div>
            ${!unlocked ? `<button class="btn btn-primary unlock-skill-btn" data-node-id="${node.id}" ${!canUnlock ? 'disabled' : ''}>Unlock</button>` : '<span style="color: #4CAF50; font-weight: bold;">✓ Unlocked</span>'}
        `;
        container.appendChild(div);
    });
    
    // Event delegation for unlock buttons
    container.querySelectorAll('.unlock-skill-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const nodeId = this.dataset.nodeId;
            unlockSkillNode(nodeId);
        });
    });
}

function unlockSkillNode(nodeId) {
    const node = skillTreeNodes.find(n => n.id === nodeId);
    if (!node || gameState.skillTree[nodeId]) return;
    
    // Check requirements
    if (node.requires && !gameState.skillTree[node.requires]) {
        addLog("Requirement not met!");
        return;
    }
    
    if (gameState.skillPoints < node.cost) {
        addLog("Not enough skill points!");
        return;
    }
    
    gameState.skillPoints -= node.cost;
    gameState.skillTree[nodeId] = true;
    addLog(`Unlocked ${node.name}!`);
    updateUI();
    renderSkillTree();
}

// Research
function renderResearch() {
    const container = document.getElementById('research-container');
    container.innerHTML = '';
    
    researchData.forEach(res => {
        if (res.era > gameState.player.currentEraIndex) return;
        
        const researched = gameState.research[res.id] || false;
        const canResearch = gameState.player.gold >= res.cost;
        
        const div = document.createElement('div');
        div.className = `research-item ${researched ? 'researched' : 'locked'}`;
        div.innerHTML = `
            <h4>${res.name}</h4>
            <div class="research-cost">Cost: ${res.cost} gold</div>
            <div class="research-bonus">${res.desc}</div>
            ${!researched ? `<button class="btn btn-primary research-btn" data-research-id="${res.id}" ${!canResearch ? 'disabled' : ''}>Research</button>` : '<span style="color: #2196F3; font-weight: bold;">✓ Researched</span>'}
        `;
        container.appendChild(div);
    });
    
    // Event delegation for research buttons
    container.querySelectorAll('.research-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const resId = this.dataset.researchId;
            doResearch(resId);
        });
    });
}

function doResearch(resId) {
    const res = researchData.find(r => r.id === resId);
    if (!res || gameState.research[resId]) return;
    
    if (gameState.player.gold < res.cost) {
        addLog("Not enough gold!");
        return;
    }
    
    gameState.player.gold -= res.cost;
    gameState.research[resId] = true;
    addLog(`Researched ${res.name}!`);
    updateUI();
    renderResearch();
}

// Prestige
function renderPrestigeUpgrades() {
    const container = document.getElementById('prestige-upgrades-container');
    container.innerHTML = '';
    
    prestigeUpgrades.forEach(upgrade => {
        const currentLevel = gameState.prestige.upgrades[upgrade.id] || 0;
        const canUpgrade = currentLevel < upgrade.maxLevel && gameState.prestige.points >= upgrade.cost;
        
        const div = document.createElement('div');
        div.className = 'prestige-upgrade';
        div.innerHTML = `
            <h4>${upgrade.name}</h4>
            <div class="prestige-upgrade-level">Level: ${currentLevel}/${upgrade.maxLevel}</div>
            <div class="prestige-upgrade-cost">Cost: ${upgrade.cost} PP</div>
            <div class="prestige-upgrade-bonus">${upgrade.desc}</div>
            ${currentLevel < upgrade.maxLevel ? `<button class="btn btn-primary prestige-upgrade-btn" data-upgrade-id="${upgrade.id}" ${!canUpgrade ? 'disabled' : ''}>Upgrade</button>` : '<span style="color: #9C27B0; font-weight: bold;">MAX</span>'}
        `;
        container.appendChild(div);
    });
    
    // Event delegation for prestige upgrade buttons
    container.querySelectorAll('.prestige-upgrade-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const upgId = this.dataset.upgradeId;
            buyPrestigeUpgrade(upgId);
        });
    });
    
    updatePrestigeDisplay();
}

function buyPrestigeUpgrade(upgId) {
    const upgrade = prestigeUpgrades.find(u => u.id === upgId);
    if (!upgrade) return;
    
    const currentLevel = gameState.prestige.upgrades[upgId] || 0;
    if (currentLevel >= upgrade.maxLevel || gameState.prestige.points < upgrade.cost) {
        addLog("Cannot upgrade!");
        return;
    }
    
    gameState.prestige.points -= upgrade.cost;
    gameState.prestige.upgrades[upgId] = currentLevel + 1;
    addLog(`Upgraded ${upgrade.name} to level ${currentLevel + 1}!`);
    renderPrestigeUpgrades();
}

function prestige() {
    if (gameState.player.level < 20) {
        addLog("You need to be at least level 20 to prestige!");
        return;
    }
    
    if (!confirm("Are you sure you want to prestige? This will reset your progress but grant prestige points!")) {
        return;
    }
    
    // Calculate prestige points
    const pointsGained = Math.floor(gameState.player.level / 20);
    gameState.prestige.level++;
    gameState.prestige.points += pointsGained;
    
    // Reset player
    const prestigeUpgradesCopy = {...gameState.prestige.upgrades};
    const prestigeLevel = gameState.prestige.level;
    const prestigePoints = gameState.prestige.points;
    
    gameState.player = {
        level: 1 + (getPrestigeStartLevel()),
        xp: 0,
        xpNeeded: 100,
        hp: 100,
        maxHp: 100,
        attack: 10,
        defense: 5,
        gold: 0,
        totalKills: 0,
        currentEraIndex: 0,
        currentDungeonFloor: 1,
        equipment: {
            weapon: null,
            armor: null,
            accessory: null
        }
    };
    
    gameState.prestige = {
        level: prestigeLevel,
        points: prestigePoints,
        upgrades: prestigeUpgradesCopy
    };
    
    gameState.skillTree = {};
    gameState.skillPoints = 0;
    gameState.research = {};
    
    addLog(`<span class="log-kill">Prestiged! Gained ${pointsGained} prestige points!</span>`);
    spawnEnemy();
    updateUI();
    renderShop();
    renderSkillTree();
    renderResearch();
    renderPrestigeUpgrades();
}

function getPrestigeStartLevel() {
    const upgrade = gameState.prestige.upgrades['pres6'] || 0;
    return upgrade;
}

function updatePrestigeDisplay() {
    document.getElementById('prestige-level').textContent = gameState.prestige.level;
    document.getElementById('available-prestige-points').textContent = gameState.prestige.points;
    document.getElementById('next-prestige-points').textContent = Math.floor(gameState.player.level / 20);
}

// UI Updates
function updateUI() {
    // Player stats
    document.getElementById('player-level').textContent = gameState.player.level;
    document.getElementById('player-hp').textContent = Math.max(0, Math.floor(gameState.player.hp));
    document.getElementById('player-max-hp').textContent = getPlayerStat('maxHp');
    document.getElementById('player-attack').textContent = getPlayerStat('attack');
    document.getElementById('player-defense').textContent = getPlayerStat('defense');
    document.getElementById('player-gold').textContent = Math.floor(gameState.player.gold);
    document.getElementById('total-kills').textContent = gameState.player.totalKills;
    document.getElementById('prestige-points').textContent = gameState.prestige.points;
    document.getElementById('skill-points').textContent = gameState.skillPoints;
    
    // Player HP bar
    const playerMaxHp = getPlayerStat('maxHp');
    const playerHpPercent = (gameState.player.hp / playerMaxHp) * 100;
    const playerHpBar = document.getElementById('player-hp-bar');
    playerHpBar.style.width = `${playerHpPercent}%`;
    document.getElementById('player-hp-bar-text').textContent = `HP: ${Math.max(0, Math.floor(gameState.player.hp))}/${playerMaxHp}`;
    
    // Update player HP bar color based on health percentage
    updateHealthBarState(playerHpBar, playerHpPercent / 100);
    
    // XP bar
    const xpPercent = (gameState.player.xp / gameState.player.xpNeeded) * 100;
    document.getElementById('xp-bar').style.width = `${xpPercent}%`;
    document.getElementById('xp-text').textContent = `XP: ${Math.floor(gameState.player.xp)}/${gameState.player.xpNeeded}`;
    
    // Era display
    const era = eras[gameState.player.currentEraIndex];
    document.getElementById('era-display').textContent = era.name;
    document.getElementById('era-display').className = `era-display ${era.className}`;
    document.getElementById('dungeon-name').textContent = era.dungeonName;
    document.getElementById('dungeon-floor').textContent = gameState.player.currentDungeonFloor;
    
    updateEquipmentDisplay();
}

function updateEnemyUI() {
    if (!gameState.enemy) return;
    
    document.getElementById('enemy-name').textContent = gameState.enemy.name;
    document.getElementById('enemy-attack').textContent = gameState.enemy.attack;
    document.getElementById('enemy-defense').textContent = gameState.enemy.defense;
    
    const hpPercent = (gameState.enemy.hp / gameState.enemy.maxHp) * 100;
    const enemyHpBar = document.getElementById('enemy-hp-bar');
    enemyHpBar.style.width = `${hpPercent}%`;
    document.getElementById('enemy-hp-text').textContent = `HP: ${Math.max(0, Math.floor(gameState.enemy.hp))}/${gameState.enemy.maxHp}`;
    
    // Update enemy HP bar color based on health percentage
    updateHealthBarState(enemyHpBar, hpPercent / 100);
}

function addLog(message) {
    const log = document.getElementById('combat-log');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = message;
    log.insertBefore(entry, log.firstChild);
    
    // Keep only last 20 entries
    while (log.children.length > 20) {
        log.removeChild(log.lastChild);
    }
}

// Save/Load
function saveGame() {
    const saveData = JSON.stringify(gameState);
    localStorage.setItem('incrementalRPGSave', saveData);
    addLog("Game saved!");
}

function loadGame() {
    const saveData = localStorage.getItem('incrementalRPGSave');
    if (saveData) {
        const loaded = JSON.parse(saveData);
        Object.assign(gameState, loaded);
    }
}

// Auto-save every 30 seconds
setInterval(saveGame, 30000);

// Initialize game on load
window.addEventListener('load', init);
