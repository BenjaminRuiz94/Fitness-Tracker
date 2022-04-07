// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const apiRouter = require("express").Router();
const healthRouter = require("./health");

apiRouter.use("/health", healthRouter);

module.exports = apiRouter;
