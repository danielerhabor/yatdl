import dayjs, { Dayjs } from 'dayjs';
import de from 'dayjs/locale/de';
import isoWeek from 'dayjs/plugin/isoWeek';
import { Task } from '../types/types';

dayjs.extend(isoWeek); // Week starts from Monday at 1 to Sunday at 7

/**
 * Generates a sequence of numbers from `start` to `stop` by `step`
 * @param start The start of the range.
 * @param stop The end of the range (inclusive).
 * @param step The increment between each number.
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
 */
export const range = (start: number, stop: number, step: number): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

/**
 * Given a `Date` object, `date` return and array list of
 * seven `Date` objects such that Monday <= `date` <= Sunday
 * @param date
 *
 */

export const getSevenDaysIncluding = (date: Date): Dayjs[] => {
  // dayjs().startOf();
  const day = dayjs(date);
  const days = range(1, 7, 1).map((i) => day.isoWeekday(i));
  return days;
};

/**
 * Given a `task`, return true if the task is
 * in the current week, false otherwise
 * @param task
 */
export const isTaskInCurrentWeek = (task: Task): boolean => {
  // get the dates from Monday to Sunday that are in the current week
  // console.log(task);
  const sevenDays = getSevenDaysIncluding(new Date());
  // console.log(sevenDays);
  return sevenDays.some((day) => day.isSame(dayjs(task.created_at), 'day'));
};
