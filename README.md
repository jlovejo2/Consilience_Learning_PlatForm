# Consilience

Consilience is the principle that evidence from independent, unrelated sources can "converge" on strong conclusions. This platform exists to allow user to registered as 'Teachers' or 'Students.' Both can search the classes listed and request to join them. Each class a user joins will be generated on their dashboard and one can 'enter the classroom.' The teacher has a gradebook option which allows them to create assignments and provide each student a grade for them.

This app also has pretty extension security that is detailed towards the bottom of the README. Essentially we used JSON Web Tokens (JWTs) to create authorization keys that are set to expire in 24 hours. Upon logging out the user is provide with a new JWT with a lifetime of 1 milisecond.

the link to github is shown below:
TBD

the link to the functional app is shown below:
https://consilience-jlovejo2.herokuapp.com/

## Table of Contents

- [User Story](#user-story)
- [Version 1.0](#version-1.0)
- [How To Use](#how-to-use)
- [Coding Languages Used](#coding-languages-used)
- [NPMs Used](#npms-used)
- [CSS Framework](#css-framework)
- [Structure of Code and Functions](#structure-of-code-and-functions)
- [Things To Improve On](#things-to-improve-on)

## User Story

As a USER I believe that a person never stops learning and a lot of people out there have something to teach and learn from one another. I want to be to search for classes and be able to keep track of them. Consilience is a platform that can provide this for both those who have something to teach, want to learn, or both.

## Version 1.0

- This reactjs app runs via heroku or by entering the command "npm start" to initialize the react server.
- Make sure you are in the main folder when running the code on the command line.
- This app has seven pages: HOME, LOGIN, DASHBOARD, SEARCH, CLASSROOM, GRADEBOOK, LOGOUT
- Home page - is the start page and routes the user to login page
- Login page - allows the user to either login if they have an account or register as a new user and then login
- Dashboard - allows the user to see all the classes they are signed up to be in
- Search page - allows user to search the database of classes and request to join them
- Classroom page - has an annoucement board that users can post on, with an assignments div that shows the assignments for the class
- Gradebook page - allows the teacher, to add assignments and grades for those assignments to each student
- Logout page - lets the user logout. Upon logging out they are assigned a new auth token that expires in 1 millisecond.

## How To Use

See the layout of the app below.

- The home page of the app has a little description explaining what the app can be used for. Other than that at the top of the screen without being a user one can search the classes that exist on the website. Can't join if you aren't a member though. Also there is a login button that will take you the login screen

!["Starting page of App"](/client/public/assets/images/readme/homePage.jpg)

- If the user clicks on the login button the login dialog opens up and the user can login or click on the register link if they are a new member. The register link will open up the register dialog. There are two types of user either a teacher or student. Teacher has the ability to create courses as well as join them, while a student can only join them

|                                                    Login Dialog                                                    | Register Dialog |
| :----------------------------------------------------------------------------------------------------------------: | :-------------: |
| !["Login Dialog"](/client/public/assets/images/readme/) !["Register Dialog"](/client/public/assets/images/readme/) |

- Once a user has logged into the website they start off at the dashboard. There are several links in the top right corner that allow the user to navigate to different pages. Also if the user has created a course or joined a course the course cards will be rendered onto the dashboard page shown in the image. The class cards render differently depending on if the user is a teacher or a student. The two main differences is that the cards have a red trim if the user is a student, and the gradebook button does not render onto the card.

!["Dashboard"](/client/public/assets/images/readme/)

- The rendered search results will appear onto the page as seen in image. Each book has two buttons in upper right-hand corner.
  - "View" will take user to google books link for that book
  - "Save" will save the book to the database

!["Rendered Search Results"](/client/public/assets/images/readme/render-search.png)

- Clicking on the saved tab in the navbar will render all the saved books to the page. Layout is identical to the searched books however one of the buttons has changed in upper right hand corner. Shown in green box.
  - "View" same as on search page
  - "Delete" will delete the book from the database

!["Example of Table Filter Results"](/client/public/assets/images/readme/saved.jpg)

- The user is notified on both completed book save and book delete

|                   Modal that Renders on Saved Book                   |                    Modal that Renders on Delete Book                    |
| :------------------------------------------------------------------: | :---------------------------------------------------------------------: |
| !["Saved Modal"](/client/public/assets/images/readme/save-modal.png) | !["Delete Modal"](/client/public/assets/images/readme/delete-modal.png) |

## Coding Languages Used

- HTML
- CSS
- Javascript
- React.js
- JSX
- Node.js

## NPMs Used:

# Client-Side

- @material-ui/core
- @material-ui/icons
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- animate.css
- material-table
- mdbreact
- react
- react-app-polyfill
- react-dom
- react-router-dom
- react-scripts
- react-toastify
- styled-components

# Back-end

- @date-io/date-fns
- @material-ui/core
- axios
- bcrypt
- bcryptjs
- body-parser
- chance
- cookie-parser
- cors
- dotenv
- express
- if-env
- is-empty
- jsonwebtoken
- moment
- mongodb
- mongoose
- morgan
- multer
- nodemailer - for version 2.0
- passport
- passport-http-bearer
- passport-jwt
- path
- socket.io - didn't implement for version 2.0
- validator"

## CSS Framework:

- Material UI
- MdbReact

## Structure of Code and Functions

# Front-End - Client folder

- public folder
  - index.html - with react does not contain much code but necessary library links like for bulma. It interacts with App.js
- src folder - this is the meat of react and holds most of the front-end code
  - components folder - all the html components that require some custom props and CSS have their own folder in component with an index.js file in it and style.css file if necessary
    - bookResults
      - this component contains the JSX that is used to render the book results to the page. It is used by both Search and Saved pages
    - button
    - footer
    - Grid
      - this component contains functions for components use to create bulma layouts such as Col, Section, Container, and Tile
    - Hero - bulmas version of jumbotron
    - Modal
    - Nav
      - this component contains the code for the navbar. Also contains functionality for the burger menu
    - SearchBar
      - this component contains the select option, input, and determines props of search button on search page
  - pages folder - contains the actual pages for the App
    - Home.js - this is the homepage for the app. Only has some text on it as of now.
    - Saved.js - this page is rendered onto home page. It renders all the saved books onto the apge
    - Search.js - this page renders the select, input, and search buttons onto the page. Then when search is executed it renders the returned results onto the page

# Back-end

- Controllers folder
  - functions.js: this file contains a custom function used to validate if the response object brought back from google books api has a valid image link in it. If not it just places a generic text string so object can be sent to front-end.
  - googleBooksController.js: This file receives the search critieria sent from the front-end. It assembles the proper query and then makes request to google books api. Upon receiving response object back it takes what it wants out of and saves it to new object which it sends to the front-end
  - savedBooksController.js: This file contains the four functions use to interact with the savedBooks Schema in database
    - findById, create, delete, findAll
- models folder
  - index.js
  - savedBook.js: this file creates the schema for the saved books in mongo
- routes folder
  - index.js: this file handles the first level of the routes and sends them either to the googleBooksController, apiFolder, or the React App
  - api folder
    - index.js: this file isn't super necessary for the few calls I have. However, it is set-up to direct api routes to specific files. This files directs all "/savedBook" routes to savedBook.js
      -savedBooks.js: breaks the routes down further into 2 types "/" and "/:id" then calls the appropriate controller functions for them
- server.js - where the back-end magic starts

## Things To Improve On

- Add ability for comment value to be emptied upon submitting it
- Add Ability to save attachments for assignments
- Add ability for students to submit work for assignments
- Add ability to remove and edit assignments
- Add ability to remove & edit grades
- Add default value for select button
- Add a search by course discipline instead of search by subject
- Using react-scheduler to add a schedule page for the teacher to create a class schedule

MERN
heroku repo created
username and password for mLab also created
connection with remote database established via robo3T

- https://socket.io/
- https://www.npmjs.com/package/jsonwebtoken
- https://www.npmjs.com/package/bcrypt
- http://www.npmjs.com/package/morgan
  - HTTP request logger middleware for node

## Security Considerations

### Authentication vs Authorization

- Authentication

  - Who are you?
  - Login with email and password

- Authorization
  - What are you allowed to do?
  - Check user rights

### JSON Web Tokens (JWTs)

- Access Token Standard
- Structured and Stateless
- Used for authorization and secure info exchange
- Statelessly handle user authentication
  - Renders need to reference a session or database obsolete
- Base64 encoded
- Pronounced "JOT"
- Cryptographically signed
  - If tampering occurs authorized status immediately revoked; signature invalid if modified in any way
- Always encoded, can be encrypted
- Open standard (RFC 7519) defining a compact and self-contained method for securely transmitting info between parties as a JSON object

### Anatomy of a JWT - Three Parts

- Header
  - Describes the token
  - Specifies type of token and hash algorithm used to create token's content
- Body
  - Payload
  - Contains user information known as "claims"
  - Information that JWT claiming to be true about user
  - Commonly includes name and timestamp reflecting JWT issue time
  - Token expiration time
- Signature (cryptographically signed in this app)
  - Verifies integrity of token
  - Ensures content is uncompromised (hasn't been tampered with)

### Base64 Encoded

- JWT is compact
- Header, Body, and Signature are each Base64 encoded
  - Then separated by dots
  - https://en.wikipedia.org/wiki/Base64
  - https://www.base64encode.net/
  - Base64 Index table (values 0-63)
  - values 0-25 -> uppercase A-Z
  - values 26-51 -> lowercase a-z
  - values 52-61 -> numbers 0-9
  - value 62 -> \_
  - value 63 -> -

#### JWT Example (Header.Body.Signature)

- Encoded (ASCII--American Standard Code for Information Interchange)
  - Header:
    - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
  - Payload (Body):
    - eyJfaWQiOiI1ZThhMzFmZDRiMmQ0NTE2NjQ2YTFkYzUiLCJ0eXBlIjoidGVhY2hlciIsImZpcnN0TmFtZSI6Ikt5bGllIiwibGFzdE5hbWUiOiJNb25zdGVyIiwiZW1haWwiOiJLeWxlQGdtYWlsLmNvbSIsIklEIjoia21vbnN0ZXdvbWUxIiwiY3JlYXRlRGF0ZSI6IjIwMjAtMDQtMDVUMTk6MzE6MDkuMjk3WiIsIl9fdiI6MCwiaWF0IjoxNTg2MTczMDU4LCJleHAiOjIxOTA5NzMwNTh9.
  - Signature:
    - 9m0_s_N7T6WE9JfN9gZbQ_k8sEmPvIXszQlLvVk7WUU

### Cookies vs Local Storage -- JWTs on Client Side

- Local storage vulnerable to cross-site-scripting (XSS) attacks
  - Attacker can inject malicious javascript into app
  - Larger attack surface area
  - Can impact all application users on successful attack
- Cookies vulnerable to cross-site request forgery (CSRF)
  - Attacker can perform actions via an authenticated user
  - Similar to how viruses use capsids to infiltrate immune system undetected
- This React app has a dedicated server so JWTs are stored in an HttpOnly Cookie w/ secure flag enabled
  - protects from cross-site scripting (XSS)
  - secure flag ensures cookie only sent over https
  - such cookies cannot be accessed by JavaScript
  - Hence, why they're generated on a server
  - Can make CSRF protection stateless by including a xsrfToken JWT claim

### Password Hashing

- Bcryptjs was used for password hashing
  - Implemented when a new user is created
  - 10 rounds of salting
  - Unhashed password is never stored in the database
  - all objects performing res.json have hashed passwords deliberately deleted from clones

### Generating environmental secrets

- open terminal in vscode
  - type: node
  - hit: enter
- this opens up node terminal
  - type: require('crypto').randomBytes(64).toString('hex')
  - hit: enter
- this returns a 122 character string in hexadecimal
  - 1 Byte = 8 bits;
  - 512 random bits (64 Bytes) used in crypto secret generation
  - example:
    - 'ed3797711bd78a72186fae8b8200bca2e9e14bce3eba46a5797b3bb34f6e23ccac398ffc82fc4bf57d4afab2ffb1aa4a3357aede9f27bbb69d1150dd35'

| Decimal | 8-bit Binary | Hexadecimal |
| ------- | ------------ | ----------- |
| 0       | 0000 0000    | 00          |
| 1       | 0000 0001    | 01          |
| 2       | 0000 0010    | 02          |
| 3       | 0000 0011    | 03          |
| 4       | 0000 0100    | 04          |
| 5       | 0000 0101    | 05          |
| 6       | 0000 0110    | 06          |
| 7       | 0000 0111    | 07          |
| 8       | 0000 1000    | 08          |
| 9       | 0000 1001    | 09          |
| 10      | 0000 1010    | 0A          |
| 11      | 0000 1011    | 0B          |
| 12      | 0000 1100    | 0C          |
| 13      | 0000 1101    | 0D          |
| 14      | 0000 1110    | 0E          |
| 15      | 0000 1111    | 0F          |
| 16      | 0001 0000    | 10          |
| 17      | 0001 0001    | 11          |
| 18      | 0001 0010    | 12          |
| 19      | 0001 0011    | 13          |
| 20      | 0001 0100    | 14          |
| 21      | 0001 0101    | 15          |
| 22      | 0001 0110    | 16          |
| 23      | 0001 0111    | 17          |
| 24      | 0001 1000    | 18          |
| 25      | 0001 1001    | 19          |
| 26      | 0001 1010    | 1A          |
| 27      | 0001 1011    | 1B          |
| 28      | 0001 1100    | 1C          |
| 29      | 0001 1101    | 1D          |
| 30      | 0001 1110    | 1E          |
| 31      | 0001 1111    | 1F          |
| 32      | 0010 0000    | 20          |
| 33      | 0010 0001    | 21          |
| 34      | 0010 0010    | 22          |
| 35      | 0010 0011    | 23          |
| 36      | 0010 0100    | 24          |
| 37      | 0010 0101    | 25          |
| 38      | 0010 0110    | 26          |
| 39      | 0010 0111    | 27          |
| 40      | 0010 1000    | 28          |
| 41      | 0010 1001    | 29          |
| 42      | 0010 1010    | 2A          |
| 43      | 0010 1011    | 2B          |
| 44      | 0010 1100    | 2C          |
| 45      | 0010 1101    | 2D          |
| 46      | 0010 1110    | 2E          |
| 47      | 0010 1111    | 2F          |
| 48      | 0011 0000    | 30          |
| 49      | 0011 0001    | 31          |
| 50      | 0011 0010    | 32          |
| 51      | 0011 0011    | 33          |
| 52      | 0011 0100    | 34          |
| 53      | 0011 0101    | 35          |
| 54      | 0011 0110    | 36          |
| 55      | 0011 0111    | 37          |
| 56      | 0011 1000    | 38          |
| 57      | 0011 1001    | 39          |
| 58      | 0011 1010    | 3A          |
| 59      | 0011 1011    | 3B          |
| 60      | 0011 1100    | 3C          |
| 61      | 0011 1101    | 3D          |
| 62      | 0011 1110    | 3E          |
| 63      | 0011 1111    | 3F          |
| 64      | 0100 0000    | 40          |

- https://introcs.cs.princeton.edu/java/61data/

* Note: can delete node_modules from terminal via rm -rf node_modules/
