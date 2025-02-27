import {getBookedDatesByCabinId, getSettings} from "@/app/_lib/data-service"
import DateSelector from "./DateSelector"
import ReservationForm from "./ReservationForm"
import LoginMessage from "./LoginMessage"
import {auth} from "../_lib/auth"

async function Reservation({cabin}) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ])

  const session = await auth()

  return (
    <div className="grid grid-cols-2 gap-20 my-11 border border-primary-800 p-5">
      <div className="md:col-span-1 col-span-2">
        <DateSelector
          settings={settings}
          bookedDates={bookedDates}
          cabin={cabin}
        />
      </div>

      <div className="md:col-span-1 col-span-2">
        {session?.user ? (
          <ReservationForm cabin={cabin} session={session} />
        ) : (
          <LoginMessage />
        )}
      </div>
    </div>
  )
}

export default Reservation
