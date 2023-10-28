// Définition des routes liées aux utilisateurs
// version 1.0.0
// Auteur: LENNE Sebastien

const express = require("express");
const usersctrl = require("../routes/usersctrl");
const userinfosctrl = require("../routes/userinfosctrl");
const homelocationsctrl = require("../routes/homelocationsctrl");
const notelocationsctrl = require("../routes/notelocationsctrl");

exports.router = (function () {
  // Création du routeur
  var apiRouter = express.Router();

  // Définition des routes liées aux utilisateurs
  apiRouter.route("/users/register").post(usersctrl.register);
  apiRouter.route("/users/login").post(usersctrl.login);
  apiRouter.route("/users/delete").delete(usersctrl.userdelete);
  apiRouter.route("/users/reset").put(usersctrl.resetpassword);
  apiRouter.route("/users/logout").post(usersctrl.UserLogout);

  // Définition des routes liées aux infos utilisateurs
  apiRouter.route("/userinfo/newinfo").post(userinfosctrl.createprofile);
  apiRouter.route("/userinfo/getinfo").get(userinfosctrl.getprofile);
  apiRouter.route("/userinfo/updateinfo").put(userinfosctrl.updateprofile);
  apiRouter.route("/userinfo/deleteinfo").delete(userinfosctrl.deleteprofile);

  // Définition des routes liées aux locations
  apiRouter.route("/homelocation/newloc").post(homelocationsctrl.newlocations);
  apiRouter.route("/homelocation/getloc").get(homelocationsctrl.getlocations);
  apiRouter
    .route("/homelocation/updateloc")
    .put(homelocationsctrl.updatelocations);
  apiRouter
    .route("/homelocation/deleteloc")
    .delete(homelocationsctrl.deletelocations);

  // Définition des routes liées aux note de locations
  apiRouter.route("/notelocation/newnote").post(notelocationsctrl.newnotes);
  apiRouter
    .post("/notelocatiom/newnote", upload.single("picture"))
    .post(notelocationsctrl.newnotes);
  apiRouter.route("/notelocation/getnote").get(notelocationsctrl.getnotes);
  apiRouter
    .route("/notelocation/updatenote")
    .put(notelocationsctrl.updatenotes);
  apiRouter
    .route("/notelocation/deletenote")
    .delete(notelocationsctrl.deletenotes);

  return apiRouter;
})();
