// Carga la librería oficial de Supabase para la web
const script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
document.head.appendChild(script);

let supabaseClient = null;

script.onload = () => {
  const SUPABASE_URL = 'https://jytwmhpqerddaimyjtws.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_55pRwrj_H7BbU9TYXbhQfQ_YF3l0I9I'; 
  
  // Inicializa la conexión con Supabase
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log("¡Conectado a Supabase correctamente!");
};
