/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const usersObject = {
  "UserCollection": "Users",
  "UserTeamsCollection": "Teams",
};

exports.onUserCreate = functions.auth.user().onCreate((user) => {
  admin.firestore().doc(`${usersObject.UserCollection}/${user.uid}`).set({
    "subscribed": false,
  });
  admin.firestore().doc(`${usersObject
      .UserCollection}/${user.uid}/Teams`)
      .set({});
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
