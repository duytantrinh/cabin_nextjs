import Link from "next/link"
import {Navigation_Mobile} from "./Navigation_Mobile"
import {auth} from "../_lib/auth"

export default async function Navigation() {
  const session = await auth()
  // console.log(session)

  return (
    <>
      <nav className=" z-10 text-xl max-sm:w-full max-sm:relative">
        <ul className="md:flex gap-16 items-center max-sm:hidden">
          <li>
            <Link
              href="/cabins"
              className="hover:text-accent-400 transition-colors"
            >
              Cabins
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-accent-400 transition-colors"
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

        {/* // responsive mobile screen */}

        <Navigation_Mobile session={session} />
      </nav>
    </>
  )
}
