import { FC } from 'react';

import dayjs, { extend } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
extend(isoWeek);

import { useGetTodosPerDate } from 'components/todo/client-api/hooks';
import CreateTodoItem from 'components/todo/create-todo';
import TodoItem from 'components/todo/todo-item';
import { TodoUI } from 'components/todo/types';

const TodoList: FC<{ dayNo: number }> = ({ dayNo }) => {
  const date: dayjs.Dayjs = dayjs().isoWeekday(dayNo);

  const { isLoading, isError, error, data } = useGetTodosPerDate(
    date.format('YYYY-MM-DD')
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{`An error occurred - (${error})...`}</div>;
  }
  let todos: TodoUI[] = [];
  if (data) {
    todos = data.map((todo: TodoUI) => {
      const date = todo.scheduled.split('T')[0];

      return {
        ...todo,
        scheduled: date
      };
    });
  }

  return (
    <div>
      <h2>{date.format('dddd')}</h2>
      <ul>
        {todos.map((todo: TodoUI) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        <CreateTodoItem date={date.format('YYYY-MM-DD')} />
      </ul>
    </div>
  );
};

export default TodoList;
