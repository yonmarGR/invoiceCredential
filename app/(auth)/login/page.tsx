"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/SubmitButtons";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/app/utils/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import Link from "next/link";
import { loginUser } from "@/app/actions";
import { useActionState, useState } from "react";
import { PasswordInput } from "@/components/PasswordInput";

//mail iron@mail.com
//password Iron1234*

export default function LoginPage() {
  const [lastResult, formAction] = useActionState(loginUser, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: loginSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Log using the form below
            </CardDescription>
          </CardHeader>
          <CardContent>

            {form.errors && form.errors.length > 0 && (
              <div className="mb-4 p-3 text-sm text-destructive bg-destructive/15 rounded-md">
                {form.errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}

            <form
              onSubmit={form.onSubmit}
              action={formAction}
              id={form.id}
              className="grid gap-4 mb-2"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name={fields.email.name}
                  type="email"
                  placeholder="your@email.com"
                  required
                  key={fields.email.key}
                />
                <p className="text-sm text-destructive">
                  {fields.email.errors}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  name={fields.password.name}
                  placeholder="••••••••"
                  required
                  key={fields.password.key}
                />
                <p className="text-sm text-destructive">
                  {fields.password.errors}
                </p>
              </div>
              <SubmitButton text="Sign in" />
            </form>


            {/* <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
              className="flex flex-col gap-y-4 mb-2"
            >
              <GoogleAuthButton />
            </form>
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
              className="flex flex-col gap-y-4"
            >
              <GitHubAuthButton />
            </form> */}


            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="underline">
                Register here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
