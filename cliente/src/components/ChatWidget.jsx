import BotonAperturaChat from '../modulos/asistente-conversacional/componentes/BotonAperturaChat';
import VentanaFlotanteChat from '../modulos/asistente-conversacional/componentes/VentanaFlotanteChat';
import { useConversacionChatbot } from '../modulos/asistente-conversacional/hooks/useConversacionChatbot';

export default function ChatWidget({ onAddToCart }) {
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
