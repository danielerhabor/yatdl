import styles from './App.module.css';

import { Task, Status } from '../types/types';

import NavBar from '../components/NavBar';
import TaskList from '../components/TaskList';
import Modal from '../components/Modal';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

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

  // const [modal, setModal] = useState(false);
  // const Toggle = () => setModal(!modal);
  const modal = useSelector((state: RootState) => state.modal.value);

  return (
    <div className={styles.borderMarginReset}>
      <header>
        <NavBar />
      </header>
      <main>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
        mollitia harum quo fugit expedita maiores odit ratione fuga, dolorum
        qui, magni cupiditate dolores hic porro! Ex molestiae vero maiores qui?
      </main>
      <TaskList tasks={tasks} />
      {modal && <Modal />}
    </div>
  );
};

export default App;
