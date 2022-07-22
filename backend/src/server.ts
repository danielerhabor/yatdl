import 'reflect-metadata';
import express from 'express';
import jsonfile from 'jsonfile';
import cors from 'cors';
import { TodoUI } from './types/types';
import { createTodo, getTodosPerDate } from './libs/db';
import dayjs from 'dayjs';
import { connectToDB } from './db';
import { DataSource } from 'typeorm';
import { TodoDB } from './models/Todo';

connectToDB()
  .then((dataSource: DataSource) => {
    if (dataSource.isInitialized) {
      console.log('Database initialized...');
    }

    const server = express();
    const PORT = 8080; // default port to listen
    const todosPath = './db/todos.json';
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cors());

    const apiRouter = express.Router();
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

    const todoRepo = dataSource.getRepository(TodoDB);
    apiRouter.post('/todos', (req, res) => {
      const todo: TodoUI = req.body;
      // const todos = jsonfile.readFileSync(todosPath);
      // todos.push(todo);
      // jsonfile.writeFileSync(todosPath, todos);
      createTodo(todo, todoRepo)
        .then((todo) => {
          res.status(201).send(todo);
        })
        .catch((err) => {
          res.status(500).send({ error: err });
        });
    });

    apiRouter.get('/todos', (req, res) => {
      const todosData = jsonfile.readFileSync(todosPath);
      console.log(todosData);
      res.send(todosData);
    });

    apiRouter.get('/todos/:date', (req, res) => {
      // const todosData = jsonfile.readFileSync(todosPath);
      console.log(req.params.date);
      const date = dayjs(req.params.date);
      console.log(date);
      // const todos = todosData.filter((todo: TodoUI) => todo.scheduled === date);

      getTodosPerDate(date, todoRepo)
        .then((todos) => {
          res.status(200).send(todos);
        })
        .catch((err) => {
          res.status(500).send({ error: err });
        });
    });

    apiRouter.patch('/todos/:key', (req, res) => {
      const todo = req.body as TodoUI;
      let todosData = jsonfile.readFileSync(todosPath) as TodoUI[];
      todosData = todosData.map((t) => (t.key === todo.key ? todo : t));
      jsonfile.writeFileSync(todosPath, todosData);
      res.status(200).send();
    });

    apiRouter.delete('/todos/:key', (req, res) => {
      const key = +req.params.key;
      let todosData = jsonfile.readFileSync(todosPath) as TodoUI[];
      todosData = todosData.filter((t) => t.key !== key);
      jsonfile.writeFileSync(todosPath, todosData);
      res.status(204).send();
    });

    // start the Express server
    server.listen(PORT, () => {
      console.log(`server started at http://localhost:${PORT}...`);
    });
  })
  .catch((error) => console.log(error));
