import React from 'react'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
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
} from '../../wrappers/ts/mantine/v9/index'
import { renderFrame } from './renderFrame'

const Provider = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
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
