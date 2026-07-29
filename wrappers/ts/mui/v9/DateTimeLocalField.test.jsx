import React from 'react'
import { render } from '@testing-library/react'
import { DateTimeLocalField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'datetime-local',
    name: 'post[published_at]',
    id: 'post_published_at',
    required: false,
    defaultValue: '2023-01-15T10:30',
  }
}

describe('DateTimeLocalField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <DateTimeLocalField {...payload} label={'Published at'} errorKey={'published_at'} />
    )

    const input = getByLabelText('Published at')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('2023-01-15T10:30')
    expect(input.type).toEqual('datetime-local')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      published_at: 'datetime invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <DateTimeLocalField {...payload} label={'Published at'} errorKey={'published_at'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('datetime invalid')
    expect(errorField).not.toBeNull()
  })
})
