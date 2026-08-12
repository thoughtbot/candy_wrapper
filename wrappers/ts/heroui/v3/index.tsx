/**
 * A set of [candy_wrappers](https://github.com/thoughtbot/candy_wrapper) around
 * HeroUI v3 input components. It works with the output from
 * [FormProps](https://github.com/thoughtbot/form_props).
 *
 * You modify these components to fit your design needs.
 */

import React, { createContext, useContext, useMemo, useState } from 'react'
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
  TextField as HeroTextField,
  Input as HeroInput,
  Label as HeroLabel,
  FieldError as HeroFieldError,
  TextArea as HeroTextArea,
  Checkbox as HeroCheckbox,
  CheckboxGroup as HeroCheckboxGroup,
  RadioGroup as HeroRadioGroup,
  Radio as HeroRadio,
  Select as HeroSelect,
  ListBox as HeroListBox,
  NumberField as HeroNumberField,
  SearchField as HeroSearchField,
  DateField as HeroDateField,
  DatePicker as HeroDatePicker,
  TimeField as HeroTimeField,
  Slider as HeroSlider,
  Button as HeroButton,
  ColorField as HeroColorField,
  ColorSwatch as HeroColorSwatch,
  parseColor,
} from '@heroui/react'
import type { Color } from '@heroui/react'

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
      <HeroCheckbox
        name={name}
        value={rest.value}
        isSelected={isSelected}
        defaultSelected={defaultSelected}
        isInvalid={!!errorMessage}
      >
        <HeroCheckbox.Content>
          <HeroCheckbox.Control>
            <HeroCheckbox.Indicator />
          </HeroCheckbox.Control>
          {label}
        </HeroCheckbox.Content>
      </HeroCheckbox>
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
      <HeroCheckboxGroup
        name={name}
        {...valueProps}
        isInvalid={!!errorMessage}
        errorMessage={errorMessage}
      >
        <HeroLabel>{label}</HeroLabel>
        {collection.map((option) => (
          <HeroCheckbox key={option.id} value={option.value}>
            <HeroCheckbox.Content>
              <HeroCheckbox.Control>
                <HeroCheckbox.Indicator />
              </HeroCheckbox.Control>
              {option.label}
            </HeroCheckbox.Content>
          </HeroCheckbox>
        ))}
      </HeroCheckboxGroup>
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
      <HeroRadioGroup
        name={name}
        {...valueProps}
        isInvalid={!!errorMessage}
        errorMessage={errorMessage}
      >
        <HeroLabel>{label}</HeroLabel>
        {collection.map((option) => (
          <HeroRadio key={option.value} value={option.value}>
            <HeroRadio.Content>
              <HeroRadio.Control>
                <HeroRadio.Indicator />
              </HeroRadio.Control>
              {option.label}
            </HeroRadio.Content>
          </HeroRadio>
        ))}
      </HeroRadioGroup>
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
    <HeroTextField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      isInvalid={!!errorMessage}
    >
      <HeroLabel>{label}</HeroLabel>
      <HeroInput id={rest.id} placeholder={rest.placeholder} />
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroTextField>
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
    <HeroTextField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      type="email"
      isInvalid={!!errorMessage}
    >
      <HeroLabel>{label}</HeroLabel>
      <HeroInput id={rest.id} placeholder={rest.placeholder} />
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroTextField>
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
  const initialColor = rest.value || rest.defaultValue
  const [color, setColor] = useState<Color | null>(
    initialColor ? parseColor(initialColor) : null
  )

  return (
    <HeroColorField
      name={rest.name}
      value={color}
      onChange={setColor}
      isInvalid={!!errorMessage}
    >
      <HeroLabel>{label}</HeroLabel>
      <HeroColorField.Group>
        <HeroColorField.Prefix>
          <HeroColorSwatch color={color ?? undefined} size="xs" />
        </HeroColorField.Prefix>
        <HeroColorField.Input />
      </HeroColorField.Group>
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroColorField>
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
    <HeroDateField
      name={rest.name}
      {...valueProps}
      {...minMaxProps}
      isInvalid={!!errorMessage}
    >
      <HeroLabel>{label}</HeroLabel>
      <HeroDateField.Group>
        <HeroDateField.Input>
          {(segment) => <HeroDateField.Segment segment={segment} />}
        </HeroDateField.Input>
      </HeroDateField.Group>
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroDateField>
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
    <HeroDateField
      name={rest.name}
      granularity="second"
      {...valueProps}
      {...minMaxProps}
      isInvalid={!!errorMessage}
    >
      <HeroLabel>{label}</HeroLabel>
      <HeroDateField.Group>
        <HeroDateField.Input>
          {(segment) => <HeroDateField.Segment segment={segment} />}
        </HeroDateField.Input>
      </HeroDateField.Group>
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroDateField>
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
    <HeroTimeField
      name={rest.name}
      {...valueProps}
      isInvalid={!!errorMessage}
    >
      <HeroLabel>{label}</HeroLabel>
      <HeroTimeField.Group>
        <HeroTimeField.Input>
          {(segment) => <HeroTimeField.Segment segment={segment} />}
        </HeroTimeField.Input>
      </HeroTimeField.Group>
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroTimeField>
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
    <HeroSearchField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      isInvalid={!!errorMessage}
    >
      <HeroLabel>{label}</HeroLabel>
      <HeroInput id={rest.id} placeholder={rest.placeholder} />
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroSearchField>
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
    <HeroTextField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      type="tel"
      isInvalid={!!errorMessage}
    >
      <HeroLabel>{label}</HeroLabel>
      <HeroInput id={rest.id} placeholder={rest.placeholder} />
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroTextField>
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
    <HeroTextField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      type="url"
      isInvalid={!!errorMessage}
    >
      <HeroLabel>{label}</HeroLabel>
      <HeroInput id={rest.id} placeholder={rest.placeholder} />
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroTextField>
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
    <HeroTextField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      isInvalid={!!errorMessage}
    >
      <HeroLabel>{label}</HeroLabel>
      <HeroInput id={rest.id} type="month" />
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroTextField>
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
    <HeroNumberField
      name={rest.name}
      {...valueProps}
      minValue={min}
      maxValue={max}
      isInvalid={!!errorMessage}
    >
      <HeroLabel>{label}</HeroLabel>
      <HeroNumberField.Group>
        <HeroNumberField.DecrementButton />
        <HeroNumberField.Input />
        <HeroNumberField.IncrementButton />
      </HeroNumberField.Group>
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroNumberField>
  )
}

export type RangeFieldProps = RailsRangeField & InputProps

export const RangeField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  min,
  max,
  ...rest
}: RangeFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  const numericValue = value ? Number(value) : undefined
  const numericDefault = defaultValue ? Number(defaultValue) : undefined

  return (
    <>
      <HeroSlider
        name={rest.name}
        defaultValue={numericDefault}
        value={numericValue}
        minValue={min}
        maxValue={max}
      >
        <HeroLabel>{label}</HeroLabel>
        <HeroSlider.Output />
        <HeroSlider.Track>
          {({ state }) => (
            <>
              <HeroSlider.Fill />
              {state.values.map((_: number, i: number) => (
                <HeroSlider.Thumb key={i} index={i} />
              ))}
            </>
          )}
        </HeroSlider.Track>
      </HeroSlider>
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
    <HeroTextField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      type="password"
      isInvalid={!!errorMessage}
    >
      <HeroLabel>{label}</HeroLabel>
      <HeroInput id={rest.id} placeholder={rest.placeholder} />
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroTextField>
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

  const hasGroups = options.some((item) => 'options' in item)

  return (
    <>
      {addHidden && (
        <input type="hidden" name={name} value={''} autoComplete="off" />
      )}
      <HeroSelect
        name={name}
        id={id}
        {...selectionProps}
        isInvalid={!!errorMessage}
        errorMessage={errorMessage}
      >
        <HeroLabel>{label}</HeroLabel>
        <HeroSelect.Trigger>
          <HeroSelect.Value />
          <HeroSelect.Indicator />
        </HeroSelect.Trigger>
        <HeroSelect.Popover>
          <HeroListBox>
            {hasGroups
              ? options.map((item) => {
                  if ('options' in item) {
                    return (
                      <HeroListBox.Section key={item.label} title={item.label}>
                        {item.options.map((opt) => (
                          <HeroListBox.Item
                            key={opt.value}
                            id={opt.value}
                            textValue={opt.label}
                          >
                            {opt.label}
                            <HeroListBox.ItemIndicator />
                          </HeroListBox.Item>
                        ))}
                      </HeroListBox.Section>
                    )
                  }
                  return (
                    <HeroListBox.Item
                      key={item.value}
                      id={item.value}
                      textValue={item.label}
                    >
                      {item.label}
                      <HeroListBox.ItemIndicator />
                    </HeroListBox.Item>
                  )
                })
              : options.map((item) => {
                  if ('options' in item) return null
                  return (
                    <HeroListBox.Item
                      key={item.value}
                      id={item.value}
                      textValue={item.label}
                    >
                      {item.label}
                      <HeroListBox.ItemIndicator />
                    </HeroListBox.Item>
                  )
                })}
          </HeroListBox>
        </HeroSelect.Popover>
      </HeroSelect>
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
    <HeroTextField
      name={rest.name}
      defaultValue={rest.defaultValue}
      value={rest.value}
      isInvalid={!!errorMessage}
    >
      <HeroLabel>{label}</HeroLabel>
      <HeroTextArea id={rest.id} rows={rest.rows} cols={rest.cols} />
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroTextField>
  )
}

export type FileFieldProps = RailsFileField & InputProps

export const FileField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: FileFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <div>
      <HeroLabel>{label}</HeroLabel>
      <input {...rest} type="file" />
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  )
}

export type SubmitButtonProps = RailsSubmitButton

export const SubmitButton = ({
  type: _type,
  text,
  ...rest
}: SubmitButtonProps) => {
  return (
    <HeroButton {...rest} type="submit">
      {text}
    </HeroButton>
  )
}
