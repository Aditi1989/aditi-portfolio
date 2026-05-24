import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "./components/ThemeProvider"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export const metadata: Metadata = {
  title: "Aditi Mukherjee · Portfolio",
  description:
    "Incoming Graduate Engineer Trainee at LTIMindtree. Software Engineer bridging web architectures, real-time systems, and AI models.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="bg-[#f8f9fc] dark:bg-[#0b0b1a] text-[#1a1a2e] dark:text-[#e8e8f0] transition-colors duration-300 overflow-x-hidden">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
