import React, { createContext, useContext, useMemo } from 'react';
import { Input as ChakraInput, Textarea as ChakraTextarea, FileUpload as ChakraFileUpload, ColorPicker as ChakraColorPicker, Checkbox as ChakraCheckbox, CheckboxGroup as ChakraCheckboxGroup, RadioGroup as ChakraRadioGroup, Select as ChakraSelect, Fieldset as ChakraFieldset, NumberInput as ChakraNumberInput, Slider as ChakraSlider, Field as ChakraField, Button as ChakraButton, Portal, createListCollection, parseColor, } from '@chakra-ui/react';
import { PasswordInput as ChakraPasswordInput } from './components/ui/password-input';
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
    const { name } = collection[0];
    const defaultItems = collection.filter((option) => !!option.defaultChecked);
    const checkedItems = collection.filter((option) => !!option.checked);
    const valueProps = {};
    if (defaultItems.length > 0) {
        valueProps.defaultValue = defaultItems.map((option) => option.value);
    }
    else if (checkedItems.length > 0) {
        valueProps.value = checkedItems.map((option) => option.value);
    }
    return (<ChakraFieldset.Root invalid={!!errorMessage}>
      {includeHidden && (<input type="hidden" name={name} defaultValue={''} autoComplete="off"/>)}
      <ChakraCheckboxGroup name={name} {...valueProps}>
        <ChakraFieldset.Legend fontSize="sm" mb="2">
          {label}
        </ChakraFieldset.Legend>
        <ChakraFieldset.Content>
          {collection.map((option) => (<ChakraCheckbox.Root key={option.id} value={option.value}>
              <ChakraCheckbox.HiddenInput />
              <ChakraCheckbox.Control>
                <ChakraCheckbox.Indicator />
              </ChakraCheckbox.Control>
              <ChakraCheckbox.Label>{option.label}</ChakraCheckbox.Label>
            </ChakraCheckbox.Root>))}
        </ChakraFieldset.Content>
      </ChakraCheckboxGroup>
      {errorMessage && (<ChakraFieldset.ErrorText>{errorMessage}</ChakraFieldset.ErrorText>)}
    </ChakraFieldset.Root>);
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
    return (<ChakraFieldset.Root invalid={!!errorMessage}>
      {includeHidden && (<input type="hidden" name={name} defaultValue={''} autoComplete="off"/>)}
      <ChakraRadioGroup.Root name={name} {...valueProps}>
        <ChakraFieldset.Legend fontSize="sm" mb="2">
          {label}
        </ChakraFieldset.Legend>
        <ChakraFieldset.Content>
          {radioButtons}
        </ChakraFieldset.Content>
      </ChakraRadioGroup.Root>
      {errorMessage && (<ChakraFieldset.ErrorText>{errorMessage}</ChakraFieldset.ErrorText>)}
    </ChakraFieldset.Root>);
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
export const ColorField = ({ type: _type, label, errorKey, value, defaultValue, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    const colorValue = parseColor(value || defaultValue || '#000000');
    return (<ChakraField.Root invalid={!!errorMessage}>
      <ChakraColorPicker.Root {...rest} defaultValue={colorValue}>
        <ChakraColorPicker.HiddenInput name={rest.name}/>
        <ChakraColorPicker.Label>{label}</ChakraColorPicker.Label>
        <ChakraColorPicker.Control>
          <ChakraColorPicker.Input />
          <ChakraColorPicker.Trigger />
        </ChakraColorPicker.Control>
        <ChakraColorPicker.Positioner>
          <ChakraColorPicker.Content>
            <ChakraColorPicker.Area />
            <ChakraColorPicker.EyeDropper />
            <ChakraColorPicker.Sliders />
          </ChakraColorPicker.Content>
        </ChakraColorPicker.Positioner>
      </ChakraColorPicker.Root>
      {errorMessage && (<ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>)}
    </ChakraField.Root>);
};
export const DateField = ({ type: _type, label, errorKey, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="date" {...rest}/>
    </ChakraFieldWrapper>);
};
export const DateTimeLocalField = ({ type: _type, label, errorKey, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraInput type="datetime-local" {...rest}/>
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
export const TimeField = ({ type: _type, label, errorKey, ...rest }) => {
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
export const RangeField = ({ type: _type, label, errorKey, defaultValue, value, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    const nextDefaultValue = defaultValue ? [Number(defaultValue)] : undefined;
    const nextValue = value ? [Number(value)] : undefined;
    return (<ChakraField.Root invalid={!!errorMessage}>
      <ChakraSlider.Root width="200px" defaultValue={nextDefaultValue} value={nextValue} {...rest}>
        <ChakraSlider.Label>{label}</ChakraSlider.Label>
        <ChakraSlider.Control>
          <ChakraSlider.Track>
            <ChakraSlider.Range />
          </ChakraSlider.Track>
          <ChakraSlider.Thumbs />
        </ChakraSlider.Control>
      </ChakraSlider.Root>
      {errorMessage && (<ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>)}
    </ChakraField.Root>);
};
export const PasswordField = ({ type: _type, label, errorKey, size: _size, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraPasswordInput {...rest}/>
    </ChakraFieldWrapper>);
};
export const Select = ({ includeHidden, name, id, options, label, errorKey, multiple, type: _type, defaultValue, value, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    const addHidden = includeHidden && multiple;
    const nextOptions = options.slice();
    const firstOption = nextOptions[0];
    let placeholder = 'Select...';
    if (firstOption && !('options' in firstOption) && firstOption.value === '') {
        placeholder = firstOption.label;
        nextOptions.shift();
    }
    const flatItems = nextOptions.flatMap((item) => {
        if ('options' in item) {
            return item.options;
        }
        return [item];
    });
    const collection = createListCollection({ items: flatItems });
    const defaultValueArray = defaultValue
        ? Array.isArray(defaultValue)
            ? defaultValue
            : [defaultValue]
        : undefined;
    const valueArray = value
        ? Array.isArray(value)
            ? value
            : [value]
        : undefined;
    return (<ChakraField.Root invalid={!!errorMessage}>
      {addHidden && (<input type="hidden" name={name} value={''} autoComplete="off"/>)}
      <ChakraSelect.Root {...rest} name={name} collection={collection} multiple={multiple} defaultValue={defaultValueArray} value={valueArray}>
        <ChakraSelect.HiddenSelect />
        <ChakraSelect.Label>{label}</ChakraSelect.Label>
        <ChakraSelect.Control>
          <ChakraSelect.Trigger>
            <ChakraSelect.ValueText placeholder={placeholder}/>
          </ChakraSelect.Trigger>
          <ChakraSelect.IndicatorGroup>
            <ChakraSelect.Indicator />
          </ChakraSelect.IndicatorGroup>
        </ChakraSelect.Control>
        <Portal>
          <ChakraSelect.Positioner>
            <ChakraSelect.Content>
              {nextOptions.map((item) => {
            if ('options' in item) {
                return (<ChakraSelect.ItemGroup key={item.label}>
                      <ChakraSelect.ItemGroupLabel>
                        {item.label}
                      </ChakraSelect.ItemGroupLabel>
                      {item.options.map((opt) => (<ChakraSelect.Item item={opt} key={opt.value}>
                          {opt.label}
                          <ChakraSelect.ItemIndicator />
                        </ChakraSelect.Item>))}
                    </ChakraSelect.ItemGroup>);
            }
            return (<ChakraSelect.Item item={item} key={item.value}>
                    {item.label}
                    <ChakraSelect.ItemIndicator />
                  </ChakraSelect.Item>);
        })}
            </ChakraSelect.Content>
          </ChakraSelect.Positioner>
        </Portal>
      </ChakraSelect.Root>
      {errorMessage && (<ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>)}
    </ChakraField.Root>);
};
export const TextArea = ({ type: _type, label, errorKey, ...rest }) => {
    return (<ChakraFieldWrapper label={label} errorKey={errorKey} id={rest.id}>
      <ChakraTextarea {...rest}/>
    </ChakraFieldWrapper>);
};
export const FileField = ({ type: _type, label, errorKey, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<ChakraField.Root invalid={!!errorMessage}>
      <ChakraFileUpload.Root>
        <ChakraFileUpload.HiddenInput name={rest.name}/>
        <ChakraFileUpload.Label>{label}</ChakraFileUpload.Label>
        <ChakraFileUpload.Trigger>
          <ChakraButton variant="outline">Choose file</ChakraButton>
        </ChakraFileUpload.Trigger>
        <ChakraFileUpload.ItemGroup>
          <ChakraFileUpload.Context>
            {({ acceptedFiles }) => acceptedFiles.map((file) => (<ChakraFileUpload.Item key={file.name} file={file}>
                  <ChakraFileUpload.ItemName />
                  <ChakraFileUpload.ItemSizeText />
                  <ChakraFileUpload.ItemDeleteTrigger />
                </ChakraFileUpload.Item>))}
          </ChakraFileUpload.Context>
        </ChakraFileUpload.ItemGroup>
      </ChakraFileUpload.Root>
      {errorMessage && (<ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>)}
    </ChakraField.Root>);
};
export const SubmitButton = ({ type: _type, text, ...rest }) => {
    return (<ChakraButton {...rest} type="submit">
      {text}
    </ChakraButton>);
};
