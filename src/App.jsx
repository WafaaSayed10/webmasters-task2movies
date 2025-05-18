import './App.css';
import Home from './components/home/home';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios' ;
import { useState } from 'react';
import { useDebounce } from 'use-debounce'

function App() {
  const [word, setWord] = useState('')
  const [debouncedWord] = useDebounce(word, 500)
  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', debouncedWord],
    queryFn: async () => {
      if(debouncedWord.trim()===''){
      const res = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=850dfbd1bdec4c305a5c33a439b23ad6&language=en')
      return res.data.results
    }else{
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=850dfbd1bdec4c305a5c33a439b23ad6&query=${debouncedWord}&language=en`)
      return res.data.results
    }
  },
  keepPreviousData: true,
  })
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  //console.log(data);
  
  /*const search=async (word)=>{
    if(word===""){
      return
    }
    else{
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=850dfbd1bdec4c305a5c33a439b23ad6&query=${word}&language=en`)
      return res.data.results
    }
  }  */
  return (
    <>
      <Home data={data} word={word} setWord={setWord}></Home>
    </>
  )
}
export default App