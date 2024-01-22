const { initializeApp } = require("firebase-admin/app");
const admin = require("firebase-admin")

const serviceAccount = require("../firebase.json")


initializeApp({
    credential : admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


module.exports = {db}