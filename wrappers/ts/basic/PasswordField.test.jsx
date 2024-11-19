import React from 'react'
import { render } from '@testing-library/react'
import { PasswordField } from '.'
import { ValidationContext } from '../../../src'

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
      <PasswordField {...payload} label={'Password'} errorKey={'password'} />
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
      <ValidationContext.Provider value={validationErrors}>
        <PasswordField {...payload} label={'Password'} errorKey={'password'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('Does not match')
    expect(errorField).not.toBeNull()
  })
})
