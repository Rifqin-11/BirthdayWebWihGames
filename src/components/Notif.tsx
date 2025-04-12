import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NotifProps {
  message: string;
  duration?: number; // dalam milidetik, default: 8000
}

const Notif: React.FC<NotifProps> = ({ message, duration = 8000 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="absolute top-15 left-5 z-30 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded shadow-lg w-72 cursor-pointer"
          onClick={() => setShow(false)}
        >
          <p className="text-sm font-medium">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notif;
