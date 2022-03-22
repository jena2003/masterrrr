import { createConnection } from 'typeorm';

const initConnection = () =>
  createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Jena2003.',
    database: 'web',
    entities: ['./dist/src/models/*.js'],
    synchronize: true,
  });

export default initConnection;
