"use client";

import { Lightbulb, Mail, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

const FEATURE_CARDS = [
  {
    title: "Discover New Professors",
    body: "Find and learn more about professors. Save them and quickly access their research interests, groups, and past work.",
    icon: <Mail className="stroke-1" />,
  },
  {
    title: "Automate Initial and Follow Up Emails",
    body: "Let us handle sending and scheduled follow Ups so you can focus on finding the right professor.",
    icon: <Lightbulb className="stroke-1" />,
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
    <div className="relative flex flex-col">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e5e7eb 1px, transparent 1px),
        linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
      `,
          backgroundSize: "24px 24px",
          maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 70%, transparent 100%)",
        }}
      />
      <header className="relative px-6 sm:px-10 mb-10 min-h-screen flex z-10 justify-center items-center">
        <div className="relative flex flex-col my-16 sm:my-24 max-w-3xl">
          <h1 className="text-2xl sm:text-5xl leading-tight">
            <span className="font-main z-10">
              Find Your Dream Research Internship!
            </span>
          </h1>
          <div className="mt-4 sm:mt-5 max-w-2xl">
            <p className="text-gray-800 text-lg font-main">
              Discover professors with overlapping research interests.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <motion.button
                className="font-main rounded-xs cursor-pointer font-medium text-lg bg-black text-white border border-gray-300 py-2 px-3 inline-flex items-center justify-center"
                role="button"
                aria-label="Sign Up"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/auth/signin">Login</Link>
              </motion.button>
              <motion.button
                className="font-main rounded-xs cursor-pointer font-medium text-lg bg-white text-gray-900 border border-gray-300 py-2 px-3 inline-flex items-center justify-center hover:bg-gray-50"
                role="button"
                aria-label="Sign Up"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/auth/signup">Sign Up</Link>
              </motion.button>
            </div>
          </div>
        </div>
      </header>
      <main className="relative z-10 bg-white my-20">
        <section className="px-6 sm:px-10">
          <h2 className="font-main font-medium mt-10 text-lg text-[#5B61B2] p-2 rounded-md bg-slate-100 inline-block">
            📝 Research Areas
          </h2>

          <p className="font-main text-medium mt-6 font-light text-gray-800">
            Find a list of professors whose work matches your interests. Whether
            it is Molecular Biology or Machine Learning, we got you.
          </p>

          <div className="flex flex-wrap gap-2 font-main mt-4">
            {AREAS.map((a) => (
              <span
                key={a}
                className="text-medium bg-slate-100 border border-slate-200 rounded-xs px-3 py-1"
              >
                {a}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
