const router = require('express').Router();
const authRoutes = require('./auth.routes');
const eventRoutes = require('./event.routes');
const userRoutes = require('./user.routes');

/* GET home page */
router.get('/', (req, res, next) => {
  res.json('All good in here');
});

router.use('/auth', authRoutes);
router.use('/', eventRoutes);
router.use('/', userRoutes);

module.exports = router;
