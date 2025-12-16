"use client";

import Link from "next/link";
import clsx from "clsx";
import { SetSeen } from "@/app/api/inbox/setSeen";

function formatDate(isoOrDateLike) {
  const d = new Date(isoOrDateLike);
  const date = d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${date} · ${time}`;
}

async function setRead({ threadId, access }) {
  try {
    await SetSeen({ threadId, access });
  } catch (err) {
    console.log(err);
  }
}

const generateColumns = (access) => [
  {
    accessorKey: "name",
    header: () => <div className="h-3" />,
    cell: ({ row }) => {
      const data = row.original || {};
      console.log(data);
      const name = data.name || "Untitled";
      const email = data.email || "no email";
      const unread = data.unread;
      const subject = data.subject || "No subject";
      const href = `/inbox/thread?id=${data.thread_id}&name=${encodeURIComponent(
        name
      )}&email=${encodeURIComponent(email)}`;

      // Hook up the set read function so that when you click it, it sets unread to be false instead of true
      return (
        <Link
          href={href}
          className={clsx(
            "group flex min-w-0 items-center",
            "rounded-md px-2 py-2 transition-colors",
            "focus:bg-neutral-100/80 focus:outline-none",
            !unread ? "bg-gray-100" : "bg-transparent"
          )}
        >
          <div className="flex w-full min-w-0 items-center gap-3">
            <div>
              {unread && (
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              )}
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-medium text-[13px] text-neutral-900">
                  {name}
                </span>
                <span className="flex-shrink-0 text-[11px] text-neutral-500">
                  {formatDate(data.sent_at)}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[12px] text-neutral-600 min-w-0">
                <span className="truncate">{subject}</span>
                <span className="hidden md:inline-flex text-neutral-300">
                  •
                </span>
                <span className="hidden md:inline truncate text-neutral-500">
                  {email}
                </span>
              </div>
            </div>
          </div>
        </Link>
      );
    },
  },
];

export default generateColumns;
