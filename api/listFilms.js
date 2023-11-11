const listFilms = {
  getListFilm: (typeOfFilm, menu, page) => {
    return `${process.env.NEXT_APP_MOVIE_BASE_URL  }/${typeOfFilm}/${menu}?language=en-US&page=${page}`;
  },
};

export default listFilms;

/// typeOfFilm : 'movie' || 'tv'
/// menu : 'popular' || 'now_playing' || 'upcoming' || 'top_rated' || 'airing_today' || 'on_tv'
// page : number
