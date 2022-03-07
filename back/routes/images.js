const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/images/:filename', (req, res) => {
  const image = path.join(process.cwd(), '/images/', req.params.filename)
  res.download(image)
})


module.exports = router