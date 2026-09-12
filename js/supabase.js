// Cargar configuración de Supabase
const SUPABASE_URL = 'https://jytwmhpqerddaimyjtws.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5dHdtaHBxZXJkZGFpbXlqdHdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkwOTYwNDcsImV4cCI6MjEwNDY3MjA0N30.3iPk7B-S_vBt5VeY4kw_vLzN2UwKxQ8bZ9pR3mQ2x5Q';

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
