import React from 'react'
import { render, within } from '@testing-library/react'
import { Select } from '.'
import { MantineProvider } from '@mantine/core'

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
        <MantineProvider>
          <Select {...payload} />
        </MantineProvider>
      )

      const hiddenInputs = container.querySelectorAll('input[type=hidden]')
      expect(hiddenInputs.length).toEqual(3)

      const hiddenInput = hiddenInputs[0]
      expect(hiddenInput).not.toBe(null)
      expect(hiddenInput.name).toEqual('post[category]')
      expect(hiddenInput.value).toEqual('')
    })

    it('sets the default hidden input to be ignored because its not formatted correctly for Rails', () => {
      const payload = buildPayload()
      payload.multiple = true
      payload.defaultValue = ['abe', 'hest']
      payload.includeHidden = true

      const { container } = render(
        <MantineProvider>
          <Select {...payload} />
        </MantineProvider>
      )

      const hiddenInputs = container.querySelectorAll('input[type=hidden]')
      expect(hiddenInputs.length).toEqual(4)

      const ignoredInput = hiddenInputs[1]
      expect(ignoredInput).not.toBe(null)
      expect(ignoredInput.name).toEqual('_IGNORE')
      expect(ignoredInput.value).toEqual('abe,hest')
    })

    it('excludes a hidden input on multiple selects if includeHidden is false', () => {
      const payload = buildPayload()
      payload.multiple = false
      payload.includeHidden = false

      const { container } = render(
        <MantineProvider>
          <Select {...payload} />
        </MantineProvider>
      )

      const hiddenInputs = container.querySelectorAll('input[type=hidden]')
      expect(hiddenInputs.length).toEqual(1)

      const hiddenInput = hiddenInputs[0]
      expect(hiddenInput.name).toEqual('post[category]')
      expect(hiddenInput.value).toEqual('<mus>')
    })

    it('renders a single select component', async () => {
      const payload = {
        type: 'select',
        name: 'post[category]',
        id: 'post_category',
        required: true,
        defaultValue: '<mus>',
        includeHidden: true,
        options: [
          { value: '', label: 'Choose a category' },
          { value: 'abe', label: 'abe' },
          { value: '<mus>', label: '<mus>', disabled: true },
          { value: 'hest', label: 'hest' },
        ],
      }

      const { getAllByRole } = render(
        <MantineProvider>
          <Select {...payload} label={'category'} />
        </MantineProvider>
      )
      let options = getAllByRole('option', { hidden: true })

      expect(options[0].getAttribute('value')).toEqual('')
      expect(options[0].textContent).toEqual('Choose a category')

      expect(options[1].getAttribute('value')).toEqual('abe')
      expect(options[1].textContent).toEqual('abe')

      expect(options[2].getAttribute('value')).toEqual('<mus>')
      expect(options[2].textContent).toEqual('<mus>')
      expect(options[2].getAttribute('aria-selected')).toEqual('true')

      expect(options[3].getAttribute('value')).toEqual('hest')
      expect(options[3].textContent).toEqual('hest')
    })

    it('renders a multi select component', async () => {
      const payload = {
        type: 'select',
        name: 'post[category]',
        id: 'post_category',
        required: true,
        defaultValue: ['<mus>', 'hest'],
        includeHidden: true,
        multiple: true,
        options: [
          { value: '', label: 'Choose a category' },
          { value: 'abe', label: 'abe' },
          { value: '<mus>', label: '<mus>', disabled: true },
          { value: 'hest', label: 'hest' },
        ],
      }

      const { getAllByRole } = render(
        <MantineProvider>
          <Select {...payload} label={'category'} />
        </MantineProvider>
      )
      let options = getAllByRole('option', { hidden: true })

      expect(options[0].getAttribute('value')).toEqual('')
      expect(options[0].textContent).toEqual('Choose a category')

      expect(options[1].getAttribute('value')).toEqual('abe')
      expect(options[1].textContent).toEqual('abe')

      expect(options[2].getAttribute('value')).toEqual('<mus>')
      expect(options[2].textContent).toEqual('<mus>')
      expect(options[2].getAttribute('aria-selected')).toEqual('true')

      expect(options[3].getAttribute('value')).toEqual('hest')
      expect(options[3].textContent).toEqual('hest')
      expect(options[3].getAttribute('aria-selected')).toEqual('true')
    })

    it('renders with nested options', async () => {
      const payload = {
        type: 'select',
        name: 'post[category]',
        id: 'post_category',
        includeHidden: true,
        multiple: true,
        defaultValue: ['abe', 'soccer'],
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

      const { container, getAllByRole } = render(
        <MantineProvider>
          <Select {...payload} label={'category'} />
        </MantineProvider>
      )

      const group = document.querySelector('.mantine-MultiSelect-group')
      expect(
        group.querySelector('.mantine-MultiSelect-groupLabel').textContent
      ).toEqual('sports')

      let options = within(group).getAllByRole('option', { hidden: true })

      expect(options[0].getAttribute('value')).toEqual('soccer')
      expect(options[0].textContent).toEqual('Soccer')
      expect(options[0].getAttribute('aria-selected')).toEqual('true')

      expect(options[1].getAttribute('value')).toEqual('baseball')
      expect(options[1].textContent).toEqual('Baseball')
      expect(options[1].getAttribute('aria-selected')).toEqual('false')
    })
  })
})
