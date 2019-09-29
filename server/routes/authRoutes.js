const {Router} = require('express');
const router = new Router();
const mainRouter = new Router();
router.route('/signup')
    .post((req,res) => {
        console.log('signup route', req.body);
        const {email, username, password} = req.body;

        res.send('ok');
    })

mainRouter.use('/auth', router);
module.exports = mainRouter;