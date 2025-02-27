"use server"

import {revalidatePath} from "next/cache"
import {auth, signIn, signOut} from "./auth"
import {supabase} from "./supabase"
import {getBookings} from "./data-service"
import {redirect} from "next/navigation"

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/account",
  })
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  })
}

export async function updateProfile(formData) {
  const session = await auth()

  // console.log(session)

  if (!session) throw new Error(" you must be logged in")

  const nationalID = formData.get("nationalID")

  const [nationality, countryFlag] = formData.get("nationality").split("%")

  const regex = /^[a-zA-Z0-9]{6,12}$/

  // Function to check the national ID
  function isValidNationalId(nationalId) {
    return regex.test(nationalID)
  }

  if (!isValidNationalId(nationalID)) {
    throw new Error("please provide a valid national Id")
  }

  const updateData = {nationality, countryFlag, nationalID}

  //(========== Update to supabase)
  const {data, error} = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)

  if (error) {
    console.error(error)
    throw new Error("Guest could not be updated")
  }

  revalidatePath("/account/profile")
}

export async function deleteReservation(bookingId) {
  const session = await auth()
  if (!session) throw new Error(" you must be logged in")

  const guestBookings = await getBookings(session.user.guestId)

  const guestBookingIds = guestBookings.map((booking) => booking.id)

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this reservation")

  const {error} = await supabase.from("bookings").delete().eq("id", bookingId)

  if (error) {
    console.error(error)
    throw new Error("Booking could not be deleted")
  }

  revalidatePath("/account/reservations")
}

export async function updateReservation(formData) {
  //1. Authentication
  const session = await auth()
  if (!session) throw new Error(" you must be logged in")

  // 2. Authorizatipn

  const numGuests = Number(formData.get("numGuests"))
  const observations = formData.get("observations").slice(0, 1000)
  const bookingId = Number(formData.get("bookingId"))

  const guestBookings = await getBookings(session.user.guestId)

  const guestBookingIds = guestBookings.map((booking) => booking.id)

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this reservation")

  // 3. Building updating data
  const updatedFields = {numGuests, observations}

  // 4. Mutation
  const {error} = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single()

  // 5. Error Handling
  if (error) {
    console.error(error)
    throw new Error("Booking could not be updated")
  }

  // 6. Revalidation (PHẢI LÀM TRƯỚC redirecting)
  revalidatePath(`/account/reservations/edit/${bookingId}`)
  revalidatePath("/account/reservations")

  // 7. Redirecting
  redirect("/account/reservations")
}

export async function createBooking(bookingData, formData) {
  // console.log(formData)

  //1. Authentication
  const session = await auth()
  if (!session) throw new Error(" you must be logged in")

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    isPaid: false,
  }

  // console.log(newBooking)

  const {error} = await supabase.from("bookings").insert([newBooking])

  if (error) {
    console.error(error)
    throw new Error("Booking could not be created")
  }

  // 6. Revalidation
  revalidatePath(`/cabins/${bookingData.cabinId}`)

  // // 7. Redirecting
  redirect("/cabins/thankyou")
}
