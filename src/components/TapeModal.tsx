import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, SkipBack, Play, Pause, SkipForward } from "lucide-react";
import tape from "../assets/tape2.gif";
import Bapak from '../assets/VoiceMemos/BapakDya.m4a'
import Ibu from '../assets/VoiceMemos/IbuDya.m4a'
import Ayunda from '../assets/VoiceMemos/MbaAyun.m4a'
import Dya from '../assets/VoiceMemos/Dya.m4a'
import Ayu from '../assets/VoiceMemos/Ayu.m4a'

interface Book {
  id: number;
  title: string;
  image: string;
}

interface BookModalProps {
  book: Book;
  onClose: () => void;
}

// Daftar lagu yang akan diputar
const tracks = [
  { id: 1, title: "Bapak", src: Bapak },
  { id: 2, title: "Ibu", src: Ibu },
  { id: 3, title: "Mba Ayunda", src: Ayunda},
  { id: 4, title: "Dya", src: Dya },
  { id: 5, title: "Ayu", src: Ayu },
];

function TapeModal({ onClose }: BookModalProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Mulai putar musik saat modal terbuka
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  // Update progress berdasarkan waktu berjalan
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
      setProgress(progressPercentage);
    }
  };

  // Fungsi play dan pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Pindah ke lagu sebelumnya
  const handlePrev = () => {
    let newIndex = currentTrackIndex - 1;
    if (newIndex < 0) {
      newIndex = tracks.length - 1;
    }
    setCurrentTrackIndex(newIndex);
    resetAndPlay(newIndex);
  };

  // Pindah ke lagu berikutnya
  const handleNext = () => {
    let newIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(newIndex);
    resetAndPlay(newIndex);
  };

  // Reset audio dan mulai lagu baru
  const resetAndPlay = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      // Ganti src lagu
      audioRef.current.src = tracks[index].src;
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Render komponen
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="rounded-lg p-6 max-w-xl w-full mx-4 "
      >
        {/* Tombol close */}
        <div className="flex justify-between items-center mb-4 bg-white/20 rounded-lg p-2 shadow-lg">
          <h2 className="text-lg font-semibold text-white">
            {tracks[currentTrackIndex].title}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Gambar tape */}
        <img src={tape} alt="Tape" className="w-full mb-4" />

        {/* Music player */}
        <div className="flex flex-col items-center bg-white/20 rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrev}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
            >
              <SkipBack size={20} />
            </button>
            <button
              onClick={togglePlayPause}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={handleNext}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>
          {/* Progress Bar */}
          <div className="w-full mt-4">
            <div className="h-2 w-full bg-gray-300 rounded">
              <div
                className="h-2 bg-blue-500 rounded"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Audio element tersembunyi */}
        <audio
          ref={audioRef}
          src={tracks[currentTrackIndex].src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleNext}
          autoPlay
        />
      </motion.div>
    </div>
  );
}

export default TapeModal;
