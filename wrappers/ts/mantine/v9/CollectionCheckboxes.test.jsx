import React from 'react'
import { render } from '@testing-library/react'
import { CollectionCheckboxes, ValidationContext } from '.'
import { MantineProvider } from '@mantine/core'

const buildCheckboxPayload = (value, label) => {
  return {
    type: 'checkbox',
    value,
    defaultChecked: true,
    label,
    name: 'post[author_ids][]',
    id: `post_author_ids_${value}`,
  }
}

const buildPayload = () => {
  return {
    collection: [
      buildCheckboxPayload(1, 'one'),
      buildCheckboxPayload(2, 'two'),
    ],
    includeHidden: true,
    label: 'authors',
    required: false,
  }
}

describe('CollectionCheckboxes', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <MantineProvider>
        <CollectionCheckboxes
          {...payload}
          label={'Authors'}
          errorKey={'authors'}
        />
      </MantineProvider>
    )

    let input = getByLabelText('one')

    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('1')
    expect(input.type).toEqual('checkbox')

    input = getByLabelText('two')

    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('2')
    expect(input.type).toEqual('checkbox')
  })

  it('renders nothing when the collection is blank', () => {
    const payload = buildPayload()
    payload.collection = []

    const { container } = render(
      <MantineProvider>
        <CollectionCheckboxes
          {...payload}
          label={'Authors'}
          errorKey={'authors'}
        />
      </MantineProvider>
    )

    const checkboxRoots = container.getElementsByClassName(
      'mantine-CheckboxGroup-root'
    )

    expect(checkboxRoots.length).toEqual(0)
  })

  it('renders hidden ', () => {
    const payload = buildPayload()
    payload.includeHidden = true

    const { container } = render(
      <MantineProvider>
        <CollectionCheckboxes
          {...payload}
          label={'Authors'}
          errorKey={'authors'}
        />
      </MantineProvider>
    )

    const hiddenInput = container.querySelector('input[type=hidden]')
    expect(hiddenInput.name).toEqual('post[author_ids][]')
    expect(hiddenInput.value).toEqual('')
  })

  it('renders with error highlighting', async () => {
    const payload = buildPayload()

    const validationErrors = {
      author_ids: 'id invalid',
    }

    const { getByText } = render(
      <MantineProvider>
        <ValidationContext.Provider value={validationErrors}>
          <CollectionCheckboxes
            {...payload}
            label={'Authors'}
            errorKey={'author_ids'}
          />
        </ValidationContext.Provider>
      </MantineProvider>
    )

    const errorField = getByText('id invalid')
    expect(errorField).not.toBeNull()
  })
})
