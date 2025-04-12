import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  image: string;
}

interface BookModalProps {
  book: Book;
  onClose: () => void;
}

function BookModal({ book, onClose }: BookModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg p-6 max-w-lg w-full mx-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{book.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover rounded-md mb-4"
        />
      </motion.div>
    </div>
  );
}

export default BookModal;
