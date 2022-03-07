const express = require('express')
const router = express.Router()
const db = require('../db')
const {makeid} = require("../helpers");
const fs = require("fs");
const multer = require('multer');
const upload = multer();


router.get('/news', async (req, res) => {
  const offset = req.query.offset ? req.query.offset : null
  const limit = req.query.limit ? req.query.limit : null
  const isNews = req.query.isNews === 'true'
  const query = {
    text: 'SELECT id, title, description, main_photo, date, isNews FROM news WHERE isNews = $3 ORDER BY id OFFSET $1 LIMIT $2',
    values: [offset, limit, isNews],
  }
  const {rows: data} = await db.query(query)
  const {rows: [{count: rowsCount}]} = await db.query('SELECT COUNT(*) FROM news WHERE isNews = $1', [isNews])
  const pageCount = Math.ceil(rowsCount / limit)

  res.json({data, pageCount, rowsCount})
})


router.get('/news/:id', async (req, res) => {
  const id = req.params.id
  const query = {
    text: 'SELECT * FROM news WHERE id = $1',
    values: [id],
  }
  const {rows: [data]} = await db.query(query)
  res.json(data)
})

router.get('/all-news', async (req, res) => {
  const {rows: data} = await db.query(`SELECT title as name, id FROM news ORDER BY id`)
  res.json(data)
})

router.put('/news', upload.fields([{name: 'file'}, {name: 'files'}]), async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    const data = JSON.parse(req.body.data)
    await db.query('UPDATE news SET title = $1, body = $3, description = $4, isnews = $5 WHERE id = $2', [data.title.toLowerCase(), data.id, data.body, data.description, data.isnews])

    if (req.files.file) {
      const arrayWithFormat = req.files.file[0].originalname.split('.')
      const format = arrayWithFormat[arrayWithFormat.length - 1]
      const fileName = `${makeid(10)}.${format}`
      const {rows: [{main_photo: oldPhoto}]} = await db.query('SELECT main_photo FROM news WHERE id = $1', [data.id])
      await db.query('UPDATE news SET main_photo = $1 WHERE id = $2', [fileName, data.id])
      fs.writeFileSync(`images/${fileName}`, req.files.file[0].buffer);
      if (oldPhoto) {
        fs.stat(`images/${oldPhoto}`, function(err) {
          if (err == null) {
            fs.unlinkSync(`images/${oldPhoto}`)
          } else {
            console.log('not exist in base')
          }
        });
      }
    }
    const {rows: [{photos: oldPhotos}]} = await db.query('SELECT photos FROM news WHERE id = $1', [data.id])
    if (data.removedPhotos.length !== 0) {
      data.removedPhotos.forEach((item) => {
        if (oldPhotos.includes(item)) {
          oldPhotos.splice(oldPhotos.findIndex(i => i === item), 1)
          fs.stat(`images/${item}`, function(err) {
            if (err == null) {
              fs.unlinkSync(`images/${item}`)
            } else {
              console.log('not exist in base')
            }
          });
        }
      })
    }
    let newFiles = []
    if (req.files.files) {
      newFiles = req.files.files.map((singleFile) => {
        const arrayWithFormat = singleFile.originalname.split('.')
        const format = arrayWithFormat[arrayWithFormat.length - 1]
        const fileName = `${makeid(10)}.${format}`
        fs.writeFileSync(`images/${fileName}`, singleFile.buffer);
        return fileName
      })
    }
    await db.query('UPDATE news SET photos = $1 WHERE id = $2', [[...oldPhotos, ...newFiles], data.id])
    await res.sendStatus(200)
  } else {
    await res.sendStatus(401)
  }
})



router.delete('/news', async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    const {id} = req.query
    try {
      const {rows: [{photos, main_photo}]} = await db.query('SELECT photos, main_photo FROM news WHERE id = $1', [id])
      const allPhotos = []
      if (photos) {
        allPhotos.push(...photos)
      }
      if (main_photo) {
        allPhotos.push(main_photo)
      }
      allPhotos.map((item) => {
        fs.stat(`images/${item}`, function(err) {
          if (err == null) {
            fs.unlinkSync(`images/${item}`)
          } else {
            console.log('not exist in server')
          }
        });
      })
      await db.query('DELETE FROM news WHERE id = $1', [id])
      await res.sendStatus(200)
    } catch (e) {
      console.log(e)
      await res.status(400).send(e.detail)
    }
  } else {
    await res.sendStatus(401)
  }
})


router.post('/news', upload.fields([{name: 'file'}, {name: 'files'}]), async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    const data = JSON.parse(req.body.data)
    let newFiles = []
    let fileName = ''
    if (req.files.file) {
      const arrayWithFormat = req.files.file[0].originalname.split('.')
      const format = arrayWithFormat[arrayWithFormat.length - 1]
      fileName = `${makeid(10)}.${format}`
      fs.writeFileSync(`images/${fileName}`, req.files.file[0].buffer);
    }
    if (req.files.files) {
      newFiles = req.files.files.map((singleFile) => {
        const arrayWithFormat = singleFile.originalname.split('.')
        const format = arrayWithFormat[arrayWithFormat.length - 1]
        const fileName = `${makeid(10)}.${format}`
        fs.writeFileSync(`images/${fileName}`, singleFile.buffer);
        return fileName
      })
    }
    await db.query('INSERT INTO news (title, body, main_photo, photos, isnews, description) VALUES ($1, $2, $3, $4, $5, $6)', [data.title.toLowerCase(), data.body, fileName, newFiles, data.isnews, data.description])
    await res.sendStatus(200)
  } else {
    await res.sendStatus(401)
  }
})



module.exports = router


