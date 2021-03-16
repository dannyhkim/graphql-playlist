const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// connect to mongodb database
mongoose.connect("mongodb+srv://daniel:test123@gql-ninja.ilbfx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!

  console.log('connected to db');
});

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
})); // handles graphql request

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
