import './App.css'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import debounce from 'just-debounce-it'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)
  
  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }
    setError(null)
  }, [search])

  return { search, updateSearch, error}
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error} = useSearch()
  const { movies, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
    console.log('search', search)
    getMovies({ search })
  }, 300)
  , [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <h1>Buscador de películas</h1>
      <header>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} placeholder='Avengers, Harry Potter, Titanic ...' />
          <input type='checkbox' onChange={handleSort} checked={sort}/>
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App
