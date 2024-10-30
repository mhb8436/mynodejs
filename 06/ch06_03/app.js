const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const express = require('express');

// schema !는 필수란 의미입니다
const schema = buildSchema(`
    type Query {
        hello: String
        welcome(name: String!): String
    }
`);
// resolver
// client library for react : https://www.apollographql.com/docs/react/get-started
const root = {
    hello: () => {
        return "Hello GraphQL";
    },
    welcome: ({name}) => {
        return `Welcome ${name}`;
    }
}
// url : localhost:4000/graphql 
const app = express();
app.use("/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true, // true : Client UI 기본 제공 
    })
);
// "/graphql" localhost:4000/graphql
// "" localhost:4000/

app.listen(4000);
