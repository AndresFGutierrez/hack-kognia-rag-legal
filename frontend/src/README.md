# 🏛️ Asistente Legal Inteligente - Frontend

Interfaz web moderna para consultar documentos legales colombianos mediante Inteligencia Artificial.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Características

✅ **Chat interactivo** con asistente IA en tiempo real  
✅ **Citación automática** de fuentes legales verificadas  
✅ **Búsqueda inteligente** en 3 documentos legales colombianos  
✅ **Diseño moderno** con glassmorphism y animaciones fluidas  
✅ **Responsive** - Adaptado para móvil, tablet y desktop  
✅ **Mascota robot animada** que reacciona al estado del sistema  
✅ **Accesibilidad** - ARIA labels y navegación por teclado  

---

## 📚 Documentos Legales Disponibles

1. **Constitución Política de Colombia** (170 páginas)
2. **Ley 769 de 2002** - Código Nacional de Tránsito (123 páginas)
3. **Ley 1257 de 2008** - Violencia contra la mujer (15 páginas)

---

## 🛠️ Tecnologías

### Frontend
- **React 18** - Biblioteca UI moderna
- **TypeScript** - Tipado estático para mayor seguridad
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS 4** - Framework de utilidades
- **Motion (Framer Motion)** - Animaciones fluidas
- **Lucide React** - Iconos modernos
- **Sonner** - Toast notifications elegantes

### Backend (Separado)
- **FastAPI** - Framework web para Python
- **LangChain** - Framework para aplicaciones LLM
- **RAG** (Retrieval-Augmented Generation)
- **HuggingFace Embeddings** - Vectorización de documentos

---

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ instalado
- Backend FastAPI corriendo en `http://localhost:8000`

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd frontend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

La aplicación estará disponible en `http://localhost:5173`

---

## 🔌 Conexión con Backend

### Endpoints Utilizados

#### Health Check
```http
GET http://localhost:8000/health
```

#### Query Legal Documents
```http
POST http://localhost:8000/query
Content-Type: application/json

{
  "question": "¿Qué dice sobre derechos fundamentales?"
}
```

**Respuesta:**
```json
{
  "answer": "Respuesta generada por IA...",
  "sources": [
    {
      "content": "Fragmento del documento...",
      "source": "constitucion_politica.pdf"
    }
  ],
  "documents_consulted": ["constitucion_politica.pdf"]
}
```

### Configuración de API

El cliente API está en `/utils/api.ts`. Para cambiar la URL del backend:

```typescript
const API_URL = 'http://localhost:8000'; // Modificar aquí
```

---

## 🎨 Estructura del Proyecto

```
frontend/
├── src/
│   ├── App.tsx                    # Componente principal
│   ├── components/
│   │   ├── Header.tsx             # Encabezado con branding
│   │   ├── DocumentInfo.tsx       # Info de documentos cargados
│   │   ├── ChatArea.tsx           # Área de mensajes
│   │   ├── MessageBubble.tsx      # Burbuja individual de mensaje
│   │   ├── TypingIndicator.tsx    # Indicador de escritura
│   │   ├── SourceCitation.tsx     # Citación de fuentes legales
│   │   ├── InputArea.tsx          # Input + botón enviar
│   │   ├── LegalRobot.tsx         # Mascota robot animada
│   │   └── Footer.tsx             # Footer con créditos
│   ├── utils/
│   │   └── api.ts                 # Cliente API
│   ├── types/
│   │   └── index.ts               # Definiciones TypeScript
│   └── styles/
│       └── globals.css            # Estilos globales
├── README.md
└── package.json
```

---

## 🤖 Mascota Robot

El robot animado `LegalRobot` tiene 4 estados:

- **Idle** 😊 - Flotando tranquilamente
- **Thinking** 🤔 - Procesando consulta (engranajes)
- **Speaking** 💬 - Respondiendo al usuario
- **Happy** 🎉 - Celebrando respuesta exitosa

---

## 🎯 Características Destacadas

### Animaciones
- Typewriter effect en respuestas del asistente
- Transiciones suaves entre estados
- Micro-interacciones en botones
- Robot animado con Motion

### Diseño
- Paleta de colores azul profundo + cyan tecnológico
- Glassmorphism en cards y burbujas
- Gradientes en header y botones
- Sombras múltiples para profundidad

### UX
- Sugerencias de preguntas iniciales
- Scroll automático al último mensaje
- Indicador de conexión en tiempo real
- Toast notifications para feedback

---

## 📱 Responsive Design

- **Mobile** (< 640px): Chat full-width, robot oculto
- **Tablet** (640px - 1024px): Layout optimizado
- **Desktop** (> 1024px): Experiencia completa con robot

---

## ♿ Accesibilidad

- ARIA labels en todos los controles interactivos
- Navegación por teclado (Tab, Enter, Shift+Enter)
- Focus visible con outline azul
- Contraste de color > 4.5:1
- Screen reader friendly

---

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén configurados)
npm run test

# Coverage
npm run test:coverage
```

---

## 🚀 Deployment

### Build de Producción

```bash
npm run build
```

Los archivos optimizados estarán en `/dist`

### Variables de Entorno

Crear `.env` para configuración:

```env
VITE_API_URL=http://localhost:8000
```

---

## 👥 Equipo de Desarrollo

🧑‍💻 **Andrés Felipe Gutiérrez Martínez**  
🧑‍💻 **José Miguel Buritica Morales**  
🧑‍💻 **Manuela Cardona Cartagena**  

---

## 🏆 Hackathon

**Hack-Kognia 1.0** - Hackathon Caldas 2025  
Noviembre 2025 🇨🇴

---

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para más detalles

---

## 🐛 Reporte de Bugs

¿Encontraste un problema? Abre un issue en GitHub con:
- Descripción del error
- Pasos para reproducir
- Screenshots (si aplica)
- Información del navegador

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una branch para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📞 Contacto

Para preguntas o consultas sobre el proyecto:
- Email: [contacto@ejemplo.com](mailto:contacto@ejemplo.com)
- GitHub: [github.com/tu-usuario](https://github.com/tu-usuario)

---

## 🎉 Agradecimientos

- **Hack-Kognia 1.0** por la organización del hackathon
- **Comunidad open-source** por las herramientas utilizadas
- **Mentores y jueces** por su apoyo y retroalimentación

---

**¡Hecho con ❤️ en Colombia 🇨🇴!**
