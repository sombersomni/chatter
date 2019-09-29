const express = require('express');
const app = express();
const router = require('./routes');
const PORT = 3000;

app.use(express.json());
app.use(router);
app.listen(PORT, () => { 
    console.log(`🌎 Server is running on port ${PORT}`)
})