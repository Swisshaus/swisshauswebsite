'use client';
import Container from "@/app/components/container";
import Link from "next/link";
import { useThemeContext } from "../contexts/ThemeContext";



export function Footer() {
  const { isDarkMode } = useThemeContext();
  
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-dark-bg dark:border-slate-700">
      <Container>
        <div className="py-10 flex flex-col lg:flex-row items-center">
          <h3 className="text-2xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            <a href="mailto:office@swisshaus.com" className="hover:underline">office@swisshaus.com</a> | <a href="tel:4064075072" className="hover:underline">406.407.5072</a>
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="/contact"
              className="mx-3 bg-black dark:bg-slate-700 hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Contact Us
            </a>
            <a 
              href="https://www.houzz.com/pro/swisshausmt/swisshaus" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mx-3 hover:opacity-75 duration-200 transition-opacity"
            >
              <img 
                src={isDarkMode ? "/assets/houzz_l_rgb_rev.svg" : "/assets/houzz_l_rgb.svg"} 
                alt="Follow us on Houzz" 
                width="100" 
                height="30" 
              />
            </a>
            
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
