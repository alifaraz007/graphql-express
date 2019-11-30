const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema.js');

const app = express();

mongoose.connect('mongodb://ali:java123@ds035368.mlab.com:35368/graphqldbninja', { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log("db connected"));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log("Now listening to port: 3000");
});