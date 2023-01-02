import { FC, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  useDeleteTodo,
  useRefresh,
  useUpdateTodo
} from 'components/todo/client-api/hooks';

import { TodoUI } from 'components/todo/types';
import Backdrop from 'layout/Backdrop';
import { FaTrash } from 'react-icons/fa';

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
  // const modal = (
  //   <>
  // );
  const modal = (
    <section className='bg-indigo-200 rounded-sm z-10 relative'>
      <header>
        <p>Status - {modalTodo.scheduled}</p>
        <button onClick={() => closeHandler()}>&times;</button>
        <button onClick={() => deleteHandler()}><FaTrash color='white' /></button>
      </header>
      <section>
        <input
          value={modalTodo.title}
          onChange={(e) =>
            setModalTodo((prev: TodoUI) => ({
              ...prev,
              title: e.target.value
            }))
          }
          placeholder="Enter activity title..."></input>
        <textarea
          value={modalTodo.description}
          onChange={(e) =>
            setModalTodo((prev: TodoUI) => ({
              ...prev,
              description: e.target.value
            }))
          }
          placeholder="Enter todo description..."></textarea>
      </section>
      <footer>
        <button onClick={saveHandler}>Save</button>
        <button onClick={closeHandler}>Cancel</button>
      </footer>
    </section>
  );



  const modalEl = document.getElementById('root-todo-modal') as HTMLElement;
  return createPortal(
    <><Backdrop /> {modal}</>,
    modalEl
  )

  // return (
  //   <div>
  //       <header>
  //         <p>Status - {modalTodo.scheduled}</p>
  //         <button onClick={() => closeHandler()}>&times;</button>
  //         <button onClick={() => deleteHandler()}>
  //           delete
  //         </button>
  //       </header>
  //       <div>
  //         <input
  //           value={modalTodo.title}
  //           onChange={(e) =>
  //             setModalTodo((prev: TodoUI) => ({
  //               ...prev,
  //               title: e.target.value
  //             }))
  //           }
  //           placeholder="Enter todo title..."></input>
  //         {/* <button onClick={() => console.log(`Add Pomodoro button clicked...`)}>
  //           Add Pomodoro
  //         </button> */}
  //       </div>

  //       <textarea
  //         value={modalTodo.description}
  //         onChange={(e) =>
  //           setModalTodo((prev: TodoUI) => ({
  //             ...prev,
  //             description: e.target.value
  //           }))
  //         }
  //         placeholder="Enter todo description..."></textarea>
  //       <footer>
  //         <button onClick={saveHandler}>Save</button>
  //         <button onClick={closeHandler}>Cancel</button>
  //       </footer>

  //   </div>
  // );
};

export default EditTodoModal;
