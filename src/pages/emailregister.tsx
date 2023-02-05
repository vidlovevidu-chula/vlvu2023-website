import firebaseApp from "@lib/firebase"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { useRouter } from "next/router"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { TextField } from "@components/common/TextField"

export default function Register() {
  const auth = getAuth(firebaseApp)

  const router = useRouter()

  const handleSubmit = async ({ email, password }: { email: string; password: string }) => {
    await createUserWithEmailAndPassword(auth, email, password)

    router.push("/registerform")
  }

  return (
    <div className="bg-vlvu-pink-100 font-display min-h-screen w-full">
      <main className="text-vlvu-pink-500 mx-auto max-w-lg">
        <div className="flex flex-col items-center justify-center h-screen gap-6">
          <div>
            <h1>Sign in with Email</h1>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors: any = {}

              if (!values.email) {
                errors.email = "กรุณากรอกอีเมลล์"
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = "อีเมลล์ไม่ถูกต้อง"
              }

              if (values.password.length < 8) {
                errors.password = "พาสเวิร์ดต้องยาวมากกว่า 8 ตัวอักษร"
              }

              return errors
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true)

              console.log(values)

              await handleSubmit(values)

              setSubmitting(false)
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-2 font-semibold">
                <TextField fieldName="email" placeholder="Email address" />
                <Field type="password" name="password" placeholder="Password" className="rounded-2xl p-2" />
                <ErrorMessage name="password" component="div" />
                <button type="submit" disabled={isSubmitting} className="w-1/6 self-end">
                  ถัดไป
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  )
}
