import { z } from 'zod/v4'

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required").min(6, "Password must be more than 6 characters").max(32, "Password must be less than 32 characters"),
})

export const registerSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required").min(6, "Password must be more than 6 characters").max(32, "Password must be less than 32 characters"),
  firstName: z.string().min(1, "Name is required").max(32, "Name must be less than 32 characters"),
})

export const onboardingSchema = z.object({
  firstName: z.string().min(2, "F N atleast 2 characteres"),
  lastName: z.string().min(2, "L N atleast 2 characteres"),
  address: z.string().min(2, "Field atleast 2 characteres"),
});

export const invoiceSchema = z.object({
  invoiceName: z.string().min(1, "Invoice Name is required"),
  total: z.number().min(1,"1$ is minimum"),
  status: z.enum(["PAID", "PENDING"]).default("PENDING"),
  date: z.string().min(1, "Date is required"),
  dueDate: z.number().min(0, "Due day is required"),
  fromName: z.string().min(1, "Your name is required"),
  fromEmail: z.string().email("Invalid email address"),
  fromAddress: z.string().min(1, "Your address is required"),
  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Client email address is required"),
  clientAddress: z.string().min(1, "Client address is required"),
  currency: z.string().min(1, "Currency is required"),
  invoiceNumber:  z.number().min(1,"Minimum invoice number of 1"),
  note: z.string().optional(),
  invoiceItemDescription: z.string().min(1, "Description is required"),
  invoiceItemQuantity: z.number().min(1, "Quantity mimum 1"),
  invoiceItemRate: z.number().min(1, "Rate min 1"),
})