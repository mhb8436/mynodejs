// require no 
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: DataTypes.STRING,
        author: DataTypes.STRING,
        filename: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    Post.associate = function(models) {
        Post.hasMany(models.Comment);
    }
    return Post;
};