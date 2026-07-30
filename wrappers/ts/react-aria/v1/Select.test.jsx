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
    it('renders the component with a trigger button', () => {
      const payload = buildPayload()

      const { getByRole } = render(<Select {...payload} label={'category'} />)

      const button = getByRole('button')
      expect(button).not.toBeNull()
    })

    it('renders with a label', () => {
      const payload = buildPayload()

      const { getByText } = render(<Select {...payload} label={'category'} />)

      const label = getByText('category')
      expect(label).not.toBeNull()
    })

    it('adds a hidden input on multiple selects if includeHidden is true', () => {
      const payload = buildPayload()
      payload.multiple = true
      payload.defaultValue = [payload.defaultValue]
      payload.includeHidden = true

      const { container } = render(<Select {...payload} label={'category'} />)

      const hiddenInput = container.querySelector('input[type=hidden]')
      expect(hiddenInput).not.toBe(null)
      expect(hiddenInput.name).toEqual('post[category]')
    })

    it('excludes a hidden input on single selects if includeHidden is false', () => {
      const payload = buildPayload()
      payload.multiple = false
      payload.includeHidden = false

      const { container } = render(<Select {...payload} label={'category'} />)

      const hiddenInput = container.querySelector('input[type=hidden]')
      expect(hiddenInput).toBe(null)
    })

    it('renders with nested options flattened', () => {
      const payload = {
        type: 'select',
        name: 'post[category]',
        id: 'post_category',
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

      const { getByRole } = render(<Select {...payload} label={'category'} />)

      const button = getByRole('button')
      expect(button).not.toBeNull()
    })

    it('renders with field errors', async () => {
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
