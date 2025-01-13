import React from 'react'
import { render } from '@testing-library/react'
import { Checkbox, ValidationContext } from '.'
import { MantineProvider } from '@mantine/core'

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

    const { getByLabelText } = render(
      <MantineProvider>
        <Checkbox label="Is admin" {...payload} />
      </MantineProvider>
    )

    const element = getByLabelText('Is admin')
    expect(element).not.toBe(null)

    expect(element.required).toBeFalsy()
    expect(element.value).toEqual('1')
    expect(element.type).toEqual('checkbox')
  })

  it('renders defaultSelected', () => {
    const payload = buildPayload()
    payload.defaultChecked = true

    const { getByLabelText } = render(
      <MantineProvider>
        <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
      </MantineProvider>
    )

    const input = getByLabelText('Is admin')
    expect(input.checked).toEqual(true)
  })

  it('renders defaultSelected false', () => {
    const payload = buildPayload()
    payload.defaultChecked = false

    const { getByLabelText } = render(
      <MantineProvider>
        <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
      </MantineProvider>
    )

    const input = getByLabelText('Is admin')
    expect(input.checked).toEqual(false)
  })

  it('renders selected', () => {
    const payload = buildPayload()
    delete payload.defaultChecked
    payload.checked = true

    const { getByLabelText } = render(
      <MantineProvider>
        <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
      </MantineProvider>
    )

    const input = getByLabelText('Is admin')
    expect(input.checked).toEqual(true)
  })

  it('renders unselected', () => {
    const payload = buildPayload()
    delete payload.defaultChecked
    payload.checked = false

    const { getByLabelText } = render(
      <MantineProvider>
        <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
      </MantineProvider>
    )
    const input = getByLabelText('Is admin')
    expect(input.checked).toEqual(false)
  })

  it('adds a hidden input if includeHidden is true', () => {
    const payload = buildPayload()
    payload.includeHidden = true
    payload.uncheckedValue = '10'

    const { container } = render(
      <MantineProvider>
        <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
      </MantineProvider>
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
      <MantineProvider>
        <ValidationContext.Provider value={validationErrors}>
          <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
        </ValidationContext.Provider>
      </MantineProvider>
    )

    const element = getByText('Admin invalid')
    expect(element).not.toBe(null)
  })
})
