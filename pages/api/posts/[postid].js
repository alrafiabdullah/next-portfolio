import { GetItemCommand } from "@aws-sdk/client-dynamodb";

import { client } from "../../../db";

const handler = (req, res) => {
    const { postid } = req.query;

    const params = {
        TableName: "posts",
        Key: {
            id: {
                N: postid,
            },
        },
    };

    client.send(new GetItemCommand(params), (err, data) => {
        if (err) {
            // console.log(err);
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(data.Item);
        }
    });
};

export default handler;