import { SideBar } from '@/components/SideBar/SideBar'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>PicShareX</title>
      <link rel="icon" href="/favicon.ico" />
    </head>
      <body className={"dark"}>
      <Navbar />
      <main className="flex gap-5 bg-gray-100 dark:bg-[#26262a] flex-col md:flex-row">
        <SideBar />
        {children}
        </main>
        <Analytics/>
      </body>
    </html>
  )
}
