import React from 'react'
import { render } from '@testing-library/react'
import { TelField, ValidationContext } from '.'
import { MantineProvider } from '@mantine/core'

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

    const { getByLabelText } = render(
      <MantineProvider>
        <TelField {...payload} label={'phone'} errorKey={'phone_number'} />
      </MantineProvider>
    )

    const input = getByLabelText('phone')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('john@smith.com')
    expect(input.type).toEqual('tel')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      phone_number: 'phone number invalid',
    }

    const { getByText } = render(
      <MantineProvider>
        <ValidationContext.Provider value={validationErrors}>
          <TelField {...payload} label={'phone'} errorKey={'phone_number'} />
        </ValidationContext.Provider>
      </MantineProvider>
    )

    const errorField = getByText('phone number invalid')
    expect(errorField).not.toBeNull()
  })
})
