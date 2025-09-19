import prisma from "@/app/utils/db"
import { requireUser } from "@/app/utils/hooks"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect } from "next/navigation"
import WarningGif from "@/public/warning-gif.gif"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { SubmitButton } from "@/components/SubmitButtons"
import { DeleteInvoice } from "@/app/actions"

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

export default async function DeleteInvoiceRoute({
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
          <CardTitle>Delete Invoice</CardTitle>
          <CardDescription>Do you want to delete this Invoice?</CardDescription>
        </CardHeader>
        <CardContent>
          <Image 
            src={WarningGif}
            alt="Warning Gif"
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
            await DeleteInvoice(invoiceId)
          }}>
            <SubmitButton text="Delete" variant={"destructive"}/>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}