const express = require("express");

/*Use Routes */
const router = express.Router();

/*Bring the auth middleware */
const auth = require("../Middlewares/auth");

/*All route functions are in the Controller folder */
const {
  profileCreation,
  getCurrentProfile,
  deleteProfile,
  getAllprofiles,
  followuser,
  UnfollowUser
} = require("../Controllers/profiles");

router.route('/profile/createandmodify').post(auth,profileCreation);

router.route("/profile/followuser/:id").post(auth, followuser);

router.route('/profile/getcurrentprofile').get(auth,getCurrentProfile);

router.route("/profile/allprofiles").get(auth, getAllprofiles);

router.route('/profile/deleteprofile').delete(auth,deleteProfile)

router.route("/profile/unfollowuser/:id").post(auth, UnfollowUser);
module.exports = router