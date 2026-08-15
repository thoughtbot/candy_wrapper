import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { payloads, type FieldType } from '../payloads'

type ComponentMap = Partial<Record<FieldType, React.ComponentType<any>>>

export function renderFrame(
  components: ComponentMap,
  Provider?: React.ComponentType<{ children: React.ReactNode }>
) {
  function App() {
    const [field, setField] = useState<FieldType>('TextField')

    useEffect(() => {
      function onMessage(e: MessageEvent) {
        if (e.data?.type === 'SELECT_FIELD') {
          setField(e.data.field as FieldType)
        }
      }
      window.addEventListener('message', onMessage)
      return () => window.removeEventListener('message', onMessage)
    }, [])

    const Component = components[field]
    const props = payloads[field]

    if (!Component) {
      return <div style={{ padding: 16, color: '#999', fontSize: 13 }}>Not supported</div>
    }

    return (
      <div style={{ padding: 16 }}>
        <Component key={field} {...props} />
      </div>
    )
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
