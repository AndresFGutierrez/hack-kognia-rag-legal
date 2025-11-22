/**
 * Cliente API para comunicación con el backend FastAPI
 * Endpoint: http://localhost:8000
 */

import type { QueryRequest, QueryResponse, HealthResponse } from '../types';

const API_URL = process.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Cliente API con manejo de errores robusto
 */
export const api = {
  /**
   * Verifica el estado del servidor backend
   */
  health: async (): Promise<HealthResponse> => {
    try {
      const response = await fetch(`${API_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(5000) // Timeout de 5 segundos
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'TimeoutError') {
          throw new Error('Timeout: El servidor no responde');
        }
        if (error.message.includes('Failed to fetch')) {
          throw new Error('No se puede conectar al backend. Verifica que esté corriendo en http://localhost:8000');
        }
      }
      throw error;
    }
  },

  /**
   * Envía una consulta legal al asistente IA
   */
  query: async (question: string): Promise<QueryResponse> => {
    try {
      const requestBody: QueryRequest = { question };
      
      const response = await fetch(`${API_URL}/query`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(30000) // Timeout de 30 segundos para queries
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }
      
      const data: QueryResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'TimeoutError') {
          throw new Error('La consulta tardó demasiado. Intenta con una pregunta más específica.');
        }
        if (error.message.includes('Failed to fetch')) {
          throw new Error('Conexión perdida con el backend');
        }
      }
      throw error;
    }
  }
};