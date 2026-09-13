import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, MessageCircle, X } from 'lucide-react';
import { chatAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function ChatWidget({ onAddToCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: '1', role: 'bot', text: '¡Hola! Soy ShopBot. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const userMsg = { id: Date.now().toString(), role: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await chatAPI.sendMessage(userText);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'bot', 
        text: typeof res.respuesta === 'string' ? res.respuesta : res.respuesta.text,
        options: res.respuesta.options,
        products: res.respuesta.products
      }]);
      
      const respuestaTexto = typeof res.respuesta === 'string' ? res.respuesta : res.respuesta.text;
      
      if (respuestaTexto && respuestaTexto.toLowerCase().includes('carrito')) {
        onAddToCart();
        toast.success("Carrito actualizado desde el chat", { icon: '🤖' });
      }
    } catch (error) {
      console.error(error);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', text: 'Ups, tuve un error de conexión.' }]);
    }
  };

  return (
    <>
      {/* Botón Flotante */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 bg-brand-500 text-white p-4 rounded-full shadow-floating z-40 flex items-center justify-center"
          >
            <MessageCircle size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ventana de Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 w-[360px] h-[600px] max-h-[80vh] bg-surface dark:bg-slate-900 rounded-3xl shadow-floating flex flex-col overflow-hidden z-50 border border-slate-100/50 dark:border-slate-800/50"
          >
            <div className="bg-gradient-to-r from-brand-600 to-brand-500 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold">ShopBot AI</h3>
                  <div className="flex items-center gap-1.5 text-brand-100 text-xs">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    En línea
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-brand-100 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50/50 dark:bg-slate-900/50">
              <AnimatePresence>
                {messages.map(msg => (
                  <motion.div 
                    key={msg.id} 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300' : 'bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-300'}`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-brand-500 text-white rounded-tr-sm' : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-tl-sm'}`}>
                        {msg.text}
                      </div>
                      
                      {msg.products && msg.products.length > 0 && (
                        <div className="flex flex-col gap-2 mt-2 w-[250px]">
                          {msg.products.map(p => (
                            <div key={p.id} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-3 flex gap-3 items-center shadow-sm">
                              {p.imagenUrl ? (
                                <img src={p.imagenUrl} alt={p.nombre} className="w-12 h-12 rounded-lg object-cover" />
                              ) : (
                                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-xl">🛍️</div>
                              )}
                              <div className="flex-1">
                                <h4 className="text-xs font-bold dark:text-white line-clamp-1">{p.nombre}</h4>
                                <p className="text-xs text-brand-600 font-medium">${p.precio}</p>
                              </div>
                              <button onClick={() => { setInput(`Comprar ${p.nombre}`); handleSend(new Event('submit')); }} className="bg-brand-50 hover:bg-brand-100 dark:bg-brand-900/30 dark:hover:bg-brand-900/50 text-brand-600 dark:text-brand-400 p-1.5 rounded-lg transition-colors">
                                <span className="text-xs font-semibold">Add</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {msg.options && msg.options.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {msg.options.map(opt => (
                            <button 
                              key={opt}
                              onClick={() => { setInput(opt); setTimeout(() => handleSend(new Event('submit')), 100); }}
                              className="text-xs bg-brand-50 hover:bg-brand-100 dark:bg-brand-900/20 dark:hover:bg-brand-900/40 text-brand-700 dark:text-brand-300 px-3 py-1.5 rounded-full border border-brand-200 dark:border-brand-800 transition-colors"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 max-w-[85%] self-start"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-300 flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-2xl rounded-tl-sm flex gap-1.5 items-center h-[46px]">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-slate-300 rounded-full"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-slate-300 rounded-full"></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-slate-300 rounded-full"></motion.div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2" onSubmit={handleSend}>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregúntale algo al bot..."
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="bg-brand-500 hover:bg-brand-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white w-12 rounded-xl transition-colors flex items-center justify-center shadow-md hover:shadow-lg"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
