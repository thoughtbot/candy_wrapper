import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { TelField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'tel',
    name: 'post[phone]',
    id: 'post_phone',
    required: false,
    defaultValue: '555-1234',
  }
}

describe('TelField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <ChakraProvider value={defaultSystem}>
        <TelField {...payload} label={'Phone'} errorKey={'phone'} />
      </ChakraProvider>
    )

    const input = getByLabelText('Phone')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('555-1234')
    expect(input.type).toEqual('tel')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      phone: 'phone invalid',
    }

    const { getByText } = render(
      <ChakraProvider value={defaultSystem}>
        <ValidationContext.Provider value={validationErrors}>
          <TelField {...payload} label={'Phone'} errorKey={'phone'} />
        </ValidationContext.Provider>
      </ChakraProvider>
    )

    const errorField = getByText('phone invalid')
    expect(errorField).not.toBeNull()
  })
})
