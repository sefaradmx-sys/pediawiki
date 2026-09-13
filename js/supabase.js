/* Memoria Sefardí — cliente Supabase (clave anónima pública). */
(function () {
  const SUPABASE_URL = "https://jytwmhpqerddaimyjtws.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5dHdtaHBxZXJkZGFpbXlqdHdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkwOTYwNDcsImV4cCI6MjEwNDY3MjA0N30.3iPk7B-S_Rdj1h9YEwSVA3PoGwKrGRTETtuP4seUWwo";

  function lib() {
    if (typeof supabase !== "undefined" && supabase.createClient) return supabase;
    if (window.supabase && window.supabase.createClient) return window.supabase;
    return null;
  }

  window.msReady = new Promise(function (resolve) {
    var tries = 0;
    function boot() {
      var s = lib();
      if (s) {
        try {
          window.supabaseClient = s.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
          console.log("Memoria Sefardí: base de datos conectada");
          resolve(window.supabaseClient);
          return;
        } catch (err) {
          console.error("No se pudo crear el cliente Supabase:", err);
          resolve(null);
          return;
        }
      }
      tries += 1;
      if (tries > 50) {
        console.error("Librería de Supabase no cargó");
        resolve(null);
        return;
      }
      setTimeout(boot, 80);
    }
    boot();
  });
})();
