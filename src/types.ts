export interface BaseInputField {
  size?: number
  maxLength?: number
  value?: string
  defaultValue?: string
  name: string
  id?: string
}

export interface TextField extends BaseInputField {
  readonly type: 'text'
}

export interface EmailField extends BaseInputField {
  readonly type: 'email'
}

export interface FileField extends Omit<BaseInputField, 'value'> {
  readonly type: 'file'
}

export interface DateField extends BaseInputField {
  readonly type: 'date'
  min?: string
  max?: string
}

export interface DateTimeLocalField extends BaseInputField {
  readonly type: 'datetime-local'
  min?: string
  max?: string
}

export interface ColorField extends BaseInputField {
  readonly type: 'color'
}

export interface HiddenField extends BaseInputField {
  readonly type: 'hidden'
}

export interface MonthField extends BaseInputField {
  readonly type: 'month'
}

export interface NumberField extends BaseInputField {
  readonly type: 'number'
  max?: number
  min?: number
}

export interface PasswordField extends BaseInputField {
  readonly type: 'password'
}

export interface SearchField extends BaseInputField {
  readonly type: 'search'

  // this no longer exist in the HTML standard
  autosave?: string
  results?: number

  // this no longer exist in the HTML standard
  onsearch: string
  incremental?: boolean
}

export interface TelField extends BaseInputField {
  readonly type: 'tel'
}

export interface UrlField extends BaseInputField {
  readonly type: 'url'
}

export interface RangeField extends BaseInputField {
  readonly type: 'range'
}

export interface TimeField extends BaseInputField {
  readonly type: 'time'
}

export interface CheckboxField {
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

export interface CheckboxFieldWithLabel extends CheckboxField {
  label: string
}

export interface CollectionCheckboxesField {
  collection: CheckboxFieldWithLabel[]
  includeHidden: boolean
}

export interface RadioButtonField {
  readonly type: 'radio'
  name: string
  id?: string

  value: string
  checked?: boolean
  defaultChecked?: boolean
}

export interface RadioButtonFieldWithLabel extends CheckboxField {
  label: string
}

export interface CollectionRadioButtonsField {
  collection: RadioButtonFieldWithLabel[]
  includeHidden: boolean
}

export interface TextArea {
  cols?: number
  rows?: number
  readonly type: 'textarea'
  value?: string
  defaultValue?: string
  name: string
  id?: string
}

export interface SubmitButton {
  readonly type: 'submit'
  text: string
  name: string
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectOptionGroup {
  label: string
  options: SelectOption[]
}

export interface Select {
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
