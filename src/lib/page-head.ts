export function pageHead(title: string, description: string, path: string) {
  const url = `https://residence24.lovable.app${path}`;
  return { meta: [
    { title }, { name: 'description', content: description },
    { property: 'og:title', content: title }, { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' }, { property: 'og:url', content: url },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title }, { name: 'twitter:description', content: description },
    { property: 'og:image', content: 'https://residence24.lovable.app/og-image.jpg' },
    { name: 'twitter:image', content: 'https://residence24.lovable.app/og-image.jpg' },
  ], links: [{ rel: 'canonical', href: url }] };
}
