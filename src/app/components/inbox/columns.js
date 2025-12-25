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

async function markSeen({ threadId, access, status }) {
  try {
    if (status == true) {
      await SetSeen({ threadId, access });
    } else {
      return;
    }
  } catch (err) {
    
  }
}

const generateColumns = (access) => [
  {
    accessorKey: "name",
    header: () => <div className="h-3" />,
    cell: ({ row }) => {
      const data = row.original || {};
      const name = data.name || "Untitled";
      const email = data.email || "no email";
      const subject = data.subject || "No subject";
      const seen =
        typeof data.seen === "boolean" ? data.seen : !Boolean(data.unread);
      const unread = !seen;
      const threadId = data.thread_id;

      const href = `/inbox/thread?id=${data.thread_id}&name=${encodeURIComponent(
        name
      )}&email=${encodeURIComponent(email)}`;

      return (
        <Link
          href={href}
          className={clsx(
            "group flex min-w-0 items-center rounded-md px-2 py-2 transition-colors",
            "focus:outline-none"
          )}
          onClick={async () =>
            await markSeen?.({ threadId, access, status: unread })
          }
        >
          <div className="flex w-full min-w-0 items-center gap-3">
            <div className="w-3 flex items-center justify-center">
              {unread ? (
                <div className="h-2 w-2 rounded-full bg-blue-500" />
              ) : (
                <div className="h-2 w-2 rounded-full bg-transparent" />
              )}
            </div>

            <div className="flex-1 min-w-0 flex flex-col gap-0.5">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={clsx(
                    "truncate text-[13px]",
                    unread
                      ? "font-semibold text-neutral-900"
                      : "font-light text-neutral-500"
                  )}
                >
                  {name}
                </span>

                <span
                  className={clsx(
                    "flex-shrink-0 text-[11px]",
                    unread ? "text-neutral-700" : "text-neutral-400"
                  )}
                >
                  {formatDate(data.sent_at)}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[12px] min-w-0">
                <span
                  className={clsx(
                    "truncate",
                    unread
                      ? "text-neutral-800 font-medium"
                      : "text-neutral-400 font-light"
                  )}
                >
                  {subject}
                </span>

                <span className="hidden md:inline-flex text-neutral-300">
                  •
                </span>

                <span
                  className={clsx(
                    "hidden md:inline truncate",
                    unread ? "text-neutral-500" : "text-neutral-400"
                  )}
                >
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
