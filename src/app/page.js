"use client";

import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  HomeIcon,
  Inbox,
  InboxIcon,
  LogIn,
  Map,
  PanelLeft,
  Pen,
  Pencil,
  PencilRuler,
  Pin,
  Plus,
  Rocket,
  Search,
  Send,
  SendIcon,
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcomponents/ui/tabs";
import { Badge } from "@/shadcomponents/ui/badge";

export default function Home() {
  return (
    <div className="relative flex flex-col bg-white">
      <header className="relative z-10 flex flex-col items-center justify-center py-10">
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
                  className="inline-block font-playfair font-light"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  The Job Board
                </motion.span>
                <br />
                <motion.span
                  className="inline-block text-blue-900 font-playfair font-light"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                >
                  Built For Researchers
                </motion.span>
              </span>
            </h1>

            <motion.div
              className="mx-auto max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
            >
              <p className="text-gray-800 text-md font-light font-main">
                discover, outreach and land research internships with over 1000+
                professors
              </p>

              <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/auth/signin">
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
      <div className="flex flex-wrap gap-6 font-main mb-10 justify-center">
        <div className="w-64 p-6 border rounded-md shadow-md bg-white">
          <h3 className="text-xl font-bold">Integrated projects</h3>
          <p className="text-sm text-gray-600">
            Plan tasks, track progress, and align teams.
          </p>
        </div>

        <div className="w-64 p-6 border rounded-md shadow-md bg-white">
          <h3 className="text-xl font-bold">Collaborative tools</h3>
          <p className="text-sm text-gray-600">
            Enhance teamwork with shared resources and real-time feedback.
          </p>
        </div>

        <div className="w-64 p-6 border rounded-md shadow-md bg-white">
          <h3 className="text-xl font-bold">Analytics & Insights</h3>
          <p className="text-sm text-gray-600">
            Access in-depth analytics to drive data-informed decisions.
          </p>
        </div>

        <div className="w-64 p-6 border rounded-md shadow-md bg-white">
          <h3 className="text-xl font-bold">Seamless integration</h3>
          <p className="text-sm text-gray-600">
            Integrate tools and services for a unified workflow.
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <motion.div
          className="bg-white rounded-sm shadow-2xl overflow-hidden"
          initial={{ opacity: 0 }} // Starting with opacity 0
          animate={{ opacity: 1 }} // Fade in to opacity 1
          transition={{
            delay: 1, // 1 second delay before the animation starts
            duration: 0.6, // 0.6 seconds for the fading animation
            ease: "easeOut", // Smoothing effect
          }}
        >
          <div className="bg-gray-100 border-b border-gray-300 px-4 flex items-center gap-3">
            <div className="flex gap-2">
              <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600"></button>
              <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600"></button>
              <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600"></button>
            </div>

            <div className="flex gap-1 justify-center items-center">
              <PanelLeft className="stroke-1 h-4 w-4" />
              <ChevronLeft className="stroke-1 h-4 w-4" />
              <ChevronRight className="stroke-1 h-4 w-4" />
            </div>

            <div className="flex gap-1 justify-center items-center">
              <div className="bg-white border-x-1 border-gray-300 z-10 px-4 flex items-center relative">
                <span className="text-xs font-main py-1 font-light text-gray-800">
                  🎨 palette
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
          <div className="text-sm flex  gap-4">
            <span>Made By Jie Xuan Liu</span>
            <a className="underline hover:text-blue-700" href="/blog">
              Click Here To Read Engineering Blog Post
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
