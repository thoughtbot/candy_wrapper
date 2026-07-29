import React from 'react'
import { render } from '@testing-library/react'
import { DateField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'date',
    name: 'post[published_on]',
    id: 'post_published_on',
    required: false,
    defaultValue: '2023-01-15',
  }
}

describe('DateField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <DateField {...payload} label={'Published on'} errorKey={'published_on'} />
    )

    const input = getByLabelText('Published on')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('2023-01-15')
    expect(input.type).toEqual('date')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      published_on: 'date invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <DateField {...payload} label={'Published on'} errorKey={'published_on'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('date invalid')
    expect(errorField).not.toBeNull()
  })
})
