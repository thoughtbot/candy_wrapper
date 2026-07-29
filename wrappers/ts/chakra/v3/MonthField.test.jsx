import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { MonthField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'month',
    name: 'post[month]',
    id: 'post_month',
    required: false,
    defaultValue: '2024-01',
  }
}

describe('MonthField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <ChakraProvider value={defaultSystem}>
        <MonthField {...payload} label={'Month'} errorKey={'month'} />
      </ChakraProvider>
    )

    const input = getByLabelText('Month')
    expect(input.required).toBeFalsy()
    expect(input.value).toEqual('2024-01')
    expect(input.type).toEqual('month')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      month: 'month invalid',
    }

    const { getByText } = render(
      <ChakraProvider value={defaultSystem}>
        <ValidationContext.Provider value={validationErrors}>
          <MonthField {...payload} label={'Month'} errorKey={'month'} />
        </ValidationContext.Provider>
      </ChakraProvider>
    )

    const errorField = getByText('month invalid')
    expect(errorField).not.toBeNull()
  })
})
