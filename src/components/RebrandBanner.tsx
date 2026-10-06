import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const KEY = 'res360:rebrand-banner-dismissed';
const OLD_KEY = 'residence24:rebrand-banner-dismissed';
const ENDS = Date.parse('2027-01-04'); // 90 days after the rename

export function RebrandBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      const old = localStorage.getItem(OLD_KEY);
      if (old) { localStorage.setItem(KEY, old); localStorage.removeItem(OLD_KEY); }
      setShow(!localStorage.getItem(KEY) && Date.now() < ENDS);
    } catch { setShow(Date.now() < ENDS); }
  }, []);
  if (!show) return null;
  return (
    <div role="region" aria-label="Brand update" className="relative z-40 flex items-center justify-center bg-photo-action px-12 py-2 text-center text-sm font-medium text-photo-ink">
      <span>Residence24 is now Res360. Same team, same service.</span>
      <button type="button" aria-label="Dismiss brand update" onClick={() => { try { localStorage.setItem(KEY, '1'); } catch { /* storage unavailable */ } setShow(false); }} className="absolute right-2 inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-photo-foreground/30">
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
