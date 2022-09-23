import { db } from "../../../db";


const handler = async (req, res) => {

    const params = ({
        TableName: process.env.DB_TABLE_NAME
    });

    // filter API requests by method
    if (req.method === 'GET') {
        try {
            db.scan(params, (err, data) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                } else {
                    const { Items } = data;
                    return res.status(200).json(Items);
                }
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

export default handler;
