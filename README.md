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

## Adding Items

This is pretty fancy but the content is still static. We need to be able to be
able to add more items to the list. With a typical web application you would
post a form or an AJAX request to a server which would ultimately store the
content in a database. For our learning purposes today we are going to simply
add more `<li>` items to the different lists in the DOM.

To accomplish this we will use the form on the left hand side of the screen. If
you type something in to the box and hit "Add" you will see the page
refreshing. To make this refresh more apparent try clicking on one of the menu
items to turn it blue then submit the form. You should see the panel revert
back to grey because we are on a freshly loaded page. For our code we want to
hook in to that form submission and use the data ourselves.

We will need to do the following

1. Select the form with jQuery
2. Bind a callback to its `submit` event
3. Use the form data to update the page

To start, add this code below the menu code (but still inside the document's
ready function):
```javascript
  $("form").submit(function () {
    console.log("in the form's submit");
  });
```

Save your changes and reload the page. Fill out the form and hit "Add". You
might expect that you would see your logging in the console. However, you will
not because the form's submission caused the browser to reload the page. Change
our code like this:

```javascript
  $("form").submit(function (event) {
    event.preventDefault();
    console.log("in the form's submit");
  });
```

All jQuery event callback functions are actually passed a variable that
represents the event which triggered the call. jQuery events provide a method
`preventDefault` which can be used to prevent the default action of the event.
In this case the event is a form submission and we do **not** want the default
behavior to continue so we have to disable it.

## Getting Data

Now that that's out of the way let's get on to doing something with it. We need
to select the description of the new item and the type so we know which list to
add it to. In jQuery you can get the value of form elements with `val`.

```javascript
  $("form").submit(function (event) {
    event.preventDefault();

    var type = $("#type").val();
    var item = $("#item").val();
    console.log(item + " " + type);
  });
```

As you change the drop down and text input and hit "Add" you should see the
messages in the console changing.

We now have a variable `type` which tells us which list to add to and a
variable `item` that has the description. We should use an `if` statement to
find the appropriate target list. Update the code as follows:

```javascript
  $("form").submit(function (event) {
    event.preventDefault();

    var type = $("#type").val();
    var item = $("#item").val();

    var newHtml = "<li>" + item + "</li>";

    $("#" + type + " .favorite-list").append(newHtml);
  });
```

## Setting Data

I don't know about you, but at this point I'm feeling pretty accomplished.
There are, however, a few tweaks we could make to make this more user friendly.
Have you noticed that when you submit the form the values stay in the input
box? You probably don't really want to add the same thing multiple times in a
row. We can help out by clearing the input box after we're done with it.

In jQuery `val` will get the current value by default. If, however, you pass it
something as an argument then `val` switches from a "getter" to a "setter" and
will assign that value to the input. To clear an input we just have to pass the
value `""`. So, somewhere after you fetch the current value, add this line

```javascript
$("#item").val("");
```

## Removing Elements

What if we have added items to the list that we don't want? Our current design
provides no way to delete them. Add the following code at the bottom of (but
still inside) our document's ready function

```javascript
  $(".favorite-list").click(function (event) {
    var target = event.originalEvent.target
    $(target).remove();
  });
```

There are three important concepts here that need to be addressed.

First take note that we are binding to the click event of **any** element that
has the class `favorite-list`. All three sections contain a `<ul>` that has
this class.

The second is **event bubbling**. We are binding the listener to the parent
`<ul>` but what we care to remove is the child `<li>` that was actually
clicked. To do this we access the event that we are passed (`event`) and pull
out the original event (`event.originalEvent`) that triggered the action. This
original event was first resolved on the `<li>` and then notified its parent
element. After our callback is done the parent of this `<ul>` will be notified,
and then it's parent, and then it's parent and so on until it reaches the top
of the DOM.

By binding this listener to all of the favorite lists and by listening for
click events to bubble up from the actual list items we can keep our code
simple and DRY.

The third concept to note is the call `.remove()`. This method will remove the
target element from the DOM entirely.

## Further Study

There are several more things we could do with this app. Ideas include

* Update the item counts on the menu navigation whenever an item is added or removed
* Hide all lists but the active list using `.hide()` and `.show()`. Experiment
  with calling `.hide(500)` to see items ease out of visibility instead of
  instantly disappearing.
* Refactor the click highlight code to not be so repetitive
* Add a confirmation dialog on the removal of favorite items
* Add error checking for blank values when adding new items
* Show a success notice when adding a new item
* Add a button on the panel headings to remove all items on that list
* Make entire new categories on demand (don't limit to 3)

## Final Code

For your reference, the final form of the JavaScript file as of the end of this
lesson is as follows

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

  $("form").submit(function (event) {
    event.preventDefault();

    var type = $("#type").val();
    var item = $("#item").val();
    $("#item").val("");

    var newHtml = "<li>" + item + "</li>";

    $("#" + type + " .favorite-list").append(newHtml);
  });

  $(".favorite-list").click(function (event) {
    var target = event.originalEvent.target
    $(target).remove();
  });
});
```
