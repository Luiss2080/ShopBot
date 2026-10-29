import { useState, useRef, useEffect } from 'react';
import ClienteApiChatbot from '../servicios/ClienteApiChatbot';
import toast from 'react-hot-toast';

export function useConversacionChatbot(onAddToCart) {
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

  const enviarMensajeTexto = async (textoAEnviar) => {
    const textoLimpio = (textoAEnviar || input).trim();
    if (!textoLimpio) return;

    const userMsg = { id: Date.now().toString(), role: 'user', text: textoLimpio };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await ClienteApiChatbot.enviarMensajeUsuario(textoLimpio);
      setIsTyping(false);

      const contenidoRespuesta = res.respuesta;
      const textoBot = typeof contenidoRespuesta === 'string' ? contenidoRespuesta : contenidoRespuesta.text;

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: textoBot,
        options: contenidoRespuesta.options,
        products: contenidoRespuesta.products
      }]);

      if (textoBot && textoBot.toLowerCase().includes('carrito') && onAddToCart) {
        onAddToCart();
        toast.success('Carrito actualizado desde el chat', { icon: '🤖' });
      }
    } catch (error) {
      console.error('Error al comunicar con ShopBot:', error);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), role: 'bot', text: 'Ups, tuve un error de conexión.' }
      ]);
    }
  };

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();
    enviarMensajeTexto();
  };

  return {
    isOpen,
    setIsOpen,
    messages,
    input,
    setInput,
    isTyping,
    messagesEndRef,
    enviarMensajeTexto,
    handleFormSubmit
  };
}
