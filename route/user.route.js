const express = require('express');
const userRoutes = express.Router();
const userController = require('../controller/user.controller');
const userValidation = require('../validation/user');
const withAuth = require('../middleware/auth');

userRoutes.route('/add')
    .post([userValidation.register], userController.addUser);
userRoutes.get('/', userController.getUser);
userRoutes.route('/edit/:id')
    .post([userValidation.checkId], userController.getUserById)
userRoutes.route('/update/:id')
    .post([userValidation.checkId], userController.updateUser);
userRoutes.route('/authenticate')
    .post([userValidation.authUser], userController.authenticateUser)
userRoutes.get('/checkToken', withAuth, function (req, res) {
    res.sendStatus(200);
});
userRoutes.get('/secret', withAuth, function (req, res) {
    res.send('The password is potato');
});

module.exports = userRoutes;
