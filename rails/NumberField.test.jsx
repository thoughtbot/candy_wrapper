import React from 'react'
import { render } from '@testing-library/react'
import { NumberField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'number',
    defaultValue: '2',
    name: 'post[favs]',
    min: 1,
    max: 9,
    id: 'post_favs',
    step: 2
  }
}

describe('NumberField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <NumberField {...payload} label={'Favs'} errorKey={'favs'} />
    )

    const input = getByLabelText('Favs')
    expect(input.value).toEqual('2')
    expect(input.type).toEqual('number')
    expect(input.min).toEqual('1')
    expect(input.max).toEqual('9')
    expect(input.step).toEqual('2')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      favs: 'favs invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <NumberField {...payload} label={'Favs'} errorKey={'favs'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('favs invalid')
    expect(errorField).not.toBeNull()
  })
})
