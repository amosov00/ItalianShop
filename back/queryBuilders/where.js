const _ = require('lodash')
function whereBuilder(queryObject, operator) {
  if (_.isEmpty(queryObject)) {
    return ''
  } else {
    const resultArray = []
    for (let i in queryObject) {
      if (typeof queryObject[i] === 'string') {
        resultArray.push(`${i} = '${queryObject[i]}'`)
      } else {
        resultArray.push(`${i} = ${queryObject[i]}`)
      }
    }
    const params = resultArray.join(` ${operator} `)
    return `WHERE ${params}`
  }
}

module.exports = {whereBuilder}