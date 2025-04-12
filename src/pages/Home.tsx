import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import { Heart } from "lucide-react";
import BookModal from "../components/BookModal";
import background from "../assets/books.jpg";
import Gojek from "../assets/MamasGojek.jpg";
import EnvelopeModal from "../components/EnvelopeModal";
import Notif from "../components/Notif";

function Home() {
  const navigate = useNavigate();
  const [showChatBubble, setShowChatBubble] = useState(false);
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isScreenTooSmall, setIsScreenTooSmall] = useState(false); // 👈 new state
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    {
      title: "Sunny - Bensound",
      src: "https://www.bensound.com/bensound-music/bensound-sunny.mp3",
    },
    {
      title: "Creative Minds - Bensound",
      src: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3",
    },
    {
      title: "Jazz Comedy - Bensound",
      src: "https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3",
    },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentTrackIndex].src;
      if (isPlaying) audioRef.current.play();
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsScreenTooSmall(window.innerWidth < 480);
    };

    checkScreenSize(); // on mount
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const books = [
    {
      id: 1,
      title: "Birthday Boy",
      image: Gojek,
    },
  ];

  return (
    <div className="flex flex-col relative h-screen bg-[#c5b59e] overflow-hidden">
      <Notif message="Try clicking on the window or the door to continue!" />

      {/* Mobile Screen Warning */}
      {isScreenTooSmall && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white text-center py-2">
          Screen size is too small. Please open this site on a device with a
          larger display for a better experience.
        </div>
      )}

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={background} alt="Bookstore" className="w-full h-full" />
      </div>

      {/* Floating Music Player Control */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2 bg-white/80 shadow-lg rounded-full px-4 py-2">
        <button
          onClick={playPrev}
          className="text-gray-800 hover:text-black transition"
        >
          <FaStepBackward />
        </button>
        <button
          onClick={togglePlay}
          className="text-gray-800 hover:text-black transition"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          onClick={playNext}
          className="text-gray-800 hover:text-black transition"
        >
          <FaStepForward />
        </button>
        <span className="text-sm text-gray-700 ml-3">
          {tracks[currentTrackIndex].title}
        </span>
        <audio ref={audioRef} autoPlay loop />
      </div>

      {/* Interactive Elements */}
      <div className="flex-1 relative z-10">
        {/* Door */}
        <div
          className="absolute right-[8%] bottom-[13%] w-[24vw] h-[55vh] cursor-pointer hover:opacity-80 transition-opacity hover:bg-white/20"
          onClick={() => navigate("/library")}
        />

        {/* Cat */}
        <div
          className="absolute right-[8%] bottom-[5%] w-[10vw] h-[20vh]"
          onMouseEnter={() => setShowChatBubble(true)}
          onMouseLeave={() => setShowChatBubble(false)}
        >
          <AnimatePresence>
            {showChatBubble && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute w-40 bottom-full mb-2 bg-white rounded-lg p-3 shadow-lg"
              >
                <div className="text-sm font-medium text-gray-800">
                  Selamat Ulang Tahun Mas Tegar 🎉
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Books */}
        <div className="absolute left-[11%] top-[56%] w-[46vw] h-[40vh] grid grid-rows-2 gap-1">
          {books.map((book) => (
            <div
              key={book.id}
              className="cursor-pointer hover:opacity-75 transition-opacity hover:bg-white/20"
              onClick={() => setSelectedBook(book.id)}
            />
          ))}
        </div>

        {/* Envelope */}
        <div
          className="absolute left-[11%] top-[35%] w-[46vw] h-[23vh] grid grid-rows-2 z-10 hover:bg-white/20"
          onClick={() => setShowEnvelope(true)}
        />
      </div>

      <footer className="relative z-20 py-4 text-center text-gray-600">
        <p className="flex items-center justify-center gap-2">
          Created with passion by{" "}
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

      {/* Book Modal */}
      <AnimatePresence>
        {selectedBook && (
          <BookModal
            book={books.find((b) => b.id === selectedBook)!}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </AnimatePresence>

      {/* Envelope Modal */}
      <AnimatePresence>
        {showEnvelope && (
          <EnvelopeModal
            book={books[0]}
            onClose={() => setShowEnvelope(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
