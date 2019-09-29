const { ObjectID } = require('mongodb');
let users;

class User {
    static injectDB(db) {
        if (db) {
            users = db.collection('users');
        }
    }
    static async getUser(username) {
        try {
            return await users.findOne({ username }, { username: 1, email: 1 });
        } catch(err) {
            console.log(err.message);
            return null;
        }
    }
    static async getUsers(username) {
        try {
            return await users.findOne({}, { username: 1, email: 1 }).toArray();
        } catch(err) {
            console.log(err.message);
            return [];
        }
    }
}