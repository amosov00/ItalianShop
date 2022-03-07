const express = require('express')
const router = express.Router()
const db = require('../db')
const {whereBuilder} = require('../queryBuilders/where')
const {orBuilder} = require("../queryBuilders/or");
const {priceFilter} = require("../queryBuilders/priceFilter")
const {notBuilder} = require("../queryBuilders/not")
const {likeBuilder} = require("../queryBuilders/like")
const _ = require('lodash')
const fs = require("fs");
const {makeid} = require("../helpers");
const multer = require('multer');
const upload = multer();


router.get('/products', async (req, res) => {
  const offset = req.query.offset ? req.query.offset : null
  const limit = req.query.limit ? req.query.limit : null
  const order = req.query.order ? req.query.order : 'products.date DESC'
  const category = req.query.category ? req.query.category : null
  const sub_category_id = req.query.sub_category ? req.query.sub_category : null
  const checkedBrandsId = req.query.checkedBrandsId ? req.query.checkedBrandsId : null
  const checkedStylesId = req.query.checkedStylesId ? req.query.checkedStylesId : null
  const maximalPrice = req.query.maximalPrice ? req.query.maximalPrice : null
  const minimalPrice = req.query.minimalPrice ? req.query.minimalPrice : null
  const text = req.query.text ? req.query.text : null
  const onlyDiscount = req.query.discountFilter ? (req.query.discountFilter === 'true') : false
  const queryObject = {}

  if (category) {
    queryObject['sub_category.category_id'] = category
  }

  if (sub_category_id) {
    queryObject.sub_category_id = sub_category_id
  }
  const whereQuery = `
    ${whereBuilder(queryObject, 'AND')}
    ${orBuilder(checkedBrandsId, 'products.brand_id', [queryObject])}
    ${orBuilder(checkedStylesId, 'products.style_id', [checkedBrandsId, queryObject])}
    ${priceFilter(maximalPrice, minimalPrice, [checkedBrandsId, checkedStylesId, queryObject])}
    ${notBuilder(onlyDiscount, 'products.last_price', [checkedBrandsId, checkedStylesId, queryObject, maximalPrice, minimalPrice])}
    ${likeBuilder(text, 'products.name', [checkedBrandsId, checkedStylesId, queryObject, maximalPrice, minimalPrice, onlyDiscount])}
    ${likeBuilder(text, 'products.description', [text])}
  `

  const {rows: data} = await db.query(`
        SELECT products.main_photo, products.description, products.id, products.sub_category_id, products.brand_id, products.in_stock, products.price, products.last_price, products.name, products.size, products.style_id, products.date, sub_category.category_id, brands.title as brand_name FROM products 
        INNER JOIN brands ON products.brand_id = brands.id 
        INNER JOIN sub_category ON sub_category.id = products.sub_category_id 
         ${whereQuery}
        ORDER BY ${order} OFFSET $1 LIMIT $2
  `, [offset, limit])

  const {rows} = await db.query('SELECT * FROM sub_category')
  const sub_category = rows.map(async item => {
    const {rows: [{count}]} = await db.query('SELECT COUNT(*) FROM products WHERE sub_category_id = $1', [item.id])
    return {
      ...item,
      count
    }
  })
  const {rows: [{count: rowsCount}]} = await db.query(`
    SELECT COUNT(*) 
    FROM products
    INNER JOIN brands ON products.brand_id = brands.id 
    INNER JOIN sub_category ON sub_category.id = products.sub_category_id
    ${whereQuery}
   `)

  const pageCount = Math.ceil(rowsCount / limit)

  res.json({data, pageCount, sub_category: await Promise.all(sub_category)})
})

router.get('/products/category', async (req, res) => {
  const {rows: category} = await db.query('SELECT * FROM category')
  const result = category.map(async (item) => {
    const {rows: children} = await db.query('SELECT * FROM sub_category WHERE category_id = $1', [item.id])
    return {
      ...item,
      children
    }
  })
  res.json(await Promise.all(result))
})


router.get('/products/:id', async (req, res) => {
  const id = req.params.id
  const query = {
    text: 'SELECT products.main_photo, products.in_stock, products.sub_category_id, products.photos, products.description, products.id, products.price, products.last_price, products.name, products.size, products.style_id, brands.title as brand_name, brands.id as brand_id  FROM products INNER JOIN brands ON products.brand_id = brands.id WHERE products.id = $1',
    values: [id],
  }
  const {rows: [data]} = await db.query(query)
  res.json(data)
})

router.get('/category', async (req, res) => {
  const {rows} = await db.query('SELECT * FROM category ORDER BY id')
  res.json(rows)
})

router.put('/category', async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    const {id, name} = req.body
    await db.query('UPDATE category SET name = $1 WHERE id = $2', [name.toLowerCase(), id])
    await res.sendStatus(200)
  } else {
    await res.sendStatus(401)
  }
})

router.delete('/category', async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    const {id} = req.query
    try {
      await db.query('DELETE FROM category WHERE id = $1', [id])
      await res.sendStatus(200)
    } catch (e) {
      await res.status(400).send(e.detail)
    }
  } else {
    await res.sendStatus(401)
  }
})

router.post('/category', async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    await db.query('INSERT INTO category (name) VALUES ($1)', [req.body.name.toLowerCase()])
    await res.sendStatus(200)
  } else {
    await res.sendStatus(401)
  }
})

router.get('/sub_category', async (req, res) => {
  const {rows} = await db.query('SELECT sub_category.id, sub_category.name, sub_category.category_id, category.name as category_name FROM sub_category INNER JOIN category ON sub_category.category_id = category.id ORDER BY category.id')
  res.json(rows)
})


router.post('/sub_category', async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    await db.query('INSERT INTO sub_category (name, category_id) VALUES ($1, $2)', [req.body.name.toLowerCase(), req.body.category_id])
    await res.sendStatus(200)
  } else {
    await res.sendStatus(401)
  }
})


router.put('/sub_category', async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    const {id, name, category_id} = req.body
    await db.query('UPDATE sub_category SET name = $1, category_id = $3 WHERE id = $2', [name.toLowerCase(), id, category_id])
    await res.sendStatus(200)
  } else {
    await res.sendStatus(401)
  }
})


router.delete('/sub_category', async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    const {id} = req.query
    try {
      await db.query('DELETE FROM sub_category WHERE id = $1', [id])
      await res.sendStatus(200)
    } catch (e) {
      await res.status(400).send(e.detail)
    }
  } else {
    await res.sendStatus(401)
  }
})

router.delete('/products', async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    const {id} = req.query
    try {
      const {rows: [{photos, main_photo}]} = await db.query('SELECT photos, main_photo FROM products WHERE id = $1', [id])
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
      await db.query('DELETE FROM products WHERE id = $1', [id])
      await res.sendStatus(200)
    } catch (e) {
      console.log(e)
      await res.status(400).send(e.detail)
    }
  } else {
    await res.sendStatus(401)
  }
})

router.put('/products', upload.fields([{name: 'file'}, {name: 'files'}]), async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    const data = JSON.parse(req.body.data)
    let name
    if (data.name) {
      name = data.name.toLowerCase()
    }
    if (data.price === '') {
      data.price = null
    }
    if (data.last_price === '') {
      data.last_price = null
    }
    await db.query('UPDATE products SET name = $1, description = $2, in_stock = $3, sub_category_id = $4, brand_id = $5, style_id = $6, price = $7, last_price = $8, size = $9 WHERE id = $10', [name, data.description, data.in_stock, data.sub_category_id, data.brand_id, data.style_id, data.price, data.last_price, data.size, data.id])

    if (req.files.file) {
      const arrayWithFormat = req.files.file[0].originalname.split('.')
      const format = arrayWithFormat[arrayWithFormat.length - 1]
      const fileName = `${makeid(10)}.${format}`
      const {rows: [{main_photo: oldPhoto}]} = await db.query('SELECT main_photo FROM products WHERE id = $1', [data.id])
      await db.query('UPDATE products SET main_photo = $1 WHERE id = $2', [fileName, data.id])
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
    let {rows: [{photos: oldPhotos}]} = await db.query('SELECT photos FROM products WHERE id = $1', [data.id])
    if (!oldPhotos) {
      oldPhotos = []
    }
    if (data.removedPhotos.length !== 0) {
      data.removedPhotos.forEach((item) => {
        if (oldPhotos.includes(item)) {
          oldPhotos.splice(oldPhotos.findIndex(i => i === item), 1)
          fs.stat(`images/{item}`, function(err) {
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
    await db.query('UPDATE products SET photos = $1 WHERE id = $2', [[...oldPhotos, ...newFiles], data.id])
    await res.sendStatus(200)
  } else {
    await res.sendStatus(401)
  }
})


router.post('/products', upload.fields([{name: 'file'}, {name: 'files'}]), async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    const data = JSON.parse(req.body.data)
    let name
    if (data.name) {
      name = data.name.toLowerCase()
    }
    if (data.price === '') {
      data.price = null
    }
    if (data.last_price === '') {
      data.last_price = null
    }
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
    console.log([name, data.description, data.in_stock, data.sub_category_id, data.brand_id, data.style_id, data.price, data.last_price, data.size, newFiles, fileName])
    await db.query('INSERT INTO products (name, description, in_stock, sub_category_id, brand_id, style_id, price, last_price, size, photos, main_photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [name, data.description, data.in_stock, data.sub_category_id, data.brand_id, data.style_id, data.price, data.last_price, data.size, newFiles, fileName])
    await res.sendStatus(200)
  } else {
    await res.sendStatus(401)
  }
})





module.exports = router