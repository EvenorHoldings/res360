import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { zar } from '@/lib/listings';

type Result = { total: number; upfront: number; perPerson: number; perYear: number; rent: number; months: number; people: number };

export function RentCalculator({ initialRent }: { initialRent?: number }) {
  const [rent, setRent] = useState(initialRent ? String(initialRent) : '');
  const [months, setMonths] = useState('');
  const [deposit, setDeposit] = useState('');
  const [people, setPeople] = useState('1');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const clear = () => { setResult(null); setError(''); };

  function calculate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const r = Number(rent), m = Number(months), d = deposit.trim() === '' ? 0 : Number(deposit), p = Number(people);
    if (rent.trim() === '' || !Number.isFinite(r) || r < 0) return setError('Enter a valid monthly rent in rand.');
    if (months.trim() === '' || !Number.isSafeInteger(m) || m < 1 || m > 60) return setError('Enter a whole number of months (1–60).');
    if (!Number.isFinite(d) || d < 0) return setError('Deposit must be zero or more.');
    if (!Number.isSafeInteger(p) || p < 1 || p > 12) return setError('Flatmates must be a whole number from 1 to 12.');
    setError('');
    setResult({ total: r * m + d, upfront: r + d, perPerson: r / p, perYear: r * 12, rent: r, months: m, people: p });
  }

  const input = 'mb-3 w-full rounded-md bg-photo-foreground p-[11px] text-[15px] text-photo-ink';
  return (
    <section aria-labelledby="calcTitle" className="mx-auto w-[min(380px,100%)] rounded-[14px] border border-photo-line bg-photo-panel p-[22px] text-left backdrop-blur-[14px]">
      <h2 id="calcTitle" className="mb-3.5 text-lg">Rent Calculator</h2>
      <form onSubmit={calculate} noValidate>
        <label htmlFor="rent" className="mb-1 block text-xs opacity-75">Monthly rent (ZAR)</label>
        <input id="rent" type="number" min={0} step={50} inputMode="decimal" placeholder="e.g. 4500" value={rent} onChange={(e) => { setRent(e.target.value); clear(); }} className={input} />
        <label htmlFor="months" className="mb-1 block text-xs opacity-75">Duration (months)</label>
        <input id="months" type="number" min={1} max={60} step={1} inputMode="numeric" placeholder="e.g. 10" value={months} onChange={(e) => { setMonths(e.target.value); clear(); }} className={input} />
        <div className="grid grid-cols-2 gap-3">
          <div><label htmlFor="deposit" className="mb-1 block text-xs opacity-75">Deposit (optional)</label>
            <input id="deposit" type="number" min={0} step={50} inputMode="decimal" placeholder="e.g. 4500" value={deposit} onChange={(e) => { setDeposit(e.target.value); clear(); }} className={input} /></div>
          <div><label htmlFor="people" className="mb-1 block text-xs opacity-75">Split between</label>
            <input id="people" type="number" min={1} max={12} step={1} inputMode="numeric" value={people} onChange={(e) => { setPeople(e.target.value); clear(); }} className={input} /></div>
        </div>
        <Button type="submit" className="w-full rounded-full bg-photo-action text-photo-ink hover:bg-photo-action/90">Calculate Total Rent</Button>
        <div aria-live="polite" className="mt-3 min-h-5 text-sm">
          {error ? <p className="text-destructive-foreground">{error}</p> : result && (
            <dl className="space-y-1">
              <div className="flex justify-between font-semibold"><dt>Total</dt><dd>{zar.format(result.total)}</dd></div>
              <div className="flex justify-between"><dt>Due upfront</dt><dd>{zar.format(result.upfront)}</dd></div>
              <div className="flex justify-between"><dt>Per person / month</dt><dd>{zar.format(result.perPerson)}</dd></div>
              <div className="flex justify-between"><dt>Per year</dt><dd>{zar.format(result.perYear)}</dd></div>
              <p className="pt-1 text-xs opacity-75">{zar.format(result.rent)} × {result.months} month{result.months === 1 ? '' : 's'}{result.people > 1 ? `, split ${result.people} ways` : ''}</p>
            </dl>
          )}
        </div>
      </form>
    </section>
  );
}
