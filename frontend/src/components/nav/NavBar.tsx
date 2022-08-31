import { FC } from 'react';

const NavBar: FC = () => {
  return (
    <nav>
      <ul>
        <li>BURGER_MENU</li>
        <li>NAV_STUFF_1</li>
        <li>NAV_STUFF_2</li>
      </ul>
      <button>NEXT_MONTH</button>
      <button>PREVIOUS_MONTH</button>
    </nav>
  );
};

export default NavBar;
