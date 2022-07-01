import express from 'express';
import jsonfile from 'jsonfile';
import bp from 'body-parser';

const server = express();

const port = 8080; // default port to listen

const tasksPath = './db/tasks.json';

server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));
// allow cross origin resource sharing
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

server.get('/tasks', (req, res) => {
  const tasksData = jsonfile.readFileSync(tasksPath);
  console.log(tasksData);
  res.send(tasksData);
});

server.put('/tasks', (req, res) => {
  // console.log(req.body);
  const task = req.body;

  const tasksData = jsonfile.readFileSync(tasksPath);
  tasksData.push(task);

  jsonfile.writeFileSync(tasksPath, tasksData);
});

// start the Express server
server.listen(port, () => {
  console.log(`server started at http://localhost:${port}...`);
});
