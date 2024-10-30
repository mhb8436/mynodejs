module.exports = (sequelize, DataTypes) => {
    /**
     * create table Comments (
     * id integer primary key autoincrement,
     * content text,
     * postId integer
     * foreign key (postId) references Posts(id)
     * )
     */
    const Comment = sequelize.define("Comment", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: DataTypes.STRING,
    });
    Comment.associate = function(models) {
        models.Comment.belongsTo(models.Post);
    }
    return Comment;
}