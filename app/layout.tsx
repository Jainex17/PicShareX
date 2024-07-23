"use client"

import { SideBar } from '@/components/SideBar/SideBar'
import './globals.css'
import { Navbar } from '@/components/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={"dark"}>
      <Navbar />
      <main className="flex gap-5 bg-gray-100 dark:bg-[#26262a] flex-col md:flex-row">
        <SideBar />
        {children}
        </main>
      </body>
    </html>
  )
}
