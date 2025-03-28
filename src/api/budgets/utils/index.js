import moment from 'moment';

export function generateStartEndDate(groupTemplate, date) {
  const number = _.get(groupTemplate, 'resetPeriod.number', 1);
  const period = _.get(groupTemplate, 'resetPeriod.interval', 'month');

  const startDate = moment(date).startOf('day').startOf(period);
  const endDate = moment(date).endOf('day').endOf(period);
  if (number > 1) {
    endDate.add(number, period);
  }

  return { startDate: startDate.format('YYYY-MM-DD hh:mm'), endDate: endDate.format('YYYY-MM-DD hh:mm') };
}