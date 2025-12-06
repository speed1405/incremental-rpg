# ⚔️ Time Dungeon - Incremental RPG ⚔️

An incremental RPG game where you progress through different historical eras, from the Stone Age to the Post-Singularity future. Battle enemies, collect gear, unlock skills, research technologies, and prestige to become more powerful!

## 🎮 How to Play

Simply open `index.html` in your web browser to start playing!

Alternatively, you can run a local server:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

## 🌟 Features

### **Combat System**
- Click "Attack" to battle enemies
- Enable "Auto Attack" for automatic combat
- Heal when needed (costs gold)
- Defeat enemies to gain gold and XP

### **12 Historical Eras**
Progress through time by defeating enemies:
1. **Stone Age** - Primitive Cave
2. **Bronze Age** - Ancient Ruins
3. **Medieval** - Dark Castle
4. **Renaissance** - Ancient Library
5. **Age of Exploration** - Pirate Cove
6. **Industrial** - Steam Factory
7. **World War Era** - Bunker Complex
8. **Modern** - Corporate Tower
9. **Near Future** - Biotech Lab
10. **Space Age** - Orbital Station
11. **Far Future** - Quantum Nexus
12. **Post-Singularity** - Reality Breach

*Advance to the next era every 50 kills!*

### **Gear System**
- Three equipment slots: Weapon, Armor, Accessory
- Era-specific gear available in the shop
- Each era offers more powerful equipment
- Gear provides attack and defense bonuses

### **Skill Tree**
- Earn 1 skill point per level up
- Multiple skill paths:
  - **Warrior Path**: Increase attack damage
  - **Guardian Path**: Boost defense
  - **Vitality Path**: Increase max HP
  - **Treasure Hunter**: Gain more gold
  - **Scholar**: Earn more XP
  - **Special Skills**: Critical Strike, Life Steal, Dodge
- Skills have prerequisites and must be unlocked in order

### **Research System**
- Unlock 24 different technologies across all eras
- Each research provides permanent stat bonuses
- Research costs gold and unlocks as you progress through eras

### **Prestige System**
- Prestige at level 20+ to reset progress
- Gain prestige points based on your level
- Spend prestige points on permanent upgrades:
  - Attack Boost
  - Defense Boost
  - Health Boost
  - Gold Multiplier
  - XP Multiplier
  - Starting Level Boost

### **Progression**
- **Leveling**: Gain XP from defeating enemies
- **Dungeon Floors**: Advance every 5 kills (enemies get stronger)
- **Era Progression**: New era every 50 kills
- **Auto-save**: Game saves automatically every 30 seconds

## 🎯 Game Mechanics

### Combat
- Your damage = Your Attack - Enemy Defense (minimum 1)
- Enemy damage = Enemy Attack - Your Defense (minimum 1)
- Defeating enemies grants gold and XP

### Leveling
- Each level increases your base stats
- Earn skill points to unlock powerful abilities
- XP required increases by 15% per level

### Equipment
- Stronger equipment available in each new era
- Purchase with gold earned from combat
- Equipped items provide immediate stat bonuses

## 💾 Save System

The game automatically saves your progress every 30 seconds. You can also:
- **Save Game**: Manually save your progress
- **Load Game**: Restore your last save
- **Reset Game**: Start over completely (requires confirmation)

## 🎨 Game Interface

- **Player Stats Panel**: View your level, HP, attack, defense, gold, kills, prestige points, and skill points
- **Current Era Panel**: See which era and dungeon floor you're on
- **Combat Panel**: Battle enemies and view combat log
- **Inventory Tab**: Manage equipment and shop for gear
- **Skill Tree Tab**: Spend skill points on powerful upgrades
- **Research Tab**: Unlock permanent technology bonuses
- **Prestige Tab**: Reset for permanent bonuses

## 🚀 Quick Tips

1. **Early Game**: Focus on defeating enemies to earn gold and buy basic equipment
2. **Skill Points**: Save them for higher-tier skills or spread them across paths
3. **Research**: Prioritize attack and defense bonuses
4. **Gold Management**: Balance buying equipment with saving for research
5. **Prestige**: Don't prestige too early - higher levels give more prestige points
6. **Auto-Attack**: Enable it to progress faster

## 📝 Technologies Used

- HTML5
- CSS3 (with responsive design)
- Vanilla JavaScript
- LocalStorage for save system

## 🎮 Game Balance

The game is designed for incremental progression:
- Enemies scale with dungeon floors and eras
- Equipment costs and power increase exponentially
- Multiple progression paths keep the game interesting
- Prestige system allows for long-term replayability

---

**Enjoy your journey through time!** ⏰⚔️🛡️