import type { Metadata } from "next";
import Image from "next/image";

const siteUrl = "https://basedandfit.icu";

const foodImages = {
  hero:
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=85",
  wings:
    "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=1200&q=85",
  tacos:
    "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=85",
  bowl:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85",
  dinner:
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=85",
};

const reviews = [
  {
    title: "Mambo wings after leg day",
    place: "Northeast DC",
    score: "8.7",
    tag: "Worth the drive",
    image: foodImages.wings,
    copy: "Sticky heat, crisp edges, and enough sauce to make the fries part of the order.",
  },
  {
    title: "Late-night taco counter",
    place: "Arlington",
    score: "8.4",
    tag: "Best with friends",
    image: foodImages.tacos,
    copy: "Fast line, bright salsa, strong tortillas, and the kind of table noise that helps the food.",
  },
  {
    title: "Clean bowl that still hits",
    place: "Silver Spring",
    score: "8.1",
    tag: "Post-workout pick",
    image: foodImages.bowl,
    copy: "Plenty of protein, sharp crunch, and a dressing that keeps it from tasting like homework.",
  },
];

const neighborhoods = [
  "DC",
  "Arlington",
  "Alexandria",
  "Silver Spring",
  "Bethesda",
  "Tysons",
  "College Park",
  "Reston",
];

const scoreNotes = [
  ["Flavor", "Does the bite stay memorable after the first few minutes?"],
  ["Value", "Is the bill fair for the portion, setting, and repeat factor?"],
  ["Fit check", "Can you eat well here without killing the rest of the day?"],
  ["Vibe", "Does the room, line, playlist, and service make the food better?"],
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Based & Fit | DMV Food Reviews",
  description:
    "A DMV food review site for spots that taste good, feel local, and still fit your routine.",
  keywords: [
    "Based and Fit",
    "Based & Fit",
    "DMV food reviews",
    "DC food reviews",
    "Maryland restaurants",
    "Virginia restaurants",
    "DMV restaurant guide",
    "fit food reviews",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Based & Fit | DMV Food Reviews",
    description:
      "Food reviews across DC, Maryland, and Virginia for meals worth planning your week around.",
    url: siteUrl,
    siteName: "Based & Fit",
    images: [
      {
        url: foodImages.hero,
        width: 1600,
        height: 1067,
        alt: "Colorful healthy food spread on a restaurant table",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Based & Fit | DMV Food Reviews",
    description:
      "Food reviews across DC, Maryland, and Virginia for meals worth planning your week around.",
    images: [foodImages.hero],
  },
};

function ScorePill({ score }: { score: string }) {
  return (
    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#ff5a3d] text-lg font-black text-[#191612] shadow-[0_18px_45px_rgba(255,90,61,0.22)]">
      {score}
    </span>
  );
}

export default function BasedAndFitPage() {
  return (
    <main className="min-h-[100dvh] bg-[#151410] text-[#f7f2e9]">
      <header className="sticky top-0 z-30 border-b border-[#f7f2e9]/10 bg-[#151410]/96 px-4 py-3 sm:px-6 lg:px-8">
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4">
          <a href="#top" className="min-w-0 text-xl font-black tracking-[-0.04em] text-[#f7f2e9]">
            Based & Fit
          </a>
          <div className="hidden items-center gap-6 text-sm font-semibold text-[#f7f2e9]/70 md:flex">
            <a className="transition hover:text-[#f7f2e9]" href="#reviews">
              Reviews
            </a>
            <a className="transition hover:text-[#f7f2e9]" href="#map">
              DMV Map
            </a>
            <a className="transition hover:text-[#f7f2e9]" href="#scores">
              Scores
            </a>
          </div>
          <a
            href="mailto:tips@basedandfit.icu?subject=DMV food tip"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f7f2e9] px-5 text-sm font-black text-[#151410] transition hover:bg-[#ff5a3d] hover:text-[#151410] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5a3d]"
          >
            Send a Tip
          </a>
        </nav>
      </header>

      <section id="top" className="px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="mb-5 max-w-sm text-sm font-bold text-[#ffb6a8]">
              DMV food reviews for the meal you actually want after the gym, after work, or after midnight.
            </p>
            <h1 className="max-w-[10ch] text-[clamp(3rem,14vw,7.8rem)] font-black leading-[0.82] tracking-[-0.075em] text-[#f7f2e9]">
              Eat local. Stay based.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#f7f2e9]/72">
              Based & Fit reviews DMV restaurants by flavor, value, protein, comfort, and whether the spot deserves a repeat visit.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#reviews"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#ff5a3d] px-6 text-sm font-black text-[#191612] transition hover:bg-[#ff765f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5a3d]"
              >
                Read Reviews
              </a>
              <a
                href="#scores"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#f7f2e9]/18 px-6 text-sm font-black text-[#f7f2e9] transition hover:border-[#ff5a3d] hover:text-[#ffb6a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5a3d]"
              >
                How We Score
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-16 top-0 hidden h-56 w-56 bg-[radial-gradient(circle,rgba(255,90,61,0.22),transparent_68%)] lg:block" />
            <div className="relative overflow-hidden rounded-[28px] border border-[#f7f2e9]/12 bg-[#211f19] p-2 shadow-[0_40px_140px_rgba(0,0,0,0.38)]">
              <Image
                src={foodImages.hero}
                alt="Colorful healthy food spread on a restaurant table"
                width={1600}
                height={1200}
                sizes="(max-width: 1023px) calc(100vw - 2rem), 56vw"
                quality={82}
                className="aspect-[4/3] w-full rounded-[22px] object-cover"
                preload
              />
              <div className="grid gap-2 p-3 sm:grid-cols-3">
                {["DC", "Maryland", "Virginia"].map((item) => (
                  <div key={item} className="rounded-2xl bg-[#151410] px-4 py-3 text-sm font-black text-[#f7f2e9]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black leading-none tracking-[-0.055em] text-[#f7f2e9] sm:text-6xl">
              This week in the DMV.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#f7f2e9]/68">
              Short reviews for places that balance cravings, clean choices, and the local food culture that makes the DMV different.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            {reviews.map((review, index) => (
              <article
                key={review.title}
                className={`overflow-hidden rounded-[28px] border border-[#f7f2e9]/10 bg-[#211f19] ${
                  index === 0 ? "lg:col-span-6 lg:row-span-2" : "lg:col-span-6"
                }`}
              >
                <Image
                  src={review.image}
                  alt={`${review.title} in ${review.place}`}
                  width={1200}
                  height={780}
                  sizes="(max-width: 1023px) calc(100vw - 2rem), 50vw"
                  quality={80}
                  className={`w-full object-cover ${index === 0 ? "aspect-[1.08/1]" : "aspect-[2.2/1]"}`}
                />
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-[#ffb6a8]">{review.place}</p>
                      <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#f7f2e9] sm:text-3xl">
                        {review.title}
                      </h3>
                    </div>
                    <ScorePill score={review.score} />
                  </div>
                  <p className="mt-4 text-base leading-7 text-[#f7f2e9]/68">{review.copy}</p>
                  <p className="mt-5 inline-flex rounded-full border border-[#ff5a3d]/30 px-4 py-2 text-sm font-black text-[#ffb6a8]">
                    {review.tag}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="map" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
          <div className="rounded-[28px] border border-[#f7f2e9]/10 bg-[#f7f2e9] p-6 text-[#151410] sm:p-8">
            <h2 className="text-4xl font-black leading-none tracking-[-0.055em] sm:text-6xl">
              Built for DMV range.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#151410]/72">
              One page can cover neighborhood finds, gym-friendly orders, family spots, and food truck runs without feeling like a generic blog.
            </p>
          </div>
          <div className="rounded-[28px] border border-[#f7f2e9]/10 bg-[#211f19] p-4 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {neighborhoods.map((item) => (
                <a
                  href="#reviews"
                  key={item}
                  className="rounded-2xl border border-[#f7f2e9]/10 bg-[#151410] px-4 py-5 text-lg font-black text-[#f7f2e9] transition hover:border-[#ff5a3d] hover:text-[#ffb6a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5a3d]"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <Image
            src={foodImages.dinner}
            alt="Restaurant meal with grilled food and sides"
            width={1400}
            height={900}
            sizes="(max-width: 1023px) calc(100vw - 2rem), 58vw"
            quality={80}
            className="aspect-[1.55/1] w-full rounded-[28px] object-cover"
            loading="lazy"
          />
          <div className="lg:pl-8">
            <h2 className="text-4xl font-black leading-none tracking-[-0.055em] text-[#f7f2e9] sm:text-6xl">
              Full plates, useful notes.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#f7f2e9]/68">
              Each review is written for people deciding fast: where to go, what to order, and whether it fits the day.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {["Best order", "Good for groups", "Fit-friendly swap"].map((item) => (
                <div key={item} className="rounded-2xl border border-[#f7f2e9]/10 bg-[#211f19] p-4 text-sm font-black text-[#f7f2e9]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="scores" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-[#f7f2e9]/10 bg-[#211f19] p-5 sm:p-8 lg:p-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black leading-none tracking-[-0.055em] text-[#f7f2e9] sm:text-6xl">
              Scores with context.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#f7f2e9]/68">
              A high score means the spot makes sense for the meal, the neighborhood, and the reason you came.
            </p>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {scoreNotes.map(([title, copy]) => (
              <article key={title} className="rounded-2xl border border-[#f7f2e9]/10 bg-[#151410] p-5">
                <h3 className="text-2xl font-black tracking-[-0.04em] text-[#f7f2e9]">{title}</h3>
                <p className="mt-3 text-base leading-7 text-[#f7f2e9]/68">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[28px] border border-[#ff5a3d]/30 bg-[#ff5a3d] p-6 text-[#191612] sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
          <div>
            <h2 className="text-4xl font-black leading-none tracking-[-0.055em] sm:text-6xl">
              Got a DMV spot?
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[#191612]/76">
              Send the restaurant, order, city, and what made it worth talking about.
            </p>
          </div>
          <a
            href="mailto:tips@basedandfit.icu?subject=DMV food tip"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#151410] px-6 text-sm font-black text-[#f7f2e9] transition hover:bg-[#2a271f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#151410]"
          >
            Email a Tip
          </a>
        </div>
      </section>

      <footer className="border-t border-[#f7f2e9]/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm font-semibold text-[#f7f2e9]/56 sm:flex-row sm:items-center sm:justify-between">
          <p>Based & Fit</p>
          <p>DMV food reviews at basedandfit.icu</p>
        </div>
      </footer>
    </main>
  );
}
