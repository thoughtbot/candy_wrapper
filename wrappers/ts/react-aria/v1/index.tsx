/**
 * A set of [candy_wrappers](https://github.com/thoughtbot/candy_wrapper) around
 * React Aria Components input components. It works with the output from
 * [FormProps](https://github.com/thoughtbot/form_props).
 *
 * You modify these components to fit your design needs.
 */

import React, { useContext, useMemo } from 'react'
import {
  parseDate,
  parseDateTime,
  parseTime,
} from '@internationalized/date'

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
} from '@thoughtbot/candy_wrapper'

import {
  Button as AriaButton,
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  CheckboxProps as AriaCheckboxProps,
  ColorField as AriaColorField,
  DateField as AriaDateField,
  DateInput as AriaDateInput,
  DateFieldProps as AriaDateFieldProps,
  DateSegment as AriaDateSegment,
  DateValue,
  FieldError as AriaFieldError,
  FileTrigger as AriaFileTrigger,
  Form as AriaForm,
  FormProps as AriaFormProps,
  FormValidationContext,
  Group as AriaGroup,
  Input as AriaInput,
  Label as AriaLabel,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  NumberField as AriaNumberField,
  NumberFieldProps as AriaNumberFieldProps,
  Popover as AriaPopover,
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  SearchField as AriaSearchField,
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
  Slider as AriaSlider,
  SliderOutput as AriaSliderOutput,
  SliderThumb as AriaSliderThumb,
  SliderTrack as AriaSliderTrack,
  TextArea as AriaTextArea,
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
  TimeField as AriaTimeField,
  TimeFieldProps as AriaTimeFieldProps,
  TimeValue,
} from 'react-aria-components'

// Re-export FormValidationContext as ValidationContext for backwards compat
export { FormValidationContext as ValidationContext } from 'react-aria-components'

/**
 * Maps an errorKey to the field's name in FormValidationContext.
 * This bridges Rails error keys (e.g., 'birth_date') to React Aria's
 * native validation system which keys errors by field name.
 */
export const useErrorKeyValidation = ({
  errorKey,
  name,
}: {
  errorKey?: string
  name?: string
}) => {
  const serverErrors = useContext(FormValidationContext)

  return useMemo(() => {
    if (name && serverErrors && errorKey && serverErrors[errorKey]) {
      return { [name]: serverErrors[errorKey] }
    }
    return serverErrors
  }, [serverErrors, errorKey, name])
}

export const useErrorMessage = (errorKey?: string) => {
  const errors = useContext(FormValidationContext)

  return useMemo(() => {
    if (!errorKey) {
      return null
    }

    const validationError = errors[errorKey]
    if (!validationError) {
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

type FormElementProps = AriaFormProps & {
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
    <AriaForm {...props} validationErrors={validationErrors}>
      <FormValidationContext.Provider value={validationErrors}>
        <Extras {...extras}></Extras>
        {children}
      </FormValidationContext.Provider>
    </AriaForm>
  )
}

type InputProps = {
  label: string
  errorKey?: string
}

// -- Transform functions --

export const checkboxPropsToRACProps = (
  props: Partial<RailsCheckboxField>
) => {
  const { defaultChecked, checked, type: _type, ...rest } = props
  const racProps: Partial<AriaCheckboxProps> = { ...rest }

  if (defaultChecked !== undefined) {
    racProps.defaultSelected = defaultChecked
  }
  if (checked !== undefined) {
    racProps.isSelected = checked
  }

  return racProps
}

export const textFieldToRACProps = (
  props: Partial<RailsTextField>
) => {
  const { type: _type, ...rest } = props
  return rest as AriaTextFieldProps
}

export const numberFieldToRACProps = (
  props: Partial<RailsNumberField>
) => {
  const { value, defaultValue, min, max, type: _type, ...rest } = props
  const racProps: Partial<AriaNumberFieldProps> = { ...rest }

  if (value !== undefined && value !== '') {
    racProps.value = Number(value)
  }
  if (defaultValue !== undefined && defaultValue !== '') {
    racProps.defaultValue = Number(defaultValue)
  }
  if (min !== undefined) {
    racProps.minValue = min
  }
  if (max !== undefined) {
    racProps.maxValue = max
  }

  return racProps
}

export const dateFieldToRACProps = (
  props: Partial<RailsDateField>
) => {
  const { max, min, value, defaultValue, type: _type, ...rest } = props
  const racProps: Partial<AriaDateFieldProps<DateValue>> = { ...rest }

  if (max) racProps.maxValue = parseDate(max)
  if (min) racProps.minValue = parseDate(min)
  if (defaultValue) racProps.defaultValue = parseDate(defaultValue)
  if (value) racProps.value = parseDate(value)

  return racProps
}

export const dateTimeLocalFieldToRACProps = (
  props: Partial<RailsDateTimeLocalField>
) => {
  const { max, min, value, defaultValue, type: _type, ...rest } = props
  const racProps: Partial<AriaDateFieldProps<DateValue>> = { ...rest }
  racProps.granularity = 'second'

  if (max) racProps.maxValue = parseDateTime(max)
  if (min) racProps.minValue = parseDateTime(min)
  if (defaultValue) racProps.defaultValue = parseDateTime(defaultValue)
  if (value) racProps.value = parseDateTime(value)

  return racProps
}

export const timeFieldToRACProps = (
  props: Partial<RailsTimeField>
) => {
  const { min, max, value, defaultValue, type: _type, ...rest } = props
  const racProps: Partial<AriaTimeFieldProps<TimeValue>> = { ...rest }

  if (value) racProps.value = parseTime(value)
  if (defaultValue) racProps.defaultValue = parseTime(defaultValue)
  if (min) racProps.minValue = parseTime(min)
  if (max) racProps.maxValue = parseTime(max)

  return racProps
}

// -- Components --

type CheckboxProps = RailsCheckboxField & InputProps

export const Checkbox = ({
  includeHidden,
  uncheckedValue,
  errorKey,
  label,
  ...rest
}: CheckboxProps) => {
  const racProps = checkboxPropsToRACProps(rest)
  const { name } = racProps
  const validationErrors = useErrorKeyValidation({ errorKey, name })

  return (
    <FormValidationContext.Provider value={validationErrors}>
      {includeHidden && (
        <input
          type="hidden"
          name={name}
          defaultValue={uncheckedValue}
          autoComplete="off"
        />
      )}
      <AriaCheckbox {...racProps}>
        <div className="checkbox">
          <svg viewBox="0 0 18 18" aria-hidden="true">
            <polyline points="1 9 7 14 15 4" />
          </svg>
        </div>
        {label}
      </AriaCheckbox>
    </FormValidationContext.Provider>
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

  const defaultItems = collection.filter((option) => !!option.defaultChecked)
  const items = collection.filter((option) => !!option.checked)
  const valueProps: { value?: string[]; defaultValue?: string[] } = {}
  if (defaultItems.length > 0) {
    valueProps.defaultValue = defaultItems.map((option) => option.value)
  } else if (items.length > 0) {
    valueProps.value = items.map((option) => option.value)
  }

  const { name } = collection[0]
  const validationErrors = useErrorKeyValidation({ errorKey, name })
  const errorMessage = useErrorMessage(errorKey)

  return (
    <FormValidationContext.Provider value={validationErrors}>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <AriaCheckboxGroup {...valueProps} isInvalid={!!errorMessage}>
        <AriaLabel>{label}</AriaLabel>
        {collection.map(({ checked: _checked, defaultChecked: _defaultChecked, ...checkboxProps }) => (
          <AriaCheckbox
            key={checkboxProps.id}
            name={name}
            value={checkboxProps.value}
            id={checkboxProps.id}
          >
            <div className="checkbox">
              <svg viewBox="0 0 18 18" aria-hidden="true">
                <polyline points="1 9 7 14 15 4" />
              </svg>
            </div>
            {checkboxProps.label}
          </AriaCheckbox>
        ))}
        {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
      </AriaCheckboxGroup>
    </FormValidationContext.Provider>
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
  const valueProps: { value?: string; defaultValue?: string } = {}
  if (defaultItem) {
    valueProps.defaultValue = defaultItem.value
  } else if (item) {
    valueProps.value = item.value
  }

  const { name } = collection[0]
  const validationErrors = useErrorKeyValidation({ errorKey, name })
  const errorMessage = useErrorMessage(errorKey)

  return (
    <FormValidationContext.Provider value={validationErrors}>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <AriaRadioGroup name={name} {...valueProps} isInvalid={!!errorMessage}>
        <AriaLabel>{label}</AriaLabel>
        {collection.map(({ label: optionLabel, type: _type, ...radioProps }) => (
          <AriaRadio key={radioProps.value} value={radioProps.value} id={radioProps.id}>
            {optionLabel}
          </AriaRadio>
        ))}
        {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
      </AriaRadioGroup>
    </FormValidationContext.Provider>
  )
}

const TextBase = ({
  errorKey,
  children,
  ...props
}: { errorKey?: string; children: React.ReactNode } & AriaTextFieldProps) => {
  const validationErrors = useErrorKeyValidation({ errorKey, name: props.name })

  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaTextField {...props}>
        {children}
      </AriaTextField>
    </FormValidationContext.Provider>
  )
}

export type TextFieldProps = RailsTextField & InputProps

export const TextField = ({ label, errorKey, ...rest }: TextFieldProps) => {
  const racProps = textFieldToRACProps(rest)

  return (
    <TextBase errorKey={errorKey} {...racProps}>
      <AriaLabel>{label}</AriaLabel>
      <AriaInput />
      <AriaFieldError />
    </TextBase>
  )
}

export type EmailFieldProps = RailsEmailField & InputProps

export const EmailField = ({ label, errorKey, ...rest }: EmailFieldProps) => {
  const { type: _type, ...props } = rest

  return (
    <TextBase errorKey={errorKey} {...props} type="email">
      <AriaLabel>{label}</AriaLabel>
      <AriaInput />
      <AriaFieldError />
    </TextBase>
  )
}

export type ColorFieldProps = RailsColorField & InputProps

export const ColorField = ({ label, errorKey, type: _type, ...rest }: ColorFieldProps) => {
  const validationErrors = useErrorKeyValidation({ errorKey, name: rest.name })

  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaColorField {...rest}>
        <AriaLabel>{label}</AriaLabel>
        <AriaInput />
        <AriaFieldError />
      </AriaColorField>
    </FormValidationContext.Provider>
  )
}

export type DateFieldProps = RailsDateField & InputProps

export const DateField = ({ label, errorKey, ...rest }: DateFieldProps) => {
  const racProps = dateFieldToRACProps(rest)
  const validationErrors = useErrorKeyValidation({ errorKey, name: rest.name })

  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaDateField {...racProps}>
        <AriaLabel>{label}</AriaLabel>
        <AriaDateInput>
          {(segment) => <AriaDateSegment segment={segment} />}
        </AriaDateInput>
        <AriaFieldError />
      </AriaDateField>
    </FormValidationContext.Provider>
  )
}

export type DateTimeLocalFieldProps = RailsDateTimeLocalField & InputProps

export const DateTimeLocalField = ({ label, errorKey, ...rest }: DateTimeLocalFieldProps) => {
  const racProps = dateTimeLocalFieldToRACProps(rest)
  const validationErrors = useErrorKeyValidation({ errorKey, name: rest.name })

  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaDateField {...racProps}>
        <AriaLabel>{label}</AriaLabel>
        <AriaDateInput>
          {(segment) => <AriaDateSegment segment={segment} />}
        </AriaDateInput>
        <AriaFieldError />
      </AriaDateField>
    </FormValidationContext.Provider>
  )
}

export type TimeFieldProps = RailsTimeField & InputProps

export const TimeField = ({ label, errorKey, ...rest }: TimeFieldProps) => {
  const racProps = timeFieldToRACProps(rest)
  const validationErrors = useErrorKeyValidation({ errorKey, name: rest.name })

  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaTimeField {...racProps}>
        <AriaLabel>{label}</AriaLabel>
        <AriaDateInput>
          {(segment) => <AriaDateSegment segment={segment} />}
        </AriaDateInput>
        <AriaFieldError />
      </AriaTimeField>
    </FormValidationContext.Provider>
  )
}

export type SearchFieldProps = RailsSearchField & InputProps

export const SearchField = ({
  label,
  errorKey,
  type: _type,
  autosave: _autosave,
  results: _results,
  onsearch: _onsearch,
  incremental: _incremental,
  ...rest
}: SearchFieldProps) => {
  const validationErrors = useErrorKeyValidation({ errorKey, name: rest.name })

  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaSearchField {...rest}>
        <AriaLabel>{label}</AriaLabel>
        <AriaInput />
        <AriaFieldError />
      </AriaSearchField>
    </FormValidationContext.Provider>
  )
}

export type TelFieldProps = RailsTelField & InputProps

export const TelField = ({ label, errorKey, ...rest }: TelFieldProps) => {
  const { type: _type, ...props } = rest

  return (
    <TextBase errorKey={errorKey} {...props} type="tel">
      <AriaLabel>{label}</AriaLabel>
      <AriaInput />
      <AriaFieldError />
    </TextBase>
  )
}

export type UrlFieldProps = RailsUrlField & InputProps

export const UrlField = ({ label, errorKey, ...rest }: UrlFieldProps) => {
  const { type: _type, ...props } = rest

  return (
    <TextBase errorKey={errorKey} {...props} type="url">
      <AriaLabel>{label}</AriaLabel>
      <AriaInput />
      <AriaFieldError />
    </TextBase>
  )
}

export type MonthFieldProps = RailsMonthField & InputProps

export const MonthField = ({ label, errorKey, type: _type, ...rest }: MonthFieldProps) => {
  return (
    <TextBase errorKey={errorKey} {...rest}>
      <AriaLabel>{label}</AriaLabel>
      <AriaInput type="month" />
      <AriaFieldError />
    </TextBase>
  )
}

export type NumberFieldProps = RailsNumberField & InputProps

export const NumberField = ({ label, errorKey, ...rest }: NumberFieldProps) => {
  const racProps = numberFieldToRACProps(rest)
  const validationErrors = useErrorKeyValidation({ errorKey, name: rest.name })

  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaNumberField {...racProps}>
        <AriaLabel>{label}</AriaLabel>
        <AriaGroup>
          <AriaButton slot="decrement">-</AriaButton>
          <AriaInput />
          <AriaButton slot="increment">+</AriaButton>
        </AriaGroup>
        <AriaFieldError />
      </AriaNumberField>
    </FormValidationContext.Provider>
  )
}

export type RangeFieldProps = RailsRangeField & InputProps

export const RangeField = ({
  label,
  errorKey,
  value,
  defaultValue,
  min,
  max,
  type: _type,
  ...rest
}: RangeFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)
  const numericValue = value ? Number(value) : undefined
  const numericDefault = defaultValue ? Number(defaultValue) : undefined

  return (
    <>
      <AriaSlider defaultValue={numericDefault} value={numericValue} minValue={min} maxValue={max}>
        <AriaLabel>{label}</AriaLabel>
        <AriaSliderOutput />
        <AriaSliderTrack>
          <AriaSliderThumb />
        </AriaSliderTrack>
      </AriaSlider>
      <input
        type="hidden"
        name={rest.name}
        value={numericValue ?? numericDefault ?? ''}
      />
      {errorMessage && <span>{errorMessage}</span>}
    </>
  )
}

export type PasswordFieldProps = RailsPasswordField & InputProps

export const PasswordField = ({ label, errorKey, ...rest }: PasswordFieldProps) => {
  const { type: _type, ...props } = rest

  return (
    <TextBase errorKey={errorKey} {...props} type="password">
      <AriaLabel>{label}</AriaLabel>
      <AriaInput />
      <AriaFieldError />
    </TextBase>
  )
}

type SelectProps = (RailsSingleSelect | RailsMultiSelect) & InputProps

export const Select = ({
  includeHidden,
  label,
  errorKey,
  multiple,
  type: _type,
  options,
  ...rest
}: SelectProps) => {
  const { name } = rest
  const validationErrors = useErrorKeyValidation({ errorKey, name })
  const addHidden = includeHidden && multiple

  const flatOptions = options.flatMap((item) => {
    if ('options' in item) {
      return item.options
    }
    return [item]
  })

  const selectedValue = 'value' in rest ? rest.value : undefined
  const selectedDefault =
    'defaultValue' in rest ? rest.defaultValue : undefined

  const selectionProps: Record<string, unknown> = {}
  if (multiple) {
    selectionProps.selectionMode = 'multiple'
    if (selectedValue) {
      selectionProps.value = Array.isArray(selectedValue)
        ? selectedValue
        : [selectedValue]
    } else if (selectedDefault) {
      selectionProps.defaultValue = Array.isArray(selectedDefault)
        ? selectedDefault
        : [selectedDefault]
    }
  } else {
    if (selectedValue) {
      selectionProps.value = Array.isArray(selectedValue)
        ? selectedValue[0]
        : selectedValue
    } else if (selectedDefault) {
      selectionProps.defaultValue = Array.isArray(selectedDefault)
        ? selectedDefault[0]
        : selectedDefault
    }
  }

  return (
    <FormValidationContext.Provider value={validationErrors}>
      {addHidden && (
        <input type="hidden" name={name} value={''} autoComplete="off" />
      )}
      <AriaSelect name={name} {...selectionProps}>
        <AriaLabel>{label}</AriaLabel>
        <AriaButton>
          <AriaSelectValue />
          <span aria-hidden="true">▼</span>
        </AriaButton>
        <AriaFieldError />
        <AriaPopover>
          <AriaListBox>
            {flatOptions.map((opt) => (
              <AriaListBoxItem
                key={opt.value}
                id={opt.value}
                textValue={opt.label}
                isDisabled={opt.disabled}
              >
                {opt.label}
              </AriaListBoxItem>
            ))}
          </AriaListBox>
        </AriaPopover>
      </AriaSelect>
    </FormValidationContext.Provider>
  )
}

export type TextAreaProps = RailsTextArea & InputProps

export const TextArea = ({ label, errorKey, type: _type, ...rest }: TextAreaProps) => {
  return (
    <TextBase errorKey={errorKey} {...rest}>
      <AriaLabel>{label}</AriaLabel>
      <AriaTextArea />
      <AriaFieldError />
    </TextBase>
  )
}

export type FileFieldProps = RailsFileField & InputProps

export const FileField = ({ type: _type, label, errorKey }: FileFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <>
      <AriaFileTrigger>
        <AriaButton>{label}</AriaButton>
      </AriaFileTrigger>
      {errorMessage && <span>{errorMessage}</span>}
    </>
  )
}

export type SubmitButtonProps = RailsSubmitButton

export const SubmitButton = ({ type: _type, text, ...rest }: SubmitButtonProps) => {
  return (
    <AriaButton {...rest} type="submit">
      {text}
    </AriaButton>
  )
}
