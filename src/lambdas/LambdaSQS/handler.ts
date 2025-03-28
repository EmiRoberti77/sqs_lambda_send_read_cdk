import { APIGatewayProxyResultV2, SQSEvent } from 'aws-lambda';
export const handler = async (
  event: SQSEvent
): Promise<APIGatewayProxyResultV2> => {
  const messages = event.Records.map((record) => {
    const msg = JSON.parse(record.body) as {
      title: string;
      message: string;
    };
    console.log(msg);
  });
  return {
    statusCode: 200,
  };
};
