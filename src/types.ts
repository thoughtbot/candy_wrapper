/**
 * Common attributes present on all input types.
 * Maps to the HTML attributes that every <input> element accepts.
 */
type CommonInputAttributes = {
  name: string
  id?: string
  value?: string
  defaultValue?: string
}

export type TextField = CommonInputAttributes & {
  readonly type: 'text'
  placeholder?: string
  maxLength?: number
  minLength?: number
  size?: number
  pattern?: string
}

export type EmailField = CommonInputAttributes & {
  readonly type: 'email'
  placeholder?: string
  maxLength?: number
  minLength?: number
  size?: number
  pattern?: string
  multiple?: boolean
}

export type PasswordField = CommonInputAttributes & {
  readonly type: 'password'
  placeholder?: string
  maxLength?: number
  minLength?: number
  size?: number
  pattern?: string
}

export type SearchField = CommonInputAttributes & {
  readonly type: 'search'
  placeholder?: string
  maxLength?: number
  minLength?: number
  size?: number
  pattern?: string

  // these no longer exist in the HTML standard
  autosave?: string
  results?: number
  onsearch: string
  incremental?: boolean
}

export type TelField = CommonInputAttributes & {
  readonly type: 'tel'
  placeholder?: string
  maxLength?: number
  minLength?: number
  size?: number
  pattern?: string
}

export type UrlField = CommonInputAttributes & {
  readonly type: 'url'
  placeholder?: string
  maxLength?: number
  minLength?: number
  size?: number
  pattern?: string
}

export type NumberField = CommonInputAttributes & {
  readonly type: 'number'
  placeholder?: string
  min?: number
  max?: number
  step?: number
}

export type RangeField = CommonInputAttributes & {
  readonly type: 'range'
  min?: number
  max?: number
  step?: number
}

export type DateField = CommonInputAttributes & {
  readonly type: 'date'
  min?: string
  max?: string
  step?: number
}

export type DateTimeLocalField = CommonInputAttributes & {
  readonly type: 'datetime-local'
  min?: string
  max?: string
  step?: number
}

export type MonthField = CommonInputAttributes & {
  readonly type: 'month'
  min?: string
  max?: string
  step?: number
}

export type TimeField = CommonInputAttributes & {
  readonly type: 'time'
  min?: string
  max?: string
  step?: number
}

export type ColorField = CommonInputAttributes & {
  readonly type: 'color'
}

export type FileField = {
  readonly type: 'file'
  name?: string
  id?: string
  accept?: string
  multiple?: boolean
}

export type HiddenField = CommonInputAttributes & {
  readonly type: 'hidden'
}

export type CheckboxField = {
  readonly type: 'checkbox'
  name: string
  id?: string
  value: string
  checked?: boolean
  defaultChecked?: boolean
  includeHidden: boolean
  uncheckedValue: string
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

export type RadioButtonFieldWithLabel = RadioButtonField & {
  label: string
}

export type CollectionRadioButtonsField = {
  collection: RadioButtonFieldWithLabel[]
  includeHidden: boolean
}

export type TextArea = {
  readonly type: 'textarea'
  name: string
  id?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  cols?: number
  rows?: number
  maxLength?: number
  minLength?: number
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

type BaseSelect = {
  readonly type: 'select'
  id?: string
  name: string
  includeHidden: boolean
  options: (SelectOption | SelectOptionGroup)[]
}

export type SingleSelect = BaseSelect & {
  multiple?: false
  defaultValue?: string
  value?: string
}

export type MultiSelect = BaseSelect & {
  multiple: true
  defaultValue?: string[]
  value?: string[]
}

export type Select = SingleSelect | MultiSelect

export type ValidationError = string | string[]
export type ValidationErrors = Record<string, ValidationError>

export type HTMLFormProps = {
  id?: string
  className?: string
  method: 'get' | 'post'
  enctype?: 'multipart/form-data'
  acceptCharset: 'UTF-8'
  [key: string]: unknown
}
