import React, { useState, useContext, createContext, useMemo } from 'react'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { InputTextarea } from 'primereact/inputtextarea'
import { Password } from 'primereact/password'
import { Calendar } from 'primereact/calendar'
import { ColorPicker } from 'primereact/colorpicker'
import { Checkbox as PrimeCheckbox } from 'primereact/checkbox'
import { RadioButton as PrimeRadioButton } from 'primereact/radiobutton'
import { Dropdown as PrimeDropdown } from 'primereact/dropdown'
import { MultiSelect as PrimeMultiSelect } from 'primereact/multiselect'
import { Slider } from 'primereact/slider'
import { Button } from 'primereact/button'
export const ValidationContext = createContext({})
export const useErrorMessage = (errorKey) => {
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
export const Extras = (hiddenInputAttributes) => {
  const hiddenProps = Object.values(hiddenInputAttributes)
  const hiddenInputs = hiddenProps.map((props) => (
    <input {...props} type="hidden" key={props.name} />
  ))
  return <>{hiddenInputs}</>
}
export const Form = ({ extras, validationErrors = {}, children, ...props }) => {
  return (
    <form {...props}>
      <ValidationContext.Provider value={validationErrors}>
        <Extras {...extras}></Extras>
        {children}
      </ValidationContext.Provider>
    </form>
  )
}
const FieldError = ({ errorKey }) => {
  const errorMessage = useErrorMessage(errorKey)
  if (!errorMessage) {
    return null
  }
  return <small className="p-error">{errorMessage}</small>
}
const FieldWrapper = ({ label, id, errorKey, children }) => {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      <FieldError errorKey={errorKey} />
    </div>
  )
}
function parseDate(value) {
  if (!value) {
    return undefined
  }
  return new Date(value)
}
function parseTime(value) {
  if (!value) {
    return undefined
  }
  const [hours, minutes, seconds] = value.split(':').map(Number)
  const date = new Date()
  date.setHours(hours || 0, minutes || 0, seconds || 0, 0)
  return date
}
export const Checkbox = ({
  type: _type,
  includeHidden,
  uncheckedValue,
  errorKey,
  label,
  checked = false,
  ...rest
}) => {
  const { name, id } = rest
  return (
    <FieldWrapper label={label} id={id} errorKey={errorKey}>
      {includeHidden && (
        <input
          type="hidden"
          name={name}
          defaultValue={uncheckedValue}
          autoComplete="off"
        />
      )}
      <PrimeCheckbox inputId={id} {...rest} checked={checked} />
    </FieldWrapper>
  )
}
export const CollectionCheckboxes = ({
  includeHidden,
  collection,
  label,
  errorKey,
}) => {
  if (collection.length === 0) {
    return null
  }
  const { name } = collection[0]
  const checkboxes = collection.map((options) => {
    const {
      label: optionLabel,
      type: _type,
      includeHidden: _includeHidden,
      uncheckedValue: _uncheckedValue,
      checked = false,
      ...rest
    } = options
    return (
      <div key={rest.id} className="field-checkbox">
        <PrimeCheckbox inputId={rest.id} {...rest} checked={checked} />
        <label htmlFor={rest.id}>{optionLabel}</label>
      </div>
    )
  })
  return (
    <div className="field">
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <label>{label}</label>
      {checkboxes}
      <FieldError errorKey={errorKey} />
    </div>
  )
}
export const CollectionRadioButtons = ({
  includeHidden,
  collection,
  label,
  errorKey,
}) => {
  if (collection.length === 0) {
    return null
  }
  const { name } = collection[0]
  const radioButtons = collection.map((options) => {
    const { label: optionLabel, type: _type, ...rest } = options
    return (
      <div key={rest.value} className="field-radiobutton">
        <PrimeRadioButton inputId={rest.id} {...rest} />
        <label htmlFor={rest.id}>{optionLabel}</label>
      </div>
    )
  })
  return (
    <div className="field">
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <label>{label}</label>
      {radioButtons}
      <FieldError errorKey={errorKey} />
    </div>
  )
}
export const TextField = ({ type: _type, label, errorKey, ...rest }) => {
  const errorMessage = useErrorMessage(errorKey)
  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <InputText
        {...rest}
        type="text"
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}
export const EmailField = ({ type: _type, label, errorKey, ...rest }) => {
  const errorMessage = useErrorMessage(errorKey)
  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <InputText
        {...rest}
        type="email"
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}
export const SearchField = ({ type: _type, label, errorKey, ...rest }) => {
  const errorMessage = useErrorMessage(errorKey)
  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <InputText
        {...rest}
        type="search"
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}
export const TelField = ({ type: _type, label, errorKey, ...rest }) => {
  const errorMessage = useErrorMessage(errorKey)
  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <InputText
        {...rest}
        type="tel"
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}
export const UrlField = ({ type: _type, label, errorKey, ...rest }) => {
  const errorMessage = useErrorMessage(errorKey)
  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <InputText
        {...rest}
        type="url"
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}
export const PasswordField = ({ type: _type, label, errorKey, ...rest }) => {
  const errorMessage = useErrorMessage(errorKey)
  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <Password
        {...rest}
        inputId={rest.id}
        className={errorMessage ? 'p-invalid' : undefined}
        feedback={false}
      />
    </FieldWrapper>
  )
}
export const ColorField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  ...rest
}) => {
  const colorValue = value || defaultValue
  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <ColorPicker {...rest} value={colorValue} />
    </FieldWrapper>
  )
}
export const DateField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  min,
  max,
  ...rest
}) => {
  const errorMessage = useErrorMessage(errorKey)
  const valueProps = {}
  if (value) {
    valueProps.value = parseDate(value)
  } else if (defaultValue) {
    valueProps.defaultValue = parseDate(defaultValue)
  }
  const minMaxProps = {}
  if (min) {
    minMaxProps.minDate = parseDate(min)
  }
  if (max) {
    minMaxProps.maxDate = parseDate(max)
  }
  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <Calendar
        {...rest}
        inputId={rest.id}
        {...valueProps}
        {...minMaxProps}
        dateFormat="yy-mm-dd"
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}
export const DateTimeLocalField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  min,
  max,
  ...rest
}) => {
  const errorMessage = useErrorMessage(errorKey)
  const valueProps = {}
  if (value) {
    valueProps.value = parseDate(value)
  } else if (defaultValue) {
    valueProps.defaultValue = parseDate(defaultValue)
  }
  const minMaxProps = {}
  if (min) {
    minMaxProps.minDate = parseDate(min)
  }
  if (max) {
    minMaxProps.maxDate = parseDate(max)
  }
  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <Calendar
        {...rest}
        inputId={rest.id}
        showTime
        {...valueProps}
        {...minMaxProps}
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}
export const TimeField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  ...rest
}) => {
  const errorMessage = useErrorMessage(errorKey)
  const valueProps = {}
  if (value) {
    valueProps.value = parseTime(value)
  } else if (defaultValue) {
    valueProps.defaultValue = parseTime(defaultValue)
  }
  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <Calendar
        {...rest}
        inputId={rest.id}
        timeOnly
        {...valueProps}
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}
export const MonthField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  min,
  max,
  ...rest
}) => {
  const errorMessage = useErrorMessage(errorKey)
  const valueProps = {}
  if (value) {
    valueProps.value = parseDate(value)
  } else if (defaultValue) {
    valueProps.defaultValue = parseDate(defaultValue)
  }
  const minMaxProps = {}
  if (min) {
    minMaxProps.minDate = parseDate(min)
  }
  if (max) {
    minMaxProps.maxDate = parseDate(max)
  }
  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <Calendar
        {...rest}
        inputId={rest.id}
        view="month"
        dateFormat="yy-mm"
        {...valueProps}
        {...minMaxProps}
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}
export const NumberField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  min,
  max,
  ...rest
}) => {
  const errorMessage = useErrorMessage(errorKey)
  const numericValue =
    value !== undefined
      ? Number(value)
      : defaultValue !== undefined
      ? Number(defaultValue)
      : undefined
  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <InputNumber
        {...rest}
        inputId={rest.id}
        value={numericValue}
        min={min}
        max={max}
        useGrouping={false}
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}
export const RangeField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  ...rest
}) => {
  const initialValue =
    value !== undefined
      ? Number(value)
      : defaultValue !== undefined
      ? Number(defaultValue)
      : undefined
  const [sliderValue, setSliderValue] = useState(initialValue)
  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <Slider
        {...rest}
        value={sliderValue}
        onChange={(e) => setSliderValue(e.value)}
      />
      <input type="hidden" name={rest.name} value={sliderValue ?? ''} />
    </FieldWrapper>
  )
}
export const Select = ({
  includeHidden,
  name,
  id,
  options,
  errorKey,
  type: _type,
  ...rest
}) => {
  const errorMessage = useErrorMessage(errorKey)
  const addHidden = includeHidden && rest.multiple
  const flatOptions = options.flatMap((item) => {
    if ('options' in item) {
      return item.options.map((opt) => ({
        label: opt.label,
        value: opt.value,
        disabled: opt.disabled,
      }))
    }
    return [{ label: item.label, value: item.value, disabled: item.disabled }]
  })
  if (rest.multiple) {
    const { multiple: _multiple, value, defaultvalue, ...multiRest } = rest
    const selectedValues = value || defaultvalue || []
    const [values, setValues] = useState(selectedValues)
    return (
      <FieldWrapper label={rest.label} id={id} errorKey={errorKey}>
        {addHidden && (
          <input type="hidden" name={name} value={''} autoComplete="off" />
        )}
        <PrimeMultiSelect
          {...multiRest}
          inputId={id}
          options={flatOptions}
          value={values}
          onChange={(e) => setValues(e.value)}
          className={errorMessage ? 'p-invalid' : undefined}
        />
        {values.map((val) => (
          <input
            type="hidden"
            key={val}
            name={name}
            value={val}
            autoComplete="off"
          />
        ))}
      </FieldWrapper>
    )
  }
  const { multiple: _multiple, value, defaultvalue, ...singleRest } = rest
  const selectedValue = value || defaultvalue
  return (
    <FieldWrapper label={rest.label} id={id} errorKey={errorKey}>
      <PrimeDropdown
        {...singleRest}
        inputId={id}
        name={name}
        options={flatOptions}
        value={selectedValue}
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}
export const TextArea = ({ type: _type, label, errorKey, ...rest }) => {
  const errorMessage = useErrorMessage(errorKey)
  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <InputTextarea
        {...rest}
        className={errorMessage ? 'p-invalid' : undefined}
      />
    </FieldWrapper>
  )
}
export const FileField = ({ type: _type, label, errorKey, ...rest }) => {
  return (
    <FieldWrapper label={label} id={rest.id} errorKey={errorKey}>
      <input {...rest} type="file" />
    </FieldWrapper>
  )
}
export const SubmitButton = ({ type: _type, text, ...rest }) => {
  return <Button {...rest} type="submit" label={text} />
}
