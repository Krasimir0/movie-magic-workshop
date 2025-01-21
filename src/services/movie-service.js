import movies from "../movies.js";

export default {
  findMovie(movieId) {
    const movie = movies.find((movie) => movie.id == movieId);

    return movie;
  },
};
