import React from 'react'
import { render } from '@testing-library/react'
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
    it('adds a hidden input on multiple selects if includeHidden is true', () => {
      const payload = buildPayload()
      payload.multiple = true
      payload.defaultValue = [payload.defaultValue]
      payload.includeHidden = true

      const { container } = render(
        <Select {...payload} label={'category'} />
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
        <Select {...payload} label={'category'} />
      )

      const hiddenInput = container.querySelector('input[type=hidden]')
      expect(hiddenInput).toBe(null)
    })

    it('renders the component with options', async () => {
      const payload = {
        type: 'select',
        name: 'post[category]',
        id: 'post_category',
        required: true,
        defaultValue: '<mus>',
        includeHidden: false,
        options: [
          { value: '', label: 'Choose a category' },
          { value: 'abe', label: 'abe' },
          { value: '<mus>', label: '<mus>' },
          { value: 'hest', label: 'hest' },
        ],
      }

      const { getByRole } = render(
        <Select {...payload} label={'category'} />
      )

      const combobox = getByRole('combobox')
      expect(combobox).not.toBeNull()
    })

    it('renders with nested options (optgroup flattened to MenuItems)', async () => {
      const payload = {
        type: 'select',
        name: 'post[category]',
        id: 'post_category',
        includeHidden: false,
        defaultValue: 'abe',
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
        <Select {...payload} label={'category'} />
      )

      const combobox = getByRole('combobox')
      expect(combobox).not.toBeNull()
    })

    it('renders with errors', async () => {
      const payload = buildPayload()

      const validationErrors = {
        category: 'category invalid',
      }

      const { getByText } = render(
        <ValidationContext.Provider value={validationErrors}>
          <Select {...payload} label={'category'} errorKey={'category'} />
        </ValidationContext.Provider>
      )

      const errorField = getByText('category invalid')
      expect(errorField).not.toBeNull()
    })
  })
})
