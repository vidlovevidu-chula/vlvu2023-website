import { Field, ErrorMessage } from "formik"
import clsx from "clsx"

export const TextField = ({
  fieldName,
  fieldLabel,
  className,
  placeholder,
}: {
  fieldName: string
  fieldLabel?: string
  placeholder?: string
  className?: string
}) => {
  return (
    <div>
      {fieldLabel && <h2>{fieldLabel}</h2>}
      <Field
        type="text"
        name={fieldName}
        className={clsx("rounded-lg shadow-sm p-2 h-[40px] w-full", className)}
        placeholder={placeholder || ""}
      />
      <ErrorMessage
        render={(msg: string) => <div className="text-vlvu-pink-600 my-2">{msg}</div>}
        name={fieldName}
        component="div"
      />
    </div>
  )
}
