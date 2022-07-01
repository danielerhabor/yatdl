import dayjs, { Dayjs } from 'dayjs';

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
  const days = range(0, 6, 1).map(i => dayjs(date).add(i, 'day'));

  return days;
};
