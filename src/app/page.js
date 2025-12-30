"use client";

import {
  ChevronLeft,
  ChevronRight,
  Database,
  LogIn,
  Mail,
  PanelLeft,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import Video from "./components/video/video";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4,
    },
  },
};

export default function Home() {
  return (
    <div className="relative flex flex-col bg-white">
      {/* Top bar */}
      <div className="flex items-center gap-2 p-4">
        <Image src="/logo.svg" width={50} height={50} alt="logo" />
        <span className="font-playfair text-xl sm:text-2xl font-medium">
          palette
        </span>
      </div>

      {/* Hero */}
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
                  All In One Workspace
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
                discover, outreach, organise and land your next dream research
                internships with over 1000+ professors all in one workspace
              </p>

              <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full">
                <Link className="w-full sm:w-auto" href="/auth/signin">
                  <motion.button
                    className="w-full sm:w-auto font-main rounded-md gap-2 cursor-pointer font-medium text-base sm:text-lg bg-[#5AC2FF] text-white border border-gray-300 py-2 px-4 inline-flex items-center justify-center whitespace-nowrap"
                    role="button"
                    aria-label="Login"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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
                    role="button"
                    aria-label="Sign Up"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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

      {/* Main */}
      <div className="w-full mt-8 sm:mt-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Feature cards */}
            <section className="font-main w-full lg:w-64">
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="mb-6 lg:mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
              >
                <motion.div
                  variants={cardVariants}
                  className="relative flex rounded-md shadow-md flex-col h-full gap-2 border border-gray-200 bg-white/40 p-4 sm:p-6"
                >
                  <Database className="stroke-1 text-white fill-[#5AC2FF]" />
                  <h3 className="text-sm sm:text-base font-semibold">
                    Access to 1000+ Professors
                  </h3>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  className="relative gap-2 rounded-md shadow-md flex h-full flex-col border border-gray-200 bg-white/40 p-4 sm:p-6"
                >
                  <Pencil className="stroke-1 text-white fill-[#5AC2FF]" />
                  <h3 className="text-sm sm:text-base font-semibold">
                    Tools for Drafting Mass Emails
                  </h3>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  className="relative gap-2 rounded-md shadow-md flex h-full flex-col border border-gray-200 bg-white/40 p-4 sm:p-6 sm:col-span-2 lg:col-span-1"
                >
                  <Mail className="stroke-1 text-white fill-[#5AC2FF]" />
                  <h3 className="text-sm sm:text-base font-semibold text-gray-700">
                    Track and Organise All Your Outreach Emails
                  </h3>
                </motion.div>
              </motion.div>
            </section>

            {/* Video panel */}
            <motion.div
              className="min-w-0 w-full lg:flex-1 bg-white rounded-sm h-fit shadow-2xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            >
              <div
                className="relative bg-gray-100 w-full border-b border-gray-300 px-3 sm:px-4
                flex items-center gap-3 z-20
                after:absolute after:left-0 after:bottom-[-10px]
                after:w-full after:h-[10px]
                after:bg-gray-100"
              >
                <div className="flex gap-2 py-2">
                  <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600" />
                  <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600" />
                  <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600" />
                </div>

                <div className="flex gap-1 items-center">
                  <PanelLeft className="stroke-1 h-4 w-4" />
                  <ChevronLeft className="stroke-1 h-4 w-4" />
                  <ChevronRight className="stroke-1 h-4 w-4" />
                </div>
              </div>

              <section className="bg-white relative z-10 overflow-hidden">
                <Video />
              </section>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white font-light border-t mt-12 py-4">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <span>Made By Jie Xuan Liu</span>
              <a className="underline hover:text-blue-500" href="/blog">
                Engineering Blog
              </a>
            </div>

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
