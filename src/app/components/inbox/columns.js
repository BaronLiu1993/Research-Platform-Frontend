"use client";

import Link from "next/link";
import clsx from "clsx";
import { Mail, Send } from "lucide-react";

const generateColumns = () => [
  {
    accessorKey: "name",
    header: () => <div className="h-3" />,
    cell: ({ row }) => {
      const data = row.original || {};
      const name = data.name || "Untitled";
      const email = data.email || "no-email";
      const subject = data.subject || "No subject";
      const href = `/inbox/thread?id=${data.thread_id}&name=${encodeURIComponent(
        name
      )}`;

      return (
        <Link
          href={href}
          className={clsx(
            "group flex min-w-0 items-center",
            "rounded-md px-2 py-2 transition-colors",
            "focus:bg-neutral-100/80 focus:outline-none",
            "hover:text-blue-800"
          )}
        >
          <div className="flex w-full min-w-0 items-center gap-3">
            <Mail className="stroke-2 w-5 h-5" />

            <div className="flex min-w-0 flex-col">
              <div className="flex min-w-0 items-center justify-between text-[13px] leading-tight text-neutral-900">
                <div className="flex gap-10">
                  <div>
                    <span className="truncate font-medium">{name}</span>
                    <span className="mx-2 text-neutral-300">•</span>
                    <span className="truncate text-neutral-600">{email}</span>
                  </div>
                  <span className="line-clamp-1">{subject}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    },
  },
];

export default generateColumns;
