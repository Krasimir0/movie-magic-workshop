import movies from "../movies.js";
import { v4 as uuid } from "uuid";

export default {
  getAll(searchQueries = {}){
    let result = movies;
    if (searchQueries.search) {
      result = result.filter(movie => movie.title.toLowerCase().includes(searchQueries.search.toLowerCase()))
    }
    if (searchQueries.genre) {
      result = result.filter(movie => movie.genre === searchQueries.genre)
    }
    if (searchQueries.year) {
      result = result.filter(movie => movie.year == searchQueries.year)
    }

    return result;
  },
  findMovie(movieId) {
    const movie = movies.find((movie) => movie.id == movieId);

    return movie;
  },
  create(movieData){
      const newId = uuid();

      movies.push({
        id: newId,
        ...movieData,
        rating: Number(movieData.rating)
      })
  }
};
