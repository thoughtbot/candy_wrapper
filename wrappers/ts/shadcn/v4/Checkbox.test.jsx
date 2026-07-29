import React from 'react'
import { render } from '@testing-library/react'
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

    const { getByRole, container } = render(
      <form>
        <Checkbox label="Is admin" {...payload} />
      </form>
    )

    const element = getByRole('checkbox')
    expect(element).not.toBe(null)
    expect(element.getAttribute('value')).toEqual('1')

    const nativeInput = container.querySelector('input[type="checkbox"]')
    expect(nativeInput).not.toBe(null)
    expect(nativeInput.name).toEqual('post[admin]')
    expect(nativeInput.value).toEqual('1')
  })

  it('renders defaultChecked true', () => {
    const payload = buildPayload()
    payload.defaultChecked = true

    const { getByRole } = render(
      <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
    )

    const element = getByRole('checkbox')
    expect(element.getAttribute('data-state')).toEqual('checked')
  })

  it('renders defaultChecked false', () => {
    const payload = buildPayload()
    payload.defaultChecked = false

    const { getByRole } = render(
      <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
    )

    const element = getByRole('checkbox')
    expect(element.getAttribute('data-state')).toEqual('unchecked')
  })

  it('renders the label', () => {
    const payload = buildPayload()

    const { getByText } = render(
      <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
    )

    const label = getByText('Is admin')
    expect(label).not.toBe(null)
  })

  it('adds a hidden input if includeHidden is true', () => {
    const payload = buildPayload()
    payload.includeHidden = true
    payload.uncheckedValue = '10'

    const { container } = render(
      <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
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
      <ValidationContext.Provider value={validationErrors}>
        <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
      </ValidationContext.Provider>
    )

    const element = getByText('Admin invalid')
    expect(element).not.toBe(null)
  })
})
