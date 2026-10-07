<script>
  import { base } from '$app/paths';
  import { page } from '$app/stores';

  const siteURL = 'https://penelopebuilds.me';

  export let title = 'Penélope Gonçalves (lepsies) · Building spaces & communities that co-create the future';
  export let description =
    'Penélope Gonçalves (lepsies): community builder, founder of local.foundation, tech lead and writer in the Algarve. Hackathons, creative tech, interactive installations and stories.';
  export let keywords =
    'Penélope Gonçalves, penelopeg, lepsies, penelopebuilds, Community Builder, Tech Lead, local.foundation, Geek Sessions Faro, Impact Hackers, Algarve tech, Portuguese Women in Tech';
  export let image = siteURL + '/images/profile/penelope.jpeg';

  // Route ids are base-independent; every route is static, with trailing slashes
  $: canonical = siteURL + ($page.route.id ?? '/').replace(/\/?$/, '/');

  const personLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Penélope Gonçalves',
    alternateName: ['lepsies', 'penelopeg'],
    url: siteURL,
    image: siteURL + '/images/profile/penelope.jpeg',
    jobTitle: 'Community Builder, Founder & Tech Lead',
    address: { '@type': 'PostalAddress', addressRegion: 'Algarve', addressCountry: 'PT' },
    sameAs: ['https://linkedin.com/in/penelopeg', 'https://lepsies.substack.com', 'https://instagram.com/lepsies_art']
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="theme-color" content="#f3ebdd" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  <meta name="author" content="Penélope Gonçalves" />
  <link rel="canonical" href={canonical} />

  <!-- RSS Feed -->
  <link rel="alternate" type="application/rss+xml" title="Penélope Gonçalves - Blog" href="{base}/feed" />

  {@html `<script type="application/ld+json">${personLd}</script>`}
</svelte:head>
