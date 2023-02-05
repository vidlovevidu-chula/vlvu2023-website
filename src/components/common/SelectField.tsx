import { Field, ErrorMessage } from "formik"
import clsx from "clsx"

export const SelectField = ({
  fieldName,
  fieldLabel,
  options,
  placeholder,
  className,
}: {
  fieldName: string
  fieldLabel: string
  options: [string, string][]
  placeholder?: string
  className?: string
}) => {
  return (
    <div>
      <h2>{fieldLabel}</h2>
      <Field as="select" name={fieldName} className={clsx("rounded-2xl p-2", className)}>
        {placeholder && (
          <option value="" selected disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map(([label, value]) => {
          return (
            <option value={value} key={value}>
              {label}
            </option>
          )
        })}
      </Field>
      <ErrorMessage name={fieldName} component="div" />
    </div>
  )
}
