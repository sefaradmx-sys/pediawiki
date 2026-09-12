// js/supabase.js
// Carga el script oficial de Supabase desde CDN si no está cargado
if (typeof supabase === 'undefined') {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  script.async = false;
  document.head.appendChild(script);
}

// Configuración con tus credenciales reales de Supabase
const SUPABASE_URL = 'https://jytwmhpqerddaimyjtws.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5dHdtaHBxZXJkZGFpbXlqdHdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkwOTYwNDcsImV4cCI6MjEwNDY3MjA0N30.3iPk7B-S_Rdj1h9YEwSVA3PoGwKrGRTETtuP4seUWwo';

let _supabaseClient = null;

function inicializarSupabase() {
  if (!_supabaseClient && typeof supabase !== 'undefined' && supabase.createClient) {
    try {
      _supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (e) {
      console.warn("No se pudo inicializar el cliente de Supabase:", e);
    }
  }
  return _supabaseClient;
}

// Inicialización automática diferida
setTimeout(inicializarSupabase, 100);
