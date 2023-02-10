import { useAuth } from "@/lib/auth"
import Image from "next/image"
import { Formik, Form } from "formik"
import faculties from "@/data/faculties"
import { TextField } from "@/components/common/TextField"
import { SelectField } from "@/components/common/SelectField"
import { Loading } from "@/components/common/Loading"
import { useEffect } from "react"
import { validateForm } from "@/lib/validate"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"

export default function RegisterForm() {
  const auth = useAuth()

  if (!auth) {
    return
  }

  if (auth.loading) {
    return <Loading />
  }

  useEffect(() => {
    auth?.requireCred("/register")
    auth?.requireNotUser("/game")
    auth?.requireNotGame("/card")
  }, [auth])

  const handleSubmit = async ({
    nickname,
    name,
    status,
    faculty,
    studentId,
    year,
  }: {
    nickname: string
    name: string
    status: string
    faculty: string
    studentId: string
    year: string
  }) => {
    await auth.createUser({
      faculty,
      name,
      nickname,
      studentId,
      status: status as "student" | "alumni" | "participant",
      year: +year,
    })
  }

  return (
    <div className="bg-vlvu-pink-100 font-display min-h-screen w-full py-12">
      <main className="text-vlvu-pink-300 mx-auto max-w-lg">
        <div className="flex flex-col items-center justify-center h-screen gap-6">
          <div>
            <Image src="/assets/vlvu-logo.svg" alt="vid love vid u logo" width="96px" height="96px" />
          </div>
          <Formik
            initialValues={{ nickname: "", name: "", status: "", faculty: "", studentId: "", year: "" }}
            validate={validateForm}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true)

              await handleSubmit(values)

              setSubmitting(false)
            }}
          >
            {({ isSubmitting, values }) => (
              <Form className="flex flex-col gap-3 font-semibold text-vlvu-pink-500 w-full max-w-sm">
                <div className="flex items-center gap-2">
                  <p className="text-center">Logged in as {auth?.credential?.email}</p>

                  <button
                    className="underline hover:no-underline"
                    onClick={() => {
                      auth?.signout("/register")
                    }}
                  >
                    ออกจากระบบ
                  </button>
                </div>
                <TextField fieldName="nickname" fieldLabel="ชื่อเล่น" placeholder="username" />
                <TextField fieldName="name" fieldLabel="ชื่อ-สกุล" placeholder="John Doe" />
                <SelectField
                  fieldLabel="สถานภาพ"
                  fieldName="status"
                  options={[
                    ["นิสิตปัจจุบัน", "student"],
                    ["ศิษย์เก่า", "alumni"],
                    ["ผู้เข้าร่วมงาน", "participant"],
                  ]}
                  placeholder="เลือกสถานภาพ"
                />
                {values.status === "student" && (
                  <>
                    <AnimatePresence>
                      {/* seperate motion.div because it count as one flex item so gap does not apply */}
                      <motion.div key="faculty-motion" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                        <SelectField
                          fieldLabel="คณะ"
                          fieldName="faculty"
                          options={faculties.map((faculty) => [faculty, faculty])}
                          placeholder="คณะ"
                        />
                      </motion.div>
                      <motion.div key="year-motion" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                        {/* <TextField fieldName="year" fieldLabel="ชั้นปี" className="w-1/5" /> */}
                        <SelectField
                          fieldLabel="ชั้นปี"
                          fieldName="year"
                          options={[
                            ["1", "1"],
                            ["2", "2"],
                            ["3", "3"],
                            ["4", "4"],
                            ["5", "5"],
                            ["6", "6"],
                          ]}
                          placeholder="ปี"
                          className="w-3/12"
                        />
                      </motion.div>
                      {["คณะวิศวกรรมศาสตร์", "คณะวิทยาศาสตร์"].includes(values.faculty) && (
                        <motion.div
                          key="studentId-motion"
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                        >
                          <TextField fieldName="studentId" fieldLabel="รหัสนิสิต" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !auth?.credential}
                  className="w-full mt-6 py-2 px-6 bg-vlvu-pink-500 text-white transition-colors hover:bg-vlvu-pink-600 shadow-md rounded-xl"
                >
                  ถัดไป
                </button>

                <p className="text-center">
                  การลงทะเบียนถือว่าเป็นการยอมรับ
                  <br />
                  <Link href="/privacy-policy">
                    <a className="underline hover:no-underline">ข้อตกลงและเงื่อนไขการใช้งาน</a>
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  )
}
