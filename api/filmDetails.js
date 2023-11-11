import 'dotenv/config'

const filmDetails= {
    images : (typeOfFilm, id) => {
        return `${process.env.NEXT_APP_MOVIE_BASE_URL || 'https://api.themoviedb.org/3'}/${typeOfFilm}/${id}/images`
    }
    // typeOfFilm : 'movie' || 'tv'
    // id : number
}

export default filmDetails;