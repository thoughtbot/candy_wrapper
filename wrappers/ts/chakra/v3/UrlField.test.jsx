import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { UrlField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'url',
    name: 'post[website]',
    id: 'post_website',
    required: false,
    defaultValue: 'https://example.com',
  }
}

describe('UrlField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <ChakraProvider value={defaultSystem}>
        <UrlField {...payload} label={'Website'} errorKey={'website'} />
      </ChakraProvider>
    )

    const input = getByLabelText('Website')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('https://example.com')
    expect(input.type).toEqual('url')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      website: 'url invalid',
    }

    const { getByText } = render(
      <ChakraProvider value={defaultSystem}>
        <ValidationContext.Provider value={validationErrors}>
          <UrlField {...payload} label={'Website'} errorKey={'website'} />
        </ValidationContext.Provider>
      </ChakraProvider>
    )

    const errorField = getByText('url invalid')
    expect(errorField).not.toBeNull()
  })
})
