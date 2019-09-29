const axios = require('axios');

test('can signup with a new user', function() {
    return axios.post('localhost:3000/auth/signup')
        .then(res => {
            expect(res.status).toBe(200);
        })
}) 