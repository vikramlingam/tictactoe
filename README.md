# TicTacToe Game (React)
A simple and fun TicTacToe game built with React. This game allows you to play against another human player or a computer opponent. It features a dynamic board, winning animations, and an easy-to-use interface.

Features
Play against another player (local multiplayer).
Play against the computer with an AI-powered opponent.
Winning animation with particle effects upon winning.
Responsive design for both desktop and mobile devices.
Option to reset the game and play again.
Tech Stack
React (with hooks)
TailwindCSS for styling
lucide-react icons for UI components
Minimax algorithm for computer's decision-making
Installation

1. Clone the repository
bash
git clone https://github.com/vikramlingam/tic-tac-toe.git
2. Navigate to the project directory
bash
cd tic-tac-toe
3. Install dependencies
bash
npm install
4. Start the development server
bash
npm start
This will open the game in your browser at http://localhost:3000.

Game Modes
Play vs Human: Local multiplayer where two players take turns playing the game.
Play vs Computer: Play against an AI opponent, where the AI makes moves based on a minimax algorithm.
How to Play
Select the game mode (Play vs Human or Play vs Computer).
Take turns clicking on the board to place your 'X' or 'O'.
The game automatically checks for a winner or a draw after each move.
Once the game is finished, a particle animation will celebrate the winner (or notify of a draw).
You can reset the game to play again by clicking the "New Game" button.
AI Logic (Minimax Algorithm)
For the Play vs Computer mode, the AI opponent uses the minimax algorithm to calculate the best move based on the current state of the board. The algorithm recursively simulates all possible moves to select the optimal one for the AI.

File Structure
bash
Copy code
/src
  ├── /components
  │     └── TicTacToe.tsx    # Main game component
  ├── App.tsx                # Application entry point
  ├── index.tsx              # React DOM rendering
  └── /styles
        └── tailwind.config.js
Contributing
Feel free to fork this project, submit issues, or create pull requests. Contributions are always welcome!

License
This project is licensed under the MIT License - see the LICENSE file for details.

Credits
Icons: Lucide React for UI icons.
React and TailwindCSS for the framework and styling.
