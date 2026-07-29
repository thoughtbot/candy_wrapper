import React from 'react'
import { render } from '@testing-library/react'
import { ColorField, ValidationContext } from './'

const buildPayload = () => {
  return {
    type: 'color',
    name: 'post[color]',
    id: 'post_color',
    required: false,
    defaultValue: '#000000',
  }
}

describe('ColorField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByText, container } = render(
      <ColorField {...payload} label={'color'} errorKey={'color'} />
    )

    const label = getByText('color')
    expect(label).not.toBeNull()

    const colorPicker = container.querySelector('.p-colorpicker')
    expect(colorPicker).not.toBeNull()
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      color: 'color invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <ColorField {...payload} label={'color'} errorKey={'color'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('color invalid')
    expect(errorField).not.toBeNull()
  })
})
