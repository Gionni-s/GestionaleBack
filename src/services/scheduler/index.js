import { createScheduledJob } from '../agenda/index';

export const start = function () {
  createScheduledJob('*/30 * * * *', 'sampleFn', sampleFn);
  sampleFn();
};

function sampleFn() {
  logger.info('Current server time: ' + new Date());
}


