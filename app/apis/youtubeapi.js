import axios from "axios";
const youtubeApi = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 2,
    relatedToVideoId: "0foQiAJ3uHg",
    type: "video",
    key: "AIzaSyCNbuPZafewMyHqd9k7o5izn0kswLt1mks",
    // q: "motivation english",
  },
});

export const fetchVideos = async (setthumbnailData) => {
  console.log("fetching videos");
  let returndata = [];
  await youtubeApi
    .get("/search")
    .then((res) => {
      // console.log(Object.keys(res));
      returndata = res.data.items.map((a) => {
        return { image: a.snippet.thumbnails.high.url, url: a.id.videoId };
      });
      setthumbnailData(returndata);
    })
    .catch(() => console.log("fetching videos error"));
};
