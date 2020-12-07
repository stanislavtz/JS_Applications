import { getMovies } from '../data.js'

export async function home() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        movie: await this.load('./templates/movies/movie.hbs')
    }

    const movies = await getMovies();
    this.app.userData.movies = movies;

    const context = Object.assign({}, this.app.userData)

    await this.partial('./templates/home.hbs', context);
}