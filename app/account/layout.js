"use client"
import {useState} from "react"
import SideNavigation from "../_components/SideNavigation"

export default function Layout({children}) {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false)

  return (
    <div className="grid md:grid-cols-[16rem_1fr] grid-cols-1 relative h-full gap-12">
      {/* menu icon for mobile screen */}
      <span
        className="absolute left-0 -top-[30px] md:hidden"
        onClick={() => setIsOpenSideBar(!isOpenSideBar)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="orange"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </span>

      <div
        className={`md:col-span-1 col-span-2 max-sm:h-[80vh] max-sm:w-10/12 max-sm:bg-black/[.80] max-sm:absolute max-sm:top-0 transition-all  z-50 relative duration-500 ${
          isOpenSideBar ? "max-sm:-left-[30px]" : " max-sm:-left-[85%] "
        }`}
      >
        <SideNavigation />
      </div>

      {/* {children}: hiển thị nội dung khác nhau cua từng component */}
      <div className="py-1 md:col-span-1 col-span-2">{children}</div>
    </div>
  )
}
