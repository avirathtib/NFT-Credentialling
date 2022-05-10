import React, { useContext } from "react";
import YouTube from "react-youtube";
import { EndContext } from "../App";

const VideoList = (props) => {
  console.log("video props", props);
  const { ended, setEnded } = useContext(EndContext);

  const EndVideo = () => {
    setEnded(true);
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      disablekb: 1,
      controls: 0,
    },
  };
  let videos = props.videoList.map((video, i) => {
    return <YouTube videoId={video.url} id={i} opts={opts} onEnd={EndVideo} />;
  });

  return (
    <div className="videoList">
      <h2>Videos!!</h2>
      {videos}
    </div>
  );
};

export default VideoList;
