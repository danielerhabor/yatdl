import { FC, useState } from 'react';
import { TodoUI } from '../../types/types';

import Modal from '../modal/Modal';
import styles from './TodoItem.module.css';

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
      <li className={styles.todoItem} onClick={openModalHandler}>
        {todo.title} {todo.description} {todo.scheduled} {todo.status}
      </li>
      {isModalOpen && <Modal todo={todo} onClose={closeModalHandler} />}
    </>
  );
};

export default TodoItem;
