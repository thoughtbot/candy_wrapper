/**
 * Vanilla is a minimum set of
 * [candy_wrappers](https://github.com/thoughtbot/candy_wrapper) around react
 * HTML tags.  It works with the output from
 * [FormProps](https://github.com/thoughtbot/form_props).
 *
 * There is no style and structured with bare necessities. You should modify
 * these components to fit your design needs.
 */
import React, { useContext, createContext, useMemo } from 'react'
export const ValidationContext = createContext({})
export const useErrorKeyValidation = ({ errorKey }) => {
  const errors = useContext(ValidationContext)
  return useMemo(() => {
    return errors[errorKey]
  }, [errors, errorKey])
}
/**
 * Extras renders the hidden inputs generated by form_props.
 *
 * Its meant to be used with a form component and renders hidden values for
 * utf8, crsf_token, _method
 */
export const Extras = (hiddenInputAttributes) => {
  const hiddenProps = Object.values(hiddenInputAttributes)
  const hiddenInputs = hiddenProps.map((props) => (
    <input {...props} type="hidden" key={props.name} />
  ))
  return <>{hiddenInputs}</>
}
/**
 * A basic form component that supports inline errors.
 *
 * It's meant to be used with FormProps and mimics the ways that
 * Rails forms are generated.
 */
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
/**
 * An inline error component.
 *
 * When a Field has an error, this will show below the label and input.
 * Please modify this to your liking.
 */
export const FieldError = ({ errorKey }) => {
  const errors = useContext(ValidationContext)
  if (!errorKey || !errors) {
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
  return <span>{errorMessages.join(' ')}</span>
}
/**
 * A Field component.
 *
 * Combines a label, input and a FieldError. Please modify this to your liking.
 */
export const FieldBase = ({ label, errorKey, children, ...props }) => {
  return (
    <>
      <label htmlFor={props.id}>{label}</label>
      {children || <input {...props} />}
      <FieldError errorKey={errorKey} />
    </>
  )
}
export const Checkbox = ({
  type: _type,
  includeHidden,
  uncheckedValue,
  errorKey,
  ...rest
}) => {
  const { name } = rest
  return (
    <FieldBase {...rest} errorKey={errorKey}>
      {includeHidden && (
        <input
          type="hidden"
          name={name}
          defaultValue={uncheckedValue}
          autoComplete="off"
        />
      )}
      <input type="checkbox" {...rest}></input>
    </FieldBase>
  )
}
/**
 * A collection checkbox component.
 *
 * Designed to work with a payload form_props's [collection_check_boxes helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#collection-select).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const CollectionCheckboxes = ({
  includeHidden,
  collection,
  label,
  errorKey,
}) => {
  if (collection.length == 0) {
    return null
  }
  const checkboxes = collection.map((options) => {
    return <Checkbox {...options} key={options.id} />
  })
  const { name } = collection[0]
  return (
    <>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <label>{label}</label>
      {checkboxes}
      <FieldError errorKey={errorKey} />
    </>
  )
}
/**
 * A collection radio button component.
 *
 * Designed to work with a payload form_props's [collection_radio_buttons helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#collection-select).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const CollectionRadioButtons = ({
  includeHidden,
  collection,
  label,
  errorKey,
}) => {
  if (collection.length == 0) {
    return null
  }
  const radioButtons = collection.map((options) => {
    return (
      <div key={options.value}>
        <input {...options} type="radio" />
        <label htmlFor={options.id}>{options.label}</label>
      </div>
    )
  })
  const { name } = collection[0]
  return (
    <>
      {includeHidden && (
        <input type="hidden" name={name} defaultValue={''} autoComplete="off" />
      )}
      <label>{label}</label>
      {radioButtons}
      <FieldError errorKey={errorKey} />
    </>
  )
}
/**
 * A text field component.
 *
 * Designed to work with a payload form_props's [text_field helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#text-helpers).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const TextField = ({ type: _type, ...rest }) => {
  return <FieldBase {...rest} type="text" />
}
/**
 * A email field component.
 *
 * Designed to work with a payload form_props's [email_field helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#text-helpers).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const EmailField = ({ type: _type, ...rest }) => {
  return <FieldBase {...rest} type="email" />
}
/**
 * A color field component.
 *
 * Designed to work with a payload form_props's [color_field helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#text-helpers).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const ColorField = ({ type: _type, ...rest }) => {
  return <FieldBase {...rest} type="color" />
}
/**
 * A date field component.
 *
 * Designed to work with a payload form_props's [date_field helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#date-helpers).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const DateField = ({ type: _type, ...rest }) => {
  return <FieldBase {...rest} type="date" />
}
/**
 * A date field component.
 *
 * Designed to work with a payload form_props's [date_field helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#date-helpers).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const DateTimeLocalField = ({ type: _type, ...rest }) => {
  return <FieldBase {...rest} type="datetime-local" />
}
/**
 * A search field component.
 *
 * Designed to work with a payload form_props's [search_field helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#text-helpers).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const SearchField = ({ type: _type, ...rest }) => {
  return <FieldBase {...rest} type="search" />
}
/**
 * A tel field component.
 *
 * Designed to work with a payload form_props's [tel_field helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#text-helpers).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const TelField = ({ type: _type, ...rest }) => {
  return <FieldBase {...rest} type="tel" />
}
/**
 * A url field component.
 *
 * Designed to work with a payload form_props's [tel_field helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#text-helpers).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const UrlField = ({ type: _type, ...rest }) => {
  return <FieldBase {...rest} type="url" />
}
/**
 * A month field component.
 *
 * Designed to work with a payload form_props's [month_field helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#date-helpers).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const MonthField = ({ type: _type, ...rest }) => {
  return <FieldBase {...rest} type="month" />
}
/**
 * A month field component.
 *
 * Designed to work with a payload form_props's [month_field helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#date-helpers).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const TimeField = ({ type: _type, ...rest }) => {
  return <FieldBase {...rest} type="time" />
}
/**
 * A number field component.
 *
 * Designed to work with a payload form_props's [month_field helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#number-helpers).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const NumberField = ({ type: _type, ...rest }) => {
  return <FieldBase {...rest} type="number" />
}
/**
 * A range field component.
 *
 * Designed to work with a payload form_props's [range_field helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#number-helpers).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const RangeField = ({ type: _type, ...rest }) => {
  return <FieldBase {...rest} type="range" />
}
/**
 * A password field component.
 *
 * Designed to work with a payload form_props's [password_field helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#text-helpers).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const PasswordField = ({ type: _type, ...rest }) => {
  return <FieldBase {...rest} type="password" />
}
/**
 * A select component.
 *
 * Designed to work with a payload form_props's [select helpers](https://github.com/thoughtbot/form_props?tab=readme-ov-file#select-helpers),
 * [collection_select helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#collection-select), and [grouped_collection_select helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#group-collection-select).
 *
 * Please modify to your liking.
 */
export const Select = ({
  includeHidden,
  name,
  id,
  children,
  options,
  multiple,
  type: _type,
  ...rest
}) => {
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
    <>
      {addHidden && (
        <input type="hidden" name={name} value={''} autoComplete="off" />
      )}
      <select name={name} id={id} multiple={multiple} {...rest}>
        {children}
        {optionElements}
      </select>
    </>
  )
}
/**
 * A text area component.
 *
 * Designed to work with a payload form_props's text_area helper.
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const TextArea = ({ type: _type, errorKey, ...rest }) => {
  const { label } = rest
  return (
    <FieldBase label={label} errorKey={errorKey} id={rest.id}>
      <textarea {...rest} />
    </FieldBase>
  )
}
/**
 * A file field component.
 *
 * Designed to work with a payload form_props's [file_field helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#text-helpers).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const FileField = ({ type: _type, ...rest }) => {
  return <FieldBase {...rest} type="file" />
}
/**
 * A SubmitButton component.
 *
 * Designed to work with a payload form_props's [submit helper](https://github.com/thoughtbot/form_props?tab=readme-ov-file#form-helpers).
 * Mimics the rails equivalent. Please modify to your liking.
 */
export const SubmitButton = ({ type: _type, text, ...rest }) => {
  return (
    <button {...rest} type="submit">
      {' '}
      {text}{' '}
    </button>
  )
}
