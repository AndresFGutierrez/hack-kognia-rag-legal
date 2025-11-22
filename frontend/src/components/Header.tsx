/**
 * Header Component - Ultra modern branding con efectos premium
 */

import { Scale, Brain, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface HeaderProps {
  isOnline: boolean;
  documentsCount: number;
}

export function Header({ isOnline, documentsCount }: HeaderProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generar partículas decorativas
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden"
      style={{ minHeight: '220px' }}
    >
      {/* Fondo simple y profesional */}
      <div className="absolute inset-0" style={{ background: 'var(--color-primary)' }} />
      
      {/* Overlay con patrón */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      {/* Partículas flotantes */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-white/30 rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, -40, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 6 + particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay
          }}
        />
      ))}

      {/* Glow effect superior sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]" style={{ background: 'rgba(17,24,39,0.06)', borderRadius: '9999px', filter: 'blur(60px)' }} />

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-6 py-10 flex flex-col items-center justify-center text-center">
        {/* Logo con efecto glow */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: 0.3, 
            type: 'spring', 
            stiffness: 200,
            damping: 15
          }}
          className="mb-6 relative"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 30px rgba(168, 85, 247, 0.4)',
                '0 0 50px rgba(168, 85, 247, 0.6)',
                '0 0 30px rgba(168, 85, 247, 0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-white/20 backdrop-blur-xl rounded-3xl p-5 border border-white/30"
          >
            <Scale className="w-14 h-14 text-white drop-shadow-lg" />
          </motion.div>
          
          {/* Anillo decorativo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-3xl border-2 border-white/20 border-dashed"
            style={{ padding: '4px' }}
          />
        </motion.div>

        {/* Título con gradiente animado */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-3"
        >
          <h1 className="text-white mb-0">
            Asistente Legal Inteligente
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="h-1 rounded-full mt-2"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }}
          />
        </motion.div>

        {/* Subtítulo con efecto shimmer */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-white/95 text-lg mb-6 max-w-2xl font-light tracking-wide"
        >
          Consulta documentos legales colombianos con{' '}
          <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.95)' }}>Inteligencia Artificial</span>
        </motion.p>

        {/* Badges premium */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.9, type: 'spring' }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="group px-5 py-2.5 glass-card rounded-2xl flex items-center gap-2.5 border shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              <Brain className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
            </motion.div>
            <span className="text-sm font-medium" style={{ color: 'var(--color-surface)' }}>Powered by RAG</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1, type: 'spring' }}
            whileHover={{ scale: 1.05, y: -2 }}
            className={`px-5 py-2.5 rounded-2xl flex items-center gap-2.5 border shadow-sm transition-all`}
            style={{ background: isOnline ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', borderColor: isOnline ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)' }}
          >
            <motion.div
              animate={isOnline ? {
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isOnline ? (
                <CheckCircle className="w-5 h-5 text-green-200" />
              ) : (
                <XCircle className="w-5 h-5 text-red-200" />
              )}
            </motion.div>
                <span className="text-sm font-medium" style={{ color: 'white' }}>
              {isOnline ? `Online · ${documentsCount} documentos` : 'Offline · Verificando...'}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Wave decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-8" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,0 C150,50 350,0 600,50 C850,100 1050,50 1200,0 L1200,120 L0,120 Z"
            fill="white"
            fillOpacity="0.1"
            initial={{ d: "M0,0 C150,50 350,0 600,50 C850,100 1050,50 1200,0 L1200,120 L0,120 Z" }}
            animate={{ d: "M0,20 C150,0 350,50 600,0 C850,50 1050,0 1200,20 L1200,120 L0,120 Z" }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </svg>
      </div>
    </motion.header>
  );
}
