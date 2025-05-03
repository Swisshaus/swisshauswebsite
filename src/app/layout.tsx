import Footer from "@/app/components/footer";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";

import "./globals.css";
import { Navbar } from "./components/navbar";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { LightboxProvider } from "./contexts/LightboxContext";
import Lightbox from "./components/lightbox";
import PostImageHandler from "./components/post-image-handler";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Swisshaus Design & Build | Custom Home Builder`,
  description: `Custom Home builder specializing in high-end residential homes in Kalispell, MT and the Flathead Valley.`,
  keywords: "custom home builder, Kalispell, Montana, Flathead Valley, construction, luxury homes, residential homes, swisshaus",
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: { url: '/favicon/apple-touch-icon.png' },
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' }
    ]
  },
  manifest: '/favicon/site.webmanifest',
  themeColor: '#ff0000',
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
    siteName: 'Swisshaus Design & Build',
    type: 'website',
    locale: 'en_US',
    title: 'Swisshaus Design & Build | Custom Home Builder in Montana',
    description: 'Custom Home builder specializing in high-end residential homes in Kalispell, MT and the Flathead Valley.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swisshaus Design & Build',
    description: 'Custom Home builder in Kalispell, MT and the Flathead Valley',
    images: [HOME_OG_IMAGE_URL],
  },
  alternates: {
    canonical: 'https://swisshaus.com',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/favicon/favicon.svg"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="theme-color" content="#ff0000" />
        <meta name="msapplication-TileColor" content="#ff0000" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={cn(inter.className, "dark:bg-dark-bg dark:text-dark-text")}
      >
        <ThemeContextProvider>
          <LightboxProvider>
            <Navbar />
            <div className="min-h-screen">{children}</div>
            <Footer />
            <PostImageHandler />
            <Lightbox />
          </LightboxProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
