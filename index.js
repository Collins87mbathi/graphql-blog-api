const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const CONNNECTDB = require('./database/connect');


//connecting to database
CONNNECTDB(process.env.MONGO_DB_URL);

app.use('/graphql',graphqlHTTP({
    schema, 
    graphiql: process.env.NODE_ENV === 'development'
}) )
 

app.listen(PORT, ()=> {  
console.log(`listening to port ${PORT}`);
});