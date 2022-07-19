import express from 'express';
import jsonfile from 'jsonfile';
import cors from 'cors';
import { Task } from './types/types';
// import { AppDataSource } from './db.js';
import { defaultPostgresDB } from './db';

const server = express();

const PORT = 8080; // default port to listen

const tasksPath = './db/tasks.json';

// create a router for the prefix /api
const apiRouter = express.Router();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use('/api', apiRouter);

// allow cross origin resource sharing
apiRouter.use(cors());
apiRouter.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

apiRouter.post('/tasks', (req, res) => {
  const task: Task = req.body;
  const tasks = jsonfile.readFileSync(tasksPath);
  tasks.push(task);
  jsonfile.writeFileSync(tasksPath, tasks);
  res.status(201).send();
});

apiRouter.get('/tasks', (req, res) => {
  const tasksData = jsonfile.readFileSync(tasksPath);
  console.log(tasksData);
  res.send(tasksData);
});

apiRouter.get('/tasks/:date', (req, res) => {
  const tasksData = jsonfile.readFileSync(tasksPath);
  const date = req.params.date;

  const tasks = tasksData.filter((task: Task) => task.created_at === date);
  res.send(tasks);
});

apiRouter.patch('/tasks/:id', (req, res) => {
  const task = req.body as Task;
  let tasksData = jsonfile.readFileSync(tasksPath) as Task[];
  tasksData = tasksData.map((t) => (t.id === task.id ? task : t));
  jsonfile.writeFileSync(tasksPath, tasksData);
  res.status(200).send();
});

apiRouter.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  let tasksData = jsonfile.readFileSync(tasksPath) as Task[];
  tasksData = tasksData.filter((t) => t.id !== id);
  jsonfile.writeFileSync(tasksPath, tasksData);
  res.status(204).send();
});

// start the Express server
server.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}...`);

  const DB_NAME = 'HELLO_DB';
  defaultPostgresDB
    .initialize()
    .then((d) => {
      console.log('Default database initialized...');
      d.manager.connection
        .createQueryRunner()
        .createDatabase(DB_NAME, true)
        .then(() => {
          console.log(`${DB_NAME} database created successfully...`);
        })
        .catch((err) => {
          console.log(
            `An error occurred trying to create database ${DB_NAME}...\n${err}`
          );
        });
    })
    .catch((error) =>
      console.log(
        `An error occurred on default database intitalization...\n${error}`
      )
    );

  // AppDataSource.initialize()
  //   .then((ds) => {
  //     console.log('Database initialized...');
  //   })
  //   .catch((error) =>
  //     console.log(`An error occurred on database intitalization...\n${error}`)
  //   );
});
