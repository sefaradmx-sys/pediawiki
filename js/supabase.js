// Carga la librería oficial de Supabase directamente desde internet
const script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
document.head.appendChild(script);

let supabaseClient = null;

script.onload = () => {
  const SUPABASE_URL = 'https://jytwmhpqerddaimyjtws.supabase.co';
  // Llave pública segura para usar en el navegador
  const SUPABASE_ANON_KEY = 'sb_publishable_55pRwrj_H7BbU9TYXbhQfQ_YF3l0I9I'; 
  
  // Inicializamos el cliente de Supabase
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log("¡Conectado a Supabase con éxito!");
};
