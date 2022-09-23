// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
    UpdateItemCommand,
    DeleteItemCommand
} from '@aws-sdk/client-dynamodb';



const hello = async () => {

    const client = new DynamoDBClient({
        accessKeyId: "AKIAZNIXP3PWTOSB2SNR",
        secretAccessKey: "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",
        region: "ap-southeast-1"
    });

    const id = 1;

    const params = {
        TableName: "blogs", //process.env.DB_TABLE_NAME,
        Key: {
            id: { S: id }
        }
    };

    // filter API requests by method
    // console.log(client.config);
    // if (req.method === 'GET') {
    const { Item } = await client.send(
        new GetItemCommand(params)
    );

    console.log(Item);
    // }
};

hello();
