import React from 'react'
import { render } from '@testing-library/react'
import { Provider, defaultTheme } from '@adobe/react-spectrum'
import { Select, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'select',
    name: 'post[category]',
    id: 'post_category',
    defaultValue: '<mus>',
    options: [
      { value: 'abe', label: 'abe' },
      { value: '<mus>', label: '<mus>' },
      { value: 'hest', label: 'hest' },
    ],
  }
}

describe('Select', () => {
  describe('rendering', () => {
    it('renders a Picker with the correct label', () => {
      const payload = buildPayload()

      const { getByRole } = render(
        <Provider theme={defaultTheme}>
          <Select {...payload} label={'category'} />
        </Provider>
      )

      const button = getByRole('button', { name: /category/ })
      expect(button).not.toBeNull()
    })

    it('adds a hidden input on multiple selects if includeHidden is true', () => {
      const payload = buildPayload()
      payload.multiple = true
      payload.defaultValue = [payload.defaultValue]
      payload.includeHidden = true

      const { container } = render(
        <Provider theme={defaultTheme}>
          <Select {...payload} label={'category'} />
        </Provider>
      )

      const hiddenInput = container.querySelector('input[type=hidden]')
      expect(hiddenInput).not.toBe(null)
      expect(hiddenInput.name).toEqual('post[category]')
    })

    it('excludes a hidden input on multiple selects if includeHidden is false', () => {
      const payload = buildPayload()
      payload.multiple = false
      payload.includeHidden = false

      const { container } = render(
        <Provider theme={defaultTheme}>
          <Select {...payload} label={'category'} />
        </Provider>
      )

      const hiddenInput = container.querySelector(
        'input[type=hidden][name="post[category]"]'
      )
      expect(hiddenInput).toBe(null)
    })

    it('renders with nested options (groups)', () => {
      const payload = {
        type: 'select',
        name: 'post[category]',
        id: 'post_category',
        includeHidden: false,
        options: [
          { value: 'abe', label: 'abe' },
          {
            label: 'sports',
            options: [
              { value: 'soccer', label: 'Soccer' },
              { value: 'baseball', label: 'Baseball' },
            ],
          },
          { value: 'hest', label: 'hest' },
        ],
      }

      const { getByRole } = render(
        <Provider theme={defaultTheme}>
          <Select {...payload} label={'category'} />
        </Provider>
      )

      const button = getByRole('button', { name: /category/ })
      expect(button).not.toBeNull()
    })
  })
})
