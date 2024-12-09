export type BaseInputField = {
  size?: number
  maxLength?: number
  value?: string
  defaultValue?: string
  name: string
  id?: string
}

export type TextField = BaseInputField & {
  readonly type: 'text'
}

export type EmailField = BaseInputField & {
  readonly type: 'email'
}

export type FileField = Omit<BaseInputField, 'value'> & {
  readonly type: 'file'
}

export type DateField = BaseInputField & {
  readonly type: 'date'
  min?: string
  max?: string
}

export type DateTimeLocalField = BaseInputField & {
  readonly type: 'datetime-local'
  min?: string
  max?: string
}

export type ColorField = BaseInputField & {
  readonly type: 'color'
}

export type HiddenField = BaseInputField & {
  readonly type: 'hidden'
}

export type MonthField = BaseInputField & {
  readonly type: 'month'
}

export type NumberField = BaseInputField & {
  readonly type: 'number'
  max?: number
  min?: number
}

export type PasswordField = BaseInputField & {
  readonly type: 'password'
}

export type SearchField = BaseInputField & {
  readonly type: 'search'

  // this no longer exist in the HTML standard
  autosave?: string
  results?: number

  // this no longer exist in the HTML standard
  onsearch: string
  incremental?: boolean
}

export type TelField = BaseInputField & {
  readonly type: 'tel'
}

export type UrlField = BaseInputField & {
  readonly type: 'url'
}

export type RangeField = BaseInputField & {
  readonly type: 'range'
}

export type TimeField = BaseInputField & {
  readonly type: 'time'
}

export type CheckboxField = {
  readonly type: 'checkbox'
  includeHidden: boolean
  name: string
  id?: string

  // todo: changed to be .to_s in
  uncheckedValue: string

  value: string
  checked?: boolean
  defaultChecked?: boolean
}

export type CheckboxFieldWithLabel = CheckboxField & {
  label: string
}

export type CollectionCheckboxesField = {
  collection: CheckboxFieldWithLabel[]
  includeHidden: boolean
}

export type RadioButtonField = {
  readonly type: 'radio'
  name: string
  id?: string

  value: string
  checked?: boolean
  defaultChecked?: boolean
}

export type RadioButtonFieldWithLabel = CheckboxField & {
  label: string
}

export type CollectionRadioButtonsField = {
  collection: RadioButtonFieldWithLabel[]
  includeHidden: boolean
}

export type TextArea = {
  cols?: number
  rows?: number
  readonly type: 'textarea'
  value?: string
  defaultValue?: string
  name: string
  id?: string
}

export type SubmitProps = {
  readonly type: 'submit'
  text: string
  name: string
}

export type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

export type SelectOptionGroup = {
  label: string
  options: SelectOption[]
}

export type Select = {
  readonly type: 'select'
  id?: string
  name: string
  defaultValue?: string
  value?: string
  multiple?: boolean
  includeHidden: boolean
  options: (SelectOption | SelectOptionGroup)[]
}

export type ValidationError = string | string[]
export type ValidationErrors = Record<string, ValidationError>
