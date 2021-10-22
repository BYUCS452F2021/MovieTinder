const retrieveGenreList = async () => {	
	try {
		const genresArray = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.EXPO_API_KEY}&language=en-US`)
			.then(response => response.json())
			.then(data => data.genres ? data.genres : []);
		return { success: true, genres: genresArray };
	} catch (error) {
		return { success: false, errorMsg: error };
	}
};

const retrieveMovieListWithSelections = async (movieGroupSettings) => {
	let genreString = ''
	let genreArr = movieGroupSettings.genres;
	for(let i = 0; i < genreArr.length; i++) {
		console.log(genreArr[i].id, genreArr[i].name)
		genreString = genreString + genreArr[i].id + '|'
	}
	genreString.slice(0, 1);
	try {
		const movieList = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.EXPO_API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=2&release_date.gte=2000-01-01&release_date.lte=2018-12-31&with_genres=${genreString}&with_original_language=en`)
			.then(response => response.json())
			.then(data => data.results);
			console.log("MOVIE LIST", movieList);
		return {success: true, movies: movieList};
	} catch (error) {
		return {success: false, errorMsg: error}
	}
};

const retrieveWatchProviders = async (movieID) => {
	try {
		const watchProvidersList = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/watch/providers?api_key=${process.env.EXPO_API_KEY}`)
			.then(response => response.json())
			.then(data => (data.results['US']['flatrate'][0]['provider_name']));
		return {success: true, watchProviders: watchProvidersList};
	} catch (error) {
		return {success: false, errorMsg: error}
	}
};

export { retrieveGenreList, retrieveMovieListWithSelections, retrieveWatchProviders };