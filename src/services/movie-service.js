import movies from "../movies.js";
import { v4 as uuid } from "uuid";

export default {
  findMovie(movieId) {
    const movie = movies.find((movie) => movie.id == movieId);

    return movie;
  },
  create(movieData){
      const newId = uuid();

      movies.push({
        id: newId,
        ...movieData,
      })
  }
};
