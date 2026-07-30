import React, { createContext, useContext, useMemo } from 'react'
import { parseDate, parseDateTime, parseTime } from '@internationalized/date'
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
  const formProps = props
  return (
    <SpectrumForm {...formProps}>
      <ValidationContext.Provider value={validationErrors}>
        <Extras {...extras}></Extras>
        {children}
      </ValidationContext.Provider>
    </SpectrumForm>
  )
}
export const Checkbox = ({
  type: _type,
  includeHidden,
  uncheckedValue,
  errorKey,
  label,
  checked,
  defaultChecked,
  ...rest
}) => {
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
export const CollectionCheckboxes = ({
  includeHidden,
  collection,
  label,
  errorKey,
}) => {
  const errorMessage = useErrorMessage(errorKey)
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
export const CollectionRadioButtons = ({
  includeHidden,
  collection,
  label,
  errorKey,
}) => {
  const errorMessage = useErrorMessage(errorKey)
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
export const TextField = ({ type: _type, label, errorKey, ...rest }) => {
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
export const EmailField = ({ type: _type, label, errorKey, ...rest }) => {
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
export const ColorField = ({ type: _type, label, errorKey, ...rest }) => {
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
    valueProps.value = parseDateTime(value)
  } else if (defaultValue) {
    valueProps.defaultValue = parseDateTime(defaultValue)
  }
  const minMaxProps = {}
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
    <SpectrumTimeField
      label={label}
      name={rest.name}
      {...valueProps}
      validationState={errorMessage ? 'invalid' : undefined}
      errorMessage={errorMessage}
    />
  )
}
export const SearchField = ({
  type: _type,
  label,
  errorKey,
  autosave: _autosave,
  results: _results,
  onsearch: _onsearch,
  incremental: _incremental,
  ...rest
}) => {
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
export const TelField = ({ type: _type, label, errorKey, ...rest }) => {
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
export const UrlField = ({ type: _type, label, errorKey, ...rest }) => {
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
export const MonthField = ({ type: _type, label, errorKey, ...rest }) => {
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
  const valueProps = {}
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
export const RangeField = ({
  type: _type,
  label,
  errorKey,
  value,
  defaultValue,
  ...rest
}) => {
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
export const PasswordField = ({ type: _type, label, errorKey, ...rest }) => {
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
}) => {
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
export const TextArea = ({ type: _type, label, errorKey, ...rest }) => {
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
export const FileField = ({ type: _type, label, errorKey }) => {
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
export const SubmitButton = ({ type: _type, text, ...rest }) => {
  return (
    <SpectrumButton {...rest} type="submit" variant="primary">
      {text}
    </SpectrumButton>
  )
}
