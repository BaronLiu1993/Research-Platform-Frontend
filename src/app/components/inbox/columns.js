"use client";

import { Checkbox } from "@/shadcomponents/ui/checkbox";
import Link from "next/link";

const generateColumns = (
  access,
  onRemove,
  pendingDelete,
  handleSelectedRows,
  userName,
  userEmail,
  selectedRows = []
) => [
  {
    accessorKey: "checkbox",
    header: ({ column }) => <Checkbox />,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <>
          <Checkbox />
        </>
      );
    },
    size: 280,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <div></div>,
    cell: ({ row }) => {
      const data = row.original || {};
      return (
        <Link
          href={`/inbox/thread?id=${data.thread_id}&name=${data.name}`}
          className="flex min-w-0"
        >
          <div className="flex flex-col w-full py-2.5 group pr-4 hover:bg-gray-50 hover:shadow-[0_6px_15px_0_rgba(0,0,0,0.15)] -mx-3 px-3 rounded-md transition-all duration-200">
            <div className="flex items-center space-x-3 min-w-0">
              <h1 className="text-xs font-medium text-black">
                {data.name || "No name"}
              </h1>
              <h1 className="text-xs font-medium text-[#37352F]">
                {data.email || "No email"}
              </h1>
              <h1 className="text-xs font-light text-[#37352F]">
                {data.subject || "No subject"}
              </h1>
            </div>
          </div>
        </Link>
      );
    },
  },
];

export default generateColumns;
