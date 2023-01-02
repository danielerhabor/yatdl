import { FC } from 'react';

import dayjs from 'libs/dayjs';
import { FaChevronLeft, FaChevronRight, FaEllipsisV, FaRegUser } from 'react-icons/fa';
// import { getMonthFromDate } from 'util/util';


const Header: FC<{ date: dayjs.Dayjs }> = ({ date }) => {


  return (
    <header className='flex justify-between align-middle'>
      <p className='text-2xl'>{date.format('MMM YYYY')}</p>
      <section className='flex'>
        <button className='rounded-full bg-indigo-200 p-2 m-1'><FaRegUser color='black'/></button>
        <button className='rounded-full bg-purple-300 p-2 m-1'><FaEllipsisV color='black'/></button>
        <button className='rounded-full bg-black p-2 m-1'><FaChevronLeft color='white'/></button>
        <button className='rounded-full bg-black p-2 m-1'><FaChevronRight color='white'/></button>
      </section>
    </header>
  );
};

export default Header;
