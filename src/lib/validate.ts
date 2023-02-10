export const validateForm = (values: { [field: string]: string }) => {
  const errors: any = {}

  if (values.status === "") {
    errors.status = "กรุณาเลือกสถานภาพ"
  } else if (values.status === "student") {
    if (values.faculty === "") {
      errors.faculty = "กรุณาเลือกคณะ"
    } else if (["คณะวิศวกรรมศาสตร์", "คณะวิทยาศาสตร์"].includes(values.faculty)) {
      if (values.studentId === "") {
        errors.studentId = "กรุณาใส่เลขประจำตัวนิสิต"
      } else if (isNaN(+values.studentId) || values.studentId.length !== 10) {
        errors.studentId = "รหัสนิสิตไม่ถูกต้อง"
      }
    }
    if (+values.year < 1 || +values.year > 6) {
      errors.year = "ชั้นปีไม่ถูกต้อง"
    }
  }

  if (values.name === "") {
    errors.name = "กรุณาใส่ชื่อ"
  }

  if (values.nickname === "") {
    errors.nickname = "กรุณาใส่ชื่อเล่น"
  }

  return errors
}
