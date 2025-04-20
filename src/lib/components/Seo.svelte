<script>
  import { base } from '$app/paths';
  export let title = "Penélope Gonçalves - Tech Lead & Community Builder";
  export let description = "Tech Lead at Contentserv, Community Builder at Geek Sessions Faro, and founder of local.foundation. Exploring the intersection of technology, art, and community.";
  export let keywords = "Penélope Gonçalves, penelopeg, lepsies, Tech Lead, Community Builder, Geek Sessions Faro, local.foundation, Algarve tech, Portuguese Women in Tech";
  export let image = base + "/images/profile/penelope.jpeg";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  <!-- Additional SEO tags -->
  <meta name="author" content="Penélope Gonçalves" />
  <link rel="canonical" href="https://penelopeg.github.io" />
</svelte:head>