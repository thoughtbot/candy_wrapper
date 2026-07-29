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

    const { getByRole } = render(
      <Checkbox label="Is admin" {...payload} />
    )

    const checkbox = getByRole('checkbox', { name: 'Is admin' })
    expect(checkbox).not.toBeNull()
  })

  it('renders defaultSelected', () => {
    const payload = buildPayload()
    payload.defaultChecked = true

    const { getByRole } = render(
      <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
    )

    const checkbox = getByRole('checkbox', { name: 'Is admin' })
    expect(checkbox.checked).toEqual(true)
  })

  it('renders defaultSelected false', () => {
    const payload = buildPayload()
    payload.defaultChecked = false

    const { getByRole } = render(
      <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
    )

    const checkbox = getByRole('checkbox', { name: 'Is admin' })
    expect(checkbox.checked).toEqual(false)
  })

  it('renders selected', () => {
    const payload = buildPayload()
    delete payload.defaultChecked
    payload.checked = true

    const { getByRole } = render(
      <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
    )

    const checkbox = getByRole('checkbox', { name: 'Is admin' })
    expect(checkbox.checked).toEqual(true)
  })

  it('renders unselected', () => {
    const payload = buildPayload()
    delete payload.defaultChecked
    payload.checked = false

    const { getByRole } = render(
      <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
    )

    const checkbox = getByRole('checkbox', { name: 'Is admin' })
    expect(checkbox.checked).toEqual(false)
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

    const { getByRole } = render(
      <ValidationContext.Provider value={validationErrors}>
        <Checkbox {...payload} label={'Is admin'} errorKey={'is_admin'} />
      </ValidationContext.Provider>
    )

    const checkbox = getByRole('checkbox', { name: 'Is admin' })
    expect(checkbox).not.toBe(null)
    expect(checkbox.getAttribute('aria-invalid')).toEqual('true')
  })
})
