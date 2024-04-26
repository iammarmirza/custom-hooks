import './App.css'
import { useState } from 'react'
import { useDebounce } from './hooks/useDebounce'
import { useThrottle } from './hooks/useThrottle'

function App() {
  const [text, setText] = useState('')
  const debounced = useDebounce(text, 1000)
  const throttled = useThrottle(text, 1000)
 
  return (
    <>
      <input type='text' placeholder='Enter text' value={text} onChange={(e) => setText(e.currentTarget.value)} />
      <div>
        <span>Default Text : {text}</span>
      </div>
      <div>
        <span>Debounced Text : {debounced}</span>
      </div>
      <div>
        <span>Throttled Text : {throttled}</span>
      </div>
    </>
  )
}

export default App
