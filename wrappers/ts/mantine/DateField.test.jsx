import React from 'react'
import { render } from '@testing-library/react'
import { DateField, ValidationContext } from '.'
import { MantineProvider } from '@mantine/core'

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

    const { getByLabelText } = render(
      <MantineProvider>
        <DateField {...payload} label={'Birth Date'} errorKey={'birth_date'} />
      </MantineProvider>
    )

    const input = getByLabelText('Birth Date')

    expect(input.value).toEqual('2004-06-15')
    expect(input.max).toEqual('2010-08-15')
    expect(input.min).toEqual('2000-06-15')
    expect(input.type).toEqual('text')
    expect(input.classList.contains('mantine-DateInput-input')).toEqual(true)
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      birth_date: 'birth invalid',
    }

    const { getByText } = render(
      <MantineProvider>
        <ValidationContext.Provider value={validationErrors}>
          <DateField
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
