import { Field, ErrorMessage } from "formik"
import clsx from "clsx"

import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon"

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
    <div className="">
      <h2>{fieldLabel}</h2>
      <div className={clsx("relative w-full", className)}>
        <Field
          as="select"
          name={fieldName}
          className={clsx("rounded-lg relative shadow-sm w-full h-[40px] appearance-none p-2 bg-red")}
        >
          {placeholder && (
            <option className="disabled:text-vlvu-pink-400" value="" selected disabled hidden>
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

        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <ChevronUpDownIcon className="w-5 h-5 text-vlvu-pink-600" />
        </div>
      </div>

      <div className="text-vlvu-pink-600">
        <ErrorMessage className="my-2" name={fieldName} component="div" />
      </div>
    </div>
  )
}
