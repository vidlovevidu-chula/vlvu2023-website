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
      <Field
        as="select"
        name={fieldName}
        className={clsx("rounded-lg shadow-sm w-4/6 h-[40px] appearance-none p-2 bg-red", className)}
      >
        {placeholder && (
          <option className="" value="" selected disabled hidden>
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
      <ErrorMessage className="my-2" name={fieldName} component="div" />
    </div>
  )
}
