const { ObjectID } = require('mongodb');
let users;
const options = { projection: { username: 1, email: 1 } };
class User {
    static injectDB(db) {
        if (db) {
            users = db.collection('users');
        }
    }
    static async getUser(username) {
        try {
            return await users.findOne({ username }, options);
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }
    static async getUsers(username) {
        try {
            return await users.find({}, options).toArray();
        } catch (err) {
            console.log(err.message);
            return [];
        }
    }
}

module.exports = User;