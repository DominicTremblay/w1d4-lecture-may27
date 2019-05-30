var movies = [
  { title: 'Black Panther', year: 2018, genre: 'action', rating: 7.4 },
  { title: 'Avengers Infinity War', year: 2018, genre: 'action', rating: 8.5 },
  {
    title: 'Spider-Man: Into the Spider-Verse',
    year: 2018,
    genre: 'Fantasy/Science Fiction',
    rating: 8.7,
  },
  {
    title: 'Incredibles 2',
    year: 2018,
    genre: 'Science Fiction/Action',
    rating: 7.8,
  },
  { title: 'Deadpool 2', year: 2019, genre: 'action', rating: 7.8 },
  { title: 'Ant-Man and the Wasp', year: 2016, genre: 'action', rating: 7.2 },
  {
    title: 'Venom',
    year: 2018,
    genre: 'Thriller/Science Fiction',
    rating: 6.8,
  },
  {
    title: 'Ralph Breaks the Internet',
    year: 2017,
    genre: 'Comedy',
    rating: 7.3,
  },
];

// We coded our own version of the JS built-in filter function
function filter(numbers, callback) {
  var filteredNumbers = [];
  for (var i = 0; i < numbers.length; i++) {
    if (callback(numbers[i])) {
      filteredNumbers.push(numbers[i]);
    }
  }
  return filteredNumbers;
}

// We coded our own version of the JS built-in map function
var update = function(list, callback) {
  var updateArr = [];

  for (var i = 0; i < list.length; i++) {
    updateArr.push(callback(list[i]));
  }
  return updateArr;
};

// Getting the movies with a rating or more than 8
filter(movies, function(movieObj) {
  return movieObj.rating > 8;
});

// Getting an array of strings, title and year
update(movies, function(movieObj) {
  return 'Title: ' + movieObj.title + ' Year: ' + movieObj.year;
});

// Getting an array of movie objects with only title and year
var updatedMovies = update(movies, function(movieObj) {
  return { title: movieObj.title, year: movieObj.year };
});

// Chaining the built-in filter and map functions
movies
  .filter(function(movieObj) {
    return (movieObj.year = 2018);
  })
  .map(function(movieObj) {
    return 'Title: ' + movieObj.title + ' Year: ' + movieObj.year;
  });

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

// Created an accumulate function equivalent to JS built-in Reduce
var accumulate = function(list, callback, start) {
  var accumulator = start || 0;

  for (var i = 0; i < list.length; i++) {
    accumulator = callback(accumulator, list[i]);
    console.log('accumulator', accumulator);
  }
  return accumulator;
};

// Getting the sum of numbers
var totalRatings = accumulate(numbers, function(total, next) {
  return (total += next);
});

// Get the highest rating movie
var highestRating = accumulate(
  movies,
  function(min, movieObj) {
    if (movieObj.rating < min) {
      max = movieObj.rating;
    }

    return min;
  },
  movies[0].rating
);

console.log(highestRating);

// var average = function (numbers) {
//   return sum(numbers) / numbers.length
// }

// Without the accumulate function we needed to code our own

// var ratingAverage = function(moviesArr) {
//   var total = 0;
//   for (var i=0; i < moviesArr.length; i++) {
//     total += moviesArr[i].rating
//   }
//   return Math.round(total / moviesArr.length * 100) / 100;
// }

// ratingAverage(movies);
