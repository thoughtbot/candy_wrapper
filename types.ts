import { ReactNode } from 'react'

type JSONObject = {
  [key: string]: JSONValue
}
type JSONPrimitive = string | number | boolean | null | undefined
type JSONMappable = JSONValue[] | JSONObject
type JSONValue = JSONPrimitive | JSONMappable

export interface InputBase {
  id?: string
  className?: string
  name?: string
  errorKey?: string
  required?: boolean
  // type: string
  // value?: JSONValue
  // defaultValue?: JSONValue
  children: ReactNode
  // [key: string]: JSONValue; for addiotional html elements
}

export interface TextFieldProps extends InputBase {
  value?: string
  label?: string
  defaultValue?: string
  type: string
  // readonly type: 'text'
}

export type TextAreaProps = TextFieldProps

export interface EmailFieldProps extends InputBase {
  errorKey?: string
  value?: string
  label?: string
  required?: boolean
  defaultValue?: string
  readonly type: 'email'
}

export interface TelFieldProps extends InputBase {
  errorKey?: string
  value?: string
  label?: string
  required?: boolean
  defaultValue?: string
  readonly type: 'tel'
}

export interface ColorFieldProps extends InputBase {
  errorKey?: string
  value?: string
  label?: string
  required?: boolean
  defaultValue?: string
  readonly type: 'color'
}

export interface FileField extends InputBase {
  readonly type: 'file'
}

export interface HiddenField extends InputBase {
  value?: string
  name: string
  defaultValue?: string
  readonly type: 'hidden'
  readonly autoComplete: 'off'
}

export interface NumberFieldProps extends InputBase {
  readonly type: 'number'
  errorKey?: string
  value?: string
  label?: string
  required?: boolean
  defaultValue?: string
  min?: number
  max?: number
  step?: number
}

export interface RangeFieldProps extends Omit<NumberFieldProps, 'type'> {
  readonly type: 'range'
}

export interface TimeFieldProps extends InputBase {
  readonly type: 'time'
  errorKey?: string
  value?: string
  label?: string
  required?: boolean
  defaultValue?: string
  min?: string
  max?: string
  step?: number
}

export interface RangeField extends InputBase {
  readonly type: 'range'
}

export interface PasswordFieldProps extends InputBase {
  errorKey?: string
  value?: string
  label?: string
  required?: boolean
  defaultValue?: string
  readonly type: 'password'
}

export interface TelField extends InputBase {
  readonly type: 'tel'
}

export interface UrlField extends InputBase {
  readonly type: 'tel'
}

export interface DateFieldProps extends InputBase {
  errorKey?: string
  value?: string
  label?: string
  required?: boolean
  defaultValue?: string
  min?: string
  max?: string
  readonly type: 'date'
}

export interface DatetimeLocalFieldProps extends Omit<DateFieldProps, 'type'> {
  readonly type: 'datetime-local'
}

export interface SearchFieldProps extends InputBase {
  readonly type: 'search'
  errorKey?: string
  value?: string
  label?: string
  required?: boolean
  defaultValue?: string
}

export interface CheckboxInputProps {
  readonly type: 'checkbox'
  required?: boolean
  name?: string
  checked?: boolean
  defaultChecked?: boolean
  id?: string
  className?: string
  value: string
}

export interface CheckboxFieldProps extends CheckboxInputProps {
  errorKey?: string
  label?: string
  uncheckedValue: string
  includeHidden: boolean
}

export interface RadioButtonProps {
  readonly type: 'radio'
  checked?: boolean
  defaultChecked?: boolean
  // uncheckedValue: string
  // includeHidden: boolean
  id?: string
  name?: string
  className?: string
  value: string
  // defaultValue?: JSONValue
}

export interface RadioButtonWithLabel extends RadioButtonProps {
  label?: string
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

export interface SelectBase {
  readonly type?: 'select'
  id?: string
  className?: string
  name?: string
  required?: boolean
  defaultValue?: string
  value?: string
  multiple?: boolean
  disabled?: boolean
  includeHidden: boolean
  options: (SelectOption | SelectOptionGroup)[]
}

export interface SelectProps extends SelectBase {
  label?: string
  errorKey?: string
}

export interface CollectionSelect extends SelectBase {}

export interface GroupedCollectionSelect extends SelectBase {
  options: []
}

export interface CollectionCheckboxesInputProps {
  collection: (CheckboxInputProps & { label: string })[]
  includeHidden: boolean
  // add documentation about required not being a thing...
}

export interface CollectionCheckboxesFieldProps
  extends CollectionCheckboxesInputProps {
  errorKey?: string
  label?: string
  // value?: string | undefined
  id?: string
  className?: string
}

export interface CollectionRadioButtonsProps {
  collection: RadioButtonWithLabel[]
  name?: string
  includeHidden: boolean
  errorKey?: string
  required?: boolean
  label?: string
}

// export type AllInputs =
//   | Select
//   | CollectionRadioButtonsProps
//   | CollectionCheckboxesProps
//   | GroupedCollectionSelect
//   | CollectionSelect
//   | CheckboxProps
//   | RadioButtonProps
//   | FileField
//   | TelField
//   | EmailFieldProps
//   | ColorFieldProps

// export interface FormElementProps {
//   id?: string
//   className?: string
//   multipart?: boolean
//   method?: 'dialog' | 'get' | 'post'
//   action?: string
//   acceptCharset?: string
//   encType?:
//     | 'application/x-www-form-urlencoded'
//     | 'multipart/form-data'
//     | 'text/plain'
//   [key: string]: any
// }

// todo: is it a string of arrays??
export type FlashErrors = Record<string, string[]>
export type Extras = Record<string, HiddenField>

// export interface FormProps {
//   extras: Record<string, HiddenField>
//   inputs: Type
//   form: FormElementProps
//   flashErrors: FormElementProps
//   children: ReactNode
// }

export interface SubmitButtonProps {
  type: 'submit'
  text: string
  name: string
}

// TextInput
// nils will always become undefined
// -size - always  and a;ways number
// - type - safe ot be always
// - value always for <input>, except when the input is a file
//  --- always string, unless its somehow an array. When is it an array??
// - id is optional... due to https://github.com/rails/rails/blob/c7de35a41bd7255249c9a5750e6a6edf75e61c82/actionview/lib/action_view/helpers/tags/base.rb#L96
// -  name is always there.
// -

// for max length
// need to add a story to make this equal with mdn
// If the value of the type attribute is text, email, search, password, tel, or url, this attribute specifies the maximum number of characters (in Unicode code points) that the user can enter; for other control types, it is ignored.

export interface RailsTextField {
  type: 'text'
  size?: number
  maxLength?: number
  value?: string
  defaultValue?: string
  name: string
  id?: string
  // [key: string]: //; for addiotional html elements
}

// export interface TextFieldProps2 extends RailsTextField {
//   label: string
//   errorKey: string
// }

export interface RailsEmailField extends Omit<RailsTextField, 'type'> {
  type: 'email'
}

export interface EmailFieldProps2 extends RailsTextField {
  label: string
  errorKey?: string
}

export interface RailsFileField extends Omit<RailsTextField, 'type' | 'value'> {
  /// is this right?? omit?
  type: 'file'
}

export interface RailsDateField extends Omit<RailsTextField, 'type'> {
  type: 'date'
  min?: string
  max?: string
}

export interface DateFieldProps2 extends RailsDateField {
  label: string
  errorKey?: string
}

export interface RailsDateTimeLocalField extends Omit<RailsTextField, 'type'> {
  type: 'datetime-local'
  min?: string
  max?: string
}

export interface RailsColorField extends Omit<RailsTextField, 'type'> {
  type: 'color'
}

export interface ColorFieldProps2 extends RailsColorField {
  label: string
  errorKey?: string
}

export interface RailsHiddenField extends Omit<RailsTextField, 'type'> {
  type: 'hidden'
}

export interface RailsMonthField extends Omit<RailsTextField, 'type'> {
  type: 'month'
}

export interface RailsNumberField extends Omit<RailsTextField, 'type'> {
  type: 'number'
  max?: number
  min?: number
}

export interface RailsPasswordField extends Omit<RailsTextField, 'type'> {
  type: 'password'
}

export interface RailsSearchField extends Omit<RailsTextField, 'type'> {
  type: 'search'

  // this no longer exist in the HTML standard
  autosave?: string
  results?: number

  // this no longer exist in the HTML standard
  onsearch: string
  incremental?: boolean
}

export interface RailsTelField extends Omit<RailsTextField, 'type'> {
  type: 'tel'
}

export interface RailsUrlField extends Omit<RailsTextField, 'type'> {
  type: 'url'
}

export interface RailsRangeField extends Omit<RailsTextField, 'type'> {
  type: 'range'
}

export interface RailsTimeField extends Omit<RailsTextField, 'type'> {
  type: 'time'
}

// value
export interface RailsCheckboxField {
  type: 'checkbox'
  includeHidden: boolean // already defaulted to be true
  name: string
  id?: string

  // changed to be .to_s in rails
  uncheckedValue: string

  value: string
  checked?: boolean
  defaultChecked?: boolean
  [key: string]: JSONValue //; for addiotional html elements
}

export interface CheckboxFieldProps2 extends RailsCheckboxField {
  label: string
}

export interface RailsCheckboxFieldWithLabel extends RailsCheckboxField {
  label: string
}

export interface RailsCollectionCheckboxesField {
  collection: RailsCheckboxFieldWithLabel[]
  includeHidden: boolean
  // [key: string]: JSONValue //; for addiotional html elements
}

export interface RailsRadioButtonField {
  type: 'radio'
  name: string
  id?: string

  value: string
  checked?: boolean
  defaultChecked?: boolean
  [key: string]: JSONValue //; for addiotional html elements
}

export interface RailsRadioButtonFieldWithLabel extends RailsCheckboxField {
  label: string
}

export interface RailsCollectionRadioButtonsField {
  collection: RailsRadioButtonFieldWithLabel[]
  includeHidden: boolean
  [key: string]: JSONValue //; for addiotional html elements
}

// export interface CollectionCheckboxesFieldProps2
//   extends RailsCollectionRadioButtonsField {
//   errorKey?: string
//   label: string
// }

export interface RailsTextArea {
  cols?: number
  rows?: number
  type: 'text'
  value?: string
  defaultValue?: string
  name: string
  id?: string
  [key: string]: JSONValue //; for addiotional html elements
}

export interface RailsSubmitButton {
  type: 'submit'
  text: string
  name: string
  [key: string]: JSONValue //; for addiotional html elements
}

export interface RailsSelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface RailsSelectOptionGroup {
  label: string
  options: SelectOption[]
}

export interface RailsSelect {
  readonly type?: 'select'
  id?: string
  name: string
  // required?: boolean
  defaultValue?: string
  value?: string
  multiple?: boolean
  // disabled?: boolean
  includeHidden: boolean
  options: (RailsSelectOption | RailsSelectOptionGroup)[]
}
