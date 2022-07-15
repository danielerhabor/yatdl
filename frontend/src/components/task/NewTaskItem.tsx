import styles from './NewTaskItem.module.css';

const NewTaskItem: React.FC<{ date: string }> = ({ date }) => {

  
  return <input className={styles.newTaskItem} name="newTaskItem"></input>;
};

export default NewTaskItem;
