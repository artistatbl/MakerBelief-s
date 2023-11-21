const db = require("../../database");
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const emailService = require('../service/email.server');






/**
 * 
 *  get all getHash from the database
 */


const getHash = function (password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 256, 'sha256').toString('hex');
};

/**
 *  
 * insert a new user
 */


const findById = (id, done) => {
  const sql = 'SELECT * FROM users WHERE user_id=?';

  db.get(sql, [id], (err, row) => {
    if (err) return done(err);

    if (!row) {
      console.log(`User not found with ID: ${id}`);
      return done(null);
    }

    console.log(`User found with ID: ${id}`);

    return done(null, {
      user_id: row.user_id,
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
    });
  });
};

const findOne = (verificationToken) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE verification_token = ?';
    db.get(sql, [verificationToken], (err, row) => {
      if (err) return reject(err);

      if (!row) {
        console.log(`Verification token not found: ${verificationToken}`);
        return resolve(null);
      }

      console.log(`Verification token found: ${verificationToken}`);
      resolve({
        user_id: row.user_id
      });
    });
  });
};



const addNewUser = (user, done) => {
  const verificationToken = crypto.randomBytes(32).toString('hex'); // Generate a verification token

  const salt = crypto.randomBytes(64);
  const hash = getHash(user.password, salt);

  const sql =
    'INSERT INTO users (first_name, last_name, email, password, salt, verification_token, email_verified) VALUES (?,?,?,?,?,?,?)';
  let values = [
    user.first_name,
    user.last_name,
    user.email,
    hash,
    salt.toString('hex'),
    verificationToken,
    false, // Set email_verified to false
  ];

  db.run(sql, values, function (err) {
    if (err) {
      console.log(err);
      return done(err);
    }

    // Send verification email
    emailService.sendVerificationEmail(user.email, verificationToken); // Call the function to send the verification email

    return done(null, this.lastID);
  });
};






const updatePassword = (userId, newPassword, done) => {
  const salt = crypto.randomBytes(64);
  const hash = getHash(newPassword, salt);

  const sql = "UPDATE users SET password = ?, salt = ? WHERE user_id = ?";
  const values = [hash, salt.toString("hex"), userId];

  db.run(sql, values, (err) => {
    if (err) {
      return done(err);
    }

    return done(null);
  });
};




const getUserByEmail = (email, done) => {
  db.get("SELECT * FROM users WHERE email=?", email, (err, row) => {
    if (err) {
      console.log("Something went wrong: " + err);
      return done(err);
    }

    return done(null, row);
  });
};

const updateResetToken = (userId, resetToken, callback) => {
  db.run('UPDATE users SET reset_token = ? WHERE user_id = ?', [resetToken, userId], (err) => {
    if (err) {
      return callback(err);
    }
    return callback(null);
  });
};









/*
 *   authenticate user
 */
const authenticateUser = (email, password, done) => {
  db.get(
    'SELECT user_id, password, salt FROM users WHERE email=?',
    [email],
    (err, row) => {

      if (!row) return done(404)
      if (err) return done(err)



      if (row.salt == null) {
        row.salt = '';
      }

      let salt = Buffer.from(row.salt, 'hex');

      if (row.password === getHash(password, salt)) {
        return done(false, row.user_id);
      } else {
        console.log("failed password check");
        return done(404); // failed password check
      }


    }
  );
};
/**
 * 
 *  get the user id associated whith a given take, return 401 unauthorised
 *  
 */

const getIdFromToken = function (token, done) {
  if (token === undefined || token === "")
    return done(true, 401);
  else {
    db.get(
      'SELECT user_id FROM users WHERE session_token=?',
      [token],
      function (err, row) {
        if (row) return done(null, row.user_id);
        console.log(err)

        return done(null);
      }
    )
  }
};


const getToken = function (id, done) {
  db.get(
    'SELECT first_name, last_name, session_token FROM users WHERE user_id=?',
    [id],
    function (err, row) {
      if (err) return done(err)
      if (row && row.session_token) {
        return done(null, row.session_token, row.first_name, row.last_name);
      } else {
        return done(null, null, null, null)
      }
    }
  )
}





const setToken = (id, done) => {
  let token = crypto.randomBytes(16).toString('hex');

  const sql = 'UPDATE users SET session_token=? WHERE user_id=?'

  db.run(sql, [token, id], (err) => {
    if (err) return done(err)
    db.get(
      'SELECT first_name, last_name FROM users WHERE user_id=?',
      [id],
      function (err, row) {
        if (err) return done(err)
        return done(null, token, row.first_name, row.last_name)
      }
    )
  })
}



const removeToken = (token, done) => {
  const sql = 'UPDATE users SET session_token=null WHERE session_token=?'

  db.run(sql, [token], (err) => {
    return done(err)
  })
}

//Add a new function to update the user with profile picture in the database

const updateProfilePicture = (userId, profilePicture, done) => {
  const updateQuery = 'UPDATE users SET profile_picture = ? WHERE user_id ? WHERE user_id = ?';
  db.run(updateQuery, [userId, profilePicture], (err) => {
    if (err) {

      return done (err);

    }

    return done(null)

     
  });
};




module.exports = {
  addNewUser: addNewUser,
  findOne: findOne,
  updatePassword: updatePassword,
  authenticateUser: authenticateUser,
  findById: findById,
  getUserByEmail: getUserByEmail,
  updateResetToken: updateResetToken,
  getToken: getToken,
  setToken: setToken,
  getIdFromToken: getIdFromToken,
  removeToken: removeToken,
  updateProfilePicture: updateProfilePicture,
 
}