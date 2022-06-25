import React, { useState } from 'react';
import { Task } from '../../types/types';

import styles from './TaskItem.module.css';
import Modal from '../modal/Modal';

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (title: string, description: string) => {
    console.log(title);
    console.log(description);
    setIsModalOpen(false);
  }

  return (
    <>
      <li className={styles.taskItem} onClick={handleClick}>
        {task.id} {task.description} {task.created_at} {task.status}
      </li>
      {isModalOpen && <Modal task={task} onClose={handleClose} onSave={handleSave}/>}
    </>
  );
};

export default TaskItem;
