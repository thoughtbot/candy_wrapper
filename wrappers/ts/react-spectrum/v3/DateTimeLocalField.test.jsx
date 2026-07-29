import React from 'react'
import { render } from '@testing-library/react'
import { Provider, defaultTheme } from '@adobe/react-spectrum'
import { DateTimeLocalField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'datetime-local',
    defaultValue: '2004-06-15T01:02:03',
    max: '2010-08-15T00:00:00',
    min: '2000-06-15T00:00:00',
    name: 'post[birth_date]',
    id: 'post_birth_date',
  }
}

describe('DateTimeLocalField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByRole } = render(
      <Provider theme={defaultTheme}>
        <DateTimeLocalField
          {...payload}
          label={'Birth Date'}
          errorKey={'birth_date'}
        />
      </Provider>
    )

    const group = getByRole('group', { name: 'Birth Date' })
    expect(group).not.toBeNull()
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      birth_date: 'birth invalid',
    }

    const { getByText } = render(
      <Provider theme={defaultTheme}>
        <ValidationContext.Provider value={validationErrors}>
          <DateTimeLocalField
            {...payload}
            label={'Birth Date'}
            errorKey={'birth_date'}
          />
        </ValidationContext.Provider>
      </Provider>
    )

    const errorField = getByText('birth invalid')
    expect(errorField).not.toBeNull()
  })
})
