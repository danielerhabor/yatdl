import { DataSource } from 'typeorm';
import { Pomodoro } from './models/Pomodoro';
import { Todo } from './models/Todo';

const defaultPostgresDB = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  logging: true,
});

export { defaultPostgresDB };

// export { AppDataSource };

// // to initialize initial connection with the database, register all entities
// // and "synchronize" database schema, call "initialize()" method of a newly created database
// // once in your application bootstrap
// AppDataSource.initialize()
//     .then(() => {
//         // here you can start to work with your database
//     })
//     .catch((error) => console.log(error))
