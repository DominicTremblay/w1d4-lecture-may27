#W1D4 - Callbacks

- [Demo we did in class](./demo.js)

## Content

- First-class Objects (First-class citizen)
- Function declaration vs function expressions
- Higher-Order Functions
- Callbacks

## Functions as First-Class Objects

- A function can be treated like any other value in JS
- It can be assigned to a variable
- It can be passed as an argument
- It can returned by another function

### An example of an anonymous function

```
var getCharacter= function () {
  var characters = ['Froddo','Sam','Merry','Peppin'];
  var index = Math.floor(Math.random() * characters.length);
  return characters[index];
}
```

## Differences between function declarations and function expressions

- Function declarations and function expressions provide the same functionality
- Some differences that we need to be aware of

  - The body of function declarations are hoisted contrary to function expressions
  - Hence function expressions cannot be called before their declaration
  - Anonymous function cannot be identified in a stack trace. Although we can name our anonymous functions

## Higher-Order Functions

- A function that accepts another function as input parameters or return another function

### Closures

- Higher-Order functions allows for `closures`
- The returned function (or inner function) will closes over its outerscope to retain the values of the variables

```js
var add = function(n) {
  return function(m) {
    return m + n;
  };
};

var add10 = add(10);
// var add10 = function(m) {
//     return m + 10;
//   }

var addFive = add(5);
// function(m) {
//     return m + 5;
//   }
console.log(add10(9)); // 19
console.log(addFive(3)); //13
```

## Callbacks

- Suppose we want to get a an array of all the numbers that are divisible by three, we can use the following function:

```
function divisibleByThree(numbers) {
  var filteredNumbers = [];
  for (var i=0; i < numbers.length; i++) {
    if (numbers[i] % 3 === 0) {
      filteredNumbers.push(numbers[i]);
    }
  }
  return filteredNumbers;
}
```

- Now this works, but what if we want the numbers that are divisible by five, we would have to code another function.

```
function divisibleByFive(numbers) {
  var filteredNumbers = [];
  for (var i=0; i < numbers.length; i++) {
    if (numbers[i] % 5 === 0) {
      filteredNumbers.push(numbers[i]);
    }
  }
  return filteredNumbers;
}
```

- And we would repeat the function if we need the numbers that are divisible by two.
- When we repeat code, it means we're not following the DRY principle

- What if we want to make it more reusable. Let's generalize the function by adding a parameter:

```
function divisibleBy(numbers, div) {
  var filteredNumbers = [];
  for (var i=0; i < numbers.length; i++) {
    if (numbers[i] % div === 0) {
      filteredNumbers.push(numbers[i]);
    }
  }
  return filteredNumbers;
}
```

- This version is much more reusable because it works with any number
- How do we generalize the function even more by providing the desired functionality as a parameter?
- Let's make a general filter function that works with any kind of filter by using a callback function:

```
function filter(numbers, callback) {
  var filteredNumbers = [];
  for (var i=0; i < numbers.length; i++) {
    if (callback(numbers[i])) {
      filteredNumbers.push(numbers[i]);
    }
  }
  return filteredNumbers;
}
```

- To get the same result as the divisibleByThree function, we are providing the following **callback**:

```
function isDivByThree (number) {
  return number % 3 === 0
}
```

- And we call the filter function using the callback:

```
filter(numbers, isDivByThree);
```

- Or we can simply create an anonymous function as an argument:

```
filter(numbers, function(number) {
  return number % 3 === 0;
})
```

- In fact, we can pass any function to create any filter we want:

```
filter(numbers, function(number) {
  number > 15
})
```

### Example with Our New Filter Function

```
var movies = [
  {title: "Black Panther", year: 2018, genre: "action", rating: 7.4},
  {title: "Avengers Infinity War", year: 2018, genre: "action", rating: 8.5},
  {title: "Avengers Infinity War", year: 2018, genre: "action", rating: 8.5},
  {title: "Spider-Man: Into the Spider-Verse", year: 2018 , genre: "Fantasy/Science Fiction", rating: 8.7},
  {title: "Incredibles 2", year: 2018 , genre: "Science Fiction/Action", rating: 7.8},
  {title: "Deadpool 2", year: 2018, genre: "action", rating: 7.8},
  {title: "Ant-Man and the Wasp", year: 2018, genre: "action", rating: 7.2},
  {title: "Venom", year: 2018, genre: "Thriller/Science Fiction", rating: 6.8},
  {title: "Ralph Breaks the Internet", year: 2018, genre: "Comedy", rating: 7.3},
]

function filter(list, callback) {
  var filteredList = [];
  for (var i = 0; i < list.length; i++) {
    if (callback(list[i])) {
      filteredList.push(list[i]);
    }
  }
  return filteredList;
}

var highestRatings = filter(movies, function(movie) {
  return movie.rating >= 8;
});

console.log(highestRatings);

// Create a new array with a different format

var update = function(list, callback) {
  var output = [];

  for (var item of list) {
    output.push(callback(item));
  }
  return output;
};

var compactMovies = update(movies, function(element) {
  return element.title + ' - ' + element.year + ' - ' + element.rating;
});

console.log(compactMovies);

// Get the average ratings

var avgRatings = function(movies) {
  total = 0;
  for (var movie of movies) {
    total += movie.rating;
  }
  return total / movies.length;
};

var avg = avgRatings(movies);
console.log('Average ratings: ', avg);

var accumulate = function(list, callback, start) {
  var accumulator = start || 0;
  for (var item of list) {
    accumulator = callback(accumulator, item);
  }
  return accumulator;
};

var total = accumulate(
  movies,
  function(total, movie) {
    return total + movie.rating;
  },
  0
);

var maxRating = accumulate(movies, function(max, nextMovie) {
  if (nextMovie.rating > max) {
    return nextMovie.rating;
  } else {
    return max;
  }
});

console.log('Total: ', total / movies.length);
console.log('Max: ', maxRating);

```

## Origin of Callbacks

1. JavaScript is an event driven language

2. A callback function is required when a specific task of event has finished. We can see what is going on with a tool called [Loupe](http://latentflip.com/loupe/)

## Callback Hell

## Summary

- In JavaScript, functions are first-class objects (or first-class citizens) ie they can be treated like any other values

  1. Functions can be assigned to a variable (function expression) or to a property of an object
  2. Passed as arguments into functions
  3. Returned as values from functions

- In JavaScript, a callback is a function passed as an argument to another function

- A function that accepts (or return) a function as arguments is called a higher-order function

- The benefit of a higher-order functions (a function that takes a callback) is a highly reusable function allowing our code to stay DRY!

- Callbacks are also used when running asynchronous code.
