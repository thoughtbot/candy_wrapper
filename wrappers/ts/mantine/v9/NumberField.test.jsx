import React from 'react'
import { render } from '@testing-library/react'
import { NumberField, ValidationContext } from '.'
import { MantineProvider } from '@mantine/core'
import userEvent from '@testing-library/user-event'

const buildPayload = () => {
  return {
    type: 'number',
    defaultValue: '2',
    name: 'post[favs]',
    min: 1,
    max: 9,
    id: 'post_favs',
    step: 2,
  }
}

describe('NumberField', () => {
  it('renders', async () => {
    const payload = buildPayload()

    const { getByLabelText } = render(
      <MantineProvider>
        <NumberField {...payload} label={'Favs'} errorKey={'favs'} />
      </MantineProvider>
    )

    const input = getByLabelText('Favs')
    expect(input.classList.contains('mantine-NumberInput-input')).toEqual(true)
    expect(input.value).toEqual('2')
    const upButton = document.querySelector('button[data-direction="up"]')
    const downButton = document.querySelector('button[data-direction="down"]')

    await userEvent.click(upButton)
    expect(input.value).toEqual('4')

    await userEvent.click(downButton)
    expect(input.value).toEqual('2')

    await userEvent.click(upButton)
    await userEvent.click(upButton)
    await userEvent.click(upButton)
    await userEvent.click(upButton)

    expect(input.value).toEqual('9')

    await userEvent.click(downButton)
    await userEvent.click(downButton)
    await userEvent.click(downButton)
    await userEvent.click(downButton)
    await userEvent.click(downButton)
    await userEvent.click(downButton)

    expect(input.value).toEqual('1')
  })

  it('renders with field errors', async () => {
    const payload = buildPayload()

    const validationErrors = {
      favs: 'favs invalid',
    }

    const { getByText } = render(
      <MantineProvider>
        <ValidationContext.Provider value={validationErrors}>
          <NumberField {...payload} label={'Favs'} errorKey={'favs'} />
        </ValidationContext.Provider>
      </MantineProvider>
    )

    const errorField = getByText('favs invalid')
    expect(errorField).not.toBeNull()
  })
})
