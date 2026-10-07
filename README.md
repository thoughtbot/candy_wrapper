# candy_wrapper

`candy_wrapper`s are lightweight wrapper components around popular UI libraries made to work with [form_props]. Easily
use the power of Rails forms with any supported React UI library.

## Caution

This project is in its early phases of development. Its interface, behavior,
and name are likely to change drastically before a major version release.

## Component status

Each component are meant to be copied from this repo to your own project and customized to your liking. There are no
CLI tools to help. just copy and paste from github.

> Legend: :heavy_check_mark: library component | :globe_with_meridians: native HTML input | :x: not supported

| `form_props` helper                     | Component              | [Vanilla]              | [Ark UI]               | [Chakra UI]            | [React Spectrum]       | [Mantine]          | [HeroUI]               | [MUI]                  | [React Aria]           |
| :-------------------------------------- | :--------------------- | :--------------------- | :--------------------- | :--------------------- | :--------------------- | :----------------- | :--------------------- | :--------------------- | :--------------------- |
| `f.text_field`                          | TextField              | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.email_field`                         | EmailField             | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.password_field`                      | PasswordField          | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.number_field`                        | NumberField            | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.date_field`                          | DateField              | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.datetime_local_field`                | DateTimeLocalField     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.time_field`                          | TimeField              | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.search_field`                        | SearchField            | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.tel_field`                           | TelField               | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.url_field`                           | UrlField               | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.color_field`                         | ColorField             | :globe_with_meridians: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :globe_with_meridians: | :heavy_check_mark:     |
| `f.month_field`                         | MonthField             | :globe_with_meridians: | :globe_with_meridians: | :globe_with_meridians: | :globe_with_meridians: | :heavy_check_mark: | :globe_with_meridians: | :globe_with_meridians: | :globe_with_meridians: |
| `f.range_field`                         | RangeField             | :globe_with_meridians: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.file_field`                          | FileField              | :globe_with_meridians: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :globe_with_meridians: | :globe_with_meridians: | :heavy_check_mark:     |
| `f.check_box`                           | Checkbox               | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.collection_check_boxes`              | CollectionCheckboxes   | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.collection_radio_buttons`            | CollectionRadioButtons | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.select` (`multiple: true` supported) | Select                 | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.text_area`                           | TextArea               | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.grouped_collection_select`           | Select                 | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.weekday_select`                      | Select                 | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.time_zone_select`                    | Select                 | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |
| `f.submit`                              | SubmitButton           | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark: | :heavy_check_mark:     | :heavy_check_mark:     | :heavy_check_mark:     |

## Installation

There's nothing to install for the JavaScript wrappers. The TypeScript wrappers
import their shared types from `@thoughtbot/candy_wrapper`, so add it if you use them:

```
npm install -D @thoughtbot/candy_wrapper
```

Then go to the [wrappers] directory in this repo and copy the wrappers for the UI library of your choice into your project.
Each UI library has two variants with the same components:

- `wrappers/ts/<library>` - TypeScript (`index.tsx`), typed with `@thoughtbot/candy_wrapper`
- `wrappers/js/<library>` - plain JavaScript (`index.jsx`), no dependency on `@thoughtbot/candy_wrapper`

The Chakra UI wrappers also include a `components/ui` directory that should be copied along with `index`.

# Usage

Once you've copied the components to your project. Use [form_props] to build your form:

```ruby
json.newPostForm do
  form_props(model: @post) do |f|
    f.text_field :title
    f.submit
  end
end
```

This would create a payload that looks something this:

```js
{
  newPostForm: {
    form: {
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
      csrf: {
        name: "authenticity_token",
        type: "hidden",
        defaultValue: "SomeTOken!23$",
        autoComplete: "off"
      },
      utf8: {
        name: "utf8",
        type: "hidden",
        defaultValue: "\u0026#x2713;",
        autoComplete: "off"
      }
    },
    inputs: {
      title: {name: "post[title]", id: "post_title", type: "text", defaultValue: "hello"},
      submit: {name: "commit", text: "Update Post", type: "submit"}
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
import {Form, TextField, SubmitButton} from './copied_components'

const validationErrors = {
  full_title: "Invalid length"
}

const {form, extras, inputs} = newPostForm

<Form {...form} extras={extras} validationErrors={validationErrors}>
  <TextField {...inputs.title} label="Post title" errorKey="full_title" />
  <SubmitButton {...inputs.submit} />
</Form>
```

## Helpers

Besides the components in the table above, each wrapper exports the building
blocks it uses internally, which are handy when writing your own components:

- `Form` - renders the form, its `Extras`, and provides `validationErrors` via `ValidationContext`.
- `Extras` - renders the hidden inputs from the `extras` payload (`_method`, `authenticity_token`, `utf8`).
- `ValidationContext` - React context holding the `validationErrors` passed to `Form`. In the React Aria wrapper this is
  `FormValidationContext` from `react-aria-components`, re-exported under the same name.
- `useErrorMessage(errorKey)` - returns the error message for `errorKey` from `ValidationContext`, or `null`.

The Vanilla wrappers also export:

- `FieldError` - renders the inline error for an `errorKey`.
- `FieldBase` - a label, input, and `FieldError` combined; the base of most Vanilla fields.

## Vanilla

Vanilla wrappers wrap around basic React HTML tags. If you want to build
wrappers of your own, you can start here and use other UI wrappers as reference.

## Ark UI

To use the Ark UI wrappers, add the following library before copying:

```
yarn add @ark-ui/react
```

## Chakra UI

To use the Chakra UI wrappers, add the following library before copying:

```
yarn add @chakra-ui/react @emotion/react react-icons
```

`react-icons` is used by the copied `components/ui/password-input`.

## React Spectrum

To use the React Spectrum S2 wrappers, add the following libraries before copying:

```
yarn add @react-spectrum/s2 @internationalized/date
```

## Mantine

To use the Mantine wrappers, add the following libraries before copying:

```
yarn add @mantine/core @mantine/hooks @mantine/dates dayjs
```

## HeroUI

To use the HeroUI wrappers, add the following libraries before copying:

```
yarn add @heroui/react @internationalized/date
```

Requires Tailwind CSS v4 with `@heroui/styles`.

## MUI

To use the MUI wrappers, add the following library before copying:

```
yarn add @mui/material @emotion/react @emotion/styled
```

## React Aria

To use the React Aria wrappers, add the following libraries before copying:

```
yarn add react-aria-components @internationalized/date
```

## Contributors

Thank you, [contributors]!

[wrappers]: wrappers
[contributors]: https://github.com/thoughtbot/candy_wrapper/graphs/contributors
[form_props]: https://github.com/thoughtbot/form_props
[Vanilla]: wrappers/ts/vanilla
[Ark UI]: wrappers/ts/ark/v5
[Chakra UI]: wrappers/ts/chakra/v3
[React Spectrum]: wrappers/ts/react-spectrum/s2
[Mantine]: wrappers/ts/mantine/v9
[HeroUI]: wrappers/ts/heroui/v3
[MUI]: wrappers/ts/mui/v9
[React Aria]: wrappers/ts/react-aria/v1
