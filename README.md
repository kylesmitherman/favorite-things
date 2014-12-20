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
