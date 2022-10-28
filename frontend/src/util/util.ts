import { TodoUI } from 'components/todo/types';
import dayjs from 'libs/dayjs';

/**
 * Generates a sequence of numbers from `start` to `stop` by `step`
 * @param {number} start The start of the range.
 * @param {number} stop The end of the range (inclusive).
 * @param {number} step The increment between each number.
 * @return {number[]} The sequence of numbers.
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
 */
export const range = (start: number, stop: number, step: number): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

/**
 * Given a `Date` object, `date` return and array list of
 * seven `Date` objects such that Monday <= `date` <= Sunday
 * @param {Date} date
 * @return {dayjs.Dayjs[]} An array of seven `dayjs.Dayjs` objects
 *
 */
export const getSevenDaysIncluding = (date: Date): dayjs.Dayjs[] => {
  const day = dayjs(date);
  const days = range(1, 7, 1).map((i) => day.isoWeekday(i));
  return days;
};

/**
 * Given a `todo`, return true if the todo is
 * in the current week, false otherwise
 * @param {TodoUI} todo
 * @return {boolean}
 */
export const isTaskInCurrentWeek = (todo: TodoUI): boolean => {
  // get the dates from Monday to Sunday that are in the current week
  const sevenDays = getSevenDaysIncluding(new Date());
  return sevenDays.some((day) => day.isSame(dayjs(todo.scheduled), 'day'));
};
/**
 *
 * @param {dayjs.Dayjs} date
 * @return {string} The month and year of the date in the format of "MMM YYYY" or "Sep 2022"
 */
export const getMonthFromDate = (date: dayjs.Dayjs): string => {
  return date.format('MMM YYYY');
};
