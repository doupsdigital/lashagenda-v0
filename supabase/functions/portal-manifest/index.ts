// Edge Function: portal-manifest
// Gera um manifest.json dinâmico para o portal de uma cliente específica.
//
// Motivo: no iOS, o app instalado via "Adicionar à Tela de Início" usa o
// start_url do manifest ativo no momento da instalação. O manifest.json
// estático do site aponta para "/" (área da profissional), então o app
// instalado pela cliente sempre abriria a área errada. Este endpoint
// devolve um manifest com start_url apontando direto para o portal da
// cliente (com o token permanente dela embutido), usado apenas enquanto
// ela está logada no portal (ver PortalLayout).
//
// IMPORTANTE: deploy com --no-verify-jwt — este manifest é buscado pelo
// navegador via <link rel="manifest">, sem cabeçalho de autenticação.
//   supabase functions deploy portal-manifest --no-verify-jwt

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve((req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const slug = url.searchParams.get('slug');
  const token = url.searchParams.get('token');
  const origin = url.searchParams.get('origin');

  if (!slug || !token || !origin) {
    return new Response('slug, token e origin são obrigatórios', { status: 400, headers: corsHeaders });
  }

  // Este manifest é servido pelo domínio da Edge Function (*.supabase.co),
  // que é uma origem diferente do site. Pela spec do Web App Manifest,
  // start_url/scope/ícones com caminho relativo (ex: "/portal/x") são
  // resolvidos contra a origem do PRÓPRIO manifest, não a do site — por
  // isso precisam ser URLs absolutas com a origem real, recebida via
  // querystring (ver PortalLayout, que monta essa URL com window.location.origin).
  const siteOrigin = origin.replace(/\/$/, '');

  const manifest = {
    name: 'Lash Agenda',
    short_name: 'Lash Agenda',
    description: 'Portal de agendamentos',
    start_url: `${siteOrigin}/portal/${slug}/app/${token}`,
    scope: `${siteOrigin}/portal/${slug}/`,
    display: 'standalone',
    orientation: 'any',
    background_color: '#FAF0F3',
    theme_color: '#D14175',
    icons: [
      { src: `${siteOrigin}/icon-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: `${siteOrigin}/icon-192.png`, sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: `${siteOrigin}/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: `${siteOrigin}/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };

  return new Response(JSON.stringify(manifest), {
    headers: { ...corsHeaders, 'Content-Type': 'application/manifest+json' },
  });
});
