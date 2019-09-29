let users;

class Auth {
    static injectDB(db) {
        if(db) {
            users = db.collection('users');
        }
    }
    static async signup(user) {
        try {
            const options = { w: "majority", wtimeout: 5000 };
            let result = await users.insertOne(user, options);
            console.log(result);
        } catch(err) {
            console.log(err)
        }

    }
}

module.exports = Auth;