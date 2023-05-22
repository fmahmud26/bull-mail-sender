import Queue from 'bull';
import dotenv from 'dotenv';

const queue = new Queue('mail-sender', {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});

queue.on('global:completed', async (jobId, result) => {
    console.log(`From job complete listener. Job ${jobId} completed with result:`, result);
});

queue.on('global:failed', async (jobId, err) => {
    console.log(`From job failed listener. Job ${jobId} failed with error:`, err);
});

queue.on('global:stalled', async (jobId) => {
    console.log(`From job stalled listener. Job ${jobId} has stalled.`);
});

queue.on('global:progress', async (jobId, progress) => {
    console.log(`From job progress listener. Job ${jobId} is ${progress}% complete.`);
});

queue.on('global:delayed', async (jobId, delay) => {
    console.log(`From job delayed listener. Job ${jobId} delayed by ${delay} milliseconds.`);
});


export default {};
