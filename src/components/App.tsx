import React from "react";
import Container from 'react-bootstrap/Container';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";

import NavigationMenu from './NavigationMenu';
import MovieList from "./movie-list/MovieList";
import MovieDetails from "./movie-details/MovieDetails";
import MoviesComing from "./movie-list/MoviesComing";
import MoviesInIndia from "./movie-list/MoviesInIndia";
import MoviesTopRated from "./movie-list/MoviesTopRated";


const App = () => {
    return (
        <>
        <NavigationMenu />
        <Container>
           
            <Routes>
                <Route path="/home" element={<MovieList category={"movies-in-theaters"} />} />
                <Route path="/movies/movies-in-theaters" element={<MovieList category={"movies-in-theaters"} />} />
                <Route path="/movies/movies-coming" element={<MoviesComing category={"movies-coming"} />} />
                <Route path="/movies/top-rated-india" element={<MoviesInIndia category={"top-rated-india"} />} />
                <Route path="/movies/top-rated-movies" element={<MoviesTopRated category={"top-rated-movies"} />} />
                <Route path="/movies/favourite" element={<MovieList category={"favourite"} />} />
                <Route path="/movies/movies-in-theaters/movie/:id"  element={<MovieDetails category={"movies-in-theaters"} />} />
                <Route path="/movies/movies-coming/movie/:id" element={<MovieDetails category={"movies-coming"} />} />
                <Route path="/movies/top-rated-india/movie/:id"  element={<MovieDetails category={"top-rated-india"} />} />
                <Route path="/movies/top-rated-movies/movie/:id"  element={<MovieDetails category={"top-rated-movies"} />} />            
            </Routes>
        </Container>
        </>
    );
};

export default App;