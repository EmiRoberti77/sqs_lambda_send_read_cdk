import * as cdk from 'aws-cdk-lib';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import * as path from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

const SQS_NAME = 'emi-sqs-dev';
const LAMBDA_NAME = 'emi-lambda-dev';
const handler = 'handler';
export class SqsLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const entry = path.join(
      __dirname,
      '..',
      'src',
      'lambdas',
      'LambdaSQS',
      'handler.ts'
    );

    const queue = new sqs.Queue(this, SQS_NAME, {
      queueName: SQS_NAME,
      visibilityTimeout: cdk.Duration.minutes(30),
    });

    const lambda = new NodejsFunction(this, LAMBDA_NAME, {
      functionName: LAMBDA_NAME,
      runtime: Runtime.NODEJS_LATEST,
      handler,
      entry,
    });

    lambda.addEventSource(
      new SqsEventSource(queue, {
        batchSize: 10,
      })
    );

    lambda.addToRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['*'],
        resources: ['*'],
      })
    );
  }
}
