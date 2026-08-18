import React from 'react'
import { render } from '@testing-library/react'
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

    const { getByRole, getByText } = render(
      <DateTimeLocalField
        {...payload}
        label={'Birth Date'}
        errorKey={'birth_date'}
      />
    )

    const group = getByRole('group')
    expect(group).not.toBeNull()

    const label = getByText('Birth Date')
    expect(label).not.toBeNull()
  })

  it('renders date and time segments', () => {
    const payload = buildPayload()

    const { getAllByRole } = render(
      <DateTimeLocalField
        {...payload}
        label={'Birth Date'}
        errorKey={'birth_date'}
      />
    )

    const segments = getAllByRole('spinbutton')
    expect(segments.length).toBeGreaterThanOrEqual(5)
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      birth_date: 'birth invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <DateTimeLocalField
          {...payload}
          label={'Birth Date'}
          errorKey={'birth_date'}
        />
      </ValidationContext.Provider>
    )

    const errorField = getByText('birth invalid')
    expect(errorField).not.toBeNull()
  })
})
