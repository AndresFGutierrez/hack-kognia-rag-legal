/**
 * MessageBubble Component - Burbujas premium con efectos luminosos
 */

import { User, Bot, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { SourceCitation } from './SourceCitation';
import type { Message } from '../types';
import { useEffect, useState } from 'react';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === 'user';
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(!isUser);

  // Efecto typewriter premium para mensajes del asistente
  useEffect(() => {
    if (isUser) {
      setDisplayedText(message.content);
      return;
    }

    let index = 0;
    setDisplayedText('');
    setIsTyping(true);

    const timer = setInterval(() => {
      if (index < message.content.length) {
        setDisplayedText(prev => prev + message.content[index]);
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 8);

    return () => clearInterval(timer);
  }, [message.content, isUser]);

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: isUser ? 20 : -20,
        scale: 0.98
      }}
      animate={{ 
        opacity: 1, 
        x: 0,
        scale: 1
      }}
      transition={{ 
        duration: 0.28, 
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-6 group`}
    >
      {/* Avatar premium */}
      <motion.div
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.05, duration: 0.2 }}
        className="relative shrink-0"
      >
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm relative overflow-hidden`}
          style={{
            background: isUser ? 'var(--color-primary)' : 'var(--color-surface)',
            border: !isUser ? '1px solid var(--color-border)' : 'none'
          }}
        >
          {isUser ? (
            <User className="w-6 h-6 text-white relative z-10" />
          ) : (
            <Bot className="w-6 h-6 text-gray-600 relative z-10" />
          )}
        </div>
      </motion.div>

      {/* Contenido del mensaje */}
      <div className={`flex-1 max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* Burbuja premium */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`relative rounded-xl p-5 ${
            isUser
              ? 'text-white'
              : 'glass-card text-gray-800'
          }`}
          style={{
            background: isUser ? 'var(--color-primary)' : 'var(--color-surface)'
          }}
        >
          {/* Efecto glow para mensajes del usuario */}
          {isUser && (
            <div className="absolute -inset-0.5 rounded-xl -z-10" style={{ boxShadow: '0 6px 20px rgba(30,64,175,0.08)' }} />
          )}

          {/* Decoración superior para asistente */}
          {!isUser && (
            <div className="absolute top-0 left-0 h-1 rounded-tl-xl" style={{ background: 'var(--color-primary)' }} />
          )}

          {/* Texto con mejor tipografía */}
          <p className={`leading-relaxed whitespace-pre-wrap break-words ${
            isUser ? 'text-white' : 'text-gray-700'
          }`}>
            {displayedText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className={`inline-block w-1.5 h-5 ml-1 rounded-sm ${
                  isUser ? 'bg-white' : 'bg-indigo-600'
                }`}
              />
            )}
          </p>

          {/* Citación de fuentes (solo para asistente) */}
          {!isUser && !isTyping && message.sources && message.sources.length > 0 && (
            <SourceCitation
              sources={message.sources}
              documentsConsulted={message.documents_consulted || []}
            />
          )}

          {/* Sparkles para mensajes completados del asistente */}
          {/* Subtle finished marker removed for minimal design */}
        </motion.div>

        {/* Timestamp mejorado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`flex items-center gap-2 mt-2 px-3 ${isUser ? 'justify-end' : 'justify-start'}`}
        >
          <span className="text-xs text-gray-500 font-medium">
            {message.timestamp.toLocaleTimeString('es-CO', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          {!isUser && (
            <>
              <span className="text-gray-400">·</span>
              <span className="text-xs text-indigo-600 font-medium">IA Legal</span>
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
