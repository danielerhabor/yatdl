import { AxiosError } from 'axios';
import { useState } from 'react';
import { Status, TodoUI } from '../../types/types';
import { useRefresh, useCreateTodo } from '../../util/hooks';
import styles from './NewTodoItem.module.css';

const NewTodoItem: React.FC<{ date: string }> = ({ date }) => {
  const [newTodoName, setNewTodoName] = useState<string>('');
  const createTodo = useCreateTodo();
  const refresh = useRefresh();

  const blurHandler = async () => {
    // make the post request to create a todo on the server with the new todo name
    const newTodo: TodoUI = {
      name: newTodoName,
      scheduled: date,
    };
    try {
      const res = await createTodo.mutateAsync(newTodo);
      if (res.status !== 201) {
        throw new Error(`[ERROR] Response status: (${res.status})`);
      }
      refresh(newTodo.scheduled);
      setNewTodoName(''); // triggers a re-render of the entire component
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <input
      value={newTodoName}
      onBlur={() => {
        newTodoName && blurHandler();
      }} // if the input field is not empty, blurHandler is called
      onChange={(e) => setNewTodoName(e.target.value)}
      className={styles.newTodoItem}
      name="newTodoItem"
    ></input>
  );
};

export default NewTodoItem;
