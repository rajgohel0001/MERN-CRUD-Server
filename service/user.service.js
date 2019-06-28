const mongoose = require('mongoose');
const user = require('../model/user.model');
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

module.exports.addUser = (userData) => {
    return new Promise((resolve,reject)=>{
        user.create(userData,(userError,userResponse)=>{
            if(userError){
                console.log('userError',userError);
                reject({status:500, message:'Internal Serevr Error'});
            } else {
                resolve({ status:200, message:'Successfully created new user',data:userResponse });
            }
        });
    })
}

module.exports.getUser = () =>{
    return new Promise((resolve,reject)=>{
        user.find({isDelete:false},(userError,userResponse)=>{
            if(userError){
                console.log('userError',userError);
                reject({status:500, message:'Internal Serevr Error'});
            } else {
                resolve({ status:200, message:'Successfully users fatched',data:userResponse });
            }
        })
    });
}

module.exports.updateUser = (userData) =>{
    return new Promise((resolve,reject)=>{
        user.findOneAndUpdate({_id:userData.id}, 
            {$set:{user_name : userData.user_name,user_password : userData.user_password,user_address : userData.user_address}},
            {new: true},(userError,userResponse)=>{
                if(userError){
                    console.log('userError',userError);
                    reject({status:500, message:'Internal Serevr Error'});
                } else {
                    resolve({ status:200, message:'Successfully updated user',data:userResponse });
                }
            })
    })
}

module.exports.getUserById = (id) => {
    return new Promise((resolve,reject)=>{
        user.findById(id,(userError,userResponse)=>{
            if(userError){
                console.log('userError',userError);
                reject({status:500, message:'Internal Serevr Error'});
            } else {
                resolve({ status:200, message:'user data fetched',data:userResponse });
            }
        })
    })
}

module.exports.deleteUserById = (id) => {
    return new Promise((resolve,reject)=>{
        user.findOneAndUpdate({_id:id},
            {$set:{isDelete : true}},
            {new: true},
            (userError,userResponse)=>{
                if(userError){
                    console.log('userError',userError);
                    reject({status:500, message:'Internal Serevr Error'});
                } else {
                    resolve({ status:200, message:'Successfully updated user',data:userResponse });
                }
            }
        )
    })
}

module.exports.authenticateUser = (userData) => {
    return new Promise((resolve,reject) => {
        user.findOne({user_name: userData.user_name},
            (userError,userResponse) => {
                if(userError){
                    console.log('userError',userError);
                    reject({status:500, message:'Internal Serevr Error'});
                } else if (!userResponse) { 
                    reject({status:401, message:'Incorrect email or password'});
                } else {
                    const user_name = userData.user_name;
                    const payload = { user_name };
                    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
                    resolve({ status:200, message:'JWT token', data:token });
                }
            }    
        )
    })
}