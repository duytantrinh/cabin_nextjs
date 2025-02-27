// (@ : root của app)
import CabinDetail from "@/app/_components/CabinDetail"
import Reservation from "@/app/_components/Reservation"

import Spinner from "@/app/_components/Spinner"

import {getCabin, getCabins} from "@/app/_lib/data-service"

import {Suspense} from "react"

export async function generateMetadata({params}) {
  const {name} = await getCabin(params.cabinId)
  return {title: `Cabin ${name}`}
}

export async function generateStaticParams() {
  const cabins = await getCabins()

  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }))

  return ids
}

export default async function Page({params}) {
  const cabin = await getCabin(params.cabinId)

  return (
    <div className="mx-auto mt-8">
      <CabinDetail cabin={cabin} />

      <div className="w-full">
        <h2 className="text-5xl font-semibold text-center">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </div>

      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
    </div>
  )
}
