import { collection, getDocs } from "firebase/firestore";

import { database } from "../../../db";

const handler = async (req, res) => {
    // retrieve all posts from firebase
    const postInstance = collection(database, "posts");
    const postSnapshot = await getDocs(postInstance)
        .then((querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push(doc.data());
            });
            return posts;
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    // send posts to client
    res.status(200).json(postSnapshot);
};

export default handler;