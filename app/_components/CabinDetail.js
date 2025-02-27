import Image from "next/image"
import TextExpander from "./TextExpander"
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid"

function CabinDetail({cabin}) {
    const {id, name, maxCapacity, regularPrice, discount, image, description} =
    cabin

    return (
        <div className="grid grid-cols-[3fr_4fr] gap-20 max-sm:gap-7 border border-primary-800 py-3 px-3 md:px-10 mb-24">
        <div className="md:col-span-1 relative md:scale-[1.15] md:-translate-x-3 col-span-2 scale-100 max-sm:h-[220px]">
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100%"
          />
        </div>

        <div className="md:col-span-1 col-span-2">
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] max-sm:text-5xl max-sm:translate-x-0 max-sm:w-full bg-primary-950 md:p-6 pb-1 px-0 w-[150%]">
            Cabin {name}
          </h3>

          <p className="text-lg text-primary-300 mb-10 transition-all duration-500">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>
    )
}

export default CabinDetail
