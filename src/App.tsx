import { NavLink } from 'react-router-dom'
import './App.css'
import { useFetch } from './hooks/useFetch'

function App() {
  const myFetch = useFetch('https://api.jikan.moe/v4/anime', {
    q: 'Naruto',
    page: 1
  },
    {
      shouldCancelOnUnmount: true
    }
  )
  const { data, error, loading, fetchData } = myFetch
  console.log('data', data)
  console.log('error', error)
  console.log('loading', loading)
  return (
    <>
      <button onClick={fetchData}>Click me</button>
      <NavLink to={'/secondary'} >Secondary page</NavLink>
    </>
  )
}

export default App
