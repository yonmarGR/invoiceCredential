"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  CheckCircle,
  DownloadCloudIcon,
  Mail,
  PencilIcon,
  Trash,
} from "lucide-react";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { InvoiceActions } from "@/components/InvoiceActions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Invoice = {
  id: string,
  clientName: string,
  total: number,
  createdAt: Date,
  date: Date,
  invoiceNumber: number,
  status: "PAID" | "PENDING";
};




export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoiceNumber",
    header: "ID",
  },
  {
    accessorKey: "clientName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ClientName
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  
  {
    accessorKey: "total",
    header: () => <div className="text-right">total</div>,
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(total);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Created</div>,
    cell: ({ row }) => {
      const date = row.getValue("createdAt");
      return (
        <div className="text-right">
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
          }).format(new Date(date as string))}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: () => <div className="text-right">Pay day</div>,
    cell: ({ row }) => {
      const date = row.getValue("date");
      return (
        <div className="text-right">
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
          }).format(new Date(date as string))}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <div
          className={cn(
            `p-1 rounded-md w-max text-xs`,
            status === "PENDING" && "bg-yellow-400",
            status === "PAID" && "bg-green-500"
          )}
        >
          {status as string}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const invoice = row.original;

      return (
        <InvoiceActions 
          id={invoice.id}
          status={invoice.status}
        />
      );
    },
  },
];
