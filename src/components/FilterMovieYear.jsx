import '../styles/layouts/Filters.scss';

function FilterMovieYear({ year, updateSelect, SelectedYears }) {
  const handleChange = (ev) => {
    updateSelect(ev.target.value);
  };
  const renderYear = () => {
    return SelectedYears.map((eachYear, index) => (
      <option key={index} value={eachYear}>
        {eachYear}
      </option>
    ));
  };
  return (
    <>
      <div className="searchYears">
        <label htmlFor="year" className="label">
          Year
          <select
            className="boxS"
            name="year"
            id="year"
            value={year}
            onChange={handleChange}
          >
            <option value="">All</option>
            {renderYear()}
          </select>
        </label>
      </div>
    </>
  );
}

export default FilterMovieYear;
