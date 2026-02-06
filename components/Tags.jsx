import React, { useState, useEffect } from "react";
import axios from "axios";

const Tags = ({ allTags }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const temp = () => {
      if (allTags.length > 0) {
        let dataArr = [];
        for (let i = 0; i < allTags.length; i++) {
          const data = {
            name: allTags[i],
          };
          dataArr.push(data);
        }
        setTags(dataArr);
        setLoading(false);
        return;
      }

      let url = process.env.NEXT_PUBLIC_LOCAL_URL;
      if (process.env.NODE_ENV === "production") {
        url = process.env.NEXT_PUBLIC_PROD_URL;
      }

      axios
        .get(`${url}/blog/tags`)
        .then((res) => {
          //   console.log(res.data);
          setTags(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    temp();
  }, [allTags]);

  return (
    <div>
      {loading ? (
        <span className="fancy_gradient_text">Loading tags...</span>
      ) : (
        tags.map((tag, index) => (
          <span key={index} className="badge">
            {tag.name}
          </span>
        ))
      )}
    </div>
  );
};

export default Tags;
