import React, {
  createContext,
  ComponentProps,
  ReactNode,
  useContext,
  useMemo,
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
  RangeField as RailsRangeField,
  SearchField as RailsSearchField,
  SingleSelect as RailsSingleSelect,
  MultiSelect as RailsMultiSelect,
  SubmitProps as RailsSubmitButton,
  TelField as RailsTelField,
  TextArea as RailsTextArea,
  TextField as RailsTextField,
  TimeField as RailsTimeField,
  UrlField as RailsUrlField,
  HTMLFormProps as RailsHTMLFormProps,
  ValidationErrors,
  SelectOption,
  SelectOptionGroup,
} from '@thoughtbot/candy_wrapper'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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

export const FieldError = ({ errorKey }: { errorKey: string | undefined }) => {
  const errorMessage = useErrorMessage(errorKey)

  if (!errorMessage) {
    return null
  }

  return <p className="text-sm text-destructive">{errorMessage}</p>
}

type InputProps = {
  label: string
  errorKey?: string
}

export type FieldBaseProps = ComponentProps<typeof Input> & {
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
    <div className="grid gap-2">
      <Label htmlFor={props.id}>{label}</Label>
      {children || <Input {...props} />}
      <FieldError errorKey={errorKey} />
    </div>
  )
}

type CheckboxProps = Omit<ComponentProps<typeof ShadcnCheckbox>, 'type'> &
  RailsCheckboxField &
  InputProps

export const Checkbox = ({
  type: _type,
  includeHidden,
  uncheckedValue,
  errorKey,
  label,
  value,
  ...rest
}: CheckboxProps) => {
  const { name, ...checkboxRest } = rest

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        {includeHidden && (
          <input
            type="hidden"
            name={name}
            defaultValue={uncheckedValue}
            autoComplete="off"
          />
        )}
        <ShadcnCheckbox id={checkboxRest.id} name={name} value={value} {...checkboxRest} />
        <Label htmlFor={checkboxRest.id}>{label}</Label>
      </div>
      <FieldError errorKey={errorKey} />
    </div>
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

  const checkboxes = collection.map((options) => {
    return <Checkbox {...options} key={options.id} />
  })

  const { name } = collection[0]

  return (
    <div className="grid gap-2">
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <Label>{label}</Label>
      <div className="grid gap-2">{checkboxes}</div>
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

  const defaultItem = collection.find((option) => !!option.defaultChecked)
  const item = collection.find((option) => !!option.checked)

  const { name } = collection[0]

  return (
    <div className="grid gap-2">
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <Label>{label}</Label>
      <RadioGroup
        name={name}
        defaultValue={defaultItem?.value}
        value={item?.value}
      >
        {collection.map((option) => (
          <div className="flex items-center gap-2" key={option.value}>
            <RadioGroupItem value={option.value} id={option.id} />
            <Label htmlFor={option.id}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <FieldError errorKey={errorKey} />
    </div>
  )
}

export type TextFieldProps = ComponentProps<typeof Input> &
  RailsTextField &
  InputProps

export const TextField = ({
  type: _type,
  errorKey,
  ...rest
}: TextFieldProps) => {
  return <FieldBase {...rest} type="text" errorKey={errorKey} />
}

export type EmailFieldProps = ComponentProps<typeof Input> &
  RailsEmailField &
  InputProps

export const EmailField = ({
  type: _type,
  errorKey,
  ...rest
}: EmailFieldProps) => {
  return <FieldBase {...rest} type="email" errorKey={errorKey} />
}

export type ColorFieldProps = ComponentProps<typeof Input> &
  RailsColorField &
  InputProps

export const ColorField = ({
  type: _type,
  errorKey,
  ...rest
}: ColorFieldProps) => {
  return <FieldBase {...rest} type="color" errorKey={errorKey} />
}

export type DateFieldProps = ComponentProps<typeof Input> &
  RailsDateField &
  InputProps

export const DateField = ({
  type: _type,
  errorKey,
  ...rest
}: DateFieldProps) => {
  return <FieldBase {...rest} type="date" errorKey={errorKey} />
}

export type DateTimeLocalFieldProps = ComponentProps<typeof Input> &
  RailsDateTimeLocalField &
  InputProps

export const DateTimeLocalField = ({
  type: _type,
  errorKey,
  ...rest
}: DateTimeLocalFieldProps) => {
  return <FieldBase {...rest} type="datetime-local" errorKey={errorKey} />
}

export type SearchFieldProps = ComponentProps<typeof Input> &
  RailsSearchField &
  InputProps

export const SearchField = ({
  type: _type,
  errorKey,
  ...rest
}: SearchFieldProps) => {
  return <FieldBase {...rest} type="search" errorKey={errorKey} />
}

export type TelFieldProps = ComponentProps<typeof Input> &
  RailsTelField &
  InputProps

export const TelField = ({
  type: _type,
  errorKey,
  ...rest
}: TelFieldProps) => {
  return <FieldBase {...rest} type="tel" errorKey={errorKey} />
}

export type UrlFieldProps = ComponentProps<typeof Input> &
  RailsUrlField &
  InputProps

export const UrlField = ({
  type: _type,
  errorKey,
  ...rest
}: UrlFieldProps) => {
  return <FieldBase {...rest} type="url" errorKey={errorKey} />
}

export type MonthFieldProps = ComponentProps<typeof Input> &
  RailsMonthField &
  InputProps

export const MonthField = ({
  type: _type,
  errorKey,
  ...rest
}: MonthFieldProps) => {
  return <FieldBase {...rest} type="month" errorKey={errorKey} />
}

export type TimeFieldProps = ComponentProps<typeof Input> &
  RailsTimeField &
  InputProps

export const TimeField = ({
  type: _type,
  errorKey,
  ...rest
}: TimeFieldProps) => {
  return <FieldBase {...rest} type="time" errorKey={errorKey} />
}

export type NumberFieldProps = ComponentProps<typeof Input> &
  RailsNumberField &
  InputProps

export const NumberField = ({
  type: _type,
  errorKey,
  ...rest
}: NumberFieldProps) => {
  return <FieldBase {...rest} type="number" errorKey={errorKey} />
}

export type RangeFieldProps = Omit<ComponentProps<typeof Slider>, 'type'> &
  RailsRangeField &
  InputProps

export const RangeField = ({
  type: _type,
  label,
  errorKey,
  name,
  value,
  defaultValue,
  min,
  max,
  ...rest
}: RangeFieldProps) => {
  const numValue = value ? Number(value) : undefined
  const numDefault = defaultValue ? Number(defaultValue) : undefined
  const numMin = min ? Number(min) : 0
  const numMax = max ? Number(max) : 100

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Slider
        name={name}
        value={numValue !== undefined ? [numValue] : undefined}
        defaultValue={numDefault !== undefined ? [numDefault] : [numMin]}
        min={numMin}
        max={numMax}
        {...rest}
      />
      <FieldError errorKey={errorKey} />
    </div>
  )
}

export type PasswordFieldProps = ComponentProps<typeof Input> &
  RailsPasswordField &
  InputProps

export const PasswordField = ({
  type: _type,
  errorKey,
  ...rest
}: PasswordFieldProps) => {
  return <FieldBase {...rest} type="password" errorKey={errorKey} />
}

type SelectProps = (
  | (ComponentProps<typeof ShadcnSelect> & RailsSingleSelect)
  | (React.SelectHTMLAttributes<HTMLSelectElement> & RailsMultiSelect)
) &
  InputProps

export const Select = ({
  includeHidden,
  name,
  options,
  errorKey,
  type: _type,
  ...rest
}: SelectProps) => {
  if ('multiple' in rest && rest.multiple) {
    const { multiple, label, id, defaultvalue, value, ...nativeRest } = rest
    const addHidden = includeHidden && multiple

    const optionElements = options.map((item: SelectOption | SelectOptionGroup) => {
      if ('options' in item) {
        return (
          <optgroup label={item.label} key={item.label}>
            {item.options.map((opt: SelectOption) => (
              <option key={opt.label} {...opt} />
            ))}
          </optgroup>
        )
      } else {
        return <option key={item.label} {...item} />
      }
    })

    return (
      <div className="grid gap-2">
        {addHidden && (
          <input type="hidden" name={name} value={''} autoComplete="off" />
        )}
        <Label htmlFor={id}>{label}</Label>
        <select
          name={name}
          id={id}
          multiple={multiple}
          defaultValue={defaultvalue}
          value={value}
          {...nativeRest}
        >
          {optionElements}
        </select>
        <FieldError errorKey={errorKey} />
      </div>
    )
  }

  const { label, id, defaultvalue, value, ...selectRest } = rest as Omit<
    ComponentProps<typeof ShadcnSelect> & RailsSingleSelect & InputProps,
    'type' | 'includeHidden' | 'name' | 'options' | 'errorKey'
  >

  const hasGroups = options.some((item: SelectOption | SelectOptionGroup) => 'options' in item)

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <ShadcnSelect
        name={name}
        defaultValue={defaultvalue}
        value={value}
        {...selectRest}
      >
        <SelectTrigger id={id}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {hasGroups
            ? options.map((item: SelectOption | SelectOptionGroup) => {
                if ('options' in item) {
                  return (
                    <SelectGroup key={item.label}>
                      <SelectLabel>{item.label}</SelectLabel>
                      {item.options.map((opt: SelectOption) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          disabled={opt.disabled}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )
                }
                return (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </SelectItem>
                )
              })
            : options.map((item: SelectOption | SelectOptionGroup) => {
                if ('options' in item) return null
                return (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </SelectItem>
                )
              })}
        </SelectContent>
      </ShadcnSelect>
      <FieldError errorKey={errorKey} />
    </div>
  )
}

export type TextAreaProps = ComponentProps<typeof Textarea> &
  RailsTextArea &
  InputProps

export const TextArea = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: TextAreaProps) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={rest.id}>{label}</Label>
      <Textarea {...rest} />
      <FieldError errorKey={errorKey} />
    </div>
  )
}

export type FileFieldProps = ComponentProps<typeof Input> &
  RailsFileField &
  InputProps

export const FileField = ({
  type: _type,
  errorKey,
  ...rest
}: FileFieldProps) => {
  return <FieldBase {...rest} type="file" errorKey={errorKey} />
}

export type SubmitButtonProps = ComponentProps<typeof Button> & RailsSubmitButton

export const SubmitButton = ({
  type: _type,
  text,
  ...rest
}: SubmitButtonProps) => {
  return (
    <Button {...rest} type="submit">
      {text}
    </Button>
  )
}
