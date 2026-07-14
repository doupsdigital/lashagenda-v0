// DEBUG TEMPORÁRIO — remover depois de diagnosticar o PWA no iOS.
// Captura a URL de entrada ANTES do React Router rodar qualquer redirect,
// para sabermos exatamente qual start_url o app instalado usou ao abrir.
export const ENTRY_HREF = window.location.href;
export const ENTRY_STANDALONE =
  window.matchMedia('(display-mode: standalone)').matches ||
  (window.navigator as any).standalone === true;
