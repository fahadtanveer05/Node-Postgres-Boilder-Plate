const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth.validation');
const {
	signupValidation,
	loginValidation,
	updateValidation,
} = require('../middleware/user.validation');

const {
	searchAllUsers,
	userSignup,
	userLogin,
	userUpdate,
	userDelete,
} = require('../controller/user.controller');

router.get('/search', auth, searchAllUsers);

router.post('/signup', signupValidation, userSignup);

router.post('/login', loginValidation, userLogin);

router.patch('/update', auth, updateValidation, userUpdate);

router.delete('/delete', auth, userDelete);

module.exports = router;
