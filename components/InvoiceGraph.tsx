import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Graph } from "./Graph";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";

async function getInvoices(userId: string) {
  const rawData = await prisma.invoice.findMany({
    where: {
      status: "PAID",
      userId: userId,
      createdAt: {
        lte: new Date(),
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) //this is to calculate 30 days ago 
      }
    },
    select: {
      createdAt: true,
      total: true
    },
    orderBy: {
      createdAt: "asc"
    }  
  })

  //Group and aggregate data by date
  const aggregatedData = rawData.reduce(
    (acc: {[key: string]: number}, curr) => {
      const date = new Date(curr.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      })

      acc[date] = (acc[date] || 0) + curr.total

      return acc
    }, {} 
  )

  //convert to array and format the object
  const transformedData = Object.entries(aggregatedData)
    .map(([date, amount]) => ({
      date,
      amount,
      originalDate: new Date(date + ", " + new Date().getFullYear()),
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, amount }) => ({
      date,
      amount
    }))

  return transformedData
}

export async function InvoiceGraph() {
  const session = requireUser()

  const data = await getInvoices((await session).user?.id as string)
  //console.log(data);
  
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
         Invoices which have been paid in the last 30 days
        </CardDescription>
        <CardContent>
          <Graph data={data}/>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
