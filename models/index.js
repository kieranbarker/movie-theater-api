const Show = require('./Show')
const User = require('./User')
const Watched = require('./Watched')

Show.belongsToMany(User, { through: Watched })
User.belongsToMany(Show, { through: Watched })

module.exports = {
  Show,
  User,
  Watched
}
