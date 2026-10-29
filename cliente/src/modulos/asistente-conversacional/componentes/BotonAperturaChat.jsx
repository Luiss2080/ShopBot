import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function BotonAperturaChat({ estaAbierto, onAbrir }) {
  return (
    <AnimatePresence>
      {!estaAbierto && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onAbrir}
          aria-label="Abrir asistente ShopBot"
          className="fixed bottom-6 right-6 bg-brand-500 text-white p-4 rounded-full shadow-floating z-40 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-brand-500/20"
        >
          <MessageCircle size={28} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
