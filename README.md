# Book Store Application using MEAN Stack
This Application is developed using MongoDB, Express, Angular and Node.js with authentication using JSON Web Tokens (JWT).

Inside the `package.json` file we have the following two dependencies for processing json web tokens:

``` javascript
  "express": "^4.18.2",
  "jsonwebtoken": "^9.0.2"
```

For creating and storing users, following packages are used:

``` javascript
  "bcryptjs": "^2.4.3",
  "mongoose": "^8.0.3"
```

For sending mail to users regarding account creation, password reset, we're using the following:

``` javascript
  "nodemailer": "^6.9.8"
```

The tokens will be stored in cookies, for that we're using the following:

``` javascript
  "cookie-parser": "^1.4.6"
```

CORS Policy issue can be fixed using the following:

``` javascript
  "cors": "^2.8.5"
```