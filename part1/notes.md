## Introduction to react
- React components don't return html markup but JSX.
- It is also possible to write React as "pure JavaScript" without using JSX. Although, nobody with a sound mind would actually do so.
- JSX is "XML-like", which means that every tag needs to be closed.
- React component names must be capitalized

## Javascript
- Node.js is a JavaScript runtime environment based on Google's Chrome V8 JavaScript engine and works practically anywhere - from servers to mobile phones. 
-  const does not actually define a variable but a constant for which the value can no longer be changed. On the other hand let defines a normal variable.
- In the previous example, a new item was added to the array using the method push. When using React, techniques from functional programming are often used. One characteristic of the functional programming paradigm is the use of immutable data structures. In React code, it is preferable to use the method concat, which does not add the item to the array, but creates a new array in which the content of the old array and the new item are both included.
- Arrow functions and functions defined using the function keyword vary substantially when it comes to how they behave with respect to the keyword this, which refers to the object itself.

## Rules of Hooks

- There are a few limitations and rules we have to follow to ensure that our application uses hooks-based state functions correctly.

-The useState function (as well as the useEffect function introduced later on in the course) must not be called from inside of a loop, a conditional expression, or any place that is not a function defining a component. This must be done to ensure that the hooks are always called in the same order, and if this isn't the case the application will behave erratically.