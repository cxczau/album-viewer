const PERMITTED_PARAMS = ['name', 'email', 'username', 'phone'];

const sanitizeUser = user => Object.assign(
  {},
  ...PERMITTED_PARAMS.map((key) => ({ [key]: user[key] }))
)

module.exports = sanitizeUser;