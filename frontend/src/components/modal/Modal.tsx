import { useState } from 'react';
import { createPortal } from 'react-dom';

import { TodoUI } from '../../types/types';
import { useDeleteTodo, useRefresh, useUpdateTodo } from '../../util/hooks';

import styles from './Modal.module.css';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Modal: React.FC<{
  todo: TodoUI;
  onClose: CallableFunction;
}> = ({ todo, onClose }) => {
  const [modalTodo, setModalTodo] = useState<TodoUI>(todo);
  const refresh = useRefresh();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const closeHandler = () => {
    clearModal();
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

  const domModal = document.getElementById('root-modal') as HTMLElement;
  const reactModal = (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <header className={styles.modalHeader}>
          <p>{modalTodo.scheduled}</p>
          <button onClick={() => closeHandler()} className="modalCloseButton">
            &times;
          </button>

          <button onClick={() => deleteHandler()}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
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
          <button onClick={saveHandler}>Save</button>
          <button onClick={closeHandler}>Cancel</button>
        </footer>
      </div>
    </div>
  );

  return createPortal(reactModal, domModal);
};

export default Modal;
