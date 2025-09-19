import { EditInvoice } from "@/components/EditInvoice"
import prisma from "@/app/utils/db"
import { requireUser } from "@/app/utils/hooks"
import { notFound } from "next/navigation"

async function getData(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    }
  })

  if(!data) {
    return notFound()
  }

  return data
}

// this peace of code is to get userId (Nextjs 15 structure)
// Promise<{ invoiceId: string }> (the invoiceId comes from the file name [invoiceId], has to be the same name)
type Params = Promise<{ invoiceId: string }>

export default async function EditInvoiceRoute({ params } : { params: Params }) {
  
  const { invoiceId } = await params
  const session = await requireUser()

  const data = await getData(invoiceId, session.user?.id as string)

  //console.log(data);
  

  return (
    <div>
      <EditInvoice data={data} />
    </div>
  )
}