import React from 'react'
import { render } from '@testing-library/react'
import { DateTimeLocalField, ValidationContext } from '.'
import { MantineProvider } from '@mantine/core'
import userEvent from '@testing-library/user-event'

const buildPayload = () => {
  return {
    type: 'datetime-local',
    defaultValue: '2004-06-15T01:02:03',
    max: '2004-06-15',
    min: '2004-06-15',
    name: 'post[birth_date]',
    id: 'post_birth_date',
  }
}

describe('DateTimeLocalField', () => {
  it('renders', async () => {
    const payload = buildPayload()

    const { getByText, getByLabelText, container, screen } = render(
      <MantineProvider>
        <DateTimeLocalField
          {...payload}
          label={'Birth Date'}
          errorKey={'birth_date'}
        />
      </MantineProvider>
    )

    const input = document.querySelector('[name="post[birth_date]"]')
    expect(input.value).toEqual('2004-06-15T01:02:03.000Z')

    const button = document.querySelector('button')
    await userEvent.click(button)

    expect(getByLabelText('14 June 2004').disabled).toEqual(true)
    expect(getByLabelText('15 June 2004').disabled).toEqual(false)
    expect(getByLabelText('16 June 2004').disabled).toEqual(true)
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      birth_date: 'birth invalid',
    }

    const { getByText } = render(
      <MantineProvider>
        <ValidationContext.Provider value={validationErrors}>
          <DateTimeLocalField
            {...payload}
            label={'Birth Date'}
            errorKey={'birth_date'}
          />
        </ValidationContext.Provider>
      </MantineProvider>
    )

    const errorField = getByText('birth invalid')
    expect(errorField).not.toBeNull()
  })
})
