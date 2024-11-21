import React from 'react'
import { render } from '@testing-library/react'
import { FieldError, ValidationContext } from './'

describe('FieldError', () => {
  it('renders', () => {
    const errors = { name: 'Name is invalid' }

    const { getByText } = render(
      <ValidationContext.Provider value={errors}>
        <FieldError errorKey="name" />
      </ValidationContext.Provider>
    )

    const element = getByText('Name is invalid')
    expect(element).not.toBe(null)
  })

  it('renders when there are mulitiple errors', () => {
    const errors = { name: ['Name is invalid', 'Name is too short'] }

    const { getByText } = render(
      <ValidationContext.Provider value={errors}>
        <FieldError errorKey="name" />
      </ValidationContext.Provider>
    )

    const element = getByText('Name is invalid Name is too short')
    expect(element).not.toBe(null)
  })

  it('does not render when there are no errors', () => {
    const errors = {}

    const { queryByText } = render(
      <ValidationContext.Provider value={errors}>
        <FieldError errorKey="name" />
      </ValidationContext.Provider>
    )

    const element = queryByText('Name is invalid')
    expect(element).toBe(null)
  })

  it('does not render when the errorKey does not match', () => {
    const errors = { phone: 'is absent' }

    const { queryByText } = render(
      <ValidationContext.Provider value={errors}>
        <FieldError errorKey="name" />
      </ValidationContext.Provider>
    )

    const element = queryByText('Name is invalid')
    expect(element).toBe(null)
  })
})
