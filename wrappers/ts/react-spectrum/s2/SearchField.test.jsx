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

    const { getByRole } = render(
      <SearchField {...payload} label={'Search Posts'} errorKey={'search'} />
    )

    const input = getByRole('searchbox', { name: 'Search Posts' })
    expect(input).not.toBeNull()
    expect(input.value).toEqual('Hello World')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      search: 'title invalid',
    }

    const { getByText, getByRole } = render(
      <ValidationContext.Provider value={validationErrors}>
        <SearchField {...payload} label={'Search Posts'} errorKey={'search'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('title invalid')
    expect(errorField).not.toBeNull()

    const input = getByRole('searchbox', { name: 'Search Posts' })
    expect(input.value).toEqual('Hello World')
  })
})
