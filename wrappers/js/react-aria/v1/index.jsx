/**
 * A set of [candy_wrappers](https://github.com/thoughtbot/candy_wrapper) around
 * React Aria Components input components. It works with the output from
 * [FormProps](https://github.com/thoughtbot/form_props).
 *
 * You modify these components to fit your design needs.
 */
import React, { useContext, useMemo } from 'react'
import { parseDate, parseDateTime, parseTime } from '@internationalized/date'
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
export const useErrorKeyValidation = ({ errorKey, name }) => {
  const serverErrors = useContext(FormValidationContext)
  return useMemo(() => {
    if (name && serverErrors && errorKey && serverErrors[errorKey]) {
      return { [name]: serverErrors[errorKey] }
    }
    return serverErrors
  }, [serverErrors, errorKey, name])
}
export const useErrorMessage = (errorKey) => {
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
export const Extras = (hiddenInputAttributes) => {
  const hiddenProps = Object.values(hiddenInputAttributes)
  const hiddenInputs = hiddenProps.map((props) => (
    <input {...props} type="hidden" key={props.name} />
  ))
  return <>{hiddenInputs}</>
}
export const Form = ({ extras, validationErrors = {}, children, ...props }) => {
  return (
    <AriaForm {...props} validationErrors={validationErrors}>
      <FormValidationContext.Provider value={validationErrors}>
        <Extras {...extras}></Extras>
        {children}
      </FormValidationContext.Provider>
    </AriaForm>
  )
}
// -- Transform functions --
export const checkboxPropsToRACProps = (props) => {
  const { defaultChecked, checked, type: _type, ...rest } = props
  const racProps = { ...rest }
  if (defaultChecked !== undefined) {
    racProps.defaultSelected = defaultChecked
  }
  if (checked !== undefined) {
    racProps.isSelected = checked
  }
  return racProps
}
export const textFieldToRACProps = (props) => {
  const { type: _type, ...rest } = props
  return rest
}
export const numberFieldToRACProps = (props) => {
  const { value, defaultValue, min, max, type: _type, ...rest } = props
  const racProps = { ...rest }
  if (value !== undefined && value !== '') {
    racProps.value = Number(value)
  }
  if (defaultValue !== undefined && defaultValue !== '') {
    racProps.defaultValue = Number(defaultValue)
  }
  if (min !== undefined) {
    racProps.minValue = min
  }
  if (max !== undefined) {
    racProps.maxValue = max
  }
  return racProps
}
export const dateFieldToRACProps = (props) => {
  const { max, min, value, defaultValue, type: _type, ...rest } = props
  const racProps = { ...rest }
  if (max) racProps.maxValue = parseDate(max)
  if (min) racProps.minValue = parseDate(min)
  if (defaultValue) racProps.defaultValue = parseDate(defaultValue)
  if (value) racProps.value = parseDate(value)
  return racProps
}
export const dateTimeLocalFieldToRACProps = (props) => {
  const { max, min, value, defaultValue, type: _type, ...rest } = props
  const racProps = { ...rest }
  racProps.granularity = 'second'
  if (max) racProps.maxValue = parseDateTime(max)
  if (min) racProps.minValue = parseDateTime(min)
  if (defaultValue) racProps.defaultValue = parseDateTime(defaultValue)
  if (value) racProps.value = parseDateTime(value)
  return racProps
}
export const timeFieldToRACProps = (props) => {
  const { min, max, value, defaultValue, type: _type, ...rest } = props
  const racProps = { ...rest }
  if (value) racProps.value = parseTime(value)
  if (defaultValue) racProps.defaultValue = parseTime(defaultValue)
  if (min) racProps.minValue = parseTime(min)
  if (max) racProps.maxValue = parseTime(max)
  return racProps
}
export const Checkbox = ({
  includeHidden,
  uncheckedValue,
  errorKey,
  label,
  ...rest
}) => {
  const racProps = checkboxPropsToRACProps(rest)
  const { name } = racProps
  const validationErrors = useErrorKeyValidation({ errorKey, name })
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
      <AriaCheckbox {...racProps}>
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
export const CollectionCheckboxes = ({
  includeHidden,
  collection,
  label,
  errorKey,
}) => {
  if (collection.length === 0) {
    return null
  }
  const defaultItems = collection.filter((option) => !!option.defaultChecked)
  const items = collection.filter((option) => !!option.checked)
  const valueProps = {}
  if (defaultItems.length > 0) {
    valueProps.defaultValue = defaultItems.map((option) => option.value)
  } else if (items.length > 0) {
    valueProps.value = items.map((option) => option.value)
  }
  const { name } = collection[0]
  const validationErrors = useErrorKeyValidation({ errorKey, name })
  const errorMessage = useErrorMessage(errorKey)
  return (
    <FormValidationContext.Provider value={validationErrors}>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <AriaCheckboxGroup {...valueProps} isInvalid={!!errorMessage}>
        <AriaLabel>{label}</AriaLabel>
        {collection.map(
          ({
            checked: _checked,
            defaultChecked: _defaultChecked,
            ...checkboxProps
          }) => (
            <AriaCheckbox
              key={checkboxProps.id}
              name={name}
              value={checkboxProps.value}
              id={checkboxProps.id}
            >
              <div className="checkbox">
                <svg viewBox="0 0 18 18" aria-hidden="true">
                  <polyline points="1 9 7 14 15 4" />
                </svg>
              </div>
              {checkboxProps.label}
            </AriaCheckbox>
          )
        )}
        {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
      </AriaCheckboxGroup>
    </FormValidationContext.Provider>
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
  const defaultItem = collection.find((option) => !!option.defaultChecked)
  const item = collection.find((option) => !!option.checked)
  const valueProps = {}
  if (defaultItem) {
    valueProps.defaultValue = defaultItem.value
  } else if (item) {
    valueProps.value = item.value
  }
  const { name } = collection[0]
  const validationErrors = useErrorKeyValidation({ errorKey, name })
  const errorMessage = useErrorMessage(errorKey)
  return (
    <FormValidationContext.Provider value={validationErrors}>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <AriaRadioGroup name={name} {...valueProps} isInvalid={!!errorMessage}>
        <AriaLabel>{label}</AriaLabel>
        {collection.map(
          ({ label: optionLabel, type: _type, ...radioProps }) => (
            <AriaRadio
              key={radioProps.value}
              value={radioProps.value}
              id={radioProps.id}
            >
              {optionLabel}
            </AriaRadio>
          )
        )}
        {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
      </AriaRadioGroup>
    </FormValidationContext.Provider>
  )
}
const TextBase = ({ errorKey, children, ...props }) => {
  const validationErrors = useErrorKeyValidation({ errorKey, name: props.name })
  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaTextField {...props}>{children}</AriaTextField>
    </FormValidationContext.Provider>
  )
}
export const TextField = ({ label, errorKey, ...rest }) => {
  const racProps = textFieldToRACProps(rest)
  return (
    <TextBase errorKey={errorKey} {...racProps}>
      <AriaLabel>{label}</AriaLabel>
      <AriaInput />
      <AriaFieldError />
    </TextBase>
  )
}
export const EmailField = ({ label, errorKey, ...rest }) => {
  const { type: _type, ...props } = rest
  return (
    <TextBase errorKey={errorKey} {...props} type="email">
      <AriaLabel>{label}</AriaLabel>
      <AriaInput />
      <AriaFieldError />
    </TextBase>
  )
}
export const ColorField = ({ label, errorKey, type: _type, ...rest }) => {
  const validationErrors = useErrorKeyValidation({ errorKey, name: rest.name })
  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaColorField {...rest}>
        <AriaLabel>{label}</AriaLabel>
        <AriaInput />
        <AriaFieldError />
      </AriaColorField>
    </FormValidationContext.Provider>
  )
}
export const DateField = ({ label, errorKey, ...rest }) => {
  const racProps = dateFieldToRACProps(rest)
  const validationErrors = useErrorKeyValidation({ errorKey, name: rest.name })
  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaDateField {...racProps}>
        <AriaLabel>{label}</AriaLabel>
        <AriaDateInput>
          {(segment) => <AriaDateSegment segment={segment} />}
        </AriaDateInput>
        <AriaFieldError />
      </AriaDateField>
    </FormValidationContext.Provider>
  )
}
export const DateTimeLocalField = ({ label, errorKey, ...rest }) => {
  const racProps = dateTimeLocalFieldToRACProps(rest)
  const validationErrors = useErrorKeyValidation({ errorKey, name: rest.name })
  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaDateField {...racProps}>
        <AriaLabel>{label}</AriaLabel>
        <AriaDateInput>
          {(segment) => <AriaDateSegment segment={segment} />}
        </AriaDateInput>
        <AriaFieldError />
      </AriaDateField>
    </FormValidationContext.Provider>
  )
}
export const TimeField = ({ label, errorKey, ...rest }) => {
  const racProps = timeFieldToRACProps(rest)
  const validationErrors = useErrorKeyValidation({ errorKey, name: rest.name })
  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaTimeField {...racProps}>
        <AriaLabel>{label}</AriaLabel>
        <AriaDateInput>
          {(segment) => <AriaDateSegment segment={segment} />}
        </AriaDateInput>
        <AriaFieldError />
      </AriaTimeField>
    </FormValidationContext.Provider>
  )
}
export const SearchField = ({
  label,
  errorKey,
  type: _type,
  autosave: _autosave,
  results: _results,
  onsearch: _onsearch,
  incremental: _incremental,
  ...rest
}) => {
  const validationErrors = useErrorKeyValidation({ errorKey, name: rest.name })
  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaSearchField {...rest}>
        <AriaLabel>{label}</AriaLabel>
        <AriaInput />
        <AriaFieldError />
      </AriaSearchField>
    </FormValidationContext.Provider>
  )
}
export const TelField = ({ label, errorKey, ...rest }) => {
  const { type: _type, ...props } = rest
  return (
    <TextBase errorKey={errorKey} {...props} type="tel">
      <AriaLabel>{label}</AriaLabel>
      <AriaInput />
      <AriaFieldError />
    </TextBase>
  )
}
export const UrlField = ({ label, errorKey, ...rest }) => {
  const { type: _type, ...props } = rest
  return (
    <TextBase errorKey={errorKey} {...props} type="url">
      <AriaLabel>{label}</AriaLabel>
      <AriaInput />
      <AriaFieldError />
    </TextBase>
  )
}
export const MonthField = ({ label, errorKey, type: _type, ...rest }) => {
  return (
    <TextBase errorKey={errorKey} {...rest}>
      <AriaLabel>{label}</AriaLabel>
      <AriaInput type="month" />
      <AriaFieldError />
    </TextBase>
  )
}
export const NumberField = ({ label, errorKey, ...rest }) => {
  const racProps = numberFieldToRACProps(rest)
  const validationErrors = useErrorKeyValidation({ errorKey, name: rest.name })
  return (
    <FormValidationContext.Provider value={validationErrors}>
      <AriaNumberField {...racProps}>
        <AriaLabel>{label}</AriaLabel>
        <AriaGroup>
          <AriaButton slot="decrement">-</AriaButton>
          <AriaInput />
          <AriaButton slot="increment">+</AriaButton>
        </AriaGroup>
        <AriaFieldError />
      </AriaNumberField>
    </FormValidationContext.Provider>
  )
}
export const RangeField = ({
  label,
  errorKey,
  value,
  defaultValue,
  min,
  max,
  type: _type,
  ...rest
}) => {
  const errorMessage = useErrorMessage(errorKey)
  const numericValue = value ? Number(value) : undefined
  const numericDefault = defaultValue ? Number(defaultValue) : undefined
  return (
    <>
      <AriaSlider
        defaultValue={numericDefault}
        value={numericValue}
        minValue={min}
        maxValue={max}
      >
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
export const PasswordField = ({ label, errorKey, ...rest }) => {
  const { type: _type, ...props } = rest
  return (
    <TextBase errorKey={errorKey} {...props} type="password">
      <AriaLabel>{label}</AriaLabel>
      <AriaInput />
      <AriaFieldError />
    </TextBase>
  )
}
export const Select = ({
  includeHidden,
  label,
  errorKey,
  multiple,
  type: _type,
  options,
  ...rest
}) => {
  const { name } = rest
  const validationErrors = useErrorKeyValidation({ errorKey, name })
  const addHidden = includeHidden && multiple
  const flatOptions = options.flatMap((item) => {
    if ('options' in item) {
      return item.options
    }
    return [item]
  })
  const selectedValue = 'value' in rest ? rest.value : undefined
  const selectedDefault = 'defaultValue' in rest ? rest.defaultValue : undefined
  const selectionProps = {}
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
export const TextArea = ({ label, errorKey, type: _type, ...rest }) => {
  return (
    <TextBase errorKey={errorKey} {...rest}>
      <AriaLabel>{label}</AriaLabel>
      <AriaTextArea />
      <AriaFieldError />
    </TextBase>
  )
}
export const FileField = ({ type: _type, label, errorKey }) => {
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
export const SubmitButton = ({ type: _type, text, ...rest }) => {
  return (
    <AriaButton {...rest} type="submit">
      {text}
    </AriaButton>
  )
}
