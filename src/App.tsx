import './App.css'
import { useFetch } from './hooks/useFetch'

function App() {
  const myFetch = useFetch('https://api.jikan.moe/v4/anime?q=Naruto&sfw')
  const {data, error, loading, fetchData} = myFetch
  console.log('data', data)
  console.log('error', error)
  console.log('loading', loading)
  return (
    <>
    <button onClick={fetchData}>Click me</button>
    </>
  )
}

export default App
