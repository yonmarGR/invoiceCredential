"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/SubmitButtons";
import { useActionState } from "react";
import { onboardUser } from "@/app/actions";
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4";
import { onboardingSchema } from "@/app/utils/zodSchemas";
//import { requireUser } from "@/app/utils/hooks";

interface iAppProps {
  firstName: string,
}

export default function Onboarding(props: iAppProps) {

 // const session = await requireUser()

  // antes de react 19 se utilizaba useFormState
  const [lastResult, formAction] = useActionState(onboardUser, undefined)
  const [form, fields] = useForm({
    lastResult,

    onValidate({formData}) {
      return parseWithZod(formData, {
        schema: onboardingSchema
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
                    //defaultValue={firstName}
                  />
                  <p className='text-red-500 text-sm'>{fields.firstName.errors}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <Label>Last Name</Label>
                  <Input 
                    name={fields.lastName.name}
                    key={fields.lastName.key}
                    defaultValue={fields.lastName.initialValue}
                    placeholder='Doe' 
                  />
                  <p className='text-red-500 text-sm'>{fields.lastName.errors}</p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <Label>Address</Label>
                <Input 
                  name={fields.address.name}
                  key={fields.address.key}
                  defaultValue={fields.address.initialValue}
                  placeholder='Chad street 123' 
                />
                <p className='text-red-500 text-sm'>{fields.address.errors}</p>
              </div>

              <SubmitButton 
                text='Finish onboarding' 
              />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}