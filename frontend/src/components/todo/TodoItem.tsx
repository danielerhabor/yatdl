import React, { useState } from 'react';
import { TodoUI } from '../../types/types';

import styles from './TodoItem.module.css';
import Modal from '../modal/Modal';

const TodoItem: React.FC<{ todo: TodoUI }> = ({ todo }) => {
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
        {todo.key} {todo.name} {todo.description} {todo.scheduled} {todo.status}
      </li>
      {isModalOpen && <Modal todo={todo} onClose={closeModalHandler} />}
    </>
  );
};

export default TodoItem;
