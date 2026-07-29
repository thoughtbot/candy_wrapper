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

    const { getByRole } = render(
      <RangeField {...payload} label={'Volume'} errorKey={'volume'} />
    )

    const slider = getByRole('slider')
    expect(slider).not.toBeNull()
    expect(slider.getAttribute('aria-valuenow')).toEqual('2')
    expect(slider.getAttribute('aria-valuemin')).toEqual('1')
    expect(slider.getAttribute('aria-valuemax')).toEqual('9')
  })

  it('renders the label', () => {
    const payload = buildPayload()

    const { getByText } = render(
      <RangeField {...payload} label={'Volume'} errorKey={'volume'} />
    )

    expect(getByText('Volume')).not.toBeNull()
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
