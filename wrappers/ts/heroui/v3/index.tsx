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
  Header as HeroHeader,
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
  ErrorMessage as HeroErrorMessage,
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

// -- Transform functions --

export const checkboxPropsToHeroProps = (
  props: Partial<RailsCheckboxField>
): Partial<React.ComponentProps<typeof HeroCheckbox>> => {
  const { defaultChecked, checked, type: _type, ...rest } = props
  const heroProps: Partial<React.ComponentProps<typeof HeroCheckbox>> = {
    ...rest,
  }

  if (defaultChecked !== undefined) {
    heroProps.defaultSelected = defaultChecked
  }
  if (checked !== undefined) {
    heroProps.isSelected = checked
  }

  return heroProps
}

type RailsTextLikeField =
  | RailsTextField
  | RailsEmailField
  | RailsPasswordField
  | RailsSearchField
  | RailsTelField
  | RailsUrlField

export const textFieldToHeroProps = (props: Partial<RailsTextLikeField>) => {
  const { type: _type, placeholder, ...fieldProps } = props
  return { fieldProps, inputProps: { placeholder } }
}

export const numberFieldToHeroProps = (props: Partial<RailsNumberField>) => {
  const { value, defaultValue, min, max, type: _type, ...rest } = props
  const heroProps: Record<string, unknown> = { ...rest }

  if (value !== undefined && value !== '') {
    heroProps.value = Number(value)
  }
  if (defaultValue !== undefined && defaultValue !== '') {
    heroProps.defaultValue = Number(defaultValue)
  }
  if (min !== undefined) {
    heroProps.minValue = min
  }
  if (max !== undefined) {
    heroProps.maxValue = max
  }

  return heroProps
}

export const dateFieldToHeroProps = (props: Partial<RailsDateField>) => {
  const { max, min, value, defaultValue, type: _type, ...rest } = props
  const heroProps: Record<string, unknown> = { ...rest }

  if (max) heroProps.maxValue = parseDate(max)
  if (min) heroProps.minValue = parseDate(min)
  if (defaultValue) heroProps.defaultValue = parseDate(defaultValue)
  if (value) heroProps.value = parseDate(value)

  return heroProps
}

export const dateTimeLocalFieldToHeroProps = (
  props: Partial<RailsDateTimeLocalField>
) => {
  const { max, min, value, defaultValue, type: _type, ...rest } = props
  const heroProps: Record<string, unknown> = { ...rest }
  heroProps.granularity = 'second'

  if (max) heroProps.maxValue = parseDateTime(max)
  if (min) heroProps.minValue = parseDateTime(min)
  if (defaultValue) heroProps.defaultValue = parseDateTime(defaultValue)
  if (value) heroProps.value = parseDateTime(value)

  return heroProps
}

export const timeFieldToHeroProps = (props: Partial<RailsTimeField>) => {
  const { min, max, value, defaultValue, type: _type, ...rest } = props
  const heroProps: Record<string, unknown> = { ...rest }

  if (value) heroProps.value = parseTime(value)
  if (defaultValue) heroProps.defaultValue = parseTime(defaultValue)
  if (min) heroProps.minValue = parseTime(min)
  if (max) heroProps.maxValue = parseTime(max)

  return heroProps
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
  const heroProps = checkboxPropsToHeroProps(rest)
  const { name } = heroProps
  const errorMessage = useErrorMessage(errorKey)

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
      <HeroCheckbox {...heroProps} isInvalid={!!errorMessage}>
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
        {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
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
        {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
      </HeroRadioGroup>
    </>
  )
}

export type TextFieldProps = RailsTextField & InputProps

export const TextField = ({ label, errorKey, ...rest }: TextFieldProps) => {
  const { fieldProps, inputProps } = textFieldToHeroProps(rest)
  const errorMessage = useErrorMessage(errorKey)

  return (
    <HeroTextField {...fieldProps} isInvalid={!!errorMessage}>
      <HeroLabel>{label}</HeroLabel>
      <HeroInput {...inputProps} />
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroTextField>
  )
}

export type EmailFieldProps = RailsEmailField & InputProps

export const EmailField = ({ label, errorKey, ...rest }: EmailFieldProps) => {
  const { fieldProps, inputProps } = textFieldToHeroProps(rest)
  const errorMessage = useErrorMessage(errorKey)

  return (
    <HeroTextField {...fieldProps} type="email" isInvalid={!!errorMessage}>
      <HeroLabel>{label}</HeroLabel>
      <HeroInput {...inputProps} />
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

export const DateField = ({ label, errorKey, ...rest }: DateFieldProps) => {
  const heroProps = dateFieldToHeroProps(rest)
  const errorMessage = useErrorMessage(errorKey)

  return (
    <HeroDateField {...heroProps} isInvalid={!!errorMessage}>
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
  label,
  errorKey,
  ...rest
}: DateTimeLocalFieldProps) => {
  const heroProps = dateTimeLocalFieldToHeroProps(rest)
  const errorMessage = useErrorMessage(errorKey)

  return (
    <HeroDateField {...heroProps} isInvalid={!!errorMessage}>
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

export const TimeField = ({ label, errorKey, ...rest }: TimeFieldProps) => {
  const heroProps = timeFieldToHeroProps(rest)
  const errorMessage = useErrorMessage(errorKey)

  return (
    <HeroTimeField {...heroProps} isInvalid={!!errorMessage}>
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
  label,
  errorKey,
  autosave: _autosave,
  results: _results,
  onsearch: _onsearch,
  incremental: _incremental,
  ...rest
}: SearchFieldProps) => {
  const { fieldProps, inputProps } = textFieldToHeroProps(rest)
  const errorMessage = useErrorMessage(errorKey)

  return (
    <HeroSearchField {...fieldProps} isInvalid={!!errorMessage}>
      <HeroLabel>{label}</HeroLabel>
      <HeroInput {...inputProps} />
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroSearchField>
  )
}

export type TelFieldProps = RailsTelField & InputProps

export const TelField = ({ label, errorKey, ...rest }: TelFieldProps) => {
  const { fieldProps, inputProps } = textFieldToHeroProps(rest)
  const errorMessage = useErrorMessage(errorKey)

  return (
    <HeroTextField {...fieldProps} type="tel" isInvalid={!!errorMessage}>
      <HeroLabel>{label}</HeroLabel>
      <HeroInput {...inputProps} />
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroTextField>
  )
}

export type UrlFieldProps = RailsUrlField & InputProps

export const UrlField = ({ label, errorKey, ...rest }: UrlFieldProps) => {
  const { fieldProps, inputProps } = textFieldToHeroProps(rest)
  const errorMessage = useErrorMessage(errorKey)

  return (
    <HeroTextField {...fieldProps} type="url" isInvalid={!!errorMessage}>
      <HeroLabel>{label}</HeroLabel>
      <HeroInput {...inputProps} />
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroTextField>
  )
}

export type MonthFieldProps = RailsMonthField & InputProps

export const MonthField = ({
  label,
  errorKey,
  type: _type,
  ...rest
}: MonthFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <HeroTextField {...rest} isInvalid={!!errorMessage}>
      <HeroLabel>{label}</HeroLabel>
      <HeroInput type="month" />
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroTextField>
  )
}

export type NumberFieldProps = RailsNumberField & InputProps

export const NumberField = ({ label, errorKey, ...rest }: NumberFieldProps) => {
  const heroProps = numberFieldToHeroProps(rest)
  const errorMessage = useErrorMessage(errorKey)

  return (
    <HeroNumberField {...heroProps} isInvalid={!!errorMessage}>
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
  label,
  errorKey,
  value,
  defaultValue,
  type: _type,
  min,
  max,
  ...rest
}: RangeFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)
  const numericValue = value ? Number(value) : undefined
  const numericDefault = defaultValue ? Number(defaultValue) : undefined

  return (
    <HeroSlider
      {...rest}
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
      <HeroErrorMessage>{errorMessage}</HeroErrorMessage>
    </HeroSlider>
  )
}

export type PasswordFieldProps = RailsPasswordField & InputProps

export const PasswordField = ({
  label,
  errorKey,
  ...rest
}: PasswordFieldProps) => {
  const { fieldProps, inputProps } = textFieldToHeroProps(rest)
  const errorMessage = useErrorMessage(errorKey)

  return (
    <HeroTextField {...fieldProps} type="password" isInvalid={!!errorMessage}>
      <HeroLabel>{label}</HeroLabel>
      <HeroInput {...inputProps} />
      {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
    </HeroTextField>
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
  const errorMessage = useErrorMessage(errorKey)
  const { name, id } = rest
  const addHidden = includeHidden && multiple

  const selectedValue = 'value' in rest ? rest.value : undefined
  const selectedDefault = 'defaultValue' in rest ? rest.defaultValue : undefined

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
                      <HeroListBox.Section key={item.label}>
                        <HeroHeader>{item.label}</HeroHeader>
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
        {errorMessage && <HeroFieldError>{errorMessage}</HeroFieldError>}
      </HeroSelect>
    </>
  )
}

export type TextAreaProps = RailsTextArea & InputProps

export const TextArea = ({
  label,
  errorKey,
  type: _type,
  ...rest
}: TextAreaProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <HeroTextField {...rest} isInvalid={!!errorMessage}>
      <HeroLabel>{label}</HeroLabel>
      <HeroTextArea />
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
