# candy_wrapper

`candy_wrapper`s are lightweight wrapper components around popular UI libraries made to work with [form_props]. Easily
use the power of Rails forms with any supported React UI library.

## Component status

Each component are meant to be copied from this repo to your own project and customized to your liking. There are no
CLI tools to help. just copy and paste from github.

| `form_props` helper           | Component              | Vanilla React      | React Aria           | NextUI               |
| :---------------------------- | :--------------------- | :----------------- | :------------------- | :------------------- |
| `f.text_field`                | Checkbox               | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.collection_check_boxes`    | CollectionCheckboxes   | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.collection_radio_buttons`  | CollectionRadioButtons | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.color_field`               | ColorField             | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.date_field`                | DateField              | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.email_field`               | EmailField             | :heavy_check_mark: | :white_large_square: | :white_large_square: |
|                               | FieldError             | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.month_field`               | MonthField             | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.number_field`              | NumberField            | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.password_field`            | PasswordField          | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.range_field`               | RangeField             | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.search_field`              | SearchField            | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.select`                    | Select                 | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.tel_field`                 | TelField               | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.text_field`                | TextField              | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.time_field`                | TimeField              | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.url_field`                 | UrlField               | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.text_area`                 | TextArea               | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.grouped_collection_select` | Select                 | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.weekday_select`            | Select                 | :heavy_check_mark: | :white_large_square: | :white_large_square: |
| `f.time_zone_select`          | Select                 | :heavy_check_mark: | :white_large_square: | :white_large_square: |

## Installation

```
npm install -D @thoughtbot/candy_wrapper
```

Go to the wrapper directory in this repo and copy the wrappers for the UI library of your choice into your project.

## Usage

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
import {Form, TextField} from './copied_components'

const {form, extras, inputs} = newPostForm

<Form {...form} extras={extras}>
  <TextField {...inputs.title} label="Post title">
  <button {...inputs.submit}>
</Form>
```

## Server errors

Each wrapper comes with inline support for server errors which renders a FieldError
underneath the input.

```js
import {Form, TextField} from './copied_components'

const validationErrors = {
  full_title: "Invalid length"
}

const {form, extras, inputs} = newPostForm

<Form {...form} extras={extras} validationErrors={validationErrors}>
  <TextField {...inputs.title} label="Post title" errorKey="full_title">
  <button {...inputs.submit}>
</Form>
```

## Contributors

Thank you, [contributors]!

[contributors]: https://github.com/thoughtbot/candy_wrapper/graphs/contributors
[form_props]: https://github.com/thoughtbot/form_props