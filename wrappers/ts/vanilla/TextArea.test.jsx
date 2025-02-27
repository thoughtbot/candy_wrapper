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

    const { getByLabelText } = render(
      <TextArea {...payload} label={'category'} errorKey={'category'} />
    )

    const input = getByLabelText('category')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('books')
    expect(input.type).toEqual('textarea')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      category: 'title invalid',
    }

    const { getByText, getByLabelText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <TextArea {...payload} label={'category'} errorKey={'category'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('title invalid')
    expect(errorField).not.toBeNull()

    const input = getByLabelText('category')
    expect(input.value).toEqual('books')
  })
})
