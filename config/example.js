module.exports = {
  DATABASE: {
    client: 'mysql2',
    connection: {
      host: 'hostname',
      user: 'user',
      password: 'password',
      database: 'database',
    },
    pool: { min: 1, max: 10 },
  },
};
