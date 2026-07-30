import React, {
  useState,
  useContext,
  createContext,
  useMemo,
  ComponentProps,
} from 'react'

export type {
  CheckboxField as RailsCheckboxFieldProps,
  CollectionCheckboxesField as RailsCollectionCheckboxesFieldProps,
  CollectionRadioButtonsField as RailsCollectionRadioButtonsFieldProps,
  ColorField as RailsColorFieldProps,
  DateField as RailsDateFieldProps,
  DateTimeLocalField as RailsDateTimeLocalFieldProps,
  EmailField as RailsEmailFieldProps,
  FileField as RailsFileFieldProps,
  HiddenField as RailsHiddenFieldProps,
  MonthField as RailsMonthFieldProps,
  NumberField as RailsNumberFieldProps,
  PasswordField as RailsPasswordFieldProps,
  RangeField as RailsRangeFieldProps,
  SearchField as RailsSearchFieldProps,
  Select as RailsSelectProps,
  SubmitProps as RailsSubmitButtonProps,
  TelField as RailsTelFieldProps,
  TextArea as RailsTextAreaProps,
  TextField as RailsTextFieldProps,
  TimeField as RailsTimeFieldProps,
  UrlField as RailsUrlFieldProps,
  HTMLFormProps as RailsHTMLFormProps,
  ValidationErrors,
} from '@thoughtbot/candy_wrapper'

import {
  CheckboxField as RailsCheckboxField,
  CollectionCheckboxesField as RailsCollectionCheckboxesField,
  CollectionRadioButtonsField as RailsCollectionRadioButtonsField,
  ColorField as RailsColorField,
  DateField as RailsDateField,
  DateTimeLocalField as RailsDateTimeLocalField,
  EmailField as RailsEmailField,
  FileField as RailsFileField,
  HiddenField as RailsHiddenField,
  MonthField as RailsMonthField,
  NumberField as RailsNumberField,
  PasswordField as RailsPasswordField,
  SearchField as RailsSearchField,
  SingleSelect as RailsSingleSelect,
  MultiSelect as RailsMultiSelect,
  TelField as RailsTelField,
  TextField as RailsTextField,
  TextArea as RailsTextArea,
  TimeField as RailsTimeField,
  UrlField as RailsUrlField,
  RangeField as RailsRangeField,
  HTMLFormProps as RailsHTMLFormProps,
  ValidationErrors,
  SubmitProps as RailsSubmitButton,
} from '@thoughtbot/candy_wrapper'

import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea'
import { Password } from 'primereact/password'
import { Calendar } from 'primereact/calendar'
import { ColorPicker } from 'primereact/colorpicker'
import { Checkbox as PrimeCheckbox } from 'primereact/checkbox'
import { RadioButton as PrimeRadioButton } from 'primereact/radiobutton'
import { Dropdown as PrimeDropdown } from 'primereact/dropdown'
import { MultiSelect as PrimeMultiSelect } from 'primereact/multiselect'
import { Slider } from 'primereact/slider'
import { Button } from 'primereact/button'

export const ValidationContext = createContext<ValidationErrors>({})

export const useErrorMessage = (errorKey?: string) => {
  const errors = useContext(ValidationContext)

  return useMemo(() => {
    if (!errorKey) {
      return null
    }

    const validationError = errors[errorKey]
    const hasErrors = errorKey && validationError

    if (!hasErrors) {
      return null
    }

    const errorMessages = Array.isArray(validationError)
      ? validationError
      : [validationError]

    return errorMessages.join(' ')
  }, [errors, errorKey])
}

export type ExtrasProps = Record<string, RailsHiddenField>

export const Extras = (hiddenInputAttributes: ExtrasProps) => {
  const hiddenProps = Object.values(hiddenInputAttributes)
  const hiddenInputs = hiddenProps.map((props: RailsHiddenField) => (
    <input {...props} type="hidden" key={props.name} />
  ))

  return <>{hiddenInputs}</>
}

export interface FormProps<T = object> {
  extras: ExtrasProps
  inputs: T
  form: RailsHTMLFormProps
}

type FormElementProps = React.FormHTMLAttributes<HTMLFormElement> & {
  extras: ExtrasProps
  validationErrors?: ValidationErrors
}

export const Form = ({
  extras,
  validationErrors = {},
  children,
  ...props
}: FormElementProps) => {
  return (
    <form {...props}>
      <ValidationContext.Provider value={validationErrors}>
        <Extras {...extras}></Extras>
        {children}
      </ValidationContext.Provider>
    </form>
  )
}

type InputProps = {
  label: string
  errorKey?: string
}

type TransformedValues<T> = {
  value?: T
  defaultValue?: T
}

const FieldError = ({ errorKey }: { errorKey: string | undefined }) => {
  const errorMessage = useErrorMessage(errorKey)

  if (!errorMessage) {
    return null
  }

  return <small className="p-error">{errorMessage}</small>
}

const FieldWrapper = ({
  label,
  id,
  errorKey,
  children,
}: {
  label: string
  id?: string
  errorKey?: string
  children: React.ReactNode
}) => {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      <FieldError errorKey={errorKey} />
    </div>
  )
}

function parseDate(value: string | undefined): Date | undefined {
  if (!value) {
    return undefined
  }
  return new Date(value)
}

function parseTime(value: string | undefined): Date | undefined {
  if (!value) {
    return undefined
  }
  const [hours, minutes, seconds] = value.split(':').map(Number)
  const date = new Date()
  date.setHours(hours || 0, minutes || 0, seconds || 0, 0)
  return date
}

type CheckboxProps = RailsCheckboxField & InputProps

export const Checkbox = ({
  type: _type,
  includeHidden,
  uncheckedValue,
  errorKey,
  label,
  checked = false,
  ...rest
}: CheckboxProps) => {
  const { name, id } = rest

  return (
    <FieldWrapper label={label} id={id} errorKey={errorKey}>
      {includeHidden && (
        <input
          type="hidden"
          name={name}
          defaultValue={uncheckedValue}
          autoComplete="off"
        />
      )}
      <PrimeCheckbox inputId={id} {...rest} checked={checked} />
    </FieldWrapper>
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
  if (collection.length === 0) {
    return null
  }

  const { name } = collection[0]

  const checkboxes = collection.map((options) => {
    const {
      label: optionLabel,
      type: _type,
      includeHidden: _includeHidden,
      uncheckedValue: _uncheckedValue,
      checked = false,
      ...rest
    } = options

    return (
      <div key={rest.id} className="field-checkbox">
        <PrimeCheckbox inputId={rest.id} {...rest} checked={checked} />
        <label htmlFor={rest.id}>{optionLabel}</label>
      </div>
    )
  })

  return (
    <div className="field">
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <label>{label}</label>
      {checkboxes}
      <FieldError errorKey={errorKey} />
    </div>
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
  if (collection.length === 0) {
    return null
  }

  const { name } = collection[0]

  const radioButtons = collection.map((options) => {
    const { label: optionLabel, type: _type, ...rest } = options

    return (
      <div key={rest.value} className="field-radiobutton">
        <PrimeRadioButton inputId={rest.id} {...rest} />
        <label htmlFor={rest.id}>{optionLabel}</label>
      </div>
    )
  })

  return (
    <div className="field">
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <label>{label}</label>
      {radioButtons}
      <FieldError errorKey={errorKey} />
    </div>
  )
}

export type TextFieldProps = ComponentProps<typeof InputText> &
  RailsTextField &
  InputProps

export const TextField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: TextFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <InputText
        {...rest}
        type="text"
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}

export type EmailFieldProps = ComponentProps<typeof InputText> &
  RailsEmailField &
  InputProps

export const EmailField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: EmailFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <InputText
        {...rest}
        type="email"
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}

export type SearchFieldProps = ComponentProps<typeof InputText> &
  RailsSearchField &
  InputProps

export const SearchField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: SearchFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <InputText
        {...rest}
        type="search"
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}

export type TelFieldProps = ComponentProps<typeof InputText> &
  RailsTelField &
  InputProps

export const TelField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: TelFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <InputText
        {...rest}
        type="tel"
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}

export type UrlFieldProps = ComponentProps<typeof InputText> &
  RailsUrlField &
  InputProps

export const UrlField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: UrlFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <InputText
        {...rest}
        type="url"
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}

export type PasswordFieldProps = ComponentProps<typeof Password> &
  RailsPasswordField &
  InputProps

export const PasswordField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: PasswordFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <Password
        {...rest}
        inputId={rest.id}
        className={errorMessage ? 'p-invalid' : undefined}
        feedback={false}
      />
    </FieldWrapper>
  )
}

export type ColorFieldProps = ComponentProps<typeof ColorPicker> &
  RailsColorField &
  InputProps

export const ColorField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  ...rest
}: ColorFieldProps) => {
  const colorValue = value || defaultValue

  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <ColorPicker {...rest} value={colorValue} />
    </FieldWrapper>
  )
}

export type DateFieldProps = ComponentProps<typeof Calendar> &
  RailsDateField &
  InputProps

export const DateField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  min,
  max,
  ...rest
}: DateFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  const valueProps: TransformedValues<Date> = {}
  if (value) {
    valueProps.value = parseDate(value as string)
  } else if (defaultValue) {
    valueProps.defaultValue = parseDate(defaultValue as string)
  }

  const minMaxProps: { minDate?: Date; maxDate?: Date } = {}
  if (min) {
    minMaxProps.minDate = parseDate(min as string)
  }
  if (max) {
    minMaxProps.maxDate = parseDate(max as string)
  }

  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <Calendar
        {...rest}
        inputId={rest.id}
        {...valueProps}
        {...minMaxProps}
        dateFormat="yy-mm-dd"
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}

export type DateTimeLocalFieldProps = ComponentProps<typeof Calendar> &
  RailsDateTimeLocalField &
  InputProps

export const DateTimeLocalField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  min,
  max,
  ...rest
}: DateTimeLocalFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  const valueProps: TransformedValues<Date> = {}
  if (value) {
    valueProps.value = parseDate(value as string)
  } else if (defaultValue) {
    valueProps.defaultValue = parseDate(defaultValue as string)
  }

  const minMaxProps: { minDate?: Date; maxDate?: Date } = {}
  if (min) {
    minMaxProps.minDate = parseDate(min as string)
  }
  if (max) {
    minMaxProps.maxDate = parseDate(max as string)
  }

  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <Calendar
        {...rest}
        inputId={rest.id}
        showTime
        {...valueProps}
        {...minMaxProps}
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}

export type TimeFieldProps = ComponentProps<typeof Calendar> &
  RailsTimeField &
  InputProps

export const TimeField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  ...rest
}: TimeFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  const valueProps: TransformedValues<Date> = {}
  if (value) {
    valueProps.value = parseTime(value as string)
  } else if (defaultValue) {
    valueProps.defaultValue = parseTime(defaultValue as string)
  }

  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <Calendar
        {...rest}
        inputId={rest.id}
        timeOnly
        {...valueProps}
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}

export type MonthFieldProps = ComponentProps<typeof Calendar> &
  RailsMonthField &
  InputProps

export const MonthField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  min,
  max,
  ...rest
}: MonthFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  const valueProps: TransformedValues<Date> = {}
  if (value) {
    valueProps.value = parseDate(value as string)
  } else if (defaultValue) {
    valueProps.defaultValue = parseDate(defaultValue as string)
  }

  const minMaxProps: { minDate?: Date; maxDate?: Date } = {}
  if (min) {
    minMaxProps.minDate = parseDate(min as string)
  }
  if (max) {
    minMaxProps.maxDate = parseDate(max as string)
  }

  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <Calendar
        {...rest}
        inputId={rest.id}
        view="month"
        dateFormat="yy-mm"
        {...valueProps}
        {...minMaxProps}
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}

export type NumberFieldProps = Omit<
  ComponentProps<typeof InputNumber>,
  'type'
> &
  RailsNumberField &
  InputProps

export const NumberField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  min,
  max,
  ...rest
}: NumberFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  const numericValue =
    value !== undefined
      ? Number(value)
      : defaultValue !== undefined
      ? Number(defaultValue)
      : undefined

  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <InputNumber
        {...rest}
        inputId={rest.id}
        value={numericValue}
        min={min}
        max={max}
        useGrouping={false}
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}

export type RangeFieldProps = ComponentProps<typeof Slider> &
  RailsRangeField &
  InputProps

export const RangeField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  ...rest
}: RangeFieldProps) => {
  const initialValue =
    value !== undefined
      ? Number(value)
      : defaultValue !== undefined
      ? Number(defaultValue)
      : undefined
  const [sliderValue, setSliderValue] = useState<number | undefined>(
    initialValue
  )

  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <Slider
        {...rest}
        value={sliderValue}
        onChange={(e) => setSliderValue(e.value as number)}
      />
      <input type="hidden" name={rest.name} value={sliderValue ?? ''} />
    </FieldWrapper>
  )
}

type SingleSelectProps = ComponentProps<typeof PrimeDropdown> &
  RailsSingleSelect &
  InputProps

type MultiSelectProps = ComponentProps<typeof PrimeMultiSelect> &
  RailsMultiSelect &
  InputProps

type SelectProps = (SingleSelectProps | MultiSelectProps) & InputProps

export const Select = ({
  includeHidden,
  name,
  id,
  options,
  errorKey,
  type: _type,
  ...rest
}: SelectProps) => {
  const errorMessage = useErrorMessage(errorKey)
  const addHidden = includeHidden && rest.multiple

  const flatOptions = options.flatMap((item) => {
    if ('options' in item) {
      return item.options.map((opt) => ({
        label: opt.label,
        value: opt.value,
        disabled: opt.disabled,
      }))
    }
    return [{ label: item.label, value: item.value, disabled: item.disabled }]
  })

  if (rest.multiple) {
    const {
      multiple: _multiple,
      value,
      defaultvalue,
      ...multiRest
    } = rest as MultiSelectProps
    const selectedValues = value || defaultvalue || []
    const [values, setValues] = useState<string[]>(selectedValues)

    return (
      <FieldWrapper label={rest.label} id={id} errorKey={errorKey}>
        {addHidden && (
          <input type="hidden" name={name} value={''} autoComplete="off" />
        )}
        <PrimeMultiSelect
          {...multiRest}
          inputId={id}
          options={flatOptions}
          value={values}
          onChange={(e) => setValues(e.value)}
          className={errorMessage ? 'p-invalid' : undefined}
        />
        {values.map((val) => (
          <input
            type="hidden"
            key={val}
            name={name}
            value={val}
            autoComplete="off"
          />
        ))}
      </FieldWrapper>
    )
  }

  const {
    multiple: _multiple,
    value,
    defaultvalue,
    ...singleRest
  } = rest as SingleSelectProps
  const selectedValue = value || defaultvalue

  return (
    <FieldWrapper label={rest.label} id={id} errorKey={errorKey}>
      <PrimeDropdown
        {...singleRest}
        inputId={id}
        name={name}
        options={flatOptions}
        value={selectedValue}
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}

type TextAreaProps = ComponentProps<typeof InputTextarea> &
  RailsTextArea &
  InputProps

export const TextArea = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: TextAreaProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <InputTextarea
        {...rest}
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}

type FileFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  RailsFileField &
  InputProps

export const FileField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: FileFieldProps) => {
  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <input {...rest} type="file" />
    </FieldWrapper>
  )
}

type SubmitButtonProps = Omit<ComponentProps<typeof Button>, 'type' | 'text'> &
  RailsSubmitButton

export const SubmitButton = ({
  type: _type,
  text,
  ...rest
}: SubmitButtonProps) => {
  return <Button {...rest} type="submit" label={text} />
}
