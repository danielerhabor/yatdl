import express from 'express';
import jsonfile from 'jsonfile';
import cors from 'cors';
import { TodoUI } from './types/types';

import { Todo } from './models/Todo';

// import { AppDataSource } from './db.js';
// import { bootstrapDB } from './db';

const server = express();

const PORT = 8080; // default port to listen

const todosPath = './db/todos.json';

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

apiRouter.post('/todos', (req, res) => {
  const todo: TodoUI = req.body;
  const todos = jsonfile.readFileSync(todosPath);
  todos.push(todo);
  jsonfile.writeFileSync(todosPath, todos);
  res.status(201).send();
});

apiRouter.get('/todos', (req, res) => {
  const todosData = jsonfile.readFileSync(todosPath);
  console.log(todosData);
  res.send(todosData);
});

apiRouter.get('/todos/:date', (req, res) => {
  const todosData = jsonfile.readFileSync(todosPath);
  const date = req.params.date;
  const todos = todosData.filter(
    (todo: TodoUI) => todo.scheduled === date
  );
  res.send(todos);
});

apiRouter.patch('/todos/:key', (req, res) => {
  const todo = req.body as TodoUI;
  let todosData = jsonfile.readFileSync(todosPath) as TodoUI[];
  todosData = todosData.map((t) => (t.key === todo.key ? todo : t));
  jsonfile.writeFileSync(todosPath, todosData);
  res.status(200).send();
});

apiRouter.delete('/todos/:key', (req, res) => {
  const key = req.params.key;
  let todosData = jsonfile.readFileSync(todosPath) as TodoUI[];
  todosData = todosData.filter((t) => t.key !== key);
  jsonfile.writeFileSync(todosPath, todosData);
  res.status(204).send();
});

// start the Express server
server.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}...`);
});
