function dealMovie(movie) {
    var title;
    var originalTitle = movie.original_title;
    if (originalTitle.length === '') {
        title = movie.title;
    } else {
        title = movie.title + " / " + originalTitle;
    }
    var directors = movie.directors;
    var directorStr = "";
    directors.forEach(function (director) {
        directorStr = directorStr + director.name + " / ";
    });
    if (directorStr !== "") {
        directorStr = directorStr.substring(0, directorStr.length - 2);
    }
    var casts = movie.casts;
    var castStr = "";
    casts.forEach(function (cast) {
        castStr = castStr + cast.name + " / ";
    });
    if (castStr !== "") {
        castStr = castStr.substring(0, castStr.length - 2);
    }
    var genres = movie.genres;
    var genresStr = "";
    genres.forEach(function (genre) {
        genresStr = genresStr + genre + " / ";
    });

    if (genresStr !== "") {
        genresStr = genresStr.substring(0, genresStr.length - 2);
    }
    var year = movie.year;
    var score = movie.rating.average.toString();
    var scoreArr = score.split("");
    var scoreStr = "评\n分\n  ";
    scoreArr.forEach(function (s) {
        scoreStr = scoreStr + s + "\n";
    });

    movie.score = scoreStr;
    movie.info =
        "名称：" + title +
        "\n导演：" + directorStr +
        "\n主演：" + castStr +
        "\n类型：" + genresStr +
        "\n上映年份：" + year + "(中国大陆)";
}

function dealMovies(movies) {
    for (var i = 0; i < movies.length; i++) {
        var movie = movies[i];
        this.dealMovie(movie);
    }
}

module.exports = {
    dealMovie: dealMovie,
    dealMovies: dealMovies
};
