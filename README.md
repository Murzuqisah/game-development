# game-development ~ Arkanoid/Brick Breaker

A game built in JavaScript &amp; HTML.

## Table of Contents

- ![#f03c15](https://placehold.co/15x15/f03c15/f03c15.png) [Project Overview](#project-overview)
- ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) [Features](#features)
  - [Constants for Gameplay](#constants-for-gameplay)
  - [Game State Variables](#game-state-variables)
  - [Core Functions](#core-functions)
  - [Brick Setup](#brick-setup)
  - [Helper Drawing Functions](#helper-drawing-functions)
  - [Movement & Collision](#movement--collision)
  - [Game Over & Bat Movement](#game-over--bat-movement)
- ![#1589F0](https://placehold.co/15x15/1589F0/1589F0.png) [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- ![#da25c5](https://placehold.co/15x15/da25c5/da25c5.png) [Usage](#usage)
- ![#fad505](https://placehold.co/15x15/fad505/fad505.png) [Testing](#testing)
- ![#07f848](https://placehold.co/15x15/07f848/07f848.png) [Contributing](#contributing)
- ![#5d5ea2](https://placehold.co/15x15/5d5ea2/5d5ea2.png) [License](#license)

## Project Overview

```bash

The project is structured in the following manner:
make-your-game/
├── index.html         // Your main HTML file that bootstraps the game.
├── README.md          // (Optional) A file that describes the project.
├── package.json       // (Optional) If you’re using npm for dependencies or scripts.
├── css/               // Folder for your styles.
│   └── style.css      // Main stylesheet.
├── js/                // Folder for your JavaScript files.
│   ├── main.js        // Entry point that initializes the game.
│   ├── game.js        // Game logic (e.g., game loop, state management).
│   ├── player.js      // Player-specific code (could be classes or functions).
│   └── utils.js       // Utility functions that can be used across files.
├── assets/            // Folder for game assets.
│   ├── images/        // Images like sprites, backgrounds, etc.
│   │   └── sprite.png
│   └── audio/         // Sound effects and music.
│       └── background.mp3

    
```

## Features

Template for the game – An HTML structure that includes scripts for game logic.

### Constants for Gameplay

```bash
w and h – dimensions of the game field
ballSize – the size of the ball
brickW and brickH – size of the bricks
batW and batH – size of the bat
```

### Game State Variables

```bash
ballX and ballY – location of the ball (center coordinates)
dx and dy – direction of the ball movement
bricks – array of bricks (each has x, y, and an active flag)
batX and batY – coordinates of the bat’s center
```

### Core Functions

```bash
init() – initializes the game (creates/places bricks, positions the ball)
draw() – draws the current game state (ball, bricks, bat)
move() – handles ball movement, collisions, and brick-breaking logic
game() – main loop that calls move() and draw()
```

### Brick Setup

```bash
Bricks located at the top in multiple rows.
Ball starts in the bottom center, initially moving to the top-right.
```

### Helper Drawing Functions

```bash
drawRect() – draws a filled rectangle with a border
drawCircle() – draws a filled circle
```

### Movement & Collision

```bash
The ball bounces off left, right, and top edges by reversing dx or dy.
If the ball goes beyond batY, the player loses.
Collision with the bat depends on the ball’s position relative to the bat’s coordinates.
The ball bounces off bricks and deactivates them on collision.
```

### Game Over & Bat Movement

```bash
If move() detects the ball is out of the field, the game is over; an alert appears, and the game resets.
Bat movement is handled by keydown events (ArrowLeft and ArrowRight).
```

## Getting Started

### Prerequisites

A modern web browser (Chrome, Firefox, Safari, or Edge)
(Optional) A local HTTP server or a simple development environment

### Installation

Clone or download the repository.
(Optional) If you’re using npm, run npm install to install dependencies.

## Usage

Open index.html in your web browser (or serve it via a local HTTP server).
Use the left and right arrow keys to move the bat.
Watch the console or on-screen display for scores or debug info (depending on your implementation).

## Testing

Manually test collisions, bat movements, and edge cases (like losing the ball or clearing all bricks).
Use browser developer tools for debugging and performance checks.

## Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests with improvements or bug fixes. Open an issue in the [repository issues' page](https://github.com/Murzuqisah/game-development/issues).

## License

This project is licensed under the [MIT License](https://github.com/Murzuqisah/game-development/blob/main/LICENSE).
