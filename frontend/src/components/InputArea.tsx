/**
 * InputArea Component - Barra flotante ultra moderna con glassmorphism
 */

import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Send, MessageSquare, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export function InputArea({ onSendMessage, disabled }: InputAreaProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
    }
  }, [input]);

  return (
    <div className="input-container">
      <div className="absolute bottom-full left-0 right-0 h-8 bg-transparent pointer-events-none" />

      <div className="glass border-t border-white/10">
        <div className="container mx-auto max-w-4xl px-6 py-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05, type: 'spring', stiffness: 120 }}
            className="relative input-wrapper"
          >
            {/* Glow effect cuando está enfocado */}
            <AnimatePresence>
              {isFocused && !disabled && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -inset-1 rounded-3xl opacity-20 blur-xl"
                  style={{ background: 'var(--color-primary)', filter: 'blur(18px)', opacity: 0.12 }}
                />
              )}
            </AnimatePresence>

            {/* Input container principal */}
            <div className={`relative flex items-end gap-3 bg-white rounded-xl shadow-sm border transition-all duration-200 ${
              disabled 
                ? 'opacity-60' 
                : isFocused
                  ? ''
                  : ''
            }`}>
              {/* Gradiente decorativo superior */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                style={{ background: 'var(--color-primary)' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isFocused ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Icono animado */}
              <div className="flex items-center pl-6 pb-4">
                <motion.div
                  animate={isFocused && !disabled ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`transition-colors ${disabled ? 'text-gray-400' : 'text-indigo-500'}`}
                >
                  {isFocused && !disabled ? (
                    <Sparkles className="w-6 h-6" />
                  ) : (
                    <MessageSquare className="w-6 h-6" />
                  )}
                </motion.div>
              </div>

              {/* Textarea premium */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={disabled}
                placeholder={
                  disabled 
                    ? "⏳ Esperando conexión al backend..." 
                    : "Escribe tu consulta legal aquí..."
                }
                rows={1}
                className="flex-1 py-4 px-4 bg-transparent resize-none focus:outline-none text-gray-800 placeholder:text-gray-400 disabled:cursor-not-allowed max-h-[150px] font-medium input-field"
                style={{ 
                  minHeight: '24px',
                  lineHeight: '1.6'
                }}
              />

              {/* Contador de caracteres (opcional, aparece con texto) */}
              <AnimatePresence>
                {input.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute top-2 right-20 text-xs text-gray-400 font-mono"
                  >
                    {input.length}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Botón enviar premium */}
              <motion.button
                whileHover={!disabled && input.trim() ? { scale: 1.05 } : {}}
                whileTap={!disabled && input.trim() ? { scale: 0.95, rotate: 15 } : {}}
                onClick={handleSend}
                disabled={disabled || !input.trim()}
                className={`m-2 p-4 rounded-xl transition-all relative overflow-hidden send-button ${
                  disabled || !input.trim()
                    ? 'disabled'
                    : ''
                }`}
                aria-label="Enviar mensaje"
              >
                {/* Efecto shimmer en el botón */}
                {!disabled && input.trim() && (
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                    animate={{ opacity: [0.6, 0.2, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                )}

                <div className="relative z-10">
                  <Send className={`w-5 h-5 ${
                    disabled || !input.trim() ? 'text-gray-500' : 'text-white'
                  }`} />
                </div>

                {/* Partículas en hover */}
                {!disabled && input.trim() && (
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          left: `${25 + i * 25}%`,
                          top: '50%'
                        }}
                        animate={{
                          y: [-10, -20, -10],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.button>
            </div>

            {/* Hints mejorados */}
            <AnimatePresence mode="wait">
              {!disabled ? (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center justify-between mt-3 px-2"
                >
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>
                      <kbd className="px-2 py-0.5 bg-gray-100 rounded-lg text-xs border border-gray-200 shadow-sm">Enter</kbd>
                      {' '}enviar · 
                      <kbd className="px-2 py-0.5 bg-gray-100 rounded-lg text-xs border border-gray-200 shadow-sm ml-1">Shift + Enter</kbd>
                      {' '}nueva línea
                    </span>
                  </div>

                  {input.trim() && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-indigo-600 font-medium flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Listo para enviar</span>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex items-center gap-2 mt-3 px-2"
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200/60 rounded-xl">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      ⚠️
                    </motion.span>
                    <span className="text-xs text-amber-700 font-medium">
                      Conecta el backend para comenzar a consultar
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
