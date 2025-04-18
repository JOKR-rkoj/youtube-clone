import React, { useEffect, useState } from "react";
import "./Search.css";
import { API_KEY } from "../../data";
import { Link } from "react-router-dom";
import { value_converter } from "../../data";
import moment from "moment";
const Search = ({ input , searchVideos }) => {
  const SearchData_url = ` https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&key=${API_KEY}`;

  const [apiData,setApiData] = useState(null);

  const fetchSearchData = async () => {
     await fetch(SearchData_url)
    .then((res) => res.json())
    .then((data) =>
      setApiData(data.items)
    );
    
  };

  useEffect(() => {
    fetchSearchData()
  }
  ,[searchVideos])

  return (
     <div className="Search-results">
       {apiData && apiData.map((item,index) => {
        return  <Link key={index}
                    to={`/youtube-clone/video/20/${item.id.videoId}`}
                    className="card"
                  >
                    <img src={item.snippet.thumbnails.medium.url} alt="thumbnail" />
                    <h2>
                      {item.snippet.title}
                    </h2>
                    <h3>{item.channelTitle}</h3>
                    <p> {moment(item.snippet.publishedAt).fromNow()} </p>
                  </Link>
       })
    }
     </div>
  );
};

export default Search;
