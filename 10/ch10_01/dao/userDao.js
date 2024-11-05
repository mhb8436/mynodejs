const models = require('../models'); // ../models/index.js db => models 
// Data Access Object for User 
const findAll = async () => {
    return await models.User.findAll();
    // select * from users 
}

const createUser = async (userData) => {
    return await models.User.create(userData);
}

module.exports = {
    findAll,
    createUser,
}