import { mongo } from '../../config';

import Agenda from 'agenda';

let agendaSingleton;

const jobList = [];
const customJobList = [];

const createScheduledJob = (chroneExpression, jobName, jobFunction) => {
  jobList.push({ jobName, chroneExpression, jobFunction });
};

const createCustomJob = (jobName, jobFunction) => {
  customJobList.push({ jobName, jobFunction });
};

const startAgenda = () => {
  agendaSingleton.cancel({ type: { $ne: 'normal' } });

  logger.info('\x1B[0;34mStarting scheduler...\x1B[0m');

  scheduleJobLists();
  agendaSingleton.start();

  logger.info('\x1B[0;34mScheduler started...\x1B[0m');
};

function scheduleJobLists() {
  _.forEach(jobList, (job) => {
    agendaSingleton.define(job.jobName, job.jobFunction);

    agendaSingleton.every(job.chroneExpression, job.jobName, {}, {
      timezone: 'Europe/Rome',
    });
  });

  _.forEach(customJobList, (job) => {
    agendaSingleton.define(
      job.jobName,
      { priority: 'high', concurrency: 10 },
      job.jobFunction,
    );
  });
}

export async function startCustomJob(jobName, launchDate, additionalInfo) {
  const scheduleId = await agendaSingleton.schedule(launchDate, jobName, additionalInfo);

  return scheduleId;
}

export async function cancelJob(id) {
  await agendaSingleton.cancel({ _id: id });
}

export function createAgenda() {
  agendaSingleton = new Agenda({
    db: {
      address: mongo.uri
    },
    processEvery: '10 second'
  });

  agendaSingleton.on('ready', startAgenda);

  agendaSingleton.on('start', (job) => {
    logger.info(`\x1B[0;34mSchedule:\x1B[0m Job starting: ${job.attrs.name}`);
  });

  agendaSingleton.on('fail', (err, job) => {
    logger.info(`\x1B[0;34mSchedule:\x1B[0m Job ${job.attrs.name} failed with error: ${err.message}`);
  });
}


export { createScheduledJob, createCustomJob };
