/**
 * SourceCitation Component - Citaciones ultra elegantes con animaciones
 */

import { FileText, CheckCircle, ChevronDown, ChevronUp, BookOpen, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import type { Source } from '../types';

interface SourceCitationProps {
  sources: Source[];
  documentsConsulted: string[];
}

export function SourceCitation({ sources, documentsConsulted }: SourceCitationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!sources || sources.length === 0) return null;

  const truncateText = (text: string, maxLength: number = 300) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="sources-section"
    >
      {/* Documentos consultados con estilo premium */}
      {documentsConsulted && documentsConsulted.length > 0 && (
        <div style={{ marginBottom: '8px' }}>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span className="sources-title">Fuentes consultadas:</span>
          </div>
          <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {documentsConsulted.map((doc, idx) => (
              <div key={idx} className="badge" title={doc}>
                <span className="text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>{doc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contenedor principal de citaciones */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="relative rounded-2xl overflow-hidden"
      >
        {/* Fondo decorativo sutil (reemplazado gradientes por overlay tokenizado) */}
        <div className="absolute inset-0" style={{ background: 'rgba(245,158,11,0.04)' }} />
        <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.01)' }} />
        
        <div className="relative" style={{ padding: '20px' }}>
          <div className="flex items-start gap-4">
            {/* Icono decorativo */}
            <motion.div
              animate={{ 
                y: [0, -4, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="shrink-0 rounded-xl p-2.5 shadow-lg"
              style={{ background: 'var(--color-warning)' }}
            >
              <FileText className="w-5 h-5 text-white" />
            </motion.div>
            
            <div className="flex-1 min-w-0">
              {/* Header de citaciones */}
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  Fuentes Verificadas
                </h4>
                <div className="badge badge-primary">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs font-bold">{sources.length}</span>
                </div>
              </div>

              {/* Primera fuente destacada */}
              {sources.length > 0 && (
                <div className="mb-4">
                  <div className="relative pl-4 mb-3">
                    <p className="text-sm text-gray-700 italic leading-relaxed">
                      "{truncateText(sources[0].content)}"
                    </p>
                  </div>

                  <div className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>📄</span>
                    <span className="text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>{sources[0].source}</span>
                  </div>
                </div>
              )}

              {/* Más fuentes (colapsables con animación premium) */}
              {sources.length > 1 && (
                <>
                  <motion.button
                    onClick={() => setIsExpanded(!isExpanded)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-amber-200/60 rounded-xl text-xs font-semibold text-amber-700 hover:text-amber-900 transition-all shadow-sm hover:shadow-md"
                  >
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </motion.div>
                    <span>
                      {isExpanded ? 'Ocultar' : 'Ver'} {sources.length - 1} fuente{sources.length - 1 > 1 ? 's' : ''} adicional{sources.length - 1 > 1 ? 'es' : ''}
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {isExpanded && (
                      <div className="mt-4" style={{ display: 'grid', gap: '12px' }}>
                        {sources.slice(1).map((source, idx) => (
                          <div key={idx} style={{ paddingLeft: '12px', borderLeft: `2px solid ${'var(--color-border)'}` }}>
                            <p className="text-sm text-gray-700 italic leading-relaxed">"{truncateText(source.content)}"</p>
                            <div className="badge" style={{ marginTop: '8px' }}>
                              <span>📄</span>
                              <span className="text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>{source.source}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Borde inferior tokenizado */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'var(--color-warning)' }} />
      </motion.div>
    </motion.div>
  );
}
