/**
 * * Group exporting
 *
 * Use this file to require in all of your modules and then export each one all at once.
 * This allows you to refactor your require statements across your application. See example:
 *
 * -------- postRoutes.js --------
 * const post = require("express").Router();
 * post.get('/', (req, res) => { res.status(200).send("Success: it works!") });
 *
 * module.exports = post;
 * ------ end postRoutes.js ------
 *
 * -------- index.js --------
 * const postRoutes = require("./postRoutes");
 * const otherRoutes = require("./otherRoutes");
 *
 * module.exports = { postRoutes, otherRoutes };
 * ------ end index.js ------
 *
 * Now, whever you need to require in a specific set of routes, you can import the index file to
 * have access to all route files.
 */

const testRoutes = require("./testRoutes");

module.exports = { testRoutes };
