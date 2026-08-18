import React from 'react'
import { render } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { Select } from '.'

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
        <ChakraProvider value={defaultSystem}>
          <Select {...payload} label={'category'} />
        </ChakraProvider>
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
        <ChakraProvider value={defaultSystem}>
          <Select {...payload} label={'category'} />
        </ChakraProvider>
      )

      const hiddenInput = container.querySelector('input[type=hidden]')
      expect(hiddenInput).toBe(null)
    })

    it('renders the component with default value', async () => {
      const payload = buildPayload()

      const { getByText, container } = render(
        <ChakraProvider value={defaultSystem}>
          <Select {...payload} label={'category'} />
        </ChakraProvider>
      )

      const label = getByText('category')
      expect(label).not.toBeNull()

      const hiddenSelect = container.querySelector('select[name="post[category]"]')
      expect(hiddenSelect).not.toBeNull()
      expect(hiddenSelect.value).toEqual('<mus>')
    })

    it('renders with nested options', async () => {
      const payload = {
        type: 'select',
        name: 'post[category]',
        id: 'post_category',
        includeHidden: true,
        defaultValue: 'soccer',
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

      const { getByText, container } = render(
        <ChakraProvider value={defaultSystem}>
          <Select {...payload} label={'category'} />
        </ChakraProvider>
      )

      const label = getByText('category')
      expect(label).not.toBeNull()

      const hiddenSelect = container.querySelector('select[name="post[category]"]')
      expect(hiddenSelect).not.toBeNull()
      expect(hiddenSelect.value).toEqual('soccer')
    })
  })
})
