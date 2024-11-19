import { createContext, useContext, useMemo } from 'react'
import { ValidationErrors } from './types'

export const ValidationContext = createContext<ValidationErrors>({})

export const useErrorKeyValidation = ({
  errorKey,
}: {
  errorKey: string
  name: string
}) => {
  const errors = useContext(ValidationContext)

  return useMemo(() => {
    return errors[errorKey]
  }, [errors, errorKey])
}
