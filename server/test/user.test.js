const axios = require('axios');
const user = {
    email: 'test@test.com',
    id: "5d904d9c69674322f05c52ba",
    username: 'test',
}

describe('User', function() {
    it('can get all users in db', function() {
        return axios.get('http://localhost:3000/user')
            .then(res => {
                expect(res.status).toBe(200);
                //expect(res.data).toContainEqual(user);
            })
    })
    it('can get a single user', function() {
        return axios.get(`http://localhost:3000/user/${user.username}`)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.data.username).toEqual(user.username);
            })
    })
})