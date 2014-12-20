# JavaScript Workshop 2
## A Few of My Favorite Things

The purpose of this workshop is to introduce adding behavior to a site using
the JavaScript library jQuery. To accomplish this we will build up an
interactive page that lists a few of our favorite things.

## Libraries

In the real world, libraries share knowledge through books and other media. In
software, libraries are shared bits of code. In the JavaScript world the most
popular library is called jQuery. jQuery makes many features available to your
site and makes many complicated JavaScript tasks easier. Furthermore,
developers can extend jQuery with additional features and make those extensions
available for others. For that matter, the web framework Bootstrap includes a
set of jQuery extensions for handling several modern web interactions such as
modal dialogs, dismissable alerts, popover text, and image carousels.

## Getting jQuery

Resources and instructions for getting jQuery can be found on the [jQuery
website](http://jquery.com/). You can either download the jQuery file itself
and include it on your page with a `<script>` tag or use a CDN (Content
Delivery Network). A CDN is typically the preferred method because it means you
have less code to manage and the file is probably already cached in your users'
browsers. For local development or sites that might not have access to the
internet at large you will need to download the files.

JavaScript libraries will often be presented in two formats: a raw format and a
minified format. The difference is the minified version has been ran through
one or more programs to simplify and compress the code to reduce its overall
download size (at the expense of readability). It is typically best to use the
minified version unless you need to dig in to the library code for some reason.

For today, our template project already includes everything we need.

## Do I need to use jQuery?

No. Everything you can do with jQuery can be done with vanilla (plain)
JavaScript. There is a great resource on the web called [You Might Not Need
jQuery](http://youmightnotneedjquery.com/) that shows how to do common jQuery
tasks with plain JS. However, in many cases you will find that using jQuery is
easier. Further I still advise learning the library because it is so common
among websites that is basically a de facto standard.

## The Template App

You should have the following files:

    .
    ├── css
    │   ├── bootstrap.css     # Bootstrap styles
    │   └── styles.css        # Custom styles
    ├── js
    │   ├── bootstrap.js      # Bootstrap JavaScript
    │   ├── jquery-1.11.1.js  # jQuery library
    │   └── main.js           # Custom JavaScript
    └── index.html            # Our page

We will not need to edit the Bootstrap or jQuery files. Mostly we will be
working in `js/main.js` and `index.html` with occasional edits to
`css/styles.css`.

`index.html` is set up to bring in the other 5 files. Additionally it uses some
basic Bootstrap markup to create a simple page with three sections

1. A header
2. A control section
3. Content

The markup for this page is not ideal for production use but is, instead,
focused on keeping things relatively simple for learning. A better starter
template can be found on [Bootstrap's doc
site](http://getbootstrap.com/getting-started/#template).

Take a minute to be sure you can pull the site up in your browser and make
yourself familiar with the different sections of the page.

## The JavaScript

`js/main.js` is the file where we will be including our application's logic.
Initially this file contains only the following snippet

```javascript
jQuery(document).ready(function() {
  console.log("Document is ready for action!");
});
```

If you pull the site up in your browser and look in the JavaScript console you
should see the log message telling us the site is ready to go. Let's break this
code down into pieces

1. We call the `jQuery` function and pass it `document`. The object `document`
   is a special variable given to us by JavaScript that represents the current
   page.
2. The `jQuery` function returns a new object based on `document` that has
   additional properties and methods. We call this returned object a "jQuery
   object." It represents the original thing passed in but has all of the
   jQuery behavior added. You can think of this as "jQuery-izing" a piece of
   the page.
3. We call the `ready` method on that returned object and pass `ready` a new
   anonymous function as a **callback**. What we're doing here is registering
   that when the document is ready we want to run the code inside that
   anonymous function.
4. When the "ready" **event** happens our anonymous function is called and it
   prints to the log.

## Asynchronous Programming

This model of registering functions to happen in response to events (or Event
Drive Programming) is very common to jQuery and JavaScript in general. This is
also an example of asynchronous programming where things do not happen in a
strict order.

Let's take another look at our code. Add some more console logging before and
after the existing code to better see what's going on as in this example

```javascript
console.log("Registering a callback for document.ready");
jQuery(document).ready(function() {
  console.log("Document is ready for action!");
});
console.log("Done registering a callback");
```

Save your changes and reload the page. You will see the following output in
your console

    Registering a callback for document.ready
    Done registering a callback
    Document is ready for action!

You will notice that the order of these lines does not match the order in the
source code. This is because the anonymous function `function () {
console.log("Document is ready for action!"); }` is not actually executed until
a few milliseconds after it is registered; it is executed when the `document`
is `ready`.

There are several types of events in JavaScript that you can use to drive your
code. Examples include

* The page is loaded
* Something is clicked
* The window is resized
* The mouse cursor moves
* The page is scrolled
* A form is submitted

We will take advantage of these events later in this lesson by repeating the
same basic formula we already have in our `js/main.js`

1. "jQuery-ize" some part of the site
2. Register an event listener
3. Write code to happen in response to that event

## Selectors

We know how to make a jQuery object based on the entire document but most of
the time we want to be more specific. The good news is we can make jQuery
objects out of anything in the DOM. To do this we need to learn about jQuery's
selectors. When you call the `jQuery` function if you pass it a string
describing what part of the DOM to select then `jQuery` will find everything
that fits that description.

Go to the JavaScript console in your browser and try the following commands

```javascript
jQuery('h1');
jQuery('h3');
jQuery('li');
jQuery('div');
jQuery('body');
```

Each of those commands should return a list of all of the matching elements.
For example `jQuery('h3')` should include the `h3` tags that title Animals,
Food, and Movies.

## Select By Class

The selector syntax used by jQuery is similar to the syntax used in CSS. You
can select all elements with the class `panel` by using a dot (`.`) as in
`jQuery('.panel')`.

## Select by ID

If you need to be even more specific you can select an element by it's id using
the hash (`#`) as in `jQuery('#animals')` we would get just the element with
that id. In this case the element is the panel for the favorite animals.

## $ Shortcut

In all of these examples we keep writing `jQuery`. This gets old, fast. The
library also provides us with an alias that maps to the same function `$`. In
JavaScript the dollar sign is not special. Any variable or function name could
contain the dollar sign or, in this case, be made up of just the dollar sign.
jQuery has done this so we can rewrite our previous code as:

```javascript
$(document).ready(function() {
  console.log("Document is ready for action!");
});
```

```javascript
$('h1');
$('h3');
$('li');
$('div');
$('body');
$('.panel');
$('#animals');
```

For the rest of these examples I will use the `$` form.

## Click Events

We know the idea behind registering event callbacks and we know how to select
more elements with jQuery. Let's put these two things together to make progress
on our app! Let's add some behavior when a user clicks on one of the left hand
menu items for Animals, Food, or Movies. We want the associated panel on the
right to be highlighted in blue when they click.

To do this we need to do the following

1. Select one of the buttons and "jQuery-ize" it
2. Register a callback using the `click` method (similar to how we previously
   used `ready`)
3. In our callback, select the appropriate panel on the right then add the
   Bootstrap class `panel-primary`

We should do this code INSIDE the callback being fired when the document is
ready. The reason we wait for that callback is the DOM elements we want to bind
click events to might not be ready yet.

Change your `js/main.js` to look like this

```javascript
$(document).ready(function() {

  $("#menu-animals").click(function() {
    console.log("clicked animals");
  });

});
```

I prefer to take things one step at a time. With this we should be able to
click on the "Animals" menu entry and see a console message. Once that is
working go ahead and hook up the other two items

```javascript
$(document).ready(function() {

  $("#menu-animals").click(function() {
    console.log("clicked animals");
  });

  $("#menu-food").click(function() {
    console.log("clicked food");
  });

  $("#menu-movies").click(function() {
    console.log("clicked movies");
  });

});
```

Click back and forth between the menu items to confirm that this is working.

## Adding Classes

So far we have only used jQuery to select elements and register callbacks. The
library also provides us with many helpful methods for manipulating the
elements. One such method is `addClass`. Given a string class name, the method
will ensure that the class is present on the element.

Inside the callback for the Animals click let's select the Animals **panel**
and give it the Bootstrap class `panel-primary`.

```javascript
$("#menu-animals").click(function() {
  $("#animals").addClass("panel-primary");
});
```

If we did everything correctly then clicking Animals on the left should make
Animals on the right turn blue. Go ahead and repeat this in the other two
functions.

```javascript
$(document).ready(function() {

  $("#menu-animals").click(function() {
    $("#animals").addClass("panel-primary");
  });

  $("#menu-food").click(function() {
    $("#food").addClass("panel-primary");
  });

  $("#menu-movies").click(function() {
    $("#movies").addClass("panel-primary");
  });

});
```

## Removing Classes

So that's pretty neat, huh? We are now making changes that a user could
actually notice. You will probably have noticed, however, that when you move on
from Animals to Food to Movies each panel on the right stays blue. If we
instead intended to have the blue highlight follow only the category we have
selected we need to be removing it from the other panels as we go. To
accomplish this we can use `removeClass`.

Modify your code like this

```javascript
$(document).ready(function() {

  $("#menu-animals").click(function() {
    $("#animals").addClass("panel-primary");
    $("#food").removeClass("panel-primary");
    $("#movies").removeClass("panel-primary");
  });

  $("#menu-food").click(function() {
    $("#animals").removeClass("panel-primary");
    $("#food").addClass("panel-primary");
    $("#movies").removeClass("panel-primary");
  });

  $("#menu-movies").click(function() {
    $("#animals").removeClass("panel-primary");
    $("#food").removeClass("panel-primary");
    $("#movies").addClass("panel-primary");
  });

});
```
