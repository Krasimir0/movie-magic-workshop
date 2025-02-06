import { Schema, model, Types} from 'mongoose';

// create Schema 
const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [5, 'Title should be at least 5 characters long'],
        match: [/^[a-zA-z 0-9]+$/, 'Title should be alphanumeric, digits and whitespaces only']
    },
    category: String,
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        minLength: [5, 'Genre should be at least 5 characters long'],
        match: [/^[a-zA-z 0-9]+$/, 'Genre should be alphanumeric, digits and whitespaces only']
    },
    director: {
        type: String,
        minLength: [5, 'Director should be at least 5 characters long'],
        match: [/^[a-zA-z 0-9]+$/, 'Director should be alphanumeric, digits and whitespaces only']
    },
    year: {
        type: Number,
        min: 1900,
        max: 2024,
    },
    imageUrl: {
        type: String,
        match: /^https?:\/\//,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    description: {
     type: String,
     minLength: 20,
     match: /^[a-zA-z 0-9]+$/,
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

// create model
const Movie = model('Movie', movieSchema);

// export model
export default Movie;