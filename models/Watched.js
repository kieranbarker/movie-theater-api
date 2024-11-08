const { db } = require('../db/connection')

const Watched = db.define('watched', {}, { freezeTableName: true })

module.exports = Watched
