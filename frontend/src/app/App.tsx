import Modal from '../components/modal/Modal';
import NavBar from '../components/nav/NavBar';
import TaskList from '../components/task/TaskList';

import {
  range,
  getSevenDaysIncluding,
  isTaskInCurrentWeek,
} from '../util/util';

// import tasksData from '../db/tasks.json';
import { Dayjs } from 'dayjs';
import { useGetAllTasks } from '../util/hooks';
import { Task } from '../types/types';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

const App: React.FC = () => {
  // console.log("App starting rendering...");
  const apiEndpoint: string = 'http://localhost:8080/tasks';
  const data = useGetAllTasks(apiEndpoint);
  const days: Dayjs[] = getSevenDaysIncluding(new Date());
  const numDays: number = 7;
  const tasks: Task[] = data ? data.data : [];
  const tasksInCurrentWeek: Task[] = tasks.filter(isTaskInCurrentWeek);
  // console.log("App finishing rendering...");
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
      
      {range(1, numDays, 1).map((dayNo) => (
        <TaskList
          key={dayNo}
          tasks={tasksInCurrentWeek.filter(
            (task) => dayjs(task.created_at).isoWeekday() === dayNo
          )}
        />
      ))}
    </>
  );
};

export default App;
