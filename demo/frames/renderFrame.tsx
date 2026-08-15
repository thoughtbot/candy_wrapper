import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { payloads, errorPayloads, rubySource, tsUsage, type FieldType } from '../payloads'

type ComponentMap = Partial<Record<FieldType, React.ComponentType<any>>>

const codeStyles: React.CSSProperties = {
  marginTop: 12,
  padding: '8px 10px',
  background: '#f8f9fa',
  border: '1px solid #e5e7eb',
  borderRadius: 4,
  fontSize: 11,
  fontFamily: "'SF Mono', 'Fira Code', monospace",
  lineHeight: 1.5,
  overflow: 'auto',
  whiteSpace: 'pre',
  maxHeight: 200,
}

const labelStyles: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: '#9ca3af',
  marginTop: 16,
  marginBottom: 4,
}

export function renderFrame(
  components: ComponentMap,
  Provider?: React.ComponentType<{ children: React.ReactNode }>,
  ValidationContext?: React.Context<Record<string, string | string[]>>
) {
  function App() {
    const [field, setField] = useState<FieldType>('TextField')
    const [showErrors, setShowErrors] = useState(false)
    const [showPayload, setShowPayload] = useState(false)

    useEffect(() => {
      function onMessage(e: MessageEvent) {
        if (e.data?.type === 'SELECT_FIELD') {
          setField(e.data.field as FieldType)
        }
        if (e.data?.type === 'TOGGLE_ERRORS') {
          setShowErrors(e.data.enabled)
        }
        if (e.data?.type === 'TOGGLE_PAYLOAD') {
          setShowPayload(e.data.enabled)
        }
      }
      window.addEventListener('message', onMessage)
      return () => window.removeEventListener('message', onMessage)
    }, [])

    const Component = components[field]
    const props = payloads[field]
    const errorData = showErrors ? errorPayloads[field] : undefined
    const ruby = rubySource[field]
    const usage = tsUsage[field]

    if (!Component) {
      return <div style={{ padding: 16, color: '#999', fontSize: 13 }}>Not supported</div>
    }

    const errorKey = errorData?.errorKey
    const errors = errorData?.errors ?? {}

    const rendered = (
      <div style={{ padding: 16 }}>
        <Component key={`${field}-${showErrors}`} {...props} errorKey={errorKey} />
        {showPayload && (
          <>
            <div style={labelStyles}>
              <a href="https://github.com/thoughtbot/form_props" target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', textDecoration: 'none' }}>form_props</a>
            </div>
            <pre style={codeStyles}>{ruby}</pre>
            <div style={labelStyles}>JSON</div>
            <pre style={codeStyles}>{JSON.stringify(props, null, 2)}</pre>
            <div style={labelStyles}>Usage</div>
            <pre style={codeStyles}>{usage}</pre>
          </>
        )}
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
