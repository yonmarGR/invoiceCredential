import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png"
import { buttonVariants } from "./ui/button";

export function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Link 
        href="/"
        className="flex items-center gap-2"
      >
        <Image 
          src={Logo}
          alt="Logo image"
          className="size-10"
        />
        <h3>Invoice</h3>
      </Link>
      <Link
        href="/login"
        className={buttonVariants()}
      >
        Get started
      </Link>
    </div>
  )
}