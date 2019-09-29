const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');
let users;

class Auth {
    static injectDB(db) {
        if (db) {
            users = db.collection('users');
        }
    }
    static async signup(user) {
        try {
            const { password } = user;
            const options = { w: "majority", wtimeout: 5000 };
            const hash = await bcrypt.hash(password, parseInt(process.env.SALT));
            user.password = hash;
            let result = await users.insertOne(user, options);
            return result.insertedCount === 1;
        } catch (err) {
            console.log(err)
            return false;
        }

    }

    static async authenticate(username, password) {
        const options = { timeout: 5000 };
        const user = await users.findOne({ username }, options);
        if (user) {
            //user exists
            return [ await bcrypt.compare(password, user.password), user._id];
        } else {
            throw new Error("Cant find user " + username);
        }
    }

    static async login(username, password) {
        try {
            const found = await this.authenticate(username, password);
            if (found[0]) {
                let user = await users.findOneAndUpdate(
                    { _id: ObjectID(found[1]) },
                    { $set: { loggedin: true } },
                    { upsert: false, returnOriginal: false }
                )
                delete user.value['password'];
                return user.value;
            } else {
                throw new Error("Password does not match. Try again!");
            }

        } catch (err) {
            console.log(err)
            return err.message;
        }

    }
    static async logout(id) {
        const options = { maxTimeMS: 10000, returnOriginal: false };
        try {
            const user = await users.findOneAndUpdate(
                { _id: ObjectID(id) },
                { $set: { loggedin: false } },
                options
            );
            delete user.value['password'];
            return user.value;
        } catch (err) {
            console.log(err.message);
            return null;
        }

    }
    static async deleteUser(username, password) {
        try {
            const found = await this.authenticate(username, password);
            if (found[0]) {
                const user = await users.deleteOne({ _id: ObjectID(found[1]) });
                return user;
            } else {
                throw new Error("Password is incorrect. Can't unregister. Try again!");
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}

module.exports = Auth;