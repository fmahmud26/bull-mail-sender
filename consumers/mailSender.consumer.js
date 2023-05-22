import Queue from "bull";
import nodemailer from 'nodemailer';
import getUserInfo from "../network/restTemplate.js";
import { post } from "../api/controllers/userController.js";

// Create a Bull queue
const queue = new Queue('mail-sender', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// Define the job processing function
queue.process('mail-send', async (job, done) => {
  console.log(`Consumer: Processing job...${job.data}`);

  job.progress(10);

  // Get user into
  const userInfo = await getUserInfo().then(data => {
    return data;
  }).catch(err => {
    console.log(err);
  });

  job.progress(30);

  // Send the mail to the user 
  sendMail(job.data, userInfo);

  console.log('Consumer: Job processing completed');

  job.progress(100);
  done();
});

const sendMail = async (jobData, userInfo) => {
  const { subject, text } = jobData;
  const { name, email } = userInfo;
  const message = `Hello ${name}, \n${text}`;  // Mail body

  console.log(`Sending mail to ${userInfo.email} with message: ${message}`);

  const transporter = nodemailer.createTransport({
    // Set up email transport options (SMTP, Gmail, etc.)
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Send the mail to the user and save the info into database
  transporter.sendMail({
    from: process.env.SMTP_USER, to: email, subject, text: message,
  }, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Message sent: ${info.response}`);
      // Same the info into postgres 
      post({ name, email, subject, text: message });
    }
  });
};

export default {};