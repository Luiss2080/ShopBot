import BotonAperturaChat from './BotonAperturaChat';
import VentanaFlotanteChat from './VentanaFlotanteChat';
import { useConversacionChatbot } from '../hooks/useConversacionChatbot';

export default function WidgetChatbotConversacional({ onAddToCart }) {
  const {
    isOpen,
    setIsOpen,
    messages,
    input,
    setInput,
    isTyping,
    messagesEndRef,
    enviarMensajeTexto,
    handleFormSubmit
  } = useConversacionChatbot(onAddToCart);

  return (
    <>
      <BotonAperturaChat
        estaAbierto={isOpen}
        onAbrir={() => setIsOpen(true)}
      />

      <VentanaFlotanteChat
        estaAbierto={isOpen}
        onCerrar={() => setIsOpen(false)}
        mensajes={messages}
        estaEscribiendo={isTyping}
        referenciaFinMensajes={messagesEndRef}
        valorInput={input}
        onCambioInput={setInput}
        onEnviarFormulario={handleFormSubmit}
        onAccionTextoMensaje={enviarMensajeTexto}
      />
    </>
  );
}

