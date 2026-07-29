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

    const { getByLabelText } = render(
      <ChakraProvider value={defaultSystem}>
        <ColorField {...payload} label={'Color'} errorKey={'color'} />
      </ChakraProvider>
    )

    const input = getByLabelText('Color')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('#000000')
    expect(input.type).toEqual('color')
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
