import PropTypes from 'prop-types';
import '../styles/layouts/Filters.scss';

function FiltersMoviesTitle({ updateInput, title }) {
  const handleInput = (ev) => {
    updateInput(ev.target.value);
  };

  return (
    <>
      <div className="searchName">
        <label className="label" htmlFor="">
          Movie
          <input
            className="boxI"
            type="text"
            name="movie"
            value={title}
            id=""
            placeholder="Movie Title..."
            onChange={handleInput}
          />
        </label>
      </div>
    </>
  );
}
FiltersMoviesTitle.propTypes = {
  updateInput: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
export default FiltersMoviesTitle;
