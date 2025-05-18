import React from "react";
import style from './home.module.css';
import Card from '../movieCard/movieCard';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion';

export default function Home({data, word, setWord}){
    /*const [searchResults, setSearchResults] = useState([])
    const searchRes = async () => {
        const results = await search(word)
        setSearchResults(results || [])
    }*/
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };
    const cardVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    };
    return(
        <>
            <h1 className={style.header}>Search for a movie</h1>
            <input value={word} onChange={(e)=>setWord(e.target.value)} type="search" placeholder="movie name" className={style.inp}/>
            {/*<button >Search</button>*/}
            {data.length >0 ? 
            <motion.div variants={containerVariants} initial="hidden" animate="visible"> 
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {data.map((movie, index) => (
                        <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                            <motion.div variants={cardVariants}>
                                <Card movie={movie}></Card>
                            </motion.div>
                        </Grid>))}
                </Grid>
            </motion.div> : <p><strong>There are no matching movies</strong></p>}
        </>
    )
}