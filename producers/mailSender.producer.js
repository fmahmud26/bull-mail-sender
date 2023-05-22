import Queue from 'bull';
import dotenv from 'dotenv';
import milliseconds from "milliseconds";

// Create a Bull queue
const queue = new Queue('mail-sender', {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});


(async function () {
    // remove redis cache
    await queue.obliterate({ force: true });

    // Define the job payload
    const jobData = {
        subject: "Mail from Bull",
        text: "This is a text in mail body"
    };

    // Define the job options
    const jobOptions = {
        repeat: {
            every: milliseconds.minutes(1),
        },
        backoff: 30 * 1000,
    };

    // Add a repeatable job to the queue
    queue.add('mail-send', jobData, {
        removeOnComplete: true,
    });

    console.log(`Job added to queue: ${jobData}`);

})()



export default {};
