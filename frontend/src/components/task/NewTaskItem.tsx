import { AxiosError } from 'axios';
import { useState } from 'react';
import { Status, Task } from '../../types/types';
import { useCreateTask, useRefresh } from '../../util/hooks';
import styles from './NewTaskItem.module.css';

const NewTaskItem: React.FC<{ date: string }> = ({ date }) => {
  const [newTaskName, setNewTaskName] = useState<string>('');
  const createTask = useCreateTask();
  const refresh = useRefresh();

  const blurHandler = async () => {
    // make the post request to create a task on the server with the new task name
    const newTask: Task = {
      id: crypto.randomUUID(),
      name: newTaskName,
      description: '',
      created_at: date,
      status: Status.TODO,
    };
    try {
      const res = await createTask.mutateAsync(newTask);
      if (res.status !== 201) {
        throw new Error(`[ERROR] Response status: (${res.status})`);
      }
      refresh(newTask.created_at);
      setNewTaskName(''); // triggers a re-render of the entire component
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(`[AXIOS_ERROR] - ${error.message}`);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <input
      value={newTaskName}
      onBlur={() => {
        newTaskName && blurHandler();
      }} // if the input field is not empty, blurHandler is called
      onChange={(e) => setNewTaskName(e.target.value)}
      className={styles.newTaskItem}
      name="newTaskItem"
    ></input>
  );
};

export default NewTaskItem;
