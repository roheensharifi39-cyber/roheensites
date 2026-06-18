import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | Sites by Roheen",
  description: "Terms of use for Sites by Roheen student portfolio website services.",
};

const lastUpdated = "June 18, 2026";

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-[#020812] px-4 py-10 text-zinc-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-sky-200 transition hover:text-sky-100">
          Back to Sites by Roheen
        </Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
          Terms of Use
        </h1>
        <p className="mt-4 text-sm text-zinc-400">Last updated: {lastUpdated}</p>

        <div className="mt-10 space-y-8 text-base leading-7 text-zinc-300">
          <section>
            <h2 className="text-xl font-semibold text-white">Services</h2>
            <p className="mt-3">
              Sites by Roheen provides student portfolio website design, setup, launch support, and
              maintenance services based on the plan selected. Project scope, timing, and included
              updates may vary by plan and by the materials you provide.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Payments</h2>
            <p className="mt-3">
              Monthly service is currently listed at $5/month. One-time sites are currently listed
              at $40. Future edits outside an active monthly plan may be quoted separately. Payment
              provider terms may also apply.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Your Content</h2>
            <p className="mt-3">
              You are responsible for making sure the resumes, text, images, links, logos, and
              other materials you provide are accurate and that you have permission to use them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Client Responsibilities</h2>
            <p className="mt-3">
              You are responsible for reviewing your site before launch, checking names, dates,
              links, claims, contact details, and payment information, and requesting corrections
              promptly. Do not send passwords, private keys, Social Security numbers, medical
              records, financial account numbers, or other highly sensitive information unless a
              separate written arrangement is made.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Cancellations and Updates</h2>
            <p className="mt-3">
              Monthly clients may cancel future service. After cancellation, maintenance and future
              updates stop. Hosting, domain, and access details depend on the setup used for your
              project.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">No Guarantees</h2>
            <p className="mt-3">
              A portfolio website can help present your work professionally, but Sites by Roheen
              does not guarantee internships, jobs, scholarships, interviews, admissions, or other
              outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Third-Party Services</h2>
            <p className="mt-3">
              Websites may rely on third-party services such as hosting providers, domain
              registrars, payment processors, email providers, analytics tools, or client-provided
              platforms. Sites by Roheen is not responsible for outages, policy changes, fees,
              account issues, or security incidents caused by third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Limitation of Liability</h2>
            <p className="mt-3">
              To the maximum extent allowed by law, Sites by Roheen is not liable for indirect,
              incidental, special, consequential, or punitive damages, including lost opportunities,
              lost data, lost profits, or reputational harm. The maximum total liability for a
              project is limited to the amount you paid for that project in the three months before
              the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">No Professional Advice</h2>
            <p className="mt-3">
              Sites by Roheen provides website design and related support only. Content suggestions
              are not legal, financial, academic, medical, employment, or professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p className="mt-3">
              Questions about these terms can be sent to{" "}
              <a className="text-sky-200 underline underline-offset-4" href="mailto:roheensharifi39@gmail.com">
                roheensharifi39@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
