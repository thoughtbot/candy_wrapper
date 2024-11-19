import React from 'react'
import { render } from '@testing-library/react'
import { ColorField } from './'
import { ValidationContext } from '../../../src'

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

    const { getByLabelText } = render(
      <ColorField {...payload} label={'color'} errorKey={'color'} />
    )

    const input = getByLabelText('color')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('#000000')
    expect(input.type).toEqual('color')
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
