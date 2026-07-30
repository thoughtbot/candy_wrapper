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
  TextField as SpectrumTextField,
  TextArea as SpectrumTextArea,
  NumberField as SpectrumNumberField,
  DateField as SpectrumDateField,
  TimeField as SpectrumTimeField,
  DatePicker as SpectrumDatePicker,
  SearchField as SpectrumSearchField,
  Checkbox as SpectrumCheckbox,
  CheckboxGroup as SpectrumCheckboxGroup,
  RadioGroup as SpectrumRadioGroup,
  Radio as SpectrumRadio,
  Picker as SpectrumPicker,
  Item,
  Section,
  Slider as SpectrumSlider,
  Button as SpectrumButton,
  Form as SpectrumForm,
  FileTrigger as SpectrumFileTrigger,
} from '@adobe/react-spectrum'

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
  const formProps = props as React.ComponentProps<typeof SpectrumForm>

  return (
    <SpectrumForm {...formProps}>
      <ValidationContext.Provider value={validationErrors}>
        <Extras {...extras}></Extras>
        {children}
      </ValidationContext.Provider>
    </SpectrumForm>
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
      <SpectrumCheckbox
        name={name}
        value={rest.value}
        isSelected={isSelected}
        defaultSelected={defaultSelected}
        isInvalid={!!errorMessage}
      >
        {label}
      </SpectrumCheckbox>
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
      <SpectrumCheckboxGroup
        label={label}
        {...valueProps}
        isInvalid={!!errorMessage}
        errorMessage={errorMessage}
      >
        {collection.map((option) => (
          <SpectrumCheckbox key={option.id} name={name} value={option.value}>
            {option.label}
          </SpectrumCheckbox>
        ))}
      </SpectrumCheckboxGroup>
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
      <SpectrumRadioGroup
        label={label}
        name={name}
        {...valueProps}
        isInvalid={!!errorMessage}
        errorMessage={errorMessage}
      >
        {collection.map((option) => (
          <SpectrumRadio key={option.value} value={option.value}>
            {option.label}
          </SpectrumRadio>
        ))}
      </SpectrumRadioGroup>
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
    <SpectrumTextField
      label={label}
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      maxLength={rest.maxLength}
      validationState={errorMessage ? 'invalid' : undefined}
      errorMessage={errorMessage}
    />
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
    <SpectrumTextField
      label={label}
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      type="email"
      maxLength={rest.maxLength}
      validationState={errorMessage ? 'invalid' : undefined}
      errorMessage={errorMessage}
    />
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
    <SpectrumTextField
      label={label}
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      validationState={errorMessage ? 'invalid' : undefined}
      errorMessage={errorMessage}
    />
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
    <SpectrumDateField
      label={label}
      name={rest.name}
      {...valueProps}
      {...minMaxProps}
      validationState={errorMessage ? 'invalid' : undefined}
      errorMessage={errorMessage}
    />
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
    <SpectrumDatePicker
      label={label}
      name={rest.name}
      granularity="second"
      {...valueProps}
      {...minMaxProps}
      validationState={errorMessage ? 'invalid' : undefined}
      errorMessage={errorMessage}
    />
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
    <SpectrumTimeField
      label={label}
      name={rest.name}
      {...valueProps}
      validationState={errorMessage ? 'invalid' : undefined}
      errorMessage={errorMessage}
    />
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
    <SpectrumSearchField
      label={label}
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      validationState={errorMessage ? 'invalid' : undefined}
      errorMessage={errorMessage}
    />
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
    <SpectrumTextField
      label={label}
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      type="tel"
      maxLength={rest.maxLength}
      validationState={errorMessage ? 'invalid' : undefined}
      errorMessage={errorMessage}
    />
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
    <SpectrumTextField
      label={label}
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      type="url"
      maxLength={rest.maxLength}
      validationState={errorMessage ? 'invalid' : undefined}
      errorMessage={errorMessage}
    />
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
    <SpectrumTextField
      label={label}
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      validationState={errorMessage ? 'invalid' : undefined}
      errorMessage={errorMessage}
    />
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
    <SpectrumNumberField
      label={label}
      name={rest.name}
      {...valueProps}
      minValue={min}
      maxValue={max}
      validationState={errorMessage ? 'invalid' : undefined}
      errorMessage={errorMessage}
    />
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
      <SpectrumSlider
        label={label}
        defaultValue={numericDefault}
        value={numericValue}
      />
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
  const errorMessage = useErrorMessage(errorKey)

  return (
    <SpectrumTextField
      label={label}
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      type="password"
      maxLength={rest.maxLength}
      validationState={errorMessage ? 'invalid' : undefined}
      errorMessage={errorMessage}
    />
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

  const selectedValue = 'value' in rest ? rest.value : undefined
  const selectedDefault = 'defaultvalue' in rest ? rest.defaultvalue : undefined

  const hasGroups = options.some((item) => 'options' in item)

  const selectedKey = selectedValue
    ? Array.isArray(selectedValue)
      ? selectedValue[0]
      : selectedValue
    : undefined
  const defaultKey = selectedDefault
    ? Array.isArray(selectedDefault)
      ? selectedDefault[0]
      : selectedDefault
    : undefined

  return (
    <>
      {addHidden && (
        <input type="hidden" name={name} value={''} autoComplete="off" />
      )}
      <SpectrumPicker
        label={label}
        name={name}
        id={id}
        selectedKey={selectedKey}
        defaultSelectedKey={defaultKey}
        isInvalid={!!errorMessage}
        errorMessage={errorMessage}
      >
        {hasGroups
          ? options.map((item) => {
              if ('options' in item) {
                return (
                  <Section key={item.label} title={item.label}>
                    {item.options.map((opt) => (
                      <Item key={opt.value} textValue={opt.label}>
                        {opt.label}
                      </Item>
                    ))}
                  </Section>
                )
              }
              return (
                <Item key={item.value} textValue={item.label}>
                  {item.label}
                </Item>
              )
            })
          : options.map((item) => {
              if ('options' in item) {
                return null
              }
              return (
                <Item key={item.value} textValue={item.label}>
                  {item.label}
                </Item>
              )
            })}
      </SpectrumPicker>
    </>
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
    <SpectrumTextArea
      label={label}
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      validationState={errorMessage ? 'invalid' : undefined}
      errorMessage={errorMessage}
    />
  )
}

export type FileFieldProps = RailsFileField & InputProps

export const FileField = ({ type: _type, label, errorKey }: FileFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <>
      <SpectrumFileTrigger>
        <SpectrumButton variant="primary">{label}</SpectrumButton>
      </SpectrumFileTrigger>
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
    <SpectrumButton {...rest} type="submit" variant="primary">
      {text}
    </SpectrumButton>
  )
}
