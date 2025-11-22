/**
 * DocumentInfo Component - Cards premium con glassmorphism avanzado
 */

import { FileText, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface Document {
  name: string;
  pages: number;
  icon: string;
}

const DOCUMENTS: Document[] = [
  { name: 'Constitución Política de Colombia', pages: 170, icon: '⚖️' },
  { name: 'Ley 769 de 2002 - Código Nacional de Tránsito', pages: 123, icon: '🚗' },
  { name: 'Ley 1257 de 2008 - Violencia contra la mujer', pages: 15, icon: '🛡️' }
];

export function DocumentInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="container mx-auto px-6 py-8 -mt-6 relative z-20"
    >
      <div className="glass rounded-3xl p-8 shadow-xl border border-white/40">
        {/* Header de la sección */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="rounded-xl p-2.5 shadow-lg"
            style={{ background: 'var(--color-primary)' }}
          >
            <FileText className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h2 className="text-xl text-gray-800 font-display">Documentos Disponibles</h2>
            <p className="text-sm text-gray-600">Base de conocimiento legal actualizada</p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DOCUMENTS.map((doc, index) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.7 + index * 0.15,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{ 
                y: -8,
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              {/* Glow effect en hover */}
              <motion.div
                className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"
                style={{ background: 'var(--color-primary)', opacity: 0.06 }}
              />
              
              {/* Card principal */}
              <div className="relative glass-card rounded-2xl p-5 border border-white/60 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Decoración sutil */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full" style={{ background: 'rgba(99,102,241,0.06)' }} />
                
                <div className="relative flex items-start gap-4">
                  {/* Icono del documento */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="shrink-0 rounded-2xl p-3.5 shadow-md"
                    style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                  >
                    <span className="text-3xl">{doc.icon}</span>
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 leading-snug group-hover:text-indigo-700 transition-colors">
                      {doc.name}
                    </h3>
                    
                    {/* Badge de páginas */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="px-3 py-1 rounded-full" style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
                        <span className="text-xs font-medium text-indigo-700">
                          {doc.pages} páginas
                        </span>
                      </div>
                    </div>
                    
                    {/* Estado activo con animación */}
                    <motion.div 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.15 }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.7, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </motion.div>
                      <span className="text-xs font-medium text-green-700">Indexado</span>
                      
                      <motion.div
                        className="ml-auto"
                        whileHover={{ scale: 1.2, rotate: 180 }}
                      >
                        <Zap className="w-4 h-4 text-amber-500" />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                {/* Barra de progreso decorativa */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1 + index * 0.15, duration: 0.5 }}
                  style={{ transformOrigin: 'left', background: 'var(--color-primary)' }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Estadística adicional */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600"
        >
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="font-medium">
            {DOCUMENTS.reduce((sum, doc) => sum + doc.pages, 0)} páginas procesadas
          </span>
          <span className="text-gray-400">·</span>
          <span>Vectorización completa con embeddings</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
