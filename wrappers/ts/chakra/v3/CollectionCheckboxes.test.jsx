import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { CollectionCheckboxes, ValidationContext } from '.'

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

    const { getAllByRole, getByText } = render(
      <ChakraProvider value={defaultSystem}>
        <CollectionCheckboxes
          {...payload}
          label={'Authors'}
          errorKey={'authors'}
        />
      </ChakraProvider>
    )

    const checkboxes = getAllByRole('checkbox')
    expect(checkboxes.length).toEqual(2)

    expect(getByText('one')).not.toBeNull()
    expect(getByText('two')).not.toBeNull()
  })

  it('renders nothing when the collection is blank', () => {
    const payload = buildPayload()
    payload.collection = []

    const { container } = render(
      <ChakraProvider value={defaultSystem}>
        <CollectionCheckboxes
          {...payload}
          label={'Authors'}
          errorKey={'authors'}
        />
      </ChakraProvider>
    )

    expect(container.innerHTML).toEqual('')
  })

  it('renders hidden input', () => {
    const payload = buildPayload()
    payload.includeHidden = true

    const { container } = render(
      <ChakraProvider value={defaultSystem}>
        <CollectionCheckboxes
          {...payload}
          label={'Authors'}
          errorKey={'authors'}
        />
      </ChakraProvider>
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
      <ChakraProvider value={defaultSystem}>
        <ValidationContext.Provider value={validationErrors}>
          <CollectionCheckboxes
            {...payload}
            label={'Authors'}
            errorKey={'author_ids'}
          />
        </ValidationContext.Provider>
      </ChakraProvider>
    )

    const errorField = getByText('id invalid')
    expect(errorField).not.toBeNull()
  })
})
