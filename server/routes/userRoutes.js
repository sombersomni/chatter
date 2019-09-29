const { Router } = require('express');
const User = require('../api/User');
const router = new Router();
const mainRouter = new Router();

router.route('/')
    .get(async (req, res) => {
        const users = await User.getUsers();
        res.send(users);
    })
router.route('/:username')
    .get(async (req, res) => {
        const users = await User.getUser(req.params.username);
        res.send(users);
    })


mainRouter.use('/user', router);
module.exports = mainRouter;