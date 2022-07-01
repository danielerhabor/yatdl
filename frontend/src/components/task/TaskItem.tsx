import React, { useState } from 'react';
import { Task } from '../../types/types';

import styles from './TaskItem.module.css';
import Modal from '../modal/Modal';

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const saveToDB = (task: Task) => {};

  const handleSave = (title: string, description: string) => {
    setIsModalOpen(false);
    task.name = title;
    task.description = description;
    saveToDB(task);
  };

  return (
    <>
      <li className={styles.taskItem} onClick={handleOpen}>
        {task.id} {task.description} {task.created_at} {task.status}
      </li>
      {isModalOpen && (
        <Modal task={task} onClose={handleClose} onSave={handleSave} />
      )}
    </>
  );
};

export default TaskItem;
