/**
 * this file is emulating a server or service sending a message to a SQS queue
 * author: Emi Roberti
 */

import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import * as dotenv from 'dotenv';
dotenv.config();

const sqs_url = process.env.SQS_QUEUE!;
const sqs = new SQSClient({
  region: 'us-east-1',
});
async function main() {
  const params = {
    QueueUrl: sqs_url,
    MessageBody: JSON.stringify({
      title: 'test message',
      message: 'message from emi ' + new Date().toISOString(),
    }),
  };

  const response = await sqs.send(new SendMessageCommand(params));
  console.log('message_id', response.MessageId);
  console.log('sequence_number', response.SequenceNumber);
}

main();
