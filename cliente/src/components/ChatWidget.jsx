import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { chatAPI } from '../services/api';

export default function ChatWidget({ onAddToCart }) {
  const [messages, setMessages] = useState([
    { id: '1', role: 'bot', text: '¡Hola! Soy ShopBot. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    try {
      const res = await chatAPI.sendMessage(userMsg.text);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', text: res.respuesta }]);
      
      // Si la respuesta implica que se agregó algo (simplificación para el demo)
      if (res.respuesta.toLowerCase().includes('carrito')) {
        onAddToCart();
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', text: 'Error de conexión.' }]);
    }
  };

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <span>Asistente Virtual</span>
      </div>
      
      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button type="submit" className="btn-primary" style={{ padding: '0.5rem' }}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
