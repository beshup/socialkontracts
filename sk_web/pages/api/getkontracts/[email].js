const {db} = require('../../../modules/firebaseAdmin')

export default (req, res) => {
    const { email } = req.query 
    let kontracts = []

    console.log(`users/${email}`)
    db.collection("kontracts").where("user", "==", `/users/${email}`).get().then((query) => {
        query.forEach((doc) => {
            kontracts.push(doc.data())
        })
    })
    res.status(200).json({kontracts: kontracts})
}
  