// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  GetItemCommand
} from '@aws-sdk/client-dynamodb';

import { client } from "../../../db";


const handler = async (req, res) => {
  const id = req.query.id;

  const params = {
    TableName: process.env.DB_TABLE_NAME,
    Key: {
      id: { N: id }
    },
  };

  // filter API requests by method
  if (req.method === 'GET') {
    try {
      //get all items from table
      const { Item } = await client.send(
        new GetItemCommand(params)
      );

      if (Item === undefined) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.status(200).json(Item);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export default handler;
