import React from 'react'
import { render } from '@testing-library/react'
import { TextArea, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'text',
    name: 'post[category]',
    id: 'post_category',
    required: false,
    defaultValue: 'books',
  }
}

describe('TextArea', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByRole } = render(
      <TextArea {...payload} label={'category'} errorKey={'category'} />
    )

    const input = getByRole('textbox', { name: 'category' })
    expect(input).not.toBeNull()
    expect(input.value).toEqual('books')
    expect(input.tagName.toLowerCase()).toEqual('textarea')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      category: 'title invalid',
    }

    const { getByText, getByRole } = render(
      <ValidationContext.Provider value={validationErrors}>
        <TextArea {...payload} label={'category'} errorKey={'category'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('title invalid')
    expect(errorField).not.toBeNull()

    const input = getByRole('textbox', { name: 'category' })
    expect(input.value).toEqual('books')
  })
})
