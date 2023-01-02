import { FC, useState } from 'react';

import EditTodoModal from 'components/todo/EditTodoModal';
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
      <li onClick={openModalHandler} className="border-b-[1px] w-full">
        <>
          {todo.title} {todo.description} {todo.scheduled} {todo.status}
        </>
      </li>
      {isModalOpen ? <EditTodoModal todo={todo} onClose={closeModalHandler} /> : null}
    </>
  );
};

export default TodoItem;
