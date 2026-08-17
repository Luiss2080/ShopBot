import { useState, useRef, useEffect } from 'react';
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
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', text: res.respuesta }]);
      
      // Lógica simple de carrito vía NLP
      if (res.respuesta.toLowerCase().includes('carrito')) {
        onAddToCart();
        toast.success("Carrito actualizado desde el chat");
      }
    } catch (error) {
      console.error(error);
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', text: 'Ups, tuve un error de conexión.' }]);
    }
  };

  return (
    <>
      {/* Botón flotante para abrir chat */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-brand-500 text-white p-4 rounded-full shadow-floating hover:bg-brand-600 transition-all hover:scale-110 z-50"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Ventana de Chat */}
      <div 
        className={`fixed bottom-6 right-6 w-[360px] h-[550px] bg-surface rounded-2xl shadow-floating border border-slate-100 flex flex-col overflow-hidden z-50 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        <div className="bg-gradient-to-r from-brand-600 to-brand-500 text-white p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Asistente ShopBot</h3>
              <p className="text-brand-100 text-xs">En línea</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-brand-100 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200 text-slate-500' : 'bg-brand-100 text-brand-600'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-brand-500 text-white rounded-tr-sm' : 'bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 max-w-[85%] self-start">
              <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="p-4 bg-white border border-slate-100 shadow-sm rounded-2xl rounded-tl-sm flex gap-1 items-center">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="p-4 bg-white border-t border-slate-100 flex gap-2" onSubmit={handleSend}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu duda aquí..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="bg-brand-500 hover:bg-brand-600 disabled:bg-slate-300 text-white p-2.5 rounded-xl transition-colors flex items-center justify-center"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
