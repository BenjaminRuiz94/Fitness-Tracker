// require and re-export all files in this db directory (users, activities...)
const {createUser, getUser} = require('./users')



module.exports = {createUser, getUser}