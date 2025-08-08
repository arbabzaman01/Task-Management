import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ReduxProvider from "@/components/ReduxProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Simple task management application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ overflow: "auto", height: "100%" }}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
