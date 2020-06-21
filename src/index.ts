const { Consumer } = require('sqs-consumer');
import { EmailJob } from './email';
import { logger } from "./logger";
import { Config } from "./config";

const emailJob = new EmailJob();

enum NotificationType {
  EMAIL = 'email',
}

const processMessage = (message: any) => {
  let body;
  try {
    body = JSON.parse(message.Body);
  } catch (e) {
    logger.error(`JSONParseError/${e}`)
  }
  if (!body) return;
  switch (body.type) {
    case NotificationType.EMAIL:
      emailJob.sendEmail(body);
      break;
  }
};

const app = Consumer.create({
  queueUrl: Config.sqs.url,
  handleMessage: processMessage
});

app.on('error', (err: any) => {
  logger.error(err.message);
});

app.on('processing_error', (err: any) => {
  logger.error(err.message);
});


app.start();
