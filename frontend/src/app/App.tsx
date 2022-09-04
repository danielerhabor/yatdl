import NavBar from 'components/nav/NavBar';
import TodoList from 'components/todo/todo-list';

import { range } from '../util/util';

import { extend } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
extend(isoWeek);

const App: React.FC = () => {
  const numDays = 7;

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
        <TodoList key={dayNo} dayNo={dayNo} />
      ))}
    </>
  );
};

export default App;
