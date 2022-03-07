const express = require('express')
const router = express.Router()
const db = require('../db')


router.post('/emails', async (req, res) => {
  const email = req.body.email.toLowerCase()
  const query = {
    text: `INSERT INTO emails(email, date) VALUES ($1, to_timestamp($2 / 1000.0))`,
    values: [email, Date.now()],
  }
  const data = await db.query(query)
  res.json(data)
})

router.get('/emails', async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    const {rows} = await db.query('SELECT * FROM emails ORDER BY id')
    res.json(rows)
  } else {
    await res.sendStatus(401)
  }
})

router.delete('/emails', async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    const {id} = req.query
    await db.query('DELETE FROM emails WHERE id = $1', [id])
    await res.sendStatus(200)
  } else {
    await res.sendStatus(401)
  }
})




module.exports = router