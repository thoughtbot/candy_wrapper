import React from 'react'
import { render } from '@testing-library/react'
import { TimeField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'time',
    name: 'post[start_time]',
    id: 'post_start_time',
    required: false,
    defaultValue: '10:30',
  }
}

describe('TimeField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <TimeField {...payload} label={'Start time'} errorKey={'start_time'} />
    )

    const input = getByLabelText('Start time')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('10:30')
    expect(input.type).toEqual('time')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      start_time: 'time invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <TimeField {...payload} label={'Start time'} errorKey={'start_time'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('time invalid')
    expect(errorField).not.toBeNull()
  })
})
