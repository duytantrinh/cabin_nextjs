// add Font for app
import {Josefin_Sans} from "next/font/google"
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
})
// console.log(josefin)

import "@/app/_styles/globals.css"
import "../build.css" // to import tailwindcss
import Header from "./_components/Header"
import {ReservationProvider} from "./context/ReservationContext"

export const metadata = {
  // title: "The Wild Oasis"
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome to The Wild Oasis",
  },

  description: "Luxurious cabin hotel....",
}

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* use josefin font created above */}
      <body
        suppressHydrationWarning
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid max-sm:px-4 max-sm:py-10">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  )
}
