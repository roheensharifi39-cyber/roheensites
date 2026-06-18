import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Sites by Roheen",
  description: "Privacy policy for Sites by Roheen student portfolio website services.",
};

const lastUpdated = "June 17, 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#020812] px-4 py-10 text-zinc-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-sky-200 transition hover:text-sky-100">
          Back to Sites by Roheen
        </Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-zinc-400">Last updated: {lastUpdated}</p>

        <div className="mt-10 space-y-8 text-base leading-7 text-zinc-300">
          <section>
            <h2 className="text-xl font-semibold text-white">Information Collected</h2>
            <p className="mt-3">
              Sites by Roheen only collects information you choose to send, such as your name,
              email address, phone number, resume, project details, links, photos, and messages.
              Payments are handled by third-party providers such as Stripe, Venmo, or Zelle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">How Information Is Used</h2>
            <p className="mt-3">
              Your information is used to communicate with you, build and maintain your portfolio
              website, process payment, provide updates you request, and keep basic service records.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Sharing</h2>
            <p className="mt-3">
              Sites by Roheen does not sell your personal information. Information may be shared
              with service providers only when needed to build, host, launch, maintain, or accept
              payment for your website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Security</h2>
            <p className="mt-3">
              Reasonable steps are used to protect project information, but no internet service,
              email exchange, or payment system can be guaranteed to be completely secure. Do not
              send passwords, private keys, or highly sensitive documents unless specifically agreed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p className="mt-3">
              Questions about this policy can be sent to{" "}
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
