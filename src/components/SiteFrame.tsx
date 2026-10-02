import { Link } from '@tanstack/react-router';
import { useEffect, useState, type ReactNode } from 'react';
import capeTown from '@/assets/cape-town-aerial.jpg';
import johannesburg from '@/assets/johannesburg-skyline.jpg';

export function SiteFrame({ children }: { children: ReactNode }) {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    const id = window.setInterval(() => setSlide(s => (s + 1) % 2), 6000);
    return () => window.clearInterval(id);
  }, []);
  return <div className="relative isolate flex min-h-screen flex-col bg-photo-ink text-photo-foreground">
    <div className="fixed inset-0 -z-20 bg-gradient-to-b from-photo-ink to-photo-action" aria-hidden="true">
      {[{ src: capeTown, alt: 'Cape Town aerial with DHL Stadium and Table Mountain', width: 1600, height: 1067 }, { src: johannesburg, alt: 'Johannesburg skyline in Gauteng', width: 1600, height: 1008 }].map((image, index) =>
        <img key={image.src} src={image.src} alt="" width={image.width} height={image.height} loading={index === 0 ? 'eager' : 'lazy'} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${slide === index ? 'opacity-100' : 'opacity-0'}`} />)}
    </div>
    <div className="fixed inset-0 -z-10 bg-photo-scrim" aria-hidden="true" />
    <nav className="flex flex-wrap items-center justify-between gap-3 border-b border-photo-line bg-photo-glass px-[5vw] py-4 backdrop-blur-[14px]">
      <Link to="/" className="text-2xl font-bold">Residence24</Link>
      <div className="flex gap-5">{[['Home','/'],['About','/about'],['Help','/help'],['Login','/login']].map(([label,to]) => <Link key={to} to={to as '/' | '/about' | '/help' | '/login'} className="font-light text-photo-foreground/90 hover:text-photo-foreground hover:underline">{label}</Link>)}</div>
    </nav>
    {children}
    <div aria-live="off" className="fixed bottom-12 right-4 rounded bg-photo-panel px-3 py-1 text-xs text-photo-foreground backdrop-blur-sm">{slide === 0 ? 'Western Cape' : 'Gauteng'}</div>
    <footer className="p-3.5 text-center text-xs text-photo-foreground/70">© 2026 Residence24 South Africa · <Link to="/privacy" className="underline">Privacy</Link> · <Link to="/terms" className="underline">Terms</Link></footer>
  </div>;
}

export function PageBody({ title, children }: { title: string; children: ReactNode }) {
  return <SiteFrame><main className="mx-auto w-[min(860px,92%)] flex-1 pt-[6vh] pb-10"><h1 className="mb-6 text-4xl font-bold">{title}</h1><div className="max-w-2xl space-y-4 leading-relaxed">{children}</div></main></SiteFrame>;
}
