import Modal from '../components/modal/Modal';
import NavBar from '../components/nav/NavBar';
import TaskList from '../components/task/TaskList';

import { Task, Status } from '../types/types';
import { range } from '../util/util';

import { useAppSelector } from './hooks'


const App: React.FC = () => {
  const numDays: number = 7;
  const tasks: Task[] = [
    {
      id: 0,
      name: 'First Task',
      description: 'Hello World',
      created_at: new Date().toDateString(),
      status: Status.TODO,
    },
    {
      id: 2,
      name: 'Second Task',
      description: 'Hello World',
      created_at: new Date().toDateString(),
      status: Status.DOING,
    },
    {
      id: 3,
      name: 'Third Task',
      description: 'Hello World',
      created_at: new Date().toDateString(),
      status: Status.DONE,
    },
  ];

  const isModalOpen: boolean = useAppSelector((state) => state.modal.isOpen);

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
      {isModalOpen && <Modal />}
      {/* Traverse through numbers 1 to 7 inclusive and print render the `TaskList` component */}
      {range(1, numDays, 1).map((i) => (
        <TaskList key={i} tasks={tasks} />
      ))}
    </>
  );
};

export default App;
