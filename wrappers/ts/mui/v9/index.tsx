import React, { createContext, ReactNode, useContext, useMemo, ComponentProps } from 'react'

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
  TelField as RailsTelField,
  TextField as RailsTextField,
  TextArea as RailsTextArea,
  TimeField as RailsTimeField,
  UrlField as RailsUrlField,
  HTMLFormProps as RailsHTMLFormProps,
  SubmitProps as RailsSubmitButton,
  ValidationErrors,
} from '@thoughtbot/candy_wrapper'

import TextField from '@mui/material/TextField'
import MuiCheckbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import MuiSelect from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'

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

type TextFieldComponentProps = ComponentProps<typeof TextField> &
  RailsTextField &
  InputProps
export const TextFieldComponent = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: TextFieldComponentProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <TextField
      label={label}
      type="text"
      error={!!errorMessage}
      helperText={errorMessage}
      {...rest}
    />
  )
}
export { TextFieldComponent as TextField }

type EmailFieldProps = ComponentProps<typeof TextField> &
  RailsEmailField &
  InputProps
export const EmailField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: EmailFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <TextField
      label={label}
      type="email"
      error={!!errorMessage}
      helperText={errorMessage}
      {...rest}
    />
  )
}

type ColorFieldProps = ComponentProps<typeof TextField> &
  RailsColorField &
  InputProps
export const ColorField = ({
  type: _type,
  color: _color,
  label,
  errorKey,
  ...rest
}: ColorFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <TextField
      label={label}
      type="color"
      error={!!errorMessage}
      helperText={errorMessage}
      {...rest}
    />
  )
}

type DateFieldProps = ComponentProps<typeof TextField> &
  RailsDateField &
  InputProps
export const DateField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: DateFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <TextField
      label={label}
      type="date"
      error={!!errorMessage}
      helperText={errorMessage}
      slotProps={{ inputLabel: { shrink: true } }}
      {...rest}
    />
  )
}

type DateTimeLocalFieldProps = ComponentProps<typeof TextField> &
  RailsDateTimeLocalField &
  InputProps
export const DateTimeLocalField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: DateTimeLocalFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <TextField
      label={label}
      type="datetime-local"
      error={!!errorMessage}
      helperText={errorMessage}
      slotProps={{ inputLabel: { shrink: true } }}
      {...rest}
    />
  )
}

type SearchFieldProps = ComponentProps<typeof TextField> &
  RailsSearchField &
  InputProps
export const SearchField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: SearchFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <TextField
      label={label}
      type="search"
      error={!!errorMessage}
      helperText={errorMessage}
      {...rest}
    />
  )
}

type TelFieldProps = ComponentProps<typeof TextField> &
  RailsTelField &
  InputProps
export const TelField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: TelFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <TextField
      label={label}
      type="tel"
      error={!!errorMessage}
      helperText={errorMessage}
      {...rest}
    />
  )
}

type UrlFieldProps = ComponentProps<typeof TextField> &
  RailsUrlField &
  InputProps
export const UrlField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: UrlFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <TextField
      label={label}
      type="url"
      error={!!errorMessage}
      helperText={errorMessage}
      {...rest}
    />
  )
}

type MonthFieldProps = ComponentProps<typeof TextField> &
  RailsMonthField &
  InputProps
export const MonthField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: MonthFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <TextField
      label={label}
      type="month"
      error={!!errorMessage}
      helperText={errorMessage}
      slotProps={{ inputLabel: { shrink: true } }}
      {...rest}
    />
  )
}

type TimeFieldProps = ComponentProps<typeof TextField> &
  RailsTimeField &
  InputProps
export const TimeField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: TimeFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <TextField
      label={label}
      type="time"
      error={!!errorMessage}
      helperText={errorMessage}
      slotProps={{ inputLabel: { shrink: true } }}
      {...rest}
    />
  )
}

type NumberFieldProps = ComponentProps<typeof TextField> &
  RailsNumberField &
  InputProps & { step?: number }
export const NumberField = ({
  type: _type,
  label,
  errorKey,
  min,
  max,
  step,
  ...rest
}: NumberFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <TextField
      label={label}
      type="number"
      error={!!errorMessage}
      helperText={errorMessage}
      slotProps={{ htmlInput: { min, max, step } }}
      {...rest}
    />
  )
}

type PasswordFieldProps = ComponentProps<typeof TextField> &
  RailsPasswordField &
  InputProps
export const PasswordField = ({
  type: _type,
  label,
  errorKey,
  ...rest
}: PasswordFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <TextField
      label={label}
      type="password"
      error={!!errorMessage}
      helperText={errorMessage}
      {...rest}
    />
  )
}

type RangeFieldProps = ComponentProps<typeof Slider> &
  RailsRangeField &
  InputProps
export const RangeField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  ...rest
}: RangeFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  const sliderValue = value !== undefined ? Number(value) : undefined
  const sliderDefaultValue =
    defaultValue !== undefined ? Number(defaultValue) : undefined

  return (
    <FormControl error={!!errorMessage} fullWidth>
      <FormLabel>{label}</FormLabel>
      <Slider
        value={sliderValue}
        defaultValue={sliderDefaultValue}
        {...rest}
      />
      <input type="hidden" name={rest.name} value={sliderValue ?? sliderDefaultValue ?? ''} />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

type CheckboxProps = ComponentProps<typeof MuiCheckbox> &
  RailsCheckboxField &
  InputProps
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
    <FormControl error={!!errorMessage}>
      {includeHidden && (
        <input
          type="hidden"
          name={name}
          defaultValue={uncheckedValue}
          autoComplete="off"
        />
      )}
      <FormControlLabel
        label={label}
        control={<MuiCheckbox {...rest} />}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
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

  const { name } = collection[0]

  const checkboxes = collection.map((options) => {
    const {
      label: checkboxLabel,
      type: _type,
      includeHidden: _includeHidden,
      uncheckedValue: _uncheckedValue,
      ...rest
    } = options

    return (
      <FormControlLabel
        key={rest.id}
        label={checkboxLabel}
        control={<MuiCheckbox {...rest} />}
      />
    )
  })

  return (
    <FormControl error={!!errorMessage}>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <FormLabel>{label}</FormLabel>
      {checkboxes}
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
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

  const radioButtons = collection.map((options) => {
    const {
      label: radioLabel,
      checked: _checked,
      defaultChecked: _defaultChecked,
      type: _type,
      ...rest
    } = options

    return (
      <FormControlLabel
        key={rest.id}
        label={radioLabel}
        control={<Radio {...rest} />}
      />
    )
  })

  return (
    <FormControl error={!!errorMessage}>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <FormLabel>{label}</FormLabel>
      <RadioGroup name={name} {...valueProps}>
        {radioButtons}
      </RadioGroup>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

type SelectProps = (
  | (ComponentProps<typeof MuiSelect> & RailsSingleSelect)
  | (ComponentProps<typeof MuiSelect> & RailsMultiSelect)
) &
  InputProps
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

  const menuItems = options.flatMap((item) => {
    if ('options' in item) {
      return item.options.map((opt) => (
        <MenuItem key={`${item.label}-${opt.value}`} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </MenuItem>
      ))
    } else {
      return (
        <MenuItem key={item.value} value={item.value} disabled={item.disabled}>
          {item.label}
        </MenuItem>
      )
    }
  })

  const labelId = id ? `${id}-label` : undefined

  return (
    <FormControl error={!!errorMessage} fullWidth>
      {addHidden && (
        <input type="hidden" name={name} value={''} autoComplete="off" />
      )}
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect
        name={name}
        id={id}
        labelId={labelId}
        label={label}
        multiple={multiple}
        {...rest}
      >
        {menuItems}
      </MuiSelect>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

type TextAreaProps = ComponentProps<typeof TextField> &
  RailsTextArea &
  InputProps
export const TextArea = ({
  type: _type,
  label,
  errorKey,
  rows,
  ...rest
}: TextAreaProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <TextField
      label={label}
      multiline
      rows={rows}
      error={!!errorMessage}
      helperText={errorMessage}
      {...rest}
    />
  )
}

type FileFieldProps = React.InputHTMLAttributes<HTMLInputElement> &
  InputProps
export const FileField = ({
  type: _type,
  color: _color,
  size: _size,
  label,
  errorKey,
  ...rest
}: FileFieldProps) => {
  const errorMessage = useErrorMessage(errorKey)

  return (
    <TextField
      label={label}
      type="file"
      error={!!errorMessage}
      helperText={errorMessage}
      slotProps={{ inputLabel: { shrink: true } }}
      {...rest}
    />
  )
}

type SubmitButtonProps = ComponentProps<typeof Button> &
  RailsSubmitButton
export const SubmitButton = ({
  type: _type,
  text,
  ...rest
}: SubmitButtonProps) => {
  return (
    <Button {...rest} type="submit" variant="contained">
      {text}
    </Button>
  )
}
