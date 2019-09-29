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

mainRouter.use('/auth', router);
module.exports = mainRouter;