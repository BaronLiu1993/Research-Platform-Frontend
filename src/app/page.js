"use client";

import {
  Bike,
  CheckSquare,
  Coffee,
  FileText,
  LogIn,
  Pencil,
  Smile,
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

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
  "Environmental Science",
  "Civil Engineering",
  "Electrical Engineering",
  "Medicine",
  "Public Health",
  "Education",
];

const stickers = [
  {
    icon: <Smile className="h-10 w-10 stroke-1" />,
    color: "bg-blue-50 text-blue-600",
    edgeColor: "text-blue-600",
    delay: 0,
    position: { top: "15%", left: "8%" },
  },
  {
    icon: <Smile className="h-10 w-10 stroke-1" />,
    color: "bg-red-50 text-red-600",
    edgeColor: "text-red-600",
    delay: 2,
    position: { top: "55%", left: "5%" },
  },
  {
    icon: <FileText className="h-10 w-10 stroke-1" />,
    color: "bg-cyan-50 text-cyan-600",
    edgeColor: "text-cyan-600",
    delay: 3,
    position: { bottom: "10%", left: "19%" },
  },
  {
    icon: <CheckSquare className="h-10 w-10 stroke-1" />,
    color: "bg-purple-50 text-purple-600",
    edgeColor: "text-purple-600",
    delay: 1.5,
    position: { top: "20%", right: "12%" },
  },
  {
    icon: <Coffee className="h-10 w-10 stroke-1" />,
    color: "bg-orange-50 text-orange-600",
    edgeColor: "text-orange-600",
    delay: 2.5,
    position: { top: "50%", right: "8%" },
  },
  {
    icon: <Bike className="h-10 w-10 stroke-1" />,
    color: "bg-teal-50 text-teal-600",
    edgeColor: "text-teal-600",
    delay: 0.5,
    position: { top: "12%", right: "25%" },
  },
];

export default function Home() {
  return (
    <div className="relative flex flex-col bg-gray-50">
      <header className="relative z-10 flex flex-col min-h-screen items-center justify-center py-10">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl sm:text-6xl font-playfair leading-tight">
              <motion.span
                className="inline-block font-vt text-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                Palette🎨
              </motion.span>
              <span className="font-main z-10 block">
                <motion.span
                  className="inline-block font-playfair font-semibold"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  The Job Board
                </motion.span>
                <br />
                <motion.span
                  className="inline-block text-blue-900 font-playfair font-semibold"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                >
                  Built For Researchers
                </motion.span>
              </span>
            </h1>

            <motion.div
              className="mt-6 sm:mt-8 mx-auto max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
            >
              <p className="text-gray-800 text-lg font-light font-main">
                discover over 1000+ professors
              </p>

              <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.button
                  className="font-main rounded-md gap-2 cursor-pointer font-medium text-lg bg-black text-white border border-gray-300 py-2 px-3 inline-flex items-center justify-center whitespace-nowrap"
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
                  className="font-main rounded-md gap-2 cursor-pointer font-medium text-lg bg-white text-gray-900 border border-gray-200 py-2 px-3 inline-flex items-center justify-center hover:bg-gray-50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] whitespace-nowrap"
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
        </div>
      </header>

      <footer className="bg-white font-light border-t mt-12 py-4">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
          <div className="text-sm flex flex-col ">
            <span>Made By Jie Xuan Liu</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
