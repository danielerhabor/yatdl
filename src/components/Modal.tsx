import styles from './Modal.module.css';

import { RootState } from '../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { close } from '../features/modal/modalSlice';

const backdropRoot = document.getElementById('backdrop-root') as HTMLElement;
const overlayRoot = document.getElementById('overlay-root') as HTMLElement;

const Backdrop: React.FC = () => {
  return <div className={styles.backdrop}></div>;
};

const Modal: React.FC = () => {
  /* `useSelector` helps me "get" the state for particular reducer*/
  // const modal = useSelector((state: RootState) => state.modal.value);

  /* 
    `useDispatch` helps me "set" the state by dispatching an action that is registered for
    a particular reducer 
  */

  // Modal should probably be used in the app component, I think?
  const dispatch = useDispatch();
  return (
    <>
      {createPortal(<Backdrop />, backdropRoot)}
      {createPortal(
        <div className={styles.modal}>
          <h2>Some Task</h2>
          <input type="text" />
          <button type="button" onClick={() => dispatch(close())}>CLOSE</button>
        </div>,
        overlayRoot
      )}
    </>
  );
};

export default Modal;
