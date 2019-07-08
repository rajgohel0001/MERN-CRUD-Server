const mongoose = require('mongoose');
const user = require('../model/user.model');
const comment = require('../model/comment.model')
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

/**
 * @params {json} user data
 * add user
 */
module.exports.addUser = (userData) => {
    return new Promise((resolve, reject) => {
        user.create(userData, (userError, userResponse) => {
            if (userError) {
                console.log('userError', userError);
                reject({ status: 500, message: 'Internal Serevr Error' });
            } else {
                resolve({ status: 200, message: 'Successfully created new user', data: userResponse });
            }
        });
    })
}

/**
 * get user
 */
module.exports.getUser = () => {
    return new Promise((resolve, reject) => {
        user.find({ isDelete: false }, (userError, userResponse) => {
            if (userError) {
                console.log('userError', userError);
                reject({ status: 500, message: 'Internal Serevr Error' });
            } else {
                resolve({ status: 200, message: 'Successfully users fatched', data: userResponse });
            }
        })
    });
}

/**
 * @params {json} user data
 * update user
 */
module.exports.updateUser = (userData) => {
    return new Promise((resolve, reject) => {
        user.findOneAndUpdate({ _id: userData.id },
            { $set: { user_name: userData.user_name, user_password: userData.user_password, user_address: userData.user_address } },
            { new: true }, (userError, userResponse) => {
                if (userError) {
                    console.log('userError', userError);
                    reject({ status: 500, message: 'Internal Serevr Error' });
                } else {
                    resolve({ status: 200, message: 'Successfully updated user', data: userResponse });
                }
            })
    })
}

/**
 * @params {json} user id
 * get user by id
 */
module.exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        user.findById(id, (userError, userResponse) => {
            if (userError) {
                console.log('userError', userError);
                reject({ status: 500, message: 'Internal Serevr Error' });
            } else {
                resolve({ status: 200, message: 'user data fetched', data: userResponse });
            }
        })
    })
}

/**
 * @params {json} user id
 * delete user
 */
module.exports.deleteUserById = (id) => {
    return new Promise((resolve, reject) => {
        user.findOneAndUpdate({ _id: id },
            { $set: { isDelete: true } },
            { new: true },
            (userError, userResponse) => {
                if (userError) {
                    console.log('userError', userError);
                    reject({ status: 500, message: 'Internal Serevr Error' });
                } else {
                    resolve({ status: 200, message: 'Successfully updated user', data: userResponse });
                }
            }
        )
    })
}

/**
 * @params {json} user data
 * authenticate user
 */
module.exports.authenticateUser = (userData) => {
    return new Promise((resolve, reject) => {
        user.findOne({ user_name: userData.user_name, user_password: userData.user_password },
            (userError, userResponse) => {
                if (userError) {
                    console.log('userError', userError);
                    reject({ status: 500, message: 'Internal Serevr Error' });
                } else if (!userResponse) {
                    reject({ status: 401, message: 'Incorrect email or password' });
                } else {
                    const user_name = userData.user_name;
                    const payload = { user_name };
                    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
                    resolve({ status: 200, message: 'JWT token', data: token });
                }
            }
        )
    })
}

/**
 * @params {json} userId, comment
 * add comment
 */
module.exports.addComment = (commentData) => {
    return new Promise((resolve, reject) => {
        comment.create(commentData, (commentError, commentResponse) => {
            if (commentError) {
                console.log('userError', userError);
                reject({ status: 500, message: 'Internal Serevr Error' });
            } else {
                resolve({ status: 200, message: 'Successfully added new comment', data: commentResponse });
            }
        })
    })
}

/**
 * get comments
 */
module.exports.getComment = () => {
    return new Promise((resolve, reject) => {
        // comment.find((commentError, commentResponse) => {
        //     if (commentError){
        //         console.log('userError',userError);
        //         reject({status:500, message:'Internal Serevr Error'});
        //     } else {
        //         resolve({ status:200, message:'Successfully get comments',data:commentResponse });
        //     }
        // })
        comment.findOneAndUpdate(
            {_id: '5d2043a920a40721b47720b4'},
            {
                $set: {
                    'userId.0.name': 'NAIMISH',
                    'userId.1.name': 'RAJ'
                }
            },
            {
                upsert:true,
                new: true
            },
        )
        // comment.aggregate([
            // {
            //     $unwind: '$userId'
            // },
            // {
            //     $unwind: '$userId'
            // },
            // {
            //     $lookup: {
            //         from: 'user',
            //         localField: 'userId._id',
            //         foreignField: '_id',
            //         as: 'userDetail'
            //     }
            // },
            // {
            //     $unwind: '$userDetail'
            // },
            // {
            //     $push: {name:'$userId.name'}
            // },
            // {
            //     $group:{
            //         _id: '$userId._id',
            //         merged: {$mergeObjects: '$userDetail'}
            //     }
            // },
            // {
            //     $group:{
            //         _id: '$userId._id',
            //         merged: {$push: '$userId.name'}
            //     }
            // },
            // {
            //     $project: {
            //         userDetail: {
            //             _id: '$userDetail._id',
            //             tempname: '$userId.name'
            //         }
            //     }
            // },
            // {
            //     $lookup: {
            //         from: 'user',
            //         localField: 'userDetail._id',
            //         foreignField: '_id',
            //         as: 'userDetail'
            //     }
            // },
            /**
             * result
             */
            // {
            //     $project: {
            //         userDetail: {
            //             // _id: '$userDetail._id',
            //             tempname: '$userId.name',
            //             user_name: 1,
            //             user_address: 1,
            //             comment: 1
            //         },
            //         // userId: 1
            //     }   
            // },
            // {
            //     $group:{
            //         _id:'$userId._id',
            //         userId:{$push: '$userDetail'},
            //         name:{$push: '$userId.name'},
            //         comment:{$first:'$comment'}
            //     }
            // },
            // {
            //     $project: {items: {
            //         $concatArrays: ['$userId', '$name']
            //     }}
            // },
            // {
            //     $project:{
            //         name: {$arrayToObject: '$name'}
            //     }
            // },
            // {
            //     $concatArrays: ['$userId', '$id']
            // },
            // {
            //     $unwind: '$userId'
            // },
            // {
            //     $unwind:
            //     {
            //         path: '$userId',
            //         preserveNullAndEmptyArrays:true
            //     }
            //   },
            //   {
            //       $group:{
            //         _id:'$_id',
            //         userId:{$push:'$userId'},
            //         comment:{$first:'$comment'}
            //     }
            //   },
            // {
            //     // $project: {'userId.user_password': 0, 'userId.isDelete': 0}
            //     $project: {
            //         userDetail: '$userId',
            //         userId: {
            //             user_name: '$userId.user_name',
            //             user_address: '$userId.user_address',
            //         }
            //     }
            // },
            // {
            //     $group: {_id: '$userId.user_name', address: { $push: '$userId.user_address' }}
            // }
            // {
            //     $project: {items: {$concatArrays: ['$userId','$userDetail']}}
            // }
        // ])
        .exec((commentError, commentResponse) => {
            if (commentError) {
                console.log('commentError', commentError);
                reject({ status: 500, message: 'Internal Serevr Error' });
            } else {
                resolve({ status: 200, message: 'Successfully get comments', data: commentResponse });
            }
        })
    })
}