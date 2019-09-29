const axios = require('axios');

describe('User', function() {
    it('can get all users in db', function() {
        return axios.get('http://localhost:3000/user')
            .then(res => {
                expect(res.status).toBe(200);
                expect()
            })
    })
})