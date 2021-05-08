var admin = require('firebase-admin');
var configAdmin = require("./fbadmin.json");

module.exports = class FirebaseAdmin {
    constructor() {
        this.admin = admin.initializeApp({
            credential: admin.credential.cert(configAdmin)
        })
        this.auth = this.admin.auth()
        this.db = this.admin.firestore()
    }
}

