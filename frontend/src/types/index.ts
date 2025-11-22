/**
 * Tipos TypeScript para el Asistente Legal Inteligente
 * Hack-Kognia 1.0 - Hackathon Caldas 2025
 */

export interface Source {
  content: string;
  source: string;
}

export interface QueryResponse {
  answer: string;
  sources: Source[];
  documents_consulted: string[];
}

export interface QueryRequest {
  question: string;
}

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  documents_consulted?: string[];
  timestamp: Date;
}

export interface HealthResponse {
  status: string;
  documents_count?: number;
  documents?: string[];
}

export type RobotState = 'idle' | 'thinking' | 'speaking' | 'happy';
