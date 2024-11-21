import React from 'react'
import { render } from '@testing-library/react'
import { RangeField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'range',
    defaultValue: '2',
    name: 'post[volume]',
    min: 1,
    max: 9,
    id: 'post_volume',
    step: 2,
  }
}

describe('RangeField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <RangeField {...payload} label={'Volume'} errorKey={'volume'} />
    )

    const input = getByLabelText('Volume')
    expect(input.value).toEqual('2')
    expect(input.type).toEqual('range')
    expect(input.min).toEqual('1')
    expect(input.max).toEqual('9')
    expect(input.step).toEqual('2')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      volume: 'volume invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <RangeField {...payload} label={'Volume'} errorKey={'volume'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('volume invalid')
    expect(errorField).not.toBeNull()
  })
})
