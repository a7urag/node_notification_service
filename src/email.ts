import aws from 'aws-sdk';
import { Config } from './config';
import { logger } from './logger';
// @ts-ignore
const Email = require('email-templates');

const TAG = 'EmailJob';

export class EmailJob {
  emailConfiguration: any;

  constructor() {
    this.emailConfiguration = new Email({
      message: {
        from: Config.email.fromEmail
      },
      // uncomment below to send emails in development/test env:
      // send: true,
      transport: {
        SES: new aws.SES({
          region: Config.email.region,
        })
      }
    });
  }

  sendEmail = (emailObj: any) => {
    if (emailObj && emailObj.template && emailObj.to) {
      this.emailConfiguration.send({
        template: emailObj.template,
        message: {
          to: emailObj.to,
        },
        locals: emailObj.templateData
      })
        .then((message: any) => logger.info(`${TAG}/sendEmail/${JSON.stringify(message)}`))
        .catch((error: any) => logger.error(`${TAG}/sendEmail/${error}`));
    }
  }
}
