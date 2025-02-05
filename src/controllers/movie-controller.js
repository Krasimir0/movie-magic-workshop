import { Router } from "express";
import movieService from "../services/movie-service.js";
import castService from "../services/cast-service.js";
const movieController = Router();

movieController.get("/create", (req, res) => {
  res.render("create");
});

movieController.post("/create", async (req, res) => {
  const newMovie = req.body;
  const userId = req.user?.id;

  await movieService.create(newMovie, userId);
  res.redirect("/");
});

movieController.get("/:movieId/details", async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await movieService.getOneWithCasts(movieId);
  const isCreator = movie.creator && movie.creator?.equals(req.user?.id);

  res.render("movies/details", { movie, isCreator });
});

movieController.get("/:movieId/delete", async (req, res) => {
  const movieId = req.params.movieId;

  const movie = await movieService.getOne(movieId);
  if (!movie.creator?.equals(req.user?.id)) {
    return res.redirect("/404");
  }

  await movieService.delete(movieId);
  res.redirect("/");
});

function getCategoriesViewData(category) {
  const categoriesMap = {
     'tv-show': 'TV Show', 
     'animation': 'Animation',
     'movie': 'Movie',
     'documentary': 'Documentary',
     'short-film': 'Short Film'
  };

  const categories = Object.keys(categoriesMap).map(value => ({
      value,
      label: categoriesMap[value],
      selected: value === category ? 'selected' : '',
  }));

  return categories;
}
movieController.get("/:movieId/edit", async(req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);
    console.log(movie);
    
    const categories = getCategoriesViewData(movie.category);
    res.render('movies/edit', { movie, categories });
});

movieController.get("/search", async (req, res) => {
  const searchQueries = req.query;
  const movies = await movieService.getAll(searchQueries);
  res.render("search", { movies, searchQueries });
});

movieController.get("/:movieId/attach-cast", async (req, res) => {
  const movieId = req.params.movieId;
  const movie = await movieService.getOne(movieId);
  const casts = await castService.getAll({ exclude: movie.casts });

  res.render("movies/cast-attach", { movie, casts });
});

movieController.post("/:movieId/attach-cast", async (req, res) => {
  const castId = req.body.cast;
  const movieId = req.params.movieId;

  await movieService.attachCast(movieId, castId);
  res.redirect(`/movies/${movieId}/details`);
});

export default movieController;
