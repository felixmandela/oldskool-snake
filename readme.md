# Old School Snake Game - Gameboy Handheld Edition

## Project Description

This project is a nostalgic re-creation of the classic snake game designed to resemble a Gameboy handheld. Users can compete for personal high scores, toggle audio and light options, and enjoy retro-style animations. The game is implemented using JavaScript, HTML, and CSS.

### Features

1. **Snake Game**: The snake game runs smoothly with retro-style animations. As the snake eats food, its length increases. The game ends when the snake hits the wall or its own body.

2. **Score Tracker**: The game keeps track of the player's current score and the highest score.

3. **Toggle Options**: Players can toggle the light and audio options for a customized playing experience.

4. **Retro Design**: The game interface is designed to mimic a Gameboy handheld device for an old-school feel.

5. **Game Sounds**: The game includes sound effects for various game events like eating food, game over, etc.

## Challenges and Solutions

While developing this project, I faced and overcame various challenges:

1. **Rendering the Snake and Food**: Initially, I found it challenging to render the snake and food dynamically on the game area grid. To overcome this, I developed a method to represent the grid as an array, which made the rendering of the snake and food much easier.

2. **Snake Movement**: Programming the snake movement based on the user's keyboard input was also a challenge. I created a key event handler to update the direction of movement based on the user's input.

3. **Collision Detection**: Implementing the game-over logic for when the snake collides with the wall or its own body was challenging. I solved this by keeping track of the snake's coordinates and checking for collisions after each move.

4. **Gameboy Look and Feel**: Creating a Gameboy look and feel for the game interface was a complex task. I resolved this by exploring and learning more about CSS styles and positioning.

## Learning Outcomes

1. **DOM Manipulation**: Through this project, I improved my understanding and skills in manipulating the DOM using JavaScript. This was particularly useful for dynamically updating the game area as the snake moved and ate food.

2. **Event Handling**: I learned more about handling keyboard and click events to control the snake's movement and game options.

3. **Game Logic Implementation**: Implementing the game logic for the snake movement, collision detection, and scoring system helped me enhance my problem-solving and logic implementation skills.

4. **CSS Styles and Positioning**: Designing the game interface to mimic a Gameboy handheld device helped me learn and experiment with various CSS styles and positioning techniques.

## Improvements To-Do List

1. [ ] **Pause Feature**: Implement a pause/resume feature to enhance the game experience.

2. [ ] **Game Speed**: Add a feature to increase the game speed based on the score to make the game more challenging.

3. [ ] **Responsive Design**: Improve the responsiveness of the game interface for better compatibility with various screen sizes.

4. [ ] **High Score Storage**: Store the high score using local storage to persist the high score across sessions.

## How to Run the Project

1. Clone this repository to your local machine.
2. Open `index.html` file in your browser to start the game.

## Author

**Felix Mandela**

[GitHub](https://github.com/felixmandela)

[Twitter](https://twitter.com/flxmandela)

[LinkedIn](https://www.linkedin.com/in/felixmandela/)
