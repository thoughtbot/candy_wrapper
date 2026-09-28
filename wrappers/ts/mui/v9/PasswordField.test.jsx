import React from 'react'
import { render } from '@testing-library/react'
import { PasswordField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'password',
    name: 'post[password]',
    id: 'post_password',
    required: false,
    defaultValue: 'secret',
  }
}

describe('PasswordField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <PasswordField {...payload} label={'Password'} errorKey={'password'} />
    )

    const input = getByLabelText('Password')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('secret')
    expect(input.type).toEqual('password')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      password: 'password invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <PasswordField {...payload} label={'Password'} errorKey={'password'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('password invalid')
    expect(errorField).not.toBeNull()
  })
})
