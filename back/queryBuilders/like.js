const _ = require('lodash')
function likeBuilder(data, columnName, otherData) {
  if (!data) {
    return ''
  } else {
    return otherData.some(item => !_.isEmpty(item)) ? ` OR ${columnName} LIKE '%${data}%'` : ` WHERE ${columnName} LIKE '%${data}%'`
  }
}

module.exports = {likeBuilder}