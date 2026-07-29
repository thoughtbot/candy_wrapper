import React from 'react'
import { render } from '@testing-library/react'
import { FileField, ValidationContext } from '.'

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

    const { getByRole } = render(
      <FileField {...payload} label={'attachment'} errorKey={'attachment'} />
    )

    const button = getByRole('button', { name: 'attachment' })
    expect(button).not.toBeNull()
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      attachment: 'attachment invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <FileField {...payload} label={'attachment'} errorKey={'attachment'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('attachment invalid')
    expect(errorField).not.toBeNull()
  })
})
