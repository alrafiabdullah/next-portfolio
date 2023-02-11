import React, { useState, useEffect } from "react";
import axios from "axios";

const Tags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const temp = () => {
      let url = process.env.NEXT_PUBLIC_LOCAL_URL;
      if (process.env.NODE_ENV === "production") {
        url = process.env.NEXT_PUBLIC_PROD_URL;
      }

      axios
        .get(`${url}/blog/tags`)
        .then((res) => {
          console.log(res.data);
          setTags(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    temp();
  }, []);

  return (
    <div>
      {tags.map((tag, index) => (
        <span key={index} className="badge">
          {tag.name}
        </span>
      ))}
    </div>
  );
};

export default Tags;
