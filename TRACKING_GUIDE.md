# 📊 GUÍA DE TRACKING Y ANALYTICS

## Descripción General

Se ha implementado un sistema completo de recopilación de datos sobre el comportamiento de usuarios. Este sistema incluye:

- **Google Analytics 4**: Seguimiento profesional de eventos
- **Meta Pixel (Facebook)**: Tracking de conversiones y eventos
- **Tracking Local**: Almacenamiento en localStorage para análisis offline
- **Panel de Analytics**: Visualización de datos en tiempo real

---

## 🚀 INSTALACIÓN Y CONFIGURACIÓN

### 1. **Google Analytics 4**

Para activar Google Analytics 4:

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una nueva propiedad
3. Copia tu ID de medición (formato: `G-XXXXXXXXXX`)
4. En `index.html`, reemplaza `G-XXXXXXXXXX` en estas líneas:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Eventos que se envían a Google Analytics:**
- `view_section` - Cuando el usuario ve una sección
- `scroll_depth` - Cada 25% de scroll
- `cta_click` - Clic en botón de llamada a la acción
- `whatsapp_contact` - Clic en enlace de WhatsApp
- `form_submit` - Envío de formulario
- `session_active` - Señal de sesión activa (cada 30s)
- `page_exit` - Cuando el usuario abandona la página

### 2. **Meta Pixel (Facebook)**

Meta Pixel ya está configurado con el ID: `4319599674986035`

**Eventos que se envían a Meta Pixel:**
- `PageView` - Vista de página
- `ViewContent` - Vista de una sección específica
- `Lead` - Contacto por formulario o WhatsApp
- `CustomEvent` - Eventos personalizados (scroll, clics, sesión)

---

## 📈 DATOS RECOPILADOS

### Por Sesión:
```javascript
{
  sessionId: "session_[timestamp]_[random]",
  startTime: timestamp,
  endTime: timestamp,
  pagesVisited: [],
  sectionsViewed: ["inicio", "servicios", "contacto"],
  clickedElements: [
    {
      text: "Comenzar Ahora",
      href: "#contacto",
      class: "cta-button",
      timestamp: timestamp
    }
  ],
  scrollDepth: 85,
  timeOnPage: 342, // segundos
  formInteractions: [
    {
      field: "Nombre completo",
      action: "focus",
      timestamp: timestamp
    }
  ],
  devices: {
    userAgent: "Mozilla/5.0...",
    language: "es-AR",
    screenResolution: "1920x1080",
    timezone: "America/Argentina/Cordoba"
  }
}
```

### Secciones Rastreadas:
- `#inicio` - Sección Hero
- `#servicios` - Servicios ofrecidos
- `#sobre-mi` / About - Información del profesional
- `#soluciones` - Soluciones destacadas
- `#contacto` - Formulario de contacto

### Elementos Rastreados:
- Todos los botones CTA
- Enlaces de navegación
- Envíos de formularios
- Clics en WhatsApp
- Cambios en inputs del formulario

---

## 🔍 PANEL DE ANALYTICS

**Ubicación:** `analytics.html`

### Métricas Mostradas:
1. **Sesiones Registradas** - Total de sesiones tracked
2. **Secciones Promedio Visitadas** - Número promedio de secciones por sesión
3. **Tiempo Promedio en Página** - Duración promedio de sesión
4. **Clics Totales Registrados** - Suma de todos los clics
5. **Scroll Depth Promedio** - Porcentaje promedio de scroll
6. **Interacciones de Formulario** - Total de interacciones con formularios

### Funcionalidades:
- ✅ Ver todas las sesiones registradas
- ✅ Descargar datos en formato JSON
- ✅ Exportar datos a CSV para Excel/Sheets
- ✅ Limpiar datos locales
- ✅ Actualización en tiempo real

---

## 📱 EVENTOS AUTOMATICAMENTE RASTREADOS

### 1. **Carga de Página**
```javascript
Evento: session_start
Datos: sessionId, screenResolution
```

### 2. **Visualización de Secciones**
Se dispara cuando el usuario ve una sección (25% visible)
```javascript
Evento: view_section
Datos: section_id, section_name
```

### 3. **Scroll Profundo**
Se dispara cada 25% de scroll (25%, 50%, 75%, 100%)
```javascript
Evento: scroll_depth
Datos: scroll_percentage
```

### 4. **Clics en CTA**
Se dispara al hacer clic en botones principales
```javascript
Evento: cta_click
Datos: cta_text
```

### 5. **Contacto WhatsApp**
Se dispara al hacer clic en enlace de WhatsApp
```javascript
Evento: whatsapp_contact
Datos: contact_type
```

### 6. **Envío de Formulario**
Se dispara cuando se completa el formulario
```javascript
Evento: form_submit
Datos: form_name, form_fields
```

### 7. **Cambios de Visibilidad**
Se dispara cuando el usuario minimiza o vuelve a la pestaña
```javascript
Evento: page_hidden / page_visible
```

### 8. **Salida de Página**
Se dispara cuando el usuario abandona la página
```javascript
Evento: page_exit
Datos: time_on_page, scroll_depth, sections_viewed, total_clicks
```

---

## 💾 ALMACENAMIENTO LOCAL

Los datos se guardan automáticamente en `localStorage` bajo la clave `userSessions`.

**Máximo de sesiones guardadas:** 10 últimas sesiones (se eliminan automáticamente las más antiguas)

Para acceder a los datos manualmente en la consola del navegador:
```javascript
JSON.parse(localStorage.getItem('userSessions'))
```

---

## 🔐 PRIVACIDAD Y CUMPLIMIENTO

⚠️ **IMPORTANTE:** 
- Asegúrate de cumplir con GDPR y leyes de privacidad locales
- Necesitas mostrar una notificación de cookies/privacidad
- Los datos de usuarios deben ser tratados conforme a tu política de privacidad
- Meta Pixel y Google Analytics tienen sus propios términos de privacidad

---

## 🛠️ SOLUCIÓN DE PROBLEMAS

### No se registran eventos en Google Analytics
- Verifica que el ID de medición sea correcto
- Espera 24-48 horas para ver datos en el dashboard de GA4
- Usa [Tag Assistant](https://tagassistant.google.com/) para verificar

### No se ven datos en el Panel de Analytics
- Abre la consola del navegador (F12)
- Verifica que `userSessions` esté en localStorage
- Limpia localStorage e intenta nuevamente

### Meta Pixel no registra eventos
- Verifica que el Pixel ID sea correcto (4319599674986035)
- Usa [Pixel Helper](https://www.facebook.com/business/tools/pixel-helper) de Chrome
- Verifica que no haya bloqueadores de ads activos

---

## 📊 DASHBOARDS EXTERNOS

### Configurar en Google Analytics:
1. Ve a "Reportes" > "Tiempo real"
2. Verás eventos mientras ocurren
3. En "Reportes" puedes ver datos históricos

### Configurar en Meta Pixel:
1. Ve a tu pixel en Facebook Business Suite
2. Ve a "Análisis de Eventos"
3. Verifica que los eventos lleguen correctamente

---

## 🚀 PRÓXIMOS PASOS RECOMENDADOS

1. **Configurar Google Analytics 4**
2. **Verificar Meta Pixel con Pixel Helper**
3. **Añadir política de privacidad en el sitio**
4. **Mostrar banner de consentimiento de cookies**
5. **Configurar conversiones/objetivos en GA4**
6. **Crear audiencias en Meta Pixel para publicidad**

---

**Última actualización:** 11 de Agosto de 2026
