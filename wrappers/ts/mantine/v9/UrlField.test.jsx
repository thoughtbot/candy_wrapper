import React from 'react'
import { render } from '@testing-library/react'
import { UrlField, ValidationContext } from '.'
import { MantineProvider } from '@mantine/core'

const buildPayload = () => {
  return {
    type: 'url',
    name: 'post[url]',
    id: 'post_url',
    required: false,
    defaultValue: 'https://google.com',
  }
}

describe('UrlField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <MantineProvider>
        <UrlField {...payload} label={'Url'} errorKey={'url'} />
      </MantineProvider>
    )

    const input = getByLabelText('Url')
    expect(input.value).toEqual('https://google.com')
    expect(input.type).toEqual('url')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      url: 'Url invalid',
    }

    const { getByText } = render(
      <MantineProvider>
        <ValidationContext.Provider value={validationErrors}>
          <UrlField {...payload} label={'Url'} errorKey={'url'} />
        </ValidationContext.Provider>
      </MantineProvider>
    )

    const errorField = getByText('Url invalid')
    expect(errorField).not.toBeNull()
  })
})
