import React from 'react';

import TodoItem from './TodoItem';

import { TodoUI } from '../../types/types';

import styles from './TodoList.module.css';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useGetTodosPerDate } from '../../util/hooks';
import NewTodoItem from './NewTodoItem';
dayjs.extend(isoWeek);

const TodoList: React.FC<{ dayNo: number }> = ({ dayNo }) => {
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
    todos = data;
  }

  return (
    <div className={styles.todoList}>
      <h2>{date.format('dddd')}</h2>
      <ul>
        {todos.map((todo: TodoUI) => (
          <TodoItem key={todo.key} todo={todo} />
        ))}
        <NewTodoItem date={date.format('YYYY-MM-DD')} />
      </ul>
    </div>
  );
};

export default TodoList;
