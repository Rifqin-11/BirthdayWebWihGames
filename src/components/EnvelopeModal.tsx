import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import envelope from '../assets/envelope.png';

interface Book {
  id: number;
  title: string;
  image: string;
}

interface BookModalProps {
  book: Book;
  onClose: () => void;
}

function EnvelopeModal({  onClose }: BookModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="rounded-lg p-6 max-w-3xl w-full mx-4"
      >

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <img src={envelope} alt="" className='w-full' />

      </motion.div>
    </div>
  );
}

export default EnvelopeModal;
