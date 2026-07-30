import React, { createContext, useContext, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
export const FieldError = ({ errorKey }) => {
  const errorMessage = useErrorMessage(errorKey)
  if (!errorMessage) {
    return null
  }
  return <p className="text-sm text-destructive">{errorMessage}</p>
}
export const FieldBase = ({ label, errorKey, children, ...props }) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={props.id}>{label}</Label>
      {children || <Input {...props} />}
      <FieldError errorKey={errorKey} />
    </div>
  )
}
export const Checkbox = ({
  type: _type,
  includeHidden,
  uncheckedValue,
  errorKey,
  label,
  value,
  ...rest
}) => {
  const { name, ...checkboxRest } = rest
  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        {includeHidden && (
          <input
            type="hidden"
            name={name}
            defaultValue={uncheckedValue}
            autoComplete="off"
          />
        )}
        <ShadcnCheckbox
          id={checkboxRest.id}
          name={name}
          value={value}
          {...checkboxRest}
        />
        <Label htmlFor={checkboxRest.id}>{label}</Label>
      </div>
      <FieldError errorKey={errorKey} />
    </div>
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
  const checkboxes = collection.map((options) => {
    return <Checkbox {...options} key={options.id} />
  })
  const { name } = collection[0]
  return (
    <div className="grid gap-2">
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <Label>{label}</Label>
      <div className="grid gap-2">{checkboxes}</div>
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
  const defaultItem = collection.find((option) => !!option.defaultChecked)
  const item = collection.find((option) => !!option.checked)
  const { name } = collection[0]
  return (
    <div className="grid gap-2">
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <Label>{label}</Label>
      <RadioGroup
        name={name}
        defaultValue={defaultItem?.value}
        value={item?.value}
      >
        {collection.map((option) => (
          <div className="flex items-center gap-2" key={option.value}>
            <RadioGroupItem value={option.value} id={option.id} />
            <Label htmlFor={option.id}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <FieldError errorKey={errorKey} />
    </div>
  )
}
export const TextField = ({ type: _type, errorKey, ...rest }) => {
  return <FieldBase {...rest} type="text" errorKey={errorKey} />
}
export const EmailField = ({ type: _type, errorKey, ...rest }) => {
  return <FieldBase {...rest} type="email" errorKey={errorKey} />
}
export const ColorField = ({ type: _type, errorKey, ...rest }) => {
  return <FieldBase {...rest} type="color" errorKey={errorKey} />
}
export const DateField = ({ type: _type, errorKey, ...rest }) => {
  return <FieldBase {...rest} type="date" errorKey={errorKey} />
}
export const DateTimeLocalField = ({ type: _type, errorKey, ...rest }) => {
  return <FieldBase {...rest} type="datetime-local" errorKey={errorKey} />
}
export const SearchField = ({ type: _type, errorKey, ...rest }) => {
  return <FieldBase {...rest} type="search" errorKey={errorKey} />
}
export const TelField = ({ type: _type, errorKey, ...rest }) => {
  return <FieldBase {...rest} type="tel" errorKey={errorKey} />
}
export const UrlField = ({ type: _type, errorKey, ...rest }) => {
  return <FieldBase {...rest} type="url" errorKey={errorKey} />
}
export const MonthField = ({ type: _type, errorKey, ...rest }) => {
  return <FieldBase {...rest} type="month" errorKey={errorKey} />
}
export const TimeField = ({ type: _type, errorKey, ...rest }) => {
  return <FieldBase {...rest} type="time" errorKey={errorKey} />
}
export const NumberField = ({ type: _type, errorKey, ...rest }) => {
  return <FieldBase {...rest} type="number" errorKey={errorKey} />
}
export const RangeField = ({
  type: _type,
  label,
  errorKey,
  name,
  value,
  defaultValue,
  min,
  max,
  ...rest
}) => {
  const numValue = value ? Number(value) : undefined
  const numDefault = defaultValue ? Number(defaultValue) : undefined
  const numMin = min ? Number(min) : 0
  const numMax = max ? Number(max) : 100
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Slider
        name={name}
        value={numValue !== undefined ? [numValue] : undefined}
        defaultValue={numDefault !== undefined ? [numDefault] : [numMin]}
        min={numMin}
        max={numMax}
        {...rest}
      />
      <FieldError errorKey={errorKey} />
    </div>
  )
}
export const PasswordField = ({ type: _type, errorKey, ...rest }) => {
  return <FieldBase {...rest} type="password" errorKey={errorKey} />
}
export const Select = ({
  includeHidden,
  name,
  options,
  errorKey,
  type: _type,
  ...rest
}) => {
  if ('multiple' in rest && rest.multiple) {
    const { multiple, label, id, defaultvalue, value, ...nativeRest } = rest
    const addHidden = includeHidden && multiple
    const optionElements = options.map((item) => {
      if ('options' in item) {
        return (
          <optgroup label={item.label} key={item.label}>
            {item.options.map((opt) => (
              <option key={opt.label} {...opt} />
            ))}
          </optgroup>
        )
      } else {
        return <option key={item.label} {...item} />
      }
    })
    return (
      <div className="grid gap-2">
        {addHidden && (
          <input type="hidden" name={name} value={''} autoComplete="off" />
        )}
        <Label htmlFor={id}>{label}</Label>
        <select
          name={name}
          id={id}
          multiple={multiple}
          defaultValue={defaultvalue}
          value={value}
          {...nativeRest}
        >
          {optionElements}
        </select>
        <FieldError errorKey={errorKey} />
      </div>
    )
  }
  const { label, id, defaultvalue, value, ...selectRest } = rest
  const hasGroups = options.some((item) => 'options' in item)
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <ShadcnSelect
        name={name}
        defaultValue={defaultvalue}
        value={value}
        {...selectRest}
      >
        <SelectTrigger id={id}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {hasGroups
            ? options.map((item) => {
                if ('options' in item) {
                  return (
                    <SelectGroup key={item.label}>
                      <SelectLabel>{item.label}</SelectLabel>
                      {item.options.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          disabled={opt.disabled}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )
                }
                return (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </SelectItem>
                )
              })
            : options.map((item) => {
                if ('options' in item) return null
                return (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </SelectItem>
                )
              })}
        </SelectContent>
      </ShadcnSelect>
      <FieldError errorKey={errorKey} />
    </div>
  )
}
export const TextArea = ({ type: _type, label, errorKey, ...rest }) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={rest.id}>{label}</Label>
      <Textarea {...rest} />
      <FieldError errorKey={errorKey} />
    </div>
  )
}
export const FileField = ({ type: _type, errorKey, ...rest }) => {
  return <FieldBase {...rest} type="file" errorKey={errorKey} />
}
export const SubmitButton = ({ type: _type, text, ...rest }) => {
  return (
    <Button {...rest} type="submit">
      {text}
    </Button>
  )
}
