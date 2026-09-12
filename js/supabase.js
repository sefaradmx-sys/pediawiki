// Cargar configuración de Supabase desde variables de entorno
const SUPABASE_URL = 'https://jytwmhpqerddaimyjtws.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5dHdtaHBxZXJkZGFpbXlqdHdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkwOTYwNDcsImV4cCI6MjEwNDY3MjA0N30.3iPk7B-S_vBt5VeY4kw_vLzN2UwKxQ8bZ9pR3mQ2x5Q';

// Crear cliente de Supabase usando la librería de Supabase
// Asegúrate de que supabase.js esté incluido en tu HTML
if (typeof window.supabase !== 'undefined') {
  window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('✓ Cliente Supabase inicializado correctamente');
} else {
  console.error('✗ Error: librería de Supabase no está cargada. Asegúrate de incluir <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>');
}

const supabase = window.supabaseClient;