import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { EmailField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'email',
    name: 'post[email]',
    id: 'post_email',
    required: false,
    defaultValue: 'john@smith.com',
  }
}

describe('EmailField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <ChakraProvider value={defaultSystem}>
        <EmailField {...payload} label={'Email'} errorKey={'email'} />
      </ChakraProvider>
    )

    const input = getByLabelText('Email')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('john@smith.com')
    expect(input.type).toEqual('email')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      email: 'email invalid',
    }

    const { getByText } = render(
      <ChakraProvider value={defaultSystem}>
        <ValidationContext.Provider value={validationErrors}>
          <EmailField {...payload} label={'Email'} errorKey={'email'} />
        </ValidationContext.Provider>
      </ChakraProvider>
    )

    const errorField = getByText('email invalid')
    expect(errorField).not.toBeNull()
  })
})
