import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { PasswordField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'password',
    name: 'post[password]',
    id: 'post_password',
    required: false,
    defaultValue: 'Password123',
  }
}

describe('PasswordField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <ChakraProvider value={defaultSystem}>
        <PasswordField {...payload} label={'Password'} errorKey={'password'} />
      </ChakraProvider>
    )

    const input = getByLabelText('Password')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('Password123')
    expect(input.type).toEqual('password')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      password: 'Does not match',
    }

    const { getByText } = render(
      <ChakraProvider value={defaultSystem}>
        <ValidationContext.Provider value={validationErrors}>
          <PasswordField {...payload} label={'Password'} errorKey={'password'} />
        </ValidationContext.Provider>
      </ChakraProvider>
    )

    const errorField = getByText('Does not match')
    expect(errorField).not.toBeNull()
  })
})
