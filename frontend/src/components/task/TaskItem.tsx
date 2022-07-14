import React, { useState } from 'react';
import { Task } from '../../types/types';

import styles from './TaskItem.module.css';
import Modal from '../modal/Modal';

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [taskState, setTaskState] = useState<Task>(task);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    console.log('Closing modal....');
    setIsModalOpen(false);
    console.log('Closed modal....');

  };

  const saveToDB = (task: Task) => {};



  return (
    <>
      <li className={styles.taskItem} onClick={openModalHandler}>
         {task.id} {task.name} {task.description} {task.created_at} {task.status}
      </li>
      {isModalOpen && (
        <Modal task={task} onClose={closeModalHandler} onSave={() => 0} />
      )}
    </>
  );
};

export default TaskItem;
