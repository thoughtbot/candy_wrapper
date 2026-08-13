/**
 * A set of [candy_wrappers](https://github.com/thoughtbot/candy_wrapper) around
 * Ark UI v5 input components. It works with the output from
 * [FormProps](https://github.com/thoughtbot/form_props).
 *
 * You modify these components to fit your design needs.
 */

import React, { createContext, useContext, useMemo } from 'react'

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

import { Checkbox } from '@ark-ui/react/checkbox'
import { RadioGroup } from '@ark-ui/react/radio-group'
import { Select, createListCollection } from '@ark-ui/react/select'
import { NumberInput } from '@ark-ui/react/number-input'
import { Slider } from '@ark-ui/react/slider'
import { ColorPicker } from '@ark-ui/react/color-picker'
import { DateInput } from '@ark-ui/react/date-input'
import { Field } from '@ark-ui/react/field'
import { FileUpload } from '@ark-ui/react/file-upload'
import { Portal } from '@ark-ui/react/portal'

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

const FieldWrapper = ({
  label,
  id,
  errorKey,
  invalid,
  children,
}: {
  label: string
  id?: string
  errorKey?: string
  invalid?: boolean
  children: React.ReactNode
}) => {
  return (
    <Field.Root invalid={invalid}>
      <Field.Label htmlFor={id}>{label}</Field.Label>
      {children}
      {invalid && <Field.ErrorText>{errorKey}</Field.ErrorText>}
    </Field.Root>
  )
}

const FieldWrapperWithError = ({
  label,
  id,
  errorKey,
  children,
}: {
  label: string
  id?: string
  errorKey?: string
  children: React.ReactNode
}) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <Field.Root invalid={!!errorMessage}>
      <Field.Label htmlFor={id}>{label}</Field.Label>
      {children}
      {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
    </Field.Root>
  )
}

type CheckboxProps = RailsCheckboxField & InputProps

export const CheckboxComponent = ({
  type: _type,
  includeHidden,
  uncheckedValue,
  errorKey,
  label,
  ...rest
}: CheckboxProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <>
      {includeHidden && (
        <input
          type="hidden"
          name={rest.name}
          defaultValue={uncheckedValue}
          autoComplete="off"
        />
      )}
      <Checkbox.Root
        {...rest}
        invalid={!!errorMessage}
      >
        <Checkbox.Control>
          <Checkbox.Indicator>✓</Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label>{label}</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
    </>
  )
}

export { CheckboxComponent as Checkbox }

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

  const { name } = collection[0]
  const defaultItems = collection.filter((option) => !!option.defaultChecked)
  const items = collection.filter((option) => !!option.checked)
  const valueProps: { value?: string[]; defaultValue?: string[] } = {}
  if (defaultItems.length > 0) {
    valueProps.defaultValue = defaultItems.map((option) => option.value)
  } else if (items.length > 0) {
    valueProps.value = items.map((option) => option.value)
  }

  return (
    <>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <Checkbox.Group name={name} {...valueProps}>
        <label>{label}</label>
        {collection.map((option) => (
          <Checkbox.Root key={option.id} value={option.value}>
            <Checkbox.Control>
              <Checkbox.Indicator>✓</Checkbox.Indicator>
            </Checkbox.Control>
            <Checkbox.Label>{option.label}</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox.Root>
        ))}
      </Checkbox.Group>
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

  const { name } = collection[0]
  const defaultItem = collection.find((option) => !!option.defaultChecked)
  const item = collection.find((option) => !!option.checked)
  const valueProps: { value?: string; defaultValue?: string } = {}
  if (defaultItem) {
    valueProps.defaultValue = defaultItem.value
  } else if (item) {
    valueProps.value = item.value
  }

  return (
    <>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <RadioGroup.Root name={name} {...valueProps}>
        <RadioGroup.Label>{label}</RadioGroup.Label>
        {collection.map((option) => (
          <RadioGroup.Item key={option.value} value={option.value}>
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
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
  return (
    <FieldWrapperWithError label={label} id={rest.id} errorKey={errorKey}>
      <Field.Input {...rest} type="text" />
    </FieldWrapperWithError>
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
    <FieldWrapperWithError label={label} id={rest.id} errorKey={errorKey}>
      <Field.Input {...rest} type="email" />
    </FieldWrapperWithError>
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
  const { name, value, defaultValue, ...colorRest } = rest
  const colorValue = value || defaultValue || '#000000'

  return (
    <Field.Root invalid={!!errorMessage}>
      <ColorPicker.Root {...colorRest} defaultValue={colorValue}>
        <ColorPicker.Label>{label}</ColorPicker.Label>
        <ColorPicker.Control>
          <ColorPicker.ChannelInput channel="hex" />
          <ColorPicker.Trigger>
            <ColorPicker.ValueSwatch />
          </ColorPicker.Trigger>
        </ColorPicker.Control>
        <Portal>
          <ColorPicker.Positioner>
            <ColorPicker.Content>
              <ColorPicker.Area>
                <ColorPicker.AreaBackground />
                <ColorPicker.AreaThumb />
              </ColorPicker.Area>
              <ColorPicker.ChannelSlider channel="hue">
                <ColorPicker.ChannelSliderTrack />
                <ColorPicker.ChannelSliderThumb />
              </ColorPicker.ChannelSlider>
            </ColorPicker.Content>
          </ColorPicker.Positioner>
        </Portal>
        <ColorPicker.HiddenInput name={name} />
      </ColorPicker.Root>
      {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
    </Field.Root>
  )
}

export type DateFieldProps = RailsDateField & InputProps

export const DateField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  ...rest
}: DateFieldProps) => {
  return (
    <FieldWrapperWithError label={label} id={rest.id} errorKey={errorKey}>
      <Field.Input {...rest} defaultValue={value ?? defaultValue} type="date" />
    </FieldWrapperWithError>
  )
}

export type DateTimeLocalFieldProps = RailsDateTimeLocalField & InputProps

export const DateTimeLocalField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  ...rest
}: DateTimeLocalFieldProps) => {
  return (
    <FieldWrapperWithError label={label} id={rest.id} errorKey={errorKey}>
      <Field.Input {...rest} defaultValue={value ?? defaultValue} type="datetime-local" />
    </FieldWrapperWithError>
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
  return (
    <FieldWrapperWithError label={label} id={rest.id} errorKey={errorKey}>
      <Field.Input {...rest} defaultValue={value ?? defaultValue} type="time" />
    </FieldWrapperWithError>
  )
}

export type MonthFieldProps = RailsMonthField & InputProps

export const MonthField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  ...rest
}: MonthFieldProps) => {
  return (
    <FieldWrapperWithError label={label} id={rest.id} errorKey={errorKey}>
      <Field.Input {...rest} defaultValue={value ?? defaultValue} type="month" />
    </FieldWrapperWithError>
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
  return (
    <FieldWrapperWithError label={label} id={rest.id} errorKey={errorKey}>
      <Field.Input {...rest} type="search" />
    </FieldWrapperWithError>
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
    <FieldWrapperWithError label={label} id={rest.id} errorKey={errorKey}>
      <Field.Input {...rest} type="tel" />
    </FieldWrapperWithError>
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
    <FieldWrapperWithError label={label} id={rest.id} errorKey={errorKey}>
      <Field.Input {...rest} type="url" />
    </FieldWrapperWithError>
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
    <FieldWrapperWithError label={label} id={rest.id} errorKey={errorKey}>
      <Field.Input {...rest} type="password" />
    </FieldWrapperWithError>
  )
}

export type NumberFieldProps = RailsNumberField & InputProps

export const NumberField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  ...rest
}: NumberFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  const numericDefault =
    defaultValue !== undefined && defaultValue !== ''
      ? String(defaultValue)
      : undefined
  const numericValue =
    value !== undefined && value !== '' ? String(value) : undefined

  return (
    <Field.Root invalid={!!errorMessage}>
      <NumberInput.Root
        {...rest}
        defaultValue={numericDefault}
        value={numericValue}
      >
        <NumberInput.Label>{label}</NumberInput.Label>
        <NumberInput.Control>
          <NumberInput.Input />
          <NumberInput.IncrementTrigger>+</NumberInput.IncrementTrigger>
          <NumberInput.DecrementTrigger>-</NumberInput.DecrementTrigger>
        </NumberInput.Control>
      </NumberInput.Root>
      {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
    </Field.Root>
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
  const numericDefault = defaultValue ? [Number(defaultValue)] : undefined
  const numericValue = value ? [Number(value)] : undefined

  return (
    <Field.Root invalid={!!errorMessage}>
      <Slider.Root
        {...rest}
        defaultValue={numericDefault}
        value={numericValue}
      >
        <Slider.Label>{label}</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.Root>
      {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
    </Field.Root>
  )
}

type SelectProps = (RailsSingleSelect | RailsMultiSelect) & InputProps

export const SelectComponent = ({
  includeHidden,
  options,
  label,
  errorKey,
  multiple,
  type: _type,
  ...rest
}: SelectProps) => {
  const errorMessage = useErrorMessage(errorKey)
  const addHidden = includeHidden && multiple
  const { name, id, value, defaultValue, ...selectRest } = rest as {
    name: string
    id?: string
    value?: string | string[]
    defaultValue?: string | string[]
  }

  const flatItems = options.flatMap((item) => {
    if ('options' in item) {
      return item.options
    }
    return [item]
  })

  const collection = createListCollection({ items: flatItems })

  const valueProps: Record<string, unknown> = {}
  if (multiple) {
    valueProps.multiple = true
    if (value && Array.isArray(value)) {
      valueProps.value = value
    } else if (defaultValue && Array.isArray(defaultValue)) {
      valueProps.defaultValue = defaultValue
    }
  } else {
    if (value) {
      valueProps.value = Array.isArray(value) ? value : [value]
    } else if (defaultValue) {
      valueProps.defaultValue = Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue]
    }
  }

  return (
    <Field.Root invalid={!!errorMessage}>
      {addHidden && (
        <input type="hidden" name={name} value={''} autoComplete="off" />
      )}
      <Select.Root
        {...selectRest}
        name={name}
        collection={collection}
        {...valueProps}
      >
        <Select.Label>{label}</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select..." />
          </Select.Trigger>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {flatItems.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator>✓</Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
        <Select.HiddenSelect />
      </Select.Root>
      {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
    </Field.Root>
  )
}

export { SelectComponent as Select }

export type TextAreaProps = RailsTextArea & InputProps

export const TextArea = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: TextAreaProps) => {
  return (
    <FieldWrapperWithError label={label} id={rest.id} errorKey={errorKey}>
      <Field.Textarea {...rest} />
    </FieldWrapperWithError>
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
    <Field.Root invalid={!!errorMessage}>
      <FileUpload.Root>
        <FileUpload.Label>{label}</FileUpload.Label>
        <FileUpload.Trigger>Choose file</FileUpload.Trigger>
        <FileUpload.HiddenInput {...rest} />
      </FileUpload.Root>
      {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
    </Field.Root>
  )
}

export type SubmitButtonProps = RailsSubmitButton

export const SubmitButton = ({
  type: _type,
  text,
  ...rest
}: SubmitButtonProps) => {
  return (
    <button {...rest} type="submit">
      {text}
    </button>
  )
}
