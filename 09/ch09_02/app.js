const mongoose = require('mongoose');

(async()=> {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log(`connected to mongodb`);

    const { Schema } = mongoose;
    // create table 
    const userSchema = new Schema({
        name: {type: String, required: true},
        age: {type: Number, min: 0, max: 120},
        city: {type : String, required: false}
    });

    const User = mongoose.model('User', userSchema); // create collection(table)
    // const user1 = new User({name: 'Alice', age: 50, city: 'Seoul'});
    // insert into 
    // const result1 = await user1.save();
    // console.log(`user1 : ${JSON.stringify(result1)}`);
    // select * from User

    // const updatedUser1 = await User.updateMany({name: 'Alice'}, {$set: {age: 5}});
    // console.log(`Alice age is ${JSON.stringify(updatedUser1)}`);

    const deletedUser1 = await User.deleteOne({name: 'Alice'});
    console.log(`Alice is deleted : ${JSON.stringify(deletedUser1)}`);

    const users = await User.find({});
    console.log(`users list : ${JSON.stringify(users)}`);

})();