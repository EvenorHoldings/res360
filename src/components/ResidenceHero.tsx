import { useEffect, useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import capeTown from '@/assets/cape-town-aerial.jpg';
import johannesburg from '@/assets/johannesburg-skyline.jpg';

export function ResidenceHero({ children }: { children: ReactNode }) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReduced(media.matches); if (media.matches) setSlide(0); };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (paused || reduced) return;
    const timer = window.setInterval(() => setSlide(s => (s + 1) % 2), 6000);
    return () => window.clearInterval(timer);
  }, [paused, reduced]);
  return <section className="res-hero relative isolate overflow-hidden bg-brand-navy text-photo-foreground">
    <div className="absolute inset-0 -z-20" aria-hidden="true">
      {[{ src: capeTown, width: 1600, height: 1067 }, { src: johannesburg, width: 1600, height: 1008 }].map((image, index) => <img key={image.src} {...image} alt="" loading={index === 0 ? 'eager' : 'lazy'} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${slide === index ? 'opacity-100' : 'opacity-0'}`} />)}
    </div>
    <div className="absolute inset-0 -z-10 bg-hero-overlay" aria-hidden="true" />
    <div className="mx-auto w-full max-w-5xl px-5 pb-10 pt-7 sm:px-8 sm:pb-14 sm:pt-12">{children}</div>
    <div className="absolute bottom-4 right-5 flex items-center gap-3 text-xs text-photo-foreground sm:right-8"><span className="h-px w-8 bg-brand-gold" /><span>{slide === 0 ? 'Western Cape' : 'Gauteng'}</span><Button size="icon" variant="ghost" aria-label={paused ? 'Play background' : 'Pause background'} title={paused ? 'Play background' : 'Pause background'} onClick={() => setPaused(!paused)} className="text-photo-foreground hover:bg-photo-glass hover:text-photo-foreground">{paused ? <Play /> : <Pause />}</Button></div>
  </section>;
}