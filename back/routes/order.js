const express = require('express')
const router = express.Router()

const TelegramBot = require('node-telegram-bot-api');
const db = require("../db");
const bot = new TelegramBot('1936627336:AAEjTSZIO9mwk_myJDAoyUDEFZN1ZLMG6-0', {polling: true});
const alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
  'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X',
  'Y', 'Z' ]
const getQuery = (id) => ({
  text: 'SELECT products.main_photo, products.photos, products.description, products.id, products.price, products.last_price, products.name, products.size, products.style_id, brands.title as brand_name, brands.id as brand_id  FROM products INNER JOIN brands ON products.brand_id = brands.id WHERE products.id = $1',
  values: [id],
})
function randomNumber(min, max){
  const r = Math.random()*(max-min) + min
  return Math.floor(r)
}


router.post('/order', async (req, res) => {
  const email = req.body.email
  const phone = req.body.phone
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const notes = req.body.notes
  const products = req.body.products
  const number = alphabet[randomNumber(0, 25)] + alphabet[randomNumber(0, 25)] + Math.floor((Math.random()*1000000)+1);


  const promiseProducts = products.map(async ({id}) => {
    const {rows: [data]} = await db.query(getQuery(id))
    return data
  })
  const basedProducts =  (await Promise.all(promiseProducts)).map((i) => {
    const count = products.find((item) => item.id === i.id).count
    return {...i, count}
  })

  await bot.sendMessage('-1001633761010', `Заказ №${number}\nE-mail: ${email}\nТелефон: ${phone}\nИмя: ${firstName}\nФамилия: ${lastName}\nПремечания к заказу: ${notes}\n${basedProducts.map(({name, id, price, count, brand_name}) => {
      return `\n_______________________________\nНазвание товара: ${name},\nID: ${id},\nКоличество: ${count}\nЦена за еденицу товара: ${price}₽\nБренд: ${brand_name}`
     }).join('')}\n_______________________________\nОбщая цена: ${basedProducts.reduce((prev, current) => current.price * current.count + prev, 0)}₽
  `);
  res.json({number})
})


router.post('/feedback', async (req, res) => {
  const email = req.body.email
  const phone = req.body.phone
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  await bot.sendMessage('-1001633761010', `Обратная связь\nE-mail: ${email}\nТелефон: ${phone}\nИмя: ${firstName}\nФамилия: ${lastName}`);
  await res.sendStatus(200)
})





module.exports = router