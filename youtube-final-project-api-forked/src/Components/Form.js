import React, { useState, useRef, useContext } from "react";
import { TitleContext } from "../App";
import { LinkContext } from "../App";
var getYoutubeTitle = require("get-youtube-title");

const Form = (props) => {
  const videoUrl = useRef();
  // const [videoLink, setVideoLink] = useState({});
  const { url, setUrl } = useContext(LinkContext);
  // const [title, setTitle] = useState(null);
  const { title, setTitle } = useContext(TitleContext);

  const addVideo = () => {
    let url = new URL(videoUrl.current.value);
    const embedCode = url.searchParams.get("v");
    console.log(url.href);

    props.addVideo({ url: embedCode });
    //#endregion
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    setUrl(url.href);
    var match = url.href.match(regExp);
    const id = match && match[7].length == 11 ? match[7] : false;

    getYoutubeTitle(id, function (err, title) {
      setTitle(title);
    });
  };

  return (
    <div>
      <input ref={videoUrl} placeholder="enter youtube url" />
      <button onClick={addVideo}>Submit</button>
    </div>
  );
};

export default Form;
