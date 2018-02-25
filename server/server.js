const express = require("express");
const models = require("./models");
const expressGraphQL = require("express-graphql");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");

const { MONGO_URI } = require("../secret");

const app = express();

// Replace with your mongoLab URI

if (!MONGO_URI) {
  throw new Error("You must provide a MongoLab URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to MongoLab instance."))
  .on("error", error => console.log("Error connecting to MongoLab:", error));

app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlExpress({
    schema,
    graphiql: true
  })
);
app.get("/docs", graphiqlExpress({ endpointURL: "/graphql" }));

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;