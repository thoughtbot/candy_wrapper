import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
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

    const { getByLabelText } = render(
      <ChakraProvider value={defaultSystem}>
        <FileField {...payload} label={'attachment'} errorKey={'attachment'} />
      </ChakraProvider>
    )

    const input = getByLabelText('attachment')
    expect(input.required).toBeFalsy()
    expect(input.type).toEqual('file')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      attachment: 'attachment invalid',
    }

    const { getByText } = render(
      <ChakraProvider value={defaultSystem}>
        <ValidationContext.Provider value={validationErrors}>
          <FileField {...payload} label={'attachment'} errorKey={'attachment'} />
        </ValidationContext.Provider>
      </ChakraProvider>
    )

    const errorField = getByText('attachment invalid')
    expect(errorField).not.toBeNull()
  })
})
