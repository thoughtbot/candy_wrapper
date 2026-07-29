import React from 'react'
import { render } from '@testing-library/react'
import { CollectionRadioButtons, ValidationContext } from '.'

const buildRadioButtonPayload = (value, label, rest) => {
  return {
    type: 'radio',
    value,
    label,
    name: 'post[subscribe]',
    id: `post_subscribe_${value}`,
    ...rest,
  }
}

const buildPayload = () => {
  return {
    collection: [
      buildRadioButtonPayload(1, 'one', { defaultChecked: true }),
      buildRadioButtonPayload(2, 'two'),
    ],
    includeHidden: true,
    label: 'Subscribe',
    required: false,
  }
}

describe('CollectionRadioButtons', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByRole, getAllByRole } = render(
      <CollectionRadioButtons
        {...payload}
        label={'Subscribe'}
        errorKey={'subscribe'}
      />
    )

    const radiogroup = getByRole('radiogroup', { name: 'Subscribe' })
    expect(radiogroup).not.toBeNull()

    const radios = getAllByRole('radio')
    expect(radios.length).toEqual(2)
  })

  it('renders nothing when the collection is blank', () => {
    const payload = buildPayload()
    payload.collection = []

    const { container } = render(
      <CollectionRadioButtons
        {...payload}
        label={'Subscribe'}
        errorKey={'subscribe'}
      />
    )

    expect(container.innerHTML).toEqual('')
  })

  it('renders hidden', () => {
    const payload = buildPayload()
    payload.includeHidden = true

    const { container } = render(
      <CollectionRadioButtons
        {...payload}
        label={'Subscribe'}
        errorKey={'subscribe'}
      />
    )

    const hiddenInput = container.querySelector('input[type=hidden]')
    expect(hiddenInput.name).toEqual('post[subscribe]')
    expect(hiddenInput.value).toEqual('')
  })

  it('renders with error highlighting', async () => {
    const payload = buildPayload()

    const validationErrors = {
      subscribe: 'id invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <CollectionRadioButtons
          {...payload}
          label={'Subscribe'}
          errorKey={'subscribe'}
        />
      </ValidationContext.Provider>
    )

    const errorField = getByText('id invalid')
    expect(errorField).not.toBeNull()
  })
})
