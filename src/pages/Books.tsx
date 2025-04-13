import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import book1 from "../assets/Book1/5.png";
import book2 from "../assets/Book2/6.png";
import book3 from "../assets/Book3/6.png";
import book4 from "../assets/Book4/5.png";
import bookOpen1 from "../assets/Book1/6.png";
import bookOpen2 from "../assets/Book2/7.png";
import bookOpen3 from "../assets/Book3/7.png";
import bookOpen4 from "../assets/Book4/7.png";

import PhotoData from "../lib/data";
import BookModal from "../components/BookModal";

function Books() {
  const navigate = useNavigate();
  const [openedBook, setOpenedBook] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleBookClick = (bookId: string) => {
    setOpenedBook(bookId === openedBook ? null : bookId);
  };

  const renderPhotoGrid = (bookId: string) => {
    const book = PhotoData[bookId];
    if (!book) return null;

    return (
      <motion.div
        key={bookId}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-[80%] z-20"
      >
        <div className="relative">
          {/* Tombol X di pojok kanan atas */}
          <button
            onClick={() => setOpenedBook(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Caption */}
          <div className="text-center text-lg font-medium text-gray-700 mb-4">
            {book.caption}
          </div>

          {/* Grid */}
          <div className="flex flex-wrap justify-center gap-4">
            {book.images.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt={`Photo ${idx + 1}`}
                onClick={() => setSelectedPhoto(photo)}
                className="w-32 h-32 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative w-screen h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <div className="p-6 z-20 relative">
        <button
          onClick={() => navigate("/Library")}
          className="flex items-center gap-2 text-amber-800 hover:text-amber-600 transition-colors bg-white/80 px-4 py-2 rounded-lg shadow-md"
        >
          <ArrowLeft size={20} />
          Back to Bookstore
        </button>
      </div>

      {/* Title */}
      <div className="p-2 w-full text-center font-bold text-3xl text-[#8f2d22]">
        <h1>The Story of Tegar</h1>
      </div>

      {/* Book Covers */}
      <div className="flex justify-center items-center gap-12 mt-4 relative z-10">
        {[
          { id: "book1", closed: book1, open: bookOpen1 },
          { id: "book2", closed: book2, open: bookOpen2 },
          { id: "book3", closed: book3, open: bookOpen3 },
          { id: "book4", closed: book4, open: bookOpen4 },
        ].map(({ id, closed, open }) => (
          <div
            key={id}
            onClick={() => handleBookClick(id)}
            className="cursor-pointer"
          >
            <img
              src={openedBook === id ? open : closed}
              alt={`Book ${id}`}
              className="w-70 transition-transform hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Photo Grid */}
      <AnimatePresence>
        {openedBook && renderPhotoGrid(openedBook)}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <BookModal
            book={{ id: 1, title: "Photo Preview", image: selectedPhoto }}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Books;
