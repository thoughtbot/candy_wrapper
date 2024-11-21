import React from 'react'
import { render } from '@testing-library/react'
import { SearchField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'search',
    defaultValue: 'Hello World',
    name: 'post[search]',
    id: 'post_search',
  }
}

describe('SearchField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <SearchField {...payload} label={'Search Posts'} errorKey={'search'} />
    )

    const input = getByLabelText('Search Posts')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('Hello World')
    expect(input.type).toEqual('search')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      search: 'title invalid',
    }

    const { getByText, getByLabelText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <SearchField {...payload} label={'Search Posts'} errorKey={'search'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('title invalid')
    expect(errorField).not.toBeNull()

    const input = getByLabelText('Search Posts')
    expect(input.value).toEqual('Hello World')
  })
})
