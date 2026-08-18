import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { SearchField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'search',
    name: 'post[query]',
    id: 'post_query',
    required: false,
    defaultValue: 'hello',
  }
}

describe('SearchField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <ChakraProvider value={defaultSystem}>
        <SearchField {...payload} label={'Query'} errorKey={'query'} />
      </ChakraProvider>
    )

    const input = getByLabelText('Query')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('hello')
    expect(input.type).toEqual('search')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      query: 'query invalid',
    }

    const { getByText } = render(
      <ChakraProvider value={defaultSystem}>
        <ValidationContext.Provider value={validationErrors}>
          <SearchField {...payload} label={'Query'} errorKey={'query'} />
        </ValidationContext.Provider>
      </ChakraProvider>
    )

    const errorField = getByText('query invalid')
    expect(errorField).not.toBeNull()
  })
})
