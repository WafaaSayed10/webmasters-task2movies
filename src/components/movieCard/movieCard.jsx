import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useState } from 'react';
import { Modal, Box } from '@mui/material';
import { motion } from 'framer-motion';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function ActionAreaCard({ movie }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };
    const wordVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8 } },
    };
    return (
        <>
            <Card onClick={handleOpen} sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={`https://image.tmdb.org/t/p/w500/` + movie.poster_path}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {movie.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {movie.release_date}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}>
                        <motion.div variants={containerVariants}
                            initial="hidden"
                            animate="visible">
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <motion.strong variants={wordVariants}>Description:</motion.strong>{ movie.overview.split(" ").map((word) => (
                                <motion.span variants={wordVariants}> {word+" "}</motion.span>))}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <motion.strong variants={wordVariants}>Vote:</motion.strong>
                                <motion.span variants={wordVariants}> {movie.vote_average}</motion.span>
                            </Typography>
                        </motion.div>
                    </motion.div>
                </Box>
            </Modal>
        </>
    );
}
