import React, { ReactNode, createContext, useContext, useMemo } from 'react'
import {
  RailsCheckboxField,
  RailsCollectionCheckboxesField,
  RailsHiddenField,
  RailsCollectionRadioButtonsField,
  RailsColorField,
  RailsDateField,
  RailsEmailField,
  RailsMonthField,
  RailsNumberField,
  RailsPasswordField,
  RailsRangeField,
  RailsSearchField,
  RailsSelect,
  RailsTelField,
  RailsTextField,
  RailsTimeField,
  RailsUrlField,
} from '../types'

export type ValidationError = string | string[]
export type ValidationErrors = Record<string, ValidationError>
export const ValidationContext = createContext<ValidationErrors>({})

export const useErrorKeyValidation = ({
  errorKey,
}: {
  errorKey: string
  name: string
}) => {
  const serverErrors = useContext(ValidationContext)

  return useMemo(() => {
    return serverErrors[errorKey]
  }, [serverErrors, errorKey])
}

export type ExtrasProps = Record<string, RailsHiddenField>
export const Extras = (hiddenInputAttributes: ExtrasProps) => {
  const hiddenProps = Object.values(hiddenInputAttributes)
  const hiddenInputs = hiddenProps.map((props: RailsHiddenField) => (
    <input {...props} type="hidden" key={props.name} />
  ))

  return <>{hiddenInputs}</>
}

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  extras: ExtrasProps
  validationErrors: ValidationErrors
}
export const Form = ({
  extras,
  validationErrors,
  children,
  ...props
}: FormProps) => {
  return (
    <form {...props}>
      <ValidationContext.Provider value={validationErrors}>
        <Extras {...extras}></Extras>
        {children}
      </ValidationContext.Provider>
    </form>
  )
}

export const FieldError = ({ errorKey }: { errorKey: string | undefined }) => {
  if (!errorKey) {
    return null
  }

  const errors = useContext(ValidationContext)
  const hasErrors = errorKey && errors[errorKey]

  if (!hasErrors) {
    return null
  }

  const errorMessages = Array.isArray(
    errors[errorKey]
  ) ? errors[errorKey] : [errors[errorKey]]
  
  return <span>{errorMessages.join(" ")}</span>
}

export type FieldBaseProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string
  label: string
  errorKey?: string
  children?: ReactNode
}
export const FieldBase = ({
  label,
  errorKey,
  children,
  ...props
}: FieldBaseProps) => {
  return (
    <>
      <label htmlFor={props.id}>{label}</label>
      {children || <input {...props} />}
      <FieldError errorKey={errorKey} />
    </>
  )
}

type InputProps = {
  label: string
  errorKey?: string
}

type CheckboxProps = RailsCheckboxField & InputProps
export const Checkbox = ({
  type: _type,
  includeHidden,
  uncheckedValue,
  ...rest
}: CheckboxProps) => {
  const { name } = rest
  return (
    <FieldBase {...rest}>
      {includeHidden && (
        <input
          type="hidden"
          name={name}
          defaultValue={uncheckedValue}
          autoComplete="off"
        />
      )}
      <input type="checkbox" {...rest}></input>
    </FieldBase>
  )
}

type CollectionCheckboxesFieldProps = RailsCollectionCheckboxesField &
  InputProps
export const CollectionCheckboxes = ({
  includeHidden,
  collection,
  label,
  errorKey,
}: CollectionCheckboxesFieldProps) => {
  if (collection.length == 0) {
    return null
  }

  const checkboxes = collection.map((options) => {
    return <Checkbox {...options} key={options.id} />
  })

  const { name } = collection[0]

  return (
    <>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <label>{label}</label>
      {checkboxes}
      <FieldError errorKey={errorKey} />
    </>
  )
}

type CollectionRadioButtonsFieldProps = RailsCollectionRadioButtonsField &
  InputProps
export const CollectionRadioButtons = ({
  includeHidden,
  collection,
  label,
  errorKey,
}: CollectionRadioButtonsFieldProps) => {
  if (collection.length == 0) {
    return null
  }

  const radioButtons = collection.map((options) => {
    return (
      <>
        <input {...options} type="radio" />
        <label htmlFor={options.id}>{options.label}</label>
      </>
    )
  })

  const { name } = collection[0]

  return (
    <>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <label>{label}</label>
      {radioButtons}
      <FieldError errorKey={errorKey} />
    </>
  )
}

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  RailsTextField &
  InputProps
export const TextField = ({ type: _type, ...rest }: TextFieldProps) => {
  return <FieldBase {...rest} type="text" />
}

export type EmailFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  RailsEmailField &
  InputProps
export const EmailField = ({ type: _type, ...rest }: EmailFieldProps) => {
  return <FieldBase {...rest} type="email" />
}

export type ColorFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  RailsColorField &
  InputProps
export const ColorField = ({ type: _type, ...rest }: ColorFieldProps) => {
  return <FieldBase {...rest} type="color" />
}

export type DateFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  RailsDateField &
  InputProps
export const DateField = ({ type: _type, ...rest }: DateFieldProps) => {
  return <FieldBase {...rest} type="date" />
}

export type SearchFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  RailsSearchField &
  InputProps
export const SearchField = ({ type: _type, ...rest }: SearchFieldProps) => {
  return <FieldBase {...rest} type="search" />
}

export type TelFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  RailsTelField &
  InputProps
export const TelField = ({ type: _type, ...rest }: TelFieldProps) => {
  return <FieldBase {...rest} type="tel" />
}

export type UrlFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  RailsUrlField &
  InputProps
export const UrlField = ({ type: _type, ...rest }: UrlFieldProps) => {
  return <FieldBase {...rest} type="url" />
}

export type MonthFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  RailsMonthField &
  InputProps
export const MonthField = ({ type: _type, ...rest }: MonthFieldProps) => {
  return <FieldBase {...rest} type="month" />
}

export type TimeFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  RailsTimeField &
  InputProps
export const TimeField = ({ type: _type, ...rest }: TimeFieldProps) => {
  return <FieldBase {...rest} type="time" />
}

export type NumberFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  RailsNumberField &
  InputProps
export const NumberField = ({ type: _type, ...rest }: NumberFieldProps) => {
  return <FieldBase {...rest} type="number" />
}

export type RangeFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  RailsRangeField &
  InputProps
export const RangeField = ({ type: _type, ...rest }: RangeFieldProps) => {
  return <FieldBase {...rest} type="range" />
}

export type PasswordFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  RailsPasswordField &
  InputProps
export const PasswordField = ({ type: _type, ...rest }: PasswordFieldProps) => {
  return <FieldBase {...rest} type="password" />
}

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> &
  RailsSelect & {
    label?: string
    errorKey?: string
  }
export const Select = ({
  includeHidden,
  name,
  id,
  children,
  options,
  multiple,
  type: _type,
  ...rest
}: SelectProps) => {
  const addHidden = includeHidden && multiple

  const optionElements = options.map((item) => {
    if ('options' in item) {
      return (
        <optgroup label={item.label} key={item.label}>
          {item.options.map((opt) => (
            <option key={opt.label} {...opt} />
          ))}
        </optgroup>
      )
    } else {
      return <option key={item.label} {...item} />
    }
  })

  return (
    <>
      {addHidden && (
        <input type="hidden" name={name} value={''} autoComplete="off" />
      )}
      <select name={name} id={id} multiple={multiple} {...rest}>
        {children}
        {optionElements}
      </select>
    </>
  )
}
