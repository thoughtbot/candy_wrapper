import React from 'react'
import { render } from '@testing-library/react'
import { TimeField } from '.'
import { ValidationContext } from '../../../src'

const buildPayload = () => {
  return {
    type: 'time',
    step: 60,
    defaultValue: '15:02:00.000',
    min: '10:25:00.000',
    max: '20:45:30.000',
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
    expect(input.value).toEqual('15:02')
    expect(input.type).toEqual('time')
    expect(input.min).toEqual('10:25:00.000')
    expect(input.max).toEqual('20:45:30.000')
    expect(input.step).toEqual('60')
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
