import Link from "next/link"
import Image from "next/image"

import bgImage from "@/public/bg.png"

export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bgImage}
        fill
        qualify={100}
        placeholder="blur"
        alt="Mountains and forests with two cabins"
        className="object-cover object-top"
      />

      <div className="relative z-10 text-center">
        <h1 className="lg:text-8xl md:text-7xl max-sm:text-5xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  )
}

/*
  <Image fill/> =>{
    color: transparent;
    position: absolute;
    height: 100%;
    width: 100%;
    inset: 0px;
}
*/
