import React from 'react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import {
  TextField,
  EmailField,
  PasswordField,
  NumberField,
  DateField,
  DateTimeLocalField,
  TimeField,
  MonthField,
  ColorField,
  SearchField,
  TelField,
  UrlField,
  RangeField,
  Checkbox,
  CollectionCheckboxes,
  CollectionRadioButtons,
  Select,
  TextArea,
  FileField,
  SubmitButton,
  ValidationContext,
} from '../../wrappers/ts/chakra/v3/index'
import { renderFrame } from './renderFrame'

const Provider = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
)

renderFrame(
  {
    TextField,
    EmailField,
    PasswordField,
    NumberField,
    DateField,
    DateTimeLocalField,
    TimeField,
    MonthField,
    ColorField,
    SearchField,
    TelField,
    UrlField,
    RangeField,
    Checkbox,
    CollectionCheckboxes,
    CollectionRadioButtons,
    Select,
    MultiSelect: Select,
    TextArea,
    FileField,
    SubmitButton,
  },
  Provider,
  ValidationContext
)
