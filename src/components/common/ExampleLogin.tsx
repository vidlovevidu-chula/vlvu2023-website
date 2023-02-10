import { FC, useEffect, useState } from "react"
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User as FirebaseUser } from "firebase/auth"
import firebaseApp from "@/lib/firebase"
import { createUser, getUser, User } from "@/lib/user"

const UserCard: FC<{ user: User }> = ({ user }) => {
  const keys = Object.keys(user) as (keyof User)[]

  const tableContent = keys.map((key) => {
    return (
      <tr key={key}>
        <td>{key}</td>
        <td>{user[key as keyof User].toString()}</td>
      </tr>
    )
  })

  return (
    <div>
      <table>
        <tbody>{tableContent}</tbody>
      </table>
    </div>
  )
}
export function ExampleLogin() {
  const [credential, setCredential] = useState<FirebaseUser | null>(null)

  const auth = getAuth(firebaseApp)

  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    const unsubsrcibe = onAuthStateChanged(auth, (credential) => {
      if (credential) {
        handleFirebaseUser(credential)
      }
    })

    return () => unsubsrcibe()
  }, [])

  const handleFirebaseUser = async (credential: FirebaseUser) => {
    setCredential(credential)

    if (!credential) {
      return
    }

    getUser(credential).then((user) => {
      setUserData(user)
    })
  }

  const getCredential = async () => {
    const provider = new GoogleAuthProvider()

    const credential = await signInWithPopup(auth, provider)

    return credential.user
  }

  const signin = async () => {
    if (!credential) {
      setCredential(await getCredential())

      if (!credential) {
        return
      }
    }

    // save credential and then
    // get user info here

    await createUser(credential, {
      faculty: "Engineering",
      name: "John Doe",
      nickname: "Jo",
      status: "student",
      year: 1,
      studentId: "123456789",
    })
  }

  // TODO: Please fix this
  const divStyle = {
    display: "flex",
    margin: "5px",
    justifyContent: "center",
  }

  const buttonStyle = {
    margin: "5px",
    backgroundColor: "lightgreen",
    padding: "5px 10px",
  }

  const login = async () => {
    const credential = await getCredential()

    setCredential(credential)

    await handleFirebaseUser(credential)
  }

  const logout = async () => {
    await auth.signOut()

    setCredential(null)

    setUserData(null)
  }

  let content

  if (userData) {
    content = (
      <div>
        <UserCard user={userData} />
        <button onClick={logout} style={buttonStyle}>
          Logout
        </button>
      </div>
    )
  } else {
    content = (
      <div>
        <button onClick={signin} style={buttonStyle}>
          Sign in with google
        </button>
      </div>
    )
  }

  return <div style={divStyle}>{content}</div>
}
