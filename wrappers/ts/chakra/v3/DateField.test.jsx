import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { DateField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'date',
    name: 'post[publish_date]',
    id: 'post_publish_date',
    required: false,
    defaultValue: '2024-01-01',
  }
}

describe('DateField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <ChakraProvider value={defaultSystem}>
        <DateField
          {...payload}
          label={'Publish date'}
          errorKey={'publish_date'}
        />
      </ChakraProvider>
    )

    const input = getByLabelText('Publish date')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('2024-01-01')
    expect(input.type).toEqual('date')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      publish_date: 'date invalid',
    }

    const { getByText } = render(
      <ChakraProvider value={defaultSystem}>
        <ValidationContext.Provider value={validationErrors}>
          <DateField
            {...payload}
            label={'Publish date'}
            errorKey={'publish_date'}
          />
        </ValidationContext.Provider>
      </ChakraProvider>
    )

    const errorField = getByText('date invalid')
    expect(errorField).not.toBeNull()
  })
})
