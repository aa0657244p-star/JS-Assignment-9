var router = require('express').Router();
var controller = require('./auth.controller');
const authMiddleware = require('../../common/auth.middleware');

router.post('/signup', controller.signup);
router.post('/login', controller.login);

router.patch('/', authMiddleware, controller.updateUser);
router.delete('/', authMiddleware, controller.deleteUser);
router.get('/', authMiddleware, controller.getUser);

module.exports = router;