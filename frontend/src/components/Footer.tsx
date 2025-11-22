/**
 * Footer Component - Créditos premium con diseño moderno
 */

import { Scale, Code, Users, Zap, Github, Mail, FileText, Award, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const technologies = [
    { name: 'React + TypeScript', icon: '⚛️' },
    { name: 'FastAPI + LangChain', icon: '🚀' },
    { name: 'RAG (Retrieval-Augmented Generation)', icon: '🧠' },
    { name: 'Embeddings con HuggingFace', icon: '🤗' }
  ];

  const team = [
    { name: 'Andrés Felipe Gutiérrez Martínez', role: 'Full Stack Developer' },
    { name: 'José Miguel Buritica Morales', role: 'AI/ML Engineer' },
    { name: 'Manuela Cardona Cartagena', role: 'Frontend Developer' }
  ];

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Gradiente superior decorativo */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
      
      {/* Fondo con glassmorphism */}
      <div className="relative" style={{ background: 'var(--color-text-primary)', color: 'white' }}>
        {/* Patrón de fondo (eliminado gradientes); se usa un overlay sutil */}
        <div className="absolute inset-0 opacity-6" style={{ background: 'rgba(255,255,255,0.02)' }} />

        {/* Decoración de círculos sutiles */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(30,64,175,0.06)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(16,185,129,0.04)' }} />

        <div className="relative container mx-auto px-6 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Columna 1: Información del proyecto */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="rounded-2xl p-3 shadow-xl"
                  style={{ background: 'var(--color-primary)' }}
                >
                  <Scale className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl text-white font-display font-bold">Asistente Legal RAG</h3>
                  <p className="text-sm text-indigo-300">Powered by AI</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <p className="text-gray-300 text-sm">
                    <span className="font-semibold text-white">Hack-Kognia 1.0</span>
                  </p>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Hackathon Caldas 2025 · Sistema de consulta legal con Inteligencia Artificial
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>🇨🇴</span>
                  <span>Hecho con</span>
                  <Heart className="w-4 h-4 text-red-400 fill-current" />
                  <span>en Colombia</span>
                </div>
              </div>
            </motion.div>

            {/* Columna 2: Tecnologías */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-6 h-6 text-amber-400" />
                <h3 className="text-lg text-white font-display font-bold">Stack Tecnológico</h3>
              </div>
              <ul className="space-y-3">
                {technologies.map((tech, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                    className="group flex items-start gap-3 cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="shrink-0 mt-0.5 text-xl"
                    >
                      {tech.icon}
                    </motion.div>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                      {tech.name}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Columna 3: Equipo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-6 h-6 text-green-400" />
                <h3 className="text-lg text-white font-display font-bold">Equipo</h3>
              </div>
              <ul className="space-y-4 mb-6">
                {team.map((member, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="group"
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="shrink-0 w-2.5 h-2.5 mt-2 rounded-full shadow-lg"
                        style={{ background: 'var(--color-primary)' }}
                      />
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-400">{member.role}</p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-2xl">💡</span>
                <span>Noviembre 2025</span>
              </div>
            </motion.div>
          </div>

          {/* Divider con gradiente */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
                <div className="bg-slate-900 px-4">
                <div className="h-1 w-24 rounded-full" style={{ background: 'var(--color-primary)' }} />
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <p className="text-sm text-gray-500 text-center md:text-left">
              © 2025 Asistente Legal Inteligente · Todos los derechos reservados
            </p>

            {/* Links sociales */}
            <div className="flex items-center gap-4">
              {[
                { icon: Github, label: 'GitHub', href: '#' },
                { icon: FileText, label: 'Docs', href: '#' },
                { icon: Mail, label: 'Contacto', href: '#' }
              ].map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                  aria-label={link.label}
                >
                  <div className="relative glass-dark rounded-xl p-3 border border-white/10 hover:border-indigo-400/50 transition-all">
                    <link.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-white text-gray-900 text-xs px-3 py-1.5 rounded-lg font-medium shadow-xl">
                      {link.label}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Badge final */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
              <Code className="w-4 h-4 text-indigo-400" />
              <span className="text-xs text-gray-400">
                Construido con React, TypeScript y mucho ☕
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
