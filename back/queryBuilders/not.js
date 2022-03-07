const _ = require('lodash')
function notBuilder(data, columnName, otherData) {
  if (!data) {
    return ''
  } else {
    return otherData.some(item => !_.isEmpty(item)) ? ` AND (${columnName}) IS NOT NULL` : ` WHERE (${columnName}) IS NOT NULL`
  }
}

module.exports = {notBuilder}