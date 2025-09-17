const express = require('express');
const userController = require('../controllers/user');
const auth = require('../middlewares/auth');
const router = express.Router();


router.post('/register', userController.register);

router.post('/login', userController.login);
router.get('/list', userController.listUsers);

router.get('/:id', userController.getUser);

// Proteger update y delete con JWT
router.put('/:id', auth, userController.updateUser);

router.delete('/:id', auth, userController.deleteUser);
module.exports = router;