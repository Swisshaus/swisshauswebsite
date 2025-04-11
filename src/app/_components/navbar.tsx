import { CMS_NAME } from "@/lib/constants";
import Link from "next/link";

export function Navbar() {
  return (
    <section className="h-16 bg-background/60 sticky top-0 border-b px-8 backdrop-blur flex items-center justify-betweenflex-col md:flex-row flex items-center md:justify-between mt-2 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8">
      <Link href="/" className="hover:underline">➕ swisshaus</Link>
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        <ul className='hidden md:flex w-full justify-end items-center space-x-4'>
        <li><Link href="/" className="hover:underline">Home</Link></li>
        <li><Link href="/about" className="hover:underline">About</Link></li>
        <li>
        </li>
    </ul>


      </h4>
    </section>
  );
}
