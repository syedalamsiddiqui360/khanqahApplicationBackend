const {check} = require('express-validator');
//VALIDATION OF LOGIN REQUEST
exports.loginRequest = [
    check('username', 'Username is required.').isLength({ min: 1}),
    check('password', 'Password is required.').isLength({ min: 1}),
]
  