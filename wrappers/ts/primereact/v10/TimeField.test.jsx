import React from 'react'
import { render } from '@testing-library/react'
import { TimeField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'time',
    step: 60,
    defaultValue: '15:02:00.000',
    name: 'post[birth_time]',
    id: 'post_birth_time',
  }
}

describe('TimeField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <TimeField {...payload} label={'Birth Time'} errorKey={'birth_time'} />
    )

    const input = getByLabelText('Birth Time')
    expect(input).not.toBeNull()
    expect(input.tagName.toLowerCase()).toEqual('input')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      birth_time: 'Birth Time invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <TimeField {...payload} label={'Birth Time'} errorKey={'birth_time'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('Birth Time invalid')
    expect(errorField).not.toBeNull()
  })
})
