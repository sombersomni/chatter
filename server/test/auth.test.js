const axios = require('axios');

let newUser = {
    email: "example@gmail.com",
    password: "password",
    username: "testUser"
}

describe('Auth', function () {
    afterAll(function () {
        return axios.get(`http://localhost:3000/user/${newUser.username}`)
            .then(res => {
                newUser.id = res.data._id;
                if(res.status === 200) { 
                    return axios.post('http://localhost:3000/auth/unregister', newUser);
                }
            })
            .then(res => {
                expect(res.status).toBe(200);
            })
            .catch(err => {
                console.log(err);
            })
    })
    it('can signup with a new user', function () {
        return axios.post('http://localhost:3000/auth/signup', newUser)
            .then(res => {
                expect(res.status).toBe(200);
            })
            .catch(err => {
                console.log(err);
            })
    })

    it('can login with a new user', function () {
        return axios.post('http://localhost:3000/auth/login', newUser)
            .then(res => {
                newUser.id = res.data._id;
                expect(res.status).toBe(200);
                expect(res.data.username).toEqual(newUser.username);
            })
            .catch(err => {
                console.log(err);
            })
    })
    it('can logout user', function () {
        return axios.post('http://localhost:3000/auth/logout', newUser)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.data.username).toEqual(newUser.username);
            })
            .catch(err => {
                console.log(err);
            })
    })
})