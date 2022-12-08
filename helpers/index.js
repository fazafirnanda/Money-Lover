 let bcrypt = require('bcryptjs')

let encrypt = (params) => {
    bcrypt.hashSync(params, 10)
}

let decrypt  = ( y, l ) => {
    bcrypt.compareSync(y,l)
}

module.exports = { encrypt, decrypt }