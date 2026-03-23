import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/app/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FASTBRIKOL - Expert Booking Services For Your Home",
  description:
    "FASTBRIKOL connects you with local professionals for all your home repair and maintenance needs through our intuitive booking services system. Quality service, guaranteed satisfaction.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
