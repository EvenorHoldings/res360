import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import capeTownAerial from "@/assets/cape-town-aerial.jpg";
import { INSTITUTIONS, OTHER_COLLEGE } from "@/data/institutions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Residence24 | Student Accommodation in South Africa" },
      {
        name: "description",
        content:
          "Find safe, affordable, inclusive student accommodation across all nine South African provinces.",
      },
      {
        property: "og:title",
        content: "Residence24 | Student Accommodation in South Africa",
      },
      {
        property: "og:description",
        content:
          "LGBTQ+ friendly, pet friendly and accessible student housing near every university.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const DATA: Record<string, string[]> = {
  "Eastern Cape": [
    "Nelson Mandela University",
    "Rhodes University",
    "University of Fort Hare",
    "Walter Sisulu University",
  ],
  "Free State": [
    "Central University of Technology",
    "University of the Free State",
  ],
  Gauteng: [
    "Sefako Makgatho Health Sciences University",
    "Tshwane University of Technology",
    "University of Johannesburg",
    "University of Pretoria",
    "University of South Africa (Unisa)",
    "University of the Witwatersrand",
    "Vaal University of Technology",
  ],
  "KwaZulu-Natal": [
    "Durban University of Technology",
    "Mangosuthu University of Technology",
    "University of KwaZulu-Natal",
    "University of Zululand",
  ],
  Limpopo: ["University of Limpopo", "University of Venda"],
  Mpumalanga: ["University of Mpumalanga"],
  "Northern Cape": ["Sol Plaatje University"],
  "North West": ["North-West University"],
  "Western Cape": [
    "Cape Peninsula University of Technology",
    "Stellenbosch University",
    "University of Cape Town",
    "University of the Western Cape",
  ],
};
const OTHER = "Other accredited college (TVET / private)";

const zar = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
});

function Index() {
  const [mode, setMode] = useState<"find" | "list">("find");
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("");
  const [university, setUniversity] = useState("");
  const [summary, setSummary] = useState("");
  const [rent, setRent] = useState("");
  const [months, setMonths] = useState("");
  const [calculation, setCalculation] = useState<{ total: number; rent: number; months: number } | null>(null);
  const [calculationError, setCalculationError] = useState("");

  const universities = useMemo(
    () => (province ? (DATA[province] ?? []) : Object.values(DATA).flat()),
    [province],
  );

  const calculateRent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rentNum = Number(rent);
    const monthsNum = Number(months);
    if (rent.trim() === "" || months.trim() === "" || !Number.isFinite(rentNum) || rentNum < 0 || !Number.isSafeInteger(monthsNum) || monthsNum < 1) {
      setCalculation(null);
      setCalculationError("Enter a valid monthly rent and a whole number of months (at least 1).");
      return;
    }
    setCalculation({ total: rentNum * monthsNum, rent: rentNum, months: monthsNum });
    setCalculationError("");
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = [mode === "find" ? "Find a Room" : "List Your Space"];
    if (query.trim()) parts.push(query.trim());
    if (province) parts.push(province);
    if (university) parts.push(university);
    setSummary(parts.join("  ·  "));
  };

  return (
    <div className="relative isolate flex min-h-screen flex-col bg-background font-sans text-photo-foreground">
      <img src={capeTownAerial} alt="Aerial view of Cape Town Stadium and Table Mountain" width={1920} height={1280} className="fixed inset-0 -z-20 h-full w-full object-cover object-center" />
      <div className="fixed inset-0 -z-10 bg-photo-scrim" aria-hidden="true" />

      <nav
        className="flex flex-wrap items-center justify-between gap-3 border-b border-photo-line bg-photo-glass px-[5vw] py-4 backdrop-blur-[14px]"
      >
        <div className="text-2xl font-bold">residence24</div>
        <div className="flex gap-5">
          {["Home", "About", "Help", "Login"].map((l) => (
            <a
              key={l}
              href="#"
              className="font-light text-photo-foreground/90 hover:text-photo-foreground hover:underline"
            >
              {l}
            </a>
          ))}
        </div>
      </nav>

      <main className="mx-auto w-[min(860px,92%)] flex-1 px-0 pb-10 pt-[6vh] text-center">
        <h1 className="mb-2 text-[clamp(28px,5vw,48px)] font-bold tracking-[-1px]">
          Find Your Perfect Student Residence
        </h1>
        <p className="mb-7 font-light opacity-85">
          Safe, affordable, inclusive accommodation across South Africa
        </p>

        <div
          role="group"
          aria-label="What would you like to do"
          className="mb-[18px] inline-flex rounded-full border border-photo-line bg-photo-glass p-1"
        >
          {(
            [
              ["find", "Find a Room"],
              ["list", "List Your Space"],
            ] as const
          ).map(([m, label]) => (
            <Button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              variant="ghost"
              className={`rounded-full px-[22px] py-[9px] hover:bg-photo-glass hover:text-photo-foreground ${mode === m ? "bg-photo-foreground text-photo-ink" : "text-photo-foreground"}`}
            >
              {label}
            </Button>
          ))}
        </div>

        <form
          onSubmit={onSearch}
          role="search"
          className="flex rounded-full bg-photo-foreground p-1.5 shadow-lg"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              mode === "find"
                ? "Search locations"
                : "Property location"
            }
            aria-label="Search accommodation"
            className="min-w-0 flex-1 bg-transparent px-[18px] py-3 text-base text-photo-ink outline-none"
          />
          <Button
            type="submit"
            className="h-auto rounded-full bg-photo-action px-6 py-3 font-semibold text-photo-foreground hover:bg-photo-action/90"
          >
            Search
          </Button>
        </form>

        <div className="my-[18px] flex flex-wrap justify-center gap-2.5">
          <label htmlFor="province" className="sr-only">
            Province
          </label>
          <select
            id="province"
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
              setUniversity("");
            }}
            className="max-w-full cursor-pointer rounded-full border border-photo-line bg-photo-glass px-4 py-2.5 text-sm text-photo-foreground"
          >
            <option value="" className="text-photo-ink">
              All provinces
            </option>
            {Object.keys(DATA).map((p) => (
              <option key={p} value={p} className="text-photo-ink">
                {p}
              </option>
            ))}
          </select>
          <label htmlFor="university" className="sr-only">
            University or college
          </label>
          <select
            id="university"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="max-w-full cursor-pointer rounded-full border border-photo-line bg-photo-glass px-4 py-2.5 text-sm text-photo-foreground"
          >
            <option value="" className="text-photo-ink">
              All universities and colleges
            </option>
            {universities.map((u) => (
              <option key={u} value={u} className="text-photo-ink">
                {u}
              </option>
            ))}
            <option value={OTHER} className="text-photo-ink">
              {OTHER}
            </option>
          </select>
        </div>

        <p
          aria-live="polite"
          className="mb-[26px] min-h-6 text-sm font-light opacity-90"
        >
          {summary}
        </p>

        <section
          aria-labelledby="calcTitle"
          className="mx-auto w-[min(340px,100%)] rounded-lg border border-photo-line bg-photo-panel p-[22px] text-left backdrop-blur-[14px]"
        >
          <h2 id="calcTitle" className="mb-3.5 text-lg font-semibold">
            Rent Calculator
          </h2>
          <form onSubmit={calculateRent} noValidate>
          <label
            htmlFor="rent"
            className="mb-1 block text-xs opacity-75"
          >
            Monthly rent (ZAR)
          </label>
          <input
            id="rent"
            type="number"
            min={0}
            step={50}
            inputMode="decimal"
            placeholder="e.g. 4500"
            value={rent}
            onChange={(e) => { setRent(e.target.value); setCalculation(null); setCalculationError(""); }}
            className="mb-3 w-full rounded-md bg-photo-foreground p-[11px] text-[15px] text-photo-ink"
          />
          <label
            htmlFor="months"
            className="mb-1 block text-xs opacity-75"
          >
            Duration (months)
          </label>
          <input
            id="months"
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            placeholder="e.g. 10"
            value={months}
            onChange={(e) => { setMonths(e.target.value); setCalculation(null); setCalculationError(""); }}
            className="mb-3 w-full rounded-md bg-photo-foreground p-[11px] text-[15px] text-photo-ink"
          />
          <Button type="submit" className="w-full bg-photo-action text-photo-foreground hover:bg-photo-action/90">Calculate Total Rent</Button>
          <div aria-live="polite" className="mt-3 min-h-5 text-sm">
            {calculationError || (calculation ? `Total: ${zar.format(calculation.total)}` : "")}
          </div>
          {calculation && <p className="text-xs opacity-75">{zar.format(calculation.rent)} × {calculation.months} month{calculation.months === 1 ? "" : "s"}</p>}
          </form>
        </section>
      </main>

      <footer className="p-3.5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} residence24 South Africa
      </footer>
    </div>
  );
}
