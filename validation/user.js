const Joi = require('joi');
 
module.exports.register = (req, res, next) => {
    console.log("INside Joi function");

    const schema = Joi.object().keys({
        user_name: Joi.string().trim().required(),
        user_address: Joi.string().trim().required(),
        user_password:Joi.string().trim().required(),
    });
 
    Joi.validate(
        req.body,
        schema,
        { convert: true },
        (err, value) => {
            if (err) {
                console.log("Error inside Joi",err);
                return res.status(400).json({
                    message: err.details[0] && err.details[0].message ? err.details[0].message : 'Bad request',
                    status: 400
                });
            } else {
                next();
            }
        }
    );
 };