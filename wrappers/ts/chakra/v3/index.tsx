import React, { createContext, ReactNode, useContext, useMemo } from 'react'

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
  Input as ChakraInput,
  Textarea as ChakraTextarea,
  Checkbox as ChakraCheckbox,
  RadioGroup as ChakraRadioGroup,
  Select as ChakraSelect,
  NumberInput as ChakraNumberInput,
  Slider as ChakraSlider,
  Field as ChakraField,
  Button as ChakraButton,
  Portal,
  createListCollection,
} from '@chakra-ui/react'

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

type ChakraFieldWrapperProps = {
  label: string
  errorKey?: string
  id?: string
  children: ReactNode
}

const ChakraFieldWrapper = ({
  label,
  errorKey,
  id,
  children,
}: ChakraFieldWrapperProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <ChakraField.Root invalid={!!errorMessage} id={id}>
      <ChakraField.Label>{label}</ChakraField.Label>
      {children}
      {errorMessage && (
        <ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>
      )}
    </ChakraField.Root>
  )
}

type CheckboxProps = RailsCheckboxField & InputProps

export const Checkbox = ({
  type: _type,
  includeHidden,
  uncheckedValue,
  errorKey,
  label,
  ...rest
}: CheckboxProps) => {
  const { name } = rest
  const errorMessage = useErrorMessage(errorKey)

  return (
    <ChakraField.Root invalid={!!errorMessage}>
      {includeHidden && (
        <input
          type="hidden"
          name={name}
          defaultValue={uncheckedValue}
          autoComplete="off"
        />
      )}
      <ChakraCheckbox.Root {...rest}>
        <ChakraCheckbox.HiddenInput />
        <ChakraCheckbox.Control>
          <ChakraCheckbox.Indicator />
        </ChakraCheckbox.Control>
        <ChakraCheckbox.Label>{label}</ChakraCheckbox.Label>
      </ChakraCheckbox.Root>
      {errorMessage && (
        <ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>
      )}
    </ChakraField.Root>
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

  const checkboxes = collection.map((options) => {
    const {
      label: itemLabel,
      checked: _checked,
      defaultChecked: _defaultChecked,
      type: _type,
      includeHidden: _includeHidden,
      uncheckedValue: _uncheckedValue,
      ...rest
    } = options
    return (
      <ChakraCheckbox.Root key={rest.id} {...rest}>
        <ChakraCheckbox.HiddenInput />
        <ChakraCheckbox.Control>
          <ChakraCheckbox.Indicator />
        </ChakraCheckbox.Control>
        <ChakraCheckbox.Label>{itemLabel}</ChakraCheckbox.Label>
      </ChakraCheckbox.Root>
    )
  })

  const { name } = collection[0]

  return (
    <ChakraField.Root invalid={!!errorMessage}>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <ChakraField.Label>{label}</ChakraField.Label>
      {checkboxes}
      {errorMessage && (
        <ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>
      )}
    </ChakraField.Root>
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
  const valueProps: { defaultValue?: string; value?: string } = {}
  if (defaultItem) {
    valueProps.defaultValue = defaultItem.value
  } else if (item) {
    valueProps.value = item.value
  }

  const radioButtons = collection.map((options) => {
    const {
      checked: _checked,
      defaultChecked: _defaultChecked,
      type: _type,
      label: itemLabel,
      ...rest
    } = options
    return (
      <ChakraRadioGroup.Item key={rest.value} value={rest.value}>
        <ChakraRadioGroup.ItemHiddenInput name={rest.name} />
        <ChakraRadioGroup.ItemIndicator />
        <ChakraRadioGroup.ItemText>{itemLabel}</ChakraRadioGroup.ItemText>
      </ChakraRadioGroup.Item>
    )
  })

  const { name } = collection[0]

  return (
    <ChakraField.Root invalid={!!errorMessage}>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <ChakraRadioGroup.Root name={name} {...valueProps}>
        <ChakraField.Label>{label}</ChakraField.Label>
        {radioButtons}
      </ChakraRadioGroup.Root>
      {errorMessage && (
        <ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>
      )}
    </ChakraField.Root>
  )
}

export type TextFieldProps = RailsTextField & InputProps

export const TextField = ({
  type: _type,
  label,
  errorKey,
  size: _size,
  ...rest
}: TextFieldProps) => {
  return (
    <ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="text" {...rest} />
    </ChakraFieldWrapper>
  )
}

export type EmailFieldProps = RailsEmailField & InputProps

export const EmailField = ({
  type: _type,
  label,
  errorKey,
  size: _size,
  ...rest
}: EmailFieldProps) => {
  return (
    <ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="email" {...rest} />
    </ChakraFieldWrapper>
  )
}

export type ColorFieldProps = RailsColorField & InputProps

export const ColorField = ({
  type: _type,
  label,
  errorKey,
  size: _size,
  ...rest
}: ColorFieldProps) => {
  return (
    <ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="color" {...rest} />
    </ChakraFieldWrapper>
  )
}

export type DateFieldProps = RailsDateField & InputProps

export const DateField = ({
  type: _type,
  label,
  errorKey,
  size: _size,
  ...rest
}: DateFieldProps) => {
  return (
    <ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="date" {...rest} />
    </ChakraFieldWrapper>
  )
}

export type DateTimeLocalFieldProps = RailsDateTimeLocalField & InputProps

export const DateTimeLocalField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: DateTimeLocalFieldProps) => {
  const { size: _size, ...inputProps } = rest
  return (
    <ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="datetime-local" {...inputProps} />
    </ChakraFieldWrapper>
  )
}

export type SearchFieldProps = RailsSearchField & InputProps

export const SearchField = ({
  type: _type,
  label,
  errorKey,
  size: _size,
  ...rest
}: SearchFieldProps) => {
  return (
    <ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="search" {...rest} />
    </ChakraFieldWrapper>
  )
}

export type TelFieldProps = RailsTelField & InputProps

export const TelField = ({
  type: _type,
  label,
  errorKey,
  size: _size,
  ...rest
}: TelFieldProps) => {
  return (
    <ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="tel" {...rest} />
    </ChakraFieldWrapper>
  )
}

export type UrlFieldProps = RailsUrlField & InputProps

export const UrlField = ({
  type: _type,
  label,
  errorKey,
  size: _size,
  ...rest
}: UrlFieldProps) => {
  return (
    <ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="url" {...rest} />
    </ChakraFieldWrapper>
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
    <ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="month" {...rest} />
    </ChakraFieldWrapper>
  )
}

export type TimeFieldProps = RailsTimeField & InputProps

export const TimeField = ({
  type: _type,
  label,
  errorKey,
  size: _size,
  ...rest
}: TimeFieldProps) => {
  return (
    <ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="time" {...rest} />
    </ChakraFieldWrapper>
  )
}

export type NumberFieldProps = RailsNumberField & InputProps

export const NumberField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: NumberFieldProps) => {
  return (
    <ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraNumberInput.Root
        name={rest.name}
        min={rest.min}
        max={rest.max}
        defaultValue={rest.defaultValue}
        value={rest.value}
      >
        <ChakraNumberInput.Input />
        <ChakraNumberInput.Control>
          <ChakraNumberInput.IncrementTrigger />
          <ChakraNumberInput.DecrementTrigger />
        </ChakraNumberInput.Control>
      </ChakraNumberInput.Root>
    </ChakraFieldWrapper>
  )
}

export type RangeFieldProps = RailsRangeField & InputProps

export const RangeField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: RangeFieldProps) => {
  const defaultValue = rest.defaultValue
    ? [Number(rest.defaultValue)]
    : undefined
  const value = rest.value ? [Number(rest.value)] : undefined

  return (
    <ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraSlider.Root
        name={rest.name}
        defaultValue={defaultValue}
        value={value}
      >
        <ChakraSlider.Control>
          <ChakraSlider.Track>
            <ChakraSlider.Range />
          </ChakraSlider.Track>
          <ChakraSlider.Thumbs>
            <ChakraSlider.Thumb index={0}>
              <ChakraSlider.HiddenInput />
            </ChakraSlider.Thumb>
          </ChakraSlider.Thumbs>
        </ChakraSlider.Control>
      </ChakraSlider.Root>
    </ChakraFieldWrapper>
  )
}

export type PasswordFieldProps = RailsPasswordField & InputProps

export const PasswordField = ({
  type: _type,
  label,
  errorKey,
  size: _size,
  ...rest
}: PasswordFieldProps) => {
  return (
    <ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="password" {...rest} />
    </ChakraFieldWrapper>
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
  defaultValue,
  value,
  ...rest
}: SelectProps) => {
  const errorMessage = useErrorMessage(errorKey)
  const addHidden = includeHidden && multiple

  const flatItems = options.flatMap((item) => {
    if ('options' in item) {
      return item.options
    }
    return [item]
  })

  const collection = createListCollection({ items: flatItems })

  const defaultValueArray = defaultValue
    ? Array.isArray(defaultValue)
      ? defaultValue
      : [defaultValue]
    : undefined

  const valueArray = value
    ? Array.isArray(value)
      ? value
      : [value]
    : undefined

  return (
    <ChakraField.Root invalid={!!errorMessage}>
      {addHidden && (
        <input type="hidden" name={name} value={''} autoComplete="off" />
      )}
      <ChakraSelect.Root
        name={name}
        collection={collection}
        multiple={multiple}
        defaultValue={defaultValueArray}
        value={valueArray}
      >
        <ChakraSelect.HiddenSelect />
        <ChakraSelect.Label>{label}</ChakraSelect.Label>
        <ChakraSelect.Control>
          <ChakraSelect.Trigger>
            <ChakraSelect.ValueText placeholder="Select..." />
          </ChakraSelect.Trigger>
          <ChakraSelect.IndicatorGroup>
            <ChakraSelect.Indicator />
          </ChakraSelect.IndicatorGroup>
        </ChakraSelect.Control>
        <Portal>
          <ChakraSelect.Positioner>
            <ChakraSelect.Content>
              {options.map((item) => {
                if ('options' in item) {
                  return (
                    <ChakraSelect.ItemGroup key={item.label}>
                      <ChakraSelect.ItemGroupLabel>
                        {item.label}
                      </ChakraSelect.ItemGroupLabel>
                      {item.options.map((opt) => (
                        <ChakraSelect.Item item={opt} key={opt.value}>
                          {opt.label}
                          <ChakraSelect.ItemIndicator />
                        </ChakraSelect.Item>
                      ))}
                    </ChakraSelect.ItemGroup>
                  )
                }
                return (
                  <ChakraSelect.Item item={item} key={item.value}>
                    {item.label}
                    <ChakraSelect.ItemIndicator />
                  </ChakraSelect.Item>
                )
              })}
            </ChakraSelect.Content>
          </ChakraSelect.Positioner>
        </Portal>
      </ChakraSelect.Root>
      {errorMessage && (
        <ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>
      )}
    </ChakraField.Root>
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
    <ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraTextarea {...rest} />
    </ChakraFieldWrapper>
  )
}

export type FileFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> &
  RailsFileField &
  InputProps

export const FileField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: FileFieldProps) => {
  return (
    <ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="file" {...rest} />
    </ChakraFieldWrapper>
  )
}

type SubmitButtonProps = RailsSubmitButton

export const SubmitButton = ({
  type: _type,
  text,
  ...rest
}: SubmitButtonProps) => {
  return (
    <ChakraButton {...rest} type="submit">
      {text}
    </ChakraButton>
  )
}
