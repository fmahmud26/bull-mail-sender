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

// Define the job payload
const jobData = {
    subject: "Mail from Bull",
    text: "This is a text in mail body"
};

// Add a repeatable job to the queue
queue.add('mail-send', jobData, {
    repeat: {
        every: milliseconds.minutes(10),
    },
});

console.log(`Job added to queue: ${jobData}`);

export default {};
