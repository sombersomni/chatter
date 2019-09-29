const axios = require('axios');

test('can signup with a new user', function() {
    const newUser = {
        email: "example@gmail.com",
        password: "password",
        username: "testUser"
    }
    return axios.post('http://localhost:3000/auth/signup', newUser)
        .then(res => {
            expect(res.status).toBe(200);
        })
}) 