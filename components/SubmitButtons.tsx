"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import GoogleLogo from "@/public/google-tile.svg"
import GitHubLogo from "@/public/icons8-github.svg"
import { useFormStatus } from "react-dom"
import { cn } from "@/lib/utils";

interface iAppProps {
  text: string
  variant?: 
    | "default" 
    | "link" 
    | "destructive" 
    | "outline" 
    | "secondary" 
    | "ghost" 
    | null 
    | undefined
  className?: string
  disabled?: boolean
}

export function SubmitButton({ text, variant, className, disabled }: iAppProps) {
    const { pending } = useFormStatus()

  return (
     <Button 
      type='submit'
      variant={variant}
      className={cn('w-full', className)}
      disabled={pending || disabled}
    >
      {pending && <Loader2 className='size-4 mr-2 animate-spin' />}
      {pending ? "Please wait..." : text}
    </Button>
  )
}

export function GoogleAuthButton() {
  const {pending} = useFormStatus()

  return (
    <>
      { pending ? (
        <Button 
          disabled
          variant="outline"
          className="w-full"
        >
            <Loader2 className="size-4 mr-2 animate-spin" />
            Please wait
        </Button>
      ): (
        <Button 
          variant="outline"
          className="w-full"
        >
          <Image 
            src={GoogleLogo}
            alt="GoogleLogo"
            className="size-4 mr-2"
          />
          Sign in with Google
        </Button>
      )}
    </>
  )
}

export function GitHubAuthButton() {
  const {pending} = useFormStatus()

  return (
    <>
      { pending ? (
        <Button 
          disabled
          variant="outline"
          className="w-full"
        >
            <Loader2 className="size-4 mr-2 animate-spin" />
            Please wait
        </Button>
      ): (
        <Button 
          variant="outline"
          className="w-full"
        >
          <Image 
            src={GitHubLogo}
            alt="GitHubLogo"
            className="size-4 mr-2"
          />
          Sign in with Github
        </Button>
      )}
    </>
  )
}