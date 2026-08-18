import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { payloads, errorPayloads, type FieldType } from '../payloads'

type ComponentMap = Partial<Record<FieldType, React.ComponentType<any>>>

export function renderFrame(
  components: ComponentMap,
  Provider?: React.ComponentType<{ children: React.ReactNode }>,
  ValidationContext?: React.Context<Record<string, string | string[]>>
) {
  function App() {
    const [field, setField] = useState<FieldType>('TextField')
    const [showErrors, setShowErrors] = useState(false)

    useEffect(() => {
      function onMessage(e: MessageEvent) {
        if (e.data?.type === 'SELECT_FIELD') {
          setField(e.data.field as FieldType)
        }
        if (e.data?.type === 'TOGGLE_ERRORS') {
          setShowErrors(e.data.enabled)
        }
      }
      window.addEventListener('message', onMessage)
      return () => window.removeEventListener('message', onMessage)
    }, [])

    const Component = components[field]
    const props = payloads[field]
    const errorData = showErrors ? errorPayloads[field] : undefined

    if (!Component) {
      return <div style={{ padding: 16, color: '#999', fontSize: 13 }}>Not supported</div>
    }

    const errorKey = errorData?.errorKey
    const errors = errorData?.errors ?? {}

    const rendered = (
      <div style={{ padding: 16 }}>
        <Component key={`${field}-${showErrors}`} {...props} errorKey={errorKey} />
      </div>
    )

    if (ValidationContext) {
      return (
        <ValidationContext.Provider value={errors}>
          {rendered}
        </ValidationContext.Provider>
      )
    }

    return rendered
  }

  const root = createRoot(document.getElementById('root')!)
  const content = Provider ? (
    <Provider>
      <App />
    </Provider>
  ) : (
    <App />
  )
  root.render(content)
}
