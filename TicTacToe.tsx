import React, { useState, useEffect } from 'react';
import { X, Circle, RefreshCw, X as CloseIcon, Users, Monitor } from 'lucide-react';

interface TicTacToeProps {
  onClose: () => void;
}

type Player = 'X' | 'O';
type GameMode = 'human' | 'computer';

const TicTacToe: React.FC<TicTacToeProps> = ({ onClose }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{ x: number; y: number; vx: number; vy: number; color: string }>>([]);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);

  const calculateWinner = (squares: Array<string | null>) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const getEmptySquares = (squares: Array<string | null>) => {
    return squares.reduce<number[]>((acc, square, index) => {
      if (!square) acc.push(index);
      return acc;
    }, []);
  };

  const minimax = (squares: Array<string | null>, depth: number, isMaximizing: boolean): number => {
    const winner = calculateWinner(squares);
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (getEmptySquares(squares).length === 0) return 0;

    const emptySquares = getEmptySquares(squares);
    let bestScore = isMaximizing ? -Infinity : Infinity;

    for (const square of emptySquares) {
      squares[square] = isMaximizing ? 'O' : 'X';
      const score = minimax(squares, depth + 1, !isMaximizing);
      squares[square] = null;
      bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
    }

    return bestScore;
  };

  const computerMove = () => {
    const newBoard = [...board];
    const emptySquares = getEmptySquares(newBoard);
    
    let bestScore = -Infinity;
    let bestMove = emptySquares[0];

    for (const square of emptySquares) {
      newBoard[square] = 'O';
      const score = minimax(newBoard, 0, false);
      newBoard[square] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = square;
      }
    }

    handleClick(bestMove);
  };

  useEffect(() => {
    if (gameMode === 'computer' && !isXNext && !winner) {
      const timer = setTimeout(computerMove, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, gameMode, winner]);

  const createWinParticles = () => {
    const newParticles = Array.from({ length: 50 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    }));
    setParticles(newParticles);
  };

  useEffect(() => {
    if (particles.length > 0) {
      const interval = setInterval(() => {
        setParticles(prev => prev.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.1
        })).filter(p => p.y < window.innerHeight));
      }, 16);

      return () => clearInterval(interval);
    }
  }, [particles]);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      createWinParticles();
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setParticles([]);
    setGameMode(null);
  };

  const selectGameMode = (mode: GameMode) => {
    setGameMode(mode);
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setParticles([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gray-900 p-8 rounded-xl shadow-2xl border border-purple-500/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <CloseIcon size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">TicTacToe</h2>

        {!gameMode ? (
          <div className="flex flex-col gap-4 mb-6">
            <button
              onClick={() => selectGameMode('human')}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
            >
              <Users size={24} />
              <span>Play vs Human</span>
            </button>
            <button
              onClick={() => selectGameMode('computer')}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
            >
              <Monitor size={24} />
              <span>Play vs Computer</span>
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {board.map((value, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors border border-purple-500/20"
                  disabled={!!value || (gameMode === 'computer' && !isXNext)}
                >
                  {value === 'X' && <X className="w-16 h-16 text-blue-400" />}
                  {value === 'O' && <Circle className="w-16 h-16 text-purple-400" />}
                </button>
              ))}
            </div>

            {winner && (
              <div className="text-center mb-4">
                <p className="text-xl font-bold text-green-400">
                  Winner: {winner === 'X' ? 'Player X' : 'Player O'}
                </p>
              </div>
            )}

            {!winner && board.every(square => square) && (
              <div className="text-center mb-4">
                <p className="text-xl font-bold text-yellow-400">It's a draw!</p>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <button
                onClick={resetGame}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
              >
                <RefreshCw size={20} />
                <span>New Game</span>
              </button>
            </div>
          </>
        )}

        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: p.x,
              top: p.y,
              backgroundColor: p.color,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;