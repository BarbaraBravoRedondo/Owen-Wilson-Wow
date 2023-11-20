import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation, matchPath } from 'react-router';
import PropTypes from 'prop-types';

import callToApi from '../services/api';
import ls from '../services/localstorage';
import '../styles/App.scss';

import Header from './Header';
import FiltersMoviesTitle from './FiltersMoviesTitle';
import FilterMovieYear from './FilterMovieYear';
import MovieSceneList from './MovieSceneList';
import MovieSceneDetail from './MovieSceneDetail';

//Api
function App() {
  const [moviesInfo, setMoviesInfo] = useState(ls.get('movies', []));
  const [year, setYear] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (ls.get('movies', null) === null) {
      callToApi().then((result) => {
        setMoviesInfo(result);
        ls.set('movies', result);
      });
    }
  }, []);

  //Obtencion de años sin que esten duplicados, como valor unico cada uno
  const getYears = () => {
    const years = moviesInfo.map((year) => year.year);
    //just the years on the array
    const justYears = new Set(years);
    const justArray = [...justYears];
    justArray.sort((a, b) => a - b);
    return justArray;
  };

  //Actualizar el valor de input y select
  const updateInput = (value) => {
    setTitle(value);
    ls.set('title', value);
  };

  const updateSelect = (value) => {
    setYear(value);
    ls.set('year', value);
  };

  //form Submit
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  //Filtrados
  const filteredList = moviesInfo
    .filter((name) => name.movie.toLowerCase().includes(title.toLowerCase()))
    .filter((eachYear) => {
      if (year === '') {
        return true;
      } else {
        return eachYear.year === parseInt(year);
      }
    });

  //Ruta ID
  const { pathname } = useLocation();
  const routeData = matchPath('/movie/:id', pathname);
  const movieId = routeData !== null ? routeData.params.id : '';
  const movieChoosed = moviesInfo.find((movie) => movie.id === movieId);

  //NotFound
  const notFound =
    !movieChoosed &&
    !ls.get('movies', []).some((movie) => movie.id === movieId);

  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <form onSubmit={handleSubmit} className="form">
                  <FiltersMoviesTitle
                    info={moviesInfo}
                    title={title}
                    updateInput={updateInput}
                  />
                  <FilterMovieYear
                    updateSelect={updateSelect}
                    year={year}
                    SelectedYears={getYears()}
                  />
                </form>

                <MovieSceneList info={filteredList} title={title} />
              </>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <MovieSceneDetail
                movieChoosed={movieChoosed}
                notFound={notFound}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}
FilterMovieYear.propTypes = {
  year: PropTypes.string.isRequired,
  updateSelect: PropTypes.func.isRequired,
  SelectedYears: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default App;
