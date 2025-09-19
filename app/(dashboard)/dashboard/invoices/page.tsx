import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { EmptyState } from "@/components/EmptyState";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns, Invoice } from "./columns"
import { DataTable } from '@/components/DataTable';
import { PlusIcon } from "lucide-react";
import Link from "next/link";

async function getData(userId: string): Promise<Invoice[]> {
  // Fetch data from your API here.
  
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      total: true,
      createdAt: true,
      date: true,
      status: true,
      invoiceNumber: true,
      currency: true,
    },
  });

  return data;
}

export default async function InvoicesRoute() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          title="No invoices found"
          description="Create an invoice to see it right here"
          buttontext="Create Invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
                  <CardDescription>
                    Manage your Invoices right here
                  </CardDescription>
                </div>
                <Link
                  href="/dashboard/invoices/create"
                  className={buttonVariants({})}
                >
                  <PlusIcon className="" />{" "}
                  <span className="">Create Invoice</span>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={columns} 
                data={data} 
              />
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}
