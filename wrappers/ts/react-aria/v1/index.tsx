import React, { createContext, useContext, useMemo } from 'react'
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
  DateField as AriaDateField,
  DateInput as AriaDateInput,
  DateSegment as AriaDateSegment,
  FieldError as AriaFieldError,
  FileTrigger as AriaFileTrigger,
  Form as AriaForm,
  FormProps as AriaFormProps,
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
      <ValidationContext.Provider value={validationErrors}>
        <Extras {...extras}></Extras>
        {children}
      </ValidationContext.Provider>
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
  const errorMessage = useErrorMessage(errorKey)
  const isSelected = checked ?? undefined
  const defaultSelected = defaultChecked ?? undefined

  return (
    <>
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
        isSelected={isSelected}
        defaultSelected={defaultSelected}
        isInvalid={!!errorMessage}
      >
        {label}
      </AriaCheckbox>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </>
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
  const errorMessage = useErrorMessage(errorKey)

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

  return (
    <>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <AriaCheckboxGroup
        {...valueProps}
        isInvalid={!!errorMessage}
      >
        <AriaLabel>{label}</AriaLabel>
        {collection.map((option) => (
          <AriaCheckbox
            key={option.id}
            name={name}
            value={option.value}
            id={option.id}
          >
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
  const errorMessage = useErrorMessage(errorKey)

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

  return (
    <>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <AriaRadioGroup
        name={name}
        {...valueProps}
        isInvalid={!!errorMessage}
      >
        <AriaLabel>{label}</AriaLabel>
        {collection.map((option) => (
          <AriaRadio key={option.value} value={option.value} id={option.id}>
            {option.label}
          </AriaRadio>
        ))}
        {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
      </AriaRadioGroup>
    </>
  )
}

export type TextFieldProps = RailsTextField & InputProps

export const TextField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: TextFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <AriaTextField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      isInvalid={!!errorMessage}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} />
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTextField>
  )
}

export type EmailFieldProps = RailsEmailField & InputProps

export const EmailField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: EmailFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <AriaTextField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      type="email"
      isInvalid={!!errorMessage}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} />
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTextField>
  )
}

export type ColorFieldProps = RailsColorField & InputProps

export const ColorField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: ColorFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <AriaTextField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      isInvalid={!!errorMessage}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} type="color" />
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTextField>
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
  const errorMessage = useErrorMessage(errorKey)

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
    <AriaDateField
      name={rest.name}
      {...valueProps}
      {...minMaxProps}
      isInvalid={!!errorMessage}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaDateInput>{(segment) => <AriaDateSegment segment={segment} />}</AriaDateInput>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaDateField>
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
  const errorMessage = useErrorMessage(errorKey)

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
    <AriaDateField
      name={rest.name}
      {...valueProps}
      {...minMaxProps}
      isInvalid={!!errorMessage}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaDateInput>{(segment) => <AriaDateSegment segment={segment} />}</AriaDateInput>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaDateField>
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
  const errorMessage = useErrorMessage(errorKey)

  const valueProps: { value?: Time; defaultValue?: Time } = {}
  if (value) {
    valueProps.value = parseTime(value)
  } else if (defaultValue) {
    valueProps.defaultValue = parseTime(defaultValue)
  }

  return (
    <AriaTimeField
      name={rest.name}
      {...valueProps}
      isInvalid={!!errorMessage}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaDateInput>{(segment) => <AriaDateSegment segment={segment} />}</AriaDateInput>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTimeField>
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
  const errorMessage = useErrorMessage(errorKey)

  return (
    <AriaSearchField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      isInvalid={!!errorMessage}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} />
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaSearchField>
  )
}

export type TelFieldProps = RailsTelField & InputProps

export const TelField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: TelFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <AriaTextField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      type="tel"
      isInvalid={!!errorMessage}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} />
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTextField>
  )
}

export type UrlFieldProps = RailsUrlField & InputProps

export const UrlField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: UrlFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <AriaTextField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      type="url"
      isInvalid={!!errorMessage}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} />
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTextField>
  )
}

export type MonthFieldProps = RailsMonthField & InputProps

export const MonthField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: MonthFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <AriaTextField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      isInvalid={!!errorMessage}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} type="month" />
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTextField>
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
  const errorMessage = useErrorMessage(errorKey)

  const valueProps: { value?: number; defaultValue?: number } = {}
  if (value !== undefined && value !== '') {
    valueProps.value = Number(value)
  } else if (defaultValue !== undefined && defaultValue !== '') {
    valueProps.defaultValue = Number(defaultValue)
  }

  return (
    <AriaNumberField
      name={rest.name}
      {...valueProps}
      minValue={min}
      maxValue={max}
      isInvalid={!!errorMessage}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} />
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaNumberField>
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
      <AriaSlider
        defaultValue={numericDefault}
        value={numericValue}
      >
        <AriaLabel>{label}</AriaLabel>
        <AriaSliderOutput />
        <AriaSliderTrack>
          <AriaSliderThumb />
        </AriaSliderTrack>
      </AriaSlider>
      <input type="hidden" name={rest.name} value={numericValue ?? numericDefault ?? ''} />
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
  const errorMessage = useErrorMessage(errorKey)

  return (
    <AriaTextField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      isInvalid={!!errorMessage}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} type="password" />
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTextField>
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
  const errorMessage = useErrorMessage(errorKey)
  const addHidden = includeHidden && multiple

  const flatOptions = options.flatMap((item) => {
    if ('options' in item) {
      return item.options
    }
    return [item]
  })

  const selectedValue = 'value' in rest ? rest.value : undefined
  const selectedDefault = 'defaultvalue' in rest ? rest.defaultvalue : undefined

  if (multiple) {
    const selectedKeys = selectedValue
      ? (Array.isArray(selectedValue) ? selectedValue : [selectedValue])
      : undefined
    const defaultKeys = selectedDefault
      ? (Array.isArray(selectedDefault) ? selectedDefault : [selectedDefault])
      : undefined

    return (
      <>
        {addHidden && (
          <input type="hidden" name={name} value={''} autoComplete="off" />
        )}
        <AriaSelect
          name={name}
          isInvalid={!!errorMessage}
          selectionMode="multiple"
          value={selectedKeys}
          defaultValue={defaultKeys}
        >
          <AriaLabel>{label}</AriaLabel>
          <AriaButton>
            <AriaSelectValue />
          </AriaButton>
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
          {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
        </AriaSelect>
      </>
    )
  }

  const selectedKey = selectedValue
    ? (Array.isArray(selectedValue) ? selectedValue[0] : selectedValue)
    : undefined
  const defaultKey = selectedDefault
    ? (Array.isArray(selectedDefault) ? selectedDefault[0] : selectedDefault)
    : undefined

  return (
    <AriaSelect
      name={name}
      isInvalid={!!errorMessage}
      selectedKey={selectedKey}
      defaultSelectedKey={defaultKey}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaButton>
        <AriaSelectValue />
      </AriaButton>
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
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaSelect>
  )
}

export type TextAreaProps = RailsTextArea & InputProps

export const TextArea = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: TextAreaProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <AriaTextField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      isInvalid={!!errorMessage}
    >
      <AriaLabel>{label}</AriaLabel>
      <AriaTextArea id={rest.id} rows={rest.rows} cols={rest.cols} />
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTextField>
  )
}

export type FileFieldProps = RailsFileField & InputProps

export const FileField = ({
  type: _type,
  label,
  errorKey,
}: FileFieldProps) => {
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
