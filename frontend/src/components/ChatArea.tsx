/**
 * ChatArea Component - Área principal de mensajes con diseño premium
 */

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { MessageCircle, Sparkles, Zap } from 'lucide-react';
import type { Message } from '../types';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  onSendSuggestedQuestion: (question: string) => void;
}

const SUGGESTED_QUESTIONS = [
  '¿Qué dice la Constitución sobre derechos fundamentales?',
  '¿Cuáles son las sanciones por conducir embriagado?',
  '¿Qué derechos tengo como ciudadano colombiano?',
  '¿Qué protecciones existen contra la violencia de género?'
];

export function ChatArea({ messages, isLoading, onSendSuggestedQuestion }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div 
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto chat-container"
      style={{ minHeight: '60vh' }}
    >
      <div className="chat-messages">
        {/* Empty State ultra premium */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            {/* Icono principal con efectos */}
            <div className="relative mb-8">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative"
              >
                <div className="absolute -inset-4 rounded-full blur-2xl opacity-30" style={{ background: 'var(--color-primary)', filter: 'blur(20px)', opacity: 0.12 }} />
                <div className="relative rounded-full p-10 shadow-2xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <MessageCircle className="w-20 h-20 text-indigo-600" />
                </div>
              </motion.div>

              {/* Anillos decorativos */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-indigo-300/30 border-dashed rounded-full"
                style={{ padding: '20px' }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-2 border-purple-300/30 border-dashed rounded-full"
                style={{ padding: '40px' }}
              />
            </div>

            {/* Título y descripción */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl mb-4 font-display text-primary">
                ¡Bienvenido! 👋
              </h2>
              <p className="text-gray-600 text-lg mb-3 max-w-2xl font-light">
                Soy tu <span className="font-semibold text-indigo-600">Asistente Legal Inteligente</span>
              </p>
              <p className="text-gray-500 mb-12 max-w-xl">
                Puedo ayudarte a consultar leyes, derechos y normativas colombianas usando IA avanzada
              </p>
            </motion.div>

            {/* Sugerencias premium */}
            <div className="w-full max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 mb-6 justify-center"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-6 h-6 text-amber-500" />
                </motion.div>
                <span className="text-sm font-semibold text-gray-700 font-display">Preguntas Sugeridas</span>
                <Zap className="w-5 h-5 text-indigo-500" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SUGGESTED_QUESTIONS.map((question, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: 0.6 + idx * 0.1,
                      type: 'spring',
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      y: -4,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSendSuggestedQuestion(question)}
                    className="group relative"
                  >
                    {/* Glow effect en hover */}
                    <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity" style={{ background: 'var(--color-primary)', opacity: 0.06 }} />
                    
                    {/* Card de pregunta */}
                    <div className="relative glass-card hover:bg-white/90 border border-white/60 rounded-2xl p-5 text-left transition-all shadow-md hover:shadow-xl">
                      <div className="flex items-start gap-3">
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          className="shrink-0 mt-0.5 text-2xl"
                        >
                          💬
                        </motion.div>
                        <p className="text-sm text-gray-700 leading-relaxed font-medium group-hover:text-indigo-700 transition-colors">
                          {question}
                        </p>
                      </div>

                      {/* Indicador de acción */}
                      <motion.div
                        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <div className="text-indigo-600 text-xs font-semibold">→</div>
                      </motion.div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Mensajes */}
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>

        {/* Indicador de typing */}
        <AnimatePresence>
          {isLoading && <TypingIndicator />}
        </AnimatePresence>

        {/* Ref para auto-scroll */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}