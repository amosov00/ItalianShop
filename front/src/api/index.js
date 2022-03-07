import axios from "axios";

export const baseImgURL = `${process.env.REACT_APP_API_URL}images/`

const $axios = axios.create({baseURL: process.env.REACT_APP_API_URL})

export function createFetchAllNews() {
  const fetchAllNewsToken = axios.CancelToken.source()

  const fetchAllNews = (page, limit = 6, isNews) => {
    const offset = (page - 1) * limit
    return $axios.get('/news', {
      params: {offset, limit, isNews},
      cancelToken: fetchAllNewsToken.token
    })
  }
  return {
    fetchAllNewsToken, fetchAllNews
  }
}

export function fetchNews() {
  return $axios.get('/all-news')
}
export function createFetchAllProducts() {
  const fetchAllProductsToken = axios.CancelToken.source()
  const fetchAllProducts = (page, limit = 9, category, sub_category, checkedBrandsId, minimalPrice, maximalPrice, checkedStylesId, order, discountFilter, text) => {
    const offset = (page - 1) * limit
    return $axios.get('/products', {
      params: {offset, limit, category, sub_category, checkedBrandsId, minimalPrice, maximalPrice, checkedStylesId, order, discountFilter, text},
      cancelToken: fetchAllProductsToken.token
    })
  }
  return {
    fetchAllProductsToken, fetchAllProducts
  }
}

export function fetchSingleNews(id) {
  return $axios.get(`/news/${id}`)
}

export function sendEmail(email) {
  return $axios.post('/emails', {email})
}

export function fetchBrands(page, limit = 3, text) {
  if (page) {
    const offset = (page - 1) * limit
    return $axios.get('/brands', {
      params: {offset, limit, text}
    })
  } else {
    return $axios.get('/brands')
  }
}

export function fetchBrand(id) {
  return $axios.get(`/brands/${id}`)
}
export function fetchProduct(id) {
  return $axios.get(`/products/${id}`)
}

export function fetchCategory() {
  return $axios.get(`/products/category`)
}

export function submitForm(data) {
  return $axios.post(`/order`, data)
}

export function submitFeedback(data) {
  return $axios.post(`/feedback`, data)
}