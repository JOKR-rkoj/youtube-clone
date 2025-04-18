import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import dropdown from "../../assets/dropdown.png"
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = () => {

  const {videoId} = useParams();
  const [showComments , setShowComments] = useState(true)
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState(null);


  const fetchVideoData = async () => {
    // Fetching Videos Datas
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY} `;

    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };

  const fetchOtherData = async () => {
    //Fetching Channel Data
    const channelData_url =  `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData && apiData.snippet.channelId}&key=${API_KEY}`;

      apiData && await fetch(channelData_url)
      .then((res) => res.json())
      .then((data) => setChannelData(data.items[0]));


    const comment_url = ` https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY} `

    await fetch(comment_url).then((res) => res.json()).then((data) => {
      setCommentData(data.items)
    })
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title here"}</h3>
      <div className="play-video-info">
        <p>
          {" "}
          {apiData ? value_converter(apiData.statistics.viewCount) : "16K"}{" "}
          Views &bull;{" "}
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div className="func-icons">
          <span>
            <img src={like} alt="" />
            {apiData ? value_converter(apiData.statistics.likeCount) : ""}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData && channelData.snippet.thumbnails.default.url}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : ""}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "Description Here"}{" "}
        </p>
        <hr />
        <div className="comments-numbox">
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : 102}{" "}
          Comments
        </h4>
        <img src={dropdown}  onClick={() => showComments ? setShowComments(false) : setShowComments(true)} />
        </div>
        {showComments ? <div className="comments-container"> 
        {commentData && commentData.map((item => {
          const repetline = item.snippet.topLevelComment.snippet
          return <div key = {item.id} className="comment">
          <img src={repetline.authorProfileImageUrl? repetline.authorProfileImageUrl : {user_profile}  }/>
          <div>
            <h3>
              {repetline.authorDisplayName} <span>{moment(repetline.publishedAt).fromNow()}</span>
            </h3>
            <p>
              {repetline.textDisplay}
            </p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>{repetline.likeCount}</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
        }))}
        </div> : <div> </div> }
        
      </div> 
    </div>
  );
};

export default PlayVideo;
