import React from 'react'
import { render } from '@testing-library/react'
import { SearchField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'search',
    name: 'post[query]',
    id: 'post_query',
    required: false,
    defaultValue: 'rails',
  }
}

describe('SearchField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <SearchField {...payload} label={'Query'} errorKey={'query'} />
    )

    const input = getByLabelText('Query')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('rails')
    expect(input.type).toEqual('search')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      query: 'query invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <SearchField {...payload} label={'Query'} errorKey={'query'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('query invalid')
    expect(errorField).not.toBeNull()
  })
})
