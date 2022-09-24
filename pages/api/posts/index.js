// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "../../../db";

export default function handler(req, res) {
  const params = {
    TableName: "posts",
  };

  db.scan(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(data.Items);
    }
  });
}
