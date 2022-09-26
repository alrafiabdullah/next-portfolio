import { collection, getDocs } from "firebase/firestore";

import { database } from "../../../db";

const handler = async (req, res) => {
    const { id } = req.query;

    // retrieve all posts from firebase
    const postInstance = collection(database, "posts");

    const postSnapshot = await getDocs(postInstance)
        .then((querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                let postObj = {
                    "id": doc.id,
                    "data": doc.data()
                };
                posts.push(postObj);
            });
            return posts;
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    postSnapshot.forEach((post) => {
        if (post.id === id) {
            res.status(200).json(post);
        }
    });

    res.status(404).json({ message: "Post not found" });
};

export default handler;