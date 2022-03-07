import axios from "axios";

const $axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {"Access-Code": "1488"}
})

export const baseImgURL = `${process.env.VUE_APP_API_URL}images/`

export function getStyles() {
  return $axios.get('/styles')
}

export function editStyle(id, name) {
  return $axios.put('/styles', {id, name})
}

export function addStyle(name) {
  return $axios.post('/styles', {name})
}

export function removeStyle(id) {
  return $axios.delete('/styles', {params: {id}})
}

export function getCategory() {
  return $axios.get('/category')
}


export function editCategory(id, name) {
  return $axios.put('/category', {id, name})
}

export function addCategory(name) {
  return $axios.post('/category', {name})
}

export function removeCategory(id) {
  return $axios.delete('/category', {params: {id}})
}

export function getEmails() {
  return $axios.get('/emails')
}

export function removeEmail(id) {
  return $axios.delete('/emails', {params: {id}})
}

export function getSubCategory() {
  return $axios.get('/sub_category')
}

export function addSubCategory(name, category_id) {
  return $axios.post('/sub_category', {name, category_id})
}

export function editSubCategory(id, name, category_id) {
  return $axios.put('/sub_category', {id, name, category_id})
}

export function removeSubCategory(id) {
  return $axios.delete('/sub_category', {params: {id}})
}

export function getBrands() {
  return $axios.get('/all-brands')
}

export function getBrand(id) {
  return $axios.get(`/brands/${id}`)
}

export function editBrand(data) {
  return $axios.put('/brands', data, { headers: { "Content-Type": "multipart/form-data" }})
}

export function removeBrand(id) {
  return $axios.delete('/brands', {params: {id}})
}

export function addBrand(data) {
  return $axios.post('/brands', data)
}

export function getNews() {
  return $axios.get('/all-news')
}


export function editNews(data) {
  return $axios.put('/news', data, { headers: { "Content-Type": "multipart/form-data" }})
}


export function getSingleNews(id) {
  return $axios.get(`/news/${id}`)
}

export function removeArticle(id) {
  return $axios.delete('/news', {params: {id}})
}

export function addNews(data) {
  return $axios.post('/news', data)
}

export function getProducts(data) {
  const limit = 10
  const offset = (data.page - 1) * limit
  return $axios.get('/products', {params: {offset, limit,  ...data}})
}

export function getProduct(id) {
  return $axios.get(`/products/${id}`)
}

export function removeProduct(id) {
  return $axios.delete('/products', {params: {id}})
}


export function editProducts(data) {
  return $axios.put('/products', data, { headers: { "Content-Type": "multipart/form-data" }})
}

export function addProduct(data) {
  return $axios.post('/products', data, { headers: { "Content-Type": "multipart/form-data" }})
}







