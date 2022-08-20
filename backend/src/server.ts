import 'reflect-metadata';
import express from 'express';
import jsonfile from 'jsonfile';
import cors from 'cors';
import { TodoUI } from './types/types';
import { createTodo, getTodosPerDate, updateTodo } from './libs/db';
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
      createTodo(todo, todoRepo)
        .then(() => {
          res.status(201).send();
        })
        .catch((error) => {
          res.status(500).send({ error });
        });
    });

    apiRouter.get('/todos/:date', (req, res) => {
      const date = dayjs(req.params.date);
      getTodosPerDate(date, todoRepo)
        .then((todos) => {
          res.status(200).send(todos);
        })
        .catch((error) => {
          res.status(500).send({ error });
        });
    });

    apiRouter.patch('/todos/:key', (req, res) => {
      const key = +req.params.key;
      const { name, description, scheduled, status } = req.body as TodoUI;
      const todoNoKey: TodoUI = {
        name,
        description,
        scheduled,
        status,
      };
      updateTodo(key, todoNoKey, todoRepo)
        .then(() => {
          res.status(204).send();
        })
        .catch((error) => {
          res.status(500).send({ error });
        });
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
