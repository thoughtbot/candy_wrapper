import React, { createContext, useContext, useMemo } from 'react';
import { parseDate, parseDateTime, parseTime, } from '@internationalized/date';
import { Button as AriaButton, Checkbox as AriaCheckbox, CheckboxGroup as AriaCheckboxGroup, DateField as AriaDateField, DateInput as AriaDateInput, DateSegment as AriaDateSegment, FieldError as AriaFieldError, FileTrigger as AriaFileTrigger, Form as AriaForm, Input as AriaInput, Label as AriaLabel, ListBox as AriaListBox, ListBoxItem as AriaListBoxItem, NumberField as AriaNumberField, Popover as AriaPopover, Radio as AriaRadio, RadioGroup as AriaRadioGroup, SearchField as AriaSearchField, Select as AriaSelect, SelectValue as AriaSelectValue, Slider as AriaSlider, SliderOutput as AriaSliderOutput, SliderThumb as AriaSliderThumb, SliderTrack as AriaSliderTrack, TextArea as AriaTextArea, TextField as AriaTextField, TimeField as AriaTimeField, } from 'react-aria-components';
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
    return (<AriaForm {...props} validationErrors={validationErrors}>
      <ValidationContext.Provider value={validationErrors}>
        <Extras {...extras}></Extras>
        {children}
      </ValidationContext.Provider>
    </AriaForm>);
};
export const Checkbox = ({ type: _type, includeHidden, uncheckedValue, errorKey, label, checked, defaultChecked, ...rest }) => {
    const { name } = rest;
    const errorMessage = useErrorMessage(errorKey);
    const isSelected = checked ?? undefined;
    const defaultSelected = defaultChecked ?? undefined;
    return (<>
      {includeHidden && (<input type="hidden" name={name} defaultValue={uncheckedValue} autoComplete="off"/>)}
      <AriaCheckbox name={name} value={rest.value} id={rest.id} isSelected={isSelected} defaultSelected={defaultSelected} isInvalid={!!errorMessage}>
        {label}
      </AriaCheckbox>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
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
      <AriaCheckboxGroup {...valueProps} isInvalid={!!errorMessage}>
        <AriaLabel>{label}</AriaLabel>
        {collection.map((option) => (<AriaCheckbox key={option.id} name={name} value={option.value} id={option.id}>
            {option.label}
          </AriaCheckbox>))}
        {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
      </AriaCheckboxGroup>
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
      <AriaRadioGroup name={name} {...valueProps} isInvalid={!!errorMessage}>
        <AriaLabel>{label}</AriaLabel>
        {collection.map((option) => (<AriaRadio key={option.value} value={option.value} id={option.id}>
            {option.label}
          </AriaRadio>))}
        {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
      </AriaRadioGroup>
    </>);
};
export const TextField = ({ type: _type, label, errorKey, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<AriaTextField name={rest.name} defaultValue={rest.defaultValue} value={rest.value} isInvalid={!!errorMessage}>
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id}/>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTextField>);
};
export const EmailField = ({ type: _type, label, errorKey, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<AriaTextField name={rest.name} defaultValue={rest.defaultValue} value={rest.value} type="email" isInvalid={!!errorMessage}>
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id}/>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTextField>);
};
export const ColorField = ({ type: _type, label, errorKey, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<AriaTextField name={rest.name} defaultValue={rest.defaultValue} value={rest.value} isInvalid={!!errorMessage}>
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} type="color"/>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTextField>);
};
export const DateField = ({ type: _type, label, errorKey, value, defaultValue, min, max, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    const valueProps = {};
    if (value) {
        valueProps.value = parseDate(value);
    }
    else if (defaultValue) {
        valueProps.defaultValue = parseDate(defaultValue);
    }
    const minMaxProps = {};
    if (min) {
        minMaxProps.minValue = parseDate(min);
    }
    if (max) {
        minMaxProps.maxValue = parseDate(max);
    }
    return (<AriaDateField name={rest.name} {...valueProps} {...minMaxProps} isInvalid={!!errorMessage}>
      <AriaLabel>{label}</AriaLabel>
      <AriaDateInput>{(segment) => <AriaDateSegment segment={segment}/>}</AriaDateInput>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaDateField>);
};
export const DateTimeLocalField = ({ type: _type, label, errorKey, value, defaultValue, min, max, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    const valueProps = {};
    if (value) {
        valueProps.value = parseDateTime(value);
    }
    else if (defaultValue) {
        valueProps.defaultValue = parseDateTime(defaultValue);
    }
    const minMaxProps = {};
    if (min) {
        minMaxProps.minValue = parseDateTime(min);
    }
    if (max) {
        minMaxProps.maxValue = parseDateTime(max);
    }
    return (<AriaDateField name={rest.name} {...valueProps} {...minMaxProps} isInvalid={!!errorMessage}>
      <AriaLabel>{label}</AriaLabel>
      <AriaDateInput>{(segment) => <AriaDateSegment segment={segment}/>}</AriaDateInput>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaDateField>);
};
export const TimeField = ({ type: _type, label, errorKey, value, defaultValue, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    const valueProps = {};
    if (value) {
        valueProps.value = parseTime(value);
    }
    else if (defaultValue) {
        valueProps.defaultValue = parseTime(defaultValue);
    }
    return (<AriaTimeField name={rest.name} {...valueProps} isInvalid={!!errorMessage}>
      <AriaLabel>{label}</AriaLabel>
      <AriaDateInput>{(segment) => <AriaDateSegment segment={segment}/>}</AriaDateInput>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTimeField>);
};
export const SearchField = ({ type: _type, label, errorKey, autosave: _autosave, results: _results, onsearch: _onsearch, incremental: _incremental, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<AriaSearchField name={rest.name} defaultValue={rest.defaultValue} value={rest.value} isInvalid={!!errorMessage}>
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id}/>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaSearchField>);
};
export const TelField = ({ type: _type, label, errorKey, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<AriaTextField name={rest.name} defaultValue={rest.defaultValue} value={rest.value} type="tel" isInvalid={!!errorMessage}>
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id}/>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTextField>);
};
export const UrlField = ({ type: _type, label, errorKey, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<AriaTextField name={rest.name} defaultValue={rest.defaultValue} value={rest.value} type="url" isInvalid={!!errorMessage}>
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id}/>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTextField>);
};
export const MonthField = ({ type: _type, label, errorKey, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<AriaTextField name={rest.name} defaultValue={rest.defaultValue} value={rest.value} isInvalid={!!errorMessage}>
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} type="month"/>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTextField>);
};
export const NumberField = ({ type: _type, label, errorKey, value, defaultValue, min, max, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    const valueProps = {};
    if (value !== undefined && value !== '') {
        valueProps.value = Number(value);
    }
    else if (defaultValue !== undefined && defaultValue !== '') {
        valueProps.defaultValue = Number(defaultValue);
    }
    return (<AriaNumberField name={rest.name} {...valueProps} minValue={min} maxValue={max} isInvalid={!!errorMessage}>
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id}/>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaNumberField>);
};
export const RangeField = ({ type: _type, label, errorKey, value, defaultValue, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    const numericValue = value ? Number(value) : undefined;
    const numericDefault = defaultValue ? Number(defaultValue) : undefined;
    return (<>
      <AriaSlider defaultValue={numericDefault} value={numericValue}>
        <AriaLabel>{label}</AriaLabel>
        <AriaSliderOutput />
        <AriaSliderTrack>
          <AriaSliderThumb />
        </AriaSliderTrack>
      </AriaSlider>
      <input type="hidden" name={rest.name} value={numericValue ?? numericDefault ?? ''}/>
      {errorMessage && <span>{errorMessage}</span>}
    </>);
};
export const PasswordField = ({ type: _type, label, errorKey, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<AriaTextField name={rest.name} defaultValue={rest.defaultValue} value={rest.value} isInvalid={!!errorMessage}>
      <AriaLabel>{label}</AriaLabel>
      <AriaInput id={rest.id} type="password"/>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTextField>);
};
export const Select = ({ includeHidden, name, id, options, label, errorKey, multiple, type: _type, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    const addHidden = includeHidden && multiple;
    const flatOptions = options.flatMap((item) => {
        if ('options' in item) {
            return item.options;
        }
        return [item];
    });
    const selectedValue = 'value' in rest ? rest.value : undefined;
    const selectedDefault = 'defaultvalue' in rest ? rest.defaultvalue : undefined;
    if (multiple) {
        const selectedKeys = selectedValue
            ? (Array.isArray(selectedValue) ? selectedValue : [selectedValue])
            : undefined;
        const defaultKeys = selectedDefault
            ? (Array.isArray(selectedDefault) ? selectedDefault : [selectedDefault])
            : undefined;
        return (<>
        {addHidden && (<input type="hidden" name={name} value={''} autoComplete="off"/>)}
        <AriaSelect name={name} isInvalid={!!errorMessage} selectionMode="multiple" value={selectedKeys} defaultValue={defaultKeys}>
          <AriaLabel>{label}</AriaLabel>
          <AriaButton>
            <AriaSelectValue />
          </AriaButton>
          <AriaPopover>
            <AriaListBox>
              {flatOptions.map((opt) => (<AriaListBoxItem key={opt.value} id={opt.value} textValue={opt.label} isDisabled={opt.disabled}>
                  {opt.label}
                </AriaListBoxItem>))}
            </AriaListBox>
          </AriaPopover>
          {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
        </AriaSelect>
      </>);
    }
    const selectedKey = selectedValue
        ? (Array.isArray(selectedValue) ? selectedValue[0] : selectedValue)
        : undefined;
    const defaultKey = selectedDefault
        ? (Array.isArray(selectedDefault) ? selectedDefault[0] : selectedDefault)
        : undefined;
    return (<AriaSelect name={name} isInvalid={!!errorMessage} selectedKey={selectedKey} defaultSelectedKey={defaultKey}>
      <AriaLabel>{label}</AriaLabel>
      <AriaButton>
        <AriaSelectValue />
      </AriaButton>
      <AriaPopover>
        <AriaListBox>
          {flatOptions.map((opt) => (<AriaListBoxItem key={opt.value} id={opt.value} textValue={opt.label} isDisabled={opt.disabled}>
              {opt.label}
            </AriaListBoxItem>))}
        </AriaListBox>
      </AriaPopover>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaSelect>);
};
export const TextArea = ({ type: _type, label, errorKey, ...rest }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<AriaTextField name={rest.name} defaultValue={rest.defaultValue} value={rest.value} isInvalid={!!errorMessage}>
      <AriaLabel>{label}</AriaLabel>
      <AriaTextArea id={rest.id} rows={rest.rows} cols={rest.cols}/>
      {errorMessage && <AriaFieldError>{errorMessage}</AriaFieldError>}
    </AriaTextField>);
};
export const FileField = ({ type: _type, label, errorKey, }) => {
    const errorMessage = useErrorMessage(errorKey);
    return (<>
      <AriaFileTrigger>
        <AriaButton>{label}</AriaButton>
      </AriaFileTrigger>
      {errorMessage && <span>{errorMessage}</span>}
    </>);
};
export const SubmitButton = ({ type: _type, text, ...rest }) => {
    return (<AriaButton {...rest} type="submit">
      {text}
    </AriaButton>);
};
