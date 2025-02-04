import Movie from "../models/Movie.js";

export default {
  getAll(searchQueries = {}){
     let query = Movie.find({});
    if (searchQueries.search) {
      query = query.where({title: searchQueries.search})
    }
    if (searchQueries.genre) {
      query = query.where({genre: searchQueries.genre})
    }
    if (searchQueries.year) {
      query = query.where({year: searchQueries.year})
    }

    return query;
  },
  getOne(movieId) {
    const movie = Movie.findById(movieId)
    return movie;
  },
  getOneWithCasts(movieId)
  {
      return this.getOne(movieId).populate('casts');   
  },
  create(movieData, creatorId){
    const newMovie = Movie.create({
      ...movieData,
        rating: Number(movieData.rating),
        creator: creatorId
    })
    return newMovie;
  },
 async attachCast(movieId, castId){
      const movie = await Movie.findById(movieId);
      movie.casts.push(castId);
      await movie.save();
  }
};
