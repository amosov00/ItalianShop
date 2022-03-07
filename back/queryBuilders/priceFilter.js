const _ = require('lodash')
function priceFilter(maximalPrice, minimalPrice, otherData) {
  if (maximalPrice === null && minimalPrice === null) {
    return ''
  } else {
    let params
    if (maximalPrice !== null && minimalPrice !== null) {
      params = `products.price <= ${maximalPrice} AND products.price >= ${minimalPrice}`
    } else if (maximalPrice === null && minimalPrice !== null) {
      params = `products.price >= ${minimalPrice}`
    } else if (maximalPrice !== null && minimalPrice === null) {
      params = `products.price <= ${maximalPrice}`
    }
    return otherData.some(item => !_.isEmpty(item)) ? ` AND (${params})` : ` WHERE (${params})`
  }
}

module.exports = {priceFilter}