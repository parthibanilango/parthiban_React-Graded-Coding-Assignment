import axios from 'axios';
import IMovie from '../models/IMovie';

const getMovies = (category : string) => {
    return axios.get<IMovie[]>(`${process.env.REACT_APP_API_BASE_URL}/${category}`)
            .then(response => response.data)
};

const getMovieById = (id : string, category : string) => {
    return axios.get<IMovie>(`${process.env.REACT_APP_API_BASE_URL}/${category}/${id}`)
            .then(response => response.data)
};

const addMovieToFavourite = ( movieItem : IMovie) => {
    return axios.post<IMovie>( 
        `${process.env.REACT_APP_API_BASE_URL}/favourite`,
        movieItem,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then( response => response.data )
};


const deleteMovieById = ( id : string) => {
    return axios.delete<IMovie>( 
        `${process.env.REACT_APP_API_BASE_URL}/favourite/${id}`
    )
};


export {
    getMovies,
    getMovieById,
    addMovieToFavourite,
    deleteMovieById
}