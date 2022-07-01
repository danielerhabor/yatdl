import Modal from '../components/modal/Modal';
import NavBar from '../components/nav/NavBar';
import TaskList from '../components/task/TaskList';

import { range, getSevenDaysIncluding } from '../util/util';

// import tasksData from '../db/tasks.json';
import { Dayjs } from 'dayjs';
import { useGetAllTasks } from '../util/hooks';

const App: React.FC = () => {
  const apiEndpoint: string = 'http://localhost:8080/tasks';
  const data = useGetAllTasks(apiEndpoint);
  const days: Dayjs[] = getSevenDaysIncluding(new Date());
  const numDays: number = 7;
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
      {/* Traverse through numbers 1 to 7 inclusive and print render the `TaskList` component */}
      {range(1, numDays, 1).map((i) => (
        <TaskList key={i} tasks={data.tasks} />
      ))}
    </>
  );
};

export default App;
