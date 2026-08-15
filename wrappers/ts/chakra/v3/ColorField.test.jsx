import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'color',
    name: 'post[color]',
    id: 'post_color',
    required: false,
    defaultValue: '#000000',
  }
}

describe('ColorField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByText, container } = render(
      <ChakraProvider value={defaultSystem}>
        <ColorField {...payload} label={'Color'} errorKey={'color'} />
      </ChakraProvider>
    )

    const label = getByText('Color')
    expect(label).not.toBeNull()

    const hiddenInput = container.querySelector('input[name="post[color]"]')
    expect(hiddenInput).not.toBeNull()
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      color: 'color invalid',
    }

    const { getByText } = render(
      <ChakraProvider value={defaultSystem}>
        <ValidationContext.Provider value={validationErrors}>
          <ColorField {...payload} label={'Color'} errorKey={'color'} />
        </ValidationContext.Provider>
      </ChakraProvider>
    )

    const errorField = getByText('color invalid')
    expect(errorField).not.toBeNull()
  })
})
