import React,{ useEffect, useState} from 'react';
import { Row, Alert, Col, Badge } from 'react-bootstrap';
import IMovie from '../../models/IMovie';
import {LoadingStatus} from '../../models/types';
import { getMovieById } from '../../services/movie';
import LoadingIndicator  from '../common/LoadingIndicator';
import {useParams} from 'react-router-dom';

type Props = {
   category : string
};


const MovieDetails =(props :Props) => {
   
    const [ status, setStatus ] = useState<LoadingStatus>( 'LOADING');
    const [ movie, setMovie ] = useState<IMovie | null>( null);
    const [ error, setError ] = useState<Error | null>( null);
    const { id } = useParams();
    const cat = props.category;

    let el;
    
    useEffect(
        () => {
            const fetchMovie = async () => {
                try{
                    const data = await getMovieById(id as string, cat as string);
                    setMovie(data);
                    setStatus('LOADED')
                }catch(error){
                    setError(new Error('There is a Error in loading movie'));
                    setStatus('ERROR_LOADING');
                }
            };
            fetchMovie();
        }, [])

    switch(status){
        case 'LOADING': 
            el = (
                <LoadingIndicator 
                    size = "large"
                    message = "We are fetching details of movie. Please wait..."
                />
            );
            break;
        case 'LOADED':
            const {
                id, 
                title ,
                year , 
                genres,
                ratings, 
                poster,
                contentRating,
                duration,
                releaseDate,
                averageRating,
                originalTitle,
                storyline,
                actors,
                imdbRating,
                posterurl
            } = movie as IMovie;
            el = (
                <>
                <h3>{title}</h3>
                <hr />
                {
                <Row>
                    <Col xs={12} lg={4}>
                        <img 
                            src={`${posterurl}`}
                            alt={title}
                            className="w-100"
                        />

                    </Col>
                    <Col xs={12} lg={8}>
                        <div>
                          <b> {title}({year})</b>
                        </div>
                        <div>
                          <b> Imdb Rating : </b>{imdbRating}
                        </div>
                        <div>
                            <b>Content Rating : </b>{contentRating}
                        </div>
                        <div>
                            <b>Average Rating : </b>{averageRating}
                        </div>
                        <div>
                            <b>Duration : </b>{duration}
                        </div>
                        <div>
                            <b>Genres : </b>
                            {genres.map((genre) => 
                            <Badge bg="primary me-2">{genre}</Badge>
                            )}
                            
                        </div>
                        <div>
                            <b>Actors : </b>
                            {actors.map((actor) => 
                            <Badge bg="secondary me-2">{actor}</Badge>
                            )}
                        </div>
                        <div>
                            <b>Release Date : </b>{releaseDate}
                        </div>
                        <div>
                            <b>Story Line : </b>{storyline}
                        </div>
                    </Col>
                </Row>
                }           
                </>
            );
            break;
        case 'ERROR_LOADING': 
            el = (
                <Alert variant="danger my-3">
                    {error?.message}
                </Alert>
            );
            break;
    }
    return el;  
};

export default MovieDetails;