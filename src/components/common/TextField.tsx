import { Field, ErrorMessage } from "formik"
import clsx from "clsx"

export const TextField = ({
  fieldName,
  fieldLabel,
  className,
}: {
  fieldName: string
  fieldLabel: string
  className?: string
}) => {
  return (
    <div>
      <h2>{fieldLabel}</h2>
      <Field type="text" name={fieldName} className={clsx("rounded-2xl p-2", className)} />
      <ErrorMessage name={fieldName} component="div" />
    </div>
  )
}
