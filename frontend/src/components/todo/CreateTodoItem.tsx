import { FC, useState } from 'react';

import { useCreateTodo, useRefresh } from 'components/todo/client-api/hooks';
import { TodoUI } from 'components/todo/types';

const CreateTodoItem: FC<{ date: string }> = ({ date }) => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const refresh = useRefresh();
  const createTodo = useCreateTodo();

  const blurHandler = async () => {
    // make the post request to create a todo item on the server with the new todo name
    const newTodo: TodoUI = {
      title: newTodoTitle,
      scheduled: date
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
      className="border-b-[1px] w-full"
      ></input>
  );
};

export default CreateTodoItem;
