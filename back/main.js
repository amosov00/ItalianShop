const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const news = require('./routes/news')
const images = require('./routes/images')
const emails = require('./routes/emails')
const brands = require('./routes/brands')
const catalog = require('./routes/catalog')
const order = require('./routes/order')
const styles = require('./routes/styles')
const db = require('./db')

app.use(function(req, res, next) {
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: '*'
  })
)

app.use(
  news,
  images,
  emails,
  brands,
  catalog,
  order,
  styles
)

app.get('/drop', async (req, res) => {
  if (req.headers['access-code'] === '1488') {
    try {
      await db.query(`DROP TABLE products`)
      await db.query(`DROP TABLE emails`)
      await db.query(`DROP TABLE news`)
      await db.query(`DROP TABLE brands`)
      await db.query(`DROP TABLE styles`)
      await db.query(`DROP TABLE sub_category`)
      await db.query(`DROP TABLE category`)
      await res.sendStatus(200)
    } catch (e) {
      await res.status(400).send(e.detail)
    }
  } else {
    await res.sendStatus(401)
  }
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})




