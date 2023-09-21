const fetch = require('node-fetch');
// const { Response } = jest.requireActual('node-fetch');
jest.mock('node-fetch')

const { createUser, sanitizeUser } = require("./users");

const USER_MOCK = {
  name: 'John Doe',
  email: 'user@email.com',
  username: 'johndoe',
  phone: '1234567890',
}

describe('sanitizeUser', () => {
  test('should include permitted params', () => {
    expect(sanitizeUser(USER_MOCK)).toEqual(USER_MOCK);
  })
  
  test('should exclude non-permitted params', () => {
    const user = {
      password: 'password',
      badField: 'badField',
      numbers: 1234567890,
    };
    expect(sanitizeUser(user)).toEqual({});
  })
  
  test('should handle empty user object', () => {
    expect(sanitizeUser({})).toEqual({});
  })

  test('should handle undefined user object', () => {
    expect(sanitizeUser()).toEqual({});
  })
})

describe('POST /api/users', () => {
  test('should send a POST and return a successful response', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ ...USER_MOCK, id: 2 }),
      status: 201,
      ok: true,
      statusText: 'Created',
    }));

    const response = await createUser({ body: USER_MOCK });
    
    expect(response.ok).toBe(true);
    expect(response.status).toEqual(201);
    expect(response.message).toEqual('Created');
    expect(sanitizeUser(response.data)).toEqual(USER_MOCK);
    expect(response.data.id).toEqual(2);
  });

  test('should return a bad response when sanitizedUser is empty', async () => {
    const response = await createUser({ body: {}});
    
    expect(response.message).toEqual('Bad Request');
    expect(response.ok).toBe(false);
    expect(response.status).toEqual(400);
  });

  test('should send a POST and return a bad response', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({}),
      status: 500,
      ok: false,
      statusText: 'Internal Server Error',
    }));

    const response = await createUser({ body: USER_MOCK });
    
    expect(response.ok).toBe(false);
    expect(response.message).toEqual('Internal Server Error');
    expect(response.status).toEqual(500);
  });
});