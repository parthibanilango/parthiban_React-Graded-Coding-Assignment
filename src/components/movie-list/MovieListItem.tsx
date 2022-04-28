import React, { useState } from 'react';
import { Card, Toast, ToastContainer } from 'react-bootstrap';
import IMovie from '../../models/IMovie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-solid-svg-icons'; 
import { addMovieToFavourite, getMovies, deleteMovieById} from '../../services/movie';
import { ResponseState } from '../../models/types';
import {Link} from 'react-router-dom';

type Props = {
    movie : IMovie,
    category : string
    
}

const MovieListItem = ( {movie,category} : Props) => {
    const {
        title,
        posterurl,
    } = movie;

    const [ favMovies ,setFavMovies ] =useState<IMovie[]>([]);
    const [ responseState ,setResponseState ] =useState<ResponseState>('initial');
    const [ toastMessage ,setToastMessage ] =useState<string>('');
    const [ show ,setShow ] =useState<boolean>(false);
    
    async function removeFavourite(this: any, movie:IMovie) {
        const fetchFavMovies = async () => {
            try{
                const data:IMovie[] = await getMovies("favourite");
                if (!data) {
                    throw new Error("Data not found ");
                }
                window.location.reload();
                
            }catch(error){
                setResponseState('error');
                setToastMessage(`Unable to update favourites`);
                setShow(true);  
            }
        };
        
        try{
            const data = await deleteMovieById(movie.id);
            setResponseState('success');
            setToastMessage(`Movie ${movie.title} has been deleted successfully from favourites`);
            setShow(true);
            fetchFavMovies();
        }catch(error){
            setResponseState('error');
            setToastMessage(`Unable to delete Movie ${movie.title} please try again later`);
            setShow(true);  
        }  
    };
    

    async function addFavourite(this: any, movie:IMovie) {
        const fetchFavouriteMovies = async () => {
                try{
                    const data:IMovie[] = await getMovies("favourite");
                    if (!data) {
                        throw new Error("Data not found ");
                    }
                    setFavMovies(data);
                }catch(error){
                    setResponseState('error');
                    setToastMessage(`Unable to update favourites`);
                    setShow(true);  
                }
        };
        fetchFavouriteMovies();
        
        if(favMovies.filter(mov => mov.id === movie.id).length > 0){
            setResponseState('error');
            setToastMessage(`Movie ${movie.title} is already in favourites`);
            setShow(true);  
        }else{
            const data = await addMovieToFavourite(movie);
            setResponseState('success');
            setToastMessage(`Movie ${data.title} has been added successfully to favourites`);
            setShow(true);   
        }
        fetchFavouriteMovies();  
    }

    return (
        <>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" className="hgt" src={`${posterurl}`} />
        <div className="text-xs-2 text-center me-2" >
             <Card.Title>{title}</Card.Title>
             {
             category !== 'favourite' ?
             <Card.Link href={`/movies/${category}/movie/${movie.id}`} className="normal-text inline-blk">Details</Card.Link>  
                :''
            }
        </div>
        {category !== 'favourite' ?
            <div className="align-self-end text-xs me-2 inline-blk">
               
                <button onClick={() => addFavourite(movie)}>Add to Favourites</button>
                    <span  className = "me-2 cls-red">
                        <FontAwesomeIcon 
                        icon = {faHeart}          
                    />
                    </span>                   
            </div> 
            :
            <div className="align-self-end text-xs me-2 inline-blk">
                <button onClick={() => removeFavourite(movie)}>Remove from Favourites</button>                   
            </div> 
        } 
        </Card>
        {
            responseState !== 'initial' && (
                <ToastContainer className="p-3" position="top-end">
                    <Toast
                        bg={responseState === 'success' ? 'success' : 'danger'}
                        show={show}
                        autohide
                        delay={5000}
                        onClose={() => setShow(false)}
                    >
                        <Toast.Header closeButton={false}>
                            { responseState === 'success' ? 'Success' : 'Error'}
                        </Toast.Header>
                        <Toast.Body>
                            {toastMessage}
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            )
        }
        </>
    );
};

export default MovieListItem;