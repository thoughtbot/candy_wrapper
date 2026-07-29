import React, { createContext, useContext, useMemo } from 'react';
import { Input as ChakraInput, Textarea as ChakraTextarea, Checkbox as ChakraCheckbox, RadioGroup as ChakraRadioGroup, NativeSelect as ChakraNativeSelect, NumberInput as ChakraNumberInput, Slider as ChakraSlider, Field as ChakraField, Button as ChakraButton, } from '@chakra-ui/react';
export const ValidationContext = createContext({});
export const useErrorMessage = (errorKey) => {
    const errors = useContext(ValidationContext);
    return useMemo(() => {
        if (!errorKey) {
            return null;
        }
        const validationError = errors[errorKey];
        const hasErrors = errorKey && validationError;
        if (!hasErrors) {
            return null;
        }
        const errorMessages = Array.isArray(validationError)
            ? validationError
            : [validationError];
        return errorMessages.join(' ');
    }, [errors, errorKey]);
};
export const Extras = (hiddenInputAttributes) => {
    const hiddenProps = Object.values(hiddenInputAttributes);
    const hiddenInputs = hiddenProps.map((props) => (<input {...props} type="hidden" key={props.name}/>));
    return <>{hiddenInputs}</>;
};
export const Form = ({ extras, validationErrors = {}, children, ...props }) => {
    return (<form {...props}>
      <ValidationContext.Provider value={validationErrors}>
        <Extras {...extras}></Extras>
        {children}
      </ValidationContext.Provider>
    </form>);
};
const ChakraFieldWrapper = ({ label, errorKey, id, children, }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<ChakraField.Root invalid={!!errorMessage} id={id}>
      <ChakraField.Label>{label}</ChakraField.Label>
      {children}
      {errorMessage && (<ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>)}
    </ChakraField.Root>);
};
export const Checkbox = ({ type: _type, includeHidden, uncheckedValue, errorKey, label, ...rest }) => {
    const { name } = rest;
    const errorMessage = useErrorMessage(errorKey);
    return (<ChakraField.Root invalid={!!errorMessage}>
      {includeHidden && (<input type="hidden" name={name} defaultValue={uncheckedValue} autoComplete="off"/>)}
      <ChakraCheckbox.Root {...rest}>
        <ChakraCheckbox.HiddenInput />
        <ChakraCheckbox.Control>
          <ChakraCheckbox.Indicator />
        </ChakraCheckbox.Control>
        <ChakraCheckbox.Label>{label}</ChakraCheckbox.Label>
      </ChakraCheckbox.Root>
      {errorMessage && (<ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>)}
    </ChakraField.Root>);
};
export const CollectionCheckboxes = ({ includeHidden, collection, label, errorKey, }) => {
    const errorMessage = useErrorMessage(errorKey);
    if (collection.length === 0) {
        return null;
    }
    const checkboxes = collection.map((options) => {
        const { label: itemLabel, checked: _checked, defaultChecked: _defaultChecked, type: _type, includeHidden: _includeHidden, uncheckedValue: _uncheckedValue, ...rest } = options;
        return (<ChakraCheckbox.Root key={rest.id} {...rest}>
        <ChakraCheckbox.HiddenInput />
        <ChakraCheckbox.Control>
          <ChakraCheckbox.Indicator />
        </ChakraCheckbox.Control>
        <ChakraCheckbox.Label>{itemLabel}</ChakraCheckbox.Label>
      </ChakraCheckbox.Root>);
    });
    const { name } = collection[0];
    return (<ChakraField.Root invalid={!!errorMessage}>
      {includeHidden && (<input type="hidden" name={name} defaultValue={''} autoComplete="off"/>)}
      <ChakraField.Label>{label}</ChakraField.Label>
      {checkboxes}
      {errorMessage && (<ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>)}
    </ChakraField.Root>);
};
export const CollectionRadioButtons = ({ includeHidden, collection, label, errorKey, }) => {
    const errorMessage = useErrorMessage(errorKey);
    if (collection.length === 0) {
        return null;
    }
    const defaultItem = collection.find((option) => !!option.defaultChecked);
    const item = collection.find((option) => !!option.checked);
    const valueProps = {};
    if (defaultItem) {
        valueProps.defaultValue = defaultItem.value;
    }
    else if (item) {
        valueProps.value = item.value;
    }
    const radioButtons = collection.map((options) => {
        const { checked: _checked, defaultChecked: _defaultChecked, type: _type, label: itemLabel, ...rest } = options;
        return (<ChakraRadioGroup.Item key={rest.value} value={rest.value}>
        <ChakraRadioGroup.ItemHiddenInput name={rest.name}/>
        <ChakraRadioGroup.ItemIndicator />
        <ChakraRadioGroup.ItemText>{itemLabel}</ChakraRadioGroup.ItemText>
      </ChakraRadioGroup.Item>);
    });
    const { name } = collection[0];
    return (<ChakraField.Root invalid={!!errorMessage}>
      {includeHidden && (<input type="hidden" name={name} defaultValue={''} autoComplete="off"/>)}
      <ChakraRadioGroup.Root name={name} {...valueProps}>
        <ChakraField.Label>{label}</ChakraField.Label>
        {radioButtons}
      </ChakraRadioGroup.Root>
      {errorMessage && (<ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>)}
    </ChakraField.Root>);
};
export const TextField = ({ type: _type, label, errorKey, size: _size, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="text" {...rest}/>
    </ChakraFieldWrapper>);
};
export const EmailField = ({ type: _type, label, errorKey, size: _size, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="email" {...rest}/>
    </ChakraFieldWrapper>);
};
export const ColorField = ({ type: _type, label, errorKey, size: _size, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="color" {...rest}/>
    </ChakraFieldWrapper>);
};
export const DateField = ({ type: _type, label, errorKey, size: _size, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="date" {...rest}/>
    </ChakraFieldWrapper>);
};
export const DateTimeLocalField = ({ type: _type, label, errorKey, ...rest }) => {
    const { size: _size, ...inputProps } = rest;
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="datetime-local" {...inputProps}/>
    </ChakraFieldWrapper>);
};
export const SearchField = ({ type: _type, label, errorKey, size: _size, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="search" {...rest}/>
    </ChakraFieldWrapper>);
};
export const TelField = ({ type: _type, label, errorKey, size: _size, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="tel" {...rest}/>
    </ChakraFieldWrapper>);
};
export const UrlField = ({ type: _type, label, errorKey, size: _size, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="url" {...rest}/>
    </ChakraFieldWrapper>);
};
export const MonthField = ({ type: _type, label, errorKey, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="month" {...rest}/>
    </ChakraFieldWrapper>);
};
export const TimeField = ({ type: _type, label, errorKey, size: _size, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="time" {...rest}/>
    </ChakraFieldWrapper>);
};
export const NumberField = ({ type: _type, label, errorKey, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraNumberInput.Root name={rest.name} min={rest.min} max={rest.max} defaultValue={rest.defaultValue} value={rest.value}>
        <ChakraNumberInput.Input />
        <ChakraNumberInput.Control>
          <ChakraNumberInput.IncrementTrigger />
          <ChakraNumberInput.DecrementTrigger />
        </ChakraNumberInput.Control>
      </ChakraNumberInput.Root>
    </ChakraFieldWrapper>);
};
export const RangeField = ({ type: _type, label, errorKey, ...rest }) => {
    const defaultValue = rest.defaultValue ? [Number(rest.defaultValue)] : undefined;
    const value = rest.value ? [Number(rest.value)] : undefined;
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraSlider.Root name={rest.name} defaultValue={defaultValue} value={value}>
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
    </ChakraFieldWrapper>);
};
export const PasswordField = ({ type: _type, label, errorKey, size: _size, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="password" {...rest}/>
    </ChakraFieldWrapper>);
};
export const Select = ({ includeHidden, name, id, options, label, errorKey, multiple, type: _type, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    const addHidden = includeHidden && multiple;
    const optionElements = options.map((item) => {
        if ('options' in item) {
            return (<optgroup label={item.label} key={item.label}>
          {item.options.map((opt) => (<option key={opt.label} {...opt}/>))}
        </optgroup>);
        }
        else {
            return <option key={item.label} {...item}/>;
        }
    });
    return (<ChakraField.Root invalid={!!errorMessage}>
      {addHidden && (<input type="hidden" name={name} value={''} autoComplete="off"/>)}
      <ChakraField.Label>{label}</ChakraField.Label>
      <ChakraNativeSelect.Root>
        <ChakraNativeSelect.Field name={name} id={id} multiple={multiple} {...rest}>
          {optionElements}
        </ChakraNativeSelect.Field>
        <ChakraNativeSelect.Indicator />
      </ChakraNativeSelect.Root>
      {errorMessage && (<ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>)}
    </ChakraField.Root>);
};
export const TextArea = ({ type: _type, label, errorKey, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraTextarea {...rest}/>
    </ChakraFieldWrapper>);
};
export const FileField = ({ type: _type, label, errorKey, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="file" {...rest}/>
    </ChakraFieldWrapper>);
};
export const SubmitButton = ({ type: _type, text, ...rest }) => {
    return (<ChakraButton {...rest} type="submit">
      {text}
    </ChakraButton>);
};
