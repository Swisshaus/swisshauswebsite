import { CMS_NAME } from "@/lib/constants";
import Link from "next/link";

export function Navbar() {
  return (
    <section className="h-16 bg-background/60 sticky top-0 border-b px-8 backdrop-blur flex items-center justify-between flex-col md:flex-row flex items-center md:justify-between mt-2 mb-16 md:mb-12">
     

      <h1 className="float-left text-5xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8">
                {/* Logo */}
                <Link href="/" className="hover:underline float-start">
                <svg width="30" height="30" viewBox="0 0 172 184" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Frame 1">
                  <g id="cross">
                    <rect id="vert" x="62" y="23" width="47" height="138" fill="#FF0000" />
                    <rect id="horiz" x="17" y="115" width="47" height="138" transform="rotate(-90 17 115)" fill="#FF0000" />
                  </g>
                </g>
              </svg></Link>
        <Link href="/" className="hover:underline float-start">swisshaus</Link>
      </h1>
      
      <h4 className="text-center md:text-left text-lg mt-5 m-3 md:pl-8">
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
