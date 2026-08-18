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
    step: 2,
  }
}

describe('NumberField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { container } = render(
      <NumberField {...payload} label={'Favs'} errorKey={'favs'} />
    )

    const input = container.querySelector('input[name="post[favs]"]')
    expect(input).not.toBeNull()
    expect(input.value).toEqual('3') // step=2 from min=1 rounds 2 to 3
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
