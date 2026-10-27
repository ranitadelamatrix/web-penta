/**
 * EJEMPLOS DE USO - Sistema de Tracking de Usuarios
 * 
 * Este archivo contiene ejemplos de cómo trabajar con los datos
 * recopilados del comportamiento de usuarios.
 */

// ===== EJEMPLO 1: Acceder a los datos de sesión actual =====

// En la consola del navegador (F12), puedes acceder a:
window.userBehaviorData

// O solo un aspecto específico:
console.log('Secciones visitadas:', userBehaviorData.sectionsViewed);
console.log('Tiempo en página:', userBehaviorData.timeOnPage, 'segundos');
console.log('Profundidad de scroll:', userBehaviorData.scrollDepth, '%');


// ===== EJEMPLO 2: Acceder a todas las sesiones guardadas =====

const allSessions = JSON.parse(localStorage.getItem('userSessions') || '[]');
console.log('Total de sesiones guardadas:', allSessions.length);

// Ver la última sesión
const lastSession = allSessions[allSessions.length - 1];
console.log('Última sesión:', lastSession);


// ===== EJEMPLO 3: Analizar datos de sesiones =====

function analyzeUserBehavior() {
  const sessions = JSON.parse(localStorage.getItem('userSessions') || '[]');
  
  if (sessions.length === 0) {
    console.log('No hay sesiones registradas');
    return;
  }

  // Estadísticas básicas
  const stats = {
    totalSessions: sessions.length,
    totalTime: sessions.reduce((sum, s) => sum + (s.timeOnPage || 0), 0),
    avgTime: Math.round(sessions.reduce((sum, s) => sum + (s.timeOnPage || 0), 0) / sessions.length),
    totalClicks: sessions.reduce((sum, s) => sum + (s.clickedElements?.length || 0), 0),
    avgClicks: Math.round(sessions.reduce((sum, s) => sum + (s.clickedElements?.length || 0), 0) / sessions.length),
    avgSections: Math.round(sessions.reduce((sum, s) => sum + (s.sectionsViewed?.length || 0), 0) / sessions.length),
    avgScroll: Math.round(sessions.reduce((sum, s) => sum + (s.scrollDepth || 0), 0) / sessions.length),
  };

  console.table(stats);
  return stats;
}

// Usar:
analyzeUserBehavior();


// ===== EJEMPLO 4: Encontrar patrones de usuario =====

function findUserPatterns() {
  const sessions = JSON.parse(localStorage.getItem('userSessions') || '[]');
  
  // Secciones más visitadas
  const sectionFrequency = {};
  sessions.forEach(session => {
    session.sectionsViewed?.forEach(section => {
      sectionFrequency[section] = (sectionFrequency[section] || 0) + 1;
    });
  });

  console.log('Secciones más visitadas:', 
    Object.entries(sectionFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
  );

  // Botones/elementos más clickeados
  const elementFrequency = {};
  sessions.forEach(session => {
    session.clickedElements?.forEach(elem => {
      const key = elem.text || elem.href;
      elementFrequency[key] = (elementFrequency[key] || 0) + 1;
    });
  });

  console.log('Elementos más clickeados:', 
    Object.entries(elementFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
  );
}

// Usar:
findUserPatterns();


// ===== EJEMPLO 5: Detectar usuarios comprometidos =====

function findEngagedUsers() {
  const sessions = JSON.parse(localStorage.getItem('userSessions') || '[]');
  
  const engaged = sessions.filter(s => 
    (s.timeOnPage || 0) > 120 && // Más de 2 minutos
    (s.sectionsViewed?.length || 0) >= 3 && // Al menos 3 secciones
    (s.clickedElements?.length || 0) >= 3 // Al menos 3 clics
  );

  console.log(`Usuarios altamente comprometidos: ${engaged.length} de ${sessions.length}`);
  console.log('Detalles:', engaged);
}

// Usar:
findEngagedUsers();


// ===== EJEMPLO 6: Rastrear progreso hacia conversión =====

function trackConversionFunnel() {
  const sessions = JSON.parse(localStorage.getItem('userSessions') || '[]');
  
  const funnel = {
    visitedSite: sessions.length,
    viewedServices: sessions.filter(s => s.sectionsViewed?.includes('servicios')).length,
    viewedSolutions: sessions.filter(s => s.sectionsViewed?.includes('soluciones')).length,
    viewedContact: sessions.filter(s => s.sectionsViewed?.includes('contacto')).length,
    submittedForm: sessions.filter(s => s.formInteractions?.length > 0).length,
  };

  console.log('Funnel de conversión:');
  console.table({
    'Visitaron sitio': `${funnel.visitedSite}`,
    'Vieron servicios': `${funnel.viewedServices} (${Math.round(funnel.viewedServices/funnel.visitedSite*100)}%)`,
    'Vieron soluciones': `${funnel.viewedSolutions} (${Math.round(funnel.viewedSolutions/funnel.visitedSite*100)}%)`,
    'Vieron contacto': `${funnel.viewedContact} (${Math.round(funnel.viewedContact/funnel.visitedSite*100)}%)`,
    'Interactuó con formulario': `${funnel.submittedForm} (${Math.round(funnel.submittedForm/funnel.visitedSite*100)}%)`,
  });
}

// Usar:
trackConversionFunnel();


// ===== EJEMPLO 7: Exportar datos a formato personalizado =====

function exportCustomFormat() {
  const sessions = JSON.parse(localStorage.getItem('userSessions') || '[]');
  
  const customData = sessions.map(s => ({
    'ID Sesión': s.sessionId,
    'Duración (min)': Math.round(s.timeOnPage / 60),
    'Secciones': s.sectionsViewed?.join(', ') || 'Ninguna',
    'Clics': s.clickedElements?.length || 0,
    'Scroll': s.scrollDepth + '%',
    'Dispositivo': s.devices?.screenResolution,
    'Idioma': s.devices?.language,
    'Fecha': new Date(s.startTime).toLocaleString('es-AR'),
  }));

  console.table(customData);
  return customData;
}

// Usar:
exportCustomFormat();


// ===== EJEMPLO 8: Rastrear evento personalizado =====

// Para agregar un evento personalizado en cualquier momento:
function trackCustomEvent(eventName, eventData = {}) {
  // Agregar al objeto de datos actuales
  userBehaviorData.customEvents = userBehaviorData.customEvents || [];
  userBehaviorData.customEvents.push({
    name: eventName,
    data: eventData,
    timestamp: new Date()
  });

  // Enviar a Meta Pixel
  fbq('track', 'CustomEvent', {
    event_name: eventName,
    ...eventData
  });

  // Enviar a Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventData);
  }

  console.log('✓ Evento personalizado registrado:', eventName);
}

// Ejemplos de uso:
trackCustomEvent('producto_visto', { producto_id: 'datos-001', nombre: 'Análisis de Datos' });
trackCustomEvent('carrito_actualizado', { items: 5, total: 500 });


// ===== EJEMPLO 9: Monitorear rendimiento de página =====

function monitorPagePerformance() {
  // Esperar a que la página cargue completamente
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    
    console.log('Métricas de Rendimiento:');
    console.log('DNS lookup:', perfData.domainLookupEnd - perfData.domainLookupStart, 'ms');
    console.log('TCP connection:', perfData.connectEnd - perfData.connectStart, 'ms');
    console.log('Time to First Byte:', perfData.responseStart - perfData.requestStart, 'ms');
    console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.navigationStart, 'ms');
    console.log('Full Page Load:', perfData.loadEventEnd - perfData.navigationStart, 'ms');

    // Enviar a Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_performance', {
        dns_time: Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
        tcp_time: Math.round(perfData.connectEnd - perfData.connectStart),
        ttfb: Math.round(perfData.responseStart - perfData.requestStart),
        dcl_time: Math.round(perfData.domContentLoadedEventEnd - perfData.navigationStart),
        load_time: Math.round(perfData.loadEventEnd - perfData.navigationStart),
      });
    }
  });
}

// Usar:
monitorPagePerformance();


// ===== EJEMPLO 10: Crear reporte completo =====

function generateFullReport() {
  console.clear();
  console.log('%c📊 REPORTE COMPLETO DE ANALYTICS', 'font-size: 20px; color: #00ffff; font-weight: bold');
  
  const sessions = JSON.parse(localStorage.getItem('userSessions') || '[]');
  
  if (sessions.length === 0) {
    console.log('No hay datos para mostrar');
    return;
  }

  console.log('\n%c=== ESTADÍSTICAS GENERALES ===', 'color: #00ff88; font-weight: bold');
  analyzeUserBehavior();

  console.log('\n%c=== PATRONES DE COMPORTAMIENTO ===', 'color: #00ff88; font-weight: bold');
  findUserPatterns();

  console.log('\n%c=== FUNNEL DE CONVERSIÓN ===', 'color: #00ff88; font-weight: bold');
  trackConversionFunnel();

  console.log('\n%c=== USUARIOS COMPROMETIDOS ===', 'color: #00ff88; font-weight: bold');
  findEngagedUsers();

  console.log('\n%c=== DATOS EXPORTABLES ===', 'color: #00ff88; font-weight: bold');
  const data = exportCustomFormat();
  
  console.log('\n✓ Reporte generado exitosamente');
  return data;
}

// Usar en consola:
generateFullReport();


// ===== NOTAS IMPORTANTES =====

/*
1. ESTOS EJEMPLOS FUNCIONAN EN LA CONSOLA DEL NAVEGADOR
   - Abre DevTools con F12
   - Ve a la pestaña "Console"
   - Copia y pega cualquier ejemplo

2. PRIVACIDAD
   - Los datos se guardan localmente
   - No contienen información sensible de usuarios
   - Cumple con GDPR si lo usas correctamente

3. LIMITACIONES
   - localStorage tiene límite de ~5-10MB
   - Los datos se guardan solo durante 10 sesiones
   - Se limpian al limpiar el cache del navegador

4. INTEGRACIÓN
   - Los datos automáticamente se envían a Meta Pixel y Google Analytics
   - Puedes ver más detalles en esos dashboards
   - Este tracking local es para análisis offline

5. PERSONALIZACÓN
   - Puedes modificar qué eventos se rastrean editando el script de tracking
   - Añade nuevos eventos personalizados según necesites
*/
