"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4";
import { SubmitButton } from "@/components/SubmitButtons";
import { registerUser } from "@/app/actions";
import { registerSchema } from "@/app/utils/zodSchemas";
import Link from "next/link";

export default function RegisterPage() {

  const [lastResult, formAction] = useActionState(registerUser, undefined)
  const [form, fields] = useForm({
    lastResult,

    onValidate({formData}) {
      return parseWithZod(formData, {
        schema: registerSchema
      })
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput'
  })

  return (
    <>
      <div className='flex h-screen w-full items-center justify-center px-4'>
        <Card className='w-full max-w-sm'>
          <CardHeader>
            <CardTitle className='text-xl'>You're almost fished!</CardTitle>
            <CardDescription>
              Enter your info to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form 
              action={formAction}
              id={form.id}
              onSubmit={form.onSubmit}
              noValidate
              className='grid gap-4'
            >
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                  <Label>First Name</Label>
                  <Input 
                    name={fields.firstName.name}
                    key={fields.firstName.key}
                    placeholder='Jhon' 
                  />
                  <p className='text-red-500 text-sm'>{fields.firstName.errors}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <Label>Email</Label>
                  <Input
                    type="email" 
                    name={fields.email.name}
                    key={fields.email.key}
                    placeholder='doe@mail.com' 
                  />
                  <p className='text-red-500 text-sm'>{fields.email.errors}</p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Password</Label>
                <Input 
                  type="password"
                  name={fields.password.name}
                  key={fields.password.key}
                  placeholder='Chad street 123' 
                />
                <p className='text-red-500 text-sm'>{fields.password.errors}</p>
              </div>

              <SubmitButton 
                text='Finish Register' 
              />
            </form>
            <div className="mt-4 text-center text-sm">
              Already had an account?{" "}
              <Link href="/login" className="underline">
                Login here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}