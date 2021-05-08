const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const FirebaseAdmin = require('./modules/firebaseAdmin')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

dotenv.config()

let f = new FirebaseAdmin()
var count = 0
var kontractsGlobal = []

app.get('/', (req, res) => {
  res.send('socialkontracts-api')
})

app.get('/getkontracts/:email', async (req, res) => {
    let email = req.params.email;
    let kontracts = []

    
    const ref = f.db.collection('kontracts').where("user", "==", `${email}`)
    const resp = await ref.get()
    resp.forEach((doc) =>{
        kontracts.push(doc.data())
    })
    /*
    kontracts = kontractsGlobal
    */
    
    res.status(200).json({kontracts: kontracts})
})

app.post('/createkontract', async (req, res) => {
    try{
        count += 1
        console.log(count)
    
        const creator = await f.db.collection('kontracts').doc("count").set({
            user: req.body.email,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            mode: req.body.mode,
            state: req.body.state,
            limit: req.body.limit,
            app_name: req.body.app_name,
            stake: req.body.stake
        })
        /*
        kontractsGlobal.push({
            user: req.body.email,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            mode: req.body.mode,
            state: req.body.state,
            limit: req.body.limit,
            app_name: req.body.app_name,
            stake: req.body.stake
        })
        */

        res.status(200).json({success: true, error: null})
    } catch(e) {
        console.log(`GOT ERROR: ` + e.code)
        res.status(500).json({success: false, error: e.code})
    }  
})

app.post('/createstream', async (req, res) => { 
    // create stream with making web3 object with contract 
    // then pass in to superfluid 
    res.status(200).json({success: true, error: null})
})


app.listen(5000, () => {
  console.log(`socialkontracts-api listening at http://localhost:${5000}`)
})