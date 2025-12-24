"use client";

import {
  ChevronLeft,
  ChevronRight,
  Database,
  Eye,
  LogIn,
  Mail,
  PanelLeft,
  Pencil,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

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
      <header className="relative z-10 flex flex-col items-center justify-center py-10">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <div className="mx-auto max-w-3xl text-center my-20">
            <h1 className="text-5xl sm:text-6xl font-playfair leading-tight">
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
                  className="inline-block text-blue-500 font-playfair"
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
              <p className="text-gray-800 text-lg font-medium font-main">
                discover, outreach, organise and land research internships with
                over 1000+ professors all in one workspace
              </p>

              <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/auth/signin">
                  <motion.button
                    className="font-main rounded-md gap-2 cursor-pointer font-medium text-lg bg-blue-500 text-white border border-gray-300 py-2 px-4 inline-flex items-center justify-center whitespace-nowrap"
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
                <Link href="/auth/signup">
                  <motion.button
                    className="font-main rounded-md gap-2 cursor-pointer font-medium text-lg bg-white text-gray-900 border border-gray-200 py-2 px-3 inline-flex items-center justify-center hover:bg-gray-50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] whitespace-nowrap"
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

      <div className="w-full flex mt-10 max-w-5xl mx-auto">
        <section className="font-main w-64">
          <div className="mx-auto px-6 sm:px-10">
            <motion.div
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="font-main mb-10 space-y-6"
            >
              <motion.div
                variants={cardVariants}
                className="relative flex rounded-md shadow-md flex-col h-full gap-2 border border-gray-200 bg-white/40 p-6"
              >
                <Database className="stroke-1 text-white fill-blue-500" />
                <h3 className="text-lg font-semibold">
                  Access to 1000+ Professors
                </h3>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="relative gap-2 rounded-md shadow-md flex h-full flex-col border border-gray-200 bg-white/40 p-6"
              >
                <Pencil className="stroke-1 text-white fill-blue-500" />
                <h3 className="text-lg font-semibold">
                  Tools for Drafting Emails
                </h3>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="relative gap-2 rounded-md shadow-md flex h-full flex-col border border-gray-200 bg-white/40 p-6"
              >
                <Mail className="stroke-1 text-white fill-blue-500" />
                <h3 className="text-lg font-semibold text-gray-700">
                  Send Emails On Mass
                </h3>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="relative rounded-md gap-2 shadow-md flex h-full flex-col border border-gray-200 bg-white/40 p-6"
              >
                <Eye className="stroke-1 text-white fill-blue-500" />
                <h3 className="text-lg font-semibold">
                  Track and Organise Outreach
                </h3>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <motion.div
          className="flex-1 bg-white rounded-sm shadow-2xl overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        >
          <div className="bg-gray-100 w-full border-b border-gray-300 px-4 flex items-center gap-3">
            <div className="flex gap-2">
              <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600" />
              <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600" />
              <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600" />
            </div>

            <div className="flex gap-1 items-center">
              <PanelLeft className="stroke-1 h-4 w-4" />
              <ChevronLeft className="stroke-1 h-4 w-4" />
              <ChevronRight className="stroke-1 h-4 w-4" />
            </div>

            <div className="flex gap-1 items-center">
              <div className="bg-white border-x border-gray-300 px-4 flex items-center">
                <span className="text-xs font-main py-1 font-light text-gray-800">
                  palette
                </span>
              </div>
              <Plus className="stroke-1 h-4 w-4" />
            </div>
          </div>

          <section className="p-10 min-h-96 bg-white">
            <div></div>
          </section>
        </motion.div>
      </div>

      <footer className="bg-white font-light border-t mt-12 py-4">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <div className="text-sm flex gap-4">
            <span>Made By Jie Xuan Liu</span>
            <a className="underline hover:text-blue-700" href="/blog">
              Engineering Blog
            </a>
          </div>
          <div className="text-sm flex gap-4">
            <span>Made By Jie Xuan Liu</span>
            <a className="underline hover:text-blue-700" href="/blog">
              Terms of Service
            </a>
          </div>
          <div className="text-sm flex gap-4">
            <span>Made By Jie Xuan Liu</span>
            <a className="underline hover:text-blue-700" href="/blog">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
