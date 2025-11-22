/**
 * App Component - Asistente Legal Inteligente
 * Hack-Kognia 1.0 - Hackathon Caldas 2025
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DocumentInfo } from './components/DocumentInfo';
import { ChatArea } from './components/ChatArea';
import { InputArea } from './components/InputArea';
import { LegalRobot } from './components/LegalRobot';
import { Footer } from './components/Footer';
import { api } from './utils/api';
import { toast, Toaster } from 'sonner@2.0.3';
import { motion } from 'motion/react';
import type { Message, RobotState } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [robotState, setRobotState] = useState<RobotState>('idle');
  const [hasCheckedBackend, setHasCheckedBackend] = useState(false);

  // Verificar estado del backend al cargar (sin mostrar error inmediato)
  useEffect(() => {
    checkBackendHealth(true);
  }, []);

  const checkBackendHealth = async (isInitialCheck = false) => {
    try {
      await api.health();
      setIsOnline(true);
      setHasCheckedBackend(true);
      
      if (!isInitialCheck) {
        toast.success('Conectado al backend correctamente', {
          duration: 2000,
          icon: '✅'
        });
      }
    } catch (error) {
      setIsOnline(false);
      setHasCheckedBackend(true);
      
      if (!isInitialCheck) {
        toast.error('No se pudo conectar al backend', {
          duration: 4000,
          icon: '❌',
          description: 'Asegúrate de que FastAPI esté corriendo en http://localhost:8000'
        });
      }
    }
  };

  const handleSendMessage = async (question: string) => {
    if (!question.trim() || isLoading) return;

    // Verificar conexión primero
    if (!isOnline) {
      toast.error('Backend no disponible', {
        duration: 5000,
        icon: '🔌',
        description: 'Inicia el servidor FastAPI en http://localhost:8000 y recarga la página',
        action: {
          label: 'Reintentar',
          onClick: () => checkBackendHealth()
        }
      });
      return;
    }

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setRobotState('thinking');

    try {
      // Realizar consulta
      const response = await api.query(question);

      // Agregar respuesta del asistente
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: response.answer,
        sources: response.sources,
        documents_consulted: response.documents_consulted,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setRobotState('happy');

      // Volver a estado idle después de 2 segundos
      setTimeout(() => {
        setRobotState('idle');
      }, 2000);

      toast.success('Respuesta recibida', {
        duration: 2000,
        icon: '🤖'
      });

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Marcar como offline
      setIsOnline(false);
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: 'assistant',
        content: '❌ Lo siento, perdí la conexión con el backend. Por favor verifica que el servidor FastAPI esté corriendo en http://localhost:8000 y recarga la página.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      setRobotState('idle');

      toast.error('Error de conexión', {
        duration: 5000,
        icon: '❌',
        description: 'El backend no responde. Verifica que esté corriendo.',
        action: {
          label: 'Reintentar conexión',
          onClick: () => checkBackendHealth()
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Fondo sobrio usando tokens */}
      <div className="fixed inset-0 -z-10" style={{ background: 'var(--color-background)' }} />
      
      {/* Decoración de fondo con círculos */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(30,64,175,0.06)' }} />
        <div className="absolute top-40 -right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(139,92,246,0.04)' }} />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-96 rounded-full blur-3xl" style={{ background: 'rgba(6,182,212,0.04)' }} />
      </div>

      {/* Toast notifications */}
      <Toaster position="top-right" richColors />

      {/* Header */}
      <Header isOnline={isOnline} documentsCount={3} />

      {/* Document Info */}
      <DocumentInfo />

      {/* Backend warning banner mejorado */}
      {hasCheckedBackend && !isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 mb-6 relative z-20"
        >
          <div className="glass-card border-l-4 border-amber-500 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="shrink-0 rounded-xl p-3 shadow-lg"
                style={{ background: 'var(--color-warning)' }}
              >
                <span className="text-2xl">⚠️</span>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg font-display font-bold text-amber-900 mb-2">Backend no disponible</h3>
                <p className="text-sm text-amber-800 mb-4 leading-relaxed">
                  No se puede conectar al servidor FastAPI. Asegúrate de que esté corriendo en{' '}
                  <code className="px-2 py-1 bg-amber-100/80 rounded-lg font-mono text-xs border border-amber-200">
                    http://localhost:8000
                  </code>
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => checkBackendHealth()}
                    className="px-5 py-2.5 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    style={{ background: 'var(--color-warning)' }}
                  >
                    <span>🔄</span>
                    Reintentar conexión
                  </motion.button>
                  <motion.a
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href="http://localhost:8000/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-white hover:bg-gray-50 text-amber-900 border-2 border-amber-300 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <span>📖</span>
                    Abrir FastAPI Docs
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Chat Area */}
      <ChatArea
        messages={messages}
        isLoading={isLoading}
        onSendSuggestedQuestion={handleSendSuggestedQuestion}
      />

      {/* Input Area */}
      <InputArea
        onSendMessage={handleSendMessage}
        disabled={isLoading || !isOnline}
      />

      {/* Legal Robot Mascot */}
      <LegalRobot state={robotState} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;