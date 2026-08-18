import React from 'react'
import { render } from '@testing-library/react'
import { FileField, ValidationContext } from '.'
import { MantineProvider } from '@mantine/core'

const buildPayload = () => {
  return {
    type: 'file',
    name: 'post[attachment]',
    id: 'post_attachment',
    required: false,
  }
}

describe('FileField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <MantineProvider>
        <FileField {...payload} label={'attachment'} errorKey={'attachment'} />
      </MantineProvider>
    )

    const button = getByLabelText('attachment')
    expect(button.classList.contains('mantine-FileInput-input')).toEqual(true)

    const input = document.querySelector('[name="post[attachment]"]')
    expect(input.required).toBeFalsy()
    expect(input.type).toEqual('file')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      attachment: 'attachment invalid',
    }

    const { getByText } = render(
      <MantineProvider>
        <ValidationContext.Provider value={validationErrors}>
          <FileField
            {...payload}
            label={'attachment'}
            errorKey={'attachment'}
          />
        </ValidationContext.Provider>
      </MantineProvider>
    )

    const errorField = getByText('attachment invalid')
    expect(errorField).not.toBeNull()
  })
})
