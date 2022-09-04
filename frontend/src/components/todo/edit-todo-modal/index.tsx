import { FC, useState } from 'react';

import { useDeleteTodo, useRefresh, useUpdateTodo } from '../client-api/hooks';
import { TodoUI } from '../types';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Typography } from '@mui/material';

const EditTodoModal: FC<{
  todo: TodoUI;
  onClose: CallableFunction;
}> = ({ todo, onClose }) => {
  const [modalTodo, setModalTodo] = useState<TodoUI>(todo);
  const [isOpen, setIsOpen] = useState(true);
  const refresh = useRefresh();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const closeHandler = () => {
    clearModal();
    setIsOpen(false);
    onClose();
  };

  const clearModal = () => {
    setModalTodo((prev: TodoUI) => ({ ...prev, title: '', description: '' }));
  };

  const saveHandler = async () => {
    try {
      await updateTodo.mutateAsync(modalTodo);
      await refresh(modalTodo.scheduled);
      closeHandler();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async () => {
    try {
      await deleteTodo.mutateAsync(modalTodo);
      await refresh(modalTodo.scheduled);
      closeHandler();
    } catch (error) {
      console.error(error);
    }
  };

  // const openPomodoroModal = () => {
  //   // This opens the pomodoro modal that has the settings for the new timer
  //   // that should be started
  //   <PomodoroModal />;
  // };

  return (
    <Modal open={isOpen}>
      <>
        <header>
          <Typography component={'p'}>{modalTodo.scheduled}</Typography>
          <Button onClick={() => closeHandler()}>&times;</Button>
          <Button onClick={() => deleteHandler()}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </header>

        <div>
          <input
            value={modalTodo.title}
            onChange={(e) =>
              setModalTodo((prev: TodoUI) => ({
                ...prev,
                title: e.target.value
              }))
            }
            placeholder="Enter todo title..."></input>
          <Button onClick={() => console.log(`Add Pomodoro button clicked...`)}>
            Add Pomodoro
          </Button>
        </div>

        <textarea
          value={modalTodo.description}
          onChange={(e) =>
            setModalTodo((prev: TodoUI) => ({
              ...prev,
              description: e.target.value
            }))
          }
          placeholder="Enter todo description..."></textarea>
        <footer>
          <Button onClick={saveHandler}>Save</Button>
          <Button onClick={closeHandler}>Cancel</Button>
        </footer>
      </>
    </Modal>
  );
};

export default EditTodoModal;
