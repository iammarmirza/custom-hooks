import './App.css'
import { useToast } from './hooks/useToast'

function App() {
  const { show, toastElement } = useToast()

  return (
    <>
      <button onClick={() => show({
        title: 'This is the toast'
      })}>Show Toast</button>
      {toastElement}
    </>
  )
}

export default App
