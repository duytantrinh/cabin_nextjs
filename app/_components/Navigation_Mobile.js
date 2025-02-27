"use client"
import Link from "next/link"
import {useState} from "react"

export function Navigation_Mobile({session}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className="md:hidden absolute -top-[46px] right-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </div>

      <ul
        className={`md:hidden gap-4 items-end max-sm:flex flex-col w-[80%]  opacity-0 absolute top-0 right-0 transition-all duration-500 ${
          isOpen && "opacity-100"
        }`}
      >
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors shadow-[0_20px_50px_rgba(244,_198,_5,_0.7)]"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors shadow-[0_20px_50px_rgba(244,_198,_5,_0.7)]"
          >
            About
          </Link>
        </li>

        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-refferer"
              />
              {session.user.name}
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </>
  )
}
