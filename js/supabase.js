// Cargar configuración de Supabase
const SUPABASE_URL = 'https://jytwmhpqerddaimyjtws.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_55pRwrj_H7BbU9TYXbhQfQ_YF3l0I9I';

// Esperar a que la librería de Supabase esté lista
function inicializarSupabase() {
  // Acceder a la librería correctamente
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    try {
      window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('✓ Cliente Supabase inicializado correctamente');
      console.log('URL:', SUPABASE_URL);
      return true;
    } catch (error) {
      console.error('Error al inicializar Supabase:', error);
      return false;
    }
  } else {
    console.error('✗ Librería de Supabase no está cargada');
    return false;
  }
}

// Intentar inicializar cuando el documento está listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarSupabase);
} else {
  // Si el documento ya está listo, inicializar inmediatamente
  setTimeout(inicializarSupabase, 100);
}

// También intentar después de un tiempo adicional por si acaso
setTimeout(() => {
  if (!window.supabaseClient) {
    console.warn('Reintentando inicialización de Supabase...');
    inicializarSupabase();
  }
}, 500);
