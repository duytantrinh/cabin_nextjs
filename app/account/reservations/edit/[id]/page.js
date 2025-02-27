import SubmitButton from "@/app/_components/SubmitButton"
import {updateReservation} from "@/app/_lib/actions"
import {getBooking, getCabin} from "@/app/_lib/data-service"

export default async function Page({params}) {
  const bookingId = params.id
  const {numGuests, observations, cabinId} = await getBooking(params.id)
  const {maxCapacity} = await getCabin(cabinId)

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateReservation}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        {/*`TRICK: tạo 1 hidden input để truyền bookingId qua Server Action thông qua formData` */}
        <input type="hidden" name="bookingId" value={bookingId} />

        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({length: maxCapacity}, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton>Update Reservation</SubmitButton>
        </div>
      </form>
    </div>
  )
}

/* `Update Reservation Form`
1. tại _lib/action.js : tạo updateReservation(formData) ==> xử lý Update
2. tại [id]/page.js : đặt name cho các input để value đc truyền qua formData
        {tạo hidden input để truyền bookingId}
                      gọi SerVer Action bằng <form action={updateReservation}></form>       

*/
