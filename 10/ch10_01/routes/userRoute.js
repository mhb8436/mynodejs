const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.findAll); // app.get("/users", (req, res)=>{})
router.post('/', userController.createUser); // app.post("/users, (req, res) =>{}")
module.exports = router;
