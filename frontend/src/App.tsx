import TodoList from 'components/todo/TodoList';
import Header from 'layout/Header';
import dayjs from 'libs/dayjs';
import { range } from 'util/util';

import "./App.css";



const App: React.FC = () => {
  const numDays = 7;

  return (
    <>
      <section className="px-6 pt-4">
      <Header date={dayjs()} />
        {range(1, numDays, 1).map((dayNo) => (
          <TodoList key={dayNo} dayNo={dayNo} />
        ))}
      </section>


    </>
  );
};

export default App;
