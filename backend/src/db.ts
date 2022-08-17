import { DataSource, DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
import { TodoDB } from './models/Todo';
import { PomodoroDB } from './models/Pomodoro';

const config = dotenv.config();
if (config.error) {
  console.log(`[ERROR] - ${config.error}`);
}

const bootstrapDBConfig: DataSourceOptions = {
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT! ?? 5432,
  username: process.env.BOOTSTRAP_DB_USERNAME,
  password: process.env.BOOTSTRAP_DB_PASSWORD,
  database: process.env.BOOTSTRAP_DB_NAME,
  logging: true,
};

const bootstrapDB = new DataSource({
  ...bootstrapDBConfig,
});

const createDB = async (dbName: string) => {
  try {
    const bootstrap = await bootstrapDB.initialize();
    const db = await bootstrap.manager.connection
      .createQueryRunner()
      .createDatabase(dbName, true);
    console.log(`[Database ${dbName} created...`);
  } catch (error) {
    console.log(error);
  }
};

const connectToDB = async () => {
  const dbName = process.env.DB_NAME as string;
  await createDB(dbName);
  let db = new DataSource({
    ...bootstrapDBConfig,
    database: dbName,
    entities: [TodoDB, PomodoroDB],
    synchronize: true,
  });

  try {
    db = await db.initialize();
    console.log(`Database ${dbName} initialized...`);
  } catch (error) {
    console.log(error); 
  }
  return db;
};

export { connectToDB };
