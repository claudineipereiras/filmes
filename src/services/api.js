import axios from 'axios';

//URL FILMES EM CARTAZ:
//https://api.themoviedb.org/3/

//movie/now_playing? &language=pt-BR &page=1

export const key = 'f3a2883ad37e1d56e817e8c6d1af5ff3'


const api = axios.create({
    baseURL: 'https://api.themovie.org/3'
})

export default api;
