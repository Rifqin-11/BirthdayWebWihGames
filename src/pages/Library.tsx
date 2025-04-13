import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BookModal from "../components/BookModal";
import TapeModal from "../components/TapeModal";
import confetti from "canvas-confetti";

import background from "../assets/Libary2.jpg";
import radio2 from "../assets/radio2.png";
import book from "../assets/books.png";
import cake from "../assets/cake.gif";
import banner from "../assets/banner2.png";
import birthdaySong from "../assets/hbd.mp3";

function Library() {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [showTapeModal, setShowTapeModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // langsung aktif
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const books = [
    {
      id: 1,
      title: "Classic Literature",
      image:
        "https://images.unsplash.com/photo-15430025882-bfa74002ed7e?auto=format&fit=crop&q=80&w=200&h=300",
    },
  ];

  useEffect(() => {
    // Confetti langsung saat halaman muncul
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });

    // Autoplay musik
    if (audioRef.current) {
      audioRef.current.muted = true;
      audioRef.current
        .play()
        .then(() => {
          // Setelah berhasil play, unmute agar suara terdengar
          audioRef.current!.muted = false;
        })
        .catch((err) => {
          console.log("Autoplay gagal: ", err);
          setIsPlaying(false);
        });
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative w-screen h-screen bg-[#8f2d22] overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 w-full h-full">
        <img
          src={background}
          alt="Library Interior"
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between w-full items-center mt-4">
        {/* Back Button */}
          <div className="p-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-amber-800 hover:text-amber-600 transition-colors bg-white/80 px-4 py-2 rounded-lg shadow-md"
            >
              <ArrowLeft size={20} />
              Back to Bookstore
            </button>
          </div>

          {/* Music Player */}
          <div className="bottom-5 left-5 p-4 rounded-xl shadow-lg flex items-center gap-3 z-30">
            <button
              onClick={toggleMusic}
              className="bg-white/80 text-pink-900 px-4 py-2 rounded-lg shadow hover:bg-pink-500 transition"
            >
              {isPlaying ? "Pause Music" : "Play Music"}
            </button>
            <audio ref={audioRef} src={birthdaySong} loop />
          </div>
        </div>

        {/* Radio */}
        <motion.div
          whileHover={{ top: "51vh" }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute z-20 left-[70%] top-[53vh] w-[20%] h-auto hover:cursor-pointer"
          onClick={() => {
            setShowTapeModal(true);
            if (audioRef.current && !audioRef.current.paused) {
              audioRef.current.pause();
              setIsPlaying(false);
            }
          }}
        >
          <img src={radio2} alt="Radio" className="w-full h-auto" />
        </motion.div>

        {/* Cake */}
        <motion.div
          whileHover={{ top: "59vh" }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute z-20 left-[43%] top-[61vh] w-[15%] h-auto hover:cursor-pointer"
          onClick={() => navigate("/Puzzle")}
        >
          <img src={cake} alt="Cake" className="w-full h-auto" />
        </motion.div>

        {/* Book */}
        <motion.div
          whileHover={{ top: "53vh" }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute z-20 left-[10%] top-[55vh] w-[20%] h-auto hover:cursor-pointer"
          onClick={() => navigate("/Books")}
        >
          <img src={book} alt="Book" className="w-full h-auto" />
        </motion.div>

        {/* Banner */}
        <div className="absolute z-20 left-[38%] top-[10vh] w-[25%] h-auto">
          <img src={banner} alt="Banner" className="w-full h-auto" />
        </div>
      </div>

      {/* Book Modal */}
      <AnimatePresence>
        {selectedBook && (
          <BookModal
            book={books.find((b) => b.id === selectedBook)!}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </AnimatePresence>

      {/* Tape Modal */}
      <AnimatePresence>
        {showTapeModal && (
          <TapeModal book={books[0]} onClose={() => setShowTapeModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Library;
