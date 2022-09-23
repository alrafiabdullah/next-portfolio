const handler = async (req, res) => {
    if (req.query.secret !== process.env.SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        await res.revalidate("/");
        return res.json({ revalidated: true });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default handler;