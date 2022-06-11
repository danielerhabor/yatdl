import NavBar from '../components/nav/NavBar';
import TaskList from '../components/task/TaskList';

import { Task, Status } from '../types/types';

const App: React.FC = () => {
  const tasks: Task[] = [
    {
      id: 0,
      name: 'First Task',
      description: 'Hello World',
      created_at: new Date(),
      status: Status.TODO,
    },
    {
      id: 2,
      name: 'Second Task',
      description: 'Hello World',
      created_at: new Date(),
      status: Status.DOING,
    },
    {
      id: 3,
      name: 'Third Task',
      description: 'Hello World',
      created_at: new Date(),
      status: Status.DONE,
    },
  ];

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
        mollitia harum quo fugit expedita maiores odit ratione fuga, dolorum
        qui, magni cupiditate dolores hic porro! Ex molestiae vero maiores qui?
      </main>
      <TaskList tasks={tasks} />
    </>
  );
};

export default App;
