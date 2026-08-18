/**
 * A set of [candy_wrappers](https://github.com/thoughtbot/candy_wrapper) around
 * React Spectrum S2 input components. It works with the output from
 * [FormProps](https://github.com/thoughtbot/form_props).
 *
 * You modify these components to fit your design needs.
 */
import React, { createContext, useContext, useMemo } from 'react';
import { parseDate, parseDateTime, parseTime, } from '@internationalized/date';
import { TextField as SpectrumTextField } from '@react-spectrum/s2/TextField';
import { TextArea as SpectrumTextArea } from '@react-spectrum/s2/TextArea';
import { NumberField as SpectrumNumberField } from '@react-spectrum/s2/NumberField';
import { DateField as SpectrumDateField } from '@react-spectrum/s2/DateField';
import { TimeField as SpectrumTimeField } from '@react-spectrum/s2/TimeField';
import { DatePicker as SpectrumDatePicker } from '@react-spectrum/s2/DatePicker';
import { ColorField as SpectrumColorField } from '@react-spectrum/s2/ColorField';
import { SearchField as SpectrumSearchField } from '@react-spectrum/s2/SearchField';
import { Checkbox as SpectrumCheckbox, } from '@react-spectrum/s2/Checkbox';
import { CheckboxGroup as SpectrumCheckboxGroup, } from '@react-spectrum/s2/CheckboxGroup';
import { RadioGroup as SpectrumRadioGroup, Radio as SpectrumRadio, } from '@react-spectrum/s2/RadioGroup';
import { Picker as SpectrumPicker, PickerItem, PickerSection, } from '@react-spectrum/s2/Picker';
import { Slider as SpectrumSlider } from '@react-spectrum/s2/Slider';
import { Button as SpectrumButton } from '@react-spectrum/s2/Button';
import { Form as SpectrumForm } from '@react-spectrum/s2/Form';
import { FileTrigger as SpectrumFileTrigger } from '@react-spectrum/s2/FileTrigger';
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
    const formProps = props;
    return (<SpectrumForm {...formProps}>
      <ValidationContext.Provider value={validationErrors}>
        <Extras {...extras}></Extras>
        {children}
      </ValidationContext.Provider>
    </SpectrumForm>);
};
export const Checkbox = ({ type: _type, includeHidden, uncheckedValue, errorKey, label, checked, defaultChecked, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    // Transform: Rails checked/defaultChecked → Spectrum isSelected/defaultSelected
    const isSelected = checked ?? undefined;
    const defaultSelected = defaultChecked ?? undefined;
    return (<>
      {includeHidden && (<input type="hidden" name={rest.name} defaultValue={uncheckedValue} autoComplete="off"/>)}
      <SpectrumCheckbox {...rest} isSelected={isSelected} defaultSelected={defaultSelected} isInvalid={!!errorMessage}>
        {label}
      </SpectrumCheckbox>
    </>);
};
export const CollectionCheckboxes = ({ includeHidden, collection, label, errorKey, }) => {
    const errorMessage = useErrorMessage(errorKey);
    if (collection.length === 0) {
        return null;
    }
    const defaultItems = collection.filter((option) => !!option.defaultChecked);
    const items = collection.filter((option) => !!option.checked);
    const valueProps = {};
    if (defaultItems.length > 0) {
        valueProps.defaultValue = defaultItems.map((option) => option.value);
    }
    else if (items.length > 0) {
        valueProps.value = items.map((option) => option.value);
    }
    const { name } = collection[0];
    return (<>
      {includeHidden && (<input type="hidden" name={name} defaultValue={''} autoComplete="off"/>)}
      <SpectrumCheckboxGroup label={label} {...valueProps} isInvalid={!!errorMessage} errorMessage={errorMessage}>
        {collection.map((option) => (<SpectrumCheckbox key={option.id} name={name} value={option.value}>
            {option.label}
          </SpectrumCheckbox>))}
      </SpectrumCheckboxGroup>
    </>);
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
    const { name } = collection[0];
    return (<>
      {includeHidden && (<input type="hidden" name={name} defaultValue={''} autoComplete="off"/>)}
      <SpectrumRadioGroup label={label} name={name} {...valueProps} isInvalid={!!errorMessage} errorMessage={errorMessage}>
        {collection.map((option) => (<SpectrumRadio key={option.value} value={option.value}>
            {option.label}
          </SpectrumRadio>))}
      </SpectrumRadioGroup>
    </>);
};
export const TextField = ({ type: _type, label, errorKey, size: _size, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<SpectrumTextField {...rest} label={label} isInvalid={!!errorMessage} errorMessage={errorMessage}/>);
};
export const EmailField = ({ type: _type, label, errorKey, size: _size, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<SpectrumTextField {...rest} label={label} type="email" isInvalid={!!errorMessage} errorMessage={errorMessage}/>);
};
export const ColorField = ({ type: _type, label, errorKey, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<SpectrumColorField {...rest} label={label} isInvalid={!!errorMessage} errorMessage={errorMessage}/>);
};
export const DateField = ({ type: _type, label, errorKey, value, defaultValue, min, max, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    // Transform: string values → CalendarDate objects
    const valueProps = {};
    if (value) {
        valueProps.value = parseDate(value);
    }
    else if (defaultValue) {
        valueProps.defaultValue = parseDate(defaultValue);
    }
    // Transform: min/max → minValue/maxValue
    const minMaxProps = {};
    if (min) {
        minMaxProps.minValue = parseDate(min);
    }
    if (max) {
        minMaxProps.maxValue = parseDate(max);
    }
    return (<SpectrumDateField {...rest} label={label} {...valueProps} {...minMaxProps} isInvalid={!!errorMessage} errorMessage={errorMessage}/>);
};
export const DateTimeLocalField = ({ type: _type, label, errorKey, value, defaultValue, min, max, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    // Transform: string values → CalendarDateTime objects
    const valueProps = {};
    if (value) {
        valueProps.value = parseDateTime(value);
    }
    else if (defaultValue) {
        valueProps.defaultValue = parseDateTime(defaultValue);
    }
    // Transform: min/max → minValue/maxValue
    const minMaxProps = {};
    if (min) {
        minMaxProps.minValue = parseDateTime(min);
    }
    if (max) {
        minMaxProps.maxValue = parseDateTime(max);
    }
    return (<SpectrumDatePicker {...rest} label={label} granularity="second" {...valueProps} {...minMaxProps} isInvalid={!!errorMessage} errorMessage={errorMessage}/>);
};
export const TimeField = ({ type: _type, label, errorKey, value, defaultValue, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    // Transform: string values → Time objects
    const valueProps = {};
    if (value) {
        valueProps.value = parseTime(value);
    }
    else if (defaultValue) {
        valueProps.defaultValue = parseTime(defaultValue);
    }
    return (<SpectrumTimeField {...rest} label={label} {...valueProps} isInvalid={!!errorMessage} errorMessage={errorMessage}/>);
};
export const SearchField = ({ type: _type, label, errorKey, size: _size, autosave: _autosave, results: _results, onsearch: _onsearch, incremental: _incremental, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<SpectrumSearchField {...rest} label={label} isInvalid={!!errorMessage} errorMessage={errorMessage}/>);
};
export const TelField = ({ type: _type, label, errorKey, size: _size, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<SpectrumTextField {...rest} label={label} type="tel" isInvalid={!!errorMessage} errorMessage={errorMessage}/>);
};
export const UrlField = ({ type: _type, label, errorKey, size: _size, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<SpectrumTextField {...rest} label={label} type="url" isInvalid={!!errorMessage} errorMessage={errorMessage}/>);
};
export const MonthField = ({ type: _type, label, errorKey, min: _min, max: _max, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<SpectrumTextField {...rest} label={label} type="month" isInvalid={!!errorMessage} errorMessage={errorMessage}/>);
};
export const NumberField = ({ type: _type, label, errorKey, value, defaultValue, min, max, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    // Transform: string/number values → number
    const valueProps = {};
    if (value !== undefined && value !== '') {
        valueProps.value = Number(value);
    }
    else if (defaultValue !== undefined && defaultValue !== '') {
        valueProps.defaultValue = Number(defaultValue);
    }
    return (<SpectrumNumberField {...rest} label={label} {...valueProps} minValue={min} maxValue={max} isInvalid={!!errorMessage} errorMessage={errorMessage}/>);
};
export const RangeField = ({ type: _type, label, errorKey, value, defaultValue, min, max, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    const numericValue = value ? Number(value) : undefined;
    const numericDefault = defaultValue ? Number(defaultValue) : undefined;
    return (<>
      <SpectrumSlider label={label} defaultValue={numericDefault} value={numericValue} minValue={min} maxValue={max}/>
      <input type="hidden" name={rest.name} value={numericValue ?? numericDefault ?? ''}/>
      {errorMessage && <span>{errorMessage}</span>}
    </>);
};
export const PasswordField = ({ type: _type, label, errorKey, size: _size, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<SpectrumTextField {...rest} label={label} type="password" isInvalid={!!errorMessage} errorMessage={errorMessage}/>);
};
export const Select = ({ includeHidden, name, id, options, label, errorKey, multiple, type: _type, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    const addHidden = includeHidden && multiple;
    const selectedValue = 'value' in rest ? rest.value : undefined;
    const selectedDefault = 'defaultValue' in rest ? rest.defaultValue : undefined;
    const hasGroups = options.some((item) => 'options' in item);
    const selectionProps = {};
    if (multiple) {
        selectionProps.selectionMode = 'multiple';
        if (selectedValue) {
            selectionProps.value = Array.isArray(selectedValue)
                ? selectedValue
                : [selectedValue];
        }
        else if (selectedDefault) {
            selectionProps.defaultValue = Array.isArray(selectedDefault)
                ? selectedDefault
                : [selectedDefault];
        }
    }
    else {
        if (selectedValue) {
            selectionProps.value = Array.isArray(selectedValue)
                ? selectedValue[0]
                : selectedValue;
        }
        else if (selectedDefault) {
            selectionProps.defaultValue = Array.isArray(selectedDefault)
                ? selectedDefault[0]
                : selectedDefault;
        }
    }
    return (<>
      {addHidden && (<input type="hidden" name={name} value={''} autoComplete="off"/>)}
      <SpectrumPicker label={label} name={name} id={id} {...selectionProps} isInvalid={!!errorMessage} errorMessage={errorMessage}>
        {hasGroups
            ? options.map((item) => {
                if ('options' in item) {
                    return (<PickerSection key={item.label} id={item.label}>
                    {item.options.map((opt) => (<PickerItem key={opt.value} id={opt.value} textValue={opt.label}>
                        {opt.label}
                      </PickerItem>))}
                  </PickerSection>);
                }
                return (<PickerItem key={item.value} id={item.value} textValue={item.label}>
                  {item.label}
                </PickerItem>);
            })
            : options.map((item) => {
                if ('options' in item) {
                    return null;
                }
                return (<PickerItem key={item.value} id={item.value} textValue={item.label}>
                  {item.label}
                </PickerItem>);
            })}
      </SpectrumPicker>
    </>);
};
export const TextArea = ({ type: _type, label, errorKey, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<SpectrumTextArea {...rest} label={label} isInvalid={!!errorMessage} errorMessage={errorMessage}/>);
};
export const FileField = ({ type: _type, label, errorKey }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<>
      <SpectrumFileTrigger>
        <SpectrumButton variant="primary">{label}</SpectrumButton>
      </SpectrumFileTrigger>
      {errorMessage && <span>{errorMessage}</span>}
    </>);
};
export const SubmitButton = ({ type: _type, text, ...rest }) => {
    return (<SpectrumButton {...rest} type="submit" variant="primary">
      {text}
    </SpectrumButton>);
};
