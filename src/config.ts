export const Config = {
  email: {
    region: process.env.awsDefaultRegion,
    fromEmail: process.env.emailFromName,
  },
  sqs: {
    region: process.env.awsDefaultRegion,
    url: process.env.sqsUrl,
  },
  logging: {
    region: process.env.awsDefaultRegion,
    streamName: process.env.cloudWatchStreamName,
  }
};
