import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/layouts/MovieItem.scss';

function MovieSceneItem({ movie }) {
  return (
    <>
      <div className="CardDesc">
        <Link className="movie-details" to={`/movie/${movie.id}`}>
          <article className="article">
            <img
              className="imgMovie"
              src={movie.poster}
              alt="Foto de la pelicula"
              title={movie.movie}
            />
            <div className="movie-details">
              <span className="span">-{movie.movie}-</span>
              <span className="span">{movie.phrase}</span>
              <span className="span">{movie.year}</span>
            </div>
          </article>
        </Link>
      </div>
    </>
  );
}
MovieSceneItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    movie: PropTypes.string.isRequired,
    phrase: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
};
export default MovieSceneItem;
