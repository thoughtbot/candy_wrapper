import React from 'react'
import { render } from '@testing-library/react'
import { TelField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'tel',
    name: 'post[phone]',
    id: 'post_phone',
    required: false,
    defaultValue: 'john@smith.com',
  }
}

describe('TelField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByRole } = render(
      <TelField {...payload} label={'phone'} errorKey={'phone_number'} />
    )

    const input = getByRole('textbox', { name: 'phone' })
    expect(input).not.toBeNull()
    expect(input.value).toEqual('john@smith.com')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      phone_number: 'phone number invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <TelField {...payload} label={'phone'} errorKey={'phone_number'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('phone number invalid')
    expect(errorField).not.toBeNull()
  })
})
