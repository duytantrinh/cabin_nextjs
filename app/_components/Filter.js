"use client"

import {useRouter, usePathname, useSearchParams} from "next/navigation"

function Filter() {
  // eg: url: /cabins?capacity=large
  const searchParams = useSearchParams()

  const router = useRouter()
  const pathname = usePathname()

  const activeFilter = searchParams.get("capacity") ?? "all"

  function handleFiter(filter) {
    const params = new URLSearchParams(searchParams)
    params.set("capacity", filter)

    router.replace(`${pathname}?${params.toString()}`, {scroll: false})
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFiter={handleFiter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>

      <Button
        filter="small"
        handleFiter={handleFiter}
        activeFilter={activeFilter}
      >
        1&mdash; 3 guests
      </Button>

      <Button
        filter="medium"
        handleFiter={handleFiter}
        activeFilter={activeFilter}
      >
        4&mdash; 7 guests
      </Button>

      <Button
        filter="large"
        handleFiter={handleFiter}
        activeFilter={activeFilter}
      >
        8&mdash; 12 guests
      </Button>
    </div>
  )
}

function Button({children, filter, handleFiter, activeFilter}) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        activeFilter === filter && "bg-primary-500"
      }`}
      onClick={() => handleFiter(filter)}
    >
      {children}
    </button>
  )
}

export default Filter
