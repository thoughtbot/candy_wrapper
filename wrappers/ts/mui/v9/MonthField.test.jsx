import React from 'react'
import { render } from '@testing-library/react'
import { MonthField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'month',
    name: 'post[birth_month]',
    id: 'post_birth_month',
    required: false,
    defaultValue: '2023-01',
  }
}

describe('MonthField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <MonthField {...payload} label={'Birth month'} errorKey={'birth_month'} />
    )

    const input = getByLabelText('Birth month')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('2023-01')
    expect(input.type).toEqual('month')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      birth_month: 'month invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <MonthField
          {...payload}
          label={'Birth month'}
          errorKey={'birth_month'}
        />
      </ValidationContext.Provider>
    )

    const errorField = getByText('month invalid')
    expect(errorField).not.toBeNull()
  })
})
