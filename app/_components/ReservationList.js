"use client"

import ReservationCard from "./ReservationCard"
import {useOptimistic} from "react"
import {deleteReservation} from "../_lib/actions"

function ReservationList({bookings}) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings, // curState
    // updating function
    (curBooking, bookingId) => {
      return curBooking.filter((booking) => booking.id !== bookingId) // for deleting
      // return [...curBooking, newBooking] // for adding....
    }
  )

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId)
    await deleteReservation(bookingId)
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  )
}

export default ReservationList
