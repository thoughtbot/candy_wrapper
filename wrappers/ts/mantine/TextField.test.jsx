import React from 'react'
import { render } from '@testing-library/react'
import { TextField, ValidationContext } from '.'
import { MantineProvider } from '@mantine/core'

const buildPayload = () => {
  return {
    type: 'text',
    name: 'post[category]',
    id: 'post_category',
    required: false,
    defaultValue: 'books',
  }
}

describe('TextField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <MantineProvider>
        <TextField {...payload} label={'category'} errorKey={'category'} />
      </MantineProvider>
    )

    const input = getByLabelText('category')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('books')
    expect(input.type).toEqual('text')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      category: 'title invalid',
    }

    const { getByText, getByLabelText } = render(
      <MantineProvider>
        <ValidationContext.Provider value={validationErrors}>
          <TextField {...payload} label={'category'} errorKey={'category'} />
        </ValidationContext.Provider>
      </MantineProvider>
    )

    const errorField = getByText('title invalid')
    expect(errorField).not.toBeNull()

    const input = getByLabelText('category')
    expect(input.value).toEqual('books')
  })
})
