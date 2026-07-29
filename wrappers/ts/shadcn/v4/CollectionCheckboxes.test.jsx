import React from 'react'
import { render } from '@testing-library/react'
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

    const { getAllByRole, container } = render(
      <form>
        <CollectionCheckboxes
          {...payload}
          label={'Authors'}
          errorKey={'authors'}
        />
      </form>
    )

    const checkboxes = getAllByRole('checkbox')
    expect(checkboxes.length).toEqual(2)

    expect(checkboxes[0].getAttribute('value')).toEqual('1')
    expect(checkboxes[1].getAttribute('value')).toEqual('2')

    const nativeInputs = container.querySelectorAll('input[type="checkbox"]')
    expect(nativeInputs[0].name).toEqual('post[author_ids][]')
    expect(nativeInputs[1].name).toEqual('post[author_ids][]')
  })

  it('renders the labels', () => {
    const payload = buildPayload()

    const { getByText } = render(
      <CollectionCheckboxes
        {...payload}
        label={'Authors'}
        errorKey={'authors'}
      />
    )

    expect(getByText('one')).not.toBeNull()
    expect(getByText('two')).not.toBeNull()
    expect(getByText('Authors')).not.toBeNull()
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

  it('renders hidden ', () => {
    const payload = buildPayload()
    payload.includeHidden = true

    const { container } = render(
      <CollectionCheckboxes
        {...payload}
        label={'Authors'}
        errorKey={'authors'}
      />
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
      <ValidationContext.Provider value={validationErrors}>
        <CollectionCheckboxes
          {...payload}
          label={'Authors'}
          errorKey={'author_ids'}
        />
      </ValidationContext.Provider>
    )

    const errorField = getByText('id invalid')
    expect(errorField).not.toBeNull()
  })
})
