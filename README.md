# Memoria Sefardí — Demostración completa

Enciclopedia histórica y genealógica dedicada a la historia de los sefardíes, familias, migraciones y patrimonio documental.

**Todos los datos son ficticios** y se han creado únicamente para mostrar el funcionamiento del sistema.

## Cómo abrir el sitio

1. Abra el archivo `index.html` en un navegador moderno (Chrome, Firefox, Edge, Safari).
2. No necesita servidor: funciona como sitio estático local.
3. Navegue por el menú y explore las fichas de personas, documentos, árboles, mapa, cronología, etc.

## Estructura

```
memoria-sefardi/
├── index.html              → Página de inicio
├── css/styles.css          → Estilos (estética académica e histórica)
├── js/
│   ├── data.js             → Datos de demostración (personas, familias, documentos)
│   └── app.js              → Lógica interactiva (pestañas, listas, fichas)
└── pages/
    ├── personas.html       → Listado de biografías
    ├── persona.html        → Ficha individual completa (ejemplo: David Toledano)
    ├── familias.html       → Familias y linajes
    ├── familia.html        → Página de familia (Toledano)
    ├── apellidos.html      → Directorio de apellidos
    ├── documentos.html     → Biblioteca de documentos
    ├── documento.html      → Visor de documento con protección de derechos
    ├── arboles.html        → Árboles genealógicos con indicadores de evidencia
    ├── mapa.html           → Mapa de migraciones (demo)
    ├── cronologia.html     → Línea del tiempo histórica y familiar
    ├── lugares.html        → Lugares y comunidades
    ├── fuentes.html        → Sistema de referencias
    ├── biblioteca.html     → Biblioteca bibliográfica
    ├── sobre.html          → Sobre el proyecto
    ├── contribuciones.html → Roles y sistema de contribuciones
    └── admin.html          → Panel administrativo (dashboard)
```

## Características implementadas en la demo

- Diseño elegante, académico y responsive (ordenador, tablet, móvil)
- Portada con buscador, accesos rápidos, personajes, familias y documentos destacados
- Fichas de persona con pestañas: biografía, evidencia documental, familia/árbol, documentos, fuentes, cronología, lugares
- Sistema de niveles de evidencia (Confirmado, Documentado, Probable, Posible, Hipótesis, En investigación) + estrellas
- Árboles genealógicos con colores según nivel de evidencia
- Biblioteca de documentos con visor (zoom, rotación, metadatos — interfaz demo)
- Advertencias de rigor genealógico y de derechos de archivo
- Cronología histórica + eventos familiares filtrables (UI)
- Mapa de rutas migratorias (placeholder listo para Leaflet)
- Panel admin con estadísticas y cola de revisión
- Roles de usuario descritos (visitante → administrador)
- Privacidad (público / restringido / privado)

## Datos de demostración

Familia **Toledano** (Salónica, s. XVI):

- David ben Abraham Toledano (c. 1485 – c. 1542)
- Rachel Cohen Toledano
- Isaac Toledano
- Miriam Toledano
- Abraham Toledano (nieto)

Documentos asociados: ketubá de 1535, inventario/testamento c. 1540, padrón c. 1520.

## Próximos pasos para producción

- Backend (API REST/GraphQL) y base de datos relacional
- Autenticación y roles reales
- Integración de mapas (Leaflet + OpenStreetMap)
- Visor de imágenes de alta resolución con restricciones de descarga
- Importación de archivos históricos y APIs genealógicas autorizadas
- Historial de versiones y moderación completa

## Nota legal / ética

Esta demostración **no contiene datos de personas reales**. Cualquier parecido es coincidencia. No debe usarse como fuente genealógica ni histórica.

---

© 2026 Memoria Sefardí — Demostración educativa.
