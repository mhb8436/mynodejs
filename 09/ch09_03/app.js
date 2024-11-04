const express = require('express');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/post"); // connect mongodb 
const db = mongoose.connection; // get connection object 

db.on("error", (err)=>{ // error 발생했을 때 
    console.error(`db connect fail : ${JSON.stringify(err)}`);
});

db.once("open", ()=> { // 연결이 성공했을 때 
    console.log(`db connect success`);
});

// define Schema 
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    createdAt: {type :Date, default: Date.now },
});

const Post = mongoose.model('Post', PostSchema); // create collection, create table 

const app = express();
app.use(express.json());
// npx nodemon app.js
app.post("/posts", async (req, res) => {
    const { title, content, author } = req.body; // get content title from body 
    try{
        const post = new Post({ // create post object 
            title: title,
            content: content,
            author: author,
        });
        await post.save(); // save mongodb 
        res.status(200).json({data: post, message:'ok'}); // return result to user
    }catch(e) {
        res.status(500).json({message: e});
    }
});

app.listen(3000, ()=>{
    console.log(`server is running`);
});