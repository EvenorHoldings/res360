export function pageHead(title: string, description: string, path: string) {
  const url = `https://res360.org${path}`;
  const image = 'https://res360.org/og-image.png';
  return { meta: [
    { title }, { name: 'description', content: description },
    { property: 'og:title', content: title }, { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' }, { property: 'og:url', content: url },
    { property: 'og:image', content: image }, { property: 'og:image:width', content: '1200' }, { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' }, { name: 'twitter:image', content: image },
    { name: 'twitter:title', content: title }, { name: 'twitter:description', content: description },
  ], links: [{ rel: 'canonical', href: url }] };
}
