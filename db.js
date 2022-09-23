import { DynamoDB, DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const client = new DynamoDBClient({
    accessKeyId: process.env.DB_ACCESS_KEY_ID,
    secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
    region: process.env.DB_REGION
});

export const db = new DynamoDB({
    accessKeyId: process.env.DB_ACCESS_KEY_ID,
    secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
    region: process.env.DB_REGION
});


// export default client;