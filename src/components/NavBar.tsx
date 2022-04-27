import React from 'react';
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
  return (
  <nav className={styles.nav}>
    <ul>
      <li className={styles.burgerBtn}>BURGER_PLACE_HOLDER</li>
      <li>PLACE_HOLDER</li>
      <li>PLACE_HOLDER</li>
    </ul>
  </nav>);
};

export default NavBar;
