import { FC, useState } from 'react';

import EditTodoModal from 'components/todo/edit-todo-modal';
import { TodoUI } from 'components/todo/types';

const TodoItem: FC<{ todo: TodoUI }> = ({ todo }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li onClick={openModalHandler}>
        <>
          {todo.title} {todo.description} {todo.scheduled} {todo.status}
        </>
      </li>
      {isModalOpen && <EditTodoModal todo={todo} onClose={closeModalHandler} />}
    </>
  );
};

export default TodoItem;
