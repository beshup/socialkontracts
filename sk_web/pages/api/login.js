const {auth} = require('../../modules/firebaseAdmin')

export default (req, res) => {
    res.status(200).json({ success: true, error: null }) 
    /*
    auth()
    .getUserByEmail(req.body.email)
    .then((userRecord) => {
        res.status(200).json({ success: true, error: null }) 
    })
    .catch((error) => {
        res.status(500).json({ success: false, error: "user not found" })
    });
    */
  }
  