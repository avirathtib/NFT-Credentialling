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
    console.log(url.href);

    props.addVideo({ url: embedCode });
    //#endregion
    // var regExp =
    //   /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    // setUrl(url.href);
    // var match = url.href.match(regExp);
    // const id = match && match[7].length == 11 ? match[7] : false;
    // console.log(id);
    // var getYoutubeTitle = require("get-youtube-title");
    // getYoutubeTitle(id, function (err, title) {
    //   console.log(title);
    //   setTitle(title);
    // });
    //#endregion
    // $.getJSON(
    //   "https://noembed.com/embed",
    //   { format: "json", url: url.href },
    //   function (data) {
    //     console.log(data.title);
    //   }
    // );
    const vidurl = url.href;

    fetch(`https://noembed.com/embed?dataType=json&url=${vidurl}`)
      .then((res) => res.json())
      .then((data) => console.log("fetch", data.title));
  };

  return (
    <div>
      <input ref={videoUrl} placeholder="enter youtube url" />
      <button onClick={addVideo}>Submit</button>
    </div>
  );
};

export default Form;
