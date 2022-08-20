import { useState } from 'react';
import { TodoUI } from '../../types/types';
import { useRefresh, useCreateTodo } from '../../util/hooks';
import styles from './NewTodoItem.module.css';

const NewTodoItem: React.FC<{ date: string }> = ({ date }) => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const refresh = useRefresh();
  const createTodo = useCreateTodo();

  const blurHandler = async () => {
    // make the post request to create a todo on the server with the new todo name
    const newTodo: TodoUI = {
      title: newTodoTitle,
      scheduled: date,
    };
    try {
      await createTodo.mutateAsync(newTodo);
      await refresh(date);
      setNewTodoTitle(''); // triggers a re-render of the entire component
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <input
      value={newTodoTitle}
      onBlur={() => {
        newTodoTitle && blurHandler();
      }} // if the input field is not empty, blurHandler is called
      onChange={(e) => setNewTodoTitle(e.target.value)}
      className={styles.newTodoItem}
    ></input>
  );
};

export default NewTodoItem;
