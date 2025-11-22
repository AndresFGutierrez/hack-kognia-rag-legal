/**
 * TypingIndicator Component - Indicador premium con animaciones fluidas
 */

import { motion } from 'motion/react';
import { Bot, Sparkles } from 'lucide-react';

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="flex gap-4 mb-8"
    >
      {/* Avatar con animación */}
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity 
        }}
        className="relative shrink-0"
      >
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'var(--color-accent)' }}>
          <Bot className="w-6 h-6 text-white" />
        </div>
        
        {/* Glow pulsante */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
          className="absolute -inset-1 rounded-2xl blur-md -z-10"
          style={{ background: 'var(--color-accent)', filter: 'blur(12px)', opacity: 0.12 }}
        />
      </motion.div>

      {/* Burbuja de typing premium */}
      <div className="relative">
        {/* Glow effect de fondo */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
          className="absolute -inset-1 rounded-2xl blur-lg"
          style={{ background: 'var(--color-primary)', opacity: 0.06 }}
        />

        <div className="relative glass-card rounded-2xl rounded-tl-md p-5 shadow-lg border-2 border-white/40">
          <div className="flex items-center gap-3">
            {/* Dots de typing con animación individual */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                    y: [0, -8, 0]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut'
                  }}
                  className="w-3 h-3 rounded-full shadow-md"
                  style={{ background: 'var(--color-primary)' }}
                />
              ))}
            </div>

            {/* Texto animado */}
            <motion.span
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
              className="text-sm text-gray-600 font-medium"
            >
              Analizando documentos
            </motion.span>

            {/* Sparkle decorativo */}
            <motion.div
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
            </motion.div>
          </div>

          {/* Barra de progreso decorativa */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
            animate={{
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{ transformOrigin: 'left', background: 'var(--color-primary)' }}
          />
        </div>
      </div>
    </motion.div>
  );
}