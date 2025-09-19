import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { formatCurrency } from "@/app/utils/formatCurrency";

async function getData(userId: string) {
  const [data, openInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: userId
      },
      select: {
        total: true
      }
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PENDING"
      },
      select: {
        id: true
      }
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PAID"
      },
      select: {
        id: true
      }
    })
  ])

  return {
    data,
    openInvoices,
    paidInvoices
  }
}

export async function DashboardBlocks() {
  const session = await requireUser()

  const { data, openInvoices, paidInvoices } = await getData(
    session.user?.id as string
  )

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0">
          <CardTitle className="text-sm font-medium">Total revenue</CardTitle>
          <DollarSign className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent >
          <h2 className="text-2xl font-bold">
            {formatCurrency({
              amount: data.reduce((acc, invoice) => acc + invoice.total, 0),
              currency: "USD"
            })}
          </h2>
          <p className="text-xs text-muted-foreground">
            Based on Total volume
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center space-y-0">
          <CardTitle className="text-sm font-medium">Total Invoices issued</CardTitle>
          <Users className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent >
          <h2 className="text-2xl font-bold">
            {data.length}
          </h2>
          <p className="text-xs text-muted-foreground">
            Total invoices Issued!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center space-y-0">
          <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
          <CreditCard className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent >
          <h2 className="text-2xl font-bold">
            {paidInvoices.length}
          </h2>
          <p className="text-xs text-muted-foreground">
            Tatal invoices that has been paid!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center space-y-0">
          <CardTitle className="text-sm font-medium">Pending invoices</CardTitle>
          <Activity className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent >
          <h2 className="text-2xl font-bold">
            {openInvoices.length}
          </h2>
          <p className="text-xs text-muted-foreground">
            Total open invoices!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}