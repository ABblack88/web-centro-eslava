# 💆‍♂️ Centro Eslava - Web Oficial

[![Estado](https://img.shields.io/badge/Estado-En_Producci%C3%B3n-green?style=for-the-badge)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![Performance](https://img.shields.io/badge/Performance-Optimized-blueviolet?style=for-the-badge)](#)

Desarrollo integral de la plataforma web corporativa para el **Centro Eslava** (clínica especializada en masajes y terapias). Arquitectura orientada al SEO, velocidad de carga extrema y diseño adaptativo (*Responsive Design*).

## 🚀 Arquitectura y Optimizaciones

A diferencia de las plantillas prefabricadas, este proyecto está construido con un enfoque *Performance-First*:

- **Estilado Escalable (Tailwind v4):** Uso avanzado de Tailwind CSS mediante CLI, integrando contenedores de consultas (*container-queries*) y formularios para una UI moderna y mantenible.
- **Optimización de Assets (Sharp):** Implementación de un pipeline de Node.js custom (`compress.js`) utilizando la librería `sharp` para procesar, redimensionar y comprimir imágenes automáticamente, asegurando los mejores tiempos de carga.
- **Estructura Multi-Página Estática:** División semántica por servicios (`fascitis-plantar.html`, `magnetoterapia.html`, etc.) garantizando una indexación perfecta en motores de búsqueda (SEO).
- **Proceso de Build Automatizado:** Scripts NPM configurados para compilación y minificación de CSS en entornos de despliegue (`npm run build`).

## 🛠️ Stack Tecnológico

- **Maquetación:** HTML5 Semántico
- **Estilos:** Tailwind CSS v4 (CLI)
- **Automatización & Node:** JavaScript, `sharp` (Image processing)
- **Control de Versiones:** Git / GitHub

## 📦 Comandos de Desarrollo

Si deseas compilar los estilos de forma local para contribuir o modificar la web:

```bash
# 1. Instalar dependencias (Tailwind y Sharp)
npm install

# 2. Ejecutar entorno de desarrollo (Tailwind Watch)
npm run dev

# 3. Generar Build para Producción (Minificado)
npm run build
```
