import React from 'react'
import { render } from '@testing-library/react'
import { DateField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'date',
    defaultValue: '2004-06-15',
    max: '2010-08-15',
    min: '2000-06-15',
    name: 'post[birth_date]',
    id: 'post_birth_date',
  }
}

describe('DateField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByRole, getByText } = render(
      <DateField {...payload} label={'Birth Date'} errorKey={'birth_date'} />
    )

    const group = getByRole('group')
    expect(group).not.toBeNull()

    const label = getByText('Birth Date')
    expect(label).not.toBeNull()
  })

  it('renders date segments', () => {
    const payload = buildPayload()

    const { getAllByRole } = render(
      <DateField {...payload} label={'Birth Date'} errorKey={'birth_date'} />
    )

    const segments = getAllByRole('spinbutton')
    expect(segments.length).toBeGreaterThanOrEqual(3)
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      birth_date: 'birth invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <DateField {...payload} label={'Birth Date'} errorKey={'birth_date'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('birth invalid')
    expect(errorField).not.toBeNull()
  })
})
