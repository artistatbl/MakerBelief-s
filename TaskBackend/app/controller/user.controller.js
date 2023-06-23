const Joi = require("joi");
const db = require("../../database");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const users = require("../model/user.model"),
    emailvalidator = require("email-validator");

/////////////////////////////////////////////////////////////////////////



// Function to handle email verification
async function verifyEmail(req, res) {
    const verificationToken = req.params.verificationToken;

    try {
        // Find the user with the corresponding verification token
        const user = await users.findOne(verificationToken);

        if (!user) {
            return res.status(404).json({ message: 'Invalid verification token' });
        }

        // Update the user's email_verified status to true
        user.email_verified = true;
        user.verification_token = null; // Remove the verification token
        //await users.save();

        // Update the user in the database
        const updateQuery = 'UPDATE users SET email_verified = 1, verification_token = NULL WHERE user_id = ?';
        db.run(updateQuery, [user.user_id], function (error) {
            if (error) {
                console.error('Error updating user:', error);
                return res.status(500).json({ message: 'An error occurred during email verification' });
            }

            return res.status(200).json({ message: 'Email verification successful' });
        });
    } catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).json({ message: 'An error occurred during email verification' });
    }
}


const getUserInfo = (req, res) => {
    let user_id = parseInt(req.params.user_id);

    users.findById(user_id, (err, result) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }

        if (!result) {
            console.log(`User not found with ID: ${user_id}`);
            return res.sendStatus(404);
        }

        const { first_name, last_name, email } = result;
        const welcomeMsg = `Welcome ${first_name} ${last_name}! Your email address is ${email}.`;
        return res.status(200).send(welcomeMsg);
    });
};



const create = (req, res) => {
    const schema = Joi.object({
        "first_name": Joi.string().required(),
        "last_name": Joi.string().required(),
        "email": Joi.string().required(),
        "password": Joi.string().pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])/).required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = Object.assign({}, req.body);
    // validating the users Email and password before the addmin creates a user
    if (!emailvalidator.validate(user['email']) || user['password'].length <= 7) {
        return res.status(400).send('Email or Password greather than 5 characters');
    }
    if (!emailvalidator.validate(user['email']) || user['password'].length > 12) {
        return res.status(400).send('Email or Password no longer than 12 characters');
    }

    users.addNewUser(user, function (err, id) {
        if (err) {
            console.log(err);
            return res.sendStatus(500)
        }
        return res.status(201).send({ user_id: id });

    })

}



const resetPassword = (req, res) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])/).required(),
        newPassword: Joi.string().pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])/).required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, password, newPassword } = req.body;

    users.authenticateUser(email, password, (err, userId) => {
        if (err || !userId) {
            return res.status(404).send("Incorrect email or password");
        }

        users.updatePassword(userId, newPassword, (err) => {
            if (err) {
                return res.sendStatus(500);
            }

            return res.sendStatus(200);
        });
    });
};


const login = (req, res) => {
    // Validating the user logging in progress, email and password are required
    const schema = Joi.object({
        "email": Joi.string().required(),
        "password": Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const email = req.body.email;
    const password = req.body.password;

    users.authenticateUser(email, password, (err, id, firstName) => {
        if (err === 404) {
            console.log(err);
            return res.status(400).send("Invalid email/password supplied");
        }

        if (err) return res.sendStatus(500);

        users.getToken(id, (err, token, firstName, lastName) => {
            if (err) return res.sendStatus(500);

            if (token) {
                return res.status(200).send({
                    user_id: id,
                    session_token: token,
                    first_name: firstName,
                    last_name: lastName
                });
            } else {
                users.setToken(id, (err, token, firstName, lastName) => {
                    if (err) return res.sendStatus(500);
                    return res.status(200).send({
                        user_id: id,
                        session_token: token,
                        first_name: firstName,
                        last_name: lastName
                    });
                });
            }
        });
    });
};

const logout = (req, res) => {
    let token = req.get('X-Authorization');

    users.removeToken(token, (err) => {
        if (err) {
            return res.sendStatus(401);
        }
        return res.sendStatus(200);


    });

}






module.exports = {

    create: create,
    resetPassword: resetPassword,
    getUserInfo: getUserInfo,
    login: login,
    logout: logout,
    verifyEmail: verifyEmail,


}