const router = require('express').Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

router.use(authRoutes, userRoutes);

module.exports = router;