![Title Page](http://stephslye.github.io/images/photohaiku.png)

------------------
#PHOTOHAIKU
------------------

* [View app on Heroku](https://photohaiku.herokuapp.com/)
* [View repository on GitHub](https://github.com/stephslye/photohaiku)

For my first MERN stack app, I knew I wanted to
1. Work with an image content analysis API, as I am fascinated with that technology;
2. Write lots of sorting and filtering functions, as I find them satisfying; and
3. Create an app that creates a work of art.
The result is Photohaiku, an app that produces an original haiku (a three-line poem of five, seven and five syllables) based on a user-submitted photo. Users can create their own photohaiku, as well as browse, view and like (and unlike) other users’ submissions.

![Index](http://stephslye.github.io/images/photohaiku1.png)

----------
##Approach
----------

This project uses the Filestack, Google Cloud Vision and Datamuse APIs to receive the photos, analyse them, and provide arrays of related words (with syllable counts). I then plugged these words into my own templates to produce the photohaiku.

I really enjoyed getting the three APIs to work together in one seamless (to the user) process, with the most challenging being the Google Cloud Vision API, as it had to be integrated into my model on the backend.

----------------------
##Room for improvement
----------------------
* Going forward, I’d love to improve the functionality for user accounts, for example enabling users to set their account to private and to friend and unfriend other users.

--------------
##Technologies
--------------
Languages:
* HTML5
* SCSS
* JavaScript

Front-end Web Application Framework:
* React

CSS Framework:
* Bulma

REST client
* Insomnia

APIs:
* [Filestack](https://www.filestack.com/)
* [Google Cloud Vision](https://cloud.google.com/vision/)
* [Datamuse](http://www.datamuse.com/)

Typefaces:
* [Google Fonts](http://fonts.google.com)

Text Editor:
* Atom

Browser:
* Chrome

---------
##Contact
---------

* hello@stephanieye.com
* http://stephanieye.com
