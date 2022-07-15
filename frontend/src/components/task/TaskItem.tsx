import React, { useState } from 'react';
import { Task } from '../../types/types';

import styles from './TaskItem.module.css';
import Modal from '../modal/Modal';

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li className={styles.taskItem} onClick={openModalHandler}>
        {task.id} {task.name} {task.description} {task.created_at} {task.status}
      </li>
      {isModalOpen && <Modal task={task} onClose={closeModalHandler} />}
    </>
  );
};

export default TaskItem;
