import React,{ Component} from 'react';
import { Row, Alert, Col } from 'react-bootstrap';
import IMovie from '../../models/IMovie';
import {LoadingStatus} from '../../models/types';
import LoadingIndicator  from '../common/LoadingIndicator';
import MovieListItem from './MovieListItem';
import { getMovies } from '../../services/movie';

type Props = {
   category : string
};

type State = {
    status? : LoadingStatus,
    movies? : IMovie[],
    error? : Error,
    category : string
    
};

class MoviesTopRated extends Component<Props,State>{
    

    props: Props = {
        category : this.props.category
    }

    state : State = {
        status : 'LOADING',
        category :this.props.category

    };
  
    render() {
        
        let el;
        const { status, movies, error,category } = this.state;

        switch(status){
            case 'LOADING': 
                el = (
                    <LoadingIndicator 
                        size = "large"
                        message = "We are fetching the list of movies. Please wait..."
                    />
                );
                break;
            case 'LOADED': 
                el = (
                    <Row xs={1} md={3} lg={5} >
                        {
                            movies?.map (
                                movie => (
                                    <Col key={movie.id} className ="d-flex align-items-stretch my-3">
                                        <MovieListItem
                                            movie ={movie}
                                            category ={category}
                                        />
                                    </Col>
                                )
                            )
                        }
                    </Row>
                                    
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
    }

    async componentDidMount(){
        this.setState({
                status :'LOADING'
        });
        let categgory = this.props.category;
        try{
            const data = await getMovies(categgory);
            this.setState({
                status :'LOADED',
                movies: data
            });
        }catch(error){
            this.setState({
                status : 'ERROR_LOADING',
                error : new Error("Error in fetching movies")
            });
        }
       
    }
};

export default MoviesTopRated;