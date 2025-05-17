import React from "react";
import style from './home.module.css';
import Card from '../movieCard/movieCard';
import { Grid } from '@mui/material';
import { useState } from 'react'

export default function Home({data, search}){
    const [word, setWord] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const searchRes = async () => {
        const results = await search(word)
        setSearchResults(results || [])
    }
    return(
        <>
        <h1 className={style.header}>Search for a movie</h1>
        <input value={word} onChange={(e)=>setWord(e.target.value)} type="search" placeholder="movie name" className={style.inp}/>
        <button onClick={searchRes}>Search</button>
        {searchResults.length > 0 ?(
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {searchResults.map((movie, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                <Card movie={movie}></Card>
            </Grid>
            ))}
        </Grid>
        ):(
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {data.map((movie, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                <Card movie={movie}></Card>
            </Grid>
            ))}
        </Grid>
        )}
        </>
    )
}