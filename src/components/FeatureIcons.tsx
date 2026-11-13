import type { SVGProps } from 'react';
const base = { width: '1em', height: '1em', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, className: 'inline-block align-[-0.125em]' };
export function PrideIcon(p: SVGProps<SVGSVGElement>) { return <svg {...base} {...p}><path d="M4 22V4"/><path d="M4 4h15l-3 4 3 4H4"/><path d="M4 6.7h14M4 9.3h14" strokeWidth={1.2}/></svg>; }
export function PawIcon(p: SVGProps<SVGSVGElement>) { return <svg {...base} {...p}><circle cx="6" cy="10" r="2"/><circle cx="10" cy="6" r="2"/><circle cx="14" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><path d="M8 17c0-3 2-5 4-5s4 2 4 5c0 2-2 3-4 3s-4-1-4-3z"/></svg>; }
export function AccessIcon(p: SVGProps<SVGSVGElement>) { return <svg {...base} {...p}><circle cx="12" cy="4" r="2"/><path d="M12 7v6h5l2 6"/><path d="M8 10a6 6 0 1 0 7.5 8"/></svg>; }
