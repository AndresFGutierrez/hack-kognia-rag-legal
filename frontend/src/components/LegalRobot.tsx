/**
 * LegalRobot Component - Mascota robot futurista con animaciones profesionales
 */

import { motion, AnimatePresence } from 'motion/react';
import { Bot, Sparkles, Zap, Shield, CircuitBoard } from 'lucide-react';
import type { RobotState } from '../types';

interface LegalRobotProps {
  state: RobotState;
}

export function LegalRobot({ state }: LegalRobotProps) {
  const getAnimations = () => {
    switch (state) {
      case 'thinking':
        return {
          y: [0, -8, 0],
          rotate: [-3, 3, -3],
          scale: [1, 1.05, 1],
        };
      case 'speaking':
        return {
          y: [0, -12, 0],
          scale: [1, 1.08, 1],
        };
      case 'happy':
        return {
          y: [0, -15, -5, -15, 0],
          rotate: [0, -10, 10, -10, 0],
          scale: [1, 1.15, 1.05, 1.15, 1],
        };
      default:
        return {
          y: [0, -8, 0],
        };
    }
  };

  const getStateConfig = () => {
    switch (state) {
      case 'thinking':
        return {
          text: 'Analizando...',
          color: 'var(--color-warning)',
          icon: CircuitBoard
        };
      case 'speaking':
        return {
          text: 'Consultando leyes',
          color: 'var(--color-accent)',
          icon: Zap
        };
      case 'happy':
        return {
          text: '¡Listo!',
          color: 'var(--color-accent)',
          icon: Sparkles
        };
      default:
        return {
          text: 'Asistente activo',
          color: 'var(--color-primary)',
          icon: Shield
        };
    }
  };

  const config = getStateConfig();
  const StateIcon = config.icon;

  return (
    <motion.div
      initial={{ scale: 0, x: 100, opacity: 0 }}
      animate={{ scale: 1, x: 0, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 200, 
        damping: 20,
        delay: 0.5 
      }}
      className="fixed bottom-8 right-8 z-50 hidden lg:block"
    >
      <div className="relative">
        {/* Glow effect animado según estado */}
        <motion.div
          animate={{
            scale: state === 'idle' ? [1, 1.05, 1] : [1, 1.1, 1],
            opacity: state === 'idle' ? [0.2, 0.35, 0.2] : [0.35, 0.6, 0.35],
          }}
          transition={{
            duration: state === 'thinking' || state === 'speaking' ? 1.5 : 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -inset-4 rounded-full"
          style={{ background: `${config.color}`, filter: 'blur(18px)', opacity: 0.18 }}
        />

        {/* Robot principal con animaciones */}
        <motion.div
          animate={getAnimations()}
          transition={{
            duration: state === 'idle' ? 4 : state === 'happy' ? 0.8 : 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative"
        >
          {/* Contenedor del robot */}
          <div className={`relative rounded-3xl p-6`} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
            {/* Patrón de fondo tech */}
              <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                backgroundSize: '16px 16px'
              }} />
            </div>

            {/* Bot icon principal */}
            <motion.div
              animate={state === 'speaking' ? {
                scale: [1, 1.1, 1],
              } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="relative z-10"
            >
              <Bot className="w-14 h-14 text-white drop-shadow-lg" />
            </motion.div>

            {/* Ojos animados */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-2.5">
              <motion.div
                animate={state === 'happy' ? {
                  scaleY: [1, 0.1, 1],
                } : state === 'thinking' ? {
                  x: [-2, 2, -2],
                } : {}}
                transition={{
                  duration: state === 'happy' ? 0.3 : 2,
                  repeat: state === 'happy' ? 3 : Infinity,
                }}
                className="w-2.5 h-2.5 bg-white rounded-full shadow-lg"
              />
              <motion.div
                animate={state === 'happy' ? {
                  scaleY: [1, 0.1, 1],
                } : state === 'thinking' ? {
                  x: [-2, 2, -2],
                } : {}}
                transition={{
                  duration: state === 'happy' ? 0.3 : 2,
                  repeat: state === 'happy' ? 3 : Infinity,
                  delay: state === 'happy' ? 0.1 : 0,
                }}
                className="w-2.5 h-2.5 bg-white rounded-full shadow-lg"
              />
            </div>

            {/* Indicador de estado flotante */}
            <AnimatePresence>
              {(state === 'thinking' || state === 'speaking') && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="absolute -top-3 -right-3"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="bg-white rounded-full p-2.5 shadow-xl"
                  >
                    <StateIcon className="w-5 h-5 text-indigo-600" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Partículas de celebración */}
            <AnimatePresence>
              {state === 'happy' && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: Math.cos((i * Math.PI * 2) / 8) * 50,
                        y: Math.sin((i * Math.PI * 2) / 8) * 50,
                        rotate: 360,
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.05,
                        ease: 'easeOut'
                      }}
                      className="absolute top-1/2 left-1/2"
                    >
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Ondas de sonido cuando está hablando */}
            <AnimatePresence>
              {state === 'speaking' && (
                <>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{
                        scale: [1, 2, 2.5],
                        opacity: [0.8, 0.4, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                      className="absolute inset-0 border-2 border-white rounded-3xl"
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Anillo decorativo exterior */}
          <motion.div
            animate={{ rotate: state === 'thinking' ? 360 : -360 }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
            className="absolute -inset-2 border-2 border-white/20 border-dashed rounded-3xl"
          />
        </motion.div>

        {/* Label con estado */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-center"
        >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-2xl px-5 py-3 shadow-sm border inline-block"
              style={{ borderColor: 'var(--color-border)' }}
            >
            <div className="flex items-center gap-2">
              {/* Indicador de estado pulsante */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-2 h-2 rounded-full`}
                style={{ background: config.color }}
              />
              
              <p className="text-xs font-semibold text-gray-700">
                {config.text}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Pulse decorativo de fondo */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.12, 0, 0.12]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className={`absolute inset-0 rounded-3xl -z-10`}
              style={{ background: config.color }}
            />
      </div>
    </motion.div>
  );
}
