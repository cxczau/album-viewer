const PERMITTED_PARAMS = ['name', 'email', 'username', 'phone'];

const sanitizeUser = user => {
  if (!user) return {};
  if (!user.name || !user.email || !user.username) return {};
  return Object.assign(
    {},
    ...PERMITTED_PARAMS.map((key) => ({ [key]: user[key] }))
  )
}

const createUser = async ({ body }) => {
  const sanitizedUser = sanitizeUser(body)

  if (Object.keys(sanitizedUser).length === 0) {
    return { status: 400, ok: false, message: 'Bad Request' };
  }

  const response = await fetch(`http://127.0.0.1:3004/users`, {
    method: 'POST',
    body: JSON.stringify(sanitizedUser),
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json'
    },
  });
  
  const data = await response.json();
  return {
    data,
    status: response.status,
    ok: response.ok,
    message: response.statusText
  };
}

module.exports = {
  createUser,
  sanitizeUser,
}