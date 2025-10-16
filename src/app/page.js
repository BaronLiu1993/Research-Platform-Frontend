"use client";

import { Lightbulb, LogIn, Mail, Pencil, Search } from "lucide-react";
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
      <header className="relative px-6 sm:px-10 min-h-screen flex z-10 justify-center items-center">
        <div className="relative flex flex-col items-center my-16 sm:my-24 max-w-3xl">
          <h1 className="text-5xl sm:text-6xl leading-tight text-center">
            <span className="font-playfair z-10 block">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                Find Your Dream
              </motion.span>
              <br />
              <motion.span
                className="inline-block text-sky-500"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              >
                Research Internship
              </motion.span>
            </span>
          </h1>
          <motion.div
            className="mt-4 sm:mt-8 max-w-2xl flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
          >
            <p className="text-gray-800 text-lg font-light font-main">
              Discover professors with overlapping research interests.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <motion.button
                className="font-main rounded-md gap-2 cursor-pointer font-medium text-lg bg-black text-white border border-gray-300 py-2 px-3 inline-flex items-center justify-center"
                role="button"
                aria-label="Login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn className="stroke-1 h-5 w-5" />
                <Link href="/auth/signin">Login</Link>
              </motion.button>
              <motion.button
                className="font-main rounded-md gap-2 cursor-pointer font-medium text-lg bg-white text-gray-900 border border-gray-200 py-2 px-3 inline-flex items-center justify-center hover:bg-gray-50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)]"
                role="button"
                aria-label="Sign Up"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Pencil className="stroke-1 h-5 w-5" />
                <Link href="/auth/signup">Sign Up</Link>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </header>
      <main className="relative z-10 bg-white my-20">
        <section className="px-6 sm:px-10">
          <h2 className="font-main font-medium mt-10 text-lg text-[#5B61B2] p-2 rounded-md bg-slate-100 inline-block">
            📝 Research Areas
          </h2>

          <p className="font-main text-medium mt-6 text-gray-800">
          We recommend faculty aligned with your topics, methods, and goals.
          Browse a curated directory of 1,000+ professors to discover more.
          </p>

          <div className="flex flex-wrap gap-2 font-main mt-4">
            <div className="flex flex-wrap gap-3">
              {AREAS.map((area, idx) => (
                <motion.span
                  key={area}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.02 }}
                  whileHover={{ scale: 1.05 }}
                  className="font-main text-sm sm:text-base bg-white border-2 border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:shadow-md hover:border-[#5B61B2] transition-all cursor-pointer"
                >
                  {area}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <div className="font-main bg-white font-light px-4 border-t-1">
        <div className="py-4">
          <div className="text-sm flex flex-col">
            <span>Made By Jie Xuan Liu</span>
            <span>Industrial Engineering @ UofT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
