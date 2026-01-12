"use client";

import { LogIn, Pencil } from "lucide-react";
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
