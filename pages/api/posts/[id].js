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
            return null;
        });

    const post = postSnapshot.filter((post) => post.id === id)[0];

    if (post === undefined) {
        res.status(404).json({ message: "No post found" });
    } else {
        res.status(200).json(post);
    }

};

export default handler;