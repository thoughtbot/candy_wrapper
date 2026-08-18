import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { DateTimeLocalField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'datetime-local',
    name: 'post[published_at]',
    id: 'post_published_at',
    required: false,
    defaultValue: '2024-01-01T12:00',
  }
}

describe('DateTimeLocalField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <ChakraProvider value={defaultSystem}>
        <DateTimeLocalField
          {...payload}
          label={'Published at'}
          errorKey={'published_at'}
        />
      </ChakraProvider>
    )

    const input = getByLabelText('Published at')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('2024-01-01T12:00')
    expect(input.type).toEqual('datetime-local')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      published_at: 'datetime invalid',
    }

    const { getByText } = render(
      <ChakraProvider value={defaultSystem}>
        <ValidationContext.Provider value={validationErrors}>
          <DateTimeLocalField
            {...payload}
            label={'Published at'}
            errorKey={'published_at'}
          />
        </ValidationContext.Provider>
      </ChakraProvider>
    )

    const errorField = getByText('datetime invalid')
    expect(errorField).not.toBeNull()
  })
})
