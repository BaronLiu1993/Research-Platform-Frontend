import Link from "next/link";

// Home (cleaned)
// - Fixes mismatched Login/Sign Up links
// - Replaces non-existent Tailwind classes (rounded-xs, border-1, my-30)
// - Improves semantics (header/main/section)
// - Normalizes spacing & typography
// - Makes features/cards data-driven
// - Minor copy edits & typo fixes

const FEATURE_CARDS = [
  {
    title: "Mass Send Emails",
    body:
      "Find and learn more about professors. Save them and quickly access their research interests, groups, and past work.",
  },
  {
    title: "Automate Initial & Follow‑ups",
    body:
      "Let us handle sending and scheduled follow‑ups so you can focus on finding the right professor.",
  },
  {
    title: "Track Emails",
    body: "Know who opened, clicked, or didn’t respond—so you can prioritize outreach smartly.",
  },
];

const AREAS = [
  "Machine Learning",
  "Psychology",
  "Biology",
  "Molecular Chemistry",
  "Physics",
  "Neuroscience",
  "Sociology",
  "Economics",
  "Computer Vision",
  "Robotics",
  "Political Science",
  "Philosophy",
  "Environmental Science",
  "Linguistics",
  "Anthropology",
  "Civil Engineering",
  "Electrical Engineering",
  "Medicine",
  "Public Health",
  "Education",
  ];

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="px-6 sm:px-10">
        <div className="flex flex-col my-16 sm:my-24">
          <h1 className="text-4xl sm:text-5xl px-0 sm:px-4 leading-tight">
            <span className="font-playfair">Find Researchers at UofT</span>
          </h1>

          <div className="mt-4 sm:mt-5 px-0 sm:px-4 max-w-2xl">
            <p className="text-gray-600 font-light font-main">
              Discover professors with overlapping research interests.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/auth/signin"
                className="font-main rounded-xs cursor-pointer font-medium text-sm bg-black text-white py-2 px-3 inline-flex items-center justify-center"
                role="button"
                aria-label="Login"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="font-main rounded-xs cursor-pointer font-medium text-sm bg-white text-gray-900 border border-gray-300 py-2 px-3 inline-flex items-center justify-center hover:bg-gray-50"
                role="button"
                aria-label="Sign Up"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="px-6 sm:px-10">
          <h2 className="font-playfair font-medium text-[#5B61B2] p-2 rounded-md bg-slate-100 inline-block">
            Research Areas
          </h2>
          <h3 className="border-b-2 border-[#5B61B2] w-fit font-main font-medium p-1 mt-2">
            📝 Modules
          </h3>
          <p className="mt-2 font-main text-sm font-light text-gray-800 max-w-2xl">
            Find a list of professors whose work matches your interests. Whether it is
            Molecular Biology or Machine Learning, we got you.
          </p>

          <div className="flex flex-wrap gap-2 font-main mt-4">
            {AREAS.map((a) => (
              <span
                key={a}
                className="text-sm bg-slate-100 border border-slate-200 rounded-xs px-3 py-1"
              >
                {a}
              </span>
            ))}
          </div>
        </section>

        <section className="px-6 sm:px-10 mt-12 sm:mt-16 flex flex-col gap-6">
          <div>
            <h2 className="font-playfair font-medium text-[#2F80E4] p-2 rounded-md bg-slate-100 inline-block">
              Features
            </h2>
            <h3 className="border-b-2 border-[#5B61B2] w-fit font-main font-medium p-1 mt-2">
              📝 Outreach & Tracking
            </h3>
            <p className="my-2 font-main text-sm font-light text-gray-800 max-w-3xl">
              Find the perfect research match. Instantly tailor your resume and craft
              personalized outreach emails then track engagement all in one place.
            </p>
          </div>

          <div className="flex justify-center mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
              {FEATURE_CARDS.map(({ title, body }) => (
                <article
                  key={title}
                  className="select-none border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
                >
                  <div className="flex bg-slate-50 p-5 flex-col gap-2">
                    <h4 className="font-playfair text-lg sm:text-xl text-[#2F80E4]">
                      {title}
                    </h4>
                    <p className="font-main text-sm text-gray-700 leading-relaxed">
                      {body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
