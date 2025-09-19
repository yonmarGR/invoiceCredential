import { SubmitButton } from "@/components/SubmitButtons"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import PaidGif from "@/public/paid-gif.gif"
import { MarkAsPaidAction } from "@/app/actions"
import prisma from "@/app/utils/db"
import { redirect } from "next/navigation"
import { requireUser } from "@/app/utils/hooks"
import { buttonVariants } from "@/components/ui/button"

async function Authorize(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId
    }
  })

  if(!data) {
    return redirect("/dashboard/invoices")
  }
}

//the Params Promise invoiceId name, comes from the file name.
type Params = Promise<{ invoiceId: string }>

export default async function MarkAsPaid({
  params,
}: {
  params: Params
}) {

  const session = await requireUser()
  const { invoiceId } = await params

  await Authorize(invoiceId, session.user?.id as string)

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Mark as Paid</CardTitle>
          <CardDescription>Mark this Invoice as paid?</CardDescription>
        </CardHeader>
        <CardContent>
          <Image 
            src={PaidGif}
            alt="Paid Gif"
            unoptimized
            className="rounded-lg"
          />
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Link
            href="/dashboard/invoices"
            className={buttonVariants({variant: "outline"})}
          >
            Cancel
          </Link>
          <form action={async () => {
            "use server"
            await MarkAsPaidAction(invoiceId)
          }}>
            <SubmitButton text="Paid"/>
          </form>
        </CardFooter>
      </Card>
    </div>

  )
}