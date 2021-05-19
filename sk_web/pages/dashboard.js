import {Card, ListGroup, Container, Row, Col, Form, Button} from 'react-bootstrap'
import React, { useState } from 'react';
import Web3 from 'web3'
import ERC20_ABI from './web3_config/ERC20_ABI.js'

async function loadWeb3() {
  if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
  }
}

async function load() {
  await loadWeb3();

  let r = new window.web3.eth.Contract(ERC20_ABI, "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa", {});
  return r
}

function Dashboard({ k }) {
    return (
        <Container className="ml-6 mr-6">
          <Row>
            <h1 className="center">New Kontract</h1>
          </Row>
          <hr/>
          {NewKontractForm()}
          <Row>
            <h1 className="mt-3">Kontracts</h1>
          </Row>
          <hr/>
          <Row>
            <ul>
                {k.map((kontract) => (
                   KontractView(kontract)
                ))}
            </ul>
          </Row>
        </Container>
    )
}

function NewKontractForm() {
  const [amount, setAmount] = useState(0)
  const [mode, setMode] = useState("Invest")
  const [appName, setAppName] = useState("chrome")
  const [limit, setLimit] = useState(0)
  const [endDate, setEndDate] = useState(0)

  const handleSubmit = async (evt) => {
      evt.preventDefault()
      // then save the kontract to the db
      let end_date = Math.floor(new Date(endDate).getTime() / 1000)
      let start_date = Math.floor(Date.now() / 1000)
      let data = {
        stake: amount,
        mode: mode,
        app_name: appName,
        limit: limit,
        end_date: end_date,
        start_date: start_date,
        state: "in_progress",
        user: localStorage.getItem("email")
      }

      // if streak, call the superfluid fxns to send stream from contract to them
      // if invest, call the fxn on the contract to invest in aave 

      if (mode == "Streak") {
        await createStreak(data)
      } else{
        await createInvest(data)
      }

      let z = await fetch('http://localhost:5000/createkontract', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        //fhbf
      try {
        let data = await z.json()
        console.log(data)
        location.reload()
      } catch(e) {
        console.log(e)
      }  
  }

  return (
          <div className="login-box">
              <Form className="login-form" onSubmit={handleSubmit}>
                  <Form.Group controlId="formGroupEmail">
                      <div className="login-text">
                      <Form.Label><b>App</b></Form.Label>
                      </div>
                      <Form.Control as="select" custom onChange={e => setAppName(e.target.value)}>
                        <option>sdksetup</option>
                        <option>setupwizard</option>
                        <option>chrome</option>
                        <option>sk_app</option>
                        <option>nexuslauncher</option>
                        <option>settings</option>
                      </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                      <div className="login-text">
                      <Form.Label><b>Amount (DAI)</b></Form.Label>
                      </div>
                      <Form.Control type="float" onChange={e => setAmount(e.target.value)}/>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.SelectCustom">
                  <div className="login-text">
                    <Form.Label>Mode</Form.Label>
                    </div>
                    <Form.Control as="select" custom onChange={e => setMode(e.target.value)}>
                      <option>Invest</option>
                      <option>Streak</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                      <div className="login-text">
                      <Form.Label><b>Limit (hours) (/day if streak mode)</b></Form.Label>
                      </div>
                      <Form.Control type="number" onChange={e => setLimit(e.target.value)}/>
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                      <div className="login-text">
                      <Form.Label><b>End Date</b></Form.Label>
                      </div>
                      <Form.Control type="date" name='date_of_birth' onChange={e => setEndDate(e.target.value)} />
                  </Form.Group>
                  <Row className="justify-content-center mt-4">
                      <Button variant="primary" type="submit">
                          Stake
                      </Button>
                  </Row>
              </Form>
          </div>
  )
}

function KontractView(kontract) {
  let limit = kontract.limit + " hours"
  let message = "You're investing in your well-being! Hold strong till the end and you'll be rewarded with a compound gain on your investment, courtesy of AAVE."
  let earnedBack = "6.27% compounded every 30 days"
  let collectStake = <ListGroup.Item><Button disabled size="sm" variant="primary">Collect Investment</Button></ListGroup.Item>
  if (kontract.mode == "Streak") {
    limit = kontract.limit + " hours per day"
    message = "Don't miss a day! Your stake is being streamed back to you, courtesy of Superfluid, lest you breach your daily limit."
    earnedBack = Math.floor(((Math.floor(Date.now() / 1000) - kontract.start_date) / (kontract.end_date - kontract.start_date)) * 100)
    earnedBack = earnedBack + "% earned back"
    collectStake = ""
  }

  return (
    <Card className ="mb-3" style={{ width: '50rem' }}>
      <Card.Body>
        <Card.Title>{kontract.app_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{limit}</Card.Subtitle>
        <Card.Text>
          {message}
        </Card.Text>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item><b>Stake: </b>{kontract.stake}</ListGroup.Item>
        <ListGroup.Item><b>Days Left: </b>{(kontract.end_date - Math.floor(Date.now() / 1000)) / 86400}</ListGroup.Item>
        <ListGroup.Item><b>State: </b>{kontract.state}</ListGroup.Item>
        <ListGroup.Item><i>{earnedBack}</i></ListGroup.Item>
        {collectStake}
      </ListGroup>
    </Card>
  )
}

async function createStreak(data) {
  let r = await load()


  const userAddress = window.ethereum.selectedAddress
  const accounts = await window.web3.eth.getAccounts()

  let stake = data.stake
  r.methods.transfer("0x8dc0ef8e272c3758bffb59888594a7a02674d7b3", window.web3.utils.toWei(stake,'ether')).send({from:userAddress})
  
  data['userAddress'] = window.ethereum.selectedAddress

  return fetch('http://localhost:5000/createstream', {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(data => {
    return data
  }).catch(e => {
    console.log(e)
    return e
  })
}

async function createInvest(data) {
  let r = await load()

  const userAddress = window.ethereum.selectedAddress
  const accounts = await window.web3.eth.getAccounts()

  let stake = data.stake
  r.methods.transfer("0x8dc0ef8e272c3758bffb59888594a7a02674d7b3", window.web3.utils.toWei(stake,'ether')).send({from:userAddress})

  // call stake fxn
}

export async function getServerSideProps() {
    let email = "test@scalingeth.com"
    const res = await fetch(`http://localhost:5000/getkontracts/${email}`)
    const data = await res.json()
    let k = data["kontracts"]

    return {
      props: {
        k,
      },
    }
  }

export default Dashboard