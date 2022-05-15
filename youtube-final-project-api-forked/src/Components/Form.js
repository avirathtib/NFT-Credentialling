import React, { useState, useRef, useContext } from "react";
import { TitleContext } from "../App";
import { LinkContext } from "../App";

const Form = (props) => {
  const videoUrl = useRef();
  // const [videoLink, setVideoLink] = useState({});
  const { url, setUrl } = useContext(LinkContext);
  // const [title, setTitle] = useState(null);
  const { title, setTitle } = useContext(TitleContext);

  const addVideo = () => {
    let url = new URL(videoUrl.current.value);
    const embedCode = url.searchParams.get("v");
    setUrl(url.href);

    props.addVideo({ url: embedCode });
    //#endregion

    const vidurl = url.href;

    fetch(`https://noembed.com/embed?dataType=json&url=${vidurl}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("fetch", data.title);
        setTitle(data.title);
      });
  };

  return (
    <div>
      <input
        ref={videoUrl}
        disabled={props.disabled}
        placeholder="enter youtube url"
      />
      <button onClick={addVideo}>Submit</button>
    </div>
  );
};

export default Form;
