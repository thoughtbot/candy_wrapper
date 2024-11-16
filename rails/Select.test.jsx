import React from 'react'
import { render, within } from '@testing-library/react'
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
      payload.includeHidden = true

      const { container } = render(<Select {...payload} />)

      const hiddenInput = container.querySelector('input[type=hidden]')
      expect(hiddenInput).not.toBe(null)
      expect(hiddenInput.name).toEqual('post[category]')
    })

    it('excludes a hidden input on multiple selects if includeHidden is false', () => {
      const payload = buildPayload()
      payload.multiple = false
      payload.includeHidden = false

      const { container } = render(<Select {...payload} />)

      const hiddenInput = container.querySelector('input[type=hidden]')
      expect(hiddenInput).toBe(null)
    })

    it('renders the component', async () => {
      const payload = {
        type: 'select',
        name: 'post[category]',
        id: 'post_category',
        required: true,
        defaultValue: ['<mus>'],
        includeHidden: true,
        multiple: true,
        options: [
          { value: '', label: 'Choose a category' },
          { value: 'abe', label: 'abe' },
          { value: '<mus>', label: '<mus>', disabled: true },
          { value: 'hest', label: 'hest' },
        ],
      }

      const { getAllByRole } = render(<Select {...payload} label={'category'} />)
      let options = getAllByRole('option')
      expect(options[0].value).toEqual('')
      expect(options[0].getAttribute('label')).toEqual('Choose a category')
      
      expect(options[1].value).toEqual('abe')
      expect(options[1].getAttribute('label')).toEqual('abe')
      
      expect(options[2].value).toEqual('<mus>')
      expect(options[2].getAttribute('label')).toEqual('<mus>')
      
      expect(options[3].value).toEqual('hest')
      expect(options[3].getAttribute('label')).toEqual('hest')
    })
    
    it('renders with nested options', async () => {
      const payload = {
        type: 'select',
        name: 'post[category]',
        id: 'post_category',
        includeHidden: true,
        options: [
          { value: 'abe', label: 'abe' },
          { label: 'sports', options: [
            {value: "soccer", label: "Soccer"},
            {value: "baseball", label: "Baseball"},
          ]},
          { value: 'hest', label: 'hest' },
        ],
      }

      const { getByRole } = render(<Select {...payload} label={'category'} />)
      let select = getByRole('combobox')
      
      expect(select.id).toEqual("post_category")
      expect(select.name).toEqual("post[category]")
      const optGroup = within(select).getByRole('group')
      expect(optGroup.getAttribute('label')).toEqual('sports')
      
      const options = within(optGroup).getAllByRole('option')
      expect(options[0].value).toEqual('soccer')
      expect(options[0].getAttribute('label')).toEqual('Soccer')
      
      expect(options[1].value).toEqual('baseball')
      expect(options[1].getAttribute('label')).toEqual('Baseball')
    })
  })
})
