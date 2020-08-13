const {check} = require('express-validator');
//VALIDATION OF LOGIN REQUEST
exports.loginRequest = [
    check('username', 'Username is required.').isLength({ min: 1}),
    check('password', 'Password is required.').isLength({ min: 1}),
]

exports.signUpRequest = [
    check('first_name', 'First Name is required.').isLength({ min: 1}),
    check('last_name', 'Last Name is required.').isLength({ min: 1}),
    check('username', 'Username is required.').isLength({ min: 1}),
    check('password', 'Password is required.').isLength({ min: 1}),
    check('email', 'Email is required and must be a valid email.').isEmail().isLength({ min: 1}),
]
  