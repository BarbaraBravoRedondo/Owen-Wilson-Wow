import uuid from 'react-uuid';
const callToApi = () => {
  // Llamamos a la API y convertimos la respuesta en formato JSON
  return fetch(
    '//owen-wilson-wow-api.onrender.com/wows/random?results=50'
  )
    .then((response) => response.json())
    .then((data) => {
      const cleanData = data.map((data) => {
        return {
          poster: data.poster,
          movie: data.movie,
          year: data.year,
          phrase: data.full_line,
          audio: data.audio,
          director: data.director,
          id: uuid(),
        };
      });

      return cleanData;
    });
};

export default callToApi;
