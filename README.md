# MVC Starter

## Getting set up

1.  Change into a directory of your choosing
2.  Run `git clone` or download the ZIP from GitHub repo
3.  Run `npm install`

_Example_

```bash
$ cd projects
$ git clone https://github.com/weschang15/mvc-starter.git someProject
```

## Where to start

Once all dependencies are installed you will have to do some minor configuration.

1.  Create a .env file
2.  Add the following environment variables

```
# Environment variables are case sensitive. If the are all caps here, they need to be all caps everywhere else

# express-session package requires these. They can be any random string of characters
SESSION_SECRET=
SESSION_KEY=

# Database configuration used inside of app.js to bootstrap session store
# These can be used within sequelize config file
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
```

After that is complete, you can run the following NPM script to kickstart a local server running on http://localhost:4000/ with **nodemon** configured to watch for changes.

```bash
$ npm run server
```

#### App.js

The app.js file is where Express is configured. This file sets up Express with a body-parser, cookie-parser, and a MYSQL session store as well as beginner set of API routes and a simple custom error handler middleware.

#### Start.js

The start.js file is what executes the application, loads in dotenv and runs the server. This file will be untouched for the most part.

## Best Practices

**Routing**

All throughout this starter kit, you'll find `index.js` files. These files are meant for **Group Exporting**.
This means that instead of requiring individual files, you can imply require a single index file and destructure what you need from there. See below for an example of how routing is done...

```js
// testRoutes.js
const test = require("express").Router();
const testController = require("../../controllers");
test.get("/", testController.get);

module.exports = test;
// end testRoutes.js

// index.js
const testRoutes = require("./testRoutes");
const otherRoutes = require("./otherRoutes");

module.exports = { testRoutes, otherRoutes };
// end index.js

// app.js
const { testRoutes } = require("./routes/api");

app.use("/api/v1/test", testRoutes);
```

This process should also be done for your controllers. If you are using Sequelize, this is essentially what the `models/index.js` file does behind the scenes.
