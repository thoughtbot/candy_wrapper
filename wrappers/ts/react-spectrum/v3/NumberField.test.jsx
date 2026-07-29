import React from 'react'
import { render } from '@testing-library/react'
import { Provider, defaultTheme } from '@adobe/react-spectrum'
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

    const { getByRole, container } = render(
      <Provider theme={defaultTheme}>
        <NumberField {...payload} label={'Favs'} errorKey={'favs'} />
      </Provider>
    )

    const input = getByRole('textbox', { name: 'Favs' })
    expect(input).not.toBeNull()

    const hiddenInput = container.querySelector('input[type=hidden][name="post[favs]"]')
    expect(hiddenInput).not.toBeNull()
    expect(hiddenInput.value).toEqual('2')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      favs: 'favs invalid',
    }

    const { getByText } = render(
      <Provider theme={defaultTheme}>
        <ValidationContext.Provider value={validationErrors}>
          <NumberField {...payload} label={'Favs'} errorKey={'favs'} />
        </ValidationContext.Provider>
      </Provider>
    )

    const errorField = getByText('favs invalid')
    expect(errorField).not.toBeNull()
  })
})
