import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { RangeField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'range',
    defaultValue: '2',
    name: 'post[volume]',
    min: 1,
    max: 9,
    id: 'post_volume',
    step: 2,
  }
}

describe('RangeField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByRole } = render(
      <ChakraProvider value={defaultSystem}>
        <RangeField {...payload} label={'Volume'} errorKey={'volume'} />
      </ChakraProvider>
    )

    const slider = getByRole('slider', { hidden: true })
    expect(slider).not.toBeNull()
  })

  it('renders a hidden input with the name', () => {
    const payload = buildPayload()

    const { container } = render(
      <ChakraProvider value={defaultSystem}>
        <RangeField {...payload} label={'Volume'} errorKey={'volume'} />
      </ChakraProvider>
    )

    const hiddenInput = container.querySelector('input[hidden]')
    expect(hiddenInput).not.toBeNull()
    expect(hiddenInput.name).toEqual('post[volume]')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      volume: 'volume invalid',
    }

    const { getByText } = render(
      <ChakraProvider value={defaultSystem}>
        <ValidationContext.Provider value={validationErrors}>
          <RangeField {...payload} label={'Volume'} errorKey={'volume'} />
        </ValidationContext.Provider>
      </ChakraProvider>
    )

    const errorField = getByText('volume invalid')
    expect(errorField).not.toBeNull()
  })
})
