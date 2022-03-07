const express = require('express')
const router = express.Router()
const db = require('../db')


router.get('/styles', async (req, res) => {
  const {rows: data} = await db.query('SELECT * FROM styles ORDER BY id')
  res.json(data)
})

router.put('/styles', async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    const {id, name} = req.body
    await db.query('UPDATE styles SET name = $1 WHERE id = $2', [name.toLowerCase(), id])
    await res.sendStatus(200)
  } else {
    await res.sendStatus(401)
  }
})

router.delete('/styles', async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    const {id} = req.query
    try {
      await db.query('DELETE FROM styles WHERE id = $1', [id])
      await res.sendStatus(200)
    } catch (e) {
      await res.status(400).send(e.detail)
    }
  } else {
    await res.sendStatus(401)
  }
})

router.post('/styles', async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    await db.query('INSERT INTO styles (name) VALUES ($1)', [req.body.name.toLowerCase()])
    await res.sendStatus(200)
  } else {
    await res.sendStatus(401)
  }
})


module.exports = router
