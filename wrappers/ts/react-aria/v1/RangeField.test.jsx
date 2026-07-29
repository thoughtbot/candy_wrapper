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

    const { getByRole, container } = render(
      <RangeField {...payload} label={'Volume'} errorKey={'volume'} />
    )

    const slider = getByRole('slider')
    expect(slider).not.toBeNull()

    const hiddenInput = container.querySelector('input[type="hidden"]')
    expect(hiddenInput).not.toBeNull()
    expect(hiddenInput.name).toEqual('post[volume]')
    expect(hiddenInput.value).toEqual('2')
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
