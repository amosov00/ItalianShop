const _ = require('lodash')
function orBuilder(array, columnName, otherData) {
  if (_.isEmpty(array)) {
    return ''
  } else {
    const resultArray = []
    array.forEach(item => {
      resultArray.push(`${columnName} = ${item}`)
    })
    const params = resultArray.join(` OR `)
    return otherData.some(item => !_.isEmpty(item)) ? ` AND (${params})` : ` WHERE (${params})`
  }
}

module.exports = {orBuilder}