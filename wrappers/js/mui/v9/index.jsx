import React, { createContext, useContext, useMemo, } from 'react';
import TextField from '@mui/material/TextField';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
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
export const TextFieldComponent = (props) => {
    // Strip candy_wrapper-specific props
    const { type, errorKey, label, ...rest } = props;
    // Transform
    const errorMessage = useErrorMessage(errorKey);
    // Spread rest into MUI TextField
    return (<TextField label={label} type="text" error={!!errorMessage} helperText={errorMessage} {...rest}/>);
};
export { TextFieldComponent as TextField };
export const EmailField = (props) => {
    const { type, errorKey, label, ...rest } = props;
    const errorMessage = useErrorMessage(errorKey);
    return (<TextField label={label} type="email" error={!!errorMessage} helperText={errorMessage} {...rest}/>);
};
export const ColorField = (props) => {
    const { type, color, errorKey, label, ...rest } = props;
    const errorMessage = useErrorMessage(errorKey);
    return (<TextField label={label} type="color" error={!!errorMessage} helperText={errorMessage} fullWidth slotProps={{
            inputLabel: { shrink: true },
            htmlInput: { sx: { height: 56, padding: '8px', cursor: 'pointer', boxSizing: 'border-box' } },
        }} {...rest}/>);
};
export const DateField = (props) => {
    const { type, errorKey, label, ...rest } = props;
    const errorMessage = useErrorMessage(errorKey);
    return (<TextField label={label} type="date" error={!!errorMessage} helperText={errorMessage} slotProps={{ inputLabel: { shrink: true } }} {...rest}/>);
};
export const DateTimeLocalField = (props) => {
    const { type, errorKey, label, ...rest } = props;
    const errorMessage = useErrorMessage(errorKey);
    return (<TextField label={label} type="datetime-local" error={!!errorMessage} helperText={errorMessage} slotProps={{ inputLabel: { shrink: true } }} {...rest}/>);
};
export const SearchField = (props) => {
    const { type, errorKey, label, ...rest } = props;
    const errorMessage = useErrorMessage(errorKey);
    return (<TextField label={label} type="search" error={!!errorMessage} helperText={errorMessage} {...rest}/>);
};
export const TelField = (props) => {
    const { type, errorKey, label, ...rest } = props;
    const errorMessage = useErrorMessage(errorKey);
    return (<TextField label={label} type="tel" error={!!errorMessage} helperText={errorMessage} {...rest}/>);
};
export const UrlField = (props) => {
    const { type, errorKey, label, ...rest } = props;
    const errorMessage = useErrorMessage(errorKey);
    return (<TextField label={label} type="url" error={!!errorMessage} helperText={errorMessage} {...rest}/>);
};
export const MonthField = (props) => {
    const { type, errorKey, label, ...rest } = props;
    const errorMessage = useErrorMessage(errorKey);
    return (<TextField label={label} type="month" error={!!errorMessage} helperText={errorMessage} slotProps={{ inputLabel: { shrink: true } }} {...rest}/>);
};
export const TimeField = (props) => {
    const { type, errorKey, label, ...rest } = props;
    const errorMessage = useErrorMessage(errorKey);
    return (<TextField label={label} type="time" error={!!errorMessage} helperText={errorMessage} slotProps={{ inputLabel: { shrink: true } }} {...rest}/>);
};
export const NumberField = (props) => {
    const { type, errorKey, label, min, max, step, ...rest } = props;
    const errorMessage = useErrorMessage(errorKey);
    return (<TextField label={label} type="number" error={!!errorMessage} helperText={errorMessage} slotProps={{ htmlInput: { min, max, step } }} {...rest}/>);
};
export const PasswordField = (props) => {
    const { type, errorKey, label, ...rest } = props;
    const errorMessage = useErrorMessage(errorKey);
    return (<TextField label={label} type="password" error={!!errorMessage} helperText={errorMessage} {...rest}/>);
};
export const RangeField = (props) => {
    // Strip candy_wrapper-specific props
    const { type, errorKey, label, value, defaultValue, ...rest } = props;
    // Transform string values to numbers for MUI Slider
    const errorMessage = useErrorMessage(errorKey);
    const sliderValue = value !== undefined ? Number(value) : undefined;
    const sliderDefaultValue = defaultValue !== undefined ? Number(defaultValue) : undefined;
    // Spread rest into Slider
    return (<FormControl error={!!errorMessage} fullWidth>
      <FormLabel>{label}</FormLabel>
      <Slider value={sliderValue} defaultValue={sliderDefaultValue} {...rest}/>
      <input type="hidden" name={rest.name} value={sliderValue ?? sliderDefaultValue ?? ''}/>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>);
};
export const Checkbox = (props) => {
    // Strip candy_wrapper-specific props
    const { type, includeHidden, uncheckedValue, errorKey, label, ...rest } = props;
    // Transform
    const errorMessage = useErrorMessage(errorKey);
    const { name } = rest;
    // Spread rest into MuiCheckbox (defaultChecked/checked pass through natively)
    return (<FormControl error={!!errorMessage}>
      {includeHidden && (<input type="hidden" name={name} defaultValue={uncheckedValue} autoComplete="off"/>)}
      <FormControlLabel label={label} control={<MuiCheckbox {...rest}/>}/>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>);
};
export const CollectionCheckboxes = (props) => {
    // Strip candy_wrapper-specific props
    const { includeHidden, collection, label, errorKey } = props;
    const errorMessage = useErrorMessage(errorKey);
    if (collection.length === 0) {
        return null;
    }
    const { name } = collection[0];
    const checkboxes = collection.map((item) => {
        // Strip candy_wrapper-specific props from each collection item
        const { label: checkboxLabel, type, includeHidden: _ih, uncheckedValue: _uv, ...rest } = item;
        return (<FormControlLabel key={rest.id} label={checkboxLabel} control={<MuiCheckbox {...rest}/>}/>);
    });
    return (<FormControl error={!!errorMessage}>
      {includeHidden && (<input type="hidden" name={name} defaultValue={''} autoComplete="off"/>)}
      <FormLabel>{label}</FormLabel>
      {checkboxes}
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>);
};
export const CollectionRadioButtons = (props) => {
    // Strip candy_wrapper-specific props
    const { includeHidden, collection, label, errorKey } = props;
    const errorMessage = useErrorMessage(errorKey);
    if (collection.length === 0) {
        return null;
    }
    // Transform: extract value/defaultValue for RadioGroup from checked/defaultChecked items
    const defaultItem = collection.find((option) => !!option.defaultChecked);
    const checkedItem = collection.find((option) => !!option.checked);
    const valueProps = {};
    if (defaultItem) {
        valueProps.defaultValue = defaultItem.value;
    }
    else if (checkedItem) {
        valueProps.value = checkedItem.value;
    }
    const { name } = collection[0];
    const radioButtons = collection.map((item) => {
        // Strip candy_wrapper-specific props from each collection item
        const { label: radioLabel, checked, defaultChecked, type, ...rest } = item;
        return (<FormControlLabel key={rest.id} label={radioLabel} control={<Radio {...rest}/>}/>);
    });
    return (<FormControl error={!!errorMessage}>
      {includeHidden && (<input type="hidden" name={name} defaultValue={''} autoComplete="off"/>)}
      <FormLabel>{label}</FormLabel>
      <RadioGroup name={name} {...valueProps}>
        {radioButtons}
      </RadioGroup>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>);
};
export const Select = (props) => {
    // Strip candy_wrapper-specific props
    const { type, includeHidden, options, errorKey, label, name, id, multiple, ...rest } = props;
    // Transform
    const errorMessage = useErrorMessage(errorKey);
    const addHidden = includeHidden && multiple;
    // Transform options into MenuItem children (flattening optgroups)
    const menuItems = options.flatMap((item) => {
        if ('options' in item) {
            return item.options.map((opt) => (<MenuItem key={`${item.label}-${opt.value}`} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </MenuItem>));
        }
        else {
            return (<MenuItem key={item.value} value={item.value} disabled={item.disabled}>
          {item.label}
        </MenuItem>);
        }
    });
    const labelId = id ? `${id}-label` : undefined;
    // Spread rest into MuiSelect
    return (<FormControl error={!!errorMessage} fullWidth>
      {addHidden && (<input type="hidden" name={name} value={''} autoComplete="off"/>)}
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect name={name} id={id} labelId={labelId} label={label} multiple={multiple} {...rest}>
        {menuItems}
      </MuiSelect>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>);
};
export const TextArea = (props) => {
    const { type, errorKey, label, rows, ...rest } = props;
    const errorMessage = useErrorMessage(errorKey);
    return (<TextField label={label} multiline rows={rows} error={!!errorMessage} helperText={errorMessage} {...rest}/>);
};
export const FileField = (props) => {
    const { type, errorKey, label, ...rest } = props;
    const errorMessage = useErrorMessage(errorKey);
    return (<TextField label={label} type="file" error={!!errorMessage} helperText={errorMessage} slotProps={{ inputLabel: { shrink: true } }} {...rest}/>);
};
export const SubmitButton = (props) => {
    const { type, text, ...rest } = props;
    return (<Button {...rest} type="submit" variant="contained">
      {text}
    </Button>);
};
