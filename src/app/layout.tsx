import "./globals.css"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { Inter } from "next/font/google"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "My All-Time Valentine - Message Generator",
  description: "Create the perfect Valentine's Day message or date invitation for your special someone",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
      <Toaster />
      <Footer />
      </body>
    </html>
  )
}

