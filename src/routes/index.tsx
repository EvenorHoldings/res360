import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResRes | Student Accommodation in South Africa" },
      {
        name: "description",
        content:
          "ResRes: find safe, affordable, inclusive student accommodation across South Africa.",
      },
      {
        property: "og:title",
        content: "ResRes | Student Accommodation in South Africa",
      },
      {
        property: "og:description",
        content:
          "Find your perfect student residence — safe, affordable, inclusive accommodation across South Africa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SLIDES = [
  {
    label: "Western Cape",
    url: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=2070&q=80",
  },
  {
    label: "Gauteng",
    url: "https://images.unsplash.com/photo-1577948000111-9c970dfe3206?auto=format&fit=crop&w=1974&q=80",
  },
];

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

const CHIPS = [
  { key: "LGBTQ+ friendly", label: "🏳️‍🌈 LGBTQ+ Friendly" },
  { key: "Pet friendly", label: "🐾 Pet Friendly" },
  { key: "Special needs accessible", label: "♿ Special Needs Accessible" },
];

const zar = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
});

const glass = "rgba(255,255,255,.14)";
const line = "rgba(255,255,255,.3)";

function Index() {
  const [mode, setMode] = useState<"find" | "list">("find");
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("");
  const [university, setUniversity] = useState("");
  const [pressed, setPressed] = useState<Record<string, boolean>>({});
  const [summary, setSummary] = useState("");
  const [rent, setRent] = useState("");
  const [months, setMonths] = useState("");
  const [slideIdx, setSlideIdx] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<typeof SLIDES>([]);
  const timerRef = useRef<number | null>(null);

  // Preload background slides, skipping any that fail
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      SLIDES.map(
        (s) =>
          new Promise<(typeof SLIDES)[number] | null>((res) => {
            const im = new Image();
            im.onload = () => res(s);
            im.onerror = () => res(null);
            im.src = s.url;
          }),
      ),
    ).then((ok) => {
      if (cancelled) return;
      const valid = ok.filter(Boolean) as typeof SLIDES;
      setLoadedSlides(valid);
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (valid.length > 1 && !reduce) {
        timerRef.current = window.setInterval(
          () => setSlideIdx((i) => (i + 1) % valid.length),
          6000,
        );
      }
    });
    return () => {
      cancelled = true;
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const universities = useMemo(
    () => (province ? (DATA[province] ?? []) : Object.values(DATA).flat()),
    [province],
  );

  const rentNum = parseFloat(rent);
  const monthsNum = parseInt(months, 10);
  const bothEmpty = !rent && !months;
  const valid =
    !bothEmpty && rentNum >= 0 && monthsNum >= 1 && monthsNum <= 60;
  const total = valid ? rentNum * monthsNum : 0;
  const note = bothEmpty
    ? ""
    : valid
      ? `${zar.format(rentNum)} × ${monthsNum} month${monthsNum > 1 ? "s" : ""}  ·  ${zar.format(rentNum * 12)} per year`
      : "Enter a rent of R0 or more and 1–60 months.";

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const parts = [mode === "find" ? "Find a Room" : "List Your Space"];
    if (query.trim()) parts.push(query.trim());
    if (province) parts.push(province);
    if (university) parts.push(university);
    CHIPS.forEach((c) => pressed[c.key] && parts.push(c.key));
    setSummary(parts.join("  ·  "));
  };

  return (
    <div
      className="flex min-h-screen flex-col font-sans text-white"
      style={{
        background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
      }}
    >
      {/* Background slider */}
      <div className="fixed inset-0 -z-20" aria-hidden="true">
        {loadedSlides.map((s, i) => (
          <div
            key={s.url}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1200ms] ease-in-out"
            style={{
              backgroundImage: `url("${s.url}")`,
              opacity: i === slideIdx ? 1 : 0,
            }}
          />
        ))}
      </div>
      <div
        className="fixed inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.6))",
        }}
      />

      <nav
        className="flex flex-wrap items-center justify-between gap-3 border-b px-[5vw] py-4 backdrop-blur-[14px]"
        style={{ background: glass, borderColor: line }}
      >
        <div className="text-2xl font-bold tracking-tight">ResRes</div>
        <div className="flex gap-5">
          {["Home", "About", "Help", "Login"].map((l) => (
            <a
              key={l}
              href="#"
              className="font-light text-white/90 hover:text-white hover:underline"
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
          className="mb-[18px] inline-flex rounded-full border p-1"
          style={{ background: glass, borderColor: line }}
        >
          {(
            [
              ["find", "Find a Room"],
              ["list", "List Your Space"],
            ] as const
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`rounded-full px-[22px] py-[9px] ${
                mode === m ? "bg-white text-neutral-900" : "text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <form
          onSubmit={onSearch}
          role="search"
          className="flex rounded-full bg-white p-1.5 shadow-[0_8px_30px_rgba(0,0,0,.3)]"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              mode === "find"
                ? "Search by suburb, city or campus"
                : "Enter your property's suburb or address"
            }
            aria-label="Search accommodation"
            className="min-w-0 flex-1 bg-transparent px-[18px] py-3 text-base text-neutral-900 outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-[#0a84ff] px-6 py-3 font-semibold text-white"
          >
            Search
          </button>
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
            className="max-w-full cursor-pointer rounded-full border px-4 py-2.5 text-sm text-white"
            style={{ background: glass, borderColor: line }}
          >
            <option value="" className="text-neutral-900">
              All provinces
            </option>
            {Object.keys(DATA).map((p) => (
              <option key={p} value={p} className="text-neutral-900">
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
            className="max-w-full cursor-pointer rounded-full border px-4 py-2.5 text-sm text-white"
            style={{ background: glass, borderColor: line }}
          >
            <option value="" className="text-neutral-900">
              All universities and colleges
            </option>
            {universities.map((u) => (
              <option key={u} value={u} className="text-neutral-900">
                {u}
              </option>
            ))}
            <option value={OTHER} className="text-neutral-900">
              {OTHER}
            </option>
          </select>
        </div>

        <div
          role="group"
          aria-label="Accommodation options"
          className="mb-[18px] flex flex-wrap justify-center gap-2.5"
        >
          {CHIPS.map((c) => (
            <button
              key={c.key}
              type="button"
              aria-pressed={!!pressed[c.key]}
              onClick={() =>
                setPressed((p) => ({ ...p, [c.key]: !p[c.key] }))
              }
              className="rounded-full border px-[18px] py-[9px] text-sm text-white"
              style={{
                background: pressed[c.key] ? "#0a84ff" : glass,
                borderColor: pressed[c.key] ? "#0a84ff" : line,
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <p
          aria-live="polite"
          className="mb-[26px] min-h-6 text-sm font-light opacity-90"
        >
          {summary}
        </p>

        <section
          aria-labelledby="calcTitle"
          className="mx-auto w-[min(340px,100%)] rounded-[20px] border p-[22px] text-left backdrop-blur-[14px]"
          style={{ background: "rgba(0,0,0,.4)", borderColor: line }}
        >
          <h2 id="calcTitle" className="mb-3.5 text-lg font-semibold">
            Rent Calculator
          </h2>
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
            onChange={(e) => setRent(e.target.value)}
            className="mb-3 w-full rounded-[10px] p-[11px] text-[15px] text-neutral-900"
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
            max={60}
            step={1}
            inputMode="numeric"
            placeholder="e.g. 10"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="mb-3 w-full rounded-[10px] p-[11px] text-[15px] text-neutral-900"
          />
          <div className="text-[26px] font-bold tracking-[-0.5px]">
            {zar.format(total)}
          </div>
          <div aria-live="polite" className="min-h-[18px] text-[13px] opacity-75">
            {note}
          </div>
        </section>
      </main>

      <div className="fixed bottom-3.5 left-[5vw] text-xs opacity-70 max-sm:hidden">
        {loadedSlides[slideIdx]?.label ?? ""}
      </div>
      <footer className="p-3.5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} ResRes South Africa
      </footer>
    </div>
  );
}
