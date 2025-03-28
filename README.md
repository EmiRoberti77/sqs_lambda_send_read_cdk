# SQS Message Sender (TypeScript)

This script emulates a server or service sending a message to an AWS SQS (Simple Queue Service) queue.

> **Author:** Emi Roberti

## 📦 Description

The script connects to an AWS SQS queue using the AWS SDK for JavaScript v3, and sends a simple JSON message. This is useful for testing or simulating services that produce messages in a distributed architecture.

---

## 📄 Sample Code

```ts
/**
 * this file is emulating a server or service sending a message to a SQS queue
 * author: Emi Roberti
 */

import {{ SQSClient, SendMessageCommand }} from '@aws-sdk/client-sqs';

const sqs_url = 'https://sqs.us-east-1.amazonaws.com/XXXXXXXXXXX/you-queue-name';
const sqs = new SQSClient({{
  region: 'us-east-1',
}});
async function main() {{
  const params = {{
    QueueUrl: sqs_url,
    MessageBody: JSON.stringify({{
      title: 'test message',
      message: 'message from emi ' + new Date().toISOString(),
    }}),
  }};

  const response = await sqs.send(new SendMessageCommand(params));
  console.log('message_id', response.MessageId);
  console.log('sequence_number', response.SequenceNumber);
}}

main();
```

---

## 📘 About Amazon SQS

Amazon Simple Queue Service (SQS) is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications. It provides a reliable, highly-scalable, and secure communication channel between software components.

SQS supports two types of message queues:

- **Standard Queues** (best-effort ordering, at-least-once delivery)
- **FIFO Queues** (exactly-once processing, ordered messages)

Using SQS, you can ensure that messages between services are not lost during high traffic, errors, or failure, helping build resilient and loosely-coupled systems.

---

## ✅ Running the Code

1. Install the AWS SDK:

```bash
npm

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
```
