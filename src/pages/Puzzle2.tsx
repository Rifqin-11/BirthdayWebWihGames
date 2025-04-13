import React, { useState, useEffect } from "react";
import { Heart, ArrowLeft } from "lucide-react";
import PuzzleImage from "../assets/Puzzle2.jpg";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const rows = 3;
const cols = 3;

type PuzzlePiece = {
  id: number;
  row: number;
  col: number;
  isPlaced: boolean;
  position: number;
};

function Puzzle2() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const generatePuzzlePieces = (): PuzzlePiece[] => {
    const pieces: PuzzlePiece[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const id = r * cols + c;
        pieces.push({
          id,
          row: r,
          col: c,
          isPlaced: Math.random() < 0.3,
          position: id,
        });
      }
    }
    return pieces;
  };

  const [pieces, setPieces] = useState<PuzzlePiece[]>(generatePuzzlePieces());
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  const [unplacedOrder, setUnplacedOrder] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(true);

  useEffect(() => {
    const initialOrder = pieces
      .filter((p) => !p.isPlaced)
      .map((p) => p.id)
      .sort(() => Math.random() - 0.5);
    setUnplacedOrder(initialOrder);
  }, []);

  const handleDragStart = (pieceId: number) => {
    setDraggedPiece(pieceId);
  };

  const handleDragEnd = () => {
    setDraggedPiece(null);
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedPiece === null) return;
    const newPieces = pieces.map((piece) =>
      piece.id === draggedPiece
        ? { ...piece, position: dropIndex, isPlaced: true }
        : piece
    );
    setPieces(newPieces);
  };

  const isComplete = pieces.every((piece) => piece.isPlaced);

  useEffect(() => {
    if (isComplete) {
      setShowModal(true);
    }
  }, [isComplete]);

  const handleReset = () => {
    const newPieces = generatePuzzlePieces();
    setPieces(newPieces);
    setDraggedPiece(null);
    setShowModal(false);
    setConfettiVisible(true);
    const newOrder = newPieces
      .filter((p) => !p.isPlaced)
      .map((p) => p.id)
      .sort(() => Math.random() - 0.5);
    setUnplacedOrder(newOrder);
  };

  const unplacedPieces = unplacedOrder
    .map((id) => pieces.find((p) => p.id === id))
    .filter((p): p is PuzzlePiece => !!p && !p.isPlaced);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8 relative overflow-hidden">
      {isComplete && confettiVisible && (
        <Confetti width={width} height={height} />
      )}

      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => navigate("/Library")}
          className="flex items-center gap-2 text-amber-800 hover:text-amber-600 transition-colors bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-lg"
        >
          <ArrowLeft size={20} />
          Back to Bookstore
        </button>
      </div>

      <header className="mb-8 bg-white max-w-2xl rounded-2xl shadow-xl p-6 mx-auto">
        <h1 className="text-center text-2xl font-bold text-blue-400">
          Puzzle Game
        </h1>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
          <div className="relative w-full" style={{ paddingTop: "66.6667%" }}>
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0">
              {Array.from({ length: rows * cols }).map((_, idx) => {
                const thisPiece = pieces.find(
                  (p) => p.position === idx && p.isPlaced
                );
                return (
                  <div
                    key={idx}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(idx)}
                    className="relative border border-gray-200"
                  >
                    {thisPiece && (
                      <div
                        draggable
                        onDragStart={() => handleDragStart(thisPiece.id)}
                        onDragEnd={handleDragEnd}
                        className="w-full h-full rounded-md shadow-inner"
                        style={{
                          backgroundImage: `url(${PuzzleImage})`,
                          backgroundSize: "300% 300%",
                          backgroundPosition: `${
                            (thisPiece.col / (cols - 1)) * 100
                          }% ${(thisPiece.row / (rows - 1)) * 100}%`,
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white p-4 rounded-md shadow-xl rotate-2 transform transition hover:rotate-0">
            <img
              src={PuzzleImage}
              alt="Puzzle"
              className="w-full h-64 object-cover rounded"
            />
            <p className="mt-4 text-center font-handwriting text-xl text-gray-700">
              I have something to say... finish the puzzle!
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Remaining Pieces
              </h2>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Reset
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {unplacedPieces.map((piece) => (
                <div
                  key={piece.id}
                  draggable
                  onDragStart={() => handleDragStart(piece.id)}
                  onDragEnd={handleDragEnd}
                  className="relative border border-gray-200 rounded-md cursor-move hover:shadow-lg transition-shadow"
                  style={{
                    paddingTop: "66.6667%",
                    backgroundImage: `url(${PuzzleImage})`,
                    backgroundSize: "300% 300%",
                    backgroundPosition: `${(piece.col / (cols - 1)) * 100}% ${
                      (piece.row / (rows - 1)) * 100
                    }%`,
                    backgroundRepeat: "no-repeat",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Ucapan */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-white max-w-md mx-auto rounded-2xl shadow-xl p-8 text-center space-y-4 animate-fadeIn">
            <button
              onClick={() => {
                setShowModal(false);
                setConfettiVisible(false);
              }}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-blue-500">
              🎉 Happy Birthday Tegar 🥳
            </h2>
            <p className="text-gray-700">
              Let's keep on growing, dancing, and exploring this world together
              💃🏻❤‍🔥
              <br />
              Stand taller & shine brighter!
              <br />I am here watching you 👀🫵🏼🤣💙
            </p>
            <button
              onClick={() => navigate("/Library")}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Back to BookStore
            </button>
          </div>
        </div>
      )}

      <footer className="mt-12 text-center text-gray-600">
        <p className="flex items-center justify-center gap-2">
          Crafted with care by{" "}
          <a
            href="https://github.com/Rifqin-11"
            className="text-pink-500 hover:text-pink-600 transition-colors flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Creator <Heart className="w-4 h-4" />
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Puzzle2;
