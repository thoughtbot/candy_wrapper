import React from 'react'
import { render } from '@testing-library/react'
import { MonthField } from '.'
import { ValidationContext } from '../../../src'

const buildPayload = () => {
  return {
    type: 'month',
    defaultValue: '2004-06',
    step: 2,
    max: '2010-12',
    min: '2000-02',
    name: 'post[written_on]',
    id: 'post_written_on',
  }
}

describe('MonthField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <MonthField {...payload} label={'Month'} errorKey={'month'} />
    )

    const input = getByLabelText('Month')
    expect(input.value).toEqual('2004-06')
    expect(input.type).toEqual('month')
    expect(input.max).toEqual('2010-12')
    expect(input.min).toEqual('2000-02')
    expect(input.step).toEqual('2')
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
