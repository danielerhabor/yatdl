import dayjs, { extend } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
extend(isoWeek); // Week starts from Monday at 1 to Sunday at 7

export default dayjs;
