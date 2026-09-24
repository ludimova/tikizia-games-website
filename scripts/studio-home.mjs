// Tikizia Games is the studio. Its original dark/orange identity is deliberately
// independent from the cream/red Conoche microsite and its exported app content.
// Layout/classes come from the pre-refresh homepage at f1c6f18.
export function studioHome(lang) {
  const t = (es, en) => lang === 'es' ? es : en;
  const base = lang === 'en' ? '/en/' : '/';
  const app = `${base}conoche/`;
  const title = t('Tikizia Games | Juegos para conectar', 'Tikizia Games | Playful Games Built for Connection');
  const description = t(
    'Tikizia Games es un estudio costarricense de juegos sociales para parejas, amistades y grupos. Conocé Conoche, Vinazo y lo que viene.',
    'Tikizia Games is a Costa Rican game studio creating playful social games for couples, friends, parties, and real connection.'
  );
  const studioFaqs = [
    [t('¿Qué es Tikizia Games?', 'What is Tikizia Games?'), t('Un estudio independiente de Costa Rica. Creamos juegos sociales para parejas, amistades y grupos. Conoche y Vinazo forman parte de nuestra familia de juegos.', 'An independent Costa Rican game studio creating playful social experiences for couples, friends and groups. Conoche and Vinazo are part of our family of games.')],
    [t('¿Dónde están?', 'Where is Tikizia Games based?'), t('Tikizia Games nació y está en Costa Rica.', 'Tikizia Games is based in Costa Rica.')],
    [t('¿En cuáles juegos están trabajando?', 'What games are you working on?'), t('Conoche, para conectar con preguntas, juegos y momentos compartidos; Vinazo, alrededor de historias, recuerdos y amistades; y más ideas en camino.', 'Conoche, for questions, games and shared moments; Vinazo, around stories, memories and friends; and more ideas on the way.')],
    [t('¿Dónde encuentro ayuda con Conoche?', 'Where can I find help with Conoche?'), t(`Entrá a <a href="${app}">Conoche</a>. Ahí están su presentación, preguntas frecuentes, soporte, políticas y acceso para testers.`, `Visit <a href="${app}">Conoche</a> for its introduction, FAQs, support, policies and tester access.`)],
    [t('¿Cómo contacto a soporte?', 'How do I contact support?'), t('Escribí a <a href="mailto:support@tikiziagames.com">support@tikiziagames.com</a> e indicá el juego y qué pasó. No enviés tu contraseña ni enlaces de acceso.', 'Email <a href="mailto:support@tikiziagames.com">support@tikiziagames.com</a> with the game name and what happened. Do not send passwords or sign-in links.')],
    [t('¿Vienen más juegos?', 'Are more games coming?'), t('Sí. Conoche y Vinazo son solo el comienzo.', 'Absolutely. Conoche and Vinazo are just the beginning.')],
  ];
  const lineIcon = paths => `<svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${description}"><meta name="theme-color" content="#050505">
<title>${title}</title>
<link rel="canonical" href="https://tikiziagames.com${base}">
<link rel="alternate" hreflang="es" href="https://tikiziagames.com/"><link rel="alternate" hreflang="en" href="https://tikiziagames.com/en/"><link rel="alternate" hreflang="x-default" href="https://tikiziagames.com/">
<meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><meta property="og:url" content="https://tikiziagames.com${base}"><meta property="og:image" content="https://tikiziagames.com/assets/images/tikizia-studio.svg"><meta property="og:image:alt" content="Tikizia Games · Costa Rica"><meta property="og:locale" content="${lang === 'es' ? 'es_CR' : 'en_US'}">
<link rel="icon" href="/assets/images/studio-favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/PermanentMarker-Regular.ttf" as="font" type="font/ttf" crossorigin>
<link rel="stylesheet" href="/assets/css/styles.css?v=2026-09-24-studio">
<link rel="stylesheet" href="/assets/css/studio.css?v=2026-09-24-studio">
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:'Tikizia Games',url:'https://tikiziagames.com',email:'hello@tikiziagames.com',logo:'https://tikiziagames.com/assets/images/tikizia-studio.svg'})}</script>
</head>
<body class="studio-home">
<!--email_off-->
<a class="skip-link" href="#main">${t('Saltar al contenido','Skip to content')}</a>
<header class="site-header">
  <div class="container nav">
    <a href="${base}" class="nav-logo">Tikizia Games</a>
    <nav class="nav-menu" aria-label="${t('Principal','Main')}">
      <a href="#games">${t('Juegos','Games')}</a><a href="#about">${t('El estudio','About')}</a><a href="#support">${t('Soporte','Support')}</a><a href="#faq">FAQ</a><a href="#contact">${t('Contacto','Contact')}</a>
      <a class="studio-language" href="${lang === 'es' ? '/en/' : '/'}" aria-label="${t('Read in English','Leer en español')}" lang="${lang === 'es' ? 'en' : 'es'}">${t('EN','ES')}</a>
    </nav>
  </div>
  <div class="cr-stripe" aria-hidden="true"><div class="cr-blue"></div><div class="cr-white"></div><div class="cr-red"></div><div class="cr-white"></div><div class="cr-blue"></div></div>
</header>
<main id="main" tabindex="-1">
  <section class="hero">
    <div class="cr-watermark" aria-hidden="true">COSTA RICA</div>
    <div class="container hero-grid">
      <div class="hero-brand"><p class="country-label">${t('HECHO EN COSTA RICA','MADE IN COSTA RICA')} 🇨🇷</p><h1 class="hero-title">TIKIZIA <span>GAMES</span></h1></div>
      <div class="hero-copy-block">
        <p class="hero-kicker">${t('JUEGOS SOCIALES CON SABOR','PLAYFUL SOCIAL GAMES')}</p>
        <h2 class="hero-tagline">${t('Juegos hechos para conectar.','Playful games built for connection.')}</h2>
        <p class="hero-description">${t('Tikizia Games es un estudio de Costa Rica. Creamos juegos divertidos, con estilo y alrededor de momentos humanos de verdad.','Tikizia Games is a Costa Rican studio creating fun, stylish and social games built around real human moments.')}</p>
        <p class="hero-description">${t('Experiencias que despiertan risas, historias, curiosidad, química, nostalgia y recuerdos que vale la pena contar.','We create experiences that spark laughs, stories, curiosity, chemistry, nostalgia and memories worth talking about.')}</p>
        <div class="despiche-line"><span>${t('Juegos para parejas, amistades, fiestas…','Games for couples, friends, parties…')}</span><strong>${t('y uno que otro despiche.','and one que otro despiche.')}</strong></div>
        <div class="hero-actions"><a href="#games" class="button button-primary">${t('Ver nuestros juegos','See Our Games')}</a><a href="#about" class="button button-secondary">${t('Conocé Tikizia','About Tikizia')}</a></div>
      </div>
    </div>
  </section>
  <section class="section games-section" id="games">
    <div class="container">
      <div class="section-intro"><p class="section-kicker">${t('NUESTROS JUEGOS','OUR GAMES')}</p><h2>${t('Tres espacios.','Three spots.')} <span>${t('Un estudio que crece.','One growing studio.')}</span></h2><p>${t('Así empieza la familia Tikizia: Conoche para conectar, Vinazo para compartir historias y otra idea esperando su turno.','Here’s the beginning of the Tikizia lineup: Conoche for connection, Vinazo for shared stories, and another idea already waiting for its turn.')}</p></div>
      <div class="games-row">
        <article class="game-showcase-card">
          <a class="game-showcase-link" href="${app}" aria-labelledby="conoche-title conoche-cta">
            <img src="/assets/images/conoche-sloths.png" alt="${t('Los perezosos de Conoche abrazados en una rama','The Conoche sloths cuddling on a branch')}" class="game-showcase-image conoche-cover" width="1280" height="1280" loading="lazy">
            <div class="game-showcase-body"><p class="game-showcase-category">${t('PAREJAS · AMISTADES','COUPLES · FRIENDS')}</p><h3 id="conoche-title">Conoche?</h3><p class="game-showcase-hook">${t('Conectar también se juega.','Connection can be playful.')}</p><p class="game-showcase-description">${t('Preguntas, juegos y momentos para divertirse y fortalecer tus conexiones.','Questions, games and moments to have fun and strengthen your connections.')}</p><span class="game-cta" id="conoche-cta">${t('Conocé Conoche','Explore Conoche')} <span aria-hidden="true">→</span></span></div>
          </a>
        </article>
        <article class="game-showcase-card">
          <img src="/assets/images/vinazo-cover.svg" alt="${t('Portada de Vinazo','Vinazo game cover')}" class="game-showcase-image" width="800" height="520" loading="lazy">
          <div class="game-showcase-body"><p class="game-showcase-category">${t('AMISTADES · SOCIAL','FRIENDS · SOCIAL')}</p><h3>Vinazo</h3><p class="game-showcase-hook">Todos tenemos uno.</p><p class="game-showcase-description">${t('Un juego social con recuerdos, bromas internas, nostalgia y esas historias que el grupo nunca deja de contar.','A social game powered by memories, inside jokes, nostalgia, confessions and those stories your group will keep repeating forever.')}</p><span class="game-status">${t('En desarrollo','In development')}</span></div>
        </article>
        <article class="game-showcase-card">
          <img src="/assets/images/under-construction-cover.svg" alt="${t('El próximo juego, en construcción','The next game, under construction')}" class="game-showcase-image" width="800" height="520" loading="lazy">
          <div class="game-showcase-body"><p class="game-showcase-category">${t('LO QUE VIENE','COMING SOON')}</p><h3>${t('En construcción','Under Construction')}</h3><p class="game-showcase-hook">${t('Algo nuevo se está cocinando.','Something new is cooking.')}</p><p class="game-showcase-description">${t('Tikizia apenas empieza. Este espacio es para la próxima idea que se sume a la familia.','Tikizia is just getting started. This third slot is reserved for the next playful idea joining the studio lineup.')}</p></div>
        </article>
      </div>
    </div>
  </section>
  <section class="section about-section" id="about"><div class="container about-grid">
    <div class="about-heading"><p class="section-kicker">${t('SOBRE TIKIZIA','ABOUT TIKIZIA')}</p><h2>${t('Alma costarricense.','Costa Rican soul.')} <span>${t('Juegos con sabor.','Games with sabor.')}</span></h2></div>
    <div class="about-content"><p class="about-lead">${t('Tikizia Games es un estudio de juegos móviles que nació en Costa Rica y sigue creciendo.','Tikizia Games is a growing mobile game studio born in Costa Rica.')}</p><p>${t('Creamos juegos alrededor de momentos reales: amor, amistades, fiestas, preguntas, recuerdos y risas.','We create games centered around real human moments: love, friendships, parties, questions, memories and laughs.')}</p><p>${t('Queremos que sean fáciles de jugar, bonitos de usar y memorables para compartir.','We want our games to feel easy to play, beautiful to use and memorable to share.')}</p><p>${t('La meta es sencilla: juegos que den ganas de abrir, volver a jugar y comentar.','Our goal is simple: make games people actually want to open, replay and talk about.')}</p></div>
  </div></section>
  <section class="section support-section" id="support"><div class="container">
    <div class="section-intro"><p class="section-kicker">${t('AYUDA PARA JUGADORES','PLAYER SUPPORT')}</p><h2>${t('¿Necesitás ayuda?','Need help?')} <span>${t('Aquí estamos.','We got you.')}</span></h2><p>${t('¿Dudas con uno de nuestros juegos, tu cuenta o algo que no está funcionando? Contanos cuál juego y qué pasó.','Questions about one of our games, your account, purchases or something that isn’t working the way it should? Tell us the game and what happened.')}</p></div>
    <div class="support-grid">
      <div class="support-card"><div class="support-icon">${lineIcon('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>')}</div><h3>${t('Soporte por correo','Email Support')}</h3><p>${t('Ayuda con los juegos de Tikizia. Incluí el nombre del juego para que podamos orientarte.','Help with Tikizia games. Include the game name so we can point you in the right direction.')}</p><a href="mailto:support@tikiziagames.com" class="support-link">support@tikiziagames.com</a></div>
      <div class="support-card"><div class="support-icon">${lineIcon('<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 1 1 5 2c-1 1-2 1-2 3m0 3h.01"/>')}</div><h3>${t('Ayuda por juego','Help by game')}</h3><p>${t('Cada juego tiene su espacio. Las instrucciones, FAQs y políticas de Conoche están dentro de Conoche.','Each game has its own space. Conoche instructions, FAQs and policies live inside Conoche.')}</p><a href="${app}" class="support-link">${t('Entrar a Conoche','Visit Conoche')} →</a></div>
      <div class="support-card" id="delete-account"><div class="support-icon">${lineIcon('<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6m4-6v6"/>')}</div><h3>${t('Cuenta y datos','Account and Data')}</h3><p>${t('Consultá cómo eliminar tu cuenta de Conoche, incluso si ya no tenés la app instalada. Para otro juego, escribí a soporte.','Learn how to delete your Conoche account, even if the app is no longer installed. For another game, contact support.')}</p><a href="${base}delete-account/" class="support-link">${t('Eliminar cuenta de Conoche','Delete a Conoche account')} →</a></div>
    </div>
  </div></section>
  <section class="section faq-section" id="faq"><div class="container faq-container">
    <div class="section-intro"><p class="section-kicker">FAQ · TIKIZIA GAMES</p><h2>${t('¿Preguntas?','Questions?')} <span>${t('De fijo.','Probably.')}</span></h2></div>
    <div class="faq-list">${studioFaqs.map(([q,a])=>`<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
  </div></section>
  <section class="section contact-section" id="contact"><div class="container contact-box">
    <p class="section-kicker">${t('CONTACTO','CONTACT US')}</p><h2>${t('Decí hola.','Say hola.')}</h2><p>${t('Consultas generales, alianzas, prensa, proveedores o propuestas para el estudio.','General questions, partnerships, press or business inquiries.')}</p><a href="mailto:hello@tikiziagames.com" class="contact-email">hello@tikiziagames.com</a><p class="support-secondary">${t('Soporte para jugadores:','Player support:')} <a href="mailto:support@tikiziagames.com">support@tikiziagames.com</a></p>
  </div></section>
</main>
<footer class="site-footer" id="footer-links"><div class="container footer-content">
  <div class="footer-brand"><div class="footer-logo">TIKIZIA GAMES</div><p>${t('Juegos hechos para conectar.','Playful games built for connection.')}</p><p class="operator-text">${t('Tikizia Games es una marca operada por Luis Diego Mora, Costa Rica.','Tikizia Games is a brand operated by Luis Diego Mora, Costa Rica.')}</p></div>
  <div class="footer-links"><a href="#games">${t('Juegos','Games')}</a><a href="#about">${t('El estudio','About')}</a><a href="#support">${t('Soporte','Support')}</a><a href="#faq">FAQ</a><a href="#contact">${t('Contacto','Contact')}</a><a href="${app}">Conoche?</a><span class="footer-app-label">${t('Conoche · Ayuda y políticas','Conoche · Help and policies')}</span>${[['faq','Preguntas frecuentes','FAQ'],['privacy','Privacidad','Privacy'],['terms','Términos','Terms'],['community-guidelines','Normas de la comunidad','Community guidelines'],['child-safety','Seguridad infantil','Child safety'],['delete-account','Eliminar cuenta','Delete account']].map(([id,es,en])=>`<a href="${base}${id}/">${t(es,en)}</a>`).join('')}</div>
</div><div class="container footer-bottom"><span>© 2026 Tikizia Games</span><span class="yodito-line">${t('Hecho en Costa Rica con','Made in Costa Rica with')} <strong>yodito y huevos.</strong> 🇨🇷</span></div></footer>
<!--/email_off-->
</body></html>\n`;
}
