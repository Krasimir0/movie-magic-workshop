import express from 'express';
import movieService from '../services/movie-service.js';

const router = express.Router();

router.get('/', (req, res) => {
    const movies = movieService.getAll();

    // convert documents to plain objects
    // const plainObjects = movies.map(m => m.toObject());

    res.render('home', {movies})
});

router.get('/about', (req, res) =>
{
    res.render('about')
});

export default router;