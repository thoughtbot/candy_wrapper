import React from 'react'
import { render } from '@testing-library/react'
import { MonthField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'month',
    defaultValue: '2004-06',
    name: 'post[written_on]',
    id: 'post_written_on',
  }
}

describe('MonthField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByRole } = render(
      <MonthField {...payload} label={'Month'} errorKey={'month'} />
    )

    const input = getByRole('textbox', { name: 'Month' })
    expect(input).not.toBeNull()
    expect(input.value).toEqual('2004-06')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      month: 'Month invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <MonthField {...payload} label={'Month'} errorKey={'month'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('Month invalid')
    expect(errorField).not.toBeNull()
  })
})
