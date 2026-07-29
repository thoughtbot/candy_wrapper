import React from 'react'
import { render } from '@testing-library/react'
import { Provider, defaultTheme } from '@adobe/react-spectrum'
import { CollectionCheckboxes, ValidationContext } from '.'

const buildCheckboxPayload = (value, label) => {
  return {
    type: 'checkbox',
    value,
    defaultChecked: true,
    label,
    name: 'post[author_ids][]',
    id: `post_author_ids_${value}`,
  }
}

const buildPayload = () => {
  return {
    collection: [
      buildCheckboxPayload(1, 'one'),
      buildCheckboxPayload(2, 'two'),
    ],
    includeHidden: true,
    label: 'authors',
    required: false,
  }
}

describe('CollectionCheckboxes', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByRole } = render(
      <Provider theme={defaultTheme}>
        <CollectionCheckboxes
          {...payload}
          label={'Authors'}
          errorKey={'authors'}
        />
      </Provider>
    )

    const group = getByRole('group', { name: 'Authors' })
    expect(group).not.toBeNull()

    const checkbox1 = getByRole('checkbox', { name: 'one' })
    expect(checkbox1).not.toBeNull()

    const checkbox2 = getByRole('checkbox', { name: 'two' })
    expect(checkbox2).not.toBeNull()
  })

  it('renders nothing when the collection is blank', () => {
    const payload = buildPayload()
    payload.collection = []

    const { container } = render(
      <CollectionCheckboxes
        {...payload}
        label={'Authors'}
        errorKey={'authors'}
      />
    )

    expect(container.innerHTML).toEqual('')
  })

  it('renders hidden', () => {
    const payload = buildPayload()
    payload.includeHidden = true

    const { container } = render(
      <Provider theme={defaultTheme}>
        <CollectionCheckboxes
          {...payload}
          label={'Authors'}
          errorKey={'authors'}
        />
      </Provider>
    )

    const hiddenInput = container.querySelector('input[type=hidden]')
    expect(hiddenInput.name).toEqual('post[author_ids][]')
    expect(hiddenInput.value).toEqual('')
  })

  it('renders with error highlighting', async () => {
    const payload = buildPayload()

    const validationErrors = {
      author_ids: 'id invalid',
    }

    const { getByText } = render(
      <Provider theme={defaultTheme}>
        <ValidationContext.Provider value={validationErrors}>
          <CollectionCheckboxes
            {...payload}
            label={'Authors'}
            errorKey={'author_ids'}
          />
        </ValidationContext.Provider>
      </Provider>
    )

    const errorField = getByText('id invalid')
    expect(errorField).not.toBeNull()
  })
})
