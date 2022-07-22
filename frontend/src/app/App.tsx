import NavBar from '../components/nav/NavBar';
import TaskList from '../components/todo/TodoList';

import { range } from '../util/util';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

const App: React.FC = () => {
  const numDays: number = 7;

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
        <TaskList key={dayNo} dayNo={dayNo} />
      ))}
    </>
  );
};

export default App;
