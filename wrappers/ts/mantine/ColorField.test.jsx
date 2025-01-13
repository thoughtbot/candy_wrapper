import React from 'react'
import { render } from '@testing-library/react'
import { ColorField, ValidationContext } from './'
import { MantineProvider } from '@mantine/core'

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
      <MantineProvider>
        <ColorField {...payload} label={'color'} errorKey={'color'} />
      </MantineProvider>
    )

    const input = getByLabelText('color')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('#000000')
    expect(input.classList.contains('mantine-ColorInput-input')).toEqual(true)
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      color: 'color invalid',
    }

    const { getByText } = render(
      <MantineProvider>
        <ValidationContext.Provider value={validationErrors}>
          <ColorField {...payload} label={'color'} errorKey={'color'} />
        </ValidationContext.Provider>
      </MantineProvider>
    )

    const errorField = getByText('color invalid')
    expect(errorField).not.toBeNull()
  })
})
