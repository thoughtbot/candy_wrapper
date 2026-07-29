# candy_wrapper

`candy_wrapper`s are lightweight wrapper components around popular UI libraries made to work with [form_props]. Easily
use the power of Rails forms with any supported React UI library.

## Caution

This project is in its early phases of development. Its interface, behavior,
and name are likely to change drastically before a major version release.

## Component status

Each component are meant to be copied from this repo to your own project and customized to your liking. There are no
CLI tools to help. just copy and paste from github.

| `form_props` helper                     | Component              | [Vanilla]          | [Mantine]          | [shadcn/ui]        | [React Aria]       | [React Spectrum]   | [PrimeReact]       | [MUI]              | [Chakra UI]        |
| :-------------------------------------- | :--------------------- | :----------------- | :----------------- | :----------------- | :----------------- | :----------------- | :----------------- | :----------------- | :----------------- |
| `f.check_box`                           | Checkbox               | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.collection_check_boxes`              | CollectionCheckboxes   | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.collection_radio_buttons`            | CollectionRadioButtons | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.color_field`                         | ColorField             | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.date_field`                          | DateField              | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.datetime_local_field`                | DateTimeLocalField     | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.email_field`                         | EmailField             | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.month_field`                         | MonthField             | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.number_field`                        | NumberField            | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.password_field`                      | PasswordField          | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.range_field`                         | RangeField             | :heavy_check_mark: | :white_large_square: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.search_field`                        | SearchField            | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.select` (`multiple: true` supported) | Select                 | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.tel_field`                           | TelField               | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.file_field`                          | FileField              | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.text_field`                          | TextField              | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.time_field`                          | TimeField              | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.url_field`                           | UrlField               | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.text_area`                           | TextArea               | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.grouped_collection_select`           | Select                 | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.weekday_select`                      | Select                 | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.time_zone_select`                    | Select                 | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| `f.submit`                              | SubmitButton           | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |

## Installation

There's nothing to install, but if you need types:

```
npm install -D candy_wrapper
```

Then go to the wrapper directory in this repo and copy the wrappers for the UI library of your choice into your project.

# Usage

Once you've copied the components to your project. Use [form_props] to build your form:

```ruby
json.newPostForm do
  form_props(@post) do |f|
    f.text_field :title
    f.submit
  end
end
```

This would create a payload that looks something this:

```js
{
  someForm: {
    props: {
      id: "create-post",
      action: "/posts/123",
      acceptCharset: "UTF-8",
      method: "post"
    },
    extras: {
      method: {
        name: "_method",
        type: "hidden",
        defaultValue: "patch",
        autoComplete: "off"
      },
      utf8: {
        name: "utf8",
        type: "hidden",
        defaultValue: "\u0026#x2713;",
        autoComplete: "off"
      }
      csrf: {
        name: "utf8",
        type: "authenticity_token",
        defaultValue: "SomeTOken!23$",
        autoComplete: "off"
      }
    },
    inputs: {
      title: {name: "post[title]", id: "post_title", type: "text", defaultValue: "hello"},
      submit: {type: "submit", value: "Update a Post"}
    }
  }
}
```

Take the payload and pass it to the wrapper:

```js
import {Form, TextField, SubmitButton} from './copied_components_for_mantine'

const {form, extras, inputs} = newPostForm

<Form {...form} extras={extras}>
  <TextField {...inputs.title} label="Post title" />
  <SubmitButton {...inputs.submit} />
</Form>
```

## Server errors

Each wrapper comes with inline support for server errors.

```js
import {Form, TextField} from './copied_components'

const validationErrors = {
  full_title: "Invalid length"
}

const {form, extras, inputs} = newPostForm

<Form {...form} extras={extras} validationErrors={validationErrors}>
  <TextField {...inputs.title} label="Post title" errorKey="full_title" />
  <SubmitButton {...inputs.submit} />
</Form>
```

## Vanilla

Vanilla wrappers wrap around basic React HTML tags. If you want to build
wrappers of your own, you can start here and use other UI wrappers as reference.

## Mantine

To use the Mantine wrappers, add the following libraries before copying:

```
yarn add @mantine/core
yarn add @mantine/dates
```

## shadcn/ui

Copy the shadcn wrapper and the shadcn components it depends on (Input, Select, Checkbox, RadioGroup, Textarea, Slider, Button, Label) into your project.

## React Aria

To use the React Aria wrappers, add the following libraries before copying:

```
yarn add react-aria-components
yarn add @internationalized/date
```

## React Spectrum

To use the React Spectrum wrappers, add the following libraries before copying:

```
yarn add @adobe/react-spectrum
yarn add @internationalized/date
```

## PrimeReact

To use the PrimeReact wrappers, add the following library before copying:

```
yarn add primereact
```

## MUI

To use the MUI wrappers, add the following library before copying:

```
yarn add @mui/material @emotion/react @emotion/styled
```

## Chakra UI

To use the Chakra UI wrappers, add the following library before copying:

```
yarn add @chakra-ui/react
```

## Contributors

Thank you, [contributors]!

[contributors]: https://github.com/thoughtbot/candy_wrapper/graphs/contributors
[form_props]: https://github.com/thoughtbot/form_props
[Vanilla]: wrappers/ts/vanilla
[Mantine]: wrappers/ts/mantine/v9
[shadcn/ui]: wrappers/ts/shadcn/v4
[React Aria]: wrappers/ts/react-aria/v1
[React Spectrum]: wrappers/ts/react-spectrum/v3
[PrimeReact]: wrappers/ts/primereact/v10
[MUI]: wrappers/ts/mui/v9
[Chakra UI]: wrappers/ts/chakra/v3
