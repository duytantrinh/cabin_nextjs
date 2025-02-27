import {auth} from "../_lib/auth"

export const metadata = {
  title: "Account",
}

export default async function Page() {
  const session = await auth()

  // console.log(session)
  const fName = session.user.name.split(" ").at(0)
  return <h1>Hello, {fName}</h1>
}
