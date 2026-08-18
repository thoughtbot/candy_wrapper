import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { Checkbox, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'checkbox',
    value: '1',
    uncheckedValue: '0',
    defaultChecked: true,
    name: 'post[admin]',
    id: 'post_admin',
  }
}

describe('Checkbox', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByRole } = render(
      <ChakraProvider value={defaultSystem}>
        <Checkbox label="Is admin" {...payload} />
      </ChakraProvider>
    )

    const element = getByRole('checkbox')
    expect(element).not.toBe(null)
    expect(element.value).toEqual('1')
    expect(element.type).toEqual('checkbox')
  })

  it('renders the label', () => {
    const payload = buildPayload()

    const { getByText } = render(
      <ChakraProvider value={defaultSystem}>
        <Checkbox label="Is admin" {...payload} />
      </ChakraProvider>
    )

    expect(getByText('Is admin')).not.toBeNull()
  })

  it('renders defaultChecked', () => {
    const payload = buildPayload()
    payload.defaultChecked = true

    const { getByRole } = render(
      <ChakraProvider value={defaultSystem}>
        <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
      </ChakraProvider>
    )

    const input = getByRole('checkbox')
    expect(input.checked).toEqual(true)
  })

  it('renders defaultChecked false', () => {
    const payload = buildPayload()
    payload.defaultChecked = false

    const { getByRole } = render(
      <ChakraProvider value={defaultSystem}>
        <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
      </ChakraProvider>
    )

    const input = getByRole('checkbox')
    expect(input.checked).toEqual(false)
  })

  it('renders checked', () => {
    const payload = buildPayload()
    delete payload.defaultChecked
    payload.checked = true

    const { getByRole } = render(
      <ChakraProvider value={defaultSystem}>
        <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
      </ChakraProvider>
    )

    const input = getByRole('checkbox')
    expect(input.checked).toEqual(true)
  })

  it('renders unchecked', () => {
    const payload = buildPayload()
    delete payload.defaultChecked
    payload.checked = false

    const { getByRole } = render(
      <ChakraProvider value={defaultSystem}>
        <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
      </ChakraProvider>
    )

    const input = getByRole('checkbox')
    expect(input.checked).toEqual(false)
  })

  it('adds a hidden input if includeHidden is true', () => {
    const payload = buildPayload()
    payload.includeHidden = true
    payload.uncheckedValue = '10'

    const { container } = render(
      <ChakraProvider value={defaultSystem}>
        <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
      </ChakraProvider>
    )

    const hiddenInput = container.querySelector('input[type=hidden]')
    expect(hiddenInput).not.toBe(null)
    expect(hiddenInput.name).toEqual('post[admin]')
    expect(hiddenInput.value).toEqual('10')
  })

  it('renders with errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      is_admin: 'Admin invalid',
    }

    const { getByText } = render(
      <ChakraProvider value={defaultSystem}>
        <ValidationContext.Provider value={validationErrors}>
          <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
        </ValidationContext.Provider>
      </ChakraProvider>
    )

    const element = getByText('Admin invalid')
    expect(element).not.toBe(null)
  })
})
