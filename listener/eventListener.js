import Queue from 'bull';

const queue = new Queue('mail-sender', {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});

queue.on('global:completed', async (jobId, result) => {
    // This function is called when a job is completed
    console.log(`From job complete listener. Job ${jobId} completed with result:`, result);
});

queue.on('global:failed', async (jobId, err) => {
    // This function is called when a job fails
    console.log(`From job failed listener. Job ${jobId} failed with error:`, err);
});

queue.on('global:stalled', async (jobId) => {
    // This function is called when a job is stalled
    console.log(`From job stalled listener. Job ${jobId} has stalled.`);
});

queue.on('global:progress', async (jobId, progress) => {
    // This function is called when a job is progressing
    console.log(`From job progress listener. Job ${jobId} is ${progress}% complete.`);
});

queue.on('global:delayed', async (jobId, delay) => {
    // This function is called when a job is delayed
    console.log(`From job delayed listener. Job ${jobId} delayed by ${delay} milliseconds.`);
});


export default {};
