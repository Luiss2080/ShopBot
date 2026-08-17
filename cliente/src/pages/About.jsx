import { motion } from 'framer-motion';
import { Bot, Code2, Rocket } from 'lucide-react';

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-12 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh] text-slate-700"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
          Sobre Shop<span className="text-brand-500">Bot</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          No somos solo una tienda. Somos el futuro del comercio electrónico, impulsado por Inteligencia Artificial conversacional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-6">
            <Bot size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">IA Avanzada</h3>
          <p className="text-slate-500">
            Nuestro asistente virtual utiliza procesamiento de lenguaje natural (NLP) para entender tus necesidades y recomendarte exactamente lo que buscas.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-6">
            <Code2 size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Arquitectura Moderna</h3>
          <p className="text-slate-500">
            Construido con React, Vite, Tailwind CSS y Express. Un stack tecnológico de vanguardia diseñado para la velocidad.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-6">
            <Rocket size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Misión</h3>
          <p className="text-slate-500">
            Demostrar que la integración de asistentes conversacionales en plataformas comerciales es el siguiente paso lógico en la experiencia de usuario.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 md:p-12 text-center border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Únete a la revolución</h2>
        <p className="text-slate-600 mb-8 max-w-xl mx-auto">
          ¿Eres un desarrollador interesado en cómo funciona nuestro asistente? El código fuente estará disponible próximamente para la comunidad open-source.
        </p>
        <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-600 transition-colors">
          Ver Documentación (Pronto)
        </button>
      </div>
    </motion.div>
  );
}
