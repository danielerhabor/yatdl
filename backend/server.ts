import express from 'express';
import jsonfile from 'jsonfile';
import bp from 'body-parser';
import { Task } from './types/types';

const server = express();

const PORT = 8080; // default port to listen

const tasksPath = './db/tasks.json';

// create a router for the prefix /api
const apiRouter = express.Router();

server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));
server.use('/api', apiRouter);

// allow cross origin resource sharing
apiRouter.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

apiRouter.get('/tasks', (req, res) => {
  const tasksData = jsonfile.readFileSync(tasksPath);
  console.log(tasksData);
  res.send(tasksData);
});

apiRouter.get('/tasks/:date', (req, res) => {
  const tasksData = jsonfile.readFileSync(tasksPath);
  const date = req.params.date;
  console.log(`The date as a parameter is ${date}`);

  const tasks = tasksData.filter((task: Task) => task.created_at === date);
  res.send(tasks);
});

apiRouter.patch('/tasks', (req, res) => {
  // console.log(req.body);
  const task = req.body;

  const tasksData = jsonfile.readFileSync(tasksPath);
  tasksData.push(task);

  jsonfile.writeFileSync(tasksPath, tasksData);
});

// start the Express server
server.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}...`);
});
