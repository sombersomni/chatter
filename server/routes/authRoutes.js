const {Router} = require('express');
const Auth = require('../api/Auth');
const router = new Router();
const mainRouter = new Router();
router.route('/signup')
    .post(async (req,res) => {
        console.log('signup route', req.body);
        await Auth.signup(req.body);
        res.send('ok');
    })
router.route('/login')
    .post(async (req,res) => {
        console.log('login route', req.body);
        const {username, password} = req.body;
        const result = await Auth.login(username, password);
        if(typeof result === 'string') {
            res.status(422).send(result);
        } else {
            res.send(result);
        }
    })
router.route('/logout')
    .post(async (req,res) => {
        console.log('logout route', req.body);
        const result = await Auth.logout(req.body.id);
        if(typeof result === 'string') {
            res.status(422).send(result);
        } else {
            res.send(result);
        }
    })
router.route('/unregister')
    .post(async (req,res) => {
        console.log('unregister route', req.body);
        const {id, username, password} = req.body;
        const user = await Auth.deleteUser(id, username, password);
        if (user) {
            res.send(`User ${user.username} was deleted`)
        } else {
            res.status(423).send("Unregister failed. Try again!")
        }
    })
    
mainRouter.use('/auth', router);
module.exports = mainRouter;