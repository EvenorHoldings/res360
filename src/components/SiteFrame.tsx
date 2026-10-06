import { Link, useRouterState } from '@tanstack/react-router';
import { useEffect, useState, type ReactNode } from 'react';
import { Menu, Pause, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RebrandBanner } from '@/components/RebrandBanner';
import capeTown from '@/assets/cape-town-aerial.jpg';
import johannesburg from '@/assets/johannesburg-skyline.jpg';

const nav = [{label:'Home',to:'/'},{label:'Find a room',to:'/search'}, {label:'List your space',to:'/list'}, {label:'Pricing',to:'/pricing'}, {label:'Pitch',to:'/pitch'}, {label:'Help',to:'/help'}] as const;
export function SiteFrame({ children }: { children: ReactNode }) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [menu, setMenu] = useState(false);
  const path = useRouterState({select: s => s.location.pathname});
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReduced(media.matches); if(media.matches) setSlide(0); };
    update(); media.addEventListener('change',update); return () => media.removeEventListener('change',update);
  }, []);
  useEffect(() => { if(paused || reduced) return; const id = window.setInterval(() => setSlide(s => (s + 1) % 2),6000); return () => window.clearInterval(id); }, [paused,reduced]);
  return <div className="relative isolate flex min-h-screen flex-col bg-photo-ink font-sans text-photo-foreground">
    <RebrandBanner />
    <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:p-3 focus:text-foreground">Skip to content</a>
    <div className="fixed inset-0 -z-20 bg-gradient-to-b from-photo-ink to-photo-action" aria-hidden="true">
      {[{src:capeTown,width:1600,height:1067},{src:johannesburg,width:1600,height:1008}].map((image,index) => <img key={image.src} src={image.src} alt="" width={image.width} height={image.height} loading={index===0?'eager':'lazy'} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${slide===index?'opacity-100':'opacity-0'}`} />)}
    </div><div className="fixed inset-0 -z-10 bg-photo-scrim" aria-hidden="true" />
    <header className="sticky top-0 z-30 border-b border-photo-line bg-photo-panel/90 backdrop-blur-[14px]"><nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Main navigation"><Link to="/" className="text-2xl font-bold focus-visible:ring-2 focus-visible:ring-ring">Res360</Link><div className="hidden items-center gap-5 lg:flex">{nav.map(item=><Link key={item.to} to={item.to} className={`text-sm hover:underline ${path===item.to?'font-bold underline':''}`}>{item.label}</Link>)}<Link to="/login" className="text-sm hover:underline">Login</Link><Button asChild className="rounded-full bg-photo-action text-photo-ink hover:bg-photo-action/90"><Link to="/signup">Sign up</Link></Button></div><Button variant="ghost" size="icon" aria-label={menu?'Close menu':'Open menu'} className="lg:hidden text-photo-foreground" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</Button></nav>{menu && <div className="border-t border-photo-line bg-photo-panel p-4 lg:hidden"><div className="mx-auto flex max-w-7xl flex-col gap-1">{[...nav,{label:'Login',to:'/login' as const},{label:'Sign up',to:'/signup' as const}].map(item=><Link key={item.to} to={item.to} onClick={()=>setMenu(false)} className="min-h-11 px-3 py-3 text-sm hover:bg-photo-glass">{item.label}</Link>)}</div></div>}</header>
    {children}
    <div className="fixed bottom-4 right-4 z-20 flex items-center gap-2 rounded-md bg-photo-panel px-2 py-1 text-xs backdrop-blur-sm"><span>{slide===0?'Western Cape':'Gauteng'}</span><Button size="icon" variant="ghost" className="h-9 w-9 text-photo-foreground" title={paused?'Play background':'Pause background'} aria-label={paused?'Play background':'Pause background'} onClick={()=>setPaused(!paused)}>{paused?<Play/>:<Pause/>}</Button></div>
    <footer className="border-t border-photo-line bg-photo-panel px-4 py-10 text-sm"><div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4"><div><Link to="/" className="font-bold">Res360</Link><p className="mt-2 max-w-[30ch] text-photo-foreground/80">Every student. Every campus. Every home.</p><p className="mt-1 text-xs text-photo-foreground/70">Res360 (formerly Residence24)</p></div><div><h2 className="font-semibold">Students</h2><div className="mt-2 flex flex-col gap-2"><Link to="/search">Find a Room</Link><Link to="/">Rent Calculator</Link><Link to="/help">Help</Link><Link to="/saved">Saved</Link></div></div><div><h2 className="font-semibold">Landlords</h2><div className="mt-2 flex flex-col gap-2"><Link to="/list">List Your Space</Link><Link to="/how-it-works">How it works</Link><Link to="/pricing">Pricing</Link></div></div><div><h2 className="font-semibold">Company</h2><div className="mt-2 flex flex-col gap-2"><Link to="/about">About</Link><Link to="/pitch">Investors</Link><Link to="/contact">Contact</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></div></div><div className="mx-auto mt-8 max-w-7xl border-t border-photo-line pt-4 text-xs text-photo-foreground/80">POPIA-conscious handling of your information · © 2026 Res360 South Africa</div></footer>
  </div>;
}
export function PageBody({ title, children }: { title: string; children: ReactNode }) { return <SiteFrame><main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-4 py-16 sm:px-6 lg:px-8"><h1 className="mb-6 text-4xl font-bold">{title}</h1><div className="max-w-[65ch] space-y-4 leading-relaxed">{children}</div></main></SiteFrame>; }
