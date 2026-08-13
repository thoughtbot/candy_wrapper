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
  CalendarDate,
  CalendarDateTime,
  Time,
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
  ColorField as AriaColorField,
  DateField as AriaDateField,
  DateInput as AriaDateInput,
  DateSegment as AriaDateSegment,
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
  TimeField as AriaTimeField,
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

type CheckboxProps = RailsCheckboxField & InputProps

export const Checkbox = ({
  type: _type,
  includeHidden,
  uncheckedValue,
  errorKey,
  label,
  checked,
  defaultChecked,
  ...rest
}: CheckboxProps) => {
  const { name } = rest
  const validationErrors = useErrorKeyValidation({ errorKey, name })
  const valueProps: { isSelected?: boolean; defaultSelected?: boolean } = {}
  if (checked !== undefined) {
    valueProps.isSelected = checked
  } else if (defaultChecked !== undefined) {
    valueProps.defaultSelected = defaultChecked
  }

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
      <AriaCheckbox
        name={name}
        value={rest.value}
        id={rest.id}
        {...valueProps}
      >
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
    <>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <AriaCheckboxGroup {...valueProps} isInvalid={!!errorMessage}>
        <AriaLabel>{label}</AriaLabel>
        {collection.map((option) => (
          <AriaCheckbox
            key={option.id}
            name={name}
            value={option.value}
            id={option.id}
          >
            <div className="checkbox">
              <svg viewBox="0 0 18 18" aria-hidden="true">
                <polyline points="1 9 7 14 15 4" />
              </svg>
            </div>
            {option.label}
          </AriaCheckbox>
        ))}
        {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
      </AriaCheckboxGroup>
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

  return (
    <FormValidationContext.Provider value={validationErrors}>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <AriaRadioGroup name={name} {...valueProps}>
        <AriaLabel>{label}</AriaLabel>
        {collection.map((option) => (
          <AriaRadio key={option.value} value={option.value} id={option.id}>
            {option.label}
          </AriaRadio>
        ))}
        <AriaFieldError />
      </AriaRadioGroup>
    </FormValidationContext.Provider>
  )
}

const TextBase = ({
  errorKey,
  name,
  children,
  ...props
}: {
  errorKey?: string
  name?: string
  children: React.ReactNode
} & React.ComponentProps<typeof AriaTextField>) => {
  const validationErrors = useErrorKeyValidation({ errorKey, name })

  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaTextField name={name} {...props}>
        {children}
      </AriaTextField>
    </FormValidationContext.Provider>
  )
}

export type TextFieldProps = RailsTextField & InputProps

export const TextField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: TextFieldProps) => {
  return (
    <TextBase
      errorKey={errorKey}
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} placeholder={rest.placeholder} />
      <AriaFieldError />
    </TextBase>
  )
}

export type EmailFieldProps = RailsEmailField & InputProps

export const EmailField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: EmailFieldProps) => {
  return (
    <TextBase
      errorKey={errorKey}
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      type="email"
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} placeholder={rest.placeholder} />
      <AriaFieldError />
    </TextBase>
  )
}

export type ColorFieldProps = RailsColorField & InputProps

export const ColorField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: ColorFieldProps) => {
  const validationErrors = useErrorKeyValidation({
    errorKey,
    name: rest.name,
  })

  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaColorField
        name={rest.name}
        defaultValue={rest.defaultValue}
        value={rest.value}
      >
        <AriaLabel>{label}</AriaLabel>
        <AriaInput id={rest.id} />
        <AriaFieldError />
      </AriaColorField>
    </FormValidationContext.Provider>
  )
}

export type DateFieldProps = RailsDateField & InputProps

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
  const validationErrors = useErrorKeyValidation({
    errorKey,
    name: rest.name,
  })

  const valueProps: { value?: CalendarDate; defaultValue?: CalendarDate } = {}
  if (value) {
    valueProps.value = parseDate(value)
  } else if (defaultValue) {
    valueProps.defaultValue = parseDate(defaultValue)
  }

  const minMaxProps: {
    minValue?: CalendarDate
    maxValue?: CalendarDate
  } = {}
  if (min) {
    minMaxProps.minValue = parseDate(min)
  }
  if (max) {
    minMaxProps.maxValue = parseDate(max)
  }

  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaDateField name={rest.name} {...valueProps} {...minMaxProps}>
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
  const validationErrors = useErrorKeyValidation({
    errorKey,
    name: rest.name,
  })

  const valueProps: {
    value?: CalendarDateTime
    defaultValue?: CalendarDateTime
  } = {}
  if (value) {
    valueProps.value = parseDateTime(value)
  } else if (defaultValue) {
    valueProps.defaultValue = parseDateTime(defaultValue)
  }

  const minMaxProps: {
    minValue?: CalendarDateTime
    maxValue?: CalendarDateTime
  } = {}
  if (min) {
    minMaxProps.minValue = parseDateTime(min)
  }
  if (max) {
    minMaxProps.maxValue = parseDateTime(max)
  }

  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaDateField
        name={rest.name}
        granularity="second"
        {...valueProps}
        {...minMaxProps}
      >
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

export const TimeField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  ...rest
}: TimeFieldProps) => {
  const validationErrors = useErrorKeyValidation({
    errorKey,
    name: rest.name,
  })

  const valueProps: { value?: Time; defaultValue?: Time } = {}
  if (value) {
    valueProps.value = parseTime(value)
  } else if (defaultValue) {
    valueProps.defaultValue = parseTime(defaultValue)
  }

  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaTimeField name={rest.name} {...valueProps}>
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
  type: _type,
  label,
  errorKey,
  autosave: _autosave,
  results: _results,
  onsearch: _onsearch,
  incremental: _incremental,
  ...rest
}: SearchFieldProps) => {
  const validationErrors = useErrorKeyValidation({
    errorKey,
    name: rest.name,
  })

  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaSearchField
        name={rest.name}
        defaultValue={rest.defaultValue}
        value={rest.value}
      >
        <AriaLabel>{label}</AriaLabel>
        <AriaInput id={rest.id} placeholder={rest.placeholder} />
        <AriaFieldError />
      </AriaSearchField>
    </FormValidationContext.Provider>
  )
}

export type TelFieldProps = RailsTelField & InputProps

export const TelField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: TelFieldProps) => {
  return (
    <TextBase
      errorKey={errorKey}
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      type="tel"
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} placeholder={rest.placeholder} />
      <AriaFieldError />
    </TextBase>
  )
}

export type UrlFieldProps = RailsUrlField & InputProps

export const UrlField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: UrlFieldProps) => {
  return (
    <TextBase
      errorKey={errorKey}
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      type="url"
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} placeholder={rest.placeholder} />
      <AriaFieldError />
    </TextBase>
  )
}

export type MonthFieldProps = RailsMonthField & InputProps

export const MonthField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: MonthFieldProps) => {
  return (
    <TextBase
      errorKey={errorKey}
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} type="month" />
      <AriaFieldError />
    </TextBase>
  )
}

export type NumberFieldProps = RailsNumberField & InputProps

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
  const validationErrors = useErrorKeyValidation({
    errorKey,
    name: rest.name,
  })

  const valueProps: { value?: number; defaultValue?: number } = {}
  if (value !== undefined && value !== '') {
    valueProps.value = Number(value)
  } else if (defaultValue !== undefined && defaultValue !== '') {
    valueProps.defaultValue = Number(defaultValue)
  }

  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaNumberField
        name={rest.name}
        {...valueProps}
        minValue={min}
        maxValue={max}
      >
        <AriaLabel>{label}</AriaLabel>
        <AriaGroup>
          <AriaButton slot="decrement">-</AriaButton>
          <AriaInput id={rest.id} />
          <AriaButton slot="increment">+</AriaButton>
        </AriaGroup>
        <AriaFieldError />
      </AriaNumberField>
    </FormValidationContext.Provider>
  )
}

export type RangeFieldProps = RailsRangeField & InputProps

export const RangeField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  ...rest
}: RangeFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  const numericValue = value ? Number(value) : undefined
  const numericDefault = defaultValue ? Number(defaultValue) : undefined

  return (
    <>
      <AriaSlider defaultValue={numericDefault} value={numericValue}>
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

export const PasswordField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: PasswordFieldProps) => {
  return (
    <TextBase
      errorKey={errorKey}
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      type="password"
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} placeholder={rest.placeholder} />
      <AriaFieldError />
    </TextBase>
  )
}

type SelectProps = (RailsSingleSelect | RailsMultiSelect) & InputProps

export const Select = ({
  includeHidden,
  name,
  id,
  options,
  label,
  errorKey,
  multiple,
  type: _type,
  ...rest
}: SelectProps) => {
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
      selectionProps.selectedKey = Array.isArray(selectedValue)
        ? selectedValue[0]
        : selectedValue
    } else if (selectedDefault) {
      selectionProps.defaultSelectedKey = Array.isArray(selectedDefault)
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

export const TextArea = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: TextAreaProps) => {
  return (
    <TextBase
      errorKey={errorKey}
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaTextArea id={rest.id} rows={rest.rows} cols={rest.cols} />
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

export const SubmitButton = ({
  type: _type,
  text,
  ...rest
}: SubmitButtonProps) => {
  return (
    <AriaButton {...rest} type="submit">
      {text}
    </AriaButton>
  )
}
