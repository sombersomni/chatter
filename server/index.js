require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');
const Auth = require('./api/Auth');
const User = require('./api/User');
const MongoClient = require('mongodb').MongoClient;
const PORT = 3000;
const uri = process.env.MONGO_URI;

if(process.env.NODE_ENV === "development") {
    const cors = require('cors');
    app.use(cors());
    console.log('cors enabled');
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
    console.log(`🌎 Server is running on port ${PORT}`);
    const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
    client.connect(err => {
        console.log(`🗄️ Database is connected`)
        const db = client.db("auth");
        Auth.injectDB(db);
        User.injectDB(db);
        // perform actions on the collection object
    });
})