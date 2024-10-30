const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
// Graphql module
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');

// setting db
const db_name = path.join(__dirname, "post.db");
const db = new Database(db_name);
// setting express app
const app = express();
const PORT = 4000;

const create_sql = `
    create table if not exists posts(
        id integer primary key autoincrement,
        title varchar(200),
        content text,
        author varchar(100),
        createdAt datetime default current_timestamp,
        count integer default 0
    );
`;
db.exec(create_sql); // execute create_sql 

const schema = buildSchema(`
    type Post {
        id: ID!
        title: String
        content: String
        author: String
        createdAt: String
    }
    type Query {
        getPosts: [Post]
        getPost(id: ID!): Post
    }
    input PostInput{
        title: String
        content: String
        author: String
    }

    type Mutation {
        createPost(input: PostInput): Post
        updatePost(id: ID!, input: PostInput): Post
        deletePost(id: ID!): String
    }
`);

// resolver 스키마에 있는 쿼리나, 뮤테이션을 실행 하는 함수모음
const root = {
    getPosts: () => {
        return db.prepare(`select * from posts`).all();
    },
    getPost: ({id}) => {
        return db.prepare(`select * from posts where id =? `).get(id);
    },
    createPost: ({input}) => { 
        console.log(input.title, input.content, input.author);
        const info = db.prepare(`insert into posts(title,content,author)
            values(?,?,?)`).run(input.title, input.content, input.author);
        return {id: info.lastInsertRowid, ...input} 
    },
    updatePost: ({id, input}) => {
        const info = db.prepare(`update posts set title=?, 
            content=? where id=?`).run(input.title, input.content, id);
        return {id, ...input}
    },
    deletePost: ({id}) => {
        const info = db.prepare(`delete from posts 
            where id = ?`).run(id);
        return `Post[${id}] is deleted`
    }
}

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))

app.listen(PORT); // listening port 4000