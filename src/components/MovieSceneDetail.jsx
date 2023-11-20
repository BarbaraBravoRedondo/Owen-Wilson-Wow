import '../styles/layouts/MovieSceneDetail.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function MovieSceneDetail({ movieChoosed, notFound }) {
  const [localMovieChoosed, setLocalMovieChoosed] = useState(null);

  useEffect(() => {
    if (notFound && !localMovieChoosed) {
      setLocalMovieChoosed(null);
    } else if (movieChoosed) {
      setLocalMovieChoosed(movieChoosed);
    }
  }, [movieChoosed, localMovieChoosed, notFound]);

  if (notFound) {
    return (
      <div className="notBox">
        {' '}
        <p className="notFound">
          {' '}
          Sorry.. the scene doesn't exist, choose a rigth route.
        </p>
        <Link to="/" className="link">
          <i className="fa-solid fa-house"></i> Back Home
        </Link>
      </div>
    );
  }

  if (!localMovieChoosed) {
    return (
      <div className="detailsBox">
        <p>We have not found this WOW</p>
        <Link to="/" className="link">
          <i className="fa-solid fa-house"></i> Back Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="cardBox">
        <article className="detailsBox">
          <img className="img" src={movieChoosed.poster} />

          <div className="miniData">
            <h2 className="movieTitle">
              <i className="fa-solid fa-film"></i> {movieChoosed.movie}
            </h2>
            <p>{movieChoosed.phrase}</p>
            <span> Director: {movieChoosed.director}</span>
            <a className="a" href={movieChoosed.audio}>
              <i className="fa-solid fa-microphone-lines"></i> Play it here!
            </a>
            <Link to="/" className="link">
              <i className="fa-solid fa-house"></i> Back Home
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
MovieSceneDetail.propTypes = {
  movieChoosed: PropTypes.shape({
    id: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    movie: PropTypes.string.isRequired,
    phrase: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
  }),
  notFound: PropTypes.bool,
};

export default MovieSceneDetail;
