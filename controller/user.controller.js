const userModel = require('../model/user.model');
const userService = require('../service/user.service');

/**
 * @params {req: user data} 
 * User Sign Up
 */
module.exports.addUser = (req, res) => {
    const userData = {
        user_name: req.body.user_name,
        user_address: req.body.user_address,
        user_password: req.body.user_password
    }
    userService.addUser(userData).then((response) => {
        return res.status(200).json({ status: 1, message: response.message, data: response.data });
    }).catch((error) => {
        console.log('error:', error);
        return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
    });
}

/**
 * @params {res: user Data}
 * Get all users
 */
module.exports.getUser = function (req, res) {
    userService.getUser().then((response) => {
        return res.status(200).json({ status: 1, message: response.message, data: response.data });
    }).catch((error) => {
        console.log('error:', error);
        return res.status(error.status ? error.status : 500).json({ message: error.message ? error.message : 'internal server error' });
    });
}

/**
 * @params {req: user data, res: updated user data}
 * Update user
 */

module.exports.updateUser = function (req, res) {
    const userData = {
        user_name: req.body.user_name,
        user_address: req.body.user_address,
        user_password: req.body.user_password,
        id: req.params.id
    }
    userService.updateUser(userData).then((response)=>{
        return res.status(200).json({ status: 1, message: response.message, data: response.data });
    }).catch((error)=>{
        console.log('error',error);
        return res.status(error.status ? error.status : 500).json({message: error.message ? error.message : 'internal server error'})
    })
}

/**
 * @params {req: user id, res: user data}
 * Get User By Id
 */
module.exports.getUserById = function (req, res) {
    const id = req.params.id;
    userService.getUserById(id).then((response)=>{
        return res.status(200).json({ status: 1, message: response.message, data: response.data });
    }).catch((error)=>{
        console.log('error',error);
        return res.status(error.status ? error.status : 500).json({message: error.message ? error.message : 'internal server error'})
    })
}

/**
 * @params {req: user id, res: user data}
 * Delete User
 */
module.exports.deleteUserById = function (req,res) {
    const id = req.params.id;
    userService.deleteUserById(id).then((response)=>{
        return res.status(200).json({ status: 1, message: response.message, data: response.data });
    }).catch((error)=>{
        console.log('error',error);
        return res.status(error.status ? error.status : 500).json({message: error.message ? error.message : 'internal server error'})
    })
}

/**
 * @params {req: user name and password}
 * Authenticate User
 */
module.exports.authenticateUser = function(req,res) {
    const userData = {
        user_name: req.body.user_name,
        user_password: req.body.user_password
    }
    userService.authenticateUser(userData).then((response) => {
        return res.status(200).json({ status: 1, message: response.message, data: response.data });
    }).catch((error) => {
        console.log('error',error);
        return res.status(error.status ? error.status : 500).json({message: error.message ? error.message : 'internal server error'})
    })
}