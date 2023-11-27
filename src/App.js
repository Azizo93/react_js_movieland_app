import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg'
// Here is your key: 7b3c98fb

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=7b3c98fb'


const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchterm] = useState('');

    useEffect(() => {
        searchMovies('Marvel')
    }, []);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search);
    }

    const handleSearch = () => {
        searchMovies(searchTerm);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }


    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for Movies" 
                    value={searchTerm}
                    onChange={(e) => setSearchterm(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <img
                    src={SearchIcon} 
                    alt="search"
                    onClick={handleSearch}
                />
            </div>

            {movies.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div classname="empty">
                        <h2>No movies found</h2>
                    </div>
                )}

        </div>
    );
};

 
export default App;