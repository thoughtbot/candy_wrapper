import React from 'react'
import { render } from '@testing-library/react'
import { MonthField, ValidationContext } from '.'
import { MantineProvider } from '@mantine/core'
import userEvent from '@testing-library/user-event'

const buildPayload = () => {
  return {
    type: 'month',
    defaultValue: '2004-06',
    // Unsupported by Mantine
    // step: 2,
    max: '2004-06',
    min: '2004-06',
    name: 'post[written_on]',
    id: 'post_written_on',
  }
}

describe('MonthField', () => {
  it('renders', async () => {
    const payload = buildPayload()

    const { getByText } = render(
      <MantineProvider>
        <MonthField {...payload} label={'Month'} errorKey={'month'} />
      </MantineProvider>
    )

    const input = document.querySelector('[name="post[written_on]"]')
    expect(input.value).toEqual('2004-06-01T00:00:00.000Z')

    const button = document.querySelector('button')
    await userEvent.click(button)

    expect(getByText('Jul').disabled).toEqual(true)
    expect(getByText('Jun').disabled).toEqual(false)
    expect(getByText('May').disabled).toEqual(true)
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      month: 'Month invalid',
    }

    const { getByText } = render(
      <MantineProvider>
        <ValidationContext.Provider value={validationErrors}>
          <MonthField {...payload} label={'Month'} errorKey={'month'} />
        </ValidationContext.Provider>
      </MantineProvider>
    )

    const errorField = getByText('Month invalid')
    expect(errorField).not.toBeNull()
  })
})
