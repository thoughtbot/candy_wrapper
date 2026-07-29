import React from 'react'
import { render } from '@testing-library/react'
import { Select, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'select',
    name: 'post[category]',
    id: 'post_category',
    defaultvalue: '<mus>',
    options: [
      { value: 'abe', label: 'abe' },
      { value: '<mus>', label: '<mus>' },
      { value: 'hest', label: 'hest' },
    ],
  }
}

describe('Select', () => {
  describe('single select', () => {
    it('renders the component', () => {
      const payload = buildPayload()

      const { getByText, container } = render(
        <Select {...payload} label={'category'} />
      )

      const label = getByText('category')
      expect(label).not.toBeNull()

      const dropdown = container.querySelector('.p-dropdown')
      expect(dropdown).not.toBeNull()
    })

    it('excludes a hidden input when includeHidden is false', () => {
      const payload = buildPayload()
      payload.multiple = false
      payload.includeHidden = false

      const { container } = render(
        <Select {...payload} label={'category'} />
      )

      const hiddenInput = container.querySelector('input[type=hidden]')
      expect(hiddenInput).toBe(null)
    })
  })

  describe('multi select', () => {
    it('adds a hidden input on multiple selects if includeHidden is true', () => {
      const payload = buildPayload()
      payload.multiple = true
      payload.defaultvalue = ['<mus>']
      payload.includeHidden = true

      const { container } = render(
        <Select {...payload} label={'category'} />
      )

      const hiddenInputs = container.querySelectorAll('input[type=hidden]')
      expect(hiddenInputs.length).toBeGreaterThanOrEqual(1)

      const emptyHidden = hiddenInputs[0]
      expect(emptyHidden).not.toBe(null)
      expect(emptyHidden.name).toEqual('post[category]')
    })

    it('renders the multiselect component', () => {
      const payload = buildPayload()
      payload.multiple = true
      payload.defaultvalue = ['<mus>']

      const { getByText, container } = render(
        <Select {...payload} label={'category'} />
      )

      const label = getByText('category')
      expect(label).not.toBeNull()

      const multiselect = container.querySelector('.p-multiselect')
      expect(multiselect).not.toBeNull()
    })

    it('renders hidden inputs for selected values', () => {
      const payload = buildPayload()
      payload.multiple = true
      payload.defaultvalue = ['abe', 'hest']
      payload.includeHidden = true

      const { container } = render(
        <Select {...payload} label={'category'} />
      )

      const hiddenInputs = container.querySelectorAll('input[type=hidden]')
      const valueInputs = Array.from(hiddenInputs).filter(
        (input) => input.value !== ''
      )
      expect(valueInputs.length).toEqual(2)
      expect(valueInputs[0].value).toEqual('abe')
      expect(valueInputs[1].value).toEqual('hest')
    })
  })

  describe('nested options', () => {
    it('flattens nested option groups', () => {
      const payload = {
        type: 'select',
        name: 'post[category]',
        id: 'post_category',
        includeHidden: true,
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

      const { getByText } = render(
        <Select {...payload} label={'category'} />
      )

      const label = getByText('category')
      expect(label).not.toBeNull()
    })
  })

  describe('errors', () => {
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
