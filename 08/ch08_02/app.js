const express = require('express');
const path = require('path');
const models = require('./models'); 
const multer = require('multer'); // added  2024.11.04
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/downloads", express.static(path.join(__dirname, "public/uploads"))); // added 2024.11.04
// req : http://localhost:3000/downloads/test.png 
// res : public/uploads/test.png 

const upload_dir = "public/uploads"; // added 2024.11.04
const storage = multer.diskStorage({ // added 2024.11.04
    destination: `./${upload_dir}`,
    filename: function(req, file, cb){ // originalname : test.png 
        cb(null, 
            path.parse(file.originalname).name  + // test
            "-" + 
            Date.now() +
            path.extname(file.originalname) //.png
        )
    } // test.png => test-2024110410101.png
});
const upload = multer({ storage: storage}); // added 2024.11.04

app.post("/posts", upload.single("file"),  async (req, res)=> { // adedd 2024.11.04
    const {title, content, author} = req.body;
    let filename = req.file ? req.file.filename : null; //added 2024.11.04 test-2024110410101.png
    filename = `/downloads/${filename}`; // /downloads/test-2024110410101.png
    const post = await models.Post.create({
        title: title,
        content: content,
        author: author,
        filename: filename, // added 2024.11.04
    });
    res.status(201).json({post:post});
});

app.get("/posts", async (req, res)=> {
    const posts = await models.Post.findAll({
        include: [
            {model: models.Comment}
        ]
    });
    res.json({data: posts});
});

app.get("/posts/:id", async (req, res) => {
    const id = req.params.id;

    const post = await models.Post.findOne({
        where : {id:id}
    });
    if(post) {
        res.status(200).json({data:post});
    }else{
        res.status(404).json({data:'post not found'});
    }
});

app.put("/posts/:id", async (req, res) => {
    const id = req.params.id;
    const {title, content} = req.body;
    const post = await models.Post.findByPk(id);
    if(post){
        post.title = title;
        post.content = content;        
        await post.save();
        res.status(200).json({data: post});
    }else{
        res.status(404).json({result:"post not found"});
    }
});

app.delete("/posts/:id", async (req, res)=> {
    const result = await models.Post.destroy({
        where : {
            id: req.params.id
        }
    });
    console.log(result);
    if(result) {
        res.status(204).send();
    }else{
        res.status(404).json({result: 'post not found'});
    }
});

app.post("/posts/:id/comments", async (req, res) => {
    const postId = req.params.id;
    const {content} = req.body;
    // insert into comments(postId, content) values(?,?)
    const comment = await models.Comment.create({ 
        PostId: postId,
        content: content,
    });
    res.status(201).json({data: comment});
});

app.put("/posts/:postId/comments/:commentId", async (req, res)=>{
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const {content} = req.body;
    const comment = await models.Comment.findByPk(commentId); //1. comment get 
    if(comment) {
        comment.content = content;
        await comment.save(); // 2. comment update
        res.status(200).json({data: comment});
    }else {
        res.status(404).json({result: "comment not found"});
    }
});
// comment delete
app.delete("/posts/:postId/comments/:commentId", async (req, res) => {
    const commentId = req.params.commentId;
    // delete from comments where id = commentId
    const result = await models.Comment.destroy({
        where : {id: commentId}
    });
    console.log(`result is ${JSON.stringify(result)}`); // deleted count => result
    if (result) {
        res.status(204).json();
    }else {
        res.status(404).json({result: "comment not found"});
    }
});

// npx nodemon app.js 
app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`);
    models.sequelize
        .sync({force : false})
        .then(()=>{
            console.log(`DB Connected`)
        })
        .catch((err)=>{
            console.error(`DB error : ${err}`);
            process.exit();
        });
    
});