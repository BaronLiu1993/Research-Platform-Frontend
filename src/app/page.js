"use client";

import { useState } from "react";

import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  HomeIcon,
  Inbox,
  InboxIcon,
  Layers,
  LogIn,
  LucideHome,
  Map,
  PanelLeft,
  Pen,
  PenBox,
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
import { Separator } from "@/shadcomponents/ui/separator";

const stages = [
  {
    id: "ideate",
    icon: <HomeIcon className="text-blue-700 h-10 w-10" />,
    title: "Ideate",
    description: "Go from idea to plan faster with AI help.",
  },
  {
    id: "fundraise",
    icon: <BarChart3 className="text-blue-700 h-10 w-10" />,
    title: "Fundraise",
    description: "From pitch to close, organized in Notion.",
  },
  {
    id: "build",
    icon: <Map className="text-blue-700 h-10 w-10" />,
    title: "Build",
    description: "Ship and iterate rapidly.",
  },
  {
    id: "launch",
    icon: <Rocket className="text-blue-700 h-10 w-10" />,
    title: "Launch",
    description: "Plan and collaborate in one place.",
  },
];

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
      <div className="w-full max-w-5xl mx-auto border rounded-sm">
        <div className="bg-white rounded-sm shadow-2xl overflow-hidden">
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
        </div>
      </div>

      <div className="flex flex-col mt-20 px-6 items-center">
        <h1 className="text-5xl font-playfair mb-6 flex flex-col">
          <motion.span
            className="inline-block font-playfair font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          >
            Land Your
          </motion.span>
          <br className="sm:hidden" />
          <motion.span
            className="inline-block font-playfair font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          >
            Dream Research Internship
          </motion.span>
        </h1>

        <div className="w-full max-w-5xl">
          <Tabs defaultValue="discover" className="w-full">
            <TabsList
              className="
    grid w-full bg-transparent p-0
    grid-cols-2 sm:grid-cols-4 gap-3
    [&>*]:w-full [&>*]:h-full
  "
            >
              <TabsTrigger
                value="discover"
                className="
      flex flex-col items-start justify-start gap-2
      bg-gray-100 rounded-lg p-4
      transition-all duration-200 border cursor-pointer
      hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-transform
      data-[state=active]:bg-white data-[state=active]:border-gray-200 data-[state=active]:shadow-lg
      w-full h-full min-w-0
    "
              >
                <Search className="text-blue-700 h-5 w-5 shrink-0" />
                <div className="text-2xl sm:text-3xl text-black font-playfair leading-tight">
                  Discover
                </div>
                <div className="text-sm font-light text-gray-700">
                  Find 1000+ professors!
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="draft"
                className="
      flex flex-col items-start justify-start gap-2
      bg-gray-100 rounded-lg p-4
      transition-all duration-200 border cursor-pointer
      hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-transform
      data-[state=active]:bg-white data-[state=active]:border-gray-200 data-[state=active]:shadow-lg
      w-full h-full min-w-0
    "
              >
                <Pen className="text-blue-700 h-5 w-5 shrink-0" />
                <div className="text-2xl sm:text-3xl text-black font-playfair leading-tight">
                  Draft
                </div>
                <div className="text-sm font-light text-gray-700">
                  Save and track professors.
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="send"
                className="
      flex flex-col items-start justify-start gap-2
      bg-gray-100 rounded-lg p-4
      transition-all duration-200 border cursor-pointer
      hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-transform
      data-[state=active]:bg-white data-[state=active]:border-gray-200 data-[state=active]:shadow-lg
      w-full h-full min-w-0
    "
              >
                <SendIcon className="text-blue-700 h-5 w-5 shrink-0" />
                <div className="text-2xl sm:text-3xl text-black font-playfair leading-tight">
                  Send
                </div>
                <div className="text-sm font-light text-gray-700">
                  Personalize and send emails.
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="inbox"
                className="
      flex flex-col items-start justify-start gap-2
      bg-gray-100 rounded-lg p-4
      transition-all duration-200 border cursor-pointer
      hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-transform
      data-[state=active]:bg-white data-[state=active]:border-gray-200 data-[state=active]:shadow-lg
      w-full h-full min-w-0
    "
              >
                <Inbox className="text-blue-700 h-5 w-5 shrink-0" />
                <div className="text-2xl sm:text-3xl text-black font-playfair leading-tight">
                  Inbox
                </div>
                <div className="text-sm font-light text-gray-700">
                  Focused emails from profs.
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="discover" className="mt-6">
              <div className="mx-auto w-full max-w-5xl mt-20">
                <div className="flex items-stretch rounded-xl border shadow-sm overflow-hidden min-h-[34rem] sm:min-h-[38rem]">
                  <div className="w-full sm:w-[26rem] bg-white">
                    <div className="flex flex-col justify-between gap-2 p-6">
                      <Badge className="bg-[#E7F3F8] text-[#337EA9] w-fit">
                        <Pin />
                        Job Board
                      </Badge>
                      <h1 className="font-main text-2xl font-semibold">
                        Professors Across 10+ Disciplines—From UHN to UofT
                        Engineering
                      </h1>
                      <motion.button
                        className="font-main w-fit rounded-md gap-2 cursor-pointer font-medium text-xs bg-blue-700 text-white border border-gray-200 py-2 px-3 inline-flex items-center justify-center hover:bg-blue-600 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] whitespace-nowrap"
                        role="button"
                        aria-label="Sign Up for Drafts Tab"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Pencil className="stroke-1 h-5 w-5" />
                        <Link href="/auth/signup">Sign Up Now!</Link>
                      </motion.button>
                    </div>
                    <div className="divide-y">
                      <div className="font-main font-light p-5">
                        Search by Research Interests!
                      </div>
                      <div className="font-main font-light p-5">
                        Filter by School and Faculty!
                      </div>
                      <div className="font-main font-light p-5">
                        Get Recommended Professors that Match You!
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block flex-1 bg-blue-700">
                    <div className="w-full h-full" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="draft" className="mt-6 ">
              <div className="mx-auto w-full max-w-5xl mt-20">
                <div className="flex items-stretch rounded-xl border shadow-sm overflow-hidden min-h-[34rem] sm:min-h-[38rem]">
                  <div className="w-full sm:w-[26rem] bg-white">
                    <div className="flex flex-col justify-between gap-2 p-6">
                      <Badge className="bg-[#E7F3F8] text-[#337EA9] w-fit">
                        <PencilRuler />
                        Drafts
                      </Badge>
                      <h1 className="font-main text-2xl font-semibold">
                        Automate Saving Professors All In One Place
                      </h1>
                      <motion.button
                        className="font-main w-fit rounded-md gap-2 cursor-pointer font-medium text-xs bg-pink-700 text-white border border-gray-200 py-2 px-3 inline-flex items-center justify-center hover:bg-pink-600 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] whitespace-nowrap"
                        role="button"
                        aria-label="Sign Up for Drafts Tab"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Pencil className="stroke-1 h-5 w-5" />
                        <Link href="/auth/signup">Sign Up Now!</Link>
                      </motion.button>
                    </div>
                    <div className="divide-y">
                      <div className="font-main font-light p-5">
                        Save Professors to Workspace
                      </div>
                      <div className="font-main font-light p-5">
                        Track Email Status
                      </div>
                      <div className="font-main font-light p-5">
                        Get Professor Information All In One Place
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block flex-1 bg-pink-700">
                    <div className="w-full h-full" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="send" className="mt-6">
              <div className="mx-auto w-full max-w-5xl mt-20">
                <div className="flex items-stretch rounded-xl border shadow-sm overflow-hidden min-h-[34rem] sm:min-h-[38rem]">
                  <div className="w-full sm:w-[26rem] bg-white">
                    <div className="flex flex-col justify-between gap-2 p-6">
                      <Badge className="bg-[#E7F3F8] text-[#337EA9] w-fit">
                        <Send />
                        Send
                      </Badge>
                      <h1 className="font-main text-2xl font-semibold">
                        Streamline Cold Outreach—Send 5+ Personalised Emails At
                        Once
                      </h1>
                      <motion.button
                        className="font-main w-fit rounded-md gap-2 cursor-pointer font-medium text-xs bg-orange-700 text-white border border-gray-200 py-2 px-3 inline-flex items-center justify-center hover:bg-orange-600 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] whitespace-nowrap"
                        role="button"
                        aria-label="Sign Up for Drafts Tab"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Pencil className="stroke-1 h-5 w-5" />
                        <Link href="/auth/signup">Sign Up Now!</Link>
                      </motion.button>
                    </div>
                    <div className="divide-y">
                      <div className="font-main font-light p-5">
                        Work with Custom Snippets with Professor Data Built In
                      </div>
                      <div className="font-main font-light p-5">
                        Review Emails Before Sending
                      </div>
                      <div className="font-main font-light p-5">
                        Track If Professors Left You On Seen
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block flex-1 bg-orange-700">
                    <div className="w-full h-full" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inbox" className="mt-6">
              <div className="mx-auto w-full max-w-5xl mt-20">
                <div className="flex items-stretch rounded-xl border shadow-sm overflow-hidden min-h-[34rem] sm:min-h-[38rem]">
                  <div className="w-full sm:w-[26rem] bg-white">
                    <div className="flex flex-col justify-between gap-2 p-6">
                      <Badge className="bg-[#E7F3F8] text-[#337EA9] w-fit">
                        <InboxIcon />
                        Inbox
                      </Badge>
                      <h1 className="font-main text-2xl font-semibold">
                        Get Focused Inbox of Emails From Professors
                      </h1>
                      <motion.button
                        className="font-main w-fit rounded-md gap-2 cursor-pointer font-medium text-xs bg-green-700 text-white border border-gray-200 py-2 px-3 inline-flex items-center justify-center hover:bg-green-600 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] whitespace-nowrap"
                        role="button"
                        aria-label="Sign Up for Drafts Tab"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Pencil className="stroke-1 h-5 w-5" />
                        <Link href="/auth/signup">Sign Up Now!</Link>
                      </motion.button>
                    </div>
                    <div className="divide-y">
                      <div className="font-main font-light p-5">
                        Focus Only On Emails From Professors
                      </div>
                      <div className="font-main font-light p-5">
                        Includes Read Receipts from Professors
                      </div>
                      <div className="font-main font-light p-5">
                        Reply and Use the Inbox Just Like You Would Gmail
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block flex-1 bg-green-700">
                    <div className="w-full h-full" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
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
