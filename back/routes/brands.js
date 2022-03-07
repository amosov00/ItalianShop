const express = require('express')
const router = express.Router()
const db = require('../db')
const {likeBuilder} = require("../queryBuilders/like");
const multer = require('multer');
const upload = multer();
const {makeid} = require('../helpers')
const fs = require('fs')


router.get('/brands', async (req, res) => {
  const text = req.query.text ? req.query.text : null
  const offset = req.query.offset ? req.query.offset : null
  const limit = req.query.limit ? req.query.limit : null
  const whereQuery = likeBuilder(text, 'title', [])
  const {rows: [{count: rowsCount}]} = await db.query(`
    SELECT COUNT(*)
    FROM brands
    ${whereQuery}
   `)
  const pageCount = Math.ceil(rowsCount / 3)
  const {rows: data} = await db.query(`SELECT title, main_photo, id, body FROM brands ${whereQuery} OFFSET $1 LIMIT $2`, [offset, limit])
  res.json({data, pageCount})
})


router.get('/brands/:id', async (req, res) => {
  const id = req.params.id
  const queryBrands = {
    text: 'SELECT * FROM brands WHERE id = $1',
    values: [id],
  }
  const queryBrandsCategory = {
    text: 'SELECT category.name, category.id FROM products INNER JOIN sub_category ON products.sub_category_id = sub_category.id INNER JOIN category ON sub_category.category_id = category.id WHERE brand_id = $1 GROUP BY category.id',
    values: [id],
  }
  const {rows: [data]} = await db.query(queryBrands)
  const {rows: category} = await db.query(queryBrandsCategory)
  res.json({...data, category})
})

router.get('/all-brands', async (req, res) => {
  const {rows: data} = await db.query(`SELECT title as name, id FROM brands`)
  res.json(data)
})

router.put('/brands', upload.fields([{name: 'file'}, {name: 'files'}]), async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    const data = JSON.parse(req.body.data)
    await db.query('UPDATE brands SET title = $1, body = $3 WHERE id = $2', [data.title.toLowerCase(), data.id, data.body])
    if (req.files.file) {
      const arrayWithFormat = req.files.file[0].originalname.split('.')
      const format = arrayWithFormat[arrayWithFormat.length - 1]
      const fileName = `${makeid(10)}.${format}`
      const {rows: [{main_photo: oldPhoto}]} = await db.query('SELECT main_photo FROM brands WHERE id = $1', [data.id])
      await db.query('UPDATE brands SET main_photo = $1 WHERE id = $2', [fileName, data.id])
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
    const {rows: [{photos: oldPhotos}]} = await db.query('SELECT photos FROM brands WHERE id = $1', [data.id])
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
    await db.query('UPDATE brands SET photos = $1 WHERE id = $2', [[...oldPhotos, ...newFiles], data.id])
    await res.sendStatus(200)
  } else {
    await res.sendStatus(401)
  }
})



router.delete('/brands', async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    const {id} = req.query
    try {
      const {rows: [{photos, main_photo}]} = await db.query('SELECT photos, main_photo FROM brands WHERE id = $1', [id])
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
      await db.query('DELETE FROM brands WHERE id = $1', [id])
      await res.sendStatus(200)
    } catch (e) {
      console.log(e)
      await res.status(400).send(e.detail)
    }
  } else {
    await res.sendStatus(401)
  }
})


router.post('/brands', upload.fields([{name: 'file'}, {name: 'files'}]), async (req, res) => {
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
    await db.query('INSERT INTO brands (title, body, main_photo, photos) VALUES ($1, $2, $3, $4)', [data.title.toLowerCase(), data.body, fileName, newFiles])
    await res.sendStatus(200)
  } else {
    await res.sendStatus(401)
  }
})


module.exports = router