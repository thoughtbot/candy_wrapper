import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { CollectionRadioButtons, ValidationContext } from '.'

const buildRadioButtonPayload = (value, label, rest) => {
  return {
    type: 'radio',
    value,
    label,
    name: 'post[subscribe]',
    id: `post_subscribe_${value}`,
    ...rest,
  }
}

const buildPayload = () => {
  return {
    collection: [
      buildRadioButtonPayload(1, 'one', { defaultChecked: true }),
      buildRadioButtonPayload(2, 'two'),
    ],
    includeHidden: true,
    label: 'Subscribe',
    required: false,
  }
}

describe('CollectionRadioButtons', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getAllByRole, getByText } = render(
      <ChakraProvider value={defaultSystem}>
        <CollectionRadioButtons
          {...payload}
          label={'Subscribe'}
          errorKey={'subscribe'}
        />
      </ChakraProvider>
    )

    const radios = getAllByRole('radio')
    expect(radios.length).toEqual(2)

    expect(getByText('one')).not.toBeNull()
    expect(getByText('two')).not.toBeNull()
  })

  it('renders nothing when the collection is blank', () => {
    const payload = buildPayload()
    payload.collection = []

    const { container } = render(
      <ChakraProvider value={defaultSystem}>
        <CollectionRadioButtons
          {...payload}
          label={'Subscribe'}
          errorKey={'subscribe'}
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
        <CollectionRadioButtons
          {...payload}
          label={'Subscribe'}
          errorKey={'subscribe'}
        />
      </ChakraProvider>
    )

    const hiddenInput = container.querySelector('input[type=hidden]')
    expect(hiddenInput.name).toEqual('post[subscribe]')
    expect(hiddenInput.value).toEqual('')
  })

  it('renders with error highlighting', async () => {
    const payload = buildPayload()

    const validationErrors = {
      subscribe: 'id invalid',
    }

    const { getByText } = render(
      <ChakraProvider value={defaultSystem}>
        <ValidationContext.Provider value={validationErrors}>
          <CollectionRadioButtons
            {...payload}
            label={'Subscribe'}
            errorKey={'subscribe'}
          />
        </ValidationContext.Provider>
      </ChakraProvider>
    )

    const errorField = getByText('id invalid')
    expect(errorField).not.toBeNull()
  })
})
