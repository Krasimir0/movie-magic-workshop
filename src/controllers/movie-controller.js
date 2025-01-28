import { Router } from "express";
import movieService from "../services/movie-service.js";
const movieController = Router();

movieController.get('/create', (req, res) =>
{
    res.render('create');
});

movieController.post('/create', async(req, res) => {
    const newMovie = req.body;
    
   await movieService.create(newMovie);    
    res.redirect('/')
})

movieController.get('/:movieId/details', async (req, res) =>
    {
        const movieId = req.params.movieId;
        const movie = await movieService.getOne(movieId);
        
        res.render('movies/details', {movie});
    });

movieController.get('/search', async (req, res) => {
    const searchQueries = req.query;
    const movies = await movieService.getAll(searchQueries);
    res.render('search', { movies, searchQueries });
})

movieController.get('/:movieId/attach-cast', (req, res) =>
{
    res.render('movies/cast-attach');
});

export default movieController;