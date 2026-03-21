"use client";

import {
  LogIn,
  Pencil,
  Search,
  Bookmark,
  Mail,
  Sparkles,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow">
        <div className="flex items-center gap-2 p-4">
          <Image src="/logo.svg" width={50} height={50} alt="logo" />
          <span className="font-playfair text-xl sm:text-2xl font-medium">
            palette
          </span>
        </div>

        <header className="relative z-10 flex flex-col items-center justify-center py-8 sm:py-10">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-10">
            <div className="mx-auto max-w-3xl text-center my-4 sm:my-5">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair leading-tight">
                <span className="z-10 block">
                  <motion.span
                    className="inline-block font-playfair"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    Curated Board
                  </motion.span>
                  <br />
                  <motion.span
                    className="inline-block text-[#5AC2FF] font-playfair"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                  >
                    For Research Internships
                  </motion.span>
                </span>
              </h1>

              <motion.div
                className="mx-auto max-w-2xl mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
              >
                <p className="text-gray-800 text-base sm:text-lg font-medium font-main">
                  Discover more than 1000+ professors who align with your research interests, all
                  in one place.
                </p>

                <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full">
                  <Link className="w-full sm:w-auto" href="/auth/signin">
                    <motion.button
                      className="w-full sm:w-auto font-main rounded-md gap-2 cursor-pointer font-medium text-base sm:text-lg bg-[#5AC2FF] text-white border border-gray-300 py-2 px-4 inline-flex items-center justify-center whitespace-nowrap"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <LogIn className="stroke-1 h-5 w-5" />
                      Login
                    </motion.button>
                  </Link>

                  <Link className="w-full sm:w-auto" href="/auth/signup">
                    <motion.button
                      className="w-full sm:w-auto font-main rounded-md gap-2 cursor-pointer font-medium text-base sm:text-lg bg-white text-gray-900 border border-gray-200 py-2 px-3 inline-flex items-center justify-center hover:bg-gray-50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] whitespace-nowrap"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Pencil className="stroke-1 h-5 w-5" />
                      Sign Up
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        <motion.section
          className="mx-auto w-full max-w-6xl px-6 sm:px-10 pb-16 sm:pb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="shrink-0 font-main lg:w-56">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                {[
                  { icon: <Search className="h-5 w-5 stroke-1" />, bg: "bg-orange-100", text: "text-orange-600", label: "Discover", desc: "Browse 1000+ professors" },
                  { icon: <Sparkles className="h-5 w-5 stroke-1" />, bg: "bg-purple-100", text: "text-purple-600", label: "Recommendations", desc: "Based on research interests" },
                  { icon: <Bookmark className="h-5 w-5 stroke-1" />, bg: "bg-blue-100", text: "text-blue-600", label: "Save", desc: "Build your shortlist" },
                  { icon: <BarChart3 className="h-5 w-5 stroke-1" />, bg: "bg-green-100", text: "text-green-600", label: "Track", desc: "Monitor outreach status" },
                  { icon: <Mail className="h-5 w-5 stroke-1" />, bg: "bg-pink-100", text: "text-pink-600", label: "Draft Emails", desc: "Compose cold emails" },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3"
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(249,250,251,1)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`${item.bg} ${item.text} rounded-lg p-1.5 shrink-0`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500 leading-tight hidden sm:block">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex-1 rounded-2xl border border-gray-200 overflow-hidden shadow-lg bg-white p-2 sm:p-3">
              <div className="rounded-xl overflow-hidden">
                <video
                  className="w-full block -mt-[1%]"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/demo.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="bg-white font-light border-t py-4">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
            <span>Made By Jie Xuan Liu</span>

            <div className="flex gap-4">
              <a className="underline hover:text-blue-500" href="/terms">
                Terms of Use
              </a>
              <a className="underline hover:text-blue-500" href="/privacy">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
