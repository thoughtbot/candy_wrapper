import React from 'react'
import { render } from '@testing-library/react'
import { TimeField, ValidationContext } from '.'

const buildPayload = () => {
  return {
    type: 'time',
    defaultValue: '15:02:00',
    name: 'post[birth_time]',
    id: 'post_birth_time',
  }
}

describe('TimeField', () => {
  it('renders', () => {
    const payload = buildPayload()

    const { getByRole, getByText } = render(
      <TimeField {...payload} label={'Birth Time'} errorKey={'birth_time'} />
    )

    const group = getByRole('group')
    expect(group).not.toBeNull()

    const label = getByText('Birth Time')
    expect(label).not.toBeNull()
  })

  it('renders time segments', () => {
    const payload = buildPayload()

    const { getAllByRole } = render(
      <TimeField {...payload} label={'Birth Time'} errorKey={'birth_time'} />
    )

    const segments = getAllByRole('spinbutton')
    expect(segments.length).toBeGreaterThanOrEqual(2)
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      birth_time: 'Birth Time invalid',
    }

    const { getByText } = render(
      <ValidationContext.Provider value={validationErrors}>
        <TimeField {...payload} label={'Birth Time'} errorKey={'birth_time'} />
      </ValidationContext.Provider>
    )

    const errorField = getByText('Birth Time invalid')
    expect(errorField).not.toBeNull()
  })
})
