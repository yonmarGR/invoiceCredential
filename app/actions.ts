"use server"

import prisma from "./utils/db";
import { parseWithZod } from "@conform-to/zod/v4";
import { invoiceSchema, loginSchema, onboardingSchema, registerSchema } from "./utils/zodSchemas";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "./utils/auth";
import { requireUser } from "./utils/hooks";


export async function registerUser(prevState: any, formData: FormData) {

  const submission = parseWithZod(formData, {
    schema: registerSchema,
  });

  if(submission.status !== "success") {
    return submission.reply();
  }

  const hashedPassword = await bcrypt.hash(submission.value.password, 10);

  const data = await prisma.user.create({
    
    data: {
      firstName: submission.value.firstName,
      password: hashedPassword,
      email: submission.value.email,
    },
  });

  return redirect("/login");
}

export async function loginUser(prevState: any, formData: FormData) {
  
  const submission = await parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  
    const { email, password } = submission.value;
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

   if (response?.error) {
    return submission.reply({
      formErrors: ["Invalid email or password"],
    });
  }

  // If we get here, authentication was successful
  return redirect("/dashboard");
  
}

export async function signInWithGoogle() {
  try {
    await signIn("google");
  } catch (error) {
    console.error("Google sign-in failed:", error);
    throw error; // Or return a custom error object
  }
}

export async function signInWithGitHub() {
  try {
    await signIn("gitHub");
  } catch (error) {
    console.error("gitHub sign-in failed:", error);
    throw error; // Or return a custom error object
  }
}

export async function onboardUser(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: onboardingSchema,
  });

  if(submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  return redirect("/dashboard");
}

export async function createInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.create({
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
      userId: session.user?.id,
    },
  });

  // const sender = {
  //   email: "hello@demomailtrap.com",
  //   name: "Je Ri",
  // };

  // emailClient.send({
  //   from: sender,
  //   to: [{ email: "yonmarguevara@gmail.com" }],
  //   template_uuid: "6903c768-3acd-4032-ba3d-5b285541369e",
  //   template_variables: {
  //     clientName: submission.value.clientName,
  //     invoiceNumber: submission.value.invoiceNumber,
  //     invoiceDueDate: new Intl.DateTimeFormat("en-US", {
  //       dateStyle: "long",
  //     }).format(new Date(submission.value.date)),
  //     invoiceAmount: formatCurrency({
  //       amount: submission.value.total,
  //       currency: submission.value.currency as any,
  //     }),
  //     invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
  //   },
  // });

  return redirect("/dashboard/invoices");
}

export async function editInvoice(prevState: any, formData: FormData) {
  const session = await requireUser()

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  })

  if(submission.status !== "success") {
    return submission.reply()
  }

  const data = await prisma.invoice.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
    },
  })

  // const sender = {
  //   email: "hello@demomailtrap.com",
  //   name: "Je Ri",
  // };

  // emailClient.send({
  //   from: sender,
  //   to: [{ email: "yonmarguevara@gmail.com" }],
  //   template_uuid: "f65d3cd5-0a72-4602-80f1-b246429ee095",
  //   template_variables: {
  //     clientName: submission.value.clientName,
  //     invoiceNumber: submission.value.invoiceNumber,
  //     invoiceDueDate: new Intl.DateTimeFormat("en-US", {
  //       dateStyle: "long",
  //     }).format(new Date(submission.value.date)),
  //     invoiceAmount: formatCurrency({
  //       amount: submission.value.total,
  //       currency: submission.value.currency as any,
  //     }),
  //     invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
  //   },
  // });

  return redirect("/dashboard/invoices")
}

export async function DeleteInvoice(invoiceId: string) {
  const session = await requireUser()

  const data = await prisma.invoice.delete({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    }
  })

  return redirect("/dashboard/invoices")
}

export async function MarkAsPaidAction(invoiceId: string){
  const session = await requireUser()

  const data = await prisma.invoice.update({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
    data: {
      status: "PAID"
    }
  })

  return redirect("/dashboard/invoices")
}

