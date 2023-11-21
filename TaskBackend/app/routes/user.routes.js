const users = require("../controller/user.controller");
const auth = require('../lib/authentication');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = function(app) {
  app.route("/users")
    .post(users.create);

  app.route("/login")
    .post(users.login);

  app.route("/users/resetPassword")
    .post(auth.isAuthenticated, users.resetPassword);

  app.route("/logout")
    .post(auth.isAuthenticated, users.logout);

  app.route("/users/:user_id")
    .get(users.getUserInfo);

  app.route("/verify-email/:verificationToken")
    .get(users.verifyEmail);
  app.route('/users/upload-profile-picture/:user_id')
    .post(auth.isAuthenticated, upload.single('profilePicture'), users.uploadProfilePicture);
};
