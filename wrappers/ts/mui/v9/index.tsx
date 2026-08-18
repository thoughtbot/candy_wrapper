import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  ComponentProps,
} from 'react'

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

// TextField
type TextFieldComponentProps = ComponentProps<typeof TextField> &
  RailsTextField &
  InputProps
export const TextFieldComponent = (props: TextFieldComponentProps) => {
  // Strip candy_wrapper-specific props
  const { type, errorKey, label, ...rest } = props

  // Transform
  const errorMessage = useErrorMessage(errorKey)

  // Spread rest into MUI TextField
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

// EmailField
type EmailFieldProps = ComponentProps<typeof TextField> &
  RailsEmailField &
  InputProps
export const EmailField = (props: EmailFieldProps) => {
  const { type, errorKey, label, ...rest } = props

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

// ColorField — also strips `color` since it clashes with MUI's `color` prop
type ColorFieldProps = ComponentProps<typeof TextField> &
  RailsColorField &
  InputProps
export const ColorField = (props: ColorFieldProps) => {
  const { type, color, errorKey, label, ...rest } = props

  const errorMessage = useErrorMessage(errorKey)

  return (
    <TextField
      label={label}
      type="color"
      error={!!errorMessage}
      helperText={errorMessage}
      fullWidth
      slotProps={{
        inputLabel: { shrink: true },
        htmlInput: { sx: { height: 56, padding: '8px', cursor: 'pointer', boxSizing: 'border-box' } },
      }}
      {...rest}
    />
  )
}

// DateField
type DateFieldProps = ComponentProps<typeof TextField> &
  RailsDateField &
  InputProps
export const DateField = (props: DateFieldProps) => {
  const { type, errorKey, label, ...rest } = props

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

// DateTimeLocalField
type DateTimeLocalFieldProps = ComponentProps<typeof TextField> &
  RailsDateTimeLocalField &
  InputProps
export const DateTimeLocalField = (props: DateTimeLocalFieldProps) => {
  const { type, errorKey, label, ...rest } = props

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

// SearchField
type SearchFieldProps = ComponentProps<typeof TextField> &
  RailsSearchField &
  InputProps
export const SearchField = (props: SearchFieldProps) => {
  const { type, errorKey, label, ...rest } = props

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

// TelField
type TelFieldProps = ComponentProps<typeof TextField> &
  RailsTelField &
  InputProps
export const TelField = (props: TelFieldProps) => {
  const { type, errorKey, label, ...rest } = props

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

// UrlField
type UrlFieldProps = ComponentProps<typeof TextField> &
  RailsUrlField &
  InputProps
export const UrlField = (props: UrlFieldProps) => {
  const { type, errorKey, label, ...rest } = props

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

// MonthField
type MonthFieldProps = ComponentProps<typeof TextField> &
  RailsMonthField &
  InputProps
export const MonthField = (props: MonthFieldProps) => {
  const { type, errorKey, label, ...rest } = props

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

// TimeField
type TimeFieldProps = ComponentProps<typeof TextField> &
  RailsTimeField &
  InputProps
export const TimeField = (props: TimeFieldProps) => {
  const { type, errorKey, label, ...rest } = props

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

// NumberField — strips `min`, `max`, `step` and transforms them into slotProps
type NumberFieldProps = ComponentProps<typeof TextField> &
  RailsNumberField &
  InputProps
export const NumberField = (props: NumberFieldProps) => {
  const { type, errorKey, label, min, max, step, ...rest } = props

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

// PasswordField
type PasswordFieldProps = ComponentProps<typeof TextField> &
  RailsPasswordField &
  InputProps
export const PasswordField = (props: PasswordFieldProps) => {
  const { type, errorKey, label, ...rest } = props

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

// RangeField — transforms string value/defaultValue to numbers for MUI Slider
type RangeFieldProps = ComponentProps<typeof Slider> &
  RailsRangeField &
  InputProps
export const RangeField = (props: RangeFieldProps) => {
  // Strip candy_wrapper-specific props
  const { type, errorKey, label, value, defaultValue, ...rest } = props

  // Transform string values to numbers for MUI Slider
  const errorMessage = useErrorMessage(errorKey)
  const sliderValue = value !== undefined ? Number(value) : undefined
  const sliderDefaultValue =
    defaultValue !== undefined ? Number(defaultValue) : undefined

  // Spread rest into Slider
  return (
    <FormControl error={!!errorMessage} fullWidth>
      <FormLabel>{label}</FormLabel>
      <Slider value={sliderValue} defaultValue={sliderDefaultValue} {...rest} />
      <input
        type="hidden"
        name={rest.name}
        value={sliderValue ?? sliderDefaultValue ?? ''}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

// Checkbox — strips includeHidden, uncheckedValue; passes defaultChecked/checked through natively
type CheckboxProps = ComponentProps<typeof MuiCheckbox> &
  RailsCheckboxField &
  InputProps
export const Checkbox = (props: CheckboxProps) => {
  // Strip candy_wrapper-specific props
  const { type, includeHidden, uncheckedValue, errorKey, label, ...rest } = props

  // Transform
  const errorMessage = useErrorMessage(errorKey)
  const { name } = rest

  // Spread rest into MuiCheckbox (defaultChecked/checked pass through natively)
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
      <FormControlLabel label={label} control={<MuiCheckbox {...rest} />} />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

// CollectionCheckboxes — strips candy_wrapper props from each collection item
type CollectionCheckboxesFieldProps = RailsCollectionCheckboxesField &
  InputProps
export const CollectionCheckboxes = (props: CollectionCheckboxesFieldProps) => {
  // Strip candy_wrapper-specific props
  const { includeHidden, collection, label, errorKey } = props

  const errorMessage = useErrorMessage(errorKey)

  if (collection.length === 0) {
    return null
  }

  const { name } = collection[0]

  const checkboxes = collection.map((item) => {
    // Strip candy_wrapper-specific props from each collection item
    const { label: checkboxLabel, type, includeHidden: _ih, uncheckedValue: _uv, ...rest } = item

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

// CollectionRadioButtons — extracts value from checked/defaultChecked items for RadioGroup
type CollectionRadioButtonsFieldProps = RailsCollectionRadioButtonsField &
  InputProps
export const CollectionRadioButtons = (props: CollectionRadioButtonsFieldProps) => {
  // Strip candy_wrapper-specific props
  const { includeHidden, collection, label, errorKey } = props

  const errorMessage = useErrorMessage(errorKey)

  if (collection.length === 0) {
    return null
  }

  // Transform: extract value/defaultValue for RadioGroup from checked/defaultChecked items
  const defaultItem = collection.find((option) => !!option.defaultChecked)
  const checkedItem = collection.find((option) => !!option.checked)

  const valueProps: { value?: string; defaultValue?: string } = {}
  if (defaultItem) {
    valueProps.defaultValue = defaultItem.value
  } else if (checkedItem) {
    valueProps.value = checkedItem.value
  }

  const { name } = collection[0]

  const radioButtons = collection.map((item) => {
    // Strip candy_wrapper-specific props from each collection item
    const { label: radioLabel, checked, defaultChecked, type, ...rest } = item

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

// Select — strips candy_wrapper props, transforms options to MenuItem children
type SelectProps = (
  | (ComponentProps<typeof MuiSelect> & RailsSingleSelect)
  | (ComponentProps<typeof MuiSelect> & RailsMultiSelect)
) &
  InputProps
export const Select = (props: SelectProps) => {
  // Strip candy_wrapper-specific props
  const { type, includeHidden, options, errorKey, label, name, id, multiple, ...rest } = props

  // Transform
  const errorMessage = useErrorMessage(errorKey)
  const addHidden = includeHidden && multiple

  // Transform options into MenuItem children (flattening optgroups)
  const menuItems = options.flatMap((item) => {
    if ('options' in item) {
      return item.options.map((opt) => (
        <MenuItem
          key={`${item.label}-${opt.value}`}
          value={opt.value}
          disabled={opt.disabled}
        >
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

  // Spread rest into MuiSelect
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

// TextArea
type TextAreaProps = ComponentProps<typeof TextField> &
  RailsTextArea &
  InputProps
export const TextArea = (props: TextAreaProps) => {
  const { type, errorKey, label, rows, ...rest } = props

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

type FileFieldProps = RailsFileField & InputProps
export const FileField = (props: FileFieldProps) => {
  const { type, errorKey, label, ...rest } = props

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

// SubmitButton
type SubmitButtonProps = ComponentProps<typeof Button> & RailsSubmitButton
export const SubmitButton = (props: SubmitButtonProps) => {
  const { type, text, ...rest } = props

  return (
    <Button {...rest} type="submit" variant="contained">
      {text}
    </Button>
  )
}
