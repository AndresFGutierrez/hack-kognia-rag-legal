# 📚 Asistente Legal RAG - Hack Kognia (2025)

**Proyecto**: Asistente Legal RAG (Retrieval-Augmented Generation) — sistema de consulta legal con soporte de IA para consultas sobre leyes y normativas colombianas.

Este repositorio contiene el código fuente del proyecto desarrollado durante el Hackathon Kognia 2025. El objetivo del proyecto es ofrecer un asistente conversacional que responda preguntas legales apoyándose en un índice de documentos (RAG) y modelos de lenguaje/embeddings.

**Estado**: Prototipo / Hackathon

---

**Índice rápido**

- **Descripción**: qué hace el proyecto y cómo se creó
- **Tecnologías**: pila completa usada
- **Arquitectura**: visión general frontend / backend / pipelines
- **Modelos y datos**: cómo se generan embeddings y se responde con RAG
- **Instalación y ejecución**: comandos para desarrollo local
- **API**: endpoints principales y formatos
- **Estructura del repositorio**: archivos y carpetas relevantes
- **Notas de diseño**: tokens CSS y sistema de diseño aplicado
- **Testing y desarrollo**: cómo ejecutar tests y linters
- **Contribución**: guía rápida para colaborar
- **Contacto y licencia**

---

**Descripción**

Este proyecto implementa un asistente conversacional especializado en consultas legales. El flujo es:

- Indexación: se procesan documentos legales (PDFs, textos) y se generan vectores (embeddings).
- Al recibir una consulta, se recuperan fragmentos relevantes del índice (vector store).
- Se utiliza un modelo de lenguaje junto con los fragmentos recuperados para generar una respuesta precisa y referenciada.

Se priorizó una arquitectura modular: backend (API y orquestador de RAG), frontend (UI React/TypeScript) y componentes de ingestión/indexación.

---

**Tecnologías principales**

- **Frontend**: React + TypeScript, Vite, Motion (animaciones), Sonner (toasts), Lucide Icons.
- **Backend**: FastAPI, Uvicorn (ASGI). Servicios y orquestación para RAG y endpoints HTTP.
- **IA / RAG**:
  - LangChain (orquestación de recuperación y prompt chains)
  - Embeddings: HuggingFace / modelo de embeddings (configurable)
  - Vector store: almacenamiento local (archivo/FAISS/annoy) o servicio gestionado (según configuración)
  - Modelos LLM: configurable — puede usar modelos locales (transformers) o APIs (OpenAI, HuggingFace Inference).
- **Otros**: Python 3.10+, Node 18+, npm/yarn.

---

**Arquitectura**

Visión de alto nivel:

- Frontend (React): UI de chat, manejo de estado, renderizado de respuestas y fuentes consultadas. Cliente API en `frontend/src/utils/api.ts`.
- Backend (FastAPI): endpoints `POST /query` y `GET /health`. Orquesta la recuperación de documentos, llamadas a embeddings/modelo y devuelve respuesta + metadatos (fuentes, documentos consultados).
- Pipeline de indexación: scripts para procesar documentos, limpiar texto, chunking y generar embeddings.

Comunicación: Frontend ↔ Backend por HTTP; backend puede acceder a vector store local o remoto.

---

**Modelos y datos**

- Embeddings: se utilizan modelos de embeddings (HuggingFace o servicios externos). El nombre del modelo y el token se configuran mediante variables de entorno.
- LLM: sistema flexible; en el prototipo se prepara para usar modelos locales o remotos. Los prompts están organizados en LangChain para inyectar contexto y fuentes.
- Vector store: resultado de la indexación de la base de documentos. El vector store guarda metadatos (doc id, offset, texto) para poder renderizar las citaciones.

---

**Instalación y ejecución (desarrollo local)**

Requisitos previos:

- Python 3.10 o superior
- Node.js 18+ y npm
- (Opcional) Entorno virtual Python

1. Backend

```powershell
cd "C:\Users\pipeo\OneDrive\Escritorio\Proyectos Programacion\hack-kognia-rag-legal\backend"
# (opcional) crear y activar virtualenv
# python -m venv .venv ; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
# Variables de entorno: crea .env basado en .env.example
# Ejemplo de variable mínimas:
# HF_API_TOKEN=...
# MODEL_NAME=sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2
# VECTOR_STORE_PATH=./data/vectors.db

# Levantar API
uvicorn main:app --reload --port 8000
```

2. Frontend

```powershell
cd "C:\Users\pipeo\OneDrive\Escritorio\Proyectos Programacion\hack-kognia-rag-legal\frontend"
npm install
npm run dev
# Abrir http://localhost:3000 o el puerto que indique Vite
```

3. Indexación (si procede)

- Ejecutar el script de seeding/indexación (si existe) para procesar PDFs y generar vector store. Revisa `backend/` para scripts tipo `scripts/seed_vectors.py` o similar.

---

**API (endpoints importantes)**

- `GET /health` — devuelve estado del servicio (status, documentos_count, lista").
- `POST /query` — cuerpo JSON:

```json
{
  "question": "Texto de la consulta",
  "top_k": 6
}
```

Respuesta (ejemplo):

```json
{
  "answer": "Respuesta generada por el LLM",
  "sources": [{ "source": "Ley 123", "content": "..." }],
  "documents_consulted": ["Constitucion.pdf", "Ley_123.pdf"]
}
```

---

**Estructura del repositorio (resumen)**

- `backend/` — código FastAPI, scripts de ingestión/indexación, `requirements.txt`, `main.py`.
- `frontend/` — aplicación React + TypeScript (Vite). Componentes en `frontend/src/components/`.
- `frontend/src/utils/api.ts` — cliente HTTP para `GET /health` y `POST /query`.
- `frontend/src/styles/globals.css` — tokens del sistema de diseño (colores, espaciado, `glass-card`), se reemplazaron gradientes por variables para apariencia sobria.

---

**Notas de diseño y UI**

- Se aplicó un sistema de diseño minimalista-profesional centrado en 3 tokens: `--color-primary`, `--color-accent`, `--color-surface`.
- Se eliminaron gradientes agresivos y se sustituyeron por overlays y sombras sutiles para mejorar legibilidad.
- Archivos clave: `frontend/src/styles/globals.css` (tokens), `frontend/src/components/MessageBubble.tsx`, `InputArea.tsx`, `ChatArea.tsx`, `SourceCitation.tsx`.

---

**Testing y linters**

- Frontend: configurar `npm run lint` y `npm run test` si están definidos en `package.json`.
- Backend: ejecutar tests unitarios si existen (pytest). Asegúrate de tener variables de entorno para pruebas (mock de embeddings/vector store).

---

**Despliegue (sugerencias)**

- Para producción, se recomienda desplegar backend con Uvicorn/Gunicorn detrás de un proxy (Nginx) y servir el frontend con un CDN o hosting estático.
- El vector store debe persistir en almacenamiento de alto rendimiento (disco local optimizado o servicio gestionado). Considera usar Redis/Elastic/Weaviate para escala.

---

**Contribución**

- Trabaja en ramas feature/ y abre Pull Requests contra `main`.
- Sigue convención de commits (Conventional Commits). Añade tests por cada feature crítica.

---

**Contacto**

- Equipo: Andrés Felipe Gutiérrez Martínez, José Miguel Buritica Morales, Manuela Cardona Cartagena
- Hack-Kognia 2025

